# 🚀 Doctor's Voice System - Deployment Guide

This guide provides step-by-step instructions to deploy the **Doctor's Voice System** to cloud hosting platforms or on a clinic local area network (LAN).

---

## 🌐 Option 1: Render.com (Recommended Free Cloud Hosting)

Render allows free cloud hosting for Flask applications with automatic HTTPS SSL.

1. **Push Code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Doctor Voice System"
   git remote add origin https://github.com/YOUR_USERNAME/doctor-voice-system.git
   git push -u origin main
   ```
2. **Deploy on Render:**
   * Go to **[Render Dashboard](https://dashboard.render.com/)** and click **New +** ➔ **Web Service**.
   * Connect your GitHub repository.
   * Set **Build Command:** `pip install -r requirements.txt`
   * Set **Start Command:** `gunicorn app:app`
   * Click **Create Web Service**.
3. **Done!** Render will deploy your live link at `https://doctor-voice-system.onrender.com`.

---

## 🚂 Option 2: Railway.app

1. Go to **[Railway.app](https://railway.app/)** and click **New Project**.
2. Select **Deploy from GitHub repo**.
3. Select your `doctor-voice-system` repository.
4. Railway will automatically detect `Procfile` and `requirements.txt` and launch your live URL.

---

## 🐳 Option 3: Docker Container Deployment

You can build and run the system inside Docker on any cloud server (AWS, GCP, DigitalOcean, Azure):

```bash
# 1. Build the Docker image
docker build -t doctor-voice-system .

# 2. Run the container on port 5000
docker run -d -p 5000:5000 --name doctor_voice_app doctor-voice-system
```
Access at `http://localhost:5000/` or your server's IP address.

---

## 🏥 Option 4: Local Clinic Network (OPD Clinic LAN)

If multiple computers/tablets in your clinic need to access the app simultaneously over local Wi-Fi:

1. **Run the server on the main clinic PC:**
   ```cmd
   python run.py
   ```
2. **Find the Clinic PC IP Address:**
   * Open Command Prompt and type `ipconfig`.
   * Note the IPv4 Address (e.g. `192.168.1.50`).
3. **Access from any Clinic Phone/Tablet/Laptop:**
   * Open Chrome/Safari on any connected device and navigate to:
     `http://192.168.1.50:5000/`
