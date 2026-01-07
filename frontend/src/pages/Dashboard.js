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
            console.log('Stats data received:', statsData); // Debug log
            console.log('totalQuizzes:', statsData?.totalQuizzes);
            console.log('passedQuizzes:', statsData?.passedQuizzes);
            console.log('averageScore:', statsData?.averageScore);
            console.log('passRate:', statsData?.passRate);
            setStats(statsData);
          } catch (statsErr) {
            // Stats are optional, don't block the page if they fail
            console.error('Failed to load stats:', statsErr);
            setError('Failed to load statistics: ' + statsErr.message);
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

  console.log('Rendering Dashboard - stats:', stats);
  console.log('Should show stats section:', stats && stats.totalQuizzes !== undefined);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{t('navbar.appName')} {t('dashboard.title')}</h1>
        <p>Track your progress across all ICT-Fachmann EFZ modules</p>
      </div>

      {stats && stats.totalQuizzes !== undefined && (
        <div className="stats-section">
          <h2>Your Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3 style={{ fontSize: '2.5rem', margin: '0', color: 'white' }}>
                {String(stats.totalQuizzes || 0)}
              </h3>
              <p style={{ color: 'white' }}>Quizzes Completed</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '2.5rem', margin: '0', color: 'white' }}>
                {String(stats.passedQuizzes || 0)}
              </h3>
              <p style={{ color: 'white' }}>Quizzes Passed</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '2.5rem', margin: '0', color: 'white' }}>
                {String(stats.averageScore || 0)}%
              </h3>
              <p style={{ color: 'white' }}>Average Score</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '2.5rem', margin: '0', color: 'white' }}>
                {String(stats.passRate || 0)}%
              </h3>
              <p style={{ color: 'white' }}>Pass Rate</p>
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
