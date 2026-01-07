@echo off
REM Start MongoDB Server and Application
REM This script starts MongoDB, backend, and frontend servers

echo.
echo ========================================
echo    Module 437 Quiz Application
echo    Starting All Services
echo ========================================
echo.

REM Check if MongoDB is already running
echo Checking MongoDB status...
tasklist /FI "IMAGENAME eq mongod.exe" /FO CSV /NH > nul
if %errorlevel%==0 (
    echo ✓ MongoDB already running
) else (
    echo Starting MongoDB...
    
    REM Check if MongoDB executable exists
    if not exist "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" (
        echo ERROR: MongoDB not found!
        echo Please install MongoDB from: https://www.mongodb.com/try/download/community
        pause
        exit /b 1
    )
    
    REM Create data directory if it doesn't exist
    if not exist "C:\data\db" (
        echo Creating MongoDB data directory...
        mkdir "C:\data\db"
    )
    
    REM Start MongoDB in background
    start "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
    
    REM Wait for MongoDB to start
    timeout /t 3 /nobreak
    echo ✓ MongoDB started
)

echo.
echo Starting application services...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop all services
echo.

REM Start backend and frontend
cd /d "%~dp0"
npm run start-simple

pause
