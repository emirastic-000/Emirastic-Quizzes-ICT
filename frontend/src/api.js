const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  // Check if response is JSON
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    
    // If response is not OK, throw error with the message from backend
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } else {
    // Non-JSON response (likely an error page or CORS issue)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    throw new Error(`Unexpected response format: ${text.substring(0, 100)}`);
  }
};

// Helper function to handle fetch errors
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    // Network error or fetch failed
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      throw new Error('Unable to connect to server. Please check your network connection and ensure the server is running.');
    }
    // Re-throw other errors
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return fetchWithErrorHandling(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
  },
  
  login: async (credentials) => {
    return fetchWithErrorHandling(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  },
  
  getCurrentUser: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};

// Quiz API
export const quizAPI = {
  getAllQuizzes: async () => {
    return fetchWithErrorHandling(`${API_URL}/quizzes`);
  },
  
  getQuiz: async (id) => {
    return fetchWithErrorHandling(`${API_URL}/quizzes/${id}`);
  }
};

// Questions API
export const questionsAPI = {
  getAllQuestions: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return fetchWithErrorHandling(`${API_URL}/questions?${params}`);
  },
  
  getCategories: async () => {
    return fetchWithErrorHandling(`${API_URL}/questions/categories/list`);
  }
};

// Results API
export const resultsAPI = {
  submitQuiz: async (quizData, token) => {
    return fetchWithErrorHandling(`${API_URL}/results/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(quizData)
    });
  },
  
  getUserResults: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/results/user/history`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },
  
  getUserStats: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/results/user/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};
// Admin API
export const adminAPI = {
  // Get all users
  getAllUsers: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Get admin statistics
  getStats: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Delete user
  deleteUser: async (userId, token) => {
    return fetchWithErrorHandling(`${API_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Make user admin
  makeAdmin: async (userId, token) => {
    return fetchWithErrorHandling(`${API_URL}/admin/users/${userId}/make-admin`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Remove admin privileges
  removeAdmin: async (userId, token) => {
    return fetchWithErrorHandling(`${API_URL}/admin/users/${userId}/remove-admin`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Get user activity
  getUserActivity: async (userId, token) => {
    return fetchWithErrorHandling(`${API_URL}/admin/users/${userId}/activity`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};

// Quiz Builder API
export const builderAPI = {
  // Questions
  createQuestion: async (questionData, token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(questionData)
    });
  },

  getCustomQuestions: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  updateQuestion: async (questionId, questionData, token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/questions/${questionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(questionData)
    });
  },

  deleteQuestion: async (questionId, token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/questions/${questionId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  // Quizzes
  createQuiz: async (quizData, token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(quizData)
    });
  },

  getCustomQuizzes: async (token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/quizzes`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  updateQuiz: async (quizId, quizData, token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/quizzes/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(quizData)
    });
  },

  deleteQuiz: async (quizId, token) => {
    return fetchWithErrorHandling(`${API_URL}/builder/quizzes/${quizId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  getCategories: async () => {
    return fetchWithErrorHandling(`${API_URL}/builder/categories`);
  }
};