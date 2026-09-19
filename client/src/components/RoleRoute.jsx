import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        // Redirect to their respective dashboard if they try to access wrong role route
        const redirectPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/seeker/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default RoleRoute;
