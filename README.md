# AI Resume Analyzer & Candidate Evaluation System

An AI-powered recruitment platform that helps HR/Admin users analyze multiple resumes, evaluate candidates based on predefined job criteria, generate AI-powered scores and recommendations, rank candidates, and create shortlists using **Google Gemini AI** and **n8n workflow automation**.

---

# Course Information

- **Course:** CSE 4204 – Mobile Computing Lab
- **Department:** Computer Science & Engineering
- **Section:** 8C
- **Team Name:** CSE4204-8C-T04
- **Project Type:** AI-based Web Application

---

# Project Overview

The **AI Resume Analyzer & Candidate Evaluation System** is designed to simplify and automate the initial recruitment screening process using Artificial Intelligence.

The system allows HR/Admin users to create job criteria, upload multiple candidate resumes, automatically extract resume text, and analyze candidates against selected job requirements using **Google Gemini AI**.

Instead of manually reviewing every resume, the system evaluates candidates based on their skills, education, experience, and job requirements. It then generates structured AI results including:

- Candidate Information
- Extracted Skills
- Matched Skills
- Missing Skills
- Match Percentage
- AI Score
- Recommendation
- Candidate Evaluation Summary

The analyzed candidates can then be ranked according to their suitability for the selected job and managed through the shortlist system.

The project uses a modern **MERN-based architecture** with AI integration through the **Google Gemini API** and workflow automation using **n8n**.

---

# Team Members

| SL | Member Name | Student ID | Responsibility |
|---|---|---|---|
| 01 | Shaik Taz Uddin | 11220320925 | Backend Development & API Integration |
| 02 | MD Sakib Al Hasan | 11220320926 | Frontend Development & UI/UX |
| 03 | Jarin Tasnim | 11220320930 | Database Management & Documentation |
| 04 | Md. Junaidul Haque | 11220320932 | AI Integration, Testing & Deployment |

---

# Core Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- User Logout
- User Profile Management

## Job Management

- Create Job Criteria
- Update Job Criteria
- Delete Job
- View Job List
- Define Required Skills
- Define Experience Level
- Define Job Description

## Resume Management

- Upload Multiple Resumes
- PDF Resume Support
- DOCX Resume Support
- Automatic Resume Text Extraction
- Resume Parsing
- Store Resume Information
- View Uploaded Resumes
- Delete Resume
- Associate Resumes with Job Criteria

## AI Resume Analysis

- Google Gemini AI Integration
- n8n Workflow Automation
- Bulk Resume Analysis
- Job-Based Candidate Evaluation
- Candidate Information Extraction
- Skills Extraction
- Education Detection
- Experience Detection
- Matched Skills Identification
- Missing Skills Identification
- AI Match Percentage
- AI Score Generation
- AI Recommendation
- AI Candidate Summary

## AI Output Validation

The system validates AI-generated responses before displaying them to users.

Validation includes:

- Checking empty AI responses
- Parsing structured JSON responses
- Cleaning extracted data
- Removing duplicate skill values
- Validating match percentage
- Validating AI score
- Validating recommendation values
- Handling invalid AI output
- Handling failed candidate analysis

## Ranking & Shortlisting

- Candidate Ranking
- AI-Based Candidate Comparison
- Match Percentage Ranking
- AI Score Ranking
- Candidate Recommendation Display
- Shortlist Generation
- Candidate Status Management

## Dashboard Analytics

- Total Jobs
- Total Resumes
- AI Analysis Statistics
- Top Candidates
- Shortlisted Candidates

---

# AI Integration

The main intelligent feature of the project is the **Bulk AI Resume Analysis System**.

The system analyzes multiple candidate resumes against selected job criteria using **Google Gemini AI**.

AI processing is managed through an **n8n workflow**, which connects the backend application with the Gemini API.

---

# AI Workflow

The complete AI workflow is:

