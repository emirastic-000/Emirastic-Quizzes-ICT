# Start MongoDB and Application Services
# Run from project root directory

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Module 437 Quiz Application" -ForegroundColor Cyan
Write-Host "    Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is already running
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoRunning) {
    Write-Host "✓ MongoDB already running" -ForegroundColor Green
} else {
    Write-Host "Starting MongoDB..." -ForegroundColor Yellow
    
    $mongoPath = "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe"
    $dataDir = "C:\data\db"
    
    # Check if MongoDB executable exists
    if (-not (Test-Path $mongoPath)) {
        Write-Host "ERROR: MongoDB not found at $mongoPath" -ForegroundColor Red
        Write-Host "Please install MongoDB from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    # Create data directory if it doesn't exist
    if (-not (Test-Path $dataDir)) {
        Write-Host "Creating MongoDB data directory..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
    }
    
    # Start MongoDB in background
    try {
        Start-Process -FilePath $mongoPath -ArgumentList "--dbpath `"$dataDir`"" -WindowStyle Hidden -PassThru | Out-Null
        Start-Sleep -Seconds 3
        Write-Host "✓ MongoDB started successfully" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: Failed to start MongoDB - $_" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "Starting application services..." -ForegroundColor Yellow
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Start backend and frontend
npm run start-simple

Write-Host ""
Write-Host "Application stopped" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
