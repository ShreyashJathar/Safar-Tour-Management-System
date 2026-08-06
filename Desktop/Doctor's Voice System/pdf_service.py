import os
import json
from fpdf import FPDF
from database import get_prescription

class PrescriptionPDF(FPDF):
    def __init__(self, doctor_name, doctor_specialty, doctor_contact):
        super().__init__()
        self.doctor_name = doctor_name
        self.doctor_specialty = doctor_specialty
        self.doctor_contact = doctor_contact

    def header(self):
        # Doctor Header Box
        self.set_fill_color(240, 244, 248) # Light bluish background
        self.rect(0, 0, 210, 45, 'F')
        
        self.set_xy(15, 10)
        self.set_font('Helvetica', 'B', 18)
        self.set_text_color(26, 54, 93) # Dark blue
        self.cell(0, 10, self.doctor_name, ln=1)
        
        self.set_x(15)
        self.set_font('Helvetica', 'I', 11)
        self.set_text_color(74, 85, 104) # Muted gray
        self.cell(0, 5, self.doctor_specialty, ln=1)
        
        self.set_x(15)
        self.set_font('Helvetica', '', 10)
        self.cell(0, 5, f"Contact: {self.doctor_contact}", ln=1)
        
        # RX Brand Label
        self.set_xy(150, 10)
        self.set_font('Helvetica', 'B', 22)
        self.set_text_color(49, 130, 206) # Premium Accent Blue
        self.cell(45, 10, "PRESCRIPTION", align='R', ln=1)
        
        self.set_xy(150, 20)
        self.set_font('Helvetica', '', 9)
        self.set_text_color(113, 128, 150)
        self.cell(45, 5, "Doctor Voice System", align='R', ln=1)
        
        # Space below header
        self.set_y(50)

    def footer(self):
        self.set_y(-25)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(160, 174, 192)
        self.cell(0, 5, "This is an electronically generated prescription. No signature required.", align='C', ln=1)
        self.cell(0, 5, f"Page {self.page_no()}", align='C')

