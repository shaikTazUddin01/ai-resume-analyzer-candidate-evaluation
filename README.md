# AI Resume Analyzer & Candidate Evaluation System

## Course Information
- Course: CSE 4204: Mobile Computing Lab
- Section: 8C
- Team Name: CSE4204-8C-T04
- Project Type: AI-based Web Application

## Project Overview
AI Resume Analyzer & Candidate Evaluation System is an AI-powered recruitment support platform that helps HR/Admin users evaluate candidate resumes efficiently. The system analyzes uploaded resumes, compares them with job criteria, generates AI-based scores, ranks candidates, and creates shortlists.

## Team Members
| SL | Member Name | Student ID | Responsibility |
|---|---|---|---|
| 01 | Shaik Taz Uddin | 11220320925 | Frontend Development & UI/UX |
| 02 | MD Sakib Al Hasan | 11220320926 | Backend Development & API Integration |
| 03 | Jarin Tasnim | 11220320930 | Database Management & Documentation |
| 04 | Md. Junaidul Haque | 11220320932 | AI Integration, Testing & Deployment |

## Main Features
- Admin/HR registration and login
- Job criteria creation
- Resume upload and text extraction
- AI-based resume analysis using Gemini API
- n8n workflow automation
- Candidate score and match percentage generation
- Candidate ranking and shortlist generation
- Dashboard analytics

## Technology Stack
- Frontend: React.js, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- AI Service: Google Gemini API
- Workflow Automation: n8n
- Deployment: Vercel (Frontend), Render (Backend)

## Repository Structure
```text
frontend/          React frontend source code
backend/           Node.js + Express backend source code
database/          Database schema and sample data
documentation/     Weekly assignment documents
design/            UI/UX design screens
diagrams/          Architecture, ER, Use Case, Activity, AI workflow diagrams
n8n-workflows/     n8n workflow export files
README.md          Project documentation
```

## Setup Instructions
### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create `.env` inside backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

## Weekly Progress
- Week 01: Team formation and initial project idea completed
- Week 02: Project proposal completed
- Week 03: SRS and diagrams completed
- Week 04: System design and architecture completed
- Week 05: UI/UX design and development planning completed
