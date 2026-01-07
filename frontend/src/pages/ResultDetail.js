import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

function ResultDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="results-container">
        <div className="results-header">
          <h1>Quiz Result</h1>
        </div>
        <div className="no-results">
          <p>No result data available.</p>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isPassed = result.passed;
  const percentage = parseFloat(result.percentage);

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Quiz Complete!</h1>
      </div>

      <div className="result-detail-card">
        {result.quizTitle && (
          <div className="quiz-title-display">
            <h3>{result.quizTitle}</h3>
          </div>
        )}

        <div className={`result-status ${isPassed ? 'passed' : 'failed'}`}>
          <h2>{isPassed ? '✓ Passed' : '✗ Failed'}</h2>
        </div>

        <div className="result-stats">
          <div className="stat-item">
            <div className="stat-label">Score</div>
            <div className="stat-value">{result.score} / {result.totalQuestions}</div>
          </div>

          <div className="stat-item">
            <div className="stat-label">Percentage</div>
            <div className="stat-value">{percentage.toFixed(1)}%</div>
          </div>

          {result.timeTaken !== undefined && (
            <div className="stat-item">
              <div className="stat-label">Time Taken</div>
              <div className="stat-value">
                {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
              </div>
            </div>
          )}
        </div>

        <div className="result-message">
          {isPassed ? (
            <p className="success-message">
              Congratulations! You passed the quiz.
            </p>
          ) : (
            <p className="fail-message">
              You did not pass this time. Keep studying and try again!
            </p>
          )}
        </div>

        {/* Detailed Question Review */}
        {result.answers && result.answers.length > 0 && (
          <div className="question-review-section">
            <h3 className="review-heading">
              Question by Question Review
            </h3>
            <div className="questions-list">
              {result.answers.map((answer, index) => (
                <div 
                  key={index} 
                  className={`question-review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                >
                  <div className="question-review-header">
                    <span className="question-number">Question {index + 1}</span>
                    <span className={`question-result-badge ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  
                  <div className="question-text">
                    {answer.questionText}
                  </div>

                  <div className="answer-comparison">
                    {!answer.isCorrect && (
                      <div className="answer-item your-answer">
                        <span className="answer-label">Your Answer:</span>
                        <span className="answer-text incorrect-text">
                          {answer.selectedOptionText}
                        </span>
                      </div>
                    )}
                    
                    <div className="answer-item correct-answer">
                      <span className="answer-label">
                        {answer.isCorrect ? 'Your Answer:' : 'Correct Answer:'}
                      </span>
                      <span className="answer-text correct-text">
                        {answer.correctOptionText}
                      </span>
                    </div>
                  </div>

                  {answer.explanation && (
                    <div className="explanation">
                      <span className="explanation-label">
                        Explanation:
                      </span>
                      <p className="explanation-text">{answer.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="result-actions">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-primary"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => navigate('/results')} 
            className="btn-secondary"
          >
            View All Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultDetail;
