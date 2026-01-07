import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { quizAPI } from '../api';
import { moduleCategories } from '../data/modules';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const allQuizzes = await quizAPI.getAllQuizzes();
        setQuizzes(allQuizzes);
      } catch (err) {
        console.error('Failed to load quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/modules/${categoryId}`);
  };

  const getQuizCountForModule = (moduleId) => {
    if (moduleId === 437) {
      return quizzes.length; // All current quizzes are for module 437
    }
    return quizzes.filter(q => 
      q.category === `Module ${moduleId}` || 
      q.title.includes(`${moduleId}`)
    ).length;
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="brand-name">Emirastic</span>
            <span className="brand-subtitle">ICT Quiz</span>
          </h1>
          <p className="hero-description">
            Master your ICT-Fachmann EFZ apprenticeship with interactive quizzes
          </p>
          {user && (
            <p className="welcome-message">
              Welcome back, <strong>{user.firstName}</strong>!
            </p>
          )}
        </div>
      </div>

      <div className="modules-section">
        <h2 className="section-title">Choose Your Module Category</h2>
        <p className="section-description">
          Select a module category to start practicing for your ICT-Fachmann EFZ certification
        </p>

        {loading ? (
          <div className="loading-message">Loading quizzes...</div>
        ) : (
          <div className="category-grid">
            {moduleCategories.map((category) => {
              const quizCount = category.modules.reduce((total, module) => 
                total + getQuizCountForModule(module.id), 0
              );
              
              return (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ borderTopColor: category.color }}
                >
                  <div className="category-icon" style={{ color: category.color }}>
                    {category.icon}
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="module-count">
                    {quizCount} {quizCount === 1 ? 'quiz' : 'quizzes'} available
                  </div>
                  <button 
                    className="category-button"
                    style={{ backgroundColor: category.color }}
                  >
                    Explore Modules →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Emirastic ICT Quiz?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3>Module-Based Learning</h3>
            <p>Organized by official ICT-Fachmann EFZ modules</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your performance across all modules</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌐</div>
            <h3>Multilingual</h3>
            <p>Available in German and English</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💡</div>
            <h3>Detailed Explanations</h3>
            <p>Learn from your mistakes with comprehensive feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
