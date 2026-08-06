/* ==========================================================================
   DOCTOR VOICE SYSTEM - FRONTEND APPLICATION DRIVER
   ========================================================================== */

let voiceAssistant;
let appState = {
    currentDoctor: null,
    patientsList: [],
    activePatientId: null,
    prescriptionMeds: [], // List of {name, dosage, duration}
    charts: {
        trend: null,
        diagnoses: null,
        vitals: null
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Check if opened via file:// protocol
    if (window.location.protocol === 'file:') {
        const warningBanner = document.getElementById('file-protocol-warning');
        if (warningBanner) warningBanner.style.display = 'flex';
        alert("Local file protocol detected! Please run 'run.bat' or run 'python run.py' and open http://localhost:5000/ in your browser to log in.");
        return;
    }

    // Initialize Voice Engine
    voiceAssistant = new VoiceAssistant();
    
    // Check doctor session on load
    checkSession();
    
    // Bind UI controls
    setupNavigation();
    setupForms();
    setupModals();
    setupVoiceButtons();
    setupSimulator();
    
    // Update live clock
    updateClock();
    setInterval(updateClock, 60000);
});

// ==========================================================================
// SESSION & AUTHENTICATION
// ==========================================================================

function checkSession() {
    fetch('/api/session')
        .then(res => res.json())
        .then(data => {
            if (data.logged_in) {
                onLoginSuccess(data.doctor);
            } else {
                showScreen('login-screen');
            }
        })
        .catch(err => {
            console.error("Session check error: ", err);
            showScreen('login-screen');
        });
}

function onLoginSuccess(doctor) {
    appState.currentDoctor = doctor;
    
    // Populate profile details
    document.getElementById('doc-profile-name').textContent = doctor.full_name;
    document.getElementById('doc-profile-specialty').textContent = doctor.specialty;
    
    // Welcome text
    document.getElementById('panel-title').textContent = "Dashboard Overview";
    
    showScreen('portal-screen');
    showTab('dashboard');
    
    // Load initial data
    loadDashboardStats();
    loadPatients();
    loadReports();
    
    showToast(`Welcome back, ${doctor.full_name}!`, "success");
    voiceAssistant.speakText(`Welcome back, doctor.`);
}

// ==========================================================================
// SPA SCREEN & TAB ROUTING
// ==========================================================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(scr => {
        scr.classList.remove('active');
        scr.style.display = 'none';
    });
    
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = (screenId === 'portal-screen') ? 'flex' : 'block';
        setTimeout(() => target.classList.add('active'), 50);
    }
}

