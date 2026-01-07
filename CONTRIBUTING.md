# Contributing to Emirastic ICT Quiz

Thank you for your interest in contributing to Emirastic ICT Quiz! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Question Guidelines](#question-guidelines)

## Code of Conduct

This project is designed for educational purposes in the ICT EFZ apprenticeship program. We expect all contributors to:

- Be respectful and inclusive
- Focus on educational value
- Provide constructive feedback
- Maintain professional communication
- Follow security best practices
- Never commit sensitive information (passwords, keys, tokens)

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report:
1. Check the [troubleshooting guide](docs/DOCUMENTATION.md#troubleshooting)
2. Search existing issues to avoid duplicates
3. Verify the bug with the latest version

When submitting a bug report, include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, browser)
- Error messages or logs

### Suggesting Features

We welcome feature suggestions that enhance the learning experience:

- **Quiz Features**: New question types, scoring methods, analytics
- **User Experience**: UI/UX improvements, accessibility features
- **Admin Features**: Question management, user analytics, reporting
- **Educational Content**: New modules, updated questions, better explanations

Submit feature requests as GitHub issues with:
- Clear description of the feature
- Use case and benefits
- Mockups or examples (if applicable)

### Contributing Code

Areas where we need help:
- Adding questions for Modules 117 and 431
- Improving quiz explanations
- Enhancing UI/UX
- Adding accessibility features
- Writing tests
- Improving documentation
- Bug fixes

## Development Setup

### Prerequisites

- Node.js v14+
- MongoDB v5.0+
- Git

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/emirastic-ict-quiz.git
   cd emirastic-ict-quiz
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/emirastic/emirastic-ict-quiz.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Configure environment**
   ```bash
   # Backend: Copy and configure .env
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   
   # Frontend: Copy and configure .env
   cd ../frontend
   cp .env.example .env
   # Edit .env with your settings
   ```

6. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

7. **Start development servers**
   ```bash
   # Backend
   cd backend
   npm run dev
   
   # Frontend (in new terminal)
   cd frontend
   npm start
   ```

## Coding Standards

### General Principles

- Write clear, self-documenting code
- Follow existing code style
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### JavaScript/React Standards

**Naming Conventions:**
- Components: PascalCase (`QuizCard.js`)
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: Match component name or use kebab-case

**React Best Practices:**
```javascript
// Use functional components with hooks
const QuizCard = ({ quiz, onStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Event handlers prefixed with "handle"
  const handleStartQuiz = () => {
    setIsLoading(true);
    onStart(quiz.id);
  };
  
  return (
    <div className="quiz-card">
      {/* Component JSX */}
    </div>
  );
};

// PropTypes or TypeScript for type checking
QuizCard.propTypes = {
  quiz: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired
};
```

**Backend Best Practices:**
```javascript
// Use async/await instead of callbacks
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Use middleware for authentication
router.get('/protected', authMiddleware, async (req, res) => {
  // Handler code
});
```

### CSS Standards

- Use BEM methodology or consistent naming
- Mobile-first responsive design
- Avoid !important unless absolutely necessary
- Group related properties
- Use CSS variables for theme colors

```css
/* Component-specific CSS */
.quiz-card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  /* Visual */
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.quiz-card__title {
  font-size: 1.25rem;
  color: var(--primary-color);
}
```

## Submitting Changes

### Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow coding standards
   - Test your changes thoroughly
   - **Never commit sensitive information** (`.env` files, passwords, secrets)

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add quiz timer feature"
   ```

   **Commit Message Format:**
   ```
   type: brief description
   
   Optional longer description
   ```
   
   **Types:**
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting)
   - `refactor`: Code refactoring
   - `test`: Adding tests
   - `chore`: Maintenance tasks

4. **Pull latest changes**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub and create a PR
   - Provide clear description
   - Reference any related issues
   - Wait for review

### Pull Request Guidelines

**Good PR Title:**
```
feat: Add quiz timer with pause functionality
```

**PR Description Template:**
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Changes Made
- Added timer component
- Implemented pause/resume functionality
- Updated quiz page to use timer

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] Added new tests (if applicable)

## Screenshots
(if applicable)

## Related Issues
Closes #123
```

## Question Guidelines

When adding or modifying quiz questions:

### Question Quality Standards

1. **Alignment with Learning Objectives**
   - Questions must align with official ICT module objectives
   - Reference specific Handlungsziele when applicable
   - Ensure educational value

2. **Question Structure**
   ```javascript
   {
     questionText: "Clear, specific question in German",
     category: "Module 117" | "Module 431" | "Module 437",
     difficulty: "beginner" | "intermediate" | "advanced",
     options: [
       "Correct answer (plausible)",
       "Wrong answer 1 (plausible distractor)",
       "Wrong answer 2 (plausible distractor)",
       "Wrong answer 3 (plausible distractor)"
     ],
     correctAnswer: 0, // Index of correct answer
     explanation: "Detailed explanation of why the answer is correct"
   }
   ```

3. **Writing Guidelines**
   - Use clear, professional German
   - Avoid ambiguous wording
   - Make all options plausible
   - Ensure one clearly correct answer
   - Provide educational explanations

4. **Difficulty Levels**
   - **Beginner**: Basic concepts, definitions, simple scenarios
   - **Intermediate**: Application of concepts, multi-step thinking
   - **Advanced**: Complex scenarios, analysis, best practices

### Example of Good Question

```javascript
{
  questionText: "Ein Kunde meldet, dass er keine E-Mails mehr empfangen kann. Welcher ist der beste erste Schritt im Troubleshooting-Prozess?",
  category: "Module 437",
  difficulty: "intermediate",
  options: [
    "Die grundlegende Konnektivität und die E-Mail-Server-Einstellungen überprüfen",
    "Sofort das E-Mail-Passwort zurücksetzen",
    "Den Computer neu starten",
    "Eine neue E-Mail-Adresse einrichten"
  ],
  correctAnswer: 0,
  explanation: "Der systematische Troubleshooting-Ansatz beginnt mit der Überprüfung der grundlegenden Konnektivität. Bevor man drastischere Maßnahmen ergreift, sollte man prüfen, ob die Server-Einstellungen korrekt sind und ob eine Verbindung zum E-Mail-Server besteht."
}
```

### Question Review Checklist

Before submitting questions:
- [ ] Question is clear and unambiguous
- [ ] All options are plausible
- [ ] Correct answer is definitively correct
- [ ] Wrong answers are clearly wrong
- [ ] Explanation is educational
- [ ] German language is correct
- [ ] Difficulty level is appropriate
- [ ] Aligns with module objectives

## Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

**Backend Example:**
```javascript
describe('Quiz API', () => {
  it('should return all quizzes', async () => {
    const res = await request(app).get('/api/quizzes');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
```

**Frontend Example:**
```javascript
describe('QuizCard Component', () => {
  it('renders quiz title', () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText(mockQuiz.title)).toBeInTheDocument();
  });
});
```

## Documentation

When adding features, update relevant documentation:

- **README.md**: For major features or setup changes
- **docs/DOCUMENTATION.md**: For technical details
- **docs/API.md**: For API changes
- **Code comments**: For complex logic
- **JSDoc**: For function documentation

## Getting Help

- Check [documentation](docs/INDEX.md)
- Search existing issues
- Join discussions
- Ask questions in issues

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project acknowledgments

Thank you for contributing to Emirastic ICT Quiz! 🎉
