const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const router = express.Router();

// ===== CUSTOM QUESTIONS =====

// Get all custom questions created by current user
router.get('/questions', auth, async (req, res) => {
  try {
    const questions = await Question.find({ 
      createdBy: req.userId,
      isCustom: true 
    }).sort('-createdAt');
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new custom question
router.post('/questions', auth, async (req, res) => {
  try {
    const { question, options, explanation, difficulty, category } = req.body;

    // Validation
    if (!question || !options || !explanation) {
      return res.status(400).json({ 
        message: 'Question, options, and explanation are required' 
      });
    }

    if (options.length < 2) {
      return res.status(400).json({ 
        message: 'At least 2 options are required' 
      });
    }

    if (!options.some(opt => opt.isCorrect)) {
      return res.status(400).json({ 
        message: 'At least one option must be marked as correct' 
      });
    }

    const newQuestion = new Question({
      question,
      options,
      explanation,
      difficulty: difficulty || 'medium',
      category: category || 'Support Process',
      isCustom: true,
      createdBy: req.userId
    });

    await newQuestion.save();

    res.status(201).json({
      message: 'Question created successfully',
      question: newQuestion
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a specific custom question
router.get('/questions/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user owns this question
    if (question.createdBy.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a custom question
router.put('/questions/:id', auth, async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check ownership
    if (question.createdBy.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this question' });
    }

    // Update fields
    const { questionText, options, explanation, difficulty, category } = req.body;
    
    if (questionText) question.question = questionText;
    if (options) {
      if (options.length < 2) {
        return res.status(400).json({ 
          message: 'At least 2 options are required' 
        });
      }
      if (!options.some(opt => opt.isCorrect)) {
        return res.status(400).json({ 
          message: 'At least one option must be marked as correct' 
        });
      }
      question.options = options;
    }
    if (explanation) question.explanation = explanation;
    if (difficulty) question.difficulty = difficulty;
    if (category) question.category = category;

    await question.save();

    res.json({
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a custom question
router.delete('/questions/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check ownership
    if (question.createdBy.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    // Remove from all quizzes
    await Quiz.updateMany(
      { questions: req.params.id },
      { $pull: { questions: req.params.id } }
    );

    await Question.findByIdAndDelete(req.params.id);

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== CUSTOM QUIZZES =====

// Get all custom quizzes created by current user
router.get('/quizzes', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ 
      createdBy: req.userId,
      isCustom: true 
    }).populate('questions').sort('-createdAt');
    
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new custom quiz (ADMIN ONLY)
router.post('/quizzes', auth, async (req, res) => {
  try {
    // Admin check
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Only administrators can create quizzes' });
    }

    const { title, description, category, questions, timeLimit, passingScore } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: 'At least one question is required' });
    }

    // Verify all questions exist and belong to user
    const existingQuestions = await Question.find({ _id: { $in: questions } });
    
    for (let q of existingQuestions) {
      if (q.createdBy.toString() !== req.userId && !req.isAdmin) {
        return res.status(403).json({ 
          message: 'You can only use your own questions in custom quizzes' 
        });
      }
    }

    if (existingQuestions.length !== questions.length) {
      return res.status(400).json({ 
        message: 'Some questions were not found or deleted' 
      });
    }

    const newQuiz = new Quiz({
      title,
      description: description || '',
      category: category || 'Custom',
      questions,
      timeLimit: timeLimit || 30,
      passingScore: passingScore || 70,
      isCustom: true,
      createdBy: req.userId
    });

    await newQuiz.save();
    await newQuiz.populate('questions');

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: newQuiz
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a specific custom quiz (ADMIN ONLY)
router.get('/quizzes/:id', auth, async (req, res) => {
  try {
    // Admin check
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Only administrators can access quiz details' });
    }

    const quiz = await Quiz.findById(req.params.id).populate('questions');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a custom quiz (ADMIN ONLY)
router.put('/quizzes/:id', auth, async (req, res) => {
  try {
    // Admin check
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Only administrators can update quizzes' });
    }

    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { title, description, category, questions, timeLimit, passingScore } = req.body;

    if (title) quiz.title = title;
    if (description !== undefined) quiz.description = description;
    if (category) quiz.category = category;
    
    if (questions && questions.length > 0) {
      // Verify all questions exist
      const existingQuestions = await Question.find({ _id: { $in: questions } });
      if (existingQuestions.length !== questions.length) {
        return res.status(400).json({ 
          message: 'Some questions were not found' 
        });
      }
      quiz.questions = questions;
    }
    
    if (timeLimit) quiz.timeLimit = timeLimit;
    if (passingScore) quiz.passingScore = passingScore;

    await quiz.save();
    await quiz.populate('questions');

    res.json({
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a custom quiz (ADMIN ONLY)
router.delete('/quizzes/:id', auth, async (req, res) => {
  try {
    // Admin check
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Only administrators can delete quizzes' });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check ownership
    if (quiz.createdBy.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this quiz' });
    }

    await Quiz.findByIdAndDelete(req.params.id);

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all available categories for questions
router.get('/categories', (req, res) => {
  const categories = [
    'Support Process',
    'Communication',
    'Ticketing & Documentation',
    'Support Levels',
    'Incident Management',
    'Troubleshooting',
    'Customer Service',
    'Remote Support',
    'Custom'
  ];
  res.json({ categories });
});

module.exports = router;
