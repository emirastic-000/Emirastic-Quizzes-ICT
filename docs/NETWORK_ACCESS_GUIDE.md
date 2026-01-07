# Network Access Configuration Guide

This guide explains how to configure the Module 437 Quiz Application for access from other devices on your local network.

## Overview

The application has been configured to allow access from any device on your local network. Users can now create accounts and login from any device connected to the same network as the host machine.

## Configuration Changes Made

### 1. Backend Server (Host Binding)
- **File**: `backend/server.js`
- **Change**: Server now binds to `0.0.0.0` instead of `localhost`
- **Effect**: Backend is accessible from all network interfaces

### 2. CORS Configuration
- **File**: `backend/server.js`
- **Change**: CORS configured to allow requests from any origin
- **Effect**: Browsers on other devices can make API requests

### 3. Frontend API URL
- **File**: `frontend/.env`
- **Change**: API URL updated to use host machine's IP address
- **Current**: `http://192.168.56.1:5000/api`

### 4. Frontend Server (Host Binding)
- **File**: `frontend/.env`
- **Change**: Added `HOST=0.0.0.0` to allow network access to dev server
- **Effect**: Frontend development server is accessible from all network interfaces

## How to Use

### On the Host Machine (Server)

1. **Start the application** using one of the start scripts:
   ```powershell
   .\start-all.ps1
   ```
   or
   ```batch
   start-all.bat
   ```

2. **Note the IP addresses displayed**:
   - Backend: `http://192.168.56.1:5000`
   - Frontend: `http://localhost:3000` (on host)

### On Other Network Devices (Clients)

1. **Find the host machine's IP address**:
   - Check the server console output, or
   - On the host machine, run: `ipconfig` (Windows) or `ifconfig` (Linux/Mac)
   - Look for the IPv4 address (e.g., 192.168.1.X or 192.168.56.X)

2. **Access the application**:
   - Open a web browser on the client device
   - Navigate to: `http://192.168.56.1:3000`
   - Replace `192.168.56.1` with your actual host IP if different

3. **Create an account or login**:
   - All authentication functions now work across the network
   - Account data is shared across all devices

## Troubleshooting

### Cannot Connect from Other Devices

**Check Firewall**:
Windows Firewall may block incoming connections. You need to allow ports 3000 and 5000:

```powershell
# Run PowerShell as Administrator
New-NetFirewallRule -DisplayName "Quiz App Backend" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow
New-NetFirewallRule -DisplayName "Quiz App Frontend" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

**Verify Network Connection**:
- Ensure all devices are on the same network
- Test connectivity: From client device, ping the host: `ping 192.168.56.1`

**Check IP Address**:
If the IP address has changed (e.g., after reboot):

1. Get the new IP address on host machine:
   ```powershell
   ipconfig
   ```

2. Update `frontend/.env`:
   ```
   REACT_APP_API_URL=http://[NEW_IP]:5000/api
   HOST=0.0.0.0
   ```

3. Restart the frontend server (IMPORTANT: Must restart for .env changes to take effect)

### Login/Registration Not Working

**Clear Browser Cache**:
- The frontend may have cached the old API URL
- Clear cache or use incognito/private mode

**Check Browser Console**:
- Press F12 to open developer tools
- Look for CORS or network errors in the Console tab

**Verify Backend is Running**:
- On the host machine, check if backend is accessible:
  - Open: `http://localhost:5000/api/quizzes`
  - Should return JSON data, not an error

## Security Notes

⚠️ **Important**: This configuration allows unrestricted access from any device on your local network.

For production environments, you should:
1. Configure CORS to only allow specific origins
2. Use HTTPS instead of HTTP
3. Implement proper authentication and session management
4. Consider using a reverse proxy (like Nginx)
5. Set up proper firewall rules

## Network Requirements

- Host and client devices must be on the same local network
- No VPN or network isolation between devices
- Ports 3000 (frontend) and 5000 (backend) must be accessible
- Windows Firewall (or other firewall) must allow these ports

## Configuration Files Reference

### Backend Environment Variables
**File**: `backend/.env`
```env
PORT=5000
HOST=0.0.0.0
MONGODB_URI=mongodb://localhost:27017/module437-quiz
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### Frontend Environment Variables
**File**: `frontend/.env`
```env
# For local development
# REACT_APP_API_URL=http://localhost:5000/api

# For network access - use the host machine's IP address
REACT_APP_API_URL=http://192.168.56.1:5000/api

# Allow frontend dev server to be accessible from network
HOST=0.0.0.0
```

## Advanced: Dynamic IP Configuration

If your host machine's IP changes frequently, you can make the frontend automatically detect the backend:

1. Access the frontend using the host IP: `http://192.168.56.1:3000`
2. The API requests will work because they're relative to the same host

Alternatively, you can create a startup script that automatically updates the .env file with the current IP address.

## Support

If you continue to experience issues:
1. Check all services are running (MongoDB, Backend, Frontend)
2. Verify firewall settings
3. Confirm all devices are on the same network
4. Check the server console for error messages
5. Review browser console for client-side errors
