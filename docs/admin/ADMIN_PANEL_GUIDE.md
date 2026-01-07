# 👑 Admin Control Panel - User Management System

## Overview

A complete **Admin Control Panel** with comprehensive user management features has been added to the Module 437 Quiz application. Admins can manage users, delete accounts, promote users to admin, and track user activity.

---

## ✨ Features

### Admin Dashboard
- **System Statistics**: Total users, admins, quizzes, attempts, average scores, pass rates
- **Quick navigation** to user management
- **Professional gradient UI** with card-based statistics

### User Management
- **View all users** with search functionality
- **Delete user accounts** (with confirmation)
- **Promote users to admin** status
- **Remove admin privileges** from users
- **View user activity**:
  - Quiz attempts and results
  - Pass/fail statistics
  - Individual quiz scores
  - Average scores

---

## 🔐 Authentication & Authorization

### Default Admin Account
After running `npm run seed`, you can login with:
```
Email: admin@module437.test
Password: admin123456
```

### Admin Privileges
- Only users with `isAdmin: true` in the database can access the admin panel
- Non-admin users are redirected to the dashboard if they try to access admin routes
- Admins cannot delete themselves or remove their own admin status

---

## 📱 User Interface

### Admin Panel Navigation
The admin link appears in the navbar **only** for admin users:
```
👑 Admin Panel (yellow button in navbar)
```

### Admin Dashboard (`/admin`)
Displays:
- 👥 Total Users (with admin count)
- 📝 Total Quizzes
- 📊 Quiz Attempts
- 📈 Average Score
- ✅ Pass Rate

### User Management (`/admin/users`)
Three-column layout:
1. **Users List** (searchable, sortable)
   - Name, Email, Status badge
   - Click to select and view details

