import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api';
import './Admin.css';

function AdminDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/dashboard');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await adminAPI.getStats(token);
        setStats(data);
      } catch (err) {
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, token, navigate]);

  if (!user?.isAdmin) {
    return <div className="admin-denied">Access Denied. Admin privileges required.</div>;
  }

  if (loading) {
    return <div className="admin-loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>📊 Admin Control Panel</h1>
        <p>Manage users, quizzes, and system statistics</p>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {stats && (
        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-detail">{stats.totalAdmins} admin(s)</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-label">Total Quizzes</div>
              <div className="stat-value">{stats.totalQuizzes}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">Quiz Attempts</div>
              <div className="stat-value">{stats.totalResults}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-label">Average Score</div>
              <div className="stat-value">{stats.averageScore}%</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">Pass Rate</div>
              <div className="stat-value">{stats.averagePassRate}%</div>
            </div>
          </div>
        </div>
      )}

      <div className="admin-actions">
        <button 
          className="admin-btn primary"
          onClick={() => navigate('/admin/users')}
        >
          👥 Manage Users
        </button>
        <button 
          className="admin-btn secondary"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="admin-info">
        <h3>Quick Actions</h3>
        <ul>
          <li>View all registered users</li>
          <li>Delete user accounts</li>
          <li>Promote users to admin</li>
          <li>View user activity and results</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
