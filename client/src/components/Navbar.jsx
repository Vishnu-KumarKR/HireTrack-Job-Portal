import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, User as UserIcon, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
        }
    }, [isAuthenticated]);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications');
            setNotifications(res.data.data);
            setUnreadCount(res.data.data.filter(n => !n.isRead).length);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNotificationClick = async (id) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error(error);
        }
    };

    const markAllRead = async () => {
        try {
            await api.patch('/notifications/read-all');
            fetchNotifications();
        } catch (error) {
            console.error(error);
        }
    };

    const navLinks = user?.role === 'recruiter' 
        ? [
            { name: 'Dashboard', path: '/recruiter/dashboard' },
            { name: 'My Jobs', path: '/recruiter/jobs' },
            { name: 'Applications', path: '/recruiter/applications' },
            { name: 'Interviews', path: '/recruiter/interviews' },
        ]
        : user?.role === 'seeker' ? [
            { name: 'Find Jobs', path: '/seeker/jobs' },
            { name: 'My Applications', path: '/seeker/applications' },
            { name: 'Interviews', path: '/seeker/interviews' },
            { name: 'Dashboard', path: '/seeker/dashboard' },
        ] : [];

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                                <Briefcase className="h-6 w-6" />
                                HireTrack
                            </Link>
                        </div>
                        {isAuthenticated && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <button 
                                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <Bell className="h-6 w-6" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">{unreadCount}</span>
                                        )}
                                    </button>
                                    
                                    {notificationsOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                                            <div className="px-4 py-2 border-b flex justify-between items-center">
                                                <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                                                <button onClick={markAllRead} className="text-xs text-primary hover:text-secondary">Mark all read</button>
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <p className="px-4 py-2 text-sm text-gray-500">No notifications</p>
                                                ) : (
                                                    notifications.map(n => (
                                                        <div 
                                                            key={n._id} 
                                                            onClick={() => handleNotificationClick(n._id)}
                                                            className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50 ${n.isRead ? 'bg-white' : 'bg-blue-50'}`}
                                                        >
                                                            <p className="text-sm font-medium text-gray-900">{n.title}</p>
                                                            <p className="text-sm text-gray-500">{n.message}</p>
                                                            <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 flex items-center"
                                >
                                    <LogOut className="h-5 w-5 mr-1" />
                                    <span className="text-sm font-medium">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-500 hover:text-gray-900 font-medium text-sm">Log in</Link>
                                <Link to="/register" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
