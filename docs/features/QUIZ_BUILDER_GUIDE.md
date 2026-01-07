# 🛠️ Quiz Builder - User Guide

## Overview

The **Quiz Builder** is a powerful built-in web tool that lets you create, edit, and manage your own custom quizzes and questions without touching code. All your creations are saved securely in the database and accessible anytime.

---

## 🚀 Quick Start

### Access the Builder
1. **Login** to your account at http://localhost:3000
2. Click the **🛠️ Build Quiz** button in the top navbar (green button)
3. You're now in the Quiz Builder!

### Create Your First Question
1. Click **📝 Questions** tab
2. Click **+ Create New Question**
3. Fill in the form:
   - **Question**: Your question text
   - **Category**: Choose from predefined categories
   - **Difficulty**: Easy, Medium, or Hard
   - **Options**: At least 2 answers
   - **Explanation**: Why the answer is correct
4. Click **Create Question** to save

### Create Your First Quiz
1. Create at least one question first
2. Click **📋 My Quizzes** tab
3. Click **+ Create New Quiz**
4. Fill in the form:
   - **Title**: Quiz name
   - **Description**: What's it about (optional)
   - **Select Questions**: Check the questions to include
   - **Time Limit**: How many minutes (default: 30)
   - **Passing Score**: % needed to pass (default: 70)
5. Click **Create Quiz** to save

**That's it!** Your quiz is now available on the Dashboard and ready to take.

---

## 📝 Questions Tab

### View All Your Questions

Click the **📝 Questions** tab to see all custom questions you've created.

**For each question, you can**:
- 📋 See the question text and category
- ⭐ View difficulty level (Easy/Medium/Hard)
- ✏️ Edit - Modify the question
- 🗑️ Delete - Remove the question (also removes from any quizzes)

### Creating Questions

**Form Fields**:

| Field | Required | Notes |
|-------|----------|-------|
| Question | ✅ Yes | The main question text |
| Category | ✅ Yes | Choose from predefined categories |
| Difficulty | ✅ Yes | Easy, Medium, or Hard |
| Options | ✅ Yes | Minimum 2, maximum unlimited |
| Explanation | ✅ Yes | Why the answer is correct (helps learning) |

**Option Rules**:
- ✅ Each option must have text
- ✅ At least one option must be marked as correct
- ✅ You can add more options with "+ Add Option"
- ✅ Remove options by clicking "Remove" (needs 2+ options minimum)

**Categories**:
- Support Process
- Communication
- Ticketing & Documentation
- Support Levels
- Incident Management
- Troubleshooting
- Customer Service
- Remote Support
- Custom

### Editing Questions

1. Find the question in the list
2. Click ✏️ **Edit**
3. Modify the form
4. Click **Update Question** to save

**Note**: Changes are saved immediately and affect all quizzes using this question.

### Deleting Questions

1. Click 🗑️ **Delete** on a question card
2. Confirm the deletion
3. The question is removed from all quizzes automatically

---

## 📋 Quizzes Tab

### View All Your Quizzes

Click the **📋 My Quizzes** tab to see all custom quizzes you've created.

**For each quiz, you can see**:
- 📌 Quiz title
- 📊 Number of questions included
- ⏱️ Time limit
- ✅ Passing score percentage
- 📝 Description (if added)

### Creating Quizzes

**Requirements**:
- ✅ At least one question must be created first
- ✅ Quiz must have a title
- ✅ At least one question must be selected

**Form Fields**:

| Field | Required | Default | Notes |
|-------|----------|---------|-------|
| Title | ✅ Yes | - | Quiz name |
| Description | ❌ No | Empty | What's the quiz about |
| Category | ❌ No | "Custom" | Organize your quizzes |
| Questions | ✅ Yes | - | Select from your questions |
| Time Limit | ❌ No | 30 min | How long to complete |
| Passing Score | ❌ No | 70% | Required to pass |

### Question Selection

In the **"Select Questions"** section:
- ✅ View all your custom questions
- ✅ Check/uncheck to add/remove questions
- ✅ Each question shows its category
- ✅ Selected count shows at top
- ✅ Questions appear in selection order

**Pro Tip**: Add questions in logical order (easier to harder) for better learning experience.

### Deleting Quizzes

1. Click 🗑️ **Delete** on a quiz card
2. Confirm the deletion
3. The quiz is removed completely
4. Associated questions are NOT deleted

---

## 💾 Data Storage & Backup

### Where is my data saved?

All your questions and quizzes are stored in:
- **Database**: MongoDB (c:\data\db)
- **Server**: Backend API (`/api/builder`)
- **Ownership**: Linked to your user account

### Data Security

- ✅ Only you can see/edit your questions and quizzes
- ✅ Admin users can see everything
- ✅ Data persists across sessions
- ✅ Backups are automatic (see MongoDB backups)

### Exporting Your Data

Currently, export is manual:
1. Take screenshots of your questions
2. Export quiz results from the Results page
3. Contact admin for database export

