@echo off
echo Starting MediCost Insight...
echo.
echo 1. Launching Backend (Flask on http://127.0.0.1:5000)...
start "MediCost Backend" cmd /k "cd /d %~dp0backend && python app.py"

echo 2. Launching Frontend (Vite React on http://localhost:5173)...
start "MediCost Frontend" cmd /k "cd /d %~dp0Frontend\my-app && npm run dev"

echo.
echo Both services are starting in separate windows.
echo Frontend will be accessible at http://localhost:5173
