import os
from flask import Flask, render_template, request, jsonify, session
from database import (
    init_db, login_doctor, add_patient, get_all_patients, search_patients,
    add_prescription, get_prescriptions_by_patient, get_prescription, 
    get_dashboard_stats, get_reports_data, add_doctor, get_doctor_by_username,
    update_doctor_password, get_patient_clinical_summary, add_vitals,
    get_vitals_by_patient, get_latest_vitals
)
from pdf_service import generate_prescription_pdf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'static')

app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)
app.secret_key = "docvoice_super_secure_key_2026"

# Ensure templates and static dirs are set up
os.makedirs(TEMPLATE_DIR, exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "css"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "js"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "uploads"), exist_ok=True)

# Initialize Database on import
init_db()

# --------------------------------------------------------------------------
# VIEW ROUTES
# --------------------------------------------------------------------------

@app.route('/')
def index():
    return render_template('index.html')

# --------------------------------------------------------------------------
# API AUTHENTICATION ROUTES
# --------------------------------------------------------------------------

@app.route('/api/session', methods=['GET'])
def check_session():
    if 'doctor' in session:
        return jsonify({"logged_in": True, "doctor": session['doctor']})
    return jsonify({"logged_in": False})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"success": False, "message": "Username and password required."}), 400
        
    doctor = login_doctor(username, password)
    if doctor:
        session['doctor'] = doctor
        return jsonify({"success": True, "doctor": doctor})
    else:
        return jsonify({"success": False, "message": "Invalid username or password."}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')
    full_name = data.get('full_name', '').strip()
    specialty = data.get('specialty', '').strip()
    contact = data.get('contact', '').strip()

    if not username or not password or not full_name or not specialty or not contact:
        return jsonify({"success": False, "message": "All fields are required for registration."}), 400

    if len(password) < 4:
        return jsonify({"success": False, "message": "Password must be at least 4 characters long."}), 400

    if not full_name.lower().startswith("dr.") and not full_name.lower().startswith("dr "):
        full_name = f"Dr. {full_name}"

    if get_doctor_by_username(username):
        return jsonify({"success": False, "message": "Username is already taken. Please choose another."}), 400

    doctor_id = add_doctor(username, password, full_name, specialty, contact)
    if doctor_id:
        doctor = login_doctor(username, password)
        if doctor:
            session['doctor'] = doctor
            return jsonify({"success": True, "message": "Account created successfully!", "doctor": doctor})
        return jsonify({"success": True, "message": "Account created successfully! Please log in."})
    else:
        return jsonify({"success": False, "message": "Could not create account. Username may already exist."}), 400

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json or {}
    username = data.get('username', '').strip()
    contact = data.get('contact', '').strip()
    new_password = data.get('new_password', '')

    if not username or not contact or not new_password:
        return jsonify({"success": False, "message": "Username, contact number, and new password are required."}), 400

    if len(new_password) < 4:
        return jsonify({"success": False, "message": "New password must be at least 4 characters long."}), 400

    existing_doc = get_doctor_by_username(username)
    if not existing_doc:
        return jsonify({"success": False, "message": "Doctor account not found with that username."}), 404

    stored_contact = existing_doc.get('contact', '').strip().replace(' ', '').replace('-', '')
    input_contact = contact.strip().replace(' ', '').replace('-', '')

    if input_contact not in stored_contact and stored_contact not in input_contact:
        return jsonify({"success": False, "message": "Registered contact number does not match record."}), 400

    success = update_doctor_password(username, new_password)
    if success:
        return jsonify({"success": True, "message": "Password reset successfully! You can now log in with your new password."})
    else:
        return jsonify({"success": False, "message": "Failed to update password. Please try again."}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('doctor', None)
    return jsonify({"success": True, "message": "Logged out successfully."})

@app.route('/api/debug_db', methods=['GET'])
def debug_db():
    import sqlite3
    from database import DATABASE_NAME, hash_password
    status = {}
    try:
        status["database_exists"] = os.path.exists(DATABASE_NAME)
        status["database_size_bytes"] = os.path.getsize(DATABASE_NAME) if status["database_exists"] else 0
        
        conn = sqlite3.connect(DATABASE_NAME)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Check doctors table
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='doctors'")
        status["doctors_table_exists"] = (cursor.fetchone() is not None)
        
        if status["doctors_table_exists"]:
            cursor.execute("SELECT id, username, full_name, specialty FROM doctors")
            status["doctors_list"] = [dict(r) for r in cursor.fetchall()]
            
            # Test admin123 hash
            admin_pwd_hash = hash_password("admin123")
            cursor.execute("SELECT password_hash FROM doctors WHERE username='admin'")
            admin_row = cursor.fetchone()
            if admin_row:
                status["admin_pwd_match"] = (admin_row[0] == admin_pwd_hash)
                status["admin_pwd_hash_stored"] = admin_row[0]
                status["admin_pwd_hash_expected"] = admin_pwd_hash
            else:
                status["admin_pwd_match"] = False
                status["admin_user_found"] = False
        
        conn.close()
        status["success"] = True
    except Exception as e:
        status["success"] = False
        status["error"] = str(e)
        
    return jsonify(status)

# --------------------------------------------------------------------------
# API PATIENTS ROUTES
# --------------------------------------------------------------------------

@app.route('/api/patients', methods=['GET', 'POST'])
def handle_patients():
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        age = data.get('age')
        gender = data.get('gender')
        contact = data.get('contact')
        medical_history = data.get('medical_history', '')
        
        if not name or not age or not gender or not contact:
            return jsonify({"success": False, "message": "Missing required patient fields."}), 400
            
        patient_id = add_patient(name, age, gender, contact, medical_history)
        patient_code = f"PID-{patient_id:04d}"
        return jsonify({"success": True, "patient_id": patient_id, "patient_code": patient_code})
        
    else:
        search_query = request.args.get('q', '').strip()
        if search_query:
            patients = search_patients(search_query)
        else:
            patients = get_all_patients()
        return jsonify(patients)

# --------------------------------------------------------------------------
# API PRESCRIPTION ROUTES
# --------------------------------------------------------------------------

@app.route('/api/prescriptions', methods=['POST'])
def create_prescription():
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    data = request.json
    patient_id = data.get('patient_id')
    doctor_id = session['doctor']['id']
    symptoms = data.get('symptoms')
    diagnosis = data.get('diagnosis')
    medicines = data.get('medicines') # Expected to be a JSON string from client
    instructions = data.get('instructions')
    vitals_data = data.get('vitals') # Optional dict of vitals
    
    if not patient_id:
        return jsonify({"success": False, "message": "Patient ID is required."}), 400
        
    try:
        # Save prescription in DB
        prescription_id = add_prescription(patient_id, doctor_id, symptoms, diagnosis, medicines, instructions)
        
        # Save vitals if provided
        if vitals_data and isinstance(vitals_data, dict):
            add_vitals(
                patient_id=patient_id,
                prescription_id=prescription_id,
                bp_systolic=vitals_data.get('bp_systolic'),
                bp_diastolic=vitals_data.get('bp_diastolic'),
                pulse_rate=vitals_data.get('pulse_rate'),
                temperature=vitals_data.get('temperature'),
                spo2=vitals_data.get('spo2'),
                weight_kg=vitals_data.get('weight_kg'),
                height_cm=vitals_data.get('height_cm'),
                bmi=vitals_data.get('bmi')
            )
        
        # Generate PDF prescription
        pdf_url = generate_prescription_pdf(prescription_id)
        
        return jsonify({
            "success": True, 
            "prescription_id": prescription_id, 
            "pdf_url": pdf_url
        })
    except Exception as e:
        print("Prescription Generation Error: ", str(e))
        return jsonify({"success": False, "message": f"Error saving prescription: {str(e)}"}), 500

@app.route('/api/vitals/patient/<int:patient_id>', methods=['GET'])
def get_vitals_history(patient_id):
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    vitals = get_vitals_by_patient(patient_id)
    latest = get_latest_vitals(patient_id)
    return jsonify({"vitals": vitals, "latest": latest})

@app.route('/api/prescriptions/patient/<int:patient_id>', methods=['GET'])
def get_patient_history(patient_id):
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    history = get_prescriptions_by_patient(patient_id)
    return jsonify(history)

@app.route('/api/patients/<int:patient_id>/summary', methods=['GET'])
def get_patient_summary(patient_id):
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    summary = get_patient_clinical_summary(patient_id)
    if summary:
        return jsonify(summary)
    return jsonify({"success": False, "message": "Patient not found"}), 404

@app.route('/api/prescriptions/detail/<int:prescription_id>', methods=['GET'])
def get_prescription_detail(prescription_id):
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    p_data = get_prescription(prescription_id)
    if p_data:
        return jsonify(p_data)
    return jsonify({"success": False, "message": "Prescription not found"}), 404

# --------------------------------------------------------------------------
# API STATS & ANALYTICS
# --------------------------------------------------------------------------

@app.route('/api/stats', methods=['GET'])
def get_stats():
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    stats = get_dashboard_stats()
    return jsonify(stats)

@app.route('/api/reports-data', methods=['GET'])
def get_reports():
    if 'doctor' not in session:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
        
    reports = get_reports_data()
    return jsonify(reports)

@app.errorhandler(500)
def handle_500_error(e):
    print("CRITICAL SERVER ERROR:", str(e))
    return f"<h1>Internal Server Error</h1><p>{str(e)}</p>", 500

@app.errorhandler(404)
def handle_404_error(e):
    return render_template('index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Doctor Voice System Server on port {port}...")
    app.run(host='0.0.0.0', debug=True, port=port)
