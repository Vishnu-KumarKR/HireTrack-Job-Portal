# HireTrack - Premium Applicant Tracking System & Job Portal

<div align="center">
  <img src="Images/05_recruiter_dashboard.png" alt="HireTrack Dashboard" width="850" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
  <p><em>An intuitive, end-to-end applicant tracking system built for the modern recruiter.</em></p>
</div>

---

HireTrack is a production-ready, full-stack Job Portal and Applicant Tracking System (ATS) tailored for both Recruiters and Job Seekers. It features a modern, responsive UI built with React and Tailwind CSS, and a robust, secure REST API built with Node.js and MongoDB. 

This platform completely streamlines the hiring process by providing recruiters with deep pipeline management tools, and providing job seekers with a seamless one-click application experience.

---

## 🚀 The End-to-End Experience (Application Showcase)

### 1. Authentication & Security
<div align="center">
  <img src="Images/01_landing.png" alt="Landing Page" width="300" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/04_login.png" alt="Login Screen" width="300" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/02_register.png" alt="Register Seeker" width="300" style="border-radius: 8px; display: inline-block; margin-bottom: 10px;" />
  <img src="Images/20_register_recruiter.png" alt="Register Recruiter" width="455" style="border-radius: 8px; display: inline-block;" />
</div>
<br>
**What it does:** Users are greeted with a beautiful, responsive landing page. When registering or logging in, the system uses stateless JWT (JSON Web Tokens) and bcrypt password hashing to guarantee bulletproof authentication. Role-Based Access Control (RBAC) instantly routes users to either the Seeker or Recruiter interfaces.

---

### 2. Recruiter Pipeline & Dashboard
<div align="center">
  <img src="Images/05_recruiter_dashboard.png" alt="Recruiter Dashboard" width="850" style="border-radius: 8px;" />
</div>
<br>
**What it does:** The Recruiter Dashboard uses Recharts to visually map out the entire candidate pipeline. It pulls real-time, aggregated data using the MongoDB Aggregation Pipeline to display exactly how many applicants are in the 'Applied', 'Shortlisted', 'Interview', and 'Selected' stages.

---

### 3. Comprehensive Job Management
<div align="center">
  <img src="Images/06_recruiter_jobs.png" alt="Job Management Table" width="850" style="border-radius: 8px;" />
</div>
<br>
**What it does:** Recruiters can effortlessly manage their active postings. The clean, table-based UI allows recruiters to quickly View, Edit, or Delete their jobs. Strict backend data-ownership checks ensure a recruiter can only ever modify their own postings.

---

### 4. Recruiter Application Tracking & Interviews
<div align="center">
  <img src="Images/09_recruiter_applications.png" alt="Applications Tracking Table" width="420" style="border-radius: 8px; display: inline-block; margin-right: 10px;" />
  <img src="Images/11_recruiter_interviews.png" alt="Interviews Tracking Table" width="420" style="border-radius: 8px; display: inline-block;" />
</div>
<br>
**What it does:** Recruiters have dedicated tables to track all inbound applications and scheduled interviews. They can update candidate statuses from dynamic dropdowns and view PDF resumes effortlessly.

---

### 5. Seamless Interview Scheduling Modal
<div align="center">
  <img src="Images/10_recruiter_interview_modal.png" alt="Interview Scheduling Modal" width="850" style="border-radius: 8px;" />
</div>
<br>
**What it does:** From the Applications page, recruiters can click "Schedule Interview" on any candidate to open this premium modal. You can set the Date, Time, Mode (Online/In-person), and Meeting Link. Once submitted, it saves the interview to the database and instantly sends an in-app notification to the job seeker.

---

### 6. Job Seeker Search & Discovery
<div align="center">
  <img src="Images/13_seeker_jobs.png" alt="Seeker Jobs Page" width="850" style="border-radius: 8px;" />
</div>
<br>
**What it does:** When logged in as a Job Seeker, users can explore a rich grid of available jobs. The interface uses modern skeleton loaders while fetching data and provides deep filtering options (by Salary, Location, Experience) to help candidates find exactly what they are looking for.

---

