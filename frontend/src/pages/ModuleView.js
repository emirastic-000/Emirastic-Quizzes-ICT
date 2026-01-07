import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryById } from '../data/modules';
import './ModuleView.css';

function ModuleView() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { t } = useLanguage();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const category = getCategoryById(categoryId);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const allQuizzes = await quizAPI.getAllQuizzes();
        // Filter quizzes by category if needed
        // For now, show all quizzes - you can filter by category later
        setQuizzes(allQuizzes);
      } catch (err) {
        setError(err.message || 'Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [categoryId]);

  if (!category) {
    return (
      <div className="module-view-container">
        <div className="error-message">
          <h2>Category not found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="module-loading">Loading modules...</div>;
  }

  return (
    <div className="module-view-container">
      <div className="module-header" style={{ borderTopColor: category.color }}>
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Categories
        </button>
        <div className="module-header-content">
          <div className="module-icon" style={{ color: category.color }}>
            {category.icon}
          </div>
          <h1 className="module-title">{category.name}</h1>
          <p className="module-description">{category.description}</p>
        </div>
      </div>

      <div className="module-content">
        <h2 className="content-title">Available Modules</h2>
        <div className="modules-list">
          {category.modules.map((module) => {
            // For module 437, show all quizzes since they're all related to it
            // For other modules, filter by category or title match
            let moduleQuizzes;
            if (module.id === 437) {
              // Show all quizzes for module 437 (all existing quizzes are for this module)
              moduleQuizzes = quizzes;
            } else {
              // For other modules, filter by matching category or title
              moduleQuizzes = quizzes.filter(q => 
                q.category === `Module ${module.id}` || 
                q.title.includes(`${module.id}`) ||
                q.title.toLowerCase().includes(module.name.toLowerCase())
              );
            }

            return (
              <div key={module.id} className="module-item">
                <div className="module-item-header">
                  <h3 className="module-number">Module {module.id}</h3>
                  {module.version && <span className="module-level">Version {module.version}</span>}
                </div>
                <p className="module-name">{module.name}</p>
                
                {moduleQuizzes.length > 0 ? (
                  <div className="module-quizzes">
                    <p className="quiz-count">{moduleQuizzes.length} quiz(zes) available</p>
                    <div className="quiz-buttons">
                      {moduleQuizzes.map((quiz) => (
                        <button
                          key={quiz._id}
                          className="quiz-button"
                          onClick={() => navigate(`/quiz/${quiz._id}`)}
                          style={{ borderLeftColor: category.color }}
                        >
                          <span className="quiz-name">{quiz.title}</span>
                          <span className="quiz-info">
                            {quiz.questions.length} questions
                            {quiz.timeLimit && ` • ${quiz.timeLimit} min`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-quizzes">
                    <span className="no-quiz-icon">📝</span>
                    <p>No quizzes available yet</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ModuleView;
