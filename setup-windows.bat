@echo off
REM ============================================
REM   Emirastic ICT Quiz - Windows Setup
REM   Version 0.3.0 - Automated Installation
REM ============================================

setlocal enabledelayedexpansion
title Emirastic ICT Quiz - Setup

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║         Emirastic ICT Quiz - Windows Setup Wizard             ║
echo ║                     Version 0.3.0                              ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo This script will:
echo   1. Check prerequisites (Node.js, MongoDB)
echo   2. Install all dependencies
echo   3. Configure environment variables
echo   4. Seed the database with quiz content
echo   5. Start the application
echo.
pause
echo.

REM ==================== CHECK NODE.JS ====================
echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Recommended version: v14 or higher
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm is not installed!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm found: v%NPM_VERSION%
echo.

REM ==================== CHECK MONGODB ====================
echo [2/5] Checking MongoDB installation...

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
    echo ⚠️  WARNING: MongoDB not found in standard locations
    echo.
    echo MongoDB is required for this application.
    echo Download from: https://www.mongodb.com/try/download/community
    echo.
    echo After installation:
    echo   1. Download and install MongoDB Community Server
    echo   2. Run this setup script again
    echo.
    set /p CONTINUE="Continue anyway? (y/n): "
    if /i not "!CONTINUE!"=="y" exit /b 1
) else (
    echo ✅ MongoDB found: %MONGODB_PATH%
    
    REM Create MongoDB data directory
    if not exist "C:\data\db" (
        echo    Creating MongoDB data directory...
        mkdir "C:\data\db" >nul 2>&1
    )
    
    REM Check if MongoDB is running
    tasklist /FI "IMAGENAME eq mongod.exe" /FO CSV /NH | find "mongod.exe" >nul
    if !errorlevel! neq 0 (
        echo    Starting MongoDB service...
        start "MongoDB" "%MONGODB_PATH%\mongod.exe" --dbpath "C:\data\db"
        timeout /t 3 /nobreak >nul
        echo ✅ MongoDB started
    ) else (
        echo ✅ MongoDB already running
    )
)
echo.

REM ==================== INSTALL DEPENDENCIES ====================
echo [3/5] Installing dependencies...
echo.
echo This may take a few minutes. Please be patient...
echo.

REM Install root dependencies
echo Installing root dependencies...
call npm install --loglevel=error
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)
echo ✅ Root dependencies installed

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install --loglevel=error
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo ✅ Backend dependencies installed

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install --loglevel=error
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo ✅ Frontend dependencies installed
echo.

REM ==================== ENVIRONMENT CONFIGURATION ====================
echo [4/5] Configuring environment...

REM Check if .env exists in backend
if not exist "backend\.env" (
    if exist "backend\.env.example" (
        echo Creating .env file from template...
        copy "backend\.env.example" "backend\.env" >nul
        echo ✅ Environment file created
    ) else (
        echo Creating default .env file...
        (
            echo MONGODB_URI=mongodb://localhost:27017/ict-quiz
            echo JWT_SECRET=your-secret-key-change-in-production
            echo PORT=5000
            echo NODE_ENV=development
        ) > "backend\.env"
        echo ✅ Default environment file created
    )
) else (
    echo ✅ Environment file already exists
)
echo.

REM ==================== DATABASE SEEDING ====================
echo [5/5] Seeding database with quiz content...
echo.
echo Populating database with:
echo   - Module 117 questions (Network Infrastructure)
echo   - Module 437 questions (IT Support)
echo   - Admin user account
echo.

cd backend
call npm run seed
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Warning: Database seeding failed
    echo You can try running 'npm run seed' manually later
    echo.
) else (
    echo.
    echo ✅ Database seeded successfully!
)
cd ..
echo.

REM ==================== SETUP COMPLETE ====================
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║                  ✅ Setup Complete!                            ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Installation successful!
echo.
echo 📝 Default Admin Credentials:
echo    Email:    admin@module437.test
echo    Password: admin123456
echo    ⚠️  CHANGE THIS PASSWORD AFTER FIRST LOGIN!
echo.
echo 🚀 To start the application, you can now run:
echo    • start-all.bat      (Starts everything including MongoDB)
echo    • npm start          (Starts backend and frontend)
echo    • npm run start-simple  (Starts without MongoDB check)
echo.
echo 🌐 Once started, access the application at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.

set /p START_NOW="Would you like to start the application now? (y/n): "
if /i "%START_NOW%"=="y" (
    echo.
    echo Starting application...
    echo.
    call start-all.bat
) else (
    echo.
    echo 👋 Setup complete! Run start-all.bat when ready to start.
    echo.
)

pause
