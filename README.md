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

The system analyzes multiple candidate resumes against a selected job criteria using **Google Gemini AI**.

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

Processes the incoming data and creates a structured AI prompt for each candidate resume.

### 3. Gemini Resume Analysis

Sends the generated prompt to the Google Gemini API and receives the AI-generated candidate evaluation.

### 4. Validate AI Output

Validates and cleans the AI-generated response before it is used by the application.

### 5. Aggregate Candidate Results

Combines all successfully analyzed candidate results into a single structured response.

The response also contains:

- Total Processed
- Total Analyzed
- Total Failed
- Candidate Results
- Errors

### 6. Return Analysis Results

Returns the final AI analysis response to the backend.

---

# AI Analysis Output

For each candidate, the AI system can generate structured information such as:

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

The application is designed to handle different AI response scenarios.

The workflow considers:

- Successful AI Response
- Invalid AI Response
- Empty AI Response
- Gemini API Error
- Network Failure
- Rate Limit
- Timeout
- Invalid JSON
- Failed Candidate Analysis

This prevents the entire application from failing if the AI service temporarily becomes unavailable or returns an unexpected response.

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

The Gemini API credential should also be stored securely in the environment or n8n credential/configuration system and should never be committed to the repository.

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

HR/Admin creates a job and defines information such as:

- Job Title
- Job Description
- Required Skills
- Experience Level

### Step 2 — Upload Resumes

Multiple PDF/DOCX resumes can be uploaded under the selected job.

### Step 3 — Resume Text Extraction

The backend automatically extracts readable text from uploaded resumes.

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

Candidates can then be ranked based on the AI analysis results.

---

# Example Bulk AI Response

```json
{
  "success": true,
  "totalProcessed": 2,
  "totalAnalyzed": 2,
  "totalFailed": 0,
  "results": [
    {
      "candidateName": "Candidate One",
      "matchPercentage": 100,
      "aiScore": 90,
      "recommendation": "Highly Recommended"
    },
    {
      "candidateName": "Candidate Two",
      "matchPercentage": 60,
      "aiScore": 40,
      "recommendation": "Not Recommended"
    }
  ],
  "errors": []
}
```

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

---


# Week 09 Integration & Mid-Project Review

Week 09 focused on bringing the major modules together into one complete and usable software system.

The following integration work was completed and verified:

- ✅ Frontend–Backend Integration
- ✅ Real Database Data Integration
- ✅ Authentication Workflow Verification
- ✅ Protected Route Verification
- ✅ Job Criteria CRUD Integration
- ✅ Multiple Resume Upload Integration
- ✅ Resume Text Extraction
- ✅ Backend → n8n Communication
- ✅ n8n → Google Gemini AI Integration
- ✅ Bulk Resume Analysis
- ✅ AI Output Validation
- ✅ AI Result Aggregation
- ✅ Frontend AI Result Display
- ✅ Candidate Ranking Integration
- ✅ Shortlist Integration
- ✅ Dashboard Integration
- ✅ Loading, Success, Error and Empty States
- ✅ Responsive Interface Review
- ✅ Major End-to-End Recruitment Workflow

## Major End-to-End Workflow

```text
Registration / Login
        ↓
Dashboard
        ↓
Create Job Criteria
        ↓
Upload Multiple Resumes
        ↓
Backend Resume Text Extraction
        ↓
Select Job
        ↓
Analyze All Resumes
        ↓
Backend Processing
        ↓
n8n Workflow
        ↓
Google Gemini AI
        ↓
Validate & Aggregate Results
        ↓
Backend / Database Processing
        ↓
Frontend Result Display
        ↓
Candidate Ranking
        ↓
Shortlist
        ↓
Logout
```

## Week 09 Feature Completion Checklist