### 7. Seamless Applications & Candidate Tracking
<div align="center">
  <img src="Images/19_seeker_dashboard.png" alt="Seeker Dashboard" width="850" style="border-radius: 8px; margin-bottom: 10px;" />
  <img src="Images/14_seeker_job_details.png" alt="Job Details" width="420" style="border-radius: 8px; display: inline-block; margin-right: 10px; margin-bottom: 10px;" />
  <img src="Images/16_seeker_applications.png" alt="Seeker App Tracking" width="420" style="border-radius: 8px; display: inline-block; margin-bottom: 10px;" />
  <img src="Images/17_seeker_interviews.png" alt="Seeker Interviews Tracking" width="850" style="border-radius: 8px;" />
</div>
<br>
**What it does:** Seekers have a personalized dashboard to track their active pipeline. They can view full job descriptions and click "Apply Now" to dynamically scroll to an integrated application form. Once applied, they track all of their applications in real-time and view any scheduled interviews from their personal dashboard.

---

### 8. Edge Cases, Validations, & Notifications
*A premium application handles edge cases flawlessly.*
<div align="center">
  <img src="Images/03_register_validation_errors.png" alt="Register Validation" width="270" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/08_recruiter_create_job_errors.png" alt="Create Job Validation" width="270" style="border-radius: 8px; display: inline-block; margin-right: 5px; margin-bottom: 10px;" />
  <img src="Images/15_seeker_apply_form_errors.png" alt="Apply Form Validation" width="270" style="border-radius: 8px; display: inline-block; margin-bottom: 10px;" />
  <img src="Images/07_recruiter_edit_job.png" alt="Edit Job Modal" width="270" style="border-radius: 8px; display: inline-block; margin-right: 5px;" />
  <img src="Images/12_recruiter_notifications.png" alt="Recruiter Notifications" width="270" style="border-radius: 8px; display: inline-block; margin-right: 5px;" />
  <img src="Images/18_seeker_notifications.png" alt="Seeker Notifications" width="270" style="border-radius: 8px; display: inline-block;" />
</div>
<br>
**What it does:** 
- **Validations:** Built with `react-hook-form`, the app strictly validates all inputs (checking PDF file sizes, required fields, etc.) *before* hitting the backend.
- **Complex Modals:** Elements like the Edit Job modal pre-populate data instantly without requiring page reloads.
- **Real-Time Polling:** The notifications bell polls the server and displays a red badge when a candidate applies or a recruiter schedules an interview, complete with a beautiful dropdown UI.

---

## 🏗️ Architectural Decisions & Tech Stack

### Frontend (Client)
* **Framework**: React.js with Vite for blazing-fast builds.
* **State Management**: React Context API (`AuthContext`) for global user authentication state.
* **Styling & UI**: Tailwind CSS for a premium, responsive, utility-first design system. Lucide-React for clean iconography.
* **Routing**: `react-router-dom` utilizing protected routes.
* **Forms & Validation**: `react-hook-form` for performant form handling and validation without unnecessary re-renders.

### Backend (Server)
* **Framework**: Node.js and Express.js.
* **Architecture**: Strict MVC (Model-View-Controller) structure ensuring modular, maintainable, and decoupled code.
* **Database**: MongoDB with Mongoose ORM.
* **Data Modeling**: Highly relational document structures referencing ObjectIds (e.g., Applications reference both a Job and a User) to ensure database normalization.
* **File Uploads**: `multer` for secure PDF resume handling, featuring dynamic URL processing to ensure cross-platform compatibility.

---

## 🔒 Security & Privacy

* **Authentication**: Stateless JWT generated on login/registration and verified via HTTP Headers.
* **Password Security**: Passwords are cryptographically hashed using `bcryptjs` before being saved to the database.
* **Anti-Inspection**: The frontend includes global event listeners to disable Right-Click and Developer Tool shortcuts (F12, Ctrl+Shift+I) to protect intellectual property in production.

---

## ⚙️ Installation & Setup

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
Start the frontend development server:
```bash
npm run dev
```

### 4. Seed Dummy Data (Optional)
To populate the database with localized sample jobs (Indian tech companies, INR salaries) and rich application/interview data:
```bash
cd server
node seed/seeder.js --clean
```

---
*Designed and developed as a premium, production-ready full-stack web application.*