function showTab(tabId) {
    // Deactivate current active tab
    document.querySelectorAll('.content-section').forEach(sect => {
        sect.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(lnk => {
        lnk.classList.remove('active');
    });

    // Activate selected tab
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    const targetLink = document.querySelector(`.nav-link[data-target="${tabId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Set panel title
    const titleMap = {
        'dashboard': 'Dashboard Overview',
        'patient-registration': 'Register New Patient',
        'prescription-generator': 'Prescription Writer',
        'patient-records': 'Clinical Records & History',
        'reports': 'Practice Reports & Analytics'
    };
    document.getElementById('panel-title').textContent = titleMap[tabId] || 'Portal';

    // Contextual actions
    if (tabId === 'dashboard') {
        loadDashboardStats();
    } else if (tabId === 'patient-records') {
        loadPatients();
    } else if (tabId === 'reports') {
        loadReports();
    }
}

function setupNavigation() {
    // Sidebar clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            showTab(target);
        });
    });

    // Dashboard navigators
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.nav-link-trigger');
        if (trigger) {
            const target = trigger.getAttribute('data-target');
            showTab(target);
        }
    });
}

// ==========================================================================
// FORM SUBMISSIONS & API CALLS
// ==========================================================================

function showAuthCard(cardId) {
    document.querySelectorAll('.auth-card').forEach(card => {
        card.style.display = 'none';
        card.classList.remove('active-card');
    });
    const target = document.getElementById(cardId);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active-card'), 50);
    }
}

function setupForms() {
    // 1. Doctor Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    onLoginSuccess(data.doctor);
                } else {
                    showToast(data.message || "Invalid credentials", "error");
                    voiceAssistant.speakText("Access denied. Invalid credentials.");
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Server error. Please try again.", "error");
            });
        });
    }

    // Toggle login password view
    const togglePwdBtn = document.getElementById('toggle-password');
    if (togglePwdBtn) {
        togglePwdBtn.addEventListener('click', function() {
            const pwdInput = document.getElementById('password');
            const icon = this.querySelector('i');
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                icon.className = 'fa-regular fa-eye-slash';
            } else {
                pwdInput.type = 'password';
                icon.className = 'fa-regular fa-eye';
            }
        });
    }

    // Auth screen card navigation links
    const gotoRegisterBtn = document.getElementById('goto-register-btn');
    if (gotoRegisterBtn) {
        gotoRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthCard('register-card');
        });
    }

    const gotoForgotBtn = document.getElementById('goto-forgot-btn');
    if (gotoForgotBtn) {
        gotoForgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthCard('forgot-card');
        });
    }

    const gotoLoginBtn1 = document.getElementById('goto-login-btn-1');
    if (gotoLoginBtn1) {
        gotoLoginBtn1.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthCard('login-card');
        });
    }

    const gotoLoginBtn2 = document.getElementById('goto-login-btn-2');
    if (gotoLoginBtn2) {
        gotoLoginBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthCard('login-card');
        });
    }

    // 2. Doctor Registration Form
    const regDocForm = document.getElementById('register-form');
    if (regDocForm) {
        regDocForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value.trim();
            const full_name = document.getElementById('reg-fullname').value.trim();
            const specialty = document.getElementById('reg-specialty').value.trim();
            const contact = document.getElementById('reg-doctor-contact').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            if (password !== confirmPassword) {
                showToast("Passwords do not match!", "error");
                voiceAssistant.speakText("Passwords do not match.");
                return;
            }

            fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, full_name, specialty, contact })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast(data.message || "Account created successfully!", "success");
                    if (data.doctor) {
                        onLoginSuccess(data.doctor);
                    } else {
                        showAuthCard('login-card');
                        document.getElementById('username').value = username;
                    }
                } else {
                    showToast(data.message || "Registration failed.", "error");
                    voiceAssistant.speakText("Registration failed.");
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Server error during registration.", "error");
            });
        });
    }

    // Toggle register password view
    const toggleRegPwdBtn = document.getElementById('toggle-reg-password');
    if (toggleRegPwdBtn) {
        toggleRegPwdBtn.addEventListener('click', function() {
            const pwdInput = document.getElementById('reg-password');
            const icon = this.querySelector('i');
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                icon.className = 'fa-regular fa-eye-slash';
            } else {
                pwdInput.type = 'password';
                icon.className = 'fa-regular fa-eye';
            }
        });
    }

    // 3. Doctor Forgot Password Form
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('forgot-username').value.trim();
            const contact = document.getElementById('forgot-contact').value.trim();
            const new_password = document.getElementById('forgot-new-password').value;
            const confirmPassword = document.getElementById('forgot-confirm-password').value;

            if (new_password !== confirmPassword) {
                showToast("New passwords do not match!", "error");
                voiceAssistant.speakText("Passwords do not match.");
                return;
            }

            fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, contact, new_password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast(data.message || "Password reset successfully!", "success");
                    voiceAssistant.speakText("Password reset successfully. Please log in.");
                    forgotForm.reset();
                    showAuthCard('login-card');
                    document.getElementById('username').value = username;
                } else {
                    showToast(data.message || "Password reset failed.", "error");
                    voiceAssistant.speakText("Verification failed.");
                }
            })
            .catch(err => {
                console.error(err);
                showToast("Server error during password reset.", "error");
            });
        });
    }

    // Toggle forgot password view
    const toggleForgotPwdBtn = document.getElementById('toggle-forgot-password');
    if (toggleForgotPwdBtn) {
        toggleForgotPwdBtn.addEventListener('click', function() {
            const pwdInput = document.getElementById('forgot-new-password');
            const icon = this.querySelector('i');
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                icon.className = 'fa-regular fa-eye-slash';
            } else {
                pwdInput.type = 'password';
                icon.className = 'fa-regular fa-eye';
            }
        });
    }

    // 2. Patient Registration Form
    const regForm = document.getElementById('patient-reg-form');
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const age = parseInt(document.getElementById('reg-age').value);
        const gender = document.getElementById('reg-gender').value;
        const contact = document.getElementById('reg-contact').value.trim();
        const medical_history = document.getElementById('reg-history')?.value.trim() || '';

        fetch('/api/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, gender, contact, medical_history })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const pCode = data.patient_code || formatPatientId(data.patient_id);
                showToast(`Patient registered! Assigned Patient ID: ${pCode}`, "success");
                voiceAssistant.speakText(`Patient ${name} registered with Patient ID ${pCode}.`);
                regForm.reset();
                // Load patients and navigate to prescription writer with patient selected
                setTimeout(() => {
                    loadPatients().then(() => {
                        const sel = document.getElementById('rx-patient-select');
                        if (sel) {
                            sel.value = data.patient_id;
                            loadPatientHistoryQuickCard(data.patient_id);
                        }
                        showTab('prescription-generator');
                    });
                }, 400);
            } else {
                showToast(data.message || "Registration failed", "error");
            }
        })
        .catch(err => console.error(err));
    });

    document.getElementById('clear-reg-form-btn').addEventListener('click', () => {
        regForm.reset();
        showToast("Form cleared", "info");
    });

    // 3. Prescription - Medicine Add Controls
    const addMedBtn = document.getElementById('add-med-btn');
    addMedBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('med-name');
        const dosageInput = document.getElementById('med-dosage');
        const durationInput = document.getElementById('med-duration');
        
        const name = nameInput.value.trim();
        const dosage = dosageInput.value.trim();
        const duration = durationInput.value.trim();

        if (!name) {
            showToast("Medicine name is required", "error");
            return;
        }

        appState.prescriptionMeds.push({ name, dosage: dosage || 'As directed', duration: duration || 'L.D.' });
        renderMedsTable();

        // Reset inputs
        nameInput.value = "";
        dosageInput.value = "";
        durationInput.value = "";
        nameInput.focus();
    });

    // Live BMI calculation listener
    const weightEl = document.getElementById('vital-weight');
    const heightEl = document.getElementById('vital-height');
    const bmiBadge = document.getElementById('bmi-badge-preview');
    
    function updateBMICalculation() {
        const w = parseFloat(weightEl?.value);
        const h = parseFloat(heightEl?.value);
        if (w > 0 && h > 0) {
            const hM = h / 100.0;
            const bmi = (w / (hM * hM)).toFixed(1);
            let cat = "Normal";
            let catClass = "bmi-normal";
            if (bmi < 18.5) { cat = "Underweight"; catClass = "bmi-underweight"; }
            else if (bmi >= 25.0 && bmi < 30.0) { cat = "Overweight"; catClass = "bmi-overweight"; }
            else if (bmi >= 30.0) { cat = "Obese"; catClass = "bmi-obese"; }
            
            if (bmiBadge) {
                bmiBadge.className = `bmi-badge ${catClass}`;
                bmiBadge.innerHTML = `BMI: <strong>${bmi}</strong> (${cat})`;
                bmiBadge.style.display = 'inline-flex';
            }
        } else if (bmiBadge) {
            bmiBadge.style.display = 'none';
        }
    }
    
    if (weightEl && heightEl) {
        weightEl.addEventListener('input', updateBMICalculation);
        heightEl.addEventListener('input', updateBMICalculation);
    }

    // 4. Prescription Submit Form & Patient Change Listener
    const rxPatientSelect = document.getElementById('rx-patient-select');
    if (rxPatientSelect) {
        rxPatientSelect.addEventListener('change', function() {
            const patientId = this.value;
            if (patientId) {
                loadPatientHistoryQuickCard(patientId);
            } else {
                const historyCard = document.getElementById('rx-patient-history-card');
                if (historyCard) historyCard.style.display = 'none';
            }
        });
    }

    const rxForm = document.getElementById('prescription-form');
    rxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const patientId = document.getElementById('rx-patient-select').value;
        const symptoms = document.getElementById('rx-symptoms').value.trim();
        const diagnosis = document.getElementById('rx-diagnosis').value.trim();
        const instructions = document.getElementById('rx-instructions').value.trim();

        if (!patientId) {
            showToast("Please select a patient", "error");
            return;
        }

        if (appState.prescriptionMeds.length === 0) {
            showToast("Please add at least one medicine", "error");
            return;
        }

        // Vitals extraction
        const bpSys = parseInt(document.getElementById('vital-bp-sys')?.value) || null;
        const bpDia = parseInt(document.getElementById('vital-bp-dia')?.value) || null;
        const pulse = parseInt(document.getElementById('vital-pulse')?.value) || null;
        const temp = parseFloat(document.getElementById('vital-temp')?.value) || null;
        const spo2 = parseInt(document.getElementById('vital-spo2')?.value) || null;
        const weight = parseFloat(document.getElementById('vital-weight')?.value) || null;
        const height = parseFloat(document.getElementById('vital-height')?.value) || null;
        
        let vitalsObj = null;
        if (bpSys || bpDia || pulse || temp || spo2 || weight || height) {
            let bmiVal = null;
            if (weight && height && height > 0) {
                const hM = height / 100.0;
                bmiVal = parseFloat((weight / (hM * hM)).toFixed(1));
            }
            vitalsObj = {
                bp_systolic: bpSys,
                bp_diastolic: bpDia,
                pulse_rate: pulse,
                temperature: temp,
                spo2: spo2,
                weight_kg: weight,
                height_cm: height,
                bmi: bmiVal
            };
        }

        fetch('/api/prescriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patient_id: patientId,
                symptoms,
                diagnosis,
                medicines: JSON.stringify(appState.prescriptionMeds),
                instructions,
                vitals: vitalsObj
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showToast("Prescription generated successfully!", "success");
                voiceAssistant.speakText("Prescription saved successfully.");
                
                // Show PDF in modal
                openPDFModal(data.pdf_url);
                
                // Clear state and reset form
                appState.prescriptionMeds = [];
                renderMedsTable();
                rxForm.reset();
                if (bmiBadge) bmiBadge.style.display = 'none';
                const historyCard = document.getElementById('rx-patient-history-card');
                if (historyCard) historyCard.style.display = 'none';
            } else {
                showToast(data.message || "Failed to generate prescription", "error");
            }
        })
        .catch(err => console.error(err));
    });

    document.getElementById('clear-rx-form-btn').addEventListener('click', () => {
        rxForm.reset();
        if (bmiBadge) bmiBadge.style.display = 'none';
        appState.prescriptionMeds = [];
        renderMedsTable();
        showToast("Prescription form cleared", "info");
    });

    // Read Rx Aloud
    document.getElementById('read-rx-aloud-btn').addEventListener('click', () => {
        const patientSelect = document.getElementById('rx-patient-select');
        const patientName = patientSelect.options[patientSelect.selectedIndex]?.text || "selected patient";
        const symptoms = document.getElementById('rx-symptoms').value;
        const diagnosis = document.getElementById('rx-diagnosis').value;
        
        let text = `Prescription for ${patientName}. `;
        if (symptoms) text += `Symptoms: ${symptoms}. `;
        if (diagnosis) text += `Diagnosis: ${diagnosis}. `;
        
        if (appState.prescriptionMeds.length > 0) {
            text += `Prescribed medicines: `;
            appState.prescriptionMeds.forEach(m => {
                text += `${m.name}, dosage: ${m.dosage}, for ${m.duration}. `;
            });
        }
        
        voiceAssistant.speakText(text);
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        fetch('/api/logout', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                showToast("Logged out successfully.", "info");
                appState.currentDoctor = null;
                showScreen('login-screen');
            });
    });
}

function renderMedsTable() {
    const tbody = document.getElementById('med-list-body');
    tbody.innerHTML = "";
    
    if (appState.prescriptionMeds.length === 0) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="4" class="text-center text-muted">No medicines added yet. Speak or type to add.</td></tr>`;
        return;
    }

    appState.prescriptionMeds.forEach((med, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${med.name}</td>
            <td>${med.dosage}</td>
            <td>${med.duration}</td>
            <td>
                <button type="button" class="btn-delete" data-index="${idx}" title="Remove drug">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Bind delete actions
    tbody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            appState.prescriptionMeds.splice(idx, 1);
            renderMedsTable();
        });
    });
}

