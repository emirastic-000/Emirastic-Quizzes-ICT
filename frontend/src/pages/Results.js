import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resultsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await resultsAPI.getUserResults(token);
        // Filter out results with missing quiz references
        const validResults = data.filter(result => result.quizId && result.quizId.title);
        setResults(validResults);
      } catch (err) {
        console.error('Failed to load results:', err);
        setResults([]); // Set empty array instead of showing alert
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div className="results-loading">Loading results...</div>;
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>{t('results.title')}</h1>
        <button
          className="back-btn"
          onClick={() => navigate('/dashboard')}
        >
          {t('results.backToDashboard')}
        </button>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          <p>{t('dashboard.noHistory')}</p>
          <button
            className="start-quiz-btn"
            onClick={() => navigate('/dashboard')}
          >
            {t('dashboard.startQuiz')}
          </button>
        </div>
      ) : (
        <div className="results-list">
          {results.map((result) => (
            <div key={result._id} className="result-card">
              <div className="result-header">
                <h3>{result.quizId?.title || 'Quiz'}</h3>
                <span className={`status ${result.passed ? 'passed' : 'failed'}`}>
                  {result.passed ? t('dashboard.passed') : t('dashboard.failed')}
                </span>
              </div>
              <div className="result-details">
                <div className="detail">
                  <span className="label">{t('dashboard.score')}:</span>
                  <span className="value">{result.score}/{result.totalQuestions}</span>
                </div>
                <div className="detail">
                  <span className="label">Percentage:</span>
                  <span className="value">{result.percentage?.toFixed(2) || 0}%</span>
                </div>
                <div className="detail">
                  <span className="label">{t('dashboard.timeSpent')}:</span>
                  <span className="value">
                    {Math.floor((result.timeTaken || 0) / 60)}m {(result.timeTaken || 0) % 60}s
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Completed:</span>
                  <span className="value">
                    {new Date(result.completedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${result.passed ? 'passed' : 'failed'}`}
                    style={{ width: `${result.percentage || 0}%` }}
                  ></div>
                </div>
              </div>
              <button
                className="view-review-btn"
                onClick={() => navigate(`/result/${result._id}`, { state: { result } })}
              >
                📋 View Detailed Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
