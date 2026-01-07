const express = require('express');
const Question = require('../models/Question');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all questions with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    const questions = await Question.find(filter);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create question (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { category, question, options, explanation, difficulty } = req.body;
    
    if (!category || !question || !options || !explanation) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const newQuestion = new Question({
      category,
      question,
      options,
      explanation,
      difficulty
    });
    
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get question categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Question.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
