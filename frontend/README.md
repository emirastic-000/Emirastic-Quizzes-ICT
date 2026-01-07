# Frontend React Application

## Overview
React-based user interface for the Module 437 Quiz Application

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Application runs on: `http://localhost:3000`

## Project Structure

### Components
- **Navbar.js**: Navigation bar with user info and logout button

### Pages
- **Login.js**: User login page
- **Register.js**: User registration page
- **Dashboard.js**: Main dashboard with quizzes and statistics
- **Quiz.js**: Interactive quiz interface
- **Results.js**: Quiz results history and analysis

### Context
- **AuthContext.js**: Global authentication state management

### API
- **api.js**: API client functions for backend communication

## Features

### Authentication Flow
1. Users register with first name, last name, email, and password
2. Passwords are securely sent to backend for hashing
3. JWT token received on successful registration/login
4. Token stored in localStorage for persistence
5. Token sent with all protected API requests

### Quiz Features
- **Quiz Selection**: Browse available quizzes on dashboard
- **Quiz Start**: Review quiz details before starting
- **Interactive Quiz**: Answer questions with real-time timer
- **Question Navigation**: Jump to any question using navigator
- **Progress Tracking**: Visual progress bar and question counter
- **Time Limit**: Countdown timer with warning when time is low
- **Answer Tracking**: Quick visual indication of answered questions
- **Results**: Detailed results with score and percentage

### User Dashboard
- **Statistics**: View overall performance metrics
  - Total quizzes completed
  - Quizzes passed/failed
  - Average score
  - Pass rate percentage
- **Available Quizzes**: Browse and start new quizzes
- **Quiz Cards**: Show question count and time limit

### Results Page
- **Results History**: View all past quiz attempts
- **Result Details**: For each quiz:
  - Quiz title and status (passed/failed)
  - Score and percentage
  - Time taken
  - Completion date
- **Visual Indicators**: Progress bars and color coding

## Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Component Details

### AuthContext
Manages global authentication state:
- `user`: Current logged-in user
- `token`: JWT token for API requests
- `loading`: Loading state
- `register()`: Register new user
- `login()`: Login user
- `logout()`: Logout user

Usage:
```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, token, logout } = useAuth();
  // Use authentication data
}
```

### API Functions

#### Auth API
- `authAPI.register(userData)` - Register user
- `authAPI.login(credentials)` - Login user
- `authAPI.getCurrentUser(token)` - Get current user

#### Quiz API
- `quizAPI.getAllQuizzes()` - Get all quizzes
- `quizAPI.getQuiz(id)` - Get specific quiz with questions

#### Questions API
- `questionsAPI.getAllQuestions(filters)` - Get questions
- `questionsAPI.getCategories()` - Get question categories

#### Results API
- `resultsAPI.submitQuiz(data, token)` - Submit quiz answers
- `resultsAPI.getUserResults(token)` - Get user's quiz history
- `resultsAPI.getUserStats(token)` - Get user statistics

## Quiz Interface

### Quiz Start Screen
- Quiz title and description
- Number of questions
- Time limit
- Passing score
- Start button

### Quiz Interaction
- Question display with number and category
- Multiple choice options
- Selected option highlighting
- Previous/Next buttons
- Question navigator grid
- Time display with warning state
- Quick statistics (answered count)

### Results Display
- Score and percentage
- Pass/Fail status
- Time taken
- Detailed answer review

## Styling

All components use CSS3 with:
- Linear gradients for modern look
- Responsive grid layouts
- Smooth transitions and animations
- Accessible color contrasts
- Mobile-first responsive design

### Color Scheme
- Primary: #667eea (purple)
- Secondary: #764ba2 (darker purple)
- Success: #28a745 (green)
- Error: #dc3545 (red)
- Background: #f5f7fa (light gray)

### Responsive Breakpoints
- Large screens: Full multi-column layouts
- Medium screens (768px): Adjusted grid columns
- Small screens: Single column layouts

## State Management

### Local State
- Quiz progress and answers
- Form inputs
- Loading and error states

### Global State (AuthContext)
- User authentication
- JWT token
- User profile information

### Component Communication
- Props passing for data
- Context for global state
- Callback functions for events

## Protected Routes

Routes that require authentication:
- `/dashboard` - Main dashboard
- `/quiz/:quizId` - Quiz interface
- `/results` - Results history

Routes without authentication:
- `/login` - Login page
- `/register` - Registration page
- `/` - Redirects to dashboard or login

## Error Handling

- API errors displayed in user-friendly messages
- Form validation for input fields
- Loading states during API calls
- Fallback content for failed data loads

## Performance Considerations

- Single Page Application (SPA)
- Efficient re-renders with React
- CSS minification in production
- Image optimization (if added)
- Lazy loading (future enhancement)

## Accessibility

- Semantic HTML elements
- ARIA labels for form inputs
- Keyboard navigation support
- Color contrast compliance
- Alt text for images (if added)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tools

```bash
# Start development server with hot reload
npm start

# Run tests
npm test

# Build for production
npm run build

# Analyze bundle size
npm install --save-dev source-map-explorer
npm run analyze
```

## Common Issues

### API Connection Error
- Check backend is running on port 5000
- Verify REACT_APP_API_URL in .env
- Clear browser cache

### Quiz Not Loading
- Verify backend database has quiz data
- Run seed script on backend: `npm run seed`
- Check browser console for errors

### Login Issues
- Clear localStorage: `localStorage.clear()`
- Verify user credentials
- Check backend is running

## Future Enhancements

- Question explanation modal
- Print results functionality
- Quiz progress saving
- Offline mode support
- Dark mode theme
- Keyboard shortcuts
- PDF export
- Progress notifications
- Category filtering on dashboard
- Quiz search functionality