// ==========================================================================
// VOICE BINDINGS & SPEECH triggers
// ==========================================================================

function setupVoiceButtons() {
    // Global voice assistant mic
    const globalMic = document.getElementById('global-mic-btn');
    if (globalMic) {
        globalMic.addEventListener('click', () => {
            voiceAssistant.startListening('global');
        });
    }

    // Floating micro-indicator help icon
    const voiceHelpBtn = document.getElementById('voice-help-btn');
    if (voiceHelpBtn) {
        voiceHelpBtn.addEventListener('click', () => {
            openModal('voice-help-modal');
        });
    }

    // Patient Form Fill
    const voiceFillPatientBtn = document.getElementById('voice-fill-patient-btn');
    if (voiceFillPatientBtn) {
        voiceFillPatientBtn.addEventListener('click', () => {
            voiceAssistant.startListening('patient-fill');
        });
    }

    // Prescription Medicine Fill
    const voiceAddMedBtn = document.getElementById('voice-add-med-btn');
    if (voiceAddMedBtn) {
        voiceAddMedBtn.addEventListener('click', () => {
            voiceAssistant.startListening('med-fill');
        });
    }

    // Records Voice Search
    const recordsSearchMic = document.getElementById('records-search-mic');
    if (recordsSearchMic) {
        recordsSearchMic.addEventListener('click', () => {
            voiceAssistant.startListening('search-records');
        });
    }

    // Individual Text Field Dictation triggers
    document.addEventListener('click', (e) => {
        const micBtn = e.target.closest('.field-mic-btn');
        if (micBtn) {
            const fieldId = micBtn.getAttribute('data-field');
            const targetEl = document.getElementById(fieldId);
            if (targetEl) {
                voiceAssistant.startListening('field-dictate', targetEl);
            }
        }
    });
}

