# Start Module 437 Quiz Application
# Run from the root directory: .\start-app.ps1

Write-Host "🚀 Starting Module 437 Quiz Application..." -ForegroundColor Green
Write-Host ""

# Check if backend node_modules exists
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    cd backend
    npm install
    cd ..
}

# Check if frontend node_modules exists
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    cd frontend
    npm install
    cd ..
}

Write-Host ""
Write-Host "✅ Dependencies ready" -ForegroundColor Green
Write-Host ""

# Open two new PowerShell windows for backend and frontend
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm start"

Write-Host "⚙️ Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm start"

Write-Host ""
Write-Host "🎉 Both servers starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "⏳ Backend should be ready at:  http://localhost:5000" -ForegroundColor White
Write-Host "⏳ Frontend should be ready at: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: First time? Make sure MongoDB is running (open MongoDB Compass)" -ForegroundColor Yellow
