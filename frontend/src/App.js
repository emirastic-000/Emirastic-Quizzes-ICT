import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import ResultDetail from './pages/ResultDetail';
import Admin from './pages/Admin';
import AdminUsers from './pages/AdminUsers';
import QuizBuilder from './pages/QuizBuilder';
import './App.css';

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const { loading, token } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:categoryId"
            element={
              <ProtectedRoute>
                <ModuleView />
              </ProtectedRoute>
            }
          />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <ResultDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <QuizBuilder />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
}

export default App;
