import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI, resultsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Dashboard.css';

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzesData = await quizAPI.getAllQuizzes();
        setQuizzes(quizzesData);

        if (token) {
          try {
            const statsData = await resultsAPI.getUserStats(token);
            setStats(statsData);
          } catch (statsErr) {
            // Stats are optional, don't block the page if they fail
            console.error('Failed to load stats:', statsErr);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div className="dashboard-loading">{t('messages.loading')}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{t('navbar.appName')} {t('dashboard.title')}</h1>
        <p>Track your progress across all ICT-Fachmann EFZ modules</p>
      </div>

      {stats && (
        <div className="stats-section">
          <h2>{t('dashboard.statistics')}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.totalQuizzes}</h3>
              <p>Quizzes Completed</p>
            </div>
            <div className="stat-card">
              <h3>{stats.passedQuizzes}</h3>
              <p>Quizzes Passed</p>
            </div>
            <div className="stat-card">
              <h3>{stats.averageScore}%</h3>
              <p>{t('dashboard.averageScore')}</p>
            </div>
            <div className="stat-card">
              <h3>{stats.passRate}%</h3>
              <p>Pass Rate</p>
            </div>
          </div>
        </div>
      )}

      <div className="quizzes-section">
        <h2>{t('dashboard.availableQuizzes')}</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="quizzes-grid">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="quiz-card">
              <h3>{quiz.title}</h3>
              <p className="description">{quiz.description || 'Test your knowledge'}</p>
              <div className="quiz-info">
                <span className="question-count">{quiz.questions.length} Questions</span>
                {quiz.timeLimit && (
                  <span className="time-limit">{quiz.timeLimit} min</span>
                )}
              </div>
              <button
                className="start-btn"
                onClick={() => navigate(`/quiz/${quiz._id}`)}
              >
                {t('dashboard.startQuiz')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="results-btn"
          onClick={() => navigate('/results')}
        >
          {t('dashboard.viewResults')}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
