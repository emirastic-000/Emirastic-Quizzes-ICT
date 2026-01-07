const express = require('express');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');
const router = express.Router();

// Calculate Swiss grade from percentage (1.0 - 6.0 scale)
// Swiss grading: 6 = excellent, 5 = good, 4 = sufficient (passing), 3-1 = failing
const calculateSwissGrade = (percentage) => {
  // Formula: Grade = 1 + (percentage / 100) * 5
  // This gives a linear scale from 1.0 (0%) to 6.0 (100%)
  // Rounded to nearest 0.5 (half grade) for realistic grading
  const rawGrade = 1 + (percentage / 100) * 5;
  const roundedGrade = Math.round(rawGrade * 2) / 2; // Round to nearest 0.5
  
  // Ensure grade is between 1.0 and 6.0
  return Math.max(1.0, Math.min(6.0, roundedGrade));
};

// Submit quiz answer
router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;
    
    if (!quizId || !answers) {
      return res.status(400).json({ message: 'Please provide quiz ID and answers' });
    }
    
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    // Calculate score
    let correctCount = 0;
    const processedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index];
      const selectedOption = question.options[answer];
      const isCorrect = selectedOption?.isCorrect || false;
      
      if (isCorrect) correctCount++;
      
      return {
        questionId: question._id,
        selectedOption: answer,
        isCorrect
      };
    });
    
    const totalQuestions = quiz.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    const passed = percentage >= quiz.passingScore;
    
    // Calculate Swiss grade if this is a comprehensive exam
    let swissGrade = null;
    if (quiz.isComprehensive) {
      swissGrade = calculateSwissGrade(percentage);
    }
    
    const result = new Result({
      userId: req.userId,
      quizId,
      answers: processedAnswers,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      swissGrade,
      timeTaken
    });
    
    await result.save();
    
    // Prepare detailed result with question information
    const detailedAnswers = processedAnswers.map((answer, index) => {
      const question = quiz.questions[index];
      const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
      
      return {
        questionText: question.question,
        selectedOption: answer.selectedOption,
        selectedOptionText: question.options[answer.selectedOption]?.text || 'No answer',
        correctOption: correctOptionIndex,
        correctOptionText: question.options[correctOptionIndex]?.text || '',
        isCorrect: answer.isCorrect,
        explanation: question.explanation
      };
    });
    
    res.status(201).json({
      message: 'Quiz submitted successfully',
      result: {
        score: correctCount,
        totalQuestions,
        percentage: percentage.toFixed(2),
        passed,
        timeTaken,
        swissGrade: swissGrade ? swissGrade.toFixed(1) : null,
        isComprehensive: quiz.isComprehensive || false,
        quizTitle: quiz.title,
        answers: detailedAnswers
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user statistics - MUST come before /user/history to avoid route conflicts
router.get('/user/stats', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId });
    
    const totalQuizzes = results.length;
    const passedQuizzes = results.filter(r => r.passed).length;
    const averageScore = results.length > 0 
      ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
      : 0;
    
    res.json({
      totalQuizzes,
      passedQuizzes,
      failedQuizzes: totalQuizzes - passedQuizzes,
      averageScore,
      passRate: totalQuizzes > 0 ? ((passedQuizzes / totalQuizzes) * 100).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user results
router.get('/user/history', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId })
      .populate('quizId')
      .sort({ completedAt: -1 });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single result
router.get('/:resultId', auth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId)
      .populate('userId')
      .populate('quizId');
    
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    if (result.userId._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this result' });
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
