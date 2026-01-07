# Configure Windows Firewall for Network Access
# Run this script as Administrator

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Firewall Configuration for Quiz App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator" -ForegroundColor Red
    Write-Host ""
    Write-Host "To run as Administrator:" -ForegroundColor Yellow
    Write-Host "1. Right-click on PowerShell" -ForegroundColor Yellow
    Write-Host "2. Select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host "3. Navigate to this directory and run the script again" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Creating firewall rules..." -ForegroundColor Yellow
Write-Host ""

# Remove existing rules if they exist
$existingRules = Get-NetFirewallRule -DisplayName "Quiz App*" -ErrorAction SilentlyContinue
if ($existingRules) {
    Write-Host "Removing existing firewall rules..." -ForegroundColor Yellow
    Remove-NetFirewallRule -DisplayName "Quiz App*" -ErrorAction SilentlyContinue
}

try {
    # Create rule for Backend (port 5000)
    New-NetFirewallRule -DisplayName "Quiz App Backend (Port 5000)" `
        -Direction Inbound `
        -Protocol TCP `
        -LocalPort 5000 `
        -Action Allow `
        -Profile Private,Domain `
        -Description "Allows incoming connections to the Quiz App backend server on port 5000" | Out-Null
    
    Write-Host "✓ Backend firewall rule created (Port 5000)" -ForegroundColor Green
    
    # Create rule for Frontend (port 3000)
    New-NetFirewallRule -DisplayName "Quiz App Frontend (Port 3000)" `
        -Direction Inbound `
        -Protocol TCP `
        -LocalPort 3000 `
        -Action Allow `
        -Profile Private,Domain `
        -Description "Allows incoming connections to the Quiz App frontend server on port 3000" | Out-Null
    
    Write-Host "✓ Frontend firewall rule created (Port 3000)" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Firewall Configuration Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "The following ports are now accessible from the network:" -ForegroundColor Cyan
    Write-Host "  - Port 3000 (Frontend)" -ForegroundColor Cyan
    Write-Host "  - Port 5000 (Backend)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now access the application from other devices on your network." -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "ERROR: Failed to create firewall rules" -ForegroundColor Red
    Write-Host "Error details: $_" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Display current firewall rules
Write-Host "Current Quiz App firewall rules:" -ForegroundColor Yellow
Get-NetFirewallRule -DisplayName "Quiz App*" | Select-Object DisplayName, Enabled, Direction, Action | Format-Table -AutoSize

Write-Host ""
Write-Host "Note: These rules are enabled for Private and Domain network profiles only." -ForegroundColor Yellow
Write-Host "If you're on a Public network, you may need to modify the rules or change your network profile." -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to exit"