// Keyboard simulator: allows text command typing when microphone is absent
function setupSimulator() {
    const simBtn = document.getElementById('voice-simulator-btn');
    const simInput = document.getElementById('voice-simulator-input');
    if (!simBtn || !simInput) return;

    const handleSimSubmit = () => {
        const text = simInput.value.trim();
        if (text) {
            showToast(`Simulated Command: "${text}"`, "info");
            voiceAssistant.processInput(text);
            simInput.value = "";
        }
    };

    simBtn.addEventListener('click', handleSimSubmit);
    simInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSimSubmit();
        }
    });
}

// ==========================================================================
// DATA FETCHING & POPULATION
// ==========================================================================

function formatPatientId(id) {
    if (!id) return "PID-0000";
    if (typeof id === 'string' && id.startsWith('PID-')) return id;
    return `PID-${String(id).padStart(4, '0')}`;
}

function loadDashboardStats() {
    fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
            document.getElementById('stat-total-patients').textContent = data.total_patients;
            document.getElementById('stat-total-prescriptions').textContent = data.total_prescriptions;

            // Load lists
            const patientsList = document.getElementById('recent-patients-list');
            patientsList.innerHTML = "";
            if (data.recent_patients.length === 0) {
                patientsList.innerHTML = `<tr><td colspan="5" class="text-center">No patients registered today.</td></tr>`;
            } else {
                data.recent_patients.forEach(pat => {
                    const pCode = pat.patient_code || formatPatientId(pat.id);
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><span class="badge-pid">${pCode}</span></td>
                        <td><strong>${pat.name}</strong></td>
                        <td>${pat.age} Yrs / ${pat.gender}</td>
                        <td>${pat.contact}</td>
                        <td>${pat.registration_date}</td>
                    `;
                    patientsList.appendChild(tr);
                });
            }

            const prescriptionsList = document.getElementById('recent-prescriptions-list');
            prescriptionsList.innerHTML = "";
            if (data.recent_prescriptions.length === 0) {
                prescriptionsList.innerHTML = `<tr><td colspan="4" class="text-center">No prescriptions generated yet.</td></tr>`;
            } else {
                data.recent_prescriptions.forEach(rx => {
                    const pCode = rx.patient_code || formatPatientId(rx.patient_id);
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><span class="badge-pid-sm">${pCode}</span> <strong>${rx.patient_name}</strong></td>
                        <td>${rx.diagnosis}</td>
                        <td>${rx.created_at.split(' ')[0]}</td>
                        <td><button class="btn-text view-pdf-action" data-pdf-id="${rx.id}"><i class="fa-solid fa-file-pdf"></i> View</button></td>
                    `;
                    prescriptionsList.appendChild(tr);
                });

                // Bind view PDF clicks
                prescriptionsList.querySelectorAll('.view-pdf-action').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = this.getAttribute('data-pdf-id');
                        openPDFModal(`/static/uploads/prescription_${id}.pdf`);
                    });
                });
            }
        })
        .catch(err => console.error("Stats fetching error: ", err));
}

