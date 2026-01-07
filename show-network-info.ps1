# Display Network Access Information
# Shows the IP addresses and URLs for accessing the Quiz App

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Quiz App Network Access Information" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get all network adapters with IPv4 addresses
$networkAdapters = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { 
        $_.IPAddress -notlike "127.*" -and 
        $_.IPAddress -notlike "169.254.*" 
    } | 
    Select-Object IPAddress, InterfaceAlias

if ($networkAdapters.Count -eq 0) {
    Write-Host "No network adapters found with valid IP addresses" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "Available Network Interfaces:" -ForegroundColor Yellow
Write-Host ""

foreach ($adapter in $networkAdapters) {
    $ip = $adapter.IPAddress
    $interface = $adapter.InterfaceAlias
    
    Write-Host "Network Interface: $interface" -ForegroundColor Cyan
    Write-Host "  IP Address: $ip" -ForegroundColor White
    Write-Host ""
    Write-Host "  Access URLs:" -ForegroundColor Green
    Write-Host "    Frontend: http://${ip}:3000" -ForegroundColor White
    Write-Host "    Backend:  http://${ip}:5000" -ForegroundColor White
    Write-Host "    API:      http://${ip}:5000/api" -ForegroundColor White
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if services are running
Write-Host "Service Status:" -ForegroundColor Yellow
Write-Host ""

# Check MongoDB
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoRunning) {
    Write-Host "  ✓ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "  ✗ MongoDB is not running" -ForegroundColor Red
}

# Check Node processes (backend/frontend)
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "  ✓ Node.js processes running: $($nodeProcesses.Count)" -ForegroundColor Green
} else {
    Write-Host "  ✗ No Node.js processes found" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check current frontend .env configuration
$envPath = Join-Path $PSScriptRoot "frontend\.env"
if (Test-Path $envPath) {
    Write-Host "Current Frontend Configuration:" -ForegroundColor Yellow
    Write-Host ""
    $apiUrl = Get-Content $envPath | Where-Object { $_ -match "^REACT_APP_API_URL=" -and $_ -notmatch "^#" }
    if ($apiUrl) {
        Write-Host "  $apiUrl" -ForegroundColor Cyan
    } else {
        Write-Host "  REACT_APP_API_URL not configured" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Instructions
Write-Host "To access from other devices:" -ForegroundColor Yellow
Write-Host "  1. Make sure the application is running (use start-all.ps1)" -ForegroundColor White
Write-Host "  2. Configure Windows Firewall (run configure-firewall.ps1 as Admin)" -ForegroundColor White
Write-Host "  3. Update frontend/.env with the correct IP address" -ForegroundColor White
Write-Host "  4. Access from any device using: http://[IP]:3000" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see NETWORK_ACCESS_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
