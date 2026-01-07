# Module 437 Quiz Application

A comprehensive fullstack quiz application for ICT EFZ Apprenticeships Module 437 - "Working in Support" (Im Support arbeiten).

## Project Overview

This application helps learners test their knowledge of support processes, communication skills, ticketing systems, incident management, and troubleshooting techniques based on Module 437 learning objectives.

**Module 437 Focus Areas:**
- Support Process Management
- Communication & Customer Service
- Ticketing & Documentation
- Support Levels (1st, 2nd, 3rd Level)
- Incident & Problem Management
- Troubleshooting Methodology
- Remote Support Techniques

## Features

### Core Features
- **User Authentication**: Registration and login with secure password hashing
- **Quiz Management**: Multiple quizzes organized by topic
- **Interactive Quiz Interface**: Real-time quiz with timer, progress tracking, and navigation
- **Score Tracking**: Detailed result history and statistics
- **Responsive Design**: Mobile-friendly interface

### Quiz Features
- Multiple choice questions with explanations
- Time-limited quizzes
- Passing score requirements
- Progress tracking during quiz
- Question navigation
- Results analysis with detailed feedback

### User Dashboard
- Overview of progress statistics
- Available quizzes
- Quiz history with scores
- Performance analytics

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **Mongoose** for database modeling
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React 18** for UI
- **React Router** for navigation
- **CSS3** for styling
- **Fetch API** for HTTP requests

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your MongoDB connection in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/module437-quiz
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

5. Seed the database with questions:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
module437-quiz/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Quiz.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── questions.js
│   │   ├── quizzes.js
│   │   └── results.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Quiz.js
│   │   │   ├── Results.js
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Quiz.css
│   │   │   └── Results.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.example
└── README.md
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Quiz Endpoints
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get specific quiz with questions

### Questions Endpoints
- `GET /api/questions` - Get questions with optional filters
- `GET /api/questions/categories/list` - Get available categories

### Results Endpoints
- `POST /api/results/submit` - Submit quiz answers
- `GET /api/results/user/history` - Get user's quiz history
- `GET /api/results/user/stats` - Get user statistics

## Available Quizzes

1. **Support Process Fundamentals** (15 min)
   - Support levels and structure
   - Support process management
   - Escalation criteria

2. **Communication Skills in Support** (15 min)
   - Customer communication techniques
   - Emotional intelligence
   - Active listening
   - Conflict resolution

3. **Ticketing & Support Levels** (20 min)
   - Ticket management
   - Documentation standards
   - Support level responsibilities
   - Escalation procedures

4. **Incident Management & Troubleshooting** (20 min)
   - Incident vs. Problem definitions
   - Systematic troubleshooting
   - Root cause analysis
   - Service requests

5. **Customer Service Excellence** (15 min)
   - Professional conduct
   - On-site support skills
   - Remote support advantages
   - Knowledge base management

6. **Module 437 Comprehensive Exam** (60 min)
   - Complete test covering all topics
   - Passing score: 75%
   - Comprehensive knowledge assessment

## Usage Guide

### For Students
1. Register for an account
2. Log in to the dashboard
3. Browse available quizzes
4. Start a quiz and answer all questions
5. Submit your answers
6. View detailed results and explanations
7. Access your quiz history and statistics

### For Instructors (Future Enhancement)
- Create and manage quizzes
- Upload custom questions
- View student performance analytics
- Generate reports
- Manage learning categories

## Quiz Content

All quiz questions are based on Module 437 learning objectives:
- **Handlungsziel 1**: Understanding support processes and roles
- **Handlungsziel 2**: 1st Level Support skills (ticket handling, communication, de-escalation)
- **Handlungsziel 3**: 2nd Level Support skills (analysis, problem-solving, documentation)
- **Handlungsziel 4**: 3rd Level Support preparation
- **Handlungsziel 5**: Systematic troubleshooting
- **Handlungsziel 6**: Solution documentation and communication

## Features Detail

### Quiz Features
- **Time Management**: Quizzes with configurable time limits
- **Progress Tracking**: Visual progress bar and question counter
- **Quick Navigation**: Jump to any question using the navigator
- **Answer Validation**: Clear feedback on correct/incorrect answers
- **Detailed Explanations**: Learn from every question

### Result Analysis
- **Score Display**: Points earned and percentage
- **Pass/Fail Status**: Visual indicator of passing status
- **Performance Metrics**: Average scores, pass rates
- **History Tracking**: All previous quiz attempts

## Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
- Deploy to a Node.js hosting platform (Heroku, AWS, Azure, etc.)
- Set environment variables on the hosting platform

## Security Considerations

- Passwords are hashed with bcryptjs before storage
- JWT tokens secure API endpoints
- CORS configured for frontend-backend communication
- Input validation on all endpoints
- SQL injection protection through MongoDB/Mongoose

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or connection string is correct
- Check `.env` file for correct `MONGODB_URI`
- Verify network connectivity for MongoDB Atlas

### Quiz Not Loading
- Clear browser cache
- Check browser console for errors
- Verify backend is running on correct port
- Check `.env` file for API URL configuration

### Authentication Issues
- Clear localStorage to remove old tokens
- Verify JWT_SECRET is consistent between sessions
- Check user credentials during login

## Future Enhancements

- Admin panel for question management
- Progress reports for instructors
- Leaderboards and gamification
- Question categories filtering
- Practice mode vs. exam mode
- PDF export of results
- Email notifications
- Certificate generation
- Video explanations for answers
- Accessibility improvements (WCAG compliance)

## Contributing

This project is designed for ICT EFZ apprenticeship training. To contribute:
1. Ensure questions align with Module 437 objectives
2. Provide explanations for all correct answers
3. Test across different difficulty levels
4. Maintain consistent code style

## License

This project is created for educational purposes in the ICT EFZ apprenticeship program.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console for error messages
4. Contact your instructor

## Resources

### Module 437 Official Resources
- [Modulbaukasten - Module 437](https://www.modulbaukasten.ch/module/437/1/de-DE)
- [ICT-Berufsbildung Schweiz](https://www.ict-berufsbildung.ch/)

### Technology Documentation
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Documentation](https://jwt.io/)

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Created for**: ICT EFZ Apprenticeship Program
