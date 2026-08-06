@echo off
title Doctor's Voice System - Application Server
echo ========================================================
echo          D O C T O R   V O I C E   S Y S T E M
echo ========================================================
echo.
echo Starting Doctor Voice System server...
echo Opening application in your web browser at http://localhost:5000/
echo.
python run.py
if %errorlevel% neq 0 (
    echo.
    echo [NOTICE] 'run.py' failed or closed. Trying fallback 'python app.py'...
    python app.py
)
echo.
pause
