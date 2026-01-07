const express = require('express');
const User = require('../models/User');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ isAdmin: true });
    const totalResults = await Result.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    
    const results = await Result.find();
    const averageScore = results.length > 0 
      ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
      : 0;
    
    res.json({
      totalUsers,
      totalAdmins,
      totalResults,
      totalQuizzes,
      averageScore,
      averagePassRate: results.length > 0 
        ? ((results.filter(r => r.passed).length / results.length) * 100).toFixed(2)
        : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:userId', adminAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Prevent deleting yourself
    if (userId === req.userId.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user's results first
    await Result.deleteMany({ userId });
    
    // Delete user
    await User.findByIdAndDelete(userId);
    
    res.json({ 
      message: 'User deleted successfully',
      deletedUser: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Make user admin
router.patch('/users/:userId/make-admin', adminAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'User promoted to admin',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove admin privileges
router.patch('/users/:userId/remove-admin', adminAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Prevent removing your own admin status
    if (userId === req.userId.toString()) {
      return res.status(400).json({ message: 'Cannot remove your own admin privileges' });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin: false },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'Admin privileges removed',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user activity/results
router.get('/users/:userId/activity', adminAuth, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const results = await Result.find({ userId })
      .populate('quizId', 'title category')
      .sort({ completedAt: -1 });
    
    const stats = {
      totalQuizzesTaken: results.length,
      passedQuizzes: results.filter(r => r.passed).length,
      failedQuizzes: results.filter(r => !r.passed).length,
      averageScore: results.length > 0 
        ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
        : 0
    };
    
    res.json({
      user,
      stats,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
