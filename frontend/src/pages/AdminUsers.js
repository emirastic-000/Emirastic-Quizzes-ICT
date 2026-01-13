import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api';
import './Admin.css';

function AdminUsers() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllUsers(token);
      setUsers(data.users);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/dashboard');
      return;
    }

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token, navigate]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await adminAPI.deleteUser(userId, token);
      if (result.message) {
        setUsers(users.filter(u => u._id !== userId));
        setSelectedUser(null);
        setError('');
      }
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const result = await adminAPI.makeAdmin(userId, token);
      setUsers(users.map(u => u._id === userId ? result.user : u));
      setSelectedUser(result.user);
    } catch (err) {
      setError('Failed to promote user to admin');
    }
  };

  const handleRemoveAdmin = async (userId) => {
    if (!window.confirm('Remove admin privileges from this user?')) {
      return;
    }

    try {
      const result = await adminAPI.removeAdmin(userId, token);
      setUsers(users.map(u => u._id === userId ? result.user : u));
      setSelectedUser(result.user);
    } catch (err) {
      setError('Failed to remove admin privileges');
    }
  };

  const handleViewActivity = async (userId) => {
    try {
      const data = await adminAPI.getUserActivity(userId, token);
      setUserActivity(data);
    } catch (err) {
      setError('Failed to load user activity');
    }
  };

  const filteredUsers = users.filter(u => 
    u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user?.isAdmin) {
    return <div>Access Denied</div>;
  }

  if (loading) {
    return <div className="admin-loading">Loading users...</div>;
  }

  return (
    <div className="admin-users">
      <div className="admin-header">
        <h1>👥 User Management</h1>
        <button onClick={() => navigate('/admin')} className="back-btn">← Back</button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-search">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-count">{filteredUsers.length} users found</span>
      </div>

      <div className="users-container">
        <div className="users-list">
          <h3>Users ({filteredUsers.length})</h3>
          <div className="users-table">
            <div className="table-header">
              <div className="col-name">Name</div>
              <div className="col-email">Email</div>
              <div className="col-status">Status</div>
              <div className="col-action">Action</div>
            </div>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(u => (
                <div 
                  key={u._id} 
                  className={`table-row ${selectedUser?._id === u._id ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(u)}
                >
                  <div className="col-name">{u.firstName} {u.lastName}</div>
                  <div className="col-email">{u.email}</div>
                  <div className="col-status">
                    {u.isAdmin ? <span className="badge admin">Admin</span> : <span className="badge user">User</span>}
                  </div>
                  <div className="col-action">
                    <button className="action-btn" onClick={(e) => { e.stopPropagation(); handleViewActivity(u._id); }}>View</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-users">No users found</div>
            )}
          </div>
        </div>

        {selectedUser && (
          <div className="user-detail">
            <h3>User Details</h3>
            <div className="detail-content">
              <div className="detail-field">
                <label>Name:</label>
                <span>{selectedUser.firstName} {selectedUser.lastName}</span>
              </div>
              <div className="detail-field">
                <label>Email:</label>
                <span>{selectedUser.email}</span>
              </div>
              <div className="detail-field">
                <label>Status:</label>
                <span>{selectedUser.isAdmin ? '👑 Admin' : '👤 User'}</span>
              </div>
              <div className="detail-field">
                <label>Joined:</label>
                <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="detail-actions">
                {selectedUser._id !== user._id && (
                  <>
                    {selectedUser.isAdmin ? (
                      <button 
                        className="action-btn remove-admin"
                        onClick={() => handleRemoveAdmin(selectedUser._id)}
                      >
                        ➖ Remove Admin
                      </button>
                    ) : (
                      <button 
                        className="action-btn make-admin"
                        onClick={() => handleMakeAdmin(selectedUser._id)}
                      >
                        👑 Make Admin
                      </button>
                    )}
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteUser(selectedUser._id)}
                    >
                      🗑️ Delete User
                    </button>
                  </>
                )}
                {selectedUser._id === user._id && (
                  <div className="self-warning">This is your account</div>
                )}
              </div>
            </div>
          </div>
        )}

        {userActivity && (
          <div className="user-activity">
            <h3>User Activity</h3>
            <div className="activity-stats">
              <div className="activity-stat">
                <span>Quizzes Taken:</span>
                <strong>{userActivity.stats.totalQuizzesTaken}</strong>
              </div>
              <div className="activity-stat">
                <span>Passed:</span>
                <strong className="passed">{userActivity.stats.passedQuizzes}</strong>
              </div>
              <div className="activity-stat">
                <span>Failed:</span>
                <strong className="failed">{userActivity.stats.failedQuizzes}</strong>
              </div>
              <div className="activity-stat">
                <span>Avg Score:</span>
                <strong>{userActivity.stats.averageScore}%</strong>
              </div>
            </div>

            {userActivity.results.length > 0 && (
              <div className="activity-list">
                <h4>Recent Quiz Results</h4>
                {userActivity.results.slice(0, 5).map(result => (
                  <div key={result._id} className="activity-item">
                    <div className="quiz-name">{result.quizId.title}</div>
                    <div className="quiz-score">
                      <span>{result.percentage}%</span>
                      {result.passed ? (
                        <span className="passed-badge">✅ Passed</span>
                      ) : (
                        <span className="failed-badge">❌ Failed</span>
                      )}
                    </div>
                    <div className="quiz-date">
                      {new Date(result.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
