# 🚀 Automated MongoDB Startup Guide

## The Problem (Solved ✅)

Previously, you had to manually:
1. Start MongoDB in one terminal
2. Wait for it to connect
3. Start the backend in another terminal
4. Start the frontend in a third terminal

**Now everything starts with ONE command!**

---

## ✨ Three Ways to Start Everything

### Option 1: npm start (EASIEST - RECOMMENDED)
```bash
npm start
```
✅ Automatically starts MongoDB
✅ Then starts backend and frontend
✅ All in one command!

### Option 2: Batch File (Windows)
```bash
start-all.bat
```
✅ Double-click from File Explorer
✅ No terminal needed
✅ Works on Windows only

### Option 3: PowerShell Script
```powershell
.\start-all.ps1
```
✅ Full control and feedback
✅ Nice colored output
✅ Better error messages

---

## 🎯 What Happens When You Run `npm start`

1. **Node script starts MongoDB** (1-2 seconds)
   - Checks if MongoDB is installed
   - Creates data directory if needed
   - Starts MongoDB in background

2. **Waits for MongoDB to initialize** (2-3 seconds)
   - Running on: `mongodb://localhost:27017`

3. **Starts both servers simultaneously**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

4. **Frontend opens automatically** in your browser
   - Ready to use immediately!

---

## 📋 Comparison: Old vs New

### OLD WAY (3 terminals needed)
```bash
# Terminal 1
mongod --dbpath C:\data\db

# Terminal 2 (after MongoDB started)
cd backend && npm start

# Terminal 3 (after backend started)
cd frontend && npm start
```
⏱️ Time: 30-60 seconds, lots of manual steps

### NEW WAY (1 terminal, 1 command)
```bash
npm start
```
⏱️ Time: 10-15 seconds, fully automated!

---

## 🔧 How It Works

### The Startup Script (`start-mongodb.js`)
- Detects Windows platform
- Finds MongoDB executable
- Creates `C:\data\db` if needed
- Starts MongoDB in background
- Waits for initialization
- Then launches both servers

### Three Ways to Trigger It:

**1. npm start** → `start-mongodb.js` → backend + frontend
**2. start-all.bat** → `start-mongodb.js` → backend + frontend
**3. start-all.ps1** → direct MongoDB start → backend + frontend

---

## ⚙️ Customization

### If MongoDB is in a Different Location
Edit `start-mongodb.js` line 11:
```javascript
const mongoDbPath = 'C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe';
```

### If You Want Different Data Directory
Edit `start-mongodb.js` line 12:
```javascript
const dataDir = 'C:\\data\\db';
```

### If You Want to Skip MongoDB (already running)
```bash
npm run start-simple
```

---

## 🛑 Stopping Services

### To Stop Everything
Press `Ctrl+C` in the terminal

### To Stop Just MongoDB
```bash
npm run stop-mongodb
```

Or manually:
```bash
taskkill /F /IM mongod.exe
```

---

## 🆘 Troubleshooting

### "MongoDB not found"
**Solution**: Install from https://www.mongodb.com/try/download/community

### "Data directory error"
**Solution**: Make sure `C:\data` exists and is writable
```bash
mkdir C:\data\db
```

### "Port already in use"
**Solution**: MongoDB or backend/frontend already running
```bash
# Stop all Node processes
taskkill /F /IM node.exe

# Stop MongoDB
taskkill /F /IM mongod.exe
```

### "Backend/Frontend not starting"
**Solution**: Check port availability
```bash
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 3000 (frontend)
netstat -ano | findstr :3000
```

---

## 📊 Available npm Commands

| Command | What It Does | When to Use |
|---------|-------------|------------|
| `npm start` | Start MongoDB + backend + frontend | **ALWAYS USE THIS** |
| `npm run start-simple` | Start backend + frontend (no MongoDB) | If MongoDB already running |
| `npm run dev` | Start with auto-reload + MongoDB | Development with live updates |
| `npm run backend` | Start just backend | If you only want backend |
| `npm run frontend` | Start just frontend | If you only want frontend |
| `npm run seed` | Populate database | First time setup |
| `npm run stop-mongodb` | Stop MongoDB | To shut down MongoDB |

---

## ✅ Checklist After Starting

After running `npm start`, verify:

- ✅ MongoDB console shows: "waiting for connections"
- ✅ Backend console shows: "Server running on port 5000" + "MongoDB connected"
- ✅ Frontend console shows: "Compiled successfully"
- ✅ Browser opens to `http://localhost:3000`
- ✅ All three services running without errors

---

## 🎯 Quick Start Guide

After system reboot:

1. **Open Terminal** in project root
2. **Run**: `npm start`
3. **Wait**: 10-15 seconds
4. **Browser**: Opens automatically
5. **Login**: Use your credentials
6. **Done!** ✨

---

## 🔄 System Reboot Recovery

After Windows reboot:

```bash
cd c:\Users\Public\"Helpdesk Quiz"
npm start
```

MongoDB starts automatically, no manual steps needed!

---

## 📝 Behind the Scenes

**What's actually running:**

```
┌─────────────────────────────────────┐
│   npm start (root package.json)     │
└────────────────┬────────────────────┘
                 │
         ┌───────┴────────┐
         ▼                ▼
   ┌──────────────┐  ┌──────────────┐
   │start-mongodb │  │  concurrently│
   │    .js       │  │              │
   └──────┬───────┘  └──────┬───────┘
          │                 │
     ┌────▼─────┐      ┌────┴────┐
     │ mongod   │      │          │
     │ running  │      ▼          ▼
     │          │  backend    frontend
     │ Port     │  :5000      :3000
     │ 27017    │
     └──────────┘
```

---

## 💡 Pro Tips

1. **First time setup**: Run `npm run seed` after login
2. **Development**: Use `npm run dev` for auto-reload
3. **Testing**: Use `npm run start-simple` if debugging MongoDB
4. **Cleanup**: Run `npm run stop-mongodb` when done

---

## 🎉 You're All Set!

Everything is automated now. Just one command:

```bash
npm start
```

**That's it!** MongoDB, backend, and frontend all start together! 🚀

---

**Status**: ✅ **FULLY AUTOMATED**

MongoDB now starts automatically with your application!
