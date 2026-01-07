# Quick Start Guide - Module 437 Quiz Application

## 📋 Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn
- Git

## 🚀 Quick Start (5 minutes)

### ⚠️ IMPORTANT: Prerequisites Check
Before starting, ensure:
1. **Node.js v14+** is installed: `node --version`
2. **MongoDB** is running (open MongoDB Compass or run `mongod`)
3. **npm v6+** is available: `npm --version`

### 🎯 FASTEST: Start Everything with One Command

**Option 1: Using npm (if you have concurrently installed)**
```bash
npm install              # First time only - installs concurrently
npm start               # Starts both backend AND frontend simultaneously
```

**Option 2: Windows PowerShell Script**
```powershell
# From the root directory
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\start-app.ps1
```
This opens two separate terminal windows and starts both servers.

**Option 3: Windows Command Prompt**
```cmd
# From the root directory
start-app.bat
```
This opens two separate terminal windows and starts both servers.

---

## 📖 Manual Setup (If You Prefer Step-by-Step)

### 1. Set Up MongoDB

You have three options:

#### Option A: MongoDB Atlas (Easiest - No Installation)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Click "Create a Deployment" → Select "M0 Free Tier"
4. Create database user
5. Get connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/module437-quiz`)
6. **Skip to Backend Setup** and use this string in `.env`

#### Option B: MongoDB Compass (GUI - Windows Recommended)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Install and run
3. Local connection: `mongodb://localhost:27017`
4. Then install MongoDB Server (see Option C below)

