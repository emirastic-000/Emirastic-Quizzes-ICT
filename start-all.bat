@echo off
REM ============================================
REM   Emirastic ICT Quiz - Start All Services
REM   Version 0.3.0
REM ============================================

setlocal
title Emirastic ICT Quiz v0.3.0

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║         Emirastic ICT Quiz - Starting All Services            ║
echo ║                     Version 0.3.0                              ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM ==================== CHECK MONGODB ====================
echo [1/3] Checking MongoDB...

REM Try to find MongoDB in common locations
set MONGODB_PATH=
if exist "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" (
    set MONGODB_PATH=C:\Program Files\MongoDB\Server\8.2\bin
) else if exist "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" (
    set MONGODB_PATH=C:\Program Files\MongoDB\Server\8.0\bin
) else if exist "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" (
    set MONGODB_PATH=C:\Program Files\MongoDB\Server\7.0\bin
) else if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (
    set MONGODB_PATH=C:\Program Files\MongoDB\Server\6.0\bin
)

if not defined MONGODB_PATH (
    echo.
    echo ❌ ERROR: MongoDB not found!
    echo.
    echo Please install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo Or run: setup-windows.bat for automatic setup
    echo.
    pause
    exit /b 1
)

REM Check if MongoDB is already running
tasklist /FI "IMAGENAME eq mongod.exe" /FO CSV /NH | find "mongod.exe" >nul
if %errorlevel%==0 (
    echo ✅ MongoDB already running
) else (
    echo Starting MongoDB...
    
    REM Create data directory if needed
    if not exist "C:\data\db" (
        echo Creating MongoDB data directory...
        mkdir "C:\data\db"
    )
    
    REM Start MongoDB in background
    start "MongoDB Server" "%MONGODB_PATH%\mongod.exe" --dbpath "C:\data\db"
    
    REM Wait for MongoDB to start
    timeout /t 3 /nobreak >nul
    echo ✅ MongoDB started
)
echo.

REM ==================== CHECK DEPENDENCIES ====================
echo [2/3] Checking dependencies...

if not exist "node_modules" (
    echo Installing root dependencies...
    call npm install --silent
)
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install --silent
    cd ..
)
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install --silent
    cd ..
)
echo ✅ Dependencies ready
echo.

REM ==================== START SERVERS ====================
echo [3/3] Starting servers...
echo.
echo 🌐 Application URLs:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    Network:  http://192.168.56.1:3000
echo.
echo 🔐 Default Login:
echo    Email:    admin@module437.test
echo    Password: admin123456
echo.
echo ℹ️  Press Ctrl+C in this window to stop all services
echo.

REM Start backend and frontend with npm
cd /d "%~dp0"
npm run start-simple

pause