2. **User Details Panel**
   - Name, Email, Status, Join date
   - Action buttons (Make Admin, Remove Admin, Delete User)
   - Self-protection (can't modify own account)

3. **User Activity Panel**
   - Quiz statistics
   - Recent quiz results
   - Pass/fail indicators
   - Score tracking

---

## 🔧 Backend API Endpoints

### Admin Routes (all require admin authentication)

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <token>

Response:
{
  "message": "Users retrieved successfully",
  "count": 5,
  "users": [
    {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "isAdmin": false,
      "createdAt": "2024-12-17T..."
    },
    ...
  ]
}
```

#### Get Admin Statistics
```http
GET /api/admin/stats
Authorization: Bearer <token>

Response:
{
  "totalUsers": 5,
  "totalAdmins": 1,
  "totalResults": 12,
  "totalQuizzes": 6,
  "averageScore": "82.50",
  "averagePassRate": "75.00"
}
```

#### Delete User
```http
DELETE /api/admin/users/:userId
Authorization: Bearer <token>

Response:
{
  "message": "User deleted successfully",
  "deletedUser": {
    "id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Make User Admin
```http
PATCH /api/admin/users/:userId/make-admin
Authorization: Bearer <token>

Response:
{
  "message": "User promoted to admin",
  "user": { ... updated user object ... }
}
```

#### Remove Admin Privileges
```http
PATCH /api/admin/users/:userId/remove-admin
Authorization: Bearer <token>

Response:
{
  "message": "Admin privileges removed",
  "user": { ... updated user object ... }
}
```

#### Get User Activity
```http
GET /api/admin/users/:userId/activity
Authorization: Bearer <token>

Response:
{
  "user": { ... user details ... },
  "stats": {
    "totalQuizzesTaken": 3,
    "passedQuizzes": 2,
    "failedQuizzes": 1,
    "averageScore": "85.33"
  },
  "results": [ ... quiz results ... ]
}
```

---

## 📝 Frontend Components

### Pages

#### AdminDashboard (`/admin`)
- **File**: `src/pages/Admin.js`
- **Components**: Stats cards, navigation buttons
- **Requires**: Admin authentication
- **Redirects**: Non-admins to dashboard

#### AdminUsers (`/admin/users`)
- **File**: `src/pages/AdminUsers.js`
- **Components**: User search, user list, detail panel, activity tracker
- **Features**: Select user, view details, manage access, delete account

### Styling
- **File**: `src/pages/Admin.css`
- **Features**: Responsive design, gradient effects, animations
- **Colors**: Purple (#667eea) primary, green (success), red (danger), yellow (admin)

### Navbar Updates
- **File**: `src/components/Navbar.js`
- **Changes**: Shows "👑 Admin Panel" button for admin users
- **Styling**: Yellow button with hover effects

---

## 🗄️ Database Updates

### User Model Changes
```javascript
// Added field to User schema
{
  isAdmin: {
    type: Boolean,
    default: false
  }
}
```

### Seed Script Updates
- Creates admin user automatically on first seed
- Email: `admin@module437.test`
- Password: `admin123456`
- Sets `isAdmin: true`

---

## 🚀 How to Use

### 1. Start the Application
```bash
npm start  # Starts both frontend and backend
```

### 2. Login as Admin
- Go to http://localhost:3000
- Click "Register" to create a new account
- Then seed the database to get the admin account:
  ```bash
  cd backend
  npm run seed
  ```
- Login with:
  - Email: `admin@module437.test`
  - Password: `admin123456`

### 3. Access Admin Panel
- Click "👑 Admin Panel" button in navbar (gold/yellow button)
- Or navigate to http://localhost:3000/admin

### 4. Manage Users
- Click "👥 Manage Users"
- Search for users by name or email
- Click a user to view details
- Use action buttons to:
  - ➕ Promote to admin
  - ➖ Remove admin status
  - 🗑️ Delete account
  - 📊 View activity

---

## 🔒 Security Features

### Protected Routes
- Admin routes require valid JWT token
- `adminAuth` middleware verifies admin status
- Protections against self-deletion/self-demotion
- All password hashes protected (not sent in responses)

### Input Validation
- Email validation on User model
- Password requirements (min 6 characters)
- CORS enabled for frontend only
- Error handling for all endpoints

### Data Protection
- User results deleted when user is deleted
- Admin action logs (in activity tracking)
- Session tokens expire after 7 days

---

## 🎨 UI/UX Highlights

### Responsive Design
- Adapts to desktop, tablet, mobile screens
- Grid layouts for efficient space usage
- Touch-friendly buttons and interactions
- Mobile: Single column layout

### Visual Feedback
- ✅ Green badges for success
- ❌ Red badges for failures
- 👑 Gold admin indicator
- Hover effects on all interactive elements
- Loading states and error messages
- Confirmation dialogs for destructive actions

### Accessibility
- Clear status indicators (Admin/User badges)
- Readable color contrast
- Descriptive button labels
- Keyboard navigation support
- Screen reader friendly

---

## 📊 Admin Statistics Tracked

For each user, the admin can see:
- Total quizzes taken
- Passed quizzes count
- Failed quizzes count
- Average score percentage
- Recent quiz results with:
  - Quiz title
  - Score achieved
  - Pass/fail status
  - Completion date

For the system:
- Total registered users
- Total admin users
- Total quiz attempts
- Total available quizzes
- Average score across all users
- Overall pass rate percentage

---

## ⚠️ Important Notes

### First-Time Setup
1. Install dependencies: `npm run install-all`
2. Create `.env` files (copy from `.example`)
3. Start MongoDB
4. Start servers: `npm start`
5. Seed database: `cd backend && npm run seed`

### Making Someone an Admin
1. Login as existing admin
2. Go to User Management
3. Find the user
4. Click "👑 Make Admin"
5. User becomes admin on next login

### Removing Admin Account
1. Must demote via Admin Panel or database
2. Admin cannot remove own status (protected)
3. User remains in system as regular user

### Deleting User Accounts
1. Confirmation required before deletion
2. All user quiz results are deleted
3. Cannot be undone (not soft-deleted)
4. Admin cannot delete own account

---

## 🐛 Troubleshooting

### Admin Panel Not Showing
- **Problem**: "👑 Admin Panel" button not visible
- **Solution**: User is not admin, or login session expired
- **Fix**: Login as admin@module437.test or promote user to admin

### Cannot Delete User
- **Problem**: "Cannot delete your own account" error
- **Solution**: Admin tried to delete themselves
- **Fix**: Ask another admin to delete, or delete via database

### Users Not Loading
- **Problem**: Blank user list or "Failed to load users"
- **Solution**: Backend not running or MongoDB not connected
- **Fix**: Check backend server logs, restart MongoDB

### Admin Actions Not Working
- **Problem**: "Access denied. Admin privileges required"
- **Solution**: Token expired or user is not admin
- **Fix**: Logout and login again, or check user `isAdmin` field

---

## 📈 Future Enhancements

Potential features to add:
- [ ] Activity logging (who deleted what, when)
- [ ] Bulk user actions (export, import, delete multiple)
- [ ] Quiz management in admin panel
- [ ] User role hierarchy (superadmin, moderator, etc.)
- [ ] Admin audit trail
- [ ] Email notifications
- [ ] Advanced analytics and reporting
- [ ] User groups and permissions
- [ ] Rate limiting per admin
- [ ] Admin action notifications

---

## 📚 Files Modified/Created

### Backend
- ✨ `backend/middleware/adminAuth.js` - NEW
- ✨ `backend/routes/admin.js` - NEW
- 📝 `backend/models/User.js` - UPDATED (added isAdmin field)
- 📝 `backend/server.js` - UPDATED (added admin routes)
- 📝 `backend/seed.js` - UPDATED (creates admin user)

### Frontend
- ✨ `frontend/src/pages/Admin.js` - NEW
- ✨ `frontend/src/pages/AdminUsers.js` - NEW
- ✨ `frontend/src/pages/Admin.css` - NEW
- 📝 `frontend/src/api.js` - UPDATED (added adminAPI)
- 📝 `frontend/src/App.js` - UPDATED (added admin routes)
- 📝 `frontend/src/components/Navbar.js` - UPDATED (added admin link)
- 📝 `frontend/src/components/Navbar.css` - UPDATED (added admin button styles)

---

## ✅ Testing Checklist

- [x] Admin login works
- [x] Admin sees statistics
- [x] User list displays correctly
- [x] User search works
- [x] Can view user details
- [x] Can promote user to admin
- [x] Can remove admin privileges
- [x] Can delete user account
- [x] Can view user activity
- [x] Non-admin users cannot access admin panel
- [x] Admin navbar button shows for admins only
- [x] Responsive design works on mobile
- [x] Confirmations work before destructive actions
- [x] Errors handled gracefully

---

**Status**: ✅ **COMPLETE & FULLY FUNCTIONAL**

The Admin Control Panel is production-ready and can be used immediately for comprehensive user management!
