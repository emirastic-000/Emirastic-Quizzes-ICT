# Changelog

All notable changes to the Emirastic ICT Quiz project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-01-13

### Added - Module 117 Content
- **Module 117 Quizzes**: Added complete quiz suite for Module 117 (Informatik- und Netzinfrastruktur für KMU)
  - 15 advanced-level questions covering network infrastructure for small businesses
  - 4 quizzes: Network Planning, Network Services, Security & Wireless, Final Exam
  - Topics: IP addressing, subnetting, VLANs, DHCP, DNS, routing, WLAN security, backup strategies
  - Difficulty level: Intentionally harder than Module 437 quizzes for advanced learners
- **New Question Categories**: Added 12 Module 117 categories to Question model
  - Network Planning, Switching, VLANs, DHCP, DNS, IP Management, Routing, Wireless, Security, Backup
- **Module Field**: Enhanced Question schema to distinguish between Module 437 and Module 117 content

### Module 117 Quiz Details
1. **🌐 Netzwerk-Grundlagen & Planung** (25 min, 75% passing)
   - Subnetting calculations with VLSM
   - Network documentation best practices
   - Switch port configuration (Access ports, PortFast, BPDU Guard)
   - VLAN design and implementation for small businesses

2. **⚙️ Netzwerkdienste & Routing** (30 min, 75% passing)
   - DHCP server configuration and scope planning
   - DHCP troubleshooting methodology
   - APIPA vs manual IP addressing
   - Inter-VLAN routing (Router-on-a-Stick vs Layer-3 switches)
   - Static vs dynamic routing for SMB networks
   - DNS record types and configuration
   - DNS troubleshooting

3. **🔒 WLAN, Sicherheit & Backup** (25 min, 75% passing)
   - WPA3-Enterprise vs WPA2/PSK security
   - WLAN site survey and AP placement
   - 3-2-1 backup rule implementation
   - Defense-in-depth security strategy

4. **🏆 Modul 117 Prüfung: Netzinfrastruktur für KMU** (45 min, 80% passing)
   - Comprehensive final exam with Swiss grading system
   - All 15 questions testing complete Module 117 knowledge

### Fixed - Quiz Result Display
- **Result Page Route**: Fixed navigation from Quiz completion to Result Detail page
  - Updated Quiz.js to navigate to `/result/:resultId` with result ID from API response
  - Result review now displays correctly after quiz submission

### Removed - Module 431
- **Module 431 Removed**: Removed all references to Module 431 (Independent task execution) to focus on core modules
  - Removed from frontend modules.js data file
  - Removed from README.md, API documentation, and contributing guidelines
  - Removed from GitHub issue templates
  - Project now focuses on Module 117 (Network Infrastructure) and Module 437 (IT Support)

## [0.2.0] - 2026-01-07

### Added - Swiss Grading System
- **Swiss Grading (1-6 Scale)**: Implemented comprehensive exam grading system for Module 437 final exam
  - Formula: Grade = 1 + (percentage/100) × 5, rounded to nearest 0.5
  - Grades range from 1.0 (worst) to 6.0 (best)
  - Color-coded display: Excellent (≥5.5, green), Good (≥5.0, blue), Sufficient (≥4.0, yellow), Insufficient (<4.0, red)
- **Quiz Model Enhancement**: Added `isComprehensive` boolean field to identify final exams requiring Swiss grading
- **Result Model Enhancement**: Added `swissGrade` field to store calculated Swiss grades
- **Automatic Grade Calculation**: Backend automatically calculates Swiss grade for comprehensive exams on submission
- **Grade Display in Review**: Prominent Swiss grade section at top of quiz review with bilingual labels (English/German)

### Added - Results Page Improvements
- **View Detailed Review Button**: Added button on Results history page to access full quiz review
- **Persistent Result URLs**: Results now use URL parameters (`/result/:resultId`) instead of navigation state
- **API Endpoint for Single Result**: Added `getResultById()` API function to fetch individual results
- **Refresh-Proof Results**: Results no longer disappear when page is refreshed - data fetched from API using result ID
- **Better Error Handling**: Improved loading states and error messages for result fetching

