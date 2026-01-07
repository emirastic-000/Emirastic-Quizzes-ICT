import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authAPI.getCurrentUser(token)
        .then(data => {
          setUser(data);
        })
        .catch(err => {
          console.error('Failed to get user:', err);
          // Only clear token if it's an authentication error (401)
          // Don't clear on network errors to avoid logout on temporary connection issues
          if (err.message.includes('401') || err.message.includes('Invalid token')) {
            localStorage.removeItem('token');
            setToken(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      // Return error object for display
      return { error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      // Return error object for display
      return { error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
