/* ==========================================================================
   DOCTOR VOICE SYSTEM - VOICE MANAGEMENT ENGINE
   ========================================================================== */

class VoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synth = window.speechSynthesis;
        this.isListening = false;
        this.voiceCommandCount = 0;
        this.activeFieldTarget = null; // Used for field-level dictation
        this.mode = 'global'; // 'global', 'patient-fill', 'med-fill', 'field-dictate'
        
        this.initSpeechRecognition();
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition API not supported in this browser.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        // Recognition Event Hooks
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateStatus('Listening...', 'listening');
            this.updateMicUI(true);
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Speech recognized: ", transcript);
            this.updateStatus('Processing Speech...', 'processing');
            this.processInput(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
            this.updateStatus('Voice Error', 'idle');
            this.updateMicUI(false);
            this.isListening = false;
            
            if (event.error === 'not-allowed') {
                showToast("Microphone access denied. Enable permissions in browser settings.", "error");
            } else if (event.error !== 'no-speech') {
                showToast(`Voice Error: ${event.error}`, "error");
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateMicUI(false);
            if (document.getElementById('voice-status').textContent === 'Processing Speech...') {
                // Keep processing status until action completes
            } else {
                this.updateStatus('Idle', 'idle');
            }
        };
    }

    startListening(mode = 'global', fieldTarget = null) {
        if (!this.recognition) {
            showToast("Speech Recognition not initialized. Use text simulator.", "info");
            return;
        }
        if (this.isListening) {
            this.recognition.stop();
            return;
        }
        this.mode = mode;
        this.activeFieldTarget = fieldTarget;
        
        try {
            this.recognition.start();
        } catch (e) {
            console.error("Failed to start speech recognition: ", e);
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    updateStatus(text, className) {
        const indicator = document.getElementById('voice-indicator');
        const statusText = document.getElementById('voice-status');
        
        if (indicator && statusText) {
            indicator.className = `status-indicator ${className}`;
            statusText.textContent = `Voice Assistant: ${text}`;
        }
    }

    updateMicUI(active) {
        const globalMic = document.getElementById('global-mic-btn');
        if (globalMic) {
            if (active && this.mode === 'global') {
                globalMic.classList.add('recording');
            } else {
                globalMic.classList.remove('recording');
            }
        }

        // Field level mic styling
        document.querySelectorAll('.field-mic-btn, .btn-voice-fill, .mic-search-btn').forEach(btn => {
            btn.classList.remove('listening');
        });

        if (active && this.activeFieldTarget) {
            const targetBtn = document.querySelector(`.field-mic-btn[data-field="${this.activeFieldTarget.id}"]`);
            if (targetBtn) targetBtn.classList.add('listening');
        }

        if (active && this.mode === 'patient-fill') {
            const btn = document.getElementById('voice-fill-patient-btn');
            if (btn) btn.classList.add('listening');
            const instructions = document.getElementById('voice-fill-patient-instructions');
            if (instructions) instructions.style.display = 'flex';
        } else {
            const instructions = document.getElementById('voice-fill-patient-instructions');
            if (instructions) instructions.style.display = 'none';
        }

        if (active && this.mode === 'med-fill') {
            const btn = document.getElementById('voice-add-med-btn');
            if (btn) btn.classList.add('listening');
            const instructions = document.getElementById('voice-med-instructions');
            if (instructions) instructions.style.display = 'flex';
        } else {
            const instructions = document.getElementById('voice-med-instructions');
            if (instructions) instructions.style.display = 'none';
        }

        if (active && this.mode === 'search-records') {
            const btn = document.getElementById('records-search-mic');
            if (btn) btn.classList.add('listening');
        }
    }

    processInput(text) {
        // Increment command count
        this.voiceCommandCount++;
        const countBadge = document.getElementById('stat-voice-cmds');
        if (countBadge) countBadge.textContent = this.voiceCommandCount;

        // Route speech based on mode
        if (this.mode === 'field-dictate' && this.activeFieldTarget) {
            this.handleFieldDictation(text);
        } else if (this.mode === 'patient-fill') {
            this.handlePatientVoiceFill(text);
        } else if (this.mode === 'med-fill') {
            this.handleMedicineVoiceFill(text);
        } else if (this.mode === 'search-records') {
            this.handleSearchVoice(text);
        } else {
            this.handleGlobalCommands(text);
        }

        this.updateStatus('Idle', 'idle');
    }

    // Direct dictation into active input field
    handleFieldDictation(text) {
        if (!this.activeFieldTarget) return;
        
        // Format names to start with Capital letters
        let formattedText = text;
        if (this.activeFieldTarget.id === 'reg-name' || this.activeFieldTarget.id === 'med-name') {
            formattedText = toTitleCase(text);
        } else {
            // Capitalise first letter of sentence
            formattedText = text.charAt(0).toUpperCase() + text.slice(1);
        }

        if (this.activeFieldTarget.tagName === 'SELECT') {
            // Fuzzy select match
            const options = this.activeFieldTarget.options;
            let matched = false;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value.toLowerCase() === text.toLowerCase()) {
                    this.activeFieldTarget.selectedIndex = i;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                // Fallback: check prefix
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value.toLowerCase().startsWith(text.charAt(0).toLowerCase())) {
                        this.activeFieldTarget.selectedIndex = i;
                        break;
                    }
                }
            }
        } else {
            // Append or replace
            if (this.activeFieldTarget.value) {
                this.activeFieldTarget.value += " " + formattedText;
            } else {
                this.activeFieldTarget.value = formattedText;
            }
        }
        showToast(`Dictated: "${formattedText}"`, "success");
        this.activeFieldTarget = null;
    }

    // Handles records search command
    handleSearchVoice(text) {
        const cleaned = text.replace(/search/i, '').trim();
        const searchInput = document.getElementById('patient-search-input');
        if (searchInput) {
            searchInput.value = cleaned;
            // Trigger search event
            searchInput.dispatchEvent(new Event('input'));
            showToast(`Searching for: "${cleaned}"`, "success");
        }
    }

    // Parses natural speech or tagged input:
    // e.g. "Emily Watson 29 years female contact 9876543210"
    // e.g. "Name John Doe Age 35 Gender Male Contact 9876543210"
    handlePatientVoiceFill(text) {
        if (!text || !text.trim()) {
            showToast("No speech detected. Please try speaking again.", "error");
            return;
        }

        console.log("Parsing patient voice fill text: ", text);
        const rawText = text.trim();
        let remainingText = rawText.replace(/[:,-]/g, ' ');

        let nameVal = "";
        let ageVal = "";
        let genderVal = "";
        let contactVal = "";

        // 1. Tagged matching first if explicitly spoken
        const nameTagMatch = remainingText.match(/(?:patient\s+)?name\s+(.*?)(?=\s+(age|gender|contact|phone|number|$))/i);
        const ageTagMatch = remainingText.match(/age\s+(\d+)/i);
        const genderTagMatch = remainingText.match(/gender\s+(male|female|other)/i);
        const contactTagMatch = remainingText.match(/(?:contact|phone|mobile|number)\s+(\d+)/i);

        if (nameTagMatch && nameTagMatch[1].trim()) {
            nameVal = toTitleCase(nameTagMatch[1].trim());
            remainingText = remainingText.replace(nameTagMatch[0], '');
        }
        if (ageTagMatch && ageTagMatch[1]) {
            ageVal = parseInt(ageTagMatch[1]);
            remainingText = remainingText.replace(ageTagMatch[0], '');
        }
        if (genderTagMatch && genderTagMatch[1]) {
            const g = genderTagMatch[1].toLowerCase();
            if (g.startsWith('m')) genderVal = 'Male';
            else if (g.startsWith('f')) genderVal = 'Female';
            else genderVal = 'Other';
            remainingText = remainingText.replace(genderTagMatch[0], '');
        }
        if (contactTagMatch && contactTagMatch[1]) {
            contactVal = contactTagMatch[1].trim();
            remainingText = remainingText.replace(contactTagMatch[0], '');
        }

        // 2. Natural language fallback for missing fields
        // Extract Contact Number (7 to 15 digits)
        if (!contactVal) {
            const phoneMatch = remainingText.match(/\b\d{7,15}\b/);
            if (phoneMatch) {
                contactVal = phoneMatch[0];
                remainingText = remainingText.replace(phoneMatch[0], '');
            }
        }

        // Extract Gender (male/female/other/man/woman)
        if (!genderVal) {
            const genMatch = remainingText.match(/\b(male|female|man|woman|lady|gentleman|boy|girl|other)\b/i);
            if (genMatch) {
                const g = genMatch[1].toLowerCase();
                if (['male', 'man', 'gentleman', 'boy'].includes(g)) genderVal = 'Male';
                else if (['female', 'woman', 'lady', 'girl'].includes(g)) genderVal = 'Female';
                else genderVal = 'Other';
                remainingText = remainingText.replace(genMatch[0], '');
            }
        }

        // Extract Age (e.g. "29 years old", "29 years", "29 yrs", "age 29", or standalone 1-3 digit number)
        if (!ageVal) {
            const agePhraseMatch = remainingText.match(/\b(\d{1,3})\s*(?:years?\s*old|years?|yrs?|yr)\b/i);
            if (agePhraseMatch) {
                ageVal = parseInt(agePhraseMatch[1]);
                remainingText = remainingText.replace(agePhraseMatch[0], '');
            } else {
                // Standalone number between 1 and 120
                const numMatch = remainingText.match(/\b([1-9][0-9]?|1[01][0-9]|120)\b/);
                if (numMatch) {
                    ageVal = parseInt(numMatch[0]);
                    remainingText = remainingText.replace(numMatch[0], '');
                }
            }
        }

        // Extract Name from remaining tokens
        if (!nameVal) {
            let cleanRem = remainingText
                .replace(/\b(patient|register|new|details|years|year|old|yrs|yr|contact|phone|number|age|gender|is)\b/gi, '')
                .replace(/\s+/g, ' ')
                .trim();
            if (cleanRem) {
                nameVal = toTitleCase(cleanRem);
            }
        }

        // Populate Form Fields
        let filledCount = 0;

        let historyVal = extractTag(text, ['history', 'medical history', 'conditions', 'allergies']);

        if (nameVal) {
            document.getElementById('reg-name').value = nameVal;
            filledCount++;
        }
        if (ageVal) {
            document.getElementById('reg-age').value = ageVal;
            filledCount++;
        }
        if (genderVal) {
            document.getElementById('reg-gender').value = genderVal;
            filledCount++;
        }
        if (contactVal) {
            document.getElementById('reg-contact').value = contactVal;
            filledCount++;
        }
        if (historyVal) {
            const histEl = document.getElementById('reg-history');
            if (histEl) {
                histEl.value = historyVal;
                filledCount++;
            }
        }

        if (filledCount > 0) {
            showToast(`Voice fill complete! Filled ${filledCount} field(s).`, "success");
            this.speakText(`Populated patient details for ${nameVal || 'patient'}.`);
        } else {
            showToast(`Could not parse form fields from: "${text}". Dictate fields individually.`, "error");
            this.speakText("Sorry, I couldn't parse that patient information.");
        }
    }

    // Parses natural speech or explicit tags:
    // e.g. "Paracetamol 500mg twice daily for 5 days"
    // e.g. "Medicine Cetirizine 10mg Dosage 1 tablet at night Duration 3 days"
    handleMedicineVoiceFill(text) {
        if (!text || !text.trim()) {
            showToast("No speech detected. Please try speaking again.", "error");
            return;
        }

        console.log("Parsing medicine voice text: ", text);
        const rawText = text.trim();
        const cleanText = rawText.replace(/[:,-]/g, ' ');

        let medName = "";
        let dosage = "";
        let duration = "";

        // 1. Check for explicit tagged pattern: "medicine X dosage Y duration Z"
        const medMatch = cleanText.match(/(?:add\s+)?(?:medicine|drug)\s+(.*?)(?=\s+(dosage|dose|duration|$))/i);
        const dosageMatch = cleanText.match(/(?:dosage|dose)\s+(.*?)(?=\s+duration|$)/i);
        const durationMatch = cleanText.match(/duration\s+(.*)/i);

        if (medMatch && medMatch[1].trim()) medName = toTitleCase(medMatch[1].trim());
        if (dosageMatch && dosageMatch[1].trim()) dosage = dosageMatch[1].trim();
        if (durationMatch && durationMatch[1].trim()) duration = durationMatch[1].trim();

        // 2. Natural language fallback parser
        if (!medName) {
            let remainingText = cleanText;

            // Remove leading action verbs / prefix words
            remainingText = remainingText.replace(/^(add|prescribe|give|take|medicine|drug)\s+/i, '');

            // Extract duration (e.g. "for 5 days", "1 week", "for 3 weeks", "5 days")
            const durRegex = /(?:for\s+)?(\d+\s*(?:days?|weeks?|months?)|(?:one|two|three|four|five|six|seven|ten)\s*days?)/i;
            const durMatch = remainingText.match(durRegex);
            if (durMatch) {
                duration = durMatch[0].trim();
                remainingText = remainingText.replace(durMatch[0], '').trim();
            }

            // Extract dosage (e.g. "1-0-1", "twice daily", "once daily", "thrice daily", "1 tablet", "5ml", "after food")
            const doseRegex = /(?:dosage\s+)?(1-0-1|0-1-0|1-1-1|1-0-0|0-0-1|once\s+daily|twice\s+daily|thrice\s+daily|three\s+times\s+a\s+day|two\s+times\s+a\s+day|every\s+\d+\s+hours?|\d+\s*(?:tablets?|capsules?|pills?|spoons?|ml)|after\s+food|before\s+meals?)/i;
            const doseMatch = remainingText.match(doseRegex);
            if (doseMatch) {
                dosage = doseMatch[0].replace(/^dosage\s+/i, '').trim();
                remainingText = remainingText.replace(doseMatch[0], '').trim();
            }

            // Remaining string is the drug name!
            const cleanedRem = remainingText.replace(/^(for|dosage|dose|duration)\s+/i, '').trim();
            if (cleanedRem) {
                medName = toTitleCase(cleanedRem);
            } else if (rawText) {
                medName = toTitleCase(rawText.replace(/^(add|prescribe|medicine|drug)\s+/i, '').trim());
            }
        }

        // Clean up prefix "for " if present in duration
        if (duration.toLowerCase().startsWith('for ')) {
            duration = duration.substring(4).trim();
        }

        if (medName) {
            document.getElementById('med-name').value = medName;
            document.getElementById('med-dosage').value = dosage || 'As directed';
            document.getElementById('med-duration').value = duration || '5 days';

            // Auto-click Add Medicine button
            const addBtn = document.getElementById('add-med-btn');
            if (addBtn) addBtn.click();

            showToast(`Added medicine: ${medName}`, "success");
            this.speakText(`Added ${medName}`);
        } else {
            showToast(`Could not parse medicine details from: "${text}". Dictate individual fields or say: "Paracetamol 500mg twice daily for 5 days"`, "error");
            this.speakText("I couldn't parse the medicine details.");
        }
    }

    // Handles global navigation and actions
    handleGlobalCommands(text) {
        const cleanText = text.toLowerCase().trim();
        console.log("Parsing global command: ", cleanText);

        // 1. Navigation Commands
        if (cleanText.includes("dashboard") || cleanText.includes("go to dashboard")) {
            this.triggerNavigation("dashboard");
            this.speakText("Opening Dashboard");
            return;
        }
        if (cleanText.includes("register patient") || cleanText.includes("go to register") || cleanText.includes("go to patient registration")) {
            this.triggerNavigation("patient-registration");
            this.speakText("Opening patient registration");
            return;
        }
        if (cleanText.includes("new prescription") || cleanText.includes("go to prescription") || cleanText.includes("prescription generator")) {
            this.triggerNavigation("prescription-generator");
            this.speakText("Opening prescription generator");
            return;
        }
        if (cleanText.includes("patient records") || cleanText.includes("go to records") || cleanText.includes("records")) {
            this.triggerNavigation("patient-records");
            this.speakText("Opening patient records");
            return;
        }
        if (cleanText.includes("go to reports") || cleanText.includes("reports") || cleanText.includes("analytics") || cleanText.includes("go to analytics")) {
            this.triggerNavigation("reports");
            this.speakText("Opening reports and analytics");
            return;
        }
        if (cleanText === "logout" || cleanText === "log out") {
            document.getElementById('logout-btn').click();
            this.speakText("Logging out");
            return;
        }

        // 2. Action Commands
        if (cleanText.startsWith("search ")) {
            const nameQuery = cleanText.substring(7).trim();
            this.triggerNavigation("patient-records");
            
            setTimeout(() => {
                const searchInput = document.getElementById('patient-search-input');
                if (searchInput) {
                    searchInput.value = nameQuery;
                    searchInput.dispatchEvent(new Event('input'));
                    this.speakText(`Searching records for ${nameQuery}`);
                    showToast(`Searching for "${nameQuery}"`, "success");
                }
            }, 300);
            return;
        }

        if (cleanText.includes("generate prescription") || cleanText.includes("save prescription")) {
            const currentTab = document.querySelector('.content-section.active').id;
            if (currentTab === 'prescription-generator') {
                this.speakText("Generating prescription PDF");
                document.getElementById('prescription-form').dispatchEvent(new Event('submit'));
            } else {
                showToast("Navigate to Prescription tab to generate.", "info");
                this.speakText("Please open the prescription tab first.");
            }
            return;
        }

        if (cleanText.includes("read prescription") || cleanText.includes("speak prescription")) {
            const currentTab = document.querySelector('.content-section.active').id;
            if (currentTab === 'prescription-generator') {
                document.getElementById('read-rx-aloud-btn').click();
            } else if (currentTab === 'patient-records') {
                const detailBtn = document.getElementById('read-patient-details-btn');
                if (detailBtn && detailBtn.style.display !== 'none') {
                    detailBtn.click();
                } else {
                    this.speakText("No active record selected to read.");
                }
            } else {
                this.speakText("Please open prescription or records to read.");
            }
            return;
        }

        if (cleanText.includes("read details")) {
            const currentTab = document.querySelector('.content-section.active').id;
            if (currentTab === 'patient-records') {
                document.getElementById('read-patient-details-btn').click();
            } else {
                this.speakText("Navigate to records to read details.");
            }
            return;
        }

        if (cleanText === "clear form" || cleanText === "reset form") {
            const currentTab = document.querySelector('.content-section.active').id;
            if (currentTab === 'patient-registration') {
                document.getElementById('clear-reg-form-btn').click();
                this.speakText("Form cleared");
            } else if (currentTab === 'prescription-generator') {
                document.getElementById('clear-rx-form-btn').click();
                this.speakText("Form cleared");
            }
            return;
        }

        // If no match found, alert user
        showToast(`Command not recognized: "${text}"`, "info");
        this.speakText("Command not recognized. Please click help to see available commands.");
    }

    triggerNavigation(targetId) {
        const navLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (navLink) {
            navLink.click();
        }
    }

    // Text-to-Speech synthesizer
    speakText(text) {
        if (!this.synth) return;
        
        // Stop current speech
        this.synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        // Select clinical sounding voice if possible
        const voices = this.synth.getVoices();
        let selectedVoice = null;
        
        // Prefer natural sounding English voices
        for (let voice of voices) {
            if (voice.lang === 'en-US' && (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Zira'))) {
                selectedVoice = voice;
                break;
            }
        }
        if (!selectedVoice) {
            for (let voice of voices) {
                if (voice.lang.startsWith('en')) {
                    selectedVoice = voice;
                    break;
                }
            }
        }
        
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
        utterance.onstart = () => {
            this.updateStatus('Speaking...', 'speaking');
        };
        
        utterance.onend = () => {
            this.updateStatus('Idle', 'idle');
        };

        this.synth.speak(utterance);
    }
}

// Utility formatting functions
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