*Note: Download feature coming soon!*

---

## 🎯 Best Practices

### Question Design

✅ **DO**:
- Write clear, specific questions
- Provide 3-4 options (not just 2)
- Include detailed explanations
- Use all difficulty levels
- Organize by category

❌ **DON'T**:
- Use ambiguous wording
- Make explanations too short
- Use too many questions (causes fatigue)
- Mix unrelated topics in one quiz

### Quiz Design

✅ **DO**:
- Start with easier questions
- Mix difficulty levels
- Set realistic time limits
- Use meaningful titles
- Add helpful descriptions

❌ **DON'T**:
- Create quizzes with <3 questions
- Set time limits too short
- Use confusing titles
- Mix different topics randomly

### Time Limit Guidelines

| Quiz Size | Recommended Time |
|-----------|-----------------|
| 5 questions | 10 minutes |
| 10 questions | 20 minutes |
| 15 questions | 30 minutes |
| 20+ questions | 40-60 minutes |

*Allow ~2 minutes per question minimum*

---

## 🔧 Troubleshooting

### "Cannot create quiz - need at least one question"
**Solution**: Create at least one custom question first in the Questions tab.

### "Questions not showing up"
**Solution**: 
- Refresh the page (F5)
- Check you're in the correct tab
- Verify question was created successfully

### "Cannot delete question - it's in use"
**Solution**: Delete the question - it will automatically remove from quizzes. Or manually remove it from quizzes first.

### "Changes not saving"
**Solution**:
- Check internet connection
- Look for red error messages
- Refresh and try again
- Check browser console for errors (F12)

### "Lost my questions!"
**Solution**:
- They're in the database - refresh the page
- If still missing, contact your admin
- Check your login - wrong account?

---

## 📊 Integration with Dashboard

Once you create a quiz, it appears on your Dashboard with:
- ✅ Your custom quizzes at the top
- ✅ Ability to take/retake anytime
- ✅ Full results tracking
- ✅ Performance statistics

**Your Dashboard shows**:
- Custom quizzes you created
- Official Module 437 quizzes
- Previous results
- Progress statistics

---

## 🎓 Use Cases

### For Students
- **Study Groups**: Create shared quizzes for classmates
- **Self-Assessment**: Track your knowledge on specific topics
- **Practice**: Repeat difficult topics with custom questions

### For Instructors
- **Custom Assessments**: Create topic-specific tests
- **Student Content**: Let students create questions
- **Progress Tracking**: Monitor learning with custom quizzes

### For Trainers
- **Module Coverage**: Ensure all learning objectives are tested
- **Skill Validation**: Create role-specific quizzes
- **Customization**: Adapt content to specific needs

---

## 🔐 Privacy & Permissions

| Feature | You | Admins |
|---------|-----|--------|
| View own questions | ✅ | ✅ |
| Edit own questions | ✅ | ✅ |
| Delete own questions | ✅ | ✅ |
| View others' questions | ❌ | ✅ |
| Edit others' questions | ❌ | ✅ |
| View system questions | ✅ | ✅ |
| Edit system questions | ❌ | ✅ |

---

## 📞 Support & Help

### Getting Help

1. **In-app help**: Hover over any field for tooltips
2. **This guide**: Refer to this documentation
3. **Check errors**: Read error messages carefully
4. **Contact admin**: Reach out if issues persist

### Reporting Issues

When reporting a problem, include:
- 📱 What browser are you using?
- 🖥️ What device (desktop, tablet, mobile)?
- 📝 What exactly did you do?
- ❌ What error did you see?
- 📸 Can you send a screenshot?

---

## 🚀 Future Features (Roadmap)

Coming soon:
- 📥 Export quizzes to PDF
- 📤 Import questions from CSV
- 🔀 Duplicate questions
- 📊 Question analytics
- 🏷️ Tags for organization
- 👥 Share with specific users
- 📱 Mobile app support

---

## 💡 Tips & Tricks

### Speed Tips
- Use Tab key to navigate forms faster
- Delete option instead of editing if making major changes
- Copy question text before editing if saving for reference

### Organization Tips
- Use consistent naming: "Topic - Subtopic"
- Group related questions before creating quiz
- Use descriptions to note quiz purpose
- Category field helps sort and find quizzes

### Quality Tips
- Have someone else review your questions
- Test your quiz before giving to others
- Update explanations based on feedback
- Collect feedback from quiz takers

---

## 📋 Checklist: Create Professional Quiz

Before sharing your quiz, verify:

- ✅ Question texts are clear and specific
- ✅ All options are plausible
- ✅ Only one correct answer per question
- ✅ Explanations are helpful and accurate
- ✅ Difficulty levels are appropriate
- ✅ Time limit is realistic
- ✅ Quiz title is descriptive
- ✅ Questions are in logical order
- ✅ All instructions are clear
- ✅ Quiz has been tested

---

**Happy Creating! 🎉**

Questions? Contact your quiz administrator or refer to the main documentation.
