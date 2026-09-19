import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SeekerDashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        shortlisted: 0,
        interview: 0,
        selected: 0,
        rejected: 0
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get('/applications/my?limit=5');
            const apps = res.data.data.applications;
            setRecentApplications(apps);
            
            // To get accurate total stats we would ideally have a dedicated stats endpoint.
            // For now, let's fetch all applications without pagination to calculate stats,
            // or we could assume the API provides it.
            const allRes = await api.get('/applications/my?limit=100');
            const allApps = allRes.data.data.applications;
            
            const counts = {
                total: allApps.length,
                applied: allApps.filter(a => a.status === 'Applied').length,
                shortlisted: allApps.filter(a => a.status === 'Shortlisted').length,
                interview: allApps.filter(a => a.status === 'Interview').length,
                selected: allApps.filter(a => a.status === 'Selected').length,
                rejected: allApps.filter(a => a.status === 'Rejected').length
            };
            setStats(counts);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Seeker Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <StatCard title="Total" count={stats.total} icon={<Briefcase />} color="bg-blue-100 text-blue-600" />
                <StatCard title="Applied" count={stats.applied} icon={<Clock />} color="bg-gray-100 text-gray-600" />
                <StatCard title="Shortlisted" count={stats.shortlisted} icon={<CheckCircle />} color="bg-yellow-100 text-yellow-600" />
                <StatCard title="Interview" count={stats.interview} icon={<Briefcase />} color="bg-purple-100 text-purple-600" />
                <StatCard title="Selected" count={stats.selected} icon={<CheckCircle />} color="bg-green-100 text-green-600" />
                <StatCard title="Rejected" count={stats.rejected} icon={<XCircle />} color="bg-red-100 text-red-600" />
            </div>

            {/* Recent Applications */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                    <Link to="/seeker/applications" className="text-primary hover:text-secondary text-sm font-medium">View all</Link>
                </div>
                <ul className="divide-y divide-gray-200">
                    {recentApplications.length === 0 ? (
                        <li className="px-6 py-4 text-gray-500">No applications yet.</li>
                    ) : (
                        recentApplications.map(app => (
                            <li key={app._id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-primary truncate">{app.job?.title}</p>
                                        <p className="text-sm text-gray-500">{app.job?.company} &bull; {app.job?.location}</p>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${app.status === 'Selected' ? 'bg-green-100 text-green-800' : 
                                              app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                                              app.status === 'Interview' ? 'bg-purple-100 text-purple-800' : 
                                              'bg-blue-100 text-blue-800'}`}>
                                            {app.status}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

const StatCard = ({ title, count, icon, color }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
            <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
                    {icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="text-lg font-bold text-gray-900">{count}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
);

export default SeekerDashboard;
