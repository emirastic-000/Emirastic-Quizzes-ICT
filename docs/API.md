# API Documentation

Complete API reference for the Emirastic ICT Quiz backend.

## Base URL

```
http://localhost:5000/api
```

For network access, replace `localhost` with your server IP address.

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Authentication Endpoints

### Register User

**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, invalid email)
- `409` - Email already registered

---

### Login User

**POST** `/api/auth/login`

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400` - Missing credentials
- `401` - Invalid credentials

---

### Get Current User

**GET** `/api/auth/me`

Get currently authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - No token provided or invalid token

---

## Quiz Endpoints

### Get All Quizzes

**GET** `/api/quizzes`

Get list of all available quizzes.

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Support Process Fundamentals",
    "category": "Module 437",
    "difficulty": "beginner",
    "timeLimit": 15,
    "passingScore": 70,
    "description": "Understanding support processes and roles",
    "questionCount": 10
  }
]
```

---

### Get Quiz by ID

**GET** `/api/quizzes/:id`

Get detailed quiz information including questions.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Support Process Fundamentals",
  "category": "Module 437",
  "difficulty": "beginner",
  "timeLimit": 15,
  "passingScore": 70,
  "description": "Understanding support processes and roles",
  "questions": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "questionText": "Was ist der Hauptzweck eines Support-Level-Systems?",
      "options": [
        "Effiziente Verteilung und Bearbeitung von Support-Anfragen",
        "Kosteneinsparung durch Automatisierung",
        "Reduzierung der Anzahl von Supportmitarbeitern",
        "Beschleunigung der Ticket-Bearbeitung"
      ],
      "correctAnswer": 0
    }
  ]
}
```

**Error Responses:**
- `404` - Quiz not found

---

## Question Endpoints

### Get Questions

**GET** `/api/questions`

Get questions with optional filters.

**Query Parameters:**
- `category` - Filter by category
- `difficulty` - Filter by difficulty (beginner, intermediate, advanced)
- `limit` - Number of questions to return
- `random` - Get random questions (true/false)

**Example:**
```
GET /api/questions?category=Module%20437&difficulty=beginner&limit=10&random=true
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "questionText": "Was ist der Hauptzweck eines Support-Level-Systems?",
    "category": "Module 437",
    "difficulty": "beginner",
    "options": [
      "Effiziente Verteilung und Bearbeitung von Support-Anfragen",
      "Kosteneinsparung durch Automatisierung",
      "Reduzierung der Anzahl von Supportmitarbeitern",
      "Beschleunigung der Ticket-Bearbeitung"
    ],
    "correctAnswer": 0,
    "explanation": "Support-Level-Systeme organisieren Support-Anfragen nach Komplexität..."
  }
]
```

---

### Get Available Categories

**GET** `/api/questions/categories/list`

Get list of all question categories.

**Response (200):**
```json
[
  "Module 117",
  "Module 431",
  "Module 437"
]
```

---

## Result Endpoints

### Submit Quiz Results

**POST** `/api/results/submit`

Submit quiz answers and get score.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "quizId": "507f1f77bcf86cd799439011",
  "answers": [0, 2, 1, 3, 0],
  "timeSpent": 720
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "user": "507f1f77bcf86cd799439011",
  "quiz": "507f1f77bcf86cd799439011",
  "score": 80,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "timeSpent": 720,
  "passed": true,
  "answers": [0, 2, 1, 3, 0],
  "completedAt": "2026-01-07T10:30:00.000Z"
}
```

**Error Responses:**
- `400` - Invalid request (missing quizId or answers)
- `401` - Not authenticated
- `404` - Quiz not found

---

### Get User Quiz History

**GET** `/api/results/user/history`

Get all quiz attempts for the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` - Number of results to return (default: 20)
- `sort` - Sort field (default: -completedAt)

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "quiz": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Support Process Fundamentals",
      "category": "Module 437"
    },
    "score": 80,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "timeSpent": 720,
    "passed": true,
    "completedAt": "2026-01-07T10:30:00.000Z"
  }
]
```

---

### Get User Statistics

**GET** `/api/results/user/stats`

Get aggregated statistics for the current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalQuizzes": 15,
  "totalPassed": 12,
  "totalFailed": 3,
  "averageScore": 78.5,
  "totalTimeSpent": 10800,
  "quizzesByCategory": {
    "Module 437": 10,
    "Module 117": 3,
    "Module 431": 2
  },
  "recentActivity": [
    {
      "date": "2026-01-07",
      "quizzesTaken": 3,
      "averageScore": 85
    }
  ]
}
```

---

## Admin Endpoints

### Get All Users (Admin Only)

**GET** `/api/admin/users`

Get list of all users (requires admin role).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "lastLogin": "2026-01-07T10:00:00.000Z"
  }
]
```

**Error Responses:**
- `401` - Not authenticated
- `403` - Not authorized (not admin)

---

### Create Quiz (Admin Only)

**POST** `/api/admin/quizzes`

Create a new quiz.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Quiz Title",
  "category": "Module 437",
  "difficulty": "intermediate",
  "timeLimit": 20,
  "passingScore": 75,
  "description": "Quiz description",
  "questions": [
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ]
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "New Quiz Title",
  "category": "Module 437",
  "difficulty": "intermediate",
  "timeLimit": 20,
  "passingScore": 75,
  "description": "Quiz description",
  "questions": [...]
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created (successful POST)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (authenticated but not authorized)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `500` - Internal Server Error

## Rate Limiting

Currently, there is no rate limiting implemented. For production deployment, consider implementing rate limiting to prevent abuse.

## CORS

CORS is configured to accept requests from the frontend origin. For production, update the CORS configuration in `backend/server.js`.

## WebSocket Support

WebSocket support is not currently implemented but could be added for real-time features like:
- Live quiz competitions
- Real-time leaderboards
- Admin notifications

## Pagination

Endpoints that return lists support pagination through query parameters:

```
GET /api/results/user/history?page=1&limit=10
```

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  lastLogin: Date
}
```

### Quiz Model
```javascript
{
  title: String,
  category: String,
  difficulty: String (enum: ['beginner', 'intermediate', 'advanced']),
  timeLimit: Number (minutes),
  passingScore: Number (percentage),
  description: String,
  questions: [ObjectId] (references Question)
}
```

### Question Model
```javascript
{
  questionText: String,
  category: String,
  difficulty: String,
  options: [String],
  correctAnswer: Number (index),
  explanation: String
}
```

### Result Model
```javascript
{
  user: ObjectId (references User),
  quiz: ObjectId (references Quiz),
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  timeSpent: Number (seconds),
  passed: Boolean,
  answers: [Number],
  completedAt: Date
}
```

## Examples

### Complete Quiz Flow

1. **Register/Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

2. **Get Available Quizzes:**
```bash
curl -X GET http://localhost:5000/api/quizzes
```

3. **Start Quiz (get questions):**
```bash
curl -X GET http://localhost:5000/api/quizzes/507f1f77bcf86cd799439011
```

4. **Submit Answers:**
```bash
curl -X POST http://localhost:5000/api/results/submit \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"quizId":"507f1f77bcf86cd799439011","answers":[0,2,1,3,0],"timeSpent":720}'
```

5. **View Results History:**
```bash
curl -X GET http://localhost:5000/api/results/user/history \
  -H "Authorization: Bearer <token>"
```
