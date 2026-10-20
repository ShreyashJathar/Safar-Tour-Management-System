# 🌍 SAFAR — Luxury Travel, Hotels & Tour Booking Platform

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-safar__db-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Safar** is a full-stack luxury travel booking platform built with **React 19**, **Vite**, **Express 5**, and **MySQL**. It offers an end-to-end travel experience with tour discovery, luxury hotel reservations, destination landmark passes, flight route schedules, multi-step booking wizard with Razorpay integration, user dashboard, live MySQL database synchronization, and an admin management suite.

---

## ✨ Core Features

### 🧳 Traveler Experience
- **Tour & Hotel Discovery**: Real-time filtering by category (Nature, Adventure, Cultural, Beach, Luxury), price slider, and instant keyword search.
- **Attractions & Landmark Passes**: Browse iconic global and Indian landmarks (Eiffel Tower, Taj Mahal, etc.) with ticket selection.
- **Flight Route Schedules**: Flight routes, carriers (Air India, Emirates, etc.), timings, and cabin class tiers.
- **Multi-Step Booking Wizard**: 3-step booking flow with guest management, optional add-ons, promo code discounts (`SAFAR50`, `EXPLORE10`, `FIRSTTRIP`), credit card flip animation simulator, and Razorpay gateway integration.
- **Live User Dashboard**: View active reservations, download or print booking tickets with QR verification, and cancel bookings.
- **Community Traveler Stories**: Verified guest reviews, travel memories, and photo galleries with interactive likes.
- **Live Database Connection Badge**: Real-time MySQL connection monitor in the navbar showing live ping latency and table record stats.

### 🔐 Authentication & Security
- **Email OTP Verification**: 4-digit email OTP generation & verification via **Nodemailer** (with demo fallback for local development).
- **User Registration & Login**: Credentials hashed securely with **bcrypt** (10 salt rounds).
- **Role-Based Access Control**: Differentiates between Customer and Admin clearance.

### 🛡️ Admin Dashboard & Database Suite
- **Tours Management**: Add, edit, and delete tour packages with custom itineraries and highlights.
- **Hotels Management**: Manage luxury resort listings, amenities, and tiered room configurations.
- **Live Ledger**: View all customer reservations, filter by type, and update reservation status.
- **MySQL Engine Diagnostics**: View live row counters across all 9 MySQL tables, run query latency ping tests, and re-seed sample data.

---

## 🛠️ Architecture & Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Vanilla CSS (Glassmorphism & CSS Variables), Lucide / Custom SVG Icons |
| **Backend** | Node.js, Express 5, RESTful API Controllers & Routes |
| **Database** | MySQL (`mysql2/promise` pool with auto-initialization & indexing) |
| **Payment Gateway**| Razorpay Node SDK (Order creation & HMAC-SHA256 signature verification) |
| **Email & Auth** | Nodemailer (Gmail SMTP & OAuth2), bcrypt password hashing |

---

## 📁 Project Structure

```
Safar/
├── server/                       # Express 5 Backend Engine
│   ├── config/
│   │   └── db.js                 # MySQL Connection Pool & Schema Migrations
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, & OTP verification
│   │   ├── tourController.js     # Tour package CRUD & reviews
│   │   ├── hotelController.js    # Hotel resort CRUD & reviews
│   │   ├── placeController.js    # Landmark attractions & reviews
│   │   ├── flightController.js   # Flight schedule listings
│   │   ├── bookingController.js  # Booking creation, ledger, & status updates
│   │   ├── wishlistController.js # User saved items synchronization
│   │   ├── storyController.js    # Community stories & likes
│   │   ├── paymentController.js  # Razorpay order generation & signature verify
│   │   └── systemController.js   # Database health check & re-seeding
│   ├── routes/                   # Modular Express routers
│   ├── seeds/
│   │   └── seedData.js           # Automated sample dataset seeder
│   ├── .env                      # Server configuration & DB credentials
│   ├── index.js                  # Backend entry point
│   ├── package.json              # Backend dependencies
│   └── schema.sql                # Complete MySQL DDL schema
│
├── src/                          # React 19 Frontend
│   ├── assets/                   # Public images and illustrations
│   ├── components/               # React UI Components
│   │   ├── AdminPanel.jsx        # Admin suite with MySQL diagnostics tab
│   │   ├── AuthModal.jsx         # Authentication modal
│   │   ├── BookingWizard.jsx     # 3-Step booking & payment flow
│   │   ├── CommunityStories.jsx  # Traveler reviews & stories
│   │   ├── Dashboard.jsx         # User profile, history, & ticket printer
│   │   ├── FlightsExplorer.jsx   # Flight routes & bookings
│   │   ├── Hero.jsx              # Search and category filtering hero
│   │   ├── HotelCard.jsx         # Hotel property card
│   │   ├── HotelDetailsModal.jsx # Full hotel details modal
│   │   ├── LoginPage.jsx         # Standalone login & OTP verification
│   │   ├── Navbar.jsx            # Dynamic navigation & MySQL health badge
│   │   ├── PlacesExplorer.jsx    # Landmark attractions explorer
│   │   ├── SafarCopilot.jsx      # AI travel copilot assistant
│   │   ├── TourCard.jsx          # Tour package card
│   │   └── TourDetailsModal.jsx  # Detailed itinerary tour modal
│   ├── data/                     # Fallback initial data models
│   ├── services/
│   │   └── api.js                # Unified MySQL API service client
│   ├── App.jsx                   # Central state orchestrator
│   ├── App.css                   # Layout styles
│   ├── index.css                 # Global design system & theme tokens
│   └── main.jsx                  # React DOM mount point
├── run.bat                       # One-click Windows development launcher
├── package.json                  # Frontend dependencies
└── vite.config.js                # Vite build configuration
```

---

## 🗄️ MySQL Database Schema

The database (`safar_db`) is automatically ensured upon backend boot with 9 normalized tables:

1. **`users`**: Customer profiles, hashed passwords, roles (`Customer`, `Admin`), and verification flags.
2. **`tours`**: Tour packages with JSON highlights, day-by-day itineraries, and guest reviews.
3. **`hotels`**: Hotel properties with amenities, room tier definitions, and reviews.
4. **`places`**: Tourist destinations and landmark passes with ticket types and galleries.
5. **`flights`**: Scheduled flight routes, airlines, departure/arrival times, and cabin classes.
6. **`bookings`**: Booking records, primary contact info, traveler lists, calculated costs, discounts, and payment status.
7. **`wishlists`**: User saved tours and hotels keyed by user email.
8. **`stories`**: Community stories and traveler memories with like counters.
9. **`contacts`**: Inbound customer contact messages and inquiries.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.x or higher)
- **MySQL Server** (Running on `localhost:3306`)

### 1. Configure Backend Environment
Edit `server/.env` with your MySQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=safar_db

# Optional Gmail SMTP for real OTP emails
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Launch Development Servers

#### One-Click Windows Launcher:
Double-click `run.bat` or run:
```cmd
run.bat
```

#### Or Run Individually:
**Terminal 1 (Backend Server):**
```bash
cd server
npm start
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

---

## 🧑‍💻 Default Admin Access

To test administrative privileges:
- **Email / Username**: `Shreyash` or `shreyash.admin@gmail.com`
- **Password**: `shashank`

---

## 📄 License
Released under the [MIT License](LICENSE). Built for exceptional traveler journeys.