```text
HR / Admin
     ↓
React Frontend
     ↓
Node.js / Express Backend
     ↓
MongoDB
     ↓
n8n Resume Analysis Webhook
     ↓
Normalize Input & Build Prompts
     ↓
Google Gemini AI
     ↓
Validate AI Output
     ↓
Aggregate Candidate Results
     ↓
Return Analysis Results
     ↓
Backend Processing
     ↓
Frontend Display
     ↓
Candidate Ranking / Shortlisting
```

---

# n8n AI Workflow

The n8n workflow contains the following major nodes:

### 1. Resume Analysis Webhook

Receives job criteria and resume information from the backend through a POST request.

### 2. Normalize Input & Build Prompts

Processes incoming data and creates a structured AI prompt for each candidate resume.

### 3. Gemini Resume Analysis

Sends the generated prompt to the Google Gemini API and receives AI-generated candidate evaluations.

### 4. Validate AI Output

Validates, parses, and cleans the AI-generated response before it is used by the application.

### 5. Aggregate Candidate Results

Combines all successfully analyzed candidate results into one structured response.

The response contains:

- Total Processed
- Total Analyzed
- Total Failed
- Candidate Results
- Errors

### 6. Return Analysis Results

Returns the final AI analysis response to the backend.

---

# AI Analysis Output

For each candidate, the AI system generates structured information such as:

```json
{
  "success": true,
  "resumeId": "resume-id",
  "jobId": "job-id",
  "candidateName": "Candidate Name",
  "candidateEmail": "candidate@example.com",
  "candidatePhone": "Not detected",
  "extractedSkills": [
    "React",
    "JavaScript",
    "HTML",
    "CSS"
  ],
  "education": "BSc in Computer Science",
  "experience": "Frontend Developer with relevant experience",
  "matchedSkills": [
    "React",
    "JavaScript",
    "HTML"
  ],
  "missingSkills": [
    "Tailwind CSS"
  ],
  "matchPercentage": 80,
  "aiScore": 85,
  "recommendation": "Recommended",
  "summary": "The candidate has relevant frontend development experience and matches most of the required technical skills."
}
```

---

# Prompt Engineering

The AI workflow uses structured prompts to improve the consistency and reliability of candidate evaluation.

## System Prompt Concept

```text
You are an AI recruitment assistant.

Analyze candidate resumes against the provided job criteria.

Use only the information available in the resume and job requirements.

Do not invent missing candidate information.

Identify candidate information, skills, education, experience,
matched skills, missing skills, match percentage, AI score,
recommendation, and a concise evaluation summary.

Return the response in structured JSON format.
```

## User Prompt Structure

```text
Analyze the following candidate resume against the selected job criteria.

JOB INFORMATION

Job Title: [Job Title]

Experience Level: [Experience Level]

Required Skills: [Required Skills]

Job Description: [Job Description]

RESUME

[Extracted Resume Text]

Return:

- Candidate Information
- Extracted Skills
- Education
- Experience
- Matched Skills
- Missing Skills
- Match Percentage
- AI Score
- Recommendation
- Summary
```

---

# AI Response Handling

The application handles different AI response scenarios including:

- Successful AI Response
- Invalid AI Response
- Empty AI Response
- Gemini API Error
- Network Failure
- Rate Limit
- Timeout
- Invalid JSON
- Failed Candidate Analysis

This prevents the complete application from failing when the AI service returns an unexpected response or temporarily becomes unavailable.

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## AI Integration

- Google Gemini API
- n8n Workflow Automation

## File Processing

- Multer
- pdf-parse
- mammoth

## API Testing

- Postman

## Version Control

- Git
- GitHub

---

# System Architecture