def generate_prescription_pdf(prescription_id):
    # Fetch prescription data from database
    p_data = get_prescription(prescription_id)
    if not p_data:
        raise ValueError(f"Prescription with ID {prescription_id} not found.")

    pdf = PrescriptionPDF(
        doctor_name=p_data['doctor_name'],
        doctor_specialty=p_data['doctor_specialty'],
        doctor_contact=p_data['doctor_contact']
    )
    pdf.add_page()
    
    # 1. Patient Info Card
    pdf.set_fill_color(248, 250, 252) # Soft border background
    pdf.rect(15, 50, 180, 28, 'F')
    
    patient_code = p_data.get('patient_code', f"PID-{p_data.get('patient_id', 0):04d}")

    # Text inside Patient Card
    pdf.set_xy(20, 53)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.cell(30, 6, "Patient ID:")
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(49, 130, 206) # Accent blue for Patient ID
    pdf.cell(70, 6, patient_code)
    
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.cell(20, 6, "Date:")
    pdf.set_font('Helvetica', '', 10)
    date_str = p_data['created_at'].split(' ')[0]
    pdf.cell(60, 6, date_str, ln=1)
    
    pdf.set_x(20)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(30, 6, "Patient Name:")
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(70, 6, p_data['patient_name'])
    
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(20, 6, "Rx ID:")
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(60, 6, f"RX-2026-{prescription_id:04d}", ln=1)

    pdf.set_x(20)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(30, 6, "Age / Gender:")
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(70, 6, f"{p_data['patient_age']} Yrs / {p_data['patient_gender']}")

    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(20, 6, "Contact:")
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(60, 6, p_data['patient_contact'], ln=1)

    # 2. Symptoms & Diagnosis
    pdf.set_y(85)
    pdf.set_x(15)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(26, 54, 93)
    pdf.cell(0, 8, "Clinical Assessment", ln=1)
    pdf.line(15, 93, 195, 93)
    
    pdf.set_y(96)
    pdf.set_x(15)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(74, 85, 104)
    pdf.cell(30, 6, "Symptoms:")
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.multi_cell(0, 6, p_data['symptoms'] if p_data['symptoms'] else "None reported")
    
    pdf.set_x(15)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(74, 85, 104)
    pdf.cell(30, 6, "Diagnosis:")
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.multi_cell(0, 6, p_data['diagnosis'] if p_data['diagnosis'] else "Routine checkup")

    vitals = p_data.get('vitals')
    if vitals:
        pdf.set_x(15)
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(74, 85, 104)
        pdf.cell(30, 6, "Vitals:")
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(45, 55, 72)
        vitals_str = []
        if vitals.get('bp_systolic') and vitals.get('bp_diastolic'):
            vitals_str.append(f"BP: {vitals['bp_systolic']}/{vitals['bp_diastolic']} mmHg")
        if vitals.get('pulse_rate'):
            vitals_str.append(f"Pulse: {vitals['pulse_rate']} bpm")
        if vitals.get('temperature'):
            vitals_str.append(f"Temp: {vitals['temperature']} deg F")
        if vitals.get('spo2'):
            vitals_str.append(f"SpO2: {vitals['spo2']}%")
        if vitals.get('weight_kg'):
            vitals_str.append(f"Weight: {vitals['weight_kg']} kg")
        if vitals.get('bmi'):
            vitals_str.append(f"BMI: {vitals['bmi']}")
        pdf.multi_cell(0, 6, " | ".join(vitals_str) if vitals_str else "Recorded")

    # 3. RX Symbol & Medicines
    pdf.set_y(120)
    pdf.set_x(15)
    pdf.set_font('Helvetica', 'B', 24)
    pdf.set_text_color(49, 130, 206)
    pdf.cell(15, 10, "Rx")
    
    pdf.set_y(123)
    pdf.set_x(30)
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(26, 54, 93)
    pdf.cell(0, 8, "Medication / Prescribed Drugs", ln=1)
    pdf.line(15, 131, 195, 131)
    
    pdf.set_y(135)
    
    # Table Header
    pdf.set_x(15)
    pdf.set_fill_color(240, 244, 248)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.cell(80, 8, " Medicine Name", border=1, fill=True)
    pdf.cell(60, 8, " Dosage", border=1, fill=True)
    pdf.cell(40, 8, " Duration", border=1, fill=True, ln=1)
    
    # Table Rows
    pdf.set_font('Helvetica', '', 10)
    try:
        medicines_list = json.loads(p_data['medicines']) if p_data['medicines'] else []
    except json.JSONDecodeError:
        medicines_list = []
        
    if not medicines_list:
        pdf.set_x(15)
        pdf.cell(180, 8, " No medicines prescribed", border=1, ln=1, align='C')
    else:
        for med in medicines_list:
            pdf.set_x(15)
            pdf.cell(80, 8, f" {med.get('name', 'N/A')}", border=1)
            pdf.cell(60, 8, f" {med.get('dosage', 'N/A')}", border=1)
            pdf.cell(40, 8, f" {med.get('duration', 'N/A')}", border=1, ln=1)

    # 4. Advice & Instructions
    pdf.set_y(pdf.get_y() + 10)
    pdf.set_x(15)
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(26, 54, 93)
    pdf.cell(0, 6, "Advice / Instructions:", ln=1)
    pdf.set_x(15)
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(45, 55, 72)
    pdf.multi_cell(0, 6, p_data['instructions'] if p_data['instructions'] else "Follow up as needed.")

    # 5. Doctor Signature Section
    pdf.set_y(235)
    pdf.set_x(130)
    pdf.line(130, 235, 195, 235)
    pdf.set_x(130)
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(74, 85, 104)
    pdf.cell(65, 5, p_data['doctor_name'], align='C', ln=1)
    pdf.set_x(130)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(65, 5, p_data['doctor_specialty'], align='C', ln=1)

    # Output to File
    output_dir = os.path.join("static", "uploads")
    os.makedirs(output_dir, exist_ok=True)
    
    file_name = f"prescription_{prescription_id}.pdf"
    file_path = os.path.join(output_dir, file_name)
    
    pdf.output(file_path)
    return f"/static/uploads/{file_name}"
