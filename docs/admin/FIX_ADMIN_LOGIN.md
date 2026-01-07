# 🔐 Admin Login Not Working - SOLUTION

## The Problem
The admin user credentials aren't valid because **the seed script hasn't been run yet**.

When you first set up the project, no data exists in the database - not even the admin user!

## ✅ SOLUTION: Run the Seed Script

### Step 1: Make sure the app is running
Open a terminal in your project directory and run:
```bash
npm start
```

### Step 2: Open a NEW terminal (keep the first one running)
In the **new** terminal, run:
```bash
npm run seed
```

### What This Does
- Creates 20 Module 437 quiz questions
- Creates 6 themed quizzes
- **Creates the admin user**: 
  - Email: `admin@module437.test`
  - Password: `admin123456`

### Step 3: Login
1. Go to http://localhost:3000
2. Click **Login**
3. Enter credentials:
   - **Email**: `admin@module437.test`
   - **Password**: `admin123456`
4. Press **Login**

## ✅ After Login
You should see:
- Dashboard page with available quizzes
- **👑 Admin Panel** button in the top right (gold color)
- Click it to access user management

## 📋 Complete First-Time Setup Checklist

1. ✅ `npm install` - Install dependencies
2. ✅ Create `.env` files - Already done
3. ✅ `npm start` - Start MongoDB + servers
4. ✅ `npm run seed` - **← YOU ARE HERE** Populate database
5. ✅ Login with admin credentials

## 🆘 If Seed Fails

**Error: "MongoDB connection failed"**
- Make sure `npm start` is still running in the first terminal
- MongoDB must be connected before seed runs

**Error: "Admin user already exists"**
- This is OK! It means it was already seeded
- Just try logging in again

**Error: "Cannot find module"**
- Make sure you're in the root project directory
- Run: `npm install` first

## 💡 Quick Copy-Paste

```bash
# Terminal 1
npm start

# Terminal 2 (new terminal, keep Terminal 1 running)
npm run seed

# Then login with:
# Email: admin@module437.test
# Password: admin123456
```

---

**Status**: 🚀 Ready to use after seed completes!
