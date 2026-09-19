import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

const AuthLayout = () => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-50">Loading...</div>;
    }

    if (isAuthenticated) {
        const redirectPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/seeker/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-3xl">
                        <Briefcase className="h-8 w-8" />
                        HireTrack
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome to HireTrack
                </h2>
            </div>
            
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
