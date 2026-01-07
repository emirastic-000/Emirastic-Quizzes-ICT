const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create quiz (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, questions, timeLimit, passingScore } = req.body;
    
    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Please provide title and questions' });
    }
    
    const quiz = new Quiz({
      title,
      description,
      category,
      questions,
      timeLimit,
      passingScore
    });
    
    await quiz.save();
    await quiz.populate('questions');
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
