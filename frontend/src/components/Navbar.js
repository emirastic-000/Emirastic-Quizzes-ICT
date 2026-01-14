import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1>{t('navbar.appName')}</h1>
          <p className="tagline">{t('navbar.tagline')} <span style={{ opacity: 0.6, fontSize: '0.85em' }}>v0.3.3</span></p>
        </div>
        <div className="navbar-right">
          {user && (
            <>
              <button 
                onClick={() => navigate('/')} 
                className="nav-link"
              >
                🏠 Home
              </button>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="nav-link"
              >
                📊 Dashboard
              </button>
              <button 
                onClick={() => navigate('/results')} 
                className="nav-link"
              >
                📈 Results
              </button>
              {user.isAdmin && (
                <button 
                  onClick={() => navigate('/builder')} 
                  className="builder-link"
                  title={`${t('navbar.buildQuiz')} (Admin Only)`}
                >
                  🛠️ {t('navbar.buildQuiz')}
                </button>
              )}
              {user.isAdmin && (
                <button 
                  onClick={() => navigate('/admin')} 
                  className="admin-link"
                  title={t('navbar.adminPanel')}
                >
                  👑 {t('navbar.adminPanel')}
                </button>
              )}
              <span className="user-info">
                {user.isAdmin && '👑 '}{user.firstName} {user.lastName}
              </span>
              <button onClick={logout} className="logout-btn">{t('navbar.logout')}</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