function loadPatients() {
    return fetch('/api/patients')
        .then(res => res.json())
        .then(patients => {
            appState.patientsList = patients;
            
            // Next patient ID update on registration form
            const maxId = patients.reduce((max, p) => Math.max(max, p.id || 0), 0);
            const nextPidEl = document.getElementById('next-patient-id');
            if (nextPidEl) nextPidEl.textContent = formatPatientId(maxId + 1);

            // Populate Prescription select dropdown
            const rxSelect = document.getElementById('rx-patient-select');
            rxSelect.innerHTML = `<option value="" disabled selected>-- Select Patient --</option>`;
            patients.forEach(pat => {
                const opt = document.createElement('option');
                opt.value = pat.id;
                const pCode = pat.patient_code || formatPatientId(pat.id);
                opt.textContent = `${pCode} • ${pat.name} (${pat.age} Yrs, ${pat.gender})`;
                rxSelect.appendChild(opt);
            });

            // Populate Records List
            renderRecordsPatientList(patients);
        })
        .catch(err => console.error("Patients fetching error: ", err));
}

function renderRecordsPatientList(list) {
    const listContainer = document.getElementById('patient-records-list');
    listContainer.innerHTML = "";
    
    if (list.length === 0) {
        listContainer.innerHTML = `<li class="text-center text-muted p-4">No patients match filter.</li>`;
        return;
    }

    list.forEach(pat => {
        const li = document.createElement('li');
        const pCode = pat.patient_code || formatPatientId(pat.id);
        li.innerHTML = `
            <button class="patient-item-btn" data-id="${pat.id}">
                <div class="patient-item-header">
                    <span class="patient-item-name">${pat.name}</span>
                    <span class="badge-pid">${pCode}</span>
                </div>
                <span class="patient-item-details">${pat.age} Yrs / ${pat.gender} • Reg: ${pat.registration_date}</span>
            </button>
        `;
        listContainer.appendChild(li);
    });

    // Bind item clicks
    listContainer.querySelectorAll('.patient-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            listContainer.querySelectorAll('.patient-item-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const id = parseInt(this.getAttribute('data-id'));
            loadPatientDetail(id);
        });
    });

    // Search query binding
    const searchInput = document.getElementById('patient-search-input');
    searchInput.removeEventListener('input', handlePatientSearch);
    searchInput.addEventListener('input', handlePatientSearch);
}

function handlePatientSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const filtered = appState.patientsList.filter(p => {
        const pCode = (p.patient_code || formatPatientId(p.id)).toLowerCase();
        const pName = p.name.toLowerCase();
        const pContact = (p.contact || '').toLowerCase();
        return pCode.includes(query) || pName.includes(query) || pContact.includes(query);
    });
    renderRecordsPatientList(filtered);
}

