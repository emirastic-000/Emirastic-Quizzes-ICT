import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { builderAPI } from '../api';
import '../styles/Builder.css';

export default function QuizBuilder() {
  const { user, token } = useAuth();
  
  // All hooks must be called before any conditional logic
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' or 'quizzes'
  const [mode, setMode] = useState('list'); // 'list', 'createQuestion', 'createQuiz', 'editQuestion'
  
  // Questions state
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [questionForm, setQuestionForm] = useState({
    question: '',
    category: 'Support Process',
    difficulty: 'medium',
    options: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false }
    ],
    explanation: ''
  });

  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    category: 'Custom',
    questions: [],
    timeLimit: 30,
    passingScore: 70
  });

  const [editingQuestionId, setEditingQuestionId] = useState(null);

  // Load data
  useEffect(() => {
    loadQuestions();
    loadQuizzes();
    loadCategories();
  }, [token]);

  // Only admins can access quiz builder - check after hooks
  if (!user || !user.isAdmin) {
    return (
      <div className="builder-container">
        <div className="access-denied">
          <h2>🔒 Access Denied</h2>
          <p>Only administrators can access the Quiz Builder.</p>
          <p>Please contact your administrator if you need to create quizzes.</p>
        </div>
      </div>
    );
  }

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await builderAPI.getCustomQuestions(token);
      setQuestions(data);
    } catch (err) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const loadQuizzes = async () => {
    try {
      const data = await builderAPI.getCustomQuizzes(token);
      setQuizzes(data);
    } catch (err) {
      console.error('Failed to load quizzes');
    }
  };

  const loadCategories = async () => {
    try {
      const data = await builderAPI.getCategories();
      setCategories(data.categories);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  // Question handlers
  const handleAddOption = () => {
    setQuestionForm({
      ...questionForm,
      options: [...questionForm.options, { text: '', isCorrect: false }]
    });
  };

  const handleRemoveOption = (index) => {
    if (questionForm.options.length > 2) {
      setQuestionForm({
        ...questionForm,
        options: questionForm.options.filter((_, i) => i !== index)
      });
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...questionForm.options];
    newOptions[index][field] = value;
    setQuestionForm({ ...questionForm, options: newOptions });
  };

  const handleSaveQuestion = async () => {
    if (!questionForm.question.trim()) {
      setError('Question text is required');
      return;
    }

    if (!questionForm.options.every(opt => opt.text.trim())) {
      setError('All options must have text');
      return;
    }

    if (!questionForm.options.some(opt => opt.isCorrect)) {
      setError('At least one option must be marked as correct');
      return;
    }

    try {
      setLoading(true);
      let result;
      
      if (editingQuestionId) {
        result = await builderAPI.updateQuestion(editingQuestionId, {
          questionText: questionForm.question,
          category: questionForm.category,
          difficulty: questionForm.difficulty,
          options: questionForm.options,
          explanation: questionForm.explanation
        }, token);
      } else {
        result = await builderAPI.createQuestion({
          question: questionForm.question,
          category: questionForm.category,
          difficulty: questionForm.difficulty,
          options: questionForm.options,
          explanation: questionForm.explanation
        }, token);
      }

      if (result.error) {
        setError(result.message || 'Failed to save question');
      } else {
        setSuccess(editingQuestionId ? 'Question updated!' : 'Question created!');
        resetQuestionForm();
        loadQuestions();
        setMode('list');
        setEditingQuestionId(null);
      }
    } catch (err) {
      setError('Error saving question');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure? This will remove it from any quizzes.')) {
      try {
        await builderAPI.deleteQuestion(id, token);
        setSuccess('Question deleted!');
        loadQuestions();
      } catch (err) {
        setError('Failed to delete question');
      }
    }
  };

  const handleEditQuestion = (question) => {
    setQuestionForm({
      question: question.question,
      category: question.category,
      difficulty: question.difficulty,
      options: question.options,
      explanation: question.explanation
    });
    setEditingQuestionId(question._id);
    setMode('createQuestion');
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      question: '',
      category: 'Support Process',
      difficulty: 'medium',
      options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false }
      ],
      explanation: ''
    });
    setEditingQuestionId(null);
  };

  // Quiz handlers
  const handleToggleQuestion = (questionId) => {
    const updatedQuestions = quizForm.questions.includes(questionId)
      ? quizForm.questions.filter(id => id !== questionId)
      : [...quizForm.questions, questionId];
    
    setQuizForm({ ...quizForm, questions: updatedQuestions });
  };

  const handleSaveQuiz = async () => {
    if (!quizForm.title.trim()) {
      setError('Quiz title is required');
      return;
    }

    if (quizForm.questions.length === 0) {
      setError('Select at least one question');
      return;
    }

    try {
      setLoading(true);
      const result = await builderAPI.createQuiz({
        title: quizForm.title,
        description: quizForm.description,
        category: quizForm.category,
        questions: quizForm.questions,
        timeLimit: quizForm.timeLimit,
        passingScore: quizForm.passingScore
      }, token);

      if (result.error) {
        setError(result.message || 'Failed to create quiz');
      } else {
        setSuccess('Quiz created!');
        resetQuizForm();
        loadQuizzes();
        setMode('list');
      }
    } catch (err) {
      setError('Error creating quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (id) => {
    if (window.confirm('Delete this quiz?')) {
      try {
        await builderAPI.deleteQuiz(id, token);
        setSuccess('Quiz deleted!');
        loadQuizzes();
      } catch (err) {
        setError('Failed to delete quiz');
      }
    }
  };

  const resetQuizForm = () => {
    setQuizForm({
      title: '',
      description: '',
      category: 'Custom',
      questions: [],
      timeLimit: 30,
      passingScore: 70
    });
  };

  // Clear messages
  useEffect(() => {
    if (error) setTimeout(() => setError(''), 5000);
    if (success) setTimeout(() => setSuccess(''), 5000);
  }, [error, success]);

  return (
    <div className="builder-container">
      <div className="builder-header">
        <h1>🛠️ Quiz Builder</h1>
        <p>Create and manage your custom quizzes and questions</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="builder-tabs">
        <button 
          className={`tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('questions');
            setMode('list');
          }}
        >
          📝 Questions ({questions.length})
        </button>
        <button 
          className={`tab ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('quizzes');
            setMode('list');
          }}
        >
          📋 My Quizzes ({quizzes.length})
        </button>
      </div>

      {/* QUESTIONS TAB */}
      {activeTab === 'questions' && (
        <div className="builder-content">
          {mode === 'list' && (
            <>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setMode('createQuestion');
                  resetQuestionForm();
                }}
              >
                + Create New Question
              </button>

              {loading ? (
                <p>Loading questions...</p>
              ) : questions.length === 0 ? (
                <p className="empty">No questions yet. Create your first one!</p>
              ) : (
                <div className="question-list">
                  {questions.map(q => (
                    <div key={q._id} className="question-card">
                      <div className="question-header">
                        <h3>{q.question}</h3>
                        <span className={`difficulty ${q.difficulty}`}>{q.difficulty}</span>
                      </div>
                      <p className="category">{q.category}</p>
                      <p className="options-count">{q.options.length} options</p>
                      <div className="question-actions">
                        <button 
                          className="btn btn-small btn-secondary"
                          onClick={() => handleEditQuestion(q)}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-small btn-danger"
                          onClick={() => handleDeleteQuestion(q._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {mode === 'createQuestion' && (
            <div className="question-form">
              <h2>{editingQuestionId ? 'Edit Question' : 'Create New Question'}</h2>
              
              <div className="form-group">
                <label>Question *</label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  placeholder="Enter your question"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={questionForm.category}
                    onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Difficulty *</label>
                  <select
                    value={questionForm.difficulty}
                    onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value })}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Explanation *</label>
                <textarea
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  placeholder="Explain the answer"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Options * (at least 2, mark correct answer)</label>
                {questionForm.options.map((opt, idx) => (
                  <div key={idx} className="option-row">
                    <input
                      type="checkbox"
                      checked={opt.isCorrect}
                      onChange={(e) => handleOptionChange(idx, 'isCorrect', e.target.checked)}
                      title="Mark as correct answer"
                    />
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleOptionChange(idx, 'text', e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                    />
                    {questionForm.options.length > 2 && (
                      <button
                        type="button"
                        className="btn btn-small btn-danger"
                        onClick={() => handleRemoveOption(idx)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-small btn-secondary"
                  onClick={handleAddOption}
                >
                  + Add Option
                </button>
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveQuestion}
                  disabled={loading}
                >
                  {editingQuestionId ? 'Update Question' : 'Create Question'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setMode('list');
                    resetQuestionForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* QUIZZES TAB */}
      {activeTab === 'quizzes' && (
        <div className="builder-content">
          {mode === 'list' && (
            <>
              <button 
                className="btn btn-primary"
                disabled={questions.length === 0}
                onClick={() => {
                  setMode('createQuiz');
                  resetQuizForm();
                }}
              >
                + Create New Quiz
              </button>
              {questions.length === 0 && (
                <p className="info">Create at least one question first!</p>
              )}

              {loading ? (
                <p>Loading quizzes...</p>
              ) : quizzes.length === 0 ? (
                <p className="empty">No custom quizzes yet.</p>
              ) : (
                <div className="quiz-list">
                  {quizzes.map(q => (
                    <div key={q._id} className="quiz-card">
                      <div className="quiz-header">
                        <h3>{q.title}</h3>
                        <span className="question-count">{q.questions?.length || 0} questions</span>
                      </div>
                      {q.description && <p className="description">{q.description}</p>}
                      <div className="quiz-meta">
                        <span>⏱️ {q.timeLimit} min</span>
                        <span>✅ {q.passingScore}% to pass</span>
                      </div>
                      <div className="quiz-actions">
                        <button 
                          className="btn btn-small btn-danger"
                          onClick={() => handleDeleteQuiz(q._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {mode === 'createQuiz' && (
            <div className="quiz-form">
              <h2>Create New Quiz</h2>

              <div className="form-group">
                <label>Quiz Title *</label>
                <input
                  type="text"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                  placeholder="Enter quiz title"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={quizForm.description}
                  onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
                  placeholder="Enter quiz description"
                  rows="2"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={quizForm.category}
                    onChange={(e) => setQuizForm({ ...quizForm, category: e.target.value })}
                    placeholder="e.g., Support Process"
                  />
                </div>

                <div className="form-group">
                  <label>Time Limit (minutes)</label>
                  <input
                    type="number"
                    value={quizForm.timeLimit}
                    onChange={(e) => setQuizForm({ ...quizForm, timeLimit: parseInt(e.target.value) })}
                    min="5"
                    max="180"
                  />
                </div>

                <div className="form-group">
                  <label>Passing Score (%)</label>
                  <input
                    type="number"
                    value={quizForm.passingScore}
                    onChange={(e) => setQuizForm({ ...quizForm, passingScore: parseInt(e.target.value) })}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Select Questions * ({quizForm.questions.length} selected)</label>
                <div className="question-selector">
                  {questions.map(q => (
                    <label key={q._id} className="question-checkbox">
                      <input
                        type="checkbox"
                        checked={quizForm.questions.includes(q._id)}
                        onChange={() => handleToggleQuestion(q._id)}
                      />
                      <span className="question-text">
                        {q.question.substring(0, 50)}...
                        <span className="meta">({q.category})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveQuiz}
                  disabled={loading}
                >
                  Create Quiz
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setMode('list');
                    resetQuizForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
