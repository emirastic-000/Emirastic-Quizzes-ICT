# Complete Setup Guide

This guide provides detailed installation instructions for the Emirastic ICT Quiz application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Setup](#quick-setup)
- [Manual Setup](#manual-setup)
- [Network Access Configuration](#network-access-configuration)
- [Database Seeding](#database-seeding)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

## Quick Setup

### Windows Users

The easiest way to get started is using the automated start scripts:

```powershell
.\start-all.ps1
```

or

```batch
start-all.bat
```

This will automatically:
1. Start MongoDB
2. Start the backend server on port 5000
3. Start the frontend development server on port 3000

Access the application at `http://localhost:3000`

## Manual Setup

### 1. Backend Setup

**Navigate to backend directory:**
```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
# Copy the example file
cp .env.example .env

# Or create manually
```

**Configure `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/module437-quiz
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
PORT=5000
HOST=0.0.0.0
```

**⚠️ SECURITY WARNING**: 
- Never commit `.env` files to version control
- Generate a secure JWT_SECRET for production: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- See [SECURITY.md](../SECURITY.md) for production security guidelines

**Seed the database:**
```bash
npm run seed
```

**Start the backend server:**
```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

The backend will be running at `http://localhost:5000`

### 2. Frontend Setup

**Navigate to frontend directory:**
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
# Copy the example file
cp .env.example .env

# Or create manually
```

**Configure `.env` file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
HOST=0.0.0.0
```

**Start the frontend server:**
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Network Access Configuration

To allow access from other devices on your local network:

### 1. Configure Firewall (Windows)

Run as Administrator:
```powershell
.\configure-firewall.ps1
```

This opens ports 3000 (frontend) and 5000 (backend).

### 2. Update Environment Variables

**Find your local IP address:**
```powershell
ipconfig
```

Look for "IPv4 Address" (e.g., 192.168.1.100)

**Update `frontend/.env`:**
```env
REACT_APP_API_URL=http://192.168.1.100:5000/api
HOST=0.0.0.0
```

**Update `backend/.env`:**
```env
HOST=0.0.0.0
```

### 3. Access from Other Devices

Navigate to `http://[YOUR_IP]:3000` (e.g., `http://192.168.1.100:3000`)

For detailed network setup instructions, see [NETWORK_ACCESS_GUIDE.md](NETWORK_ACCESS_GUIDE.md)
⚠️ SECURITY WARNING**: The seed script creates a default admin account:
- Email: `admin@module437.test`
- Password: `admin123456`
- **This must be deleted or password changed immediately for production!**

**
## Database Seeding

The application includes a seed script to populate the database with initial quiz questions.

**Run the seed script:**
```bash
cd backend
npm run seed
```

This creates:
- Sample quiz questions for Module 437
- Quiz categories
- Initial quiz structure

**Reset database:**
```bash
# Connect to MongoDB
mongosh

# Drop the database
use module437-quiz
db.dropDatabase()

# Exit and re-seed
exit
npm run seed
```

## Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/module437-quiz` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key_here` |
| `PORT` | Backend server port | `5000` |
| `HOST` | Server host binding | `0.0.0.0` (for network access) or `localhost` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `HOST` | Development server host | `0.0.0.0` (for network access) |

## Troubleshooting

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

2. Check MongoDB status:
   ```bash
   mongosh --eval "db.adminCommand('ping')"
   ```

3. Verify connection string in `.env`

### Port Already in Use

**Problem:** Port 3000 or 5000 already in use

**Solutions:**

**Find process using the port:**
```powershell
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill process
taskkill /PID [PID_NUMBER] /F
```

**Or change the port:**
```env
# Backend .env
PORT=5001

# Frontend .env
PORT=3001
```

### Quiz Not Loading

**Problem:** Quizzes don't appear on dashboard

**Solutions:**
1. Verify backend is running
2. Check database seeding:
   ```bash
   cd backend
   npm run seed
   ```
3. Clear browser cache and localStorage
4. Check browser console for errors

### Authentication Issues

**Problem:** Cannot login or register

**Solutions:**
1. Verify JWT_SECRET is set in backend `.env`
2. Clear browser localStorage:
   ```javascript
   localStorage.clear()
   ```
3. Check backend logs for errors
4. Verify password meets requirements

### Network Access Issues

**Problem:** Cannot access from other devices

**Solutions:**
1. Verify firewall rules:
   ```powershell
   Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*3000*"}
   ```

2. Check HOST setting in `.env` files (should be `0.0.0.0`)

3. Verify devices are on same network

4. Try accessing by IP directly: `http://[YOUR_IP]:3000`

## Development Tips

### Running in Development Mode

**Backend with hot reload:**
```bash
cd backend
npm run dev
```

**Frontend with hot reload:**
```bash
cd frontend
npm start
```

### Building for Production

**Frontend production build:**
```bash
cd frontend
npm run build
```

The build files will be in `frontend/build/`

**Backend production:**
```bash
cd backend
NODE_ENV=production npm start
```

### Database Management

**Connect to MongoDB:**
```bash
mongosh module437-quiz
```

**View collections:**
```javascript
show collections
db.quizzes.find().pretty()
db.users.find().pretty()
db.results.find().pretty()
```

**Clear specific collection:**
```javascript
db.results.deleteMany({})
```

## Next Steps

- Review the [Full Documentation](DOCUMENTATION.md)
- Check the [Network Access Guide](NETWORK_ACCESS_GUIDE.md)
- Explore the [Admin Panel Guide](admin/ADMIN_PANEL_GUIDE.md)
- Read the [Quick Start Guide](getting-started/QUICKSTART.md)

## Support

If you encounter issues not covered in this guide:

1. Check the [Troubleshooting section](DOCUMENTATION.md#troubleshooting)
2. Review the [Documentation Index](INDEX.md)
3. Check console logs for error messages
4. Contact support: support@emirastic.com
