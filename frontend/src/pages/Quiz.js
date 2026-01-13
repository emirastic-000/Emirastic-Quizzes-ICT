import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI, resultsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import './Quiz.css';

function Quiz() {
  const { quizId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizAPI.getQuiz(quizId);
        setQuiz(data);
        if (data.timeLimit) {
          setTimeLeft(data.timeLimit * 60);
        }
      } catch (err) {
        console.error('Failed to load quiz:', err);
        alert(err.message || 'Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleSubmitQuiz = useCallback(async () => {
    try {
      // Calculate time taken (in seconds)
      const timeTaken = quiz?.timeLimit 
        ? (quiz.timeLimit * 60) - (timeLeft || 0)
        : 0;

      const data = await resultsAPI.submitQuiz(
        { quizId, answers, timeTaken },
        token
      );
      // Navigate to result detail page with result data
      navigate(`/result/${data.result._id}`, { state: { result: data.result } });
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      alert(err.message || 'Failed to submit quiz. Please try again.');
    }
  }, [quiz, timeLeft, quizId, answers, token, navigate]);

  useEffect(() => {
    if (!started || !timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft, handleSubmitQuiz]);

  const handleStartQuiz = () => {
    setStarted(true);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) {
    return <div className="quiz-loading">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="quiz-error">Quiz not found</div>;
  }

  if (!started) {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h2>{quiz.title}</h2>
          <p className="description">{quiz.description}</p>
          <div className="quiz-details">
            <p><strong>Total Questions:</strong> {quiz.questions.length}</p>
            {quiz.timeLimit && <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>}
            <p><strong>Passing Score:</strong> {quiz.passingScore}%</p>
          </div>
          <button className="start-btn" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const answeredCount = answers.filter(a => a !== undefined).length;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        {timeLeft !== null && (
          <div className={`quiz-timer ${timeLeft < 300 ? 'warning' : ''}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="quiz-content">
        <div className="question-section">
          <h2>{question.question}</h2>
          <div className="options">
            {question.options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="answer"
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswer(index)}
                />
                <span className="option-text">{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-nav">
          <button
            className="nav-btn"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <div className="answered-info">
            {answeredCount} of {quiz.questions.length} answered
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              className="submit-btn"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="nav-btn"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>

        <div className="question-navigator">
          <div className="nav-title">Quick Navigation</div>
          <div className="nav-grid">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                className={`nav-item ${index === currentQuestion ? 'active' : ''} ${answers[index] !== undefined ? 'answered' : ''}`}
                onClick={() => setCurrentQuestion(index)}
                title={`Question ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