### Enhanced - Quiz Question Explanations
Significantly deepened explanations for 15+ questions with practical context and real-world examples:
- **ITIL Incident Management**: Added distinction from Changes, examples of incidents, emphasis on unplanned nature
- **Support Documentation**: Detailed breakdown of what to document and why each element matters
- **Problem Management**: Root Cause Analysis tools (RCA, Ishikawa diagram, 5-Why method), difference from Incident Management
- **Communication Model (Schulz von Thun)**: All 4 layers explained with practical support scenario example
- **Frustrated Customer Handling**: 4-step approach, emotional intelligence techniques, what to avoid
- **Active Listening**: 5 components with specific techniques (paraphrasing, clarification questions)
- **Question Techniques**: Open vs closed questions, 5-Why method, good/bad examples
- **Support Level Hierarchy**: Detailed role descriptions, resolution rates, escalation criteria
- **Escalation Criteria**: When to escalate and when NOT to escalate, best practices
- **Troubleshooting Process**: 4-step systematic approach, documentation benefits
- **Systematic Troubleshooting**: Divide-and-Conquer method, one-change-at-a-time principle
- **WLAN Troubleshooting**: 4-level checklist from simple to complex issues
- **Severity vs Priority**: Detailed scales (S1-S4, P1-P4), real-world examples (CEO can't print vs backup server down)
- **SLA Components**: Uptime percentages, response times, resolution times, consequences of violations
- **Incident Closure**: 5-step professional closing process, preventing "zombie tickets"
- **Preventive Maintenance**: Hardware/Software/Data/Documentation categories, cost comparison (proactive vs reactive)
- **Remote Support Tools**: Complete tech stack with specific tool examples (TeamViewer, ServiceNow, etc.)
- **Remote vs On-Site Support**: Advantages/disadvantages, 80/20 rule for remote solvability

### Fixed - Dashboard Statistics Display
- **Route Ordering**: Fixed route conflict where `/user/stats` was matched as `/user/:history`
- **CSS Color Inheritance**: Resolved invisible text issue in stat boxes (text color matched background)
- **Data Fetching**: Verified statistics API correctly returns totalQuizzes, passedQuizzes, averageScore, passRate
- **Debug Logging**: Added comprehensive console logging for troubleshooting statistics display

### Fixed - Results.css Styling
- **Swiss Grade Display**: Added comprehensive CSS for grade sections with color-coded gradients
  - `.swiss-grade-section` with multiple color variants (excellent, good, sufficient, insufficient)
  - Large `.grade-highlight` (4rem font) with text shadow
  - Clear `.grade-description` with emoji indicators
- **View Review Button**: Added professional button styling with gradient and hover effects
- **Color Fixes**: Applied `!important` flags to ensure stat-card text visibility

### Technical Improvements
- **Database Schema Updates**: Added new fields to Quiz and Result models with proper defaults
- **API Response Enhancement**: Submit route now includes `swissGrade` and `isComprehensive` flags
- **Frontend State Management**: Improved result data handling with useState and useEffect hooks
- **URL-based Navigation**: Switched from state-based to URL parameter-based routing for better UX
- **Error Boundaries**: Added loading states and error handling for async operations

### Database Changes
- **Seed Script Enhancement**: Final exam quiz ("🏆 Modul 437 Prüfung") marked with `isComprehensive: true`
- **Old Results Cleanup**: Removed orphaned results referencing deleted quizzes from previous seeds
- **24 Questions**: Complete question set with enhanced explanations for Module 437
- **7 Missions**: 6 topic-based missions + 1 comprehensive final exam with Swiss grading

### Documentation
- Enhanced question explanations now serve as learning resources, not just answer keys
- Each explanation includes: theoretical background, practical examples, best practices, tools/methods

## [0.1.0] - 2025-12-19

### Initial Release
- Full-stack MERN application for ICT apprenticeship quiz practice
- User authentication and authorization
- Module 437 quiz content
- Admin panel for user management
- German language support
- Dashboard with quiz statistics
- Results tracking and history

---

**Note**: When reseeding the database with `node seed.js`, all existing quiz results will reference deleted quizzes. It's recommended to clear old results after reseeding.
