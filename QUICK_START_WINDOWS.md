# 🚀 Quick Start Guide - Windows

> Get up and running in 5 minutes!

## Prerequisites

Before you begin, make sure you have these installed:

### 1. Node.js (Required)
- **Download:** https://nodejs.org/
- **Version:** v14 or higher recommended
- **Check installation:** Open Command Prompt and type `node --version`

### 2. MongoDB (Required)
- **Download:** https://www.mongodb.com/try/download/community
- **Version:** 5.0 or higher
- **Installation:**
  1. Download the MSI installer
  2. Run the installer with default settings
  3. Choose "Complete" installation
  4. Install MongoDB Compass (optional but helpful)

---

## 🎯 Automated Setup (Recommended)

### Option 1: One-Click Setup

1. **Download the project**
   - Download ZIP from GitHub or clone the repository
   - Extract to a folder (e.g., `C:\Users\YourName\Helpdesk Quiz`)

2. **Run the setup script**
   - Open the project folder
   - Double-click `setup-windows.bat`
   - Follow the on-screen instructions

3. **Done!** 
   - The script will automatically:
     - Check prerequisites
     - Install all dependencies
     - Configure environment
     - Seed the database
     - Offer to start the application

**That's it!** 🎉

---

## 🛠️ Manual Setup (Alternative)

If you prefer to set up manually:

### Step 1: Install Dependencies
```cmd
npm install
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### Step 2: Configure Environment
```cmd
cd backend
copy .env.example .env
cd ..
```

### Step 3: Seed Database
```cmd
cd backend
npm run seed
cd ..
```

### Step 4: Start Application
```cmd
start-all.bat
```

---

## 🚀 Starting the Application

After setup, you have multiple options:

### Option 1: Complete Startup (Recommended)
```cmd
start-all.bat
```
This starts MongoDB, backend, and frontend automatically.

### Option 2: Simple Startup
```cmd
npm start
```
If MongoDB is already running.

### Option 3: Development Mode
```cmd
npm run start-simple
```
Both backend and frontend with auto-reload.

---

## 🌐 Access the Application

Once started, open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

### Network Access (Optional)
Access from other devices on your network:
- **Your IP:** Check the startup message
- **Frontend:** http://YOUR_IP:3000
- **Backend:** http://YOUR_IP:5000

---

## 🔐 Login Credentials

### Default Admin Account
- **Email:** `admin@module437.test`
- **Password:** `admin123456`

⚠️ **IMPORTANT:** Change this password immediately after first login!

### Create New User
1. Click "Register" on the login page
2. Fill in your details
3. Start taking quizzes!

---

## 📚 Available Quizzes

### Module 437 - IT Support Operations (24 questions, 7 quizzes)
- Mission 1: Support-Anfragen Bearbeiten
- Mission 2: Kommunikation im Support
- Mission 3: Support-Hierarchie & Eskalation
- Mission 4: Troubleshooting & Problemlösung
- Mission 5: Incident Management
- Mission 6: IT-Betrieb & Wartung
- 🏆 Final Exam (with Swiss grading system)

### Module 117 - Network Infrastructure (15 questions, 4 quizzes)
- 🌐 Netzwerk-Grundlagen & Planung
- ⚙️ Netzwerkdienste & Routing
- 🔒 WLAN, Sicherheit & Backup
- 🏆 Final Exam (with Swiss grading system)

---

## ❓ Troubleshooting

### MongoDB Won't Start
**Error:** "MongoDB not found"
- **Solution:** Install MongoDB from https://www.mongodb.com/try/download/community
- **Verify:** Check `C:\Program Files\MongoDB\Server\` exists

### Port Already in Use
**Error:** "Port 3000 or 5000 already in use"
- **Solution:** Close other applications using these ports
- **Check:** Run `netstat -ano | findstr :3000` to find what's using the port

### Dependencies Not Installing
**Error:** "npm install failed"
- **Solution 1:** Run as Administrator
- **Solution 2:** Clear npm cache: `npm cache clean --force`
- **Solution 3:** Delete `node_modules` folders and try again

### Database Connection Failed
**Error:** "MongoDB connection failed"
- **Check:** Is MongoDB running? Look for `mongod.exe` in Task Manager
- **Solution:** Run `start-all.bat` which starts MongoDB automatically

### Application Won't Start
**Error:** Various startup errors
1. Make sure MongoDB is running
2. Check all dependencies are installed: `npm install`
3. Verify .env file exists in backend folder
4. Try running `setup-windows.bat` again

---

## 🔄 Stopping the Application

### Method 1: Close Windows
Simply close the terminal windows running the servers.

### Method 2: Keyboard Shortcut
Press `Ctrl + C` in each terminal window.

### Method 3: Stop All
```cmd
taskkill /F /IM node.exe
```
**Warning:** This stops ALL Node.js processes on your computer.

---

## 📖 Next Steps

1. **Login** with the admin credentials
2. **Take a quiz** from the dashboard
3. **View your results** and review explanations
4. **Create new quizzes** using the Quiz Builder (Admin only)
5. **Manage users** from the Admin panel

---

## 💡 Tips

- **First time?** Start with Module 437 Mission 1 (easier difficulty)
- **Want a challenge?** Try Module 117 quizzes (harder, network focused)
- **Track progress:** Check the Dashboard for statistics
- **Study mode:** Review explanations after each quiz
- **Swiss grading:** Final exams show grades on 1-6 scale

---

## 🆘 Need Help?

- **Documentation:** Check the `docs/` folder
- **API Reference:** `docs/API.md`
- **Issues:** https://github.com/emirastic-000/Emirastic-Quizzes-ICT/issues
- **Changes:** See `CHANGELOG.md` for version history

---

## 📝 Notes

- **Database Location:** `C:\data\db`
- **MongoDB Logs:** Check the MongoDB terminal window
- **Application Logs:** Check backend terminal window for errors
- **Hot Reload:** Frontend automatically reloads when you edit files

---

**Happy Learning! 🎓**

Start your ICT-Fachmann EFZ journey with confidence!
