import sqlite3
import hashlib
from datetime import datetime

DATABASE_NAME = "doctor_voice.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row  # Returns rows as dictionary-like objects
    return conn

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Doctors Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        specialty TEXT NOT NULL,
        contact TEXT NOT NULL
    )
    """)
    
    # 2. Patients Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        contact TEXT NOT NULL,
        medical_history TEXT,
        registration_date TEXT NOT NULL
    )
    """)
    
    # Safe migration for existing databases
    try:
        cursor.execute("ALTER TABLE patients ADD COLUMN medical_history TEXT")
    except sqlite3.OperationalError:
        pass # Column already exists
    
    # 3. Prescriptions Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prescriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        symptoms TEXT,
        diagnosis TEXT,
        medicines TEXT, -- JSON string representing a list of drugs & dosages
        instructions TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patients(id),
        FOREIGN KEY (doctor_id) REFERENCES doctors(id)
    )
    """)

    # 4. Vitals Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS vitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        prescription_id INTEGER,
        bp_systolic INTEGER,
        bp_diastolic INTEGER,
        pulse_rate INTEGER,
        temperature REAL,
        spo2 INTEGER,
        weight_kg REAL,
        height_cm REAL,
        bmi REAL,
        recorded_at TEXT NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patients(id),
        FOREIGN KEY (prescription_id) REFERENCES prescriptions(id)
    )
    """)
    
    # Seed a default doctor if 'admin' doesn't exist
    cursor.execute("SELECT COUNT(*) FROM doctors WHERE username='admin'")
    if cursor.fetchone()[0] == 0:
        default_pwd_hash = hash_password("admin123")
        cursor.execute("""
        INSERT INTO doctors (username, password_hash, full_name, specialty, contact)
        VALUES (?, ?, ?, ?, ?)
        """, ("admin", default_pwd_hash, "Dr. Sarah Jenkins", "General Physician", "+1 (555) 019-2834"))
        
        # Seed some mock patients for visualization
        mock_patients = [
            ("Emily Watson", 29, "Female", "9876543210", "2026-06-25"),
            ("John Doe", 45, "Male", "9876543211", "2026-06-28"),
            ("Robert Vance", 62, "Male", "9876543212", "2026-07-01"),
            ("Sophia Chen", 34, "Female", "9876543213", "2026-07-02")
        ]
        for name, age, gender, contact, reg_date in mock_patients:
            cursor.execute("""
            INSERT INTO patients (name, age, gender, contact, registration_date)
            VALUES (?, ?, ?, ?, ?)
            """, (name, age, gender, contact, reg_date))
            
        # Seed a mock prescription
        cursor.execute("""
        INSERT INTO prescriptions (patient_id, doctor_id, symptoms, diagnosis, medicines, instructions, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            1, 1, 
            "Dry cough, fatigue, mild fever", 
            "Allergic Bronchitis", 
            '[{"name": "Cetirizine 10mg", "dosage": "1 tablet at night", "duration": "5 days"}, {"name": "Cough Syrup", "dosage": "10ml thrice daily", "duration": "5 days"}]',
            "Avoid cold drinks. Drink warm water.",
            "2026-06-25 10:30:00"
        ))
        
        cursor.execute("""
        INSERT INTO prescriptions (patient_id, doctor_id, symptoms, diagnosis, medicines, instructions, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            2, 1, 
            "High fever, body aches, chills", 
            "Influenza", 
            '[{"name": "Paracetamol 650mg", "dosage": "1 tablet every 6 hours", "duration": "3 days"}, {"name": "Oseltamivir 75mg", "dosage": "1 capsule twice daily", "duration": "5 days"}]',
            "Take complete bed rest. Drink plenty of fluids.",
            "2026-06-28 14:15:00"
        ))
        
    else:
        # If admin exists, double check that password hash is set correctly for admin123
        default_pwd_hash = hash_password("admin123")
        cursor.execute("""
        UPDATE doctors SET password_hash = ? WHERE username = 'admin'
        """, (default_pwd_hash,))

        
    conn.commit()
    conn.close()

