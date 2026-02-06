@echo off
echo ========================================
echo   WALKIN E-COMMERCE - Starting Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
)

echo Starting server...
echo.
echo Server will be available at:
echo - Customer Store: http://localhost:3000
echo - Admin Panel: http://localhost:3000/admin.html
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

node server.js