```text
┌──────────────────────────────┐
│       React Frontend         │
│                              │
│ Dashboard                    │
│ Job Criteria                 │
│ Resume Upload                │
│ Analysis Result              │
│ Candidate Ranking            │
│ Shortlist                    │
└──────────────┬───────────────┘
               │
               │ REST API
               ↓
┌──────────────────────────────┐
│    Node.js / Express API     │
│                              │
│ Authentication               │
│ Job Management               │
│ Resume Management            │
│ Resume Text Extraction       │
│ AI Analysis Service          │
│ Ranking / Shortlist          │
└──────────┬─────────┬─────────┘
           │         │
           ↓         ↓
     ┌──────────┐   ┌────────────────────┐
     │ MongoDB  │   │    n8n Workflow    │
     └──────────┘   └─────────┬──────────┘
                              │
                              ↓
                     ┌────────────────────┐
                     │ Google Gemini API  │
                     └────────────────────┘
```

---

# Repository Structure

```text
frontend/
│
├── src/
├── public/
└── package.json

backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── utils/
│   └── uploads/
│
└── package.json

database/
documentation/
design/
diagrams/
n8n-workflows/
screenshots/
README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

Move into the project directory:

```bash
cd ai-resume-analyzer-candidate-evaluation
```

---

# Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

N8N_WEBHOOK_URL=your_n8n_production_webhook_url
```

> **Important:** Never upload real API keys, database credentials, JWT secrets, or other sensitive information to GitHub.

The Gemini API credential should also be stored securely in the environment or n8n credential/configuration system.

---

# REST API Modules