def login_doctor(username, password):
    conn = get_db_connection()
    pwd_hash = hash_password(password)
    row = conn.execute("""
        SELECT id, username, full_name, specialty, contact 
        FROM doctors 
        WHERE LOWER(username) = LOWER(?) AND password_hash = ?
    """, (username.strip(), pwd_hash)).fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def add_doctor(username, password, full_name, specialty, contact):
    conn = get_db_connection()
    pwd_hash = hash_password(password)
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO doctors (username, password_hash, full_name, specialty, contact)
            VALUES (?, ?, ?, ?, ?)
        """, (username.strip(), pwd_hash, full_name.strip(), specialty.strip(), contact.strip()))
        conn.commit()
        doctor_id = cursor.lastrowid
        conn.close()
        return doctor_id
    except sqlite3.IntegrityError:
        conn.close()
        return None

def get_doctor_by_username(username):
    conn = get_db_connection()
    row = conn.execute("""
        SELECT id, username, full_name, specialty, contact, password_hash
        FROM doctors
        WHERE LOWER(username) = LOWER(?)
    """, (username.strip(),)).fetchone()
    conn.close()
    return dict(row) if row else None

def update_doctor_password(username, new_password):
    conn = get_db_connection()
    pwd_hash = hash_password(new_password)
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE doctors
        SET password_hash = ?
        WHERE LOWER(username) = LOWER(?)
    """, (pwd_hash, username.strip()))
    updated_rows = cursor.rowcount
    conn.commit()
    conn.close()
    return updated_rows > 0


