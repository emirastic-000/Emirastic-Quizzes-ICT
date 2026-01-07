# Backend API Documentation

## Overview
Node.js/Express API for the Module 437 Quiz Application

## Running the Backend

```bash
# Install dependencies
npm install

# Seed the database with quiz content
npm run seed

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

Server runs on: `http://localhost:5000`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication Routes

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Logged in successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Quiz Routes

#### Get All Quizzes
```
GET /api/quizzes

Response:
[
  {
    "_id": "...",
    "title": "Support Process Fundamentals",
    "description": "Test your knowledge...",
    "category": "Support Process",
    "questions": [...],
    "timeLimit": 15,
    "passingScore": 70
  },
  ...
]
```

#### Get Specific Quiz
```
GET /api/quizzes/:quizId

Response:
{
  "_id": "...",
  "title": "Support Process Fundamentals",
  "description": "Test your knowledge...",
  "category": "Support Process",
  "questions": [
    {
      "_id": "...",
      "question": "What are the three main levels of support?",
      "options": [
        { "text": "1st Level...", "isCorrect": true },
        { "text": "Basic...", "isCorrect": false },
        ...
      ],
      "explanation": "Support levels are...",
      "difficulty": "easy"
    },
    ...
  ],
  "timeLimit": 15,
  "passingScore": 70
}
```

### Questions Routes

#### Get Questions
```
GET /api/questions?category=Communication&difficulty=medium

Response:
[
  {
    "_id": "...",
    "module": "Module 437",
    "category": "Communication",
    "question": "How should a support agent handle an emotionally upset customer?",
    "options": [...],
    "explanation": "...",
    "difficulty": "medium"
  },
  ...
]
```

Query Parameters:
- `category`: Filter by category (e.g., "Communication", "Support Process")
- `difficulty`: Filter by difficulty ("easy", "medium", "hard")

#### Get Question Categories
```
GET /api/questions/categories/list

Response:
[
  "Support Process",
  "Communication",
  "Ticketing & Documentation",
  "Support Levels",
  "Incident Management",
  "Troubleshooting",
  "Customer Service",
  "Remote Support"
]
```

### Results Routes

#### Submit Quiz
```
POST /api/results/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "quizId": "...",
  "answers": [0, 2, 1, 3, 0, ...],  // Index of selected option for each question
  "timeTaken": 450  // Time in seconds
}

Response:
{
  "message": "Quiz submitted successfully",
  "result": {
    "score": 18,
    "totalQuestions": 20,
    "percentage": "90.00",
    "passed": true,
    "timeTaken": 450
  }
}
```

#### Get User Results History
```
GET /api/results/user/history
Authorization: Bearer <token>

Response:
[
  {
    "_id": "...",
    "userId": "...",
    "quizId": {
      "_id": "...",
      "title": "Support Process Fundamentals",
      "category": "Support Process"
    },
    "score": 18,
    "totalQuestions": 20,
    "percentage": 90,
    "passed": true,
    "timeTaken": 450,
    "completedAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

#### Get User Statistics
```
GET /api/results/user/stats
Authorization: Bearer <token>

Response:
{
  "totalQuizzes": 5,
  "passedQuizzes": 4,
  "failedQuizzes": 1,
  "averageScore": "85.20",
  "passRate": "80.00"
}
```

## Database Models

### User
```
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

### Question
```
{
  module: String (default: "Module 437"),
  category: String (enum: [...], required),
  question: String (required),
  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],
  explanation: String (required),
  difficulty: String (enum: ["easy", "medium", "hard"], default: "medium"),
  createdAt: Date (default: now)
}
```

### Quiz
```
{
  title: String (required),
  description: String,
  category: String,
  questions: [ObjectId] (ref: "Question"),
  timeLimit: Number (in minutes),
  passingScore: Number (default: 70),
  createdAt: Date (default: now)
}
```

### Result
```
{
  userId: ObjectId (ref: "User", required),
  quizId: ObjectId (ref: "Quiz", required),
  answers: [
    {
      questionId: ObjectId,
      selectedOption: Number,
      isCorrect: Boolean
    }
  ],
  score: Number (required),
  totalQuestions: Number (required),
  percentage: Number (required),
  passed: Boolean,
  timeTaken: Number (in seconds),
  completedAt: Date (default: now)
}
```

## Error Handling

All errors return appropriate HTTP status codes:

- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

Error Response Format:
```json
{
  "message": "Error description",
  "error": "Additional error details"
}
```

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/module437-quiz
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

## Database Seeding

Run the seed script to populate the database with Module 437 questions and quizzes:

```bash
npm run seed
```

This creates:
- 20 quiz questions organized by category
- 6 pre-configured quizzes covering different topics
- 1 comprehensive exam

## Deployment Notes

For production deployment:
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET` (generate a random string)
3. Configure MongoDB Atlas or managed database service
4. Set up HTTPS
5. Enable CORS properly for your frontend domain
6. Use environment variable management (not .env files)

