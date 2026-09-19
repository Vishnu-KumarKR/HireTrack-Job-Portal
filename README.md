# HireTrack — Premium Job Portal & ATS

<div align="center">

<img src="Images/05_recruiter_dashboard.png" alt="HireTrack Recruiter Dashboard" width="850" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />

### A full-stack MERN Job Portal and Applicant Tracking System for modern recruiters and job seekers.

[Features](#-features) • [Application Flow](#-application-flow) • [Tech Stack](#%EF%B8%8F-technology-stack) • [Architecture](#%EF%B8%8F-architecture) • [Setup](#%E2%9A%99%EF%B8%8F-installation--setup) • [Security](#-security) • [API](#-api-overview)

</div>

---

## 📌 Project Overview

**HireTrack** is a production-ready, full-stack **Job Portal and Applicant Tracking System (ATS)** built using the **MERN stack — MongoDB, Express.js, React.js, and Node.js**.

The platform provides deeply tailored experiences for both **Job Seekers** and **Recruiters**.

- **Job Seekers** can discover jobs using advanced filtering, apply instantly with their resumes, track application progress in real-time, view scheduled interviews, and receive immediate in-app notifications.
- **Recruiters** can seamlessly create and manage job postings, review rich applicant profiles, manage candidate pipeline statuses, schedule interviews via dynamic modals, and monitor entire recruitment statistics through a dedicated dashboard.

The project is highly focused on:
* Secure, stateless JWT authentication
* Strict role-based authorization (RBAC)
* Seamless job discovery and filtering
* Comprehensive application tracking
* Real-time interview scheduling
* Interactive in-app notifications
* Server-side pagination and performance
* Bulletproof input validation
* A premium, responsive UI/UX

---

# 🚀 Features & Application Showcase

## 👤 1. Authentication & Role-Based Access

HireTrack provides bulletproof authentication for both Job Seekers and Recruiters.

<div align="center">
  <img src="Images/01_landing.png" alt="Landing Page" width="300" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/04_login.png" alt="Login Screen" width="300" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/02_register.png" alt="Register Seeker" width="300" style="border-radius: 8px; display: inline-block; margin-bottom: 10px;" />
  <img src="Images/20_register_recruiter.png" alt="Register Recruiter" width="455" style="border-radius: 8px; display: inline-block;" />
</div>

**Highlights:**
* Users are greeted with a beautiful, responsive landing page.
* Registration and login use stateless JWT and bcrypt password hashing.
* Role-Based Access Control (RBAC) instantly routes users to their specific dashboards upon login.

---

## 📊 2. Recruiter Dashboard

The Recruiter Dashboard provides an eagle-eye overview of the entire recruitment pipeline.

<div align="center">
  <img src="Images/05_recruiter_dashboard.png" alt="Recruiter Dashboard with recruitment statistics and charts" width="850" style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
</div>

**Highlights:**
* The dashboard uses **Recharts** to beautifully visualize application data retrieved directly from the backend.
* It displays Total Jobs, Published Jobs, Application Statistics, and Candidate Pipelines.
* Visualizes real-time candidate distribution across Applied, Shortlisted, Interview, Selected, and Rejected stages.

---

## 💼 3. Job Management

Recruiters can manage their active job postings from a dedicated, powerful interface.

<div align="center">
  <img src="Images/06_recruiter_jobs.png" alt="Recruiter Job Management" width="850" style="border-radius: 8px;" />
</div>

**Highlights:**
* Recruiters can effortlessly Create, Edit, Publish, Close, and Delete jobs.
* Backend data-ownership checks strictly ensure that recruiters can only modify their *own* job postings.

---

## 👥 4. Application & Interview Management

Recruiters can meticulously track applications submitted to their job postings.

<div align="center">
  <img src="Images/09_recruiter_applications.png" alt="Recruiter Application Management" width="420" style="border-radius: 8px; display: inline-block; margin-right: 10px;" />
  <img src="Images/11_recruiter_interviews.png" alt="Recruiter Interview Management" width="420" style="border-radius: 8px; display: inline-block;" />
</div>

**Highlights:**
* Review comprehensive application details and instantly view uploaded PDF resumes.
* Update application statuses (Shortlisted, Interview, Selected) from dynamic dropdowns.
* Track all scheduled upcoming interviews.

---

## 📅 5. Seamless Interview Scheduling

Recruiters can schedule interviews directly from the application management interface via a premium modal.

<div align="center">
  <img src="Images/10_recruiter_interview_modal.png" alt="Interview Scheduling Modal" width="850" style="border-radius: 8px;" />
</div>

**Highlights:**
* Easily set the Interview Date, Time, Mode (Online/In-person), and Meeting Link.
* Once scheduled, the application instantly moves to the **Interview** stage, and a live notification is sent to the job seeker.

---

## 🔎 6. Job Search & Discovery

Job seekers can browse available opportunities through a lightning-fast discovery interface.

<div align="center">
  <img src="Images/13_seeker_jobs.png" alt="Job Seeker Job Search and Filtering" width="850" style="border-radius: 8px;" />
</div>

**Highlights:**
* Seekers can deep-filter jobs based on Title, Location, Salary, Experience, and Employment Type.
* Uses modern skeleton loaders while fetching data.
* Implements robust **server-side search, filtering, and pagination** to handle massive data seamlessly.

---

## 📝 7. Application Tracking & Dashboards

Job seekers have a personalized dashboard to track their active pipeline.

<div align="center">
  <img src="Images/19_seeker_dashboard.png" alt="Job Seeker Dashboard" width="850" style="border-radius: 8px; margin-bottom: 10px;" />
  <img src="Images/14_seeker_job_details.png" alt="Job Details and Application Form" width="420" style="border-radius: 8px; display: inline-block; margin-right: 10px; margin-bottom: 10px;" />
  <img src="Images/16_seeker_applications.png" alt="Job Seeker Application Tracking" width="420" style="border-radius: 8px; display: inline-block; margin-bottom: 10px;" />
  <img src="Images/17_seeker_interviews.png" alt="Job Seeker Interview Tracking" width="850" style="border-radius: 8px;" />
</div>

**Highlights:**
* Full visibility into complete job descriptions and required skills.
* Clicking "Apply Now" dynamically scrolls to an integrated application form for PDF resume upload.
* Seekers can track all applications in real-time without ever needing to email a recruiter manually.

---

## 🔔 8. Real-Time Notifications

HireTrack provides beautiful in-app notifications for important recruitment events.

<div align="center">
  <img src="Images/12_recruiter_notifications.png" alt="Recruiter Notifications" width="270" style="border-radius: 8px; display: inline-block; margin-right: 10px;" />
  <img src="Images/18_seeker_notifications.png" alt="Job Seeker Notifications" width="270" style="border-radius: 8px; display: inline-block;" />
</div>

**Highlights:**
* Notifications poll silently and display a red unread badge when triggered.
* Seekers are notified immediately upon application status changes or scheduled interviews.
* Recruiters are notified instantly when a candidate submits an application.

---

## ✅ 9. Edge Cases & Validation

A premium application handles edge cases flawlessly. HireTrack validates user input vigorously on both the frontend and backend.

<div align="center">
  <img src="Images/03_register_validation_errors.png" alt="Registration Validation Errors" width="270" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/08_recruiter_create_job_errors.png" alt="Create Job Validation Errors" width="270" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/15_seeker_apply_form_errors.png" alt="Job Application Validation Errors" width="270" style="border-radius: 8px; display: inline-block; margin-bottom: 10px;" />
  <img src="Images/07_recruiter_edit_job.png" alt="Recruiter Edit Job Modal" width="270" style="border-radius: 8px; display: inline-block;" />
</div>

**Highlights:**
* Powered by `react-hook-form`, forms check PDF sizes, emails, passwords, and required fields *before* hitting the server.
* Complex modals dynamically pre-populate data instantly without page reloads.

---

# 🏗️ Architecture

HireTrack follows a strict, modular full-stack architecture ensuring decoupled and scalable code.

```text
                    React Frontend
                         │
                         │ Axios / REST API
                         ▼
                  Express.js API
                         │
              ┌──────────┴──────────┐
              │                     │
        Authentication         Controllers
              │                     │
              └──────────┬──────────┘
                         ▼
                    Services
                         │
                         ▼
                     Mongoose
                         │
                         ▼
                     MongoDB
```

---

# 🛠️ Technology Stack

## Frontend (Client)
| Technology | Purpose |
| :--- | :--- |
| **React.js** | User Interface |
| **Vite** | Blazing-fast build tool |
| **Tailwind CSS** | Premium, responsive styling |
| **React Hook Form** | Performant form handling |
| **React Router** | Protected client-side routing |
| **Recharts** | Interactive dashboard charts |
| **Lucide React** | Clean, modern iconography |

## Backend (Server)
| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express** | REST API framework |
| **MongoDB & Mongoose**| Database & ODM |
| **JWT & bcryptjs** | Stateless auth & password hashing |
| **Multer** | Secure resume/PDF file uploads |
| **Helmet & CORS** | Security headers & cross-origin config |

---

# 🗄️ Database Structure

Highly relational document structures referencing ObjectIds ensuring database normalization.

### Main Collections
```text
User
 │
 ├── Job
 │     │
 │     └── Application
 │              │
 │              └── Interview
 │
 └── Notification
```

---

# 🔐 Security & Privacy

HireTrack implements robust security measures at every layer:

* **Stateless JWT Authentication:** Verified via HTTP Headers.
* **Password Cryptography:** Hashes via `bcryptjs`.
* **Resource Authorization:** Backend strictly validates `ObjectId` ownership to prevent cross-account modifications.
* **Anti-Inspection:** Global event listeners optionally disable right-click and dev-tools to protect IP in production.
* **File Upload Security:** Restricts uploads strictly to `.pdf` formats and enforces maximum file sizes securely via Multer.

---

# ⚙️ Installation & Setup

### Prerequisites
* Node.js (v16+)
* MongoDB (Local or Atlas URL)

### 1. Clone the repository
```bash
git clone https://github.com/Vishnu-KumarKR/HireTrack-Job-Portal.git
cd HireTrack-Job-Portal
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```
Create a `.env` file in the `/client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Seed Dummy Data (Optional)
To populate the database with extremely rich sample jobs, applicants, and pipeline data for immediate demonstration:
```bash
cd server
node seed/seeder.js --clean
```

---

# 👨‍💻 Developer

**Vishnu Kumar K R**  
B.E. Computer Science & Engineering  
GitHub: [Vishnu-KumarKR](https://github.com/Vishnu-KumarKR)

---

<div align="center">
  <h3>HireTrack</h3>
  <p><em>Connecting talent with opportunities through a modern, seamless recruitment workflow.</em></p>
</div>
