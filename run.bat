@echo off
title Safar Launcher
echo ============================================================
echo   SAFAR - Premium Tours, Hotels ^& Travel Booking Platform
echo ============================================================
echo.
echo [1/3] Launching Backend Express Server (MySQL + Gmail OTP)...
start "Safar Backend Server" cmd /k "cd server && npm start"
echo.
echo [2/3] Opening Web Browser to http://localhost:5173/...
start http://localhost:5173/
echo.
echo [3/3] Launching Vite Frontend Server...
npm run dev
pause
