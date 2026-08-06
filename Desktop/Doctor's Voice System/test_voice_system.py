import os
import unittest
import json
import sqlite3
from database import (
    init_db, login_doctor, add_patient, get_patient,
    add_prescription, get_prescription, get_dashboard_stats,
    add_vitals, get_vitals_by_patient, get_latest_vitals
)
from pdf_service import generate_prescription_pdf

class TestDoctorVoiceSystem(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        # Initialise database for testing
        init_db()

    def test_database_seeding(self):
        """Test if the database seeded the default doctor and mock data correctly."""
        conn = sqlite3.connect("doctor_voice.db")
        cursor = conn.cursor()
        
        # Check doctor
        cursor.execute("SELECT username, full_name FROM doctors WHERE username='admin'")
        doc = cursor.fetchone()
        self.assertIsNotNone(doc)
        self.assertEqual(doc[1], "Dr. Sarah Jenkins")
        
        # Check patients count
        cursor.execute("SELECT COUNT(*) FROM patients")
        patients_count = cursor.fetchone()[0]
        self.assertGreaterEqual(patients_count, 4)
        
        # Check prescriptions count
        cursor.execute("SELECT COUNT(*) FROM prescriptions")
        rx_count = cursor.fetchone()[0]
        self.assertGreaterEqual(rx_count, 2)
        
        conn.close()

    def test_doctor_login(self):
        """Test doctor authentication matching."""
        # Valid login
        doc = login_doctor("admin", "admin123")
        self.assertIsNotNone(doc)
        self.assertEqual(doc['full_name'], "Dr. Sarah Jenkins")
        
        # Invalid password
        bad_doc = login_doctor("admin", "wrongpassword")
        self.assertIsNone(bad_doc)

    def test_patient_management(self):
        """Test adding and retrieving a patient."""
        p_id = add_patient("Test Patient", 50, "Male", "5551234567")
        self.assertIsNotNone(p_id)
        
        patient = get_patient(p_id)
        self.assertIsNotNone(patient)
        self.assertEqual(patient['name'], "Test Patient")
        self.assertEqual(patient['age'], 50)
        self.assertEqual(patient['gender'], "Male")

    def test_prescription_generation(self):
        """Test adding prescription and generating its corresponding PDF."""
        # Register a patient first
        p_id = add_patient("Jane Doe", 30, "Female", "5559876543")
        
        # Add prescription
        meds_json = json.dumps([
            {"name": "Amoxicillin 500mg", "dosage": "1-0-1 after meals", "duration": "7 days"},
            {"name": "Vitamin C 1000mg", "dosage": "0-1-0", "duration": "10 days"}
        ])
        
        rx_id = add_prescription(
            patient_id=p_id,
            doctor_id=1,
            symptoms="Sore throat, fever",
            diagnosis="Streptococcal Pharyngitis",
            medicines=meds_json,
            instructions="Rest. Avoid cold beverages. Drink warm broth."
        )
        self.assertIsNotNone(rx_id)
        
        # Retrieve prescription detail
        rx = get_prescription(rx_id)
        self.assertIsNotNone(rx)
        self.assertEqual(rx['patient_name'], "Jane Doe")
        self.assertEqual(rx['doctor_name'], "Dr. Sarah Jenkins")
        
        # Generate PDF
        pdf_path = generate_prescription_pdf(rx_id)
        self.assertIsNotNone(pdf_path)
        self.assertTrue(pdf_path.startswith("/static/uploads/"))
        
        # Verify physical file exists
        local_path = pdf_path.lstrip("/")
        self.assertTrue(os.path.exists(local_path), f"PDF file not found at: {local_path}")

    def test_dashboard_stats(self):
        """Test retrieving dashboard statistics counters."""
        stats = get_dashboard_stats()
        self.assertIn("total_patients", stats)
        self.assertIn("total_prescriptions", stats)
        self.assertIn("recent_patients", stats)
        self.assertIn("recent_prescriptions", stats)
        self.assertGreaterEqual(stats["total_patients"], 1)

    def test_doctor_registration_and_reset(self):
        """Test registration of a new doctor and resetting their password."""
        from app import app
        import time
        client = app.test_client()

        test_username = f"dr_test_{int(time.time())}"
        reg_payload = {
            "username": test_username,
            "password": "initialpassword123",
            "full_name": "Dr. Gregory House",
            "specialty": "Diagnostics",
            "contact": "+1 (555) 999-0000"
        }
        res = client.post('/api/register', data=json.dumps(reg_payload), content_type='application/json')
        data = res.get_json()
        self.assertEqual(res.status_code, 200)
        self.assertTrue(data.get("success"))
        self.assertIsNotNone(data.get("doctor"))
        self.assertEqual(data["doctor"]["username"], test_username)

        # 2. Verify duplicate registration fails
        res_dup = client.post('/api/register', data=json.dumps(reg_payload), content_type='application/json')
        self.assertEqual(res_dup.status_code, 400)
        self.assertFalse(res_dup.get_json().get("success"))

        # 3. Test forgot password API with incorrect contact (should fail)
        bad_reset_payload = {
            "username": test_username,
            "contact": "0000000000",
            "new_password": "newpassword123"
        }
        res_bad_reset = client.post('/api/forgot-password', data=json.dumps(bad_reset_payload), content_type='application/json')
        self.assertEqual(res_bad_reset.status_code, 400)

        # 4. Test forgot password API with correct contact (should succeed)
        valid_reset_payload = {
            "username": test_username,
            "contact": "+1 (555) 999-0000",
            "new_password": "newpassword123"
        }
        res_reset = client.post('/api/forgot-password', data=json.dumps(valid_reset_payload), content_type='application/json')
        self.assertEqual(res_reset.status_code, 200)
        self.assertTrue(res_reset.get_json().get("success"))

        # 5. Verify login with new password
        login_res = client.post('/api/login', data=json.dumps({"username": test_username, "password": "newpassword123"}), content_type='application/json')
        self.assertEqual(login_res.status_code, 200)
        self.assertTrue(login_res.get_json().get("success"))

    def test_vitals_tracking(self):
        """Test adding vitals and retrieving vitals history for a patient."""
        p_id = add_patient("Vitals Patient", 45, "Female", "5558881234")
        v_id = add_vitals(
            patient_id=p_id,
            prescription_id=None,
            bp_systolic=120,
            bp_diastolic=80,
            pulse_rate=72,
            temperature=98.6,
            spo2=99,
            weight_kg=70.0,
            height_cm=175.0,
            bmi=22.9
        )
        self.assertIsNotNone(v_id)
        
        vitals_list = get_vitals_by_patient(p_id)
        self.assertEqual(len(vitals_list), 1)
        self.assertEqual(vitals_list[0]['bp_systolic'], 120)
        self.assertEqual(vitals_list[0]['bmi'], 22.9)
        
        latest = get_latest_vitals(p_id)
        self.assertIsNotNone(latest)
        self.assertEqual(latest['pulse_rate'], 72)

if __name__ == '__main__':
    unittest.main()

