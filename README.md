# Emirastic ICT Quiz

> A modern fullstack quiz application for ICT-Fachmann EFZ apprenticeships in Switzerland

[![Version](https://img.shields.io/badge/Version-0.3.1-blue.svg)](CHANGELOG.md)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📖 About

Emirastic ICT Quiz helps learners test their knowledge across official ICT-Fachmann EFZ modules with interactive quizzes based on the Swiss ICT apprenticeship curriculum.

**Current Version: 0.3.1** - [See what's new](CHANGELOG.md)

**Supported Modules:**
- **Module 117**: IT and network infrastructure for small businesses (15 advanced questions, 4 quizzes)
- **Module 437**: IT support operations (with Swiss grading system for final exam)

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** - JWT-based user registration and login
- 📚 **Module Organization** - Quizzes aligned with official ICT modules
- ⏱️ **Interactive Quizzes** - Real-time timer, progress tracking, and navigation
- 📊 **Performance Analytics** - Detailed results and quiz history
- 👨‍💼 **Admin Panel** - User and quiz management dashboard
- 📱 **Responsive Design** - Works seamlessly on all devices

### New in Version 0.3.1
- 🎯 **Enhanced Module 117 Difficulty** - All wrong answers now use professional networking terminology
- 🇩🇪 **Improved German Tutorial** - Added automated 2-minute setup option for Windows users
- 📚 **Better Learning** - Questions require actual technical knowledge, not just common sense
- 🔧 **Sophisticated Distractors** - Wrong answers sound plausible using terms like "VLAN Pruning", "DHCP Snooping"

### New in Version 0.3.0
- 🌐 **Module 117 Content** - 15 advanced network infrastructure questions with 4 comprehensive quizzes
- 🪟 **Windows Automation** - One-click setup with `setup-windows.bat` for instant installation
- 📊 **12 New Categories** - Network Planning, Switching, VLANs, DHCP, DNS, Routing, Wireless, Security, Backup
- ⚡ **Quick Start Scripts** - `start-all.bat` with intelligent MongoDB detection

### New in Version 0.2.0
- 🎓 **Swiss Grading System (1-6)** - Authentic Swiss grading for comprehensive exams
- 📖 **Enhanced Explanations** - Deep-dive explanations with practical examples and best practices
- 🔄 **Persistent Results** - View quiz reviews anytime, even after page refresh
- 🎨 **Improved UI** - Color-coded grades, better result displays, professional styling

## 🚀 Getting Started

### 🪟 Windows Users - One-Click Setup! (Recommended)

**The easiest way to get started on Windows:**

1. **Download the project** (clone or download ZIP from GitHub)
2. **Run:** `setup-windows.bat`
3. **Done!** The script handles everything automatically

The setup script will:
- ✅ Check prerequisites (Node.js, MongoDB)
- ✅ Install all dependencies
- ✅ Configure environment variables  
- ✅ Seed the database with quiz content
- ✅ Start the application

📖 **Detailed Guide:** See [QUICK_START_WINDOWS.md](QUICK_START_WINDOWS.md)

**Access:** http://localhost:3000  
**Login:** `admin@module437.test` / `admin123456`

---

### 🛠️ Manual Installation (All Platforms)

#### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **MongoDB** (version 5.0 or higher)
   - Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Install and ensure MongoDB service is running

3. **Git** (optional, for cloning)
   - Download from [git-scm.com](https://git-scm.com/)

#### Installation Steps

##### Step 1: Download the Project

**Option A: Clone with Git**
```bash
git clone https://github.com/emirastic-000/Emirastic-Quizzes-ICT.git
cd emirastic-ict-quiz
```

**Option B: Download ZIP**
1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file
4. Open terminal/command prompt in the extracted folder

#### Step 2: Install Dependencies

Open your terminal and run:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

**This may take a few minutes...**

#### Step 3: Configure Environment Variables

**Backend Configuration:**

1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```
3. The default values in `.env` work for local development - no changes needed!

**Frontend Configuration:**

1. Navigate to the `frontend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```
3. The default values work for local development - no changes needed!

#### Step 4: Set Up the Database

From the `backend` folder, run:

```bash
npm run seed
```

This creates:
- Sample quiz questions for Module 437
- A default admin account (Email: `admin@module437.test`, Password: `admin123456`)
- Quiz categories and structure

**You should see:** ✅ messages confirming successful database setup.

#### Step 5: Start the Application

**Option A: Windows Quick Start (Recommended)**

From the project root folder:

```powershell
.\start-all.ps1
```

or

```batch
start-all.bat
```

This automatically starts MongoDB, backend, and frontend servers.

**Option B: Manual Start**

Open **two separate terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

#### Step 6: Access the Application

1. Your browser should automatically open to `http://localhost:3000`
2. If not, manually navigate to: **http://localhost:3000**

**You should see the Emirastic ICT Quiz home page!**

### 🎉 First Steps

1. **Create an Account**
   - Click "Register" in the navigation bar
   - Fill in your details
   - Click "Register"

2. **Start Taking Quizzes**
   - Browse available modules on the home page
   - Select a quiz
   - Answer questions and submit

3. **View Your Results**
   - Check your score and performance
   - Review correct/incorrect answers
   - Track your progress over time

4. **Admin Access** (Optional)
   - Email: `admin@module437.test`
   - Password: `admin123456`
   - Access admin panel to manage users and quizzes

## 🌐 Network Access (Optional)

To allow other devices on your local network to access the quiz:

1. **Run the firewall configuration script** (Windows, as Administrator):
   ```powershell
   .\configure-firewall.ps1
   ```

2. **Find your IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

3. **Access from other devices:**
   Navigate to `http://[YOUR_IP]:3000` (e.g., `http://192.168.1.100:3000`)

For detailed network setup, see [Network Access Guide](docs/NETWORK_ACCESS_GUIDE.md).

## 🔧 Troubleshooting

### MongoDB Not Running

**Error:** "MongoDB connection error"

**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use

**Error:** "Port 3000 (or 5000) already in use"

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Cannot Install Dependencies

**Error:** npm install fails

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. If still fails, update Node.js to latest version

### Quiz Questions Not Showing

**Solution:**
1. Ensure backend is running
2. Re-run database seed: `cd backend && npm run seed`
3. Check browser console for errors (F12)

**More help?** Check the [Complete Troubleshooting Guide](docs/SETUP.md#troubleshooting)

## 📚 Documentation

Comprehensive documentation is available in the [docs/](docs/) folder:

- 🚀 **[Quick Start Guide](docs/getting-started/QUICKSTART.md)** - Setup in 5 minutes
- 📖 **[Full Documentation](docs/DOCUMENTATION.md)** - Complete technical guide
- 🌐 **[Network Access Setup](docs/NETWORK_ACCESS_GUIDE.md)** - LAN configuration
- 🔍 **[Documentation Index](docs/INDEX.md)** - Browse all docs

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Frontend:** React 18, React Router, Context API  
**Database:** MongoDB with Mongoose ODM

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🔒 Security

**⚠️ Important Security Notes:**
- Default admin credentials are for development only - see [SECURITY.md](SECURITY.md)
- Never commit `.env` files to version control
- Change JWT_SECRET for production deployments
- Review [SECURITY.md](SECURITY.md) before deploying to production

For security concerns, please email: security@emirastic.com

## 📞 Support

- 📖 Check the [troubleshooting guide](docs/DOCUMENTATION.md#troubleshooting)
- 🐛 [Report issues](https://github.com/yourusername/emirastic-ict-quiz/issues)
- 📧 Contact: support@emirastic.com

## 🙏 Acknowledgments

Based on the official [ICT-Berufsbildung Schweiz Modulbaukasten](https://www.modulbaukasten.ch/)

---

**Version:** 1.0.0 | **Last Updated:** January 2026
