@echo off
title Doctor's Voice - Dependency Installer
echo ========================================================
echo          D O C T O R   V O I C E   S Y S T E M
echo             Dependency Installer
echo ========================================================
echo.

echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your system PATH.
    echo Please install Python 3 (and check "Add to PATH" during setup) and try again.
    echo.
    pause
    exit /b 1
)

echo.
echo Installing/Updating required dependencies (flask, fpdf2)...
python -m pip install --upgrade pip
python -m pip install flask fpdf2

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Dependency installation failed. Please check your internet connection or network settings.
    echo.
) else (
    echo.
    echo [Success] All dependencies (flask, fpdf2) installed successfully!
    echo.
    echo You can now start the application using run.bat (on Windows) or run.sh (on Linux/macOS).
    echo.
)

pause
