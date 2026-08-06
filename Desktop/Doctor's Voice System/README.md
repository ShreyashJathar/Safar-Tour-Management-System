# Doctor's Voice System

A modern Flask-based clinical web portal with Speech-to-Text capabilities (using the browser-native Web Speech API) to write medical prescriptions. It integrates SQLite for database management, features diagnostic authentication checks on startup, and automatically compiles styled PDF prescriptions for patients.

---

## 🚀 Quick Start (Automated Launch)

The project includes convenient startup scripts that check Python, install all required packages, initialize the database, start the local server, and open the web portal automatically.

### For Windows Users
1. Download or extract the project folder.
2. Double-click **`run.bat`**.
3. The application will start, and the portal will automatically open in your default browser at `http://localhost:5000/`.

### For macOS / Linux Users
1. Open your Terminal and navigate to the project directory.
2. Grant run permissions to the script:
   ```bash
   chmod +x run.sh
   ```
3. Run the script:
   ```bash
   ./run.sh
   ```
4. The server will start, and your web browser will open to `http://localhost:5000/`.

---

## 🔑 Default Login Credentials

Once the portal is open, you can log in using the pre-configured administrator doctor account:

* **Username:** `admin`
* **Password:** `admin123`

---

## 🛠️ Manual Installation (Advanced)

If you prefer to run the setup manually or set up a Python virtual environment:

1. **Clone/extract the project** and open a terminal in the folder.
2. **Create and activate a virtual environment** (recommended):
   * **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   * **macOS/Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the server launcher:**
   ```bash
   python run.py
   ```
5. Open your web browser and navigate to **`http://localhost:5000/`**.

---

## 📋 Features & Technologies

* **Voice Integration:** Hands-free input using the browser's Web Speech API (supports microphone dictate/stop/clear controls).
* **Database (SQLite):** Stores patient records, doctor credentials, and prescription histories securely in `doctor_voice.db`.
* **PDF Service:** Generates detailed clinical prescription cards using `fpdf2` and saves them in `static/uploads/`.
* **Auto-Launch Thread:** Automatically opens the default browser window once the server spins up.

---

## 🔍 Troubleshooting

* **Python Command Not Found:** Make sure Python 3.7+ is installed. During Python installation on Windows, ensure the box labeled **"Add Python to PATH"** is checked.
* **Microphone Not Recording:** The voice input uses the browser-native Web Speech API. Ensure you are using a modern browser (such as Google Chrome, Microsoft Edge, or Safari) and that you have granted microphone access permissions to `http://localhost:5000/`.
* **Port 5000 in Use:** If the server fails to start, make sure you don't have another development server running on port 5000.
