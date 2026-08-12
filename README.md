# AI Resume Analyzer & Candidate Evaluation System

An AI-powered recruitment platform that helps HR/Admin users analyze resumes, evaluate candidates based on job criteria, generate AI-powered rankings, and create shortlists using Google Gemini AI and n8n workflow automation.

---

# Course Information

- **Course:** CSE 4204 – Mobile Computing Lab
- **Department:** Computer Science & Engineering
- **Section:** 8C
- **Team Name:** CSE4204-8C-T04
- **Project Type:** AI-based Web Application

---

# Project Overview

The AI Resume Analyzer & Candidate Evaluation System is designed to simplify the recruitment process by automating resume screening using Artificial Intelligence.

The system allows HR/Admin users to create job criteria, upload candidate resumes, analyze resumes using Google Gemini AI, rank candidates based on AI-generated scores, and generate shortlists for recruitment decisions.

The project uses a modern MERN architecture with AI integration through Gemini API and n8n workflow automation.

---

# Team Members

| SL | Member Name | Student ID | Responsibility |
|----|----------------------|------------|---------------------------------------------|
| 01 | Shaik Taz Uddin | 11220320925 |  Backend Development & API Integration |
| 02 | MD Sakib Al Hasan | 11220320926 | Frontend Development & UI/UX |
| 03 | Jarin Tasnim | 11220320930 | Database Management & Documentation |
| 04 | Md. Junaidul Haque | 11220320932 | AI Integration, Testing & Deployment |

---

# Core Features

### Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

### Job Management
- Create Job Criteria
- Update Job
- Delete Job
- View Job List

### Resume Management
- Upload PDF/DOCX Resume
- Resume Parsing
- Resume Management

### AI Analysis
- Resume Analysis using Google Gemini AI
- AI Match Score
- Skills Extraction
- Experience Detection
- Candidate Recommendation

### Ranking & Shortlisting
- Candidate Ranking
- AI Match Percentage
- Shortlist Generation
- Candidate Status Management

### Dashboard Analytics
- Total Jobs
- Total Resumes
- AI Analysis Statistics
- Top Candidates
- Shortlisted Candidates

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
README.md
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
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

GEMINI_API_KEY=your_gemini_api_key

N8N_WEBHOOK_URL=your_n8n_webhook_url
```

---

# REST API Modules

### Authentication

- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/profile

### Job Management

- POST /jobs
- GET /jobs
- GET /jobs/:jobId
- PUT /jobs/:jobId
- DELETE /jobs/:jobId

### Resume

- POST /resumes/upload
- GET /resumes
- GET /resumes/job/:jobId
- DELETE /resumes/:resumeId

### AI Analysis

- POST /analysis/analyze
- GET /analysis
- GET /analysis/job/:jobId

### Ranking

- POST /ranking/generate/:jobId
- GET /ranking/job/:jobId

### Shortlist

- POST /shortlist/generate/:jobId
- GET /shortlist/job/:jobId

### Analytics

- GET /analytics/dashboard
- GET /analytics/job/:jobId

---

# Weekly Progress

- ✅ Week 01 — Team Formation & Project Idea Selection
- ✅ Week 02 — Project Proposal Completed
- ✅ Week 03 — Software Requirements Specification (SRS) Completed
- ✅ Week 04 — System Design & Software Architecture Completed
- ✅ Week 05 — UI/UX Design & Development Planning Completed
- ✅ Week 06 — Backend Development & Database Implementation Completed
- ✅ Week 07 — Frontend Development & Backend API Integration Completed

---

# Current Development Status

| Module | Status |
|----------|--------|
| Project Proposal | ✅ Completed |
| SRS Documentation | ✅ Completed |
| System Design | ✅ Completed |
| UI/UX Design | ✅ Completed |
| Backend Development | ✅ Completed |
| Database | ✅ Completed |
| Authentication | ✅ Completed |
| REST APIs | ✅ Completed |
| AI Integration | 🚧 In Progress |
| Frontend Development | ✅ Completed |
| Backend Integration | ✅ Completed |
| Testing | ⏳ Pending |
| Deployment | ⏳ Pending |

---

# Future Development

- Complete React Frontend
- Backend API Integration
- AI Workflow Optimization
- Responsive Design
- Deployment
- Final Testing
- Performance Optimization

---

# GitHub Repository

Update this repository regularly with meaningful commit messages and development progress.

---

# License

This project is developed as part of the **CSE 4204 – Mobile Computing Lab** course at **Northern University of Business and Technology, Khulna**.

---

# Supervisor

**Md. Riaz Mahmud**

Assistant Professor

Department of Computer Science & Engineering

Northern University of Business and Technology, Khulna