def add_patient(name, age, gender, contact, medical_history=""):
    conn = get_db_connection()
    cursor = conn.cursor()
    reg_date = datetime.now().strftime("%Y-%m-%d")
    cursor.execute("""
        INSERT INTO patients (name, age, gender, contact, medical_history, registration_date)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (name, age, gender, contact, medical_history, reg_date))
    conn.commit()
    patient_id = cursor.lastrowid
    conn.close()
    return patient_id

def format_patient_id(patient_id):
    return f"PID-{patient_id:04d}" if patient_id else "PID-0000"

def get_patient(patient_id):
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM patients WHERE id = ?", (patient_id,)).fetchone()
    conn.close()
    if row:
        d = dict(row)
        d['patient_code'] = format_patient_id(d['id'])
        return d
    return None

def search_patients(query):
    conn = get_db_connection()
    query_str = f"%{query}%"
    rows = conn.execute("""
        SELECT * FROM patients 
        WHERE name LIKE ? 
           OR contact LIKE ? 
           OR CAST(id AS TEXT) LIKE ?
           OR ('PID-' || PRINTF('%04d', id)) LIKE ?
        ORDER BY registration_date DESC, id DESC
    """, (query_str, query_str, query_str, query_str)).fetchall()
    conn.close()
    result = []
    for r in rows:
        d = dict(r)
        d['patient_code'] = format_patient_id(d['id'])
        result.append(d)
    return result

def get_all_patients():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM patients ORDER BY name ASC").fetchall()
    conn.close()
    result = []
    for r in rows:
        d = dict(r)
        d['patient_code'] = format_patient_id(d['id'])
        result.append(d)
    return result

def add_prescription(patient_id, doctor_id, symptoms, diagnosis, medicines, instructions):
    conn = get_db_connection()
    cursor = conn.cursor()
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
        INSERT INTO prescriptions (patient_id, doctor_id, symptoms, diagnosis, medicines, instructions, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (patient_id, doctor_id, symptoms, diagnosis, medicines, instructions, created_at))
    conn.commit()
    prescription_id = cursor.lastrowid
    conn.close()
    return prescription_id

def get_prescription(prescription_id):
    conn = get_db_connection()
    row = conn.execute("""
        SELECT p.*, pat.id as patient_id, pat.name as patient_name, pat.age as patient_age, pat.gender as patient_gender, 
               pat.contact as patient_contact, doc.full_name as doctor_name, doc.specialty as doctor_specialty,
               doc.contact as doctor_contact
        FROM prescriptions p
        JOIN patients pat ON p.patient_id = pat.id
        JOIN doctors doc ON p.doctor_id = doc.id
        WHERE p.id = ?
    """, (prescription_id,)).fetchone()
    
    vitals_row = conn.execute("SELECT * FROM vitals WHERE prescription_id = ?", (prescription_id,)).fetchone()
    
    conn.close()
    if row:
        d = dict(row)
        d['patient_code'] = format_patient_id(d['patient_id'])
        d['vitals'] = dict(vitals_row) if vitals_row else None
        return d
    return None

def add_vitals(patient_id, prescription_id, bp_systolic, bp_diastolic, pulse_rate, temperature, spo2, weight_kg, height_cm, bmi=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    recorded_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    if not bmi and weight_kg and height_cm and height_cm > 0:
        height_m = height_cm / 100.0
        bmi = round(weight_kg / (height_m * height_m), 1)
        
    cursor.execute("""
        INSERT INTO vitals (patient_id, prescription_id, bp_systolic, bp_diastolic, pulse_rate, temperature, spo2, weight_kg, height_cm, bmi, recorded_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (patient_id, prescription_id, bp_systolic, bp_diastolic, pulse_rate, temperature, spo2, weight_kg, height_cm, bmi, recorded_at))
    conn.commit()
    vitals_id = cursor.lastrowid
    conn.close()
    return vitals_id

def get_vitals_by_patient(patient_id):
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT * FROM vitals 
        WHERE patient_id = ? 
        ORDER BY recorded_at ASC
    """, (patient_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_latest_vitals(patient_id):
    conn = get_db_connection()
    row = conn.execute("""
        SELECT * FROM vitals 
        WHERE patient_id = ? 
        ORDER BY recorded_at DESC 
        LIMIT 1
    """, (patient_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def get_prescriptions_by_patient(patient_id):
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT p.*, doc.full_name as doctor_name, doc.specialty as doctor_specialty
        FROM prescriptions p
        JOIN doctors doc ON p.doctor_id = doc.id
        WHERE p.patient_id = ?
        ORDER BY p.created_at DESC
    """, (patient_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_patient_clinical_summary(patient_id):
    conn = get_db_connection()
    patient = conn.execute("SELECT * FROM patients WHERE id = ?", (patient_id,)).fetchone()
    if not patient:
        conn.close()
        return None
    
    p_dict = dict(patient)
    p_dict['patient_code'] = format_patient_id(p_dict['id'])
    
    prescriptions = conn.execute("""
        SELECT p.*, doc.full_name as doctor_name, doc.specialty as doctor_specialty
        FROM prescriptions p
        JOIN doctors doc ON p.doctor_id = doc.id
        WHERE p.patient_id = ?
        ORDER BY p.created_at DESC
    """, (patient_id,)).fetchall()
    
    rx_list = [dict(r) for r in prescriptions]
    
    total_visits = len(rx_list)
    last_visit = rx_list[0]['created_at'].split(' ')[0] if rx_list else "No visits yet"
    
    diagnoses = set()
    med_names = set()
    for rx in rx_list:
        if rx.get('diagnosis'):
            diagnoses.add(rx['diagnosis'])
        if rx.get('medicines'):
            try:
                meds = json.loads(rx['medicines'])
                for m in meds:
                    if m.get('name'):
                        med_names.add(m['name'])
            except Exception:
                pass
                
    conn.close()
    
    return {
        "patient": p_dict,
        "total_visits": total_visits,
        "last_visit": last_visit,
        "past_diagnoses": list(diagnoses),
        "frequently_prescribed_drugs": list(med_names)[:8],
        "prescriptions": rx_list
    }

def get_all_prescriptions():
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT p.*, pat.name as patient_name, doc.full_name as doctor_name
        FROM prescriptions p
        JOIN patients pat ON p.patient_id = pat.id
        JOIN doctors doc ON p.doctor_id = doc.id
        ORDER BY p.created_at DESC
    """, []).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_dashboard_stats():
    conn = get_db_connection()
    
    total_patients = conn.execute("SELECT COUNT(*) FROM patients").fetchone()[0]
    total_prescriptions = conn.execute("SELECT COUNT(*) FROM prescriptions").fetchone()[0]
    
    # Recent prescriptions (last 5)
    recent_prescriptions_rows = conn.execute("""
        SELECT p.id, p.created_at, pat.id as patient_id, pat.name as patient_name, p.diagnosis
        FROM prescriptions p
        JOIN patients pat ON p.patient_id = pat.id
        ORDER BY p.created_at DESC
        LIMIT 5
    """).fetchall()
    
    recent_patients_rows = conn.execute("""
        SELECT id, name, age, gender, contact, registration_date 
        FROM patients 
        ORDER BY id DESC 
        LIMIT 5
    """).fetchall()
    
    conn.close()
    
    recent_patients = []
    for r in recent_patients_rows:
        d = dict(r)
        d['patient_code'] = format_patient_id(d['id'])
        recent_patients.append(d)
        
    recent_prescriptions = []
    for r in recent_prescriptions_rows:
        d = dict(r)
        d['patient_code'] = format_patient_id(d['patient_id'])
        recent_prescriptions.append(d)
    
    return {
        "total_patients": total_patients,
        "total_prescriptions": total_prescriptions,
        "recent_prescriptions": recent_prescriptions,
        "recent_patients": recent_patients
    }

def get_reports_data():
    conn = get_db_connection()
    
    # Prescriptions by date (last 7 days)
    prescriptions_by_date = conn.execute("""
        SELECT date(created_at) as date_val, COUNT(*) as count_val
        FROM prescriptions
        GROUP BY date_val
        ORDER BY date_val DESC
        LIMIT 7
    """).fetchall()
    
    # Common diagnoses
    common_diagnoses = conn.execute("""
        SELECT diagnosis, COUNT(*) as count_val
        FROM prescriptions
        WHERE diagnosis IS NOT NULL AND diagnosis != ''
        GROUP BY diagnosis
        ORDER BY count_val DESC
        LIMIT 5
    """).fetchall()
    
    conn.close()
    
    return {
        "prescriptions_by_date": [dict(r) for r in reversed(prescriptions_by_date)],
        "common_diagnoses": [dict(r) for r in common_diagnoses]
    }
