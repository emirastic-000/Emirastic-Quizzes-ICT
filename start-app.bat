@echo off
REM Start Module 437 Quiz Application
REM Run from the root directory: start-app.bat

echo.
echo 🚀 Starting Module 437 Quiz Application...
echo.

REM Check if backend node_modules exists
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if frontend node_modules exists
if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ✅ Dependencies ready
echo.

REM Start backend in new window
echo 🔧 Starting Backend Server...
start cmd /k "cd backend && npm start"

REM Wait a moment then start frontend
timeout /t 2 /nobreak

echo ⚙️  Starting Frontend Server...
start cmd /k "cd frontend && npm start"

echo.
echo 🎉 Both servers starting in separate windows!
echo.
echo ⏳ Backend should be ready at:  http://localhost:5000
echo ⏳ Frontend should be ready at: http://localhost:3000
echo.
echo 💡 Tip: First time? Make sure MongoDB is running (open MongoDB Compass)
echo.
