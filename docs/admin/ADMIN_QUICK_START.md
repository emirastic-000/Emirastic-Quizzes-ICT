# 👑 Admin System - Quick Start

## 🚀 Get Started in 5 Minutes

### Step 1: Seed the Database
```bash
cd backend
npm run seed
```

This creates an admin user:
- **Email**: `admin@module437.test`
- **Password**: `admin123456`

### Step 2: Login as Admin
1. Go to http://localhost:3000
2. Click "Login"
3. Enter admin credentials
4. Click "Login"

### Step 3: Access Admin Panel
Look for the **"👑 Admin Panel"** button in the yellow in the top-right navbar.

---

## 📋 What You Can Do

### View System Statistics
- Total users and admins
- Total quizzes and attempts
- Average scores and pass rates

### Manage Users
**Search users** by name or email

**For each user:**
- 👤 View details (name, email, join date)
- 👑 Promote to admin
- ➖ Demote from admin
- 🗑️ Delete account
- 📊 View quiz activity

---

## 🔑 Default Admin Credentials

```
Email: admin@module437.test
Password: admin123456
```

**⚠️ Change this password after first login in production!**

---

## 👤 Creating More Admins

1. Register a new user normally
2. Login as existing admin
3. Go to "👥 Manage Users"
4. Find the new user
5. Click "👑 Make Admin"
6. They become admin after logging in again

---

## 🗑️ Deleting Users

1. Go to "👥 Manage Users"
2. Click on the user
3. Click "🗑️ Delete User"
4. Confirm deletion
5. ✅ Done - all their data is removed

**Note**: This cannot be undone!

---

## 📊 Viewing User Activity

1. Go to "👥 Manage Users"
2. Click on a user
3. Click "View" button
4. See:
   - Quizzes they took
   - Scores achieved
   - Pass/fail status
   - Dates completed

---

## ⚡ Quick Tips

- **Search**: Use the search bar to quickly find users
- **Sorting**: Click on user rows to select and view details
- **Bulk actions**: Currently manage one user at a time
- **Refresh**: Reload page to get latest data
- **Mobile**: Admin panel works on mobile devices too

---

## 🔐 Security Notes

✅ **Protected Features:**
- Only admins can access admin panel
- Non-admin users are blocked automatically
- All admin actions require valid token
- Admins cannot delete themselves

---

## 🆘 Need Help?

### Admin Panel Not Showing?
- Make sure you're logged in as admin
- User must have `isAdmin: true`
- Try refreshing the page

### Cannot Delete User?
- You can't delete yourself
- Confirmation dialog must be accepted
- Check browser console for errors

### User List Empty?
- No users in database - run `npm run seed`
- Search might be filtering out all users
- Try clearing the search term

---

## 📚 For More Information

See [ADMIN_PANEL_GUIDE.md](ADMIN_PANEL_GUIDE.md) for complete documentation.

---

**Status**: ✅ Ready to use!

Happy managing! 👑