function loadPatientDetail(patientId) {
    appState.activePatientId = patientId;
    const patient = appState.patientsList.find(p => p.id === patientId);
    if (!patient) return;

    const pCode = patient.patient_code || formatPatientId(patient.id);

    // Fill Header
    document.getElementById('detail-patient-name').textContent = patient.name;
    const badgeEl = document.getElementById('detail-patient-id-badge');
    if (badgeEl) badgeEl.textContent = pCode;
    document.getElementById('detail-patient-meta').textContent = `${patient.age} Yrs / ${patient.gender} • Contact: ${patient.contact}`;

    // Read details button hook
    document.getElementById('read-patient-details-btn').onclick = () => {
        let voiceText = `Patient details for ${patient.name}. Age ${patient.age}. Gender ${patient.gender}. Registered on ${patient.registration_date}.`;
        
        // Fetch last diagnosis
        const firstTimeline = document.querySelector('.timeline-card');
        if (firstTimeline) {
            const diag = firstTimeline.querySelector('.diag-text').textContent;
            voiceText += ` Last diagnosis is: ${diag}.`;
        }
        voiceAssistant.speakText(voiceText);
    };

    // Load prescription list
    fetch(`/api/prescriptions/patient/${patientId}`)
        .then(res => res.json())
        .then(prescriptions => {
            const timeline = document.getElementById('prescription-timeline');
            timeline.innerHTML = "";
            
            if (prescriptions.length === 0) {
                timeline.innerHTML = `<p class="text-muted">No prescriptions generated for this patient.</p>`;
            } else {
                prescriptions.forEach(p => {
                    const item = document.createElement('div');
                    item.className = 'timeline-item';
                    
                    let medsTags = "";
                    try {
                        const meds = JSON.parse(p.medicines);
                        meds.forEach(m => {
                            medsTags += `<span class="med-tag">${m.name} (${m.dosage})</span>`;
                        });
                    } catch (e) {
                        medsTags = `<span class="text-muted">Error reading medications</span>`;
                    }

                    item.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-card">
                            <div class="timeline-header">
                                <span class="timeline-date"><i class="fa-regular fa-calendar-days"></i> ${p.created_at}</span>
                                <div class="timeline-actions">
                                    <button class="btn-action-icon read-rx" data-p-id="${p.id}" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                                    <button class="btn-action-icon view-pdf" data-pdf-url="/static/uploads/prescription_${p.id}.pdf" title="View PDF"><i class="fa-solid fa-file-pdf"></i></button>
                                </div>
                            </div>
                            <div class="timeline-body">
                                <div class="body-section">
                                    <h5>Symptoms</h5>
                                    <p>${p.symptoms || 'None reported'}</p>
                                </div>
                                <div class="body-section">
                                    <h5>Diagnosis</h5>
                                    <p class="diag-text">${p.diagnosis || 'General checkup'}</p>
                                </div>
                            </div>
                            <div class="timeline-meds-list">
                                <h5>Prescribed Drugs (Rx)</h5>
                                <div class="rx-med-capsules">
                                    ${medsTags}
                                </div>
                            </div>
                            ${p.instructions ? `<div class="timeline-instructions"><strong>Doctor Advice:</strong> ${p.instructions}</div>` : ''}
                        </div>
                    `;
                    timeline.appendChild(item);
                });

                // Bind actions inside timeline
                timeline.querySelectorAll('.view-pdf').forEach(btn => {
                    btn.addEventListener('click', function() {
                        openPDFModal(this.getAttribute('data-pdf-url'));
                    });
                });

                timeline.querySelectorAll('.read-rx').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const prescriptionId = this.getAttribute('data-p-id');
                        fetch(`/api/prescriptions/detail/${prescriptionId}`)
                            .then(res => res.json())
                            .then(data => {
                                let readText = `Prescription written by ${data.doctor_name} on ${data.created_at.split(' ')[0]}. `;
                                if (data.diagnosis) readText += `Diagnosis is ${data.diagnosis}. `;
                                try {
                                    const meds = JSON.parse(data.medicines);
                                    if (meds.length > 0) {
                                        readText += "Medications prescribed are: ";
                                        meds.forEach(m => {
                                            readText += `${m.name}, dosage: ${m.dosage}. `;
                                        });
                                    }
                                } catch (e) {}
                                if (data.instructions) readText += `Advice: ${data.instructions}.`;
                                voiceAssistant.speakText(readText);
                            });
                    });
                });

                // Timeline filter binding
                const filterInput = document.getElementById('history-filter-input');
                if (filterInput) {
                    filterInput.value = "";
                    filterInput.oninput = (e) => {
                        const q = e.target.value.toLowerCase().trim();
                        const items = timeline.querySelectorAll('.timeline-item');
                        items.forEach(item => {
                            const textContent = item.textContent.toLowerCase();
                            item.style.display = textContent.includes(q) ? 'flex' : 'none';
                        });
                    };
                }
            }

            // Load Vitals history & chart
            loadPatientVitalsHistory(patientId);

            document.getElementById('patient-detail-empty').style.display = 'none';
            document.getElementById('patient-detail-content').style.display = 'block';
        })
        .catch(err => console.error(err));
}

function loadPatientVitalsHistory(patientId) {
    fetch(`/api/vitals/patient/${patientId}`)
        .then(res => res.json())
        .then(data => {
            const vitalsList = data.vitals || [];
            const latest = data.latest;
            const badgeContainer = document.getElementById('latest-vitals-summary-badge');
            
            if (badgeContainer) {
                badgeContainer.innerHTML = "";
                if (latest) {
                    let badgesHtml = "";
                    if (latest.bp_systolic && latest.bp_diastolic) {
                        badgesHtml += `<span class="vitals-summary-pill"><i class="fa-solid fa-heart-pulse"></i> BP: <strong>${latest.bp_systolic}/${latest.bp_diastolic}</strong> mmHg</span>`;
                    }
                    if (latest.pulse_rate) {
                        badgesHtml += `<span class="vitals-summary-pill"><i class="fa-solid fa-wave-square"></i> Pulse: <strong>${latest.pulse_rate}</strong> bpm</span>`;
                    }
                    if (latest.temperature) {
                        badgesHtml += `<span class="vitals-summary-pill"><i class="fa-solid fa-temperature-half"></i> Temp: <strong>${latest.temperature}</strong> °F</span>`;
                    }
                    if (latest.spo2) {
                        badgesHtml += `<span class="vitals-summary-pill"><i class="fa-solid fa-lungs"></i> SpO2: <strong>${latest.spo2}%</strong></span>`;
                    }
                    if (latest.weight_kg) {
                        badgesHtml += `<span class="vitals-summary-pill"><i class="fa-solid fa-weight-scale"></i> Weight: <strong>${latest.weight_kg}</strong> kg</span>`;
                    }
                    if (latest.bmi) {
                        let catClass = "bmi-normal";
                        if (latest.bmi < 18.5) catClass = "bmi-underweight";
                        else if (latest.bmi >= 25 && latest.bmi < 30) catClass = "bmi-overweight";
                        else if (latest.bmi >= 30) catClass = "bmi-obese";
                        badgesHtml += `<span class="bmi-badge ${catClass}">BMI: <strong>${latest.bmi}</strong></span>`;
                    }
                    badgeContainer.innerHTML = badgesHtml || `<span class="text-muted" style="font-size:12px;">Vitals recorded</span>`;
                } else {
                    badgeContainer.innerHTML = `<span class="text-muted" style="font-size:12px;">No vitals recorded yet</span>`;
                }
            }

            renderVitalsChart(vitalsList);
        })
        .catch(err => console.error(err));
}

function renderVitalsChart(vitalsList) {
    const canvas = document.getElementById('patientVitalsChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (appState.charts.vitals) {
        appState.charts.vitals.destroy();
        appState.charts.vitals = null;
    }

    if (vitalsList.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const labels = vitalsList.map(v => v.recorded_at.split(' ')[0]);
    const sysData = vitalsList.map(v => v.bp_systolic || null);
    const diaData = vitalsList.map(v => v.bp_diastolic || null);
    const pulseData = vitalsList.map(v => v.pulse_rate || null);
    const weightData = vitalsList.map(v => v.weight_kg || null);

    appState.charts.vitals = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'BP Systolic (mmHg)',
                    data: sysData,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                },
                {
                    label: 'BP Diastolic (mmHg)',
                    data: diaData,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                },
                {
                    label: 'Pulse (bpm)',
                    data: pulseData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    spanGaps: true
                },
                {
                    label: 'Weight (kg)',
                    data: weightData,
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    borderWidth: 2,
                    borderDash: [4, 4],
                    tension: 0.3,
                    spanGaps: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94a3b8', font: { size: 11 } }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#64748b', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    ticks: { color: '#64748b', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });
}

// ==========================================================================
// PATIENT CLINICAL HISTORY HELPER FUNCTIONS
// ==========================================================================

function loadPatientHistoryQuickCard(patientId) {
    fetch(`/api/patients/${patientId}/summary`)
        .then(res => res.json())
        .then(data => {
            const card = document.getElementById('rx-patient-history-card');
            if (!card) return;

            document.getElementById('rx-card-pid').textContent = data.patient.patient_code;
            document.getElementById('rx-card-name').textContent = data.patient.name;
            document.getElementById('rx-card-visits').innerHTML = `<i class="fa-solid fa-notes-medical"></i> ${data.total_visits} Past Visit(s)`;
            document.getElementById('rx-card-lastvisit').innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> Last Visit: ${data.last_visit}`;

            const tagsContainer = document.getElementById('rx-card-tags');
            tagsContainer.innerHTML = "";
            
            if (data.past_diagnoses.length > 0) {
                data.past_diagnoses.forEach(diag => {
                    const tag = document.createElement('span');
                    tag.className = 'diag-chip';
                    tag.textContent = diag;
                    tagsContainer.appendChild(tag);
                });
            } else {
                tagsContainer.innerHTML = `<span class="text-muted" style="font-size:12px;">First visit / No past diagnoses recorded.</span>`;
            }

            const copyMedsBtn = document.getElementById('rx-copy-last-meds-btn');
            if (data.prescriptions && data.prescriptions.length > 0) {
                copyMedsBtn.style.display = 'inline-flex';
                copyMedsBtn.onclick = () => {
                    const lastRx = data.prescriptions[0];
                    try {
                        const meds = JSON.parse(lastRx.medicines);
                        if (meds.length > 0) {
                            appState.prescriptionMeds = meds;
                            renderMedsTable();
                            if (lastRx.diagnosis && !document.getElementById('rx-diagnosis').value) {
                                document.getElementById('rx-diagnosis').value = lastRx.diagnosis;
                            }
                            showToast(`Copied ${meds.length} medication(s) from previous visit!`, "success");
                            voiceAssistant.speakText(`Copied ${meds.length} medications from last prescription.`);
                        }
                    } catch (e) {
                        showToast("Failed to copy past medications.", "error");
                    }
                };
            } else {
                copyMedsBtn.style.display = 'none';
            }

            const fullHistoryBtn = document.getElementById('rx-view-full-history-btn');
            fullHistoryBtn.onclick = () => {
                openPatientHistoryModal(patientId);
            };

            card.style.display = 'block';
        })
        .catch(err => console.error(err));
}

function openPatientHistoryModal(patientId) {
    fetch(`/api/patients/${patientId}/summary`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('modal-patient-code').textContent = data.patient.patient_code;
            document.getElementById('modal-patient-name').textContent = `${data.patient.name} (${data.patient.age} Yrs / ${data.patient.gender})`;

            const summaryEl = document.getElementById('modal-history-summary');
            let diagTagsHtml = "";
            data.past_diagnoses.forEach(d => {
                diagTagsHtml += `<span class="diag-chip">${d}</span>`;
            });

            summaryEl.innerHTML = `
                <div class="history-modal-stats">
                    <div class="modal-stat-badge"><i class="fa-solid fa-notes-medical"></i> Total Visits: <strong>${data.total_visits}</strong></div>
                    <div class="modal-stat-badge"><i class="fa-solid fa-calendar-check"></i> Last Visit: <strong>${data.last_visit}</strong></div>
                    <div class="modal-stat-badge"><i class="fa-solid fa-phone"></i> Contact: <strong>${data.patient.contact}</strong></div>
                </div>
                <div class="modal-diagnoses-list">
                    <strong>Recorded Past Diagnoses:</strong> ${diagTagsHtml || '<span class="text-muted">None recorded</span>'}
                </div>
            `;

            const timelineEl = document.getElementById('modal-history-timeline');
            timelineEl.innerHTML = "";

            if (data.prescriptions.length === 0) {
                timelineEl.innerHTML = `<p class="text-muted text-center p-4">No prescription records found for this patient.</p>`;
            } else {
                data.prescriptions.forEach(p => {
                    const item = document.createElement('div');
                    item.className = 'timeline-item';
                    
                    let medsTags = "";
                    try {
                        const meds = JSON.parse(p.medicines);
                        meds.forEach(m => {
                            medsTags += `<span class="med-tag">${m.name} (${m.dosage})</span>`;
                        });
                    } catch (e) {
                        medsTags = `<span class="text-muted">Error reading medications</span>`;
                    }

                    item.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-card">
                            <div class="timeline-header">
                                <span class="timeline-date"><i class="fa-regular fa-calendar-days"></i> ${p.created_at}</span>
                                <div class="timeline-actions">
                                    <button class="btn-text-accent copy-modal-rx" data-p-id="${p.id}" title="Copy to Prescription Form"><i class="fa-solid fa-rotate-left"></i> Re-Prescribe</button>
                                    <button class="btn-action-icon view-pdf" data-pdf-url="/static/uploads/prescription_${p.id}.pdf" title="View PDF"><i class="fa-solid fa-file-pdf"></i></button>
                                </div>
                            </div>
                            <div class="timeline-body">
                                <div class="body-section">
                                    <h5>Symptoms</h5>
                                    <p>${p.symptoms || 'None reported'}</p>
                                </div>
                                <div class="body-section">
                                    <h5>Diagnosis</h5>
                                    <p class="diag-text">${p.diagnosis || 'General checkup'}</p>
                                </div>
                            </div>
                            <div class="timeline-meds-list">
                                <h5>Prescribed Drugs (Rx)</h5>
                                <div class="rx-med-capsules">
                                    ${medsTags}
                                </div>
                            </div>
                            ${p.instructions ? `<div class="timeline-instructions"><strong>Doctor Advice:</strong> ${p.instructions}</div>` : ''}
                        </div>
                    `;
                    timelineEl.appendChild(item);
                });

                // Bind copy triggers
                timelineEl.querySelectorAll('.copy-modal-rx').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const pId = this.getAttribute('data-p-id');
                        const rx = data.prescriptions.find(x => String(x.id) === String(pId));
                        if (rx) {
                            try {
                                const meds = JSON.parse(rx.medicines);
                                if (meds.length > 0) {
                                    appState.prescriptionMeds = meds;
                                    renderMedsTable();
                                    if (rx.diagnosis) document.getElementById('rx-diagnosis').value = rx.diagnosis;
                                    closeModal('patient-history-modal');
                                    showTab('prescription-generator');
                                    document.getElementById('rx-patient-select').value = patientId;
                                    showToast(`Copied ${meds.length} drug(s) to prescription form!`, "success");
                                    voiceAssistant.speakText(`Drugs copied to prescription.`);
                                }
                            } catch (e) {}
                        }
                    });
                });

                timelineEl.querySelectorAll('.view-pdf').forEach(btn => {
                    btn.addEventListener('click', function() {
                        openPDFModal(this.getAttribute('data-pdf-url'));
                    });
                });
            }

            openModal('patient-history-modal');
        })
        .catch(err => console.error(err));
}

// ==========================================================================
// REPORTS & CHART RENDERING
// ==========================================================================

function loadReports() {
    fetch('/api/reports-data')
        .then(res => res.json())
        .then(data => {
            renderCharts(data.prescriptions_by_date, data.common_diagnoses);
        })
        .catch(err => console.error("Reports fetching error: ", err));
}

function renderCharts(trendsData, diagnosesData) {
    // 1. Line Chart: Trends
    const ctxTrend = document.getElementById('prescriptionsTrendChart').getContext('2d');
    if (appState.charts.trend) appState.charts.trend.destroy();
    
    const dates = trendsData.map(d => d.date_val);
    const counts = trendsData.map(d => d.count_val);

    appState.charts.trend = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: dates.length > 0 ? dates : ['No Data'],
            datasets: [{
                label: 'Prescriptions written',
                data: counts.length > 0 ? counts : [0],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#6366f1',
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8', stepSize: 1 }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });

    // 2. Pie Chart: Diagnoses
    const ctxPie = document.getElementById('diagnosesPieChart').getContext('2d');
    if (appState.charts.diagnoses) appState.charts.diagnoses.destroy();

    const diags = diagnosesData.map(d => d.diagnosis);
    const diagCounts = diagnosesData.map(d => d.count_val);

    appState.charts.diagnoses = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: diags.length > 0 ? diags : ['No Cases'],
            datasets: [{
                data: diagCounts.length > 0 ? diagCounts : [1],
                backgroundColor: [
                    '#6366f1',
                    '#38bdf8',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#94a3b8', boxWidth: 12 }
                }
            }
        }
    });
}

// ==========================================================================
// TOAST NOTIFICATIONS & MODALS
// ==========================================================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        'success': 'fa-solid fa-circle-check',
        'error': 'fa-solid fa-triangle-exclamation',
        'info': 'fa-solid fa-circle-info'
    };

    toast.innerHTML = `
        <i class="${iconMap[type] || 'fa-solid fa-info'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove toast
    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function setupModals() {
    // Close modal triggers
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                // Stop speech synthesis if it was reading command help
                if (modal.id === 'voice-help-modal') voiceAssistant.synth.cancel();
            }
        });
    });

    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            voiceAssistant.synth.cancel();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function openPDFModal(pdfUrl) {
    const modal = document.getElementById('pdf-modal');
    const frame = document.getElementById('pdf-viewer-frame');
    const downloadBtn = document.getElementById('download-pdf-btn');
    
    if (modal && frame && downloadBtn) {
        frame.src = pdfUrl;
        downloadBtn.href = pdfUrl;
        modal.classList.add('active');
    }
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function updateClock() {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }
}