| Feature | Status | Remarks |
|---|---|---|
| Registration | ✅ Completed | Working authentication workflow |
| Login | ✅ Completed | JWT authentication |
| Logout | ✅ Completed | Authentication state cleared |
| Protected Routes | ✅ Completed | Unauthorized access restricted |
| Profile | ✅ Completed | User profile module available |
| Dashboard | ✅ Completed | Uses actual system data |
| Job Criteria CRUD | ✅ Completed | Create, read, update and delete |
| Multiple Resume Upload | ✅ Completed | PDF/DOCX supported |
| Resume Text Extraction | ✅ Completed | Backend extraction integrated |
| Bulk AI Analysis | ✅ Completed | Gemini + n8n |
| AI Output Validation | ✅ Completed | Structured validation workflow |
| AI Result Display | ✅ Completed | Frontend result interface |
| Candidate Ranking | ✅ Completed | AI-based ranking |
| Shortlist | ✅ Completed | Integrated shortlist workflow |
| Database Integration | ✅ Completed | MongoDB + Mongoose |
| Frontend–Backend Integration | ✅ Completed | Major modules connected |
| Error Handling | ✅ Core Handling Implemented | Formal edge-case testing can continue |
| Mobile Responsiveness | ✅ Implemented | Final visual review completed |
| Deployment | ⏳ Pending / Optional | Live deployment if available |

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
| Error Handling | ✅ Core Handling Implemented |
| Responsive UI | ✅ Implemented |
| Formal Testing & Debugging | 🔜 Next Phase |
| Deployment | ⏳ Pending / Optional |

---

# Current Limitations

- AI evaluation depends on the quality of extracted resume text.
- Complex PDF/DOCX layouts may affect text extraction.
- AI-generated evaluations may not always be completely accurate.
- Gemini API availability and rate limits may affect processing.
- Internet connectivity is required for AI analysis.
- AI recommendations should support, not replace, final human recruitment decisions.

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
- Complete Production Testing

---

# Security

The project follows basic security practices including:

- JWT-based Authentication
- Password Hashing using bcryptjs
- Protected Backend Routes
- Environment Variables
- API Key Protection
- Secure Database Configuration

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
Integrated n8n AI workflow
Integrated Google Gemini API
Added bulk resume analysis
Added resume text extraction
Connected backend with n8n webhook
Added AI output validation
Added candidate ranking
Improved AI response handling
Updated Week 08 documentation
```

Avoid unclear commit messages such as:

```text
update
done
final
completed
```

---

# Testing

The major integrated workflows have been tested, including:

- New User Registration
- Existing User Login
- Logout
- Protected Routes
- Profile Access
- Job Criteria CRUD
- Multiple Resume Upload
- Resume Text Extraction
- Database Operations
- Job Selection
- Backend API Communication
- n8n Webhook Communication
- Google Gemini AI Response
- AI Output Validation
- Multiple Candidate Processing
- Result Aggregation
- Frontend Result Display
- Candidate Ranking
- Shortlist Workflow
- Navigation Between Major Pages
- Responsive Interface
- Invalid / Missing Input Handling
- Core API / AI Failure Handling

Formal testing, debugging, optimization, and additional edge-case verification will continue in the next development phase.

---

# Mid-Project Review Readiness

The current system is ready to demonstrate the following integrated features:

- Registration and Login
- Dashboard
- Job Criteria Management
- Multiple Resume Upload
- Resume Text Extraction
- Database Operations
- Frontend–Backend Integration
- Bulk AI Resume Analysis
- n8n Workflow
- Google Gemini AI
- AI Analysis Results
- Candidate Ranking
- Shortlist
- Logout and Protected Routes

Each team member should be able to explain the module they contributed to and how it integrates with the complete application.

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

> **Week 09 Completed — Feature Completion, Integration & Mid-Project Review**

The major application modules are now integrated into one working software system. The frontend, backend, MongoDB database, authentication, resume processing, n8n workflow, Google Gemini AI, AI output validation, candidate ranking, shortlist, and dashboard workflows are functional.

The next development phase will focus on **formal testing, debugging, optimization, documentation refinement, and optional deployment**.
