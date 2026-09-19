import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Seeker Pages
import SeekerDashboard from './pages/seeker/Dashboard';
import SeekerJobs from './pages/seeker/Jobs';
import SeekerJobDetails from './pages/seeker/JobDetails';
import SeekerApplications from './pages/seeker/Applications';
import SeekerInterviews from './pages/seeker/Interviews';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterJobs from './pages/recruiter/Jobs';
import CreateJob from './pages/recruiter/CreateJob';
import EditJob from './pages/recruiter/EditJob';
import RecruiterApplications from './pages/recruiter/Applications';
import ApplicationDetails from './pages/recruiter/ApplicationDetails';
import RecruiterInterviews from './pages/recruiter/Interviews';

import { Toaster } from 'react-hot-toast';

function App() {
  // Disable inspect element (right click, F12, Ctrl+Shift+I)
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Seeker Routes */}
          <Route path="/seeker/*" element={
            <RoleRoute allowedRoles={['seeker']}>
              <MainLayout>
                <Routes>
                  <Route path="dashboard" element={<SeekerDashboard />} />
                  <Route path="jobs" element={<SeekerJobs />} />
                  <Route path="jobs/:id" element={<SeekerJobDetails />} />
                  <Route path="applications" element={<SeekerApplications />} />
                  <Route path="interviews" element={<SeekerInterviews />} />
                </Routes>
              </MainLayout>
            </RoleRoute>
          } />

          {/* Recruiter Routes */}
          <Route path="/recruiter/*" element={
            <RoleRoute allowedRoles={['recruiter']}>
              <MainLayout>
                <Routes>
                  <Route path="dashboard" element={<RecruiterDashboard />} />
                  <Route path="jobs" element={<RecruiterJobs />} />
                  <Route path="jobs/create" element={<CreateJob />} />
                  <Route path="jobs/:id/edit" element={<EditJob />} />
                  <Route path="applications" element={<RecruiterApplications />} />
                  <Route path="applications/:id" element={<ApplicationDetails />} />
                  <Route path="interviews" element={<RecruiterInterviews />} />
                </Routes>
              </MainLayout>
            </RoleRoute>
          } />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
