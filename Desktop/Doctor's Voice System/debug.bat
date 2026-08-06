@echo off
title Doctor's Voice - Diagnostic Launcher
echo ========================================================
echo          D I A G N O S T I C   L A U N C H E R
echo ========================================================
echo.
echo [1] Current Folder Path:
echo %cd%
echo.
echo [2] Finding Python on your system:
where python
echo.
echo [3] Python Version Check:
python --version
echo.
echo [4] Verifying/Installing Flask and FPDF2 dependencies...
python -m pip install flask fpdf2
echo.
echo [5] Starting Application...
if exist run.py (
    python run.py
) else (
    python app.py
)
echo.
echo ========================================================
echo Server closed. Error Code: %errorlevel%
echo ========================================================
echo.
pause
