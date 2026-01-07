const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

const quizQuestions = [
  {
    category: 'Support Process',
    question: 'What are the three main levels of support in a typical support structure?',
    options: [
      { text: '1st Level (Front-line), 2nd Level (Technical), 3rd Level (Expert)', isCorrect: true },
      { text: 'Basic, Medium, Advanced', isCorrect: false },
      { text: 'Phone, Email, Chat', isCorrect: false },
      { text: 'Department A, B, C', isCorrect: false }
    ],
    explanation: 'Support levels are typically structured as: 1st Level handles initial customer contact, 2nd Level handles escalated technical issues, and 3rd Level handles specialized or complex problems.',
    difficulty: 'easy'
  },
  {
    category: 'Support Process',
    question: 'What is the primary responsibility of 1st Level Support?',
    options: [
      { text: 'To resolve customer issues directly or escalate them appropriately', isCorrect: true },
      { text: 'To develop new software features', isCorrect: false },
      { text: 'To manage the company finances', isCorrect: false },
      { text: 'To create marketing campaigns', isCorrect: false }
    ],
    explanation: '1st Level Support is the first point of contact for customers. Their primary role is to collect information about the issue and either resolve it or escalate it to the appropriate level.',
    difficulty: 'easy'
  },
  {
    category: 'Ticketing & Documentation',
    question: 'What is a support ticket?',
    options: [
      { text: 'A record that contains all information about a customer request or issue', isCorrect: true },
      { text: 'A payment receipt for services', isCorrect: false },
      { text: 'A permission document', isCorrect: false },
      { text: 'A scheduled appointment', isCorrect: false }
    ],
    explanation: 'A support ticket is a formal record that documents a customer issue, including the problem description, status, assigned technician, and resolution steps. It ensures nothing is forgotten and provides a history.',
    difficulty: 'easy'
  },
  {
    category: 'Communication',
    question: 'Which communication model describes verbal and non-verbal communication aspects?',
    options: [
      { text: 'The Schulz von Thun Four-Ears Model (Sachebene and Beziehungsebene)', isCorrect: true },
      { text: 'The Three-Level Model', isCorrect: false },
      { text: 'The Basic Communicati Model', isCorrect: false },
      { text: 'The Support Flow Model', isCorrect: false }
    ],
    explanation: 'The Schulz von Thun model explains that communication happens on multiple levels: the content level (Sachebene) and the relationship level (Beziehungsebene), plus emotional and appeal levels.',
    difficulty: 'medium'
  },
  {
    category: 'Communication',
    question: 'How should a support agent handle an emotionally upset customer?',
    options: [
      { text: 'Listen empathetically, acknowledge their frustration, and guide them back to discussing the technical issue', isCorrect: true },
      { text: 'Immediately disconnect the call', isCorrect: false },
      { text: 'Argue with the customer', isCorrect: false },
      { text: 'Ignore the emotional aspect and focus only on technical solutions', isCorrect: false }
    ],
    explanation: 'Professional support requires emotional intelligence. Acknowledging customer frustration and showing empathy helps de-escalate situations and leads to better outcomes.',
    difficulty: 'medium'
  },
  {
    category: 'Communication',
    question: 'What is the primary purpose of asking open-ended questions in support interactions?',
    options: [
      { text: 'To gather detailed information about the problem and understand it fully', isCorrect: true },
      { text: 'To confuse the customer', isCorrect: false },
      { text: 'To waste time', isCorrect: false },
      { text: 'To demonstrate knowledge', isCorrect: false }
    ],
    explanation: 'Open-ended questions like "Can you describe what happened?" encourage customers to provide detailed information, which is essential for proper problem diagnosis and resolution.',
    difficulty: 'medium'
  },
  {
    category: 'Support Levels',
    question: 'When should a ticket be escalated from 1st to 2nd Level Support?',
    options: [
      { text: 'When the issue requires technical expertise beyond 1st Level capability or when standard troubleshooting fails', isCorrect: true },
      { text: 'When the customer is angry', isCorrect: false },
      { text: 'When it is a holiday', isCorrect: false },
      { text: 'When the ticket is old', isCorrect: false }
    ],
    explanation: 'Escalation criteria include: complexity of the issue, technical knowledge required, failed standard troubleshooting steps, and specific escalation triggers defined by the organization.',
    difficulty: 'medium'
  },
  {
    category: 'Support Levels',
    question: 'What is the role of 2nd Level Support?',
    options: [
      { text: 'To provide advanced technical expertise and handle issues escalated from 1st Level', isCorrect: true },
      { text: 'To manage the company billing', isCorrect: false },
      { text: 'To create user documentation', isCorrect: false },
      { text: 'To manage customer accounts directly', isCorrect: false }
    ],
    explanation: '2nd Level Support specialists have deeper technical knowledge and can diagnose and resolve complex issues that 1st Level cannot handle. They may also provide feedback to improve processes.',
    difficulty: 'medium'
  },
  {
    category: 'Incident Management',
    question: 'What is the difference between an Incident and a Problem in ITIL terminology?',
    options: [
      { text: 'An Incident is an unplanned interruption; a Problem is the underlying cause', isCorrect: true },
      { text: 'They are the same thing', isCorrect: false },
      { text: 'An Incident is planned; a Problem is unplanned', isCorrect: false },
      { text: 'There is no difference', isCorrect: false }
    ],
    explanation: 'In ITIL: An Incident is an unplanned event (e.g., user cannot access email). A Problem is the underlying cause that may result in multiple incidents (e.g., mail server failure).',
    difficulty: 'hard'
  },
  {
    category: 'Incident Management',
    question: 'What is a Service Request in the context of support?',
    options: [
      { text: 'A request from a user for a service or information that does not involve an incident', isCorrect: true },
      { text: 'A complaint about service quality', isCorrect: false },
      { text: 'A payment request', isCorrect: false },
      { text: 'A system backup request', isCorrect: false }
    ],
    explanation: 'Service Requests are routine requests for information, access, or services (e.g., password reset, software access) and are handled differently from incidents.',
    difficulty: 'medium'
  },
  {
    category: 'Troubleshooting',
    question: 'What is a systematic approach to troubleshooting?',
    options: [
      { text: 'Gather information, hypothesize, test, implement, verify, and document', isCorrect: true },
      { text: 'Try random solutions until one works', isCorrect: false },
      { text: 'Immediately reinstall the system', isCorrect: false },
      { text: 'Ask the customer to restart and call back', isCorrect: false }
    ],
    explanation: 'Systematic troubleshooting: 1) Gather complete info 2) Analyze symptoms 3) Hypothesize causes 4) Test solutions 5) Implement fix 6) Verify resolution 7) Document everything.',
    difficulty: 'hard'
  },
  {
    category: 'Troubleshooting',
    question: 'What is the first step when troubleshooting a user issue?',
    options: [
      { text: 'Ask detailed questions to gather complete information about the problem', isCorrect: true },
      { text: 'Immediately restart the user\'s computer', isCorrect: false },
      { text: 'Blame the user for not following procedures', isCorrect: false },
      { text: 'Transfer to a different department', isCorrect: false }
    ],
    explanation: 'Gathering detailed information is crucial. Ask: When did it start? What were you doing? What error messages appeared? This helps narrow down the cause quickly.',
    difficulty: 'easy'
  },
  {
    category: 'Customer Service',
    question: 'What is the importance of complete documentation in a support case?',
    options: [
      { text: 'It provides a history for future reference and helps other technicians assist the customer', isCorrect: true },
      { text: 'It is only for legal purposes', isCorrect: false },
      { text: 'It takes too much time and should be minimized', isCorrect: false },
      { text: 'It is only needed for billing', isCorrect: false }
    ],
    explanation: 'Documentation is essential for continuity of service, quality assurance, knowledge management, and helps other team members if the customer contacts support again.',
    difficulty: 'easy'
  },
  {
    category: 'Customer Service',
    question: 'What is the impact of professional appearance and demeanor when visiting a customer on-site?',
    options: [
      { text: 'It builds customer trust and positively influences the outcome of the support interaction', isCorrect: true },
      { text: 'It has no impact on the technical outcome', isCorrect: false },
      { text: 'It only matters for first impressions', isCorrect: false },
      { text: 'It is irrelevant in IT support', isCorrect: false }
    ],
    explanation: 'Professional appearance, punctuality, and demeanor significantly impact customer perception and trust. This builds long-term relationships and can improve resolution rates.',
    difficulty: 'medium'
  },
  {
    category: 'Remote Support',
    question: 'What are advantages of remote support compared to on-site support?',
    options: [
      { text: 'Faster response time, reduced travel costs, and ability to handle multiple issues simultaneously', isCorrect: true },
      { text: 'It cannot see the customer\'s environment clearly', isCorrect: false },
      { text: 'It is always more expensive', isCorrect: false },
      { text: 'It is only suitable for simple issues', isCorrect: false }
    ],
    explanation: 'Remote support advantages: instant response, no travel time/cost, can screen-share, use remote tools. Disadvantages: cannot physically interact with hardware, internet dependency.',
    difficulty: 'medium'
  },
  {
    category: 'Support Process',
    question: 'What should be included in a knowledge base or FAQ?',
    options: [
      { text: 'Common issues, solutions, troubleshooting steps, and how to access support', isCorrect: true },
      { text: 'Only marketing information', isCorrect: false },
      { text: 'Employee personal information', isCorrect: false },
      { text: 'Random technical trivia', isCorrect: false }
    ],
    explanation: 'A good knowledge base includes: frequently asked questions, step-by-step solutions, troubleshooting guides, contact information, and self-service options for users.',
    difficulty: 'easy'
  },
  {
    category: 'Support Process',
    question: 'What is the role of escalation criteria in a support organization?',
    options: [
      { text: 'To clearly define when and how issues should be moved to higher support levels', isCorrect: true },
      { text: 'To reject as many tickets as possible', isCorrect: false },
      { text: 'To punish underperforming technicians', isCorrect: false },
      { text: 'To delay customer response times', isCorrect: false }
    ],
    explanation: 'Clear escalation criteria ensure consistent handling of issues, reduce first-contact resolution time, and match issue complexity with appropriate expertise levels.',
    difficulty: 'medium'
  },
  {
    category: 'Communication',
    question: 'What does "active listening" mean in a support context?',
    options: [
      { text: 'Fully concentrating on what the customer is saying without interrupting and then summarizing', isCorrect: true },
      { text: 'Just hearing the words the customer speaks', isCorrect: false },
      { text: 'Planning your response while the customer talks', isCorrect: false },
      { text: 'Focusing only on technical keywords', isCorrect: false }
    ],
    explanation: 'Active listening involves: paying full attention, not interrupting, summarizing what you heard, asking clarifying questions, and showing the customer you care about their problem.',
    difficulty: 'medium'
  },
  {
    category: 'Ticketing & Documentation',
    question: 'What information is essential to record in a support ticket?',
    options: [
      { text: 'Customer details, issue description, actions taken, outcomes, and resolution', isCorrect: true },
      { text: 'Only the customer\'s name', isCorrect: false },
      { text: 'Only technical jargon', isCorrect: false },
      { text: 'Only the cost of the solution', isCorrect: false }
    ],
    explanation: 'Essential ticket information: customer name/contact, detailed issue description, symptoms, steps taken, solutions attempted, resolution, and follow-up actions.',
    difficulty: 'easy'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert questions
    const insertedQuestions = await Question.insertMany(quizQuestions);
    console.log(`Inserted ${insertedQuestions.length} questions`);

    // Create quizzes
    await Quiz.deleteMany({});

    // Quiz 1: Support Process Fundamentals
    const supportProcessQs = insertedQuestions.filter(q => q.category === 'Support Process');
    const quiz1 = new Quiz({
      title: 'Support Process Fundamentals',
      description: 'Test your knowledge of support processes, levels, and best practices',
      category: 'Support Process',
      questions: supportProcessQs.map(q => q._id),
      timeLimit: 15,
      passingScore: 70
    });
    await quiz1.save();
    console.log('Created Quiz 1: Support Process Fundamentals');

    // Quiz 2: Communication Skills
    const communicationQs = insertedQuestions.filter(q => q.category === 'Communication');
    const quiz2 = new Quiz({
      title: 'Communication Skills in Support',
      description: 'Master the art of effective communication with customers and colleagues',
      category: 'Communication',
      questions: communicationQs.map(q => q._id),
      timeLimit: 15,
      passingScore: 70
    });
    await quiz2.save();
    console.log('Created Quiz 2: Communication Skills in Support');

    // Quiz 3: Support Levels & Ticketing
    const ticketingQs = insertedQuestions.filter(q => q.category === 'Ticketing & Documentation');
    const supportLevelQs = insertedQuestions.filter(q => q.category === 'Support Levels');
    const combined1 = [...ticketingQs, ...supportLevelQs];
    const quiz3 = new Quiz({
      title: 'Ticketing & Support Levels',
      description: 'Learn about proper documentation and support level management',
      category: 'Ticketing & Support Levels',
      questions: combined1.map(q => q._id),
      timeLimit: 20,
      passingScore: 70
    });
    await quiz3.save();
    console.log('Created Quiz 3: Ticketing & Support Levels');

    // Quiz 4: Incident Management & Troubleshooting
    const incidentQs = insertedQuestions.filter(q => q.category === 'Incident Management');
    const troubleshootingQs = insertedQuestions.filter(q => q.category === 'Troubleshooting');
    const combined2 = [...incidentQs, ...troubleshootingQs];
    const quiz4 = new Quiz({
      title: 'Incident Management & Troubleshooting',
      description: 'Master incident classification and systematic troubleshooting techniques',
      category: 'Incident Management',
      questions: combined2.map(q => q._id),
      timeLimit: 20,
      passingScore: 70
    });
    await quiz4.save();
    console.log('Created Quiz 4: Incident Management & Troubleshooting');

    // Quiz 5: Customer Service Excellence
    const customerServiceQs = insertedQuestions.filter(q => q.category === 'Customer Service');
    const remoteQs = insertedQuestions.filter(q => q.category === 'Remote Support');
    const combined3 = [...customerServiceQs, ...remoteQs];
    const quiz5 = new Quiz({
      title: 'Customer Service Excellence',
      description: 'Learn professional customer service standards and remote support techniques',
      category: 'Customer Service',
      questions: combined3.map(q => q._id),
      timeLimit: 15,
      passingScore: 70
    });
    await quiz5.save();
    console.log('Created Quiz 5: Customer Service Excellence');

    // Final Comprehensive Exam
    const comprehensiveQuiz = new Quiz({
      title: 'Module 437 Comprehensive Exam',
      description: 'Test all knowledge covered in Module 437 - Working in Support',
      category: 'Comprehensive',
      questions: insertedQuestions.map(q => q._id),
      timeLimit: 60,
      passingScore: 75
    });
    await comprehensiveQuiz.save();
    console.log('Created Comprehensive Quiz');

    console.log('\nDatabase seeding completed successfully!');
    console.log(`Total quizzes created: 6`);
    console.log(`Total questions created: ${insertedQuestions.length}`);

    // Seed admin user
    console.log('Creating admin user...');
    const adminEmail = 'admin@module437.test';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        password: 'admin123456',
        isAdmin: true
      });
      await adminUser.save();
      console.log('✅ Admin user created: admin@module437.test / admin123456');
    } else {
      console.log('✅ Admin user already exists');
    }
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding script
seedDatabase();