## Authentication

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/profile
```

## Job Management

```text
POST   /jobs
GET    /jobs
GET    /jobs/:jobId
PUT    /jobs/:jobId
DELETE /jobs/:jobId
```

## Resume Management

```text
POST   /resumes/upload
GET    /resumes
GET    /resumes/job/:jobId
DELETE /resumes/:resumeId
```

## AI Analysis

```text
POST   /analysis/analyze-job/:jobId
GET    /analysis
GET    /analysis/job/:jobId
GET    /analysis/:analysisId
```

## Ranking

```text
POST   /ranking/generate/:jobId
GET    /ranking/job/:jobId
```

## Shortlist

```text
POST   /shortlist/generate/:jobId
GET    /shortlist/job/:jobId
```

## Analytics

```text
GET    /analytics/dashboard
GET    /analytics/job/:jobId
```

---

# Bulk Resume Analysis Process

The AI analysis process works as follows:

### Step 1 — Create Job Criteria

HR/Admin creates a job and defines:

- Job Title
- Job Description
- Required Skills
- Experience Level

### Step 2 — Upload Resumes

Multiple PDF/DOCX resumes are uploaded under the selected job.

### Step 3 — Resume Text Extraction

The backend automatically extracts readable text from the uploaded resumes.

### Step 4 — Run AI Analysis

The user selects the job from the **Analysis Result** page and clicks:

```text
Analyze All Resumes
```

### Step 5 — Backend Sends Data to n8n

The backend sends:

```text
Job Criteria
+
Extracted Resume Text
+
Resume Information
```

to the n8n webhook.

### Step 6 — Gemini Analysis

n8n creates individual prompts and sends them to Google Gemini AI.

### Step 7 — Validate Results

The AI-generated output is validated and cleaned.

### Step 8 — Aggregate Results

All candidate results are combined into one structured response.

### Step 9 — Display Results

The frontend displays:

- Candidate Name
- Contact Information
- Match Percentage
- AI Score
- Recommendation
- Matched Skills
- Missing Skills
- Candidate Summary

### Step 10 — Candidate Ranking

Candidates are ranked based on the AI analysis results.

---

# Weekly Progress

- ✅ Week 01 — Team Formation & Project Idea Selection
- ✅ Week 02 — Project Proposal Completed
- ✅ Week 03 — Software Requirements Specification (SRS) Completed
- ✅ Week 04 — System Design & Software Architecture Completed
- ✅ Week 05 — UI/UX Design & Development Planning Completed
- ✅ Week 06 — Backend Development & Database Implementation Completed
- ✅ Week 07 — Frontend Development & Backend API Integration Completed
- ✅ Week 08 — AI Integration & Intelligent Features Development Completed
- ✅ Week 09 — Feature Completion, Integration & Mid-Project Review Completed
- ✅ Week 10 — Software Testing, Debugging & Quality Assurance Completed

---

# Week 10 — Software Testing, Debugging & Quality Assurance

Week 10 focused on systematic testing, debugging, and quality assurance of the complete integrated application.

After completing the major frontend, backend, database, authentication, and AI integration work, the actual working application was tested using valid, invalid, and unexpected input scenarios.

The main objectives were to identify defects, verify application behavior, evaluate AI-generated results, resolve integration issues, and improve the overall stability and reliability of the system.

The following testing activities were performed:

- ✅ Functional Testing
- ✅ Authentication & Authorization Testing
- ✅ REST API Testing
- ✅ Database Testing
- ✅ AI Feature Testing
- ✅ AI Quality Evaluation
- ✅ UI/UX Testing
- ✅ Responsive Testing
- ✅ Basic Security Testing
- ✅ Error Handling Testing
- ✅ Bug Identification & Resolution
- ✅ Retesting
- ✅ Regression Testing

---

## Testing Approach

Testing was performed on the actual integrated application rather than isolated or dummy modules.

Three major types of scenarios were considered:

1. **Valid Scenarios** — Correct inputs and expected application behavior.
2. **Invalid Scenarios** — Missing, incorrect, or invalid inputs.
3. **Unexpected Scenarios** — AI errors, network issues, invalid responses, and unusual resume inputs.

The complete recruitment workflow was tested from user authentication to AI-powered candidate evaluation, ranking, and shortlisting.

---

## Tested Modules

| Module | Status |
|---|---|
| User Registration | ✅ Tested |
| User Login | ✅ Tested |
| User Logout | ✅ Tested |
| User Profile | ✅ Tested |
| Protected Routes | ✅ Tested |
| Dashboard | ✅ Tested |
| Job Criteria Management | ✅ Tested |
| Resume Upload | ✅ Tested |
| Resume Text Extraction | ✅ Tested |
| Database Operations | ✅ Tested |
| AI Resume Analysis | ✅ Tested |
| n8n Workflow | ✅ Tested |
| Gemini AI Integration | ✅ Tested |
| AI Output Validation | ✅ Tested |
| Analysis Result Display | ✅ Tested |
| Candidate Ranking | ✅ Tested |
| Shortlist Management | ✅ Tested |
| Responsive Interface | ✅ Tested |

---

## Functional Testing

The major features defined in the project requirements were tested using both successful and unsuccessful scenarios.

Testing included:

- Registration
- Login
- Logout
- Profile Access
- Protected Routes
- Dashboard
- Create Job Criteria
- View Job Criteria
- Update Job Criteria
- Delete Job Criteria
- Multiple Resume Upload
- Resume Text Extraction
- AI Resume Analysis
- AI Result Display
- Candidate Ranking
- Candidate Shortlisting

The major functional workflows produced the expected results during testing.

---

## Authentication & Authorization Testing

The authentication workflow was verified using different scenarios.

Testing included:

- Valid Registration
- Valid Login
- Invalid Email / Password
- Empty Login Fields
- Logout
- JWT Authentication
- Protected Route Access
- Unauthorized Access Prevention
- Authentication State Management

The system uses **JWT** for authentication and **bcryptjs** for secure password hashing.

---

## API Testing

Backend REST APIs were tested using **Postman** and through the integrated frontend.

Testing included:

- GET Requests
- POST Requests
- PUT Requests
- DELETE Requests
- Authentication Headers
- Valid Requests
- Invalid Requests
- Missing Parameters
- Invalid Parameters
- HTTP Status Codes
- API Response Data
- Error Responses

Major API modules tested:

```text
Authentication APIs
Job Management APIs
Resume Management APIs
AI Analysis APIs
Ranking APIs
Shortlist APIs
Analytics APIs
```

---

## Database Testing

MongoDB database operations were tested through the actual application.

Testing verified:

- Data Creation
- Data Retrieval
- Data Update
- Data Deletion
- User Data Storage
- Job Criteria Storage
- Resume Information Storage
- Extracted Resume Text
- AI Analysis Result Storage
- Candidate Ranking Data
- Shortlist Data

MongoDB and Mongoose are used to maintain structured application data.

---

## AI Feature Testing

The **Google Gemini AI + n8n Resume Analysis Workflow** was tested using different types of candidate resumes.

The AI feature was evaluated based on:

- Relevance
- Accuracy
- Consistency
- Response Quality
- Response Time
- Skills Extraction
- Matched Skills Detection
- Missing Skills Detection
- Match Percentage
- AI Score
- Recommendation
- Candidate Evaluation Summary

The tested AI workflow was:

```text
Job Criteria
      ↓