#### Option C: Install MongoDB Server (Windows)
1. Download [MongoDB Server](https://www.mongodb.com/try/download/community)
2. Run installer (MSI file)
3. Check "Install MongoDB as a Service" during setup
4. Service starts automatically
5. Command: `mongod` (should now work in terminal)

**⚠️ If you can't run `mongod`:**
- MongoDB may not be installed
- Use **Option A (MongoDB Atlas)** instead - no installation needed!
- OR check Windows Services: `services.msc` → look for "MongoDB"

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
# On Windows PowerShell:
Copy-Item .env.example .env
# On Mac/Linux:
# cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# Example:
# MONGODB_URI=mongodb://localhost:27017/module437-quiz
# JWT_SECRET=your_secret_key_123
```

**Seed the database:**
```bash
npm run seed
```

**Start backend server:**
```bash
npm start
# or with auto-reload:
npm run dev
```

✅ Backend running on: `http://localhost:5000`

### 3. Frontend Setup (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional, defaults are fine)
# On Windows PowerShell:
Copy-Item .env.example .env
# On Mac/Linux:
# cp .env.example .env

# Start React development server
npm start
```

✅ Frontend opens automatically at: `http://localhost:3000`

## 📝 First Steps

1. **Register Account**
   - Click "Register" link
   - Enter: First Name, Last Name, Email, Password
   - Create account

2. **Login**
   - Enter your email and password
   - Access dashboard

3. **Start a Quiz**
   - Browse available quizzes on dashboard
   - Click "Start Quiz"
   - Answer all questions
   - Submit and view results

## 🏗️ Project Structure
```
module437-quiz/
├── backend/
│   ├── models/       (Database schemas)
│   ├── routes/       (API endpoints)
│   ├── middleware/   (Auth, etc)
│   ├── seed.js       (Database seeding)
│   └── server.js     (Main server)
├── frontend/
│   ├── src/
│   │   ├── components/   (UI components)
│   │   ├── pages/        (Page components)
│   │   ├── context/      (State management)
│   │   └── api.js        (API client)
│   └── public/           (Static files)
└── README.md (Main documentation)
```

## 📚 Available Quizzes

After seeding, 6 quizzes are available:

1. **Support Process Fundamentals** - 15 min
2. **Communication Skills in Support** - 15 min
3. **Ticketing & Support Levels** - 20 min
4. **Incident Management & Troubleshooting** - 20 min
5. **Customer Service Excellence** - 15 min
6. **Module 437 Comprehensive Exam** - 60 min

## 🔑 Test Credentials

After seeding, you can create your own account or use seed data.

To add test users to seed:
1. Edit `backend/seed.js` to add user seeding
2. Or manually register through the UI

## 🛠️ Common Commands

### Root Level Commands (From Project Root)
```bash
npm start                    # Start both backend & frontend together
npm run dev                  # Start both with auto-reload (nodemon)
npm run install-all         # Install all dependencies (backend + frontend)
npm run backend             # Start only backend
npm run backend-dev         # Start only backend with auto-reload
npm run frontend            # Start only frontend
npm run seed                # Seed database with 20 Module 437 questions
```

### Backend
```bash
cd backend

npm install      # Install dependencies
npm run dev      # Start with auto-reload
npm start        # Start server
npm run seed     # Seed database
npm test         # Run tests
```

### Frontend
```bash
cd frontend

npm install      # Install dependencies
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## 🔧 Troubleshooting

### npm install Issues

#### Error: "No matching version found for jsonwebtoken"
**Status**: ✅ FIXED in current version
- **Cause**: Version constraints in package.json were too specific
- **Solution**: Already corrected in package.json
- **Action**: Run `npm install` again - should work now

#### Error: "npm ERR! code ETARGET"
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules folder
Remove-Item -Path node_modules -Recurse -Force  # Windows PowerShell
# rm -rf node_modules  # Mac/Linux

# Try install again
npm install
```

### "Cannot connect to MongoDB"
- Check MongoDB is running: `mongod`
- Verify connection string in `.env`
- Check firewall/network access

### "Port 5000 already in use"
```bash
# Windows PowerShell - Find process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### "Quiz not loading"
- Ensure database is seeded: `npm run seed`
- Check MongoDB connection
- Verify backend is running on port 5000

### Windows PowerShell vs Command Prompt
The application supports both. Key differences:

**Windows PowerShell** (recommended):
```powershell
Copy-Item .env.example .env  # Instead of 'cp'
Get-ChildItem               # Instead of 'ls'
Remove-Item -Recurse        # Instead of 'rm -rf'
```

**Command Prompt (cmd)**:
```cmd
copy .env.example .env
dir
rmdir /s /q node_modules
```

### npm Package Installation Failures
**If npm install still fails**:
```bash
# Option 1: Clear cache and reinstall
npm cache clean --force
npm install

# Option 2: Use npm ci (more reliable)
npm ci

# Option 3: Check Node version and upgrade if needed
node --version  # Should be v14+
npm --version   # Should be v6+
```

### "Module not found" after install
```bash
# Reinstall specific directory
cd backend
npm install

# Or reinstall from scratch
Remove-Item -Path node_modules -Recurse -Force
Remove-Item -Path package-lock.json
npm install
```

## 📖 Full Documentation

For detailed information, see:
- [Main README](./README.md)
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🎓 Module 437 Learning Objectives

This application covers:
- Support process understanding
- Customer communication
- Ticket management
- Support level responsibilities
- Incident & problem management
- Troubleshooting techniques
- Remote support skills
- Professional conduct

## 💡 Tips

1. **Practice Before Exam**: Use regular quizzes to prepare for comprehensive exam
2. **Review Explanations**: Read explanations for all questions, even correct ones
3. **Track Progress**: Check dashboard statistics to see improvement
4. **Time Management**: Use timed quizzes to practice speed and accuracy
5. **Understand Concepts**: Don't just memorize, understand the "why"

## 🚀 Next Steps

1. Start with "Support Process Fundamentals" quiz
2. Progress through other topic-specific quizzes
3. Review results and explanations
4. Take "Comprehensive Exam" when ready
5. Achieve 75%+ to pass Module 437!

## 📞 Support

For issues:
1. Check the Troubleshooting section above
2. Review README files
3. Check browser/server console for error messages
4. Verify all prerequisites are installed correctly

## 📚 Resources

- [Module 437 on Modulbaukasten](https://www.modulbaukasten.ch/module/437/1/de-DE)
- [ICT Berufsbildung Schweiz](https://www.ict-berufsbildung.ch/)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

**Happy Learning!** 🎉

Start with the backend setup, then frontend, then seed the database, and you're ready to go!