Resume Upload
      ↓
Resume Text Extraction
      ↓
Backend Processing
      ↓
n8n Workflow
      ↓
Google Gemini AI
      ↓
AI Output Validation
      ↓
Candidate Result Aggregation
      ↓
Database Processing
      ↓
Frontend Result Display
```

---

## AI Quality Evaluation

At least 10 different resume scenarios were used for AI quality evaluation.

| ID | Input Type | Expected Behavior |
|---|---|---|
| AI-01 | Strong Matching CV | High relevance and high score |
| AI-02 | Partially Matching CV | Medium score; missing skills detected |
| AI-03 | Unqualified CV | Low score/recommendation |
| AI-04 | Very Short CV | Graceful analysis with limited evidence |
| AI-05 | Very Long CV | Complete useful analysis |
| AI-06 | CV Missing Required Skills | Missing skills identified |
| AI-07 | Different Profession CV | Low job relevance |
| AI-08 | Repeated / Similar CV | Reasonably consistent output |
| AI-09 | Invalid / Poor Text | Handled without application crash |
| AI-10 | Ambiguous CV | Cautious and meaningful evaluation |

Evaluation factors:

- Relevance
- Accuracy
- Consistency
- Response Quality
- Response Time
- Handling of Unexpected Input

AI recommendations are intended to support recruitment decisions and should not replace final human judgment.

---

## AI Error Handling Testing

The AI workflow was reviewed for possible failure scenarios including:

- Empty AI Response
- Invalid AI Response
- Invalid JSON
- Unexpected Response Structure
- Gemini API Failure
- Network Failure
- Request Timeout
- Failed Candidate Analysis
- Missing Resume Information

The **Validate AI Output** stage in n8n validates and cleans AI-generated responses before they are returned to the backend.

This helps prevent malformed AI output from breaking the application workflow.

---

## UI/UX Testing

The complete interface was reviewed for usability and consistency.

Testing included:

- Navigation
- Forms
- Buttons
- Menus
- Notifications
- Loading States
- Success Messages
- Error Messages
- Empty States
- Dashboard
- Resume Upload Interface
- AI Analysis Interface
- Candidate Ranking Interface
- Shortlist Interface

---

## Responsive Testing

The application was reviewed across:

- Desktop
- Tablet
- Mobile

Responsive testing covered:

- Navigation
- Forms
- Cards
- Buttons
- Dashboard
- Resume Upload
- AI Analysis Results
- Candidate Ranking
- Shortlist

The responsive design ensures that the major application features remain usable across different screen sizes.

---

## Security Testing

Basic security checks were performed.

Verified practices include:

- Password Hashing using bcryptjs
- JWT Authentication
- Protected Backend Routes
- Protected Frontend Routes
- Environment Variables
- API Credential Protection
- Unauthorized Access Prevention
- Sensitive Data Exclusion from GitHub
- `.env` excluded using `.gitignore`

Sensitive information must never be committed to GitHub:

```text
MONGO_URI
JWT_SECRET
GEMINI_API_KEY
N8N_WEBHOOK_URL
```

---

## Bug Tracking & Debugging

Several development and integration issues were identified and resolved during development and testing.

| Issue | Resolution | Status |
|---|---|---|
| PDF resume text extraction failed | Corrected pdf-parse integration and extraction logic | ✅ Fixed |
| Frontend AI analysis route was not correctly connected | Corrected backend analysis route integration | ✅ Fixed |
| n8n webhook was not registered during requests | Corrected webhook configuration and production workflow | ✅ Fixed |
| Gemini responses required structured validation | Added Validate AI Output stage | ✅ Fixed |
| Multiple candidate responses required aggregation | Added Aggregate Candidate Results stage | ✅ Fixed |
| AI results were not initially displayed through the complete frontend workflow | Connected frontend, backend, database and AI result flow | ✅ Fixed |

---

## Retesting

After resolving identified bugs, the affected modules were tested again.

Retesting covered:

- Resume Upload
- Resume Text Extraction
- Backend API Communication
- n8n Webhook Communication
- Gemini AI Processing
- AI Output Validation
- Candidate Result Aggregation
- Database Operations
- Frontend Result Display
- Candidate Ranking

The corrected workflows produced the expected results after retesting.

---

## Regression Testing

Previously working features were tested again after major fixes to ensure that changes did not negatively affect other modules.

Regression testing covered:

- Registration
- Login
- Logout
- Protected Routes
- Profile
- Dashboard
- Job Criteria Management
- Resume Upload
- Resume Analysis
- Candidate Ranking
- Shortlist
- Database Operations

No major regression issue was identified in the tested core application workflow.

---

## Week 10 Test Summary

| Testing Area | Status |
|---|---|
| Functional Testing | ✅ Completed |
| Authentication Testing | ✅ Completed |
| Authorization Testing | ✅ Completed |
| API Testing | ✅ Completed |
| Database Testing | ✅ Completed |
| AI Feature Testing | ✅ Completed |
| AI Quality Evaluation | ✅ Completed |
| UI/UX Testing | ✅ Completed |
| Responsive Testing | ✅ Completed |
| Security Checks | ✅ Completed |
| Bug Tracking | ✅ Completed |
| Bug Fixing | ✅ Completed |
| Retesting | ✅ Completed |
| Regression Testing | ✅ Completed |

---

# Current Development Status

| Module | Status |
|---|---|
| Project Proposal | ✅ Completed |
| SRS Documentation | ✅ Completed |
| System Design | ✅ Completed |
| UI/UX Design | ✅ Completed |
| Backend Development | ✅ Completed |
| Database Integration | ✅ Completed |
| Authentication | ✅ Completed |
| Protected Routes | ✅ Completed |
| REST APIs | ✅ Completed |
| Job Criteria Management | ✅ Completed |
| Resume Upload | ✅ Completed |
| Resume Text Extraction | ✅ Completed |
| Frontend Development | ✅ Completed |
| Frontend–Backend Integration | ✅ Completed |
| n8n Workflow | ✅ Completed |
| Google Gemini Integration | ✅ Completed |
| Bulk AI Resume Analysis | ✅ Completed |
| AI Output Validation | ✅ Completed |
| Analysis Result Interface | ✅ Completed |
| Candidate Ranking | ✅ Completed |
| Shortlist Module | ✅ Completed |
| Dashboard Analytics | ✅ Completed |
| Major System Integration | ✅ Completed |
| Functional Testing | ✅ Completed |
| API Testing | ✅ Completed |
| Database Testing | ✅ Completed |
| AI Quality Evaluation | ✅ Completed |
| Bug Fixing & Debugging | ✅ Completed |
| Retesting | ✅ Completed |
| Regression Testing | ✅ Completed |
| Security Checks | ✅ Completed |
| Responsive Testing | ✅ Completed |
| Deployment | ⏳ Pending / Optional |

---

# Current Limitations

- AI evaluation depends on the quality of extracted resume text.
- Complex PDF/DOCX layouts may affect text extraction.
- AI-generated evaluations may not always be completely accurate.
- Gemini AI responses may vary slightly for similar inputs.
- Gemini API availability and rate limits may affect processing.
- Internet connectivity is required for AI analysis.
- AI recommendations should support, not replace, final human recruitment decisions.
- Live cloud deployment is currently optional/pending.

---

# Future Development

Future versions of the system may include:

- Improved Resume Parsing
- Semantic Skill Matching
- Weighted Job Criteria
- Advanced Candidate Comparison
- Duplicate Resume Detection
- AI-Generated Interview Questions
- Interview Recommendation System
- Advanced Recruitment Analytics
- AI Workflow Optimization
- Retry and Fallback Mechanisms
- Additional AI Model Support
- Performance Optimization
- Cloud Deployment

---

# Security

The project follows basic security practices including:

- JWT-based Authentication
- Password Hashing using bcryptjs
- Protected Backend Routes
- Environment Variables
- API Key Protection
- Secure Database Configuration
- Unauthorized Access Prevention

Sensitive information must **never** be committed to GitHub.

The following should remain inside `.env` or secure workflow credentials:

```text
MONGO_URI
JWT_SECRET
GEMINI_API_KEY
N8N_WEBHOOK_URL
```

The `.env` file must be included in `.gitignore`.

---

# GitHub Contribution Guidelines

All team members should contribute regularly to the GitHub repository.

Use meaningful commit messages such as:

```text
Added Week 10 software test cases
Tested authentication and protected routes
Added API testing results
Improved AI error handling
Tested Gemini resume analysis workflow
Added AI quality evaluation cases
Fixed resume text extraction issue
Resolved n8n webhook integration issue
Improved responsive interface
Added regression testing documentation
Updated Week 10 testing documentation
```

Avoid unclear commit messages such as:

```text
update
fix
done
final
completed
```

---

# Testing & Quality Assurance

Formal software testing and quality assurance were completed during Week 10.

The testing process covered:

- Functional Testing
- Authentication & Authorization Testing
- REST API Testing
- Database Testing
- AI Feature Testing
- AI Quality Evaluation
- UI/UX Testing
- Responsive Testing
- Basic Security Testing
- Error Handling
- Bug Tracking
- Bug Resolution
- Retesting
- Regression Testing

The complete recruitment workflow was tested from user authentication through job creation, resume upload, AI analysis, candidate ranking, and shortlisting.

Testing was performed using the actual integrated application rather than isolated dummy modules.

The major workflows defined in the current project scope are functional after testing and debugging.

---

# GitHub Repository

**Repository Link:**

```text
YOUR_GITHUB_REPOSITORY_LINK
```

---

# License

This project is developed for academic purposes as part of the **CSE 4204 – Mobile Computing Lab** course at **Northern University of Business and Technology, Khulna**.

---

# Supervisor

**Md. Riaz Mahmud**  
Assistant Professor  
Department of Computer Science & Engineering  
Northern University of Business and Technology, Khulna

---

# Project Status

> **Week 10 Completed — Software Testing, Debugging & Quality Assurance**

The major application modules are now integrated and tested as one working software system.

The frontend, backend, MongoDB database, authentication, resume processing, n8n workflow, Google Gemini AI, AI output validation, candidate ranking, shortlist, dashboard, and major user workflows are functional and have undergone formal testing.

Week 10 testing included functional testing, authentication and authorization testing, API testing, database testing, AI quality evaluation, UI/UX testing, responsive testing, security checks, bug fixing, retesting, and regression testing.

The next phase will focus on **final refinement, performance optimization, documentation improvement, deployment preparation, and final project presentation**.
