import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Briefcase, Users, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RecruiterDashboard = () => {
    const [stats, setStats] = useState({
        totalJobs: 0,
        publishedJobs: 0,
        closedJobs: 0,
        totalApplications: 0,
        applied: 0,
        shortlisted: 0,
        interviews: 0,
        selected: 0,
        rejected: 0
    });
    const [recentJobs, setRecentJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats from backend
            const statsRes = await api.get('/jobs/dashboard/stats');
            const data = statsRes.data.data;
            
            // Fetch recent jobs
            const jobsRes = await api.get('/jobs?myJobs=true&limit=5');
            setRecentJobs(jobsRes.data.data.jobs);
            
            setStats({
                totalJobs: data.totalJobs,
                publishedJobs: data.publishedJobs,
                closedJobs: data.closedJobs,
                totalApplications: data.totalApplications,
                applied: data.applied,
                shortlisted: data.shortlisted,
                interviews: data.interviews,
                selected: data.selected,
                rejected: data.rejected
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

    const chartData = [
        { name: 'Applied', count: stats.applied || 0 },
        { name: 'Shortlisted', count: stats.shortlisted || 0 },
        { name: 'Interview', count: stats.interviews || 0 },
        { name: 'Selected', count: stats.selected || 0 },
        { name: 'Rejected', count: stats.rejected || 0 },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
                <Link to="/recruiter/jobs/create" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                    Post New Job
                </Link>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <StatCard title="Total Jobs" count={stats.totalJobs} icon={<Briefcase />} color="bg-blue-100 text-blue-600" />
                <StatCard title="Active Jobs" count={stats.publishedJobs} icon={<CheckCircle />} color="bg-green-100 text-green-600" />
                <StatCard title="Total Applications" count={stats.totalApplications} icon={<Users />} color="bg-purple-100 text-purple-600" />
                <StatCard title="Shortlisted" count={stats.shortlisted} icon={<FileText />} color="bg-yellow-100 text-yellow-600" />
                <StatCard title="Interviews" count={stats.interviews} icon={<Users />} color="bg-indigo-100 text-indigo-600" />
                <StatCard title="Closed Jobs" count={stats.closedJobs} icon={<Briefcase />} color="bg-gray-100 text-gray-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Application Pipeline Chart */}
                <div className="lg:col-span-1 bg-white shadow rounded-lg overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Application Pipeline</h2>
                    </div>
                    <div className="p-4 flex-grow" style={{ minHeight: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                                <Tooltip 
                                    cursor={{ fill: '#f3f4f6' }} 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                                />
                                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Jobs */}
                <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Recent Jobs</h2>
                        <Link to="/recruiter/jobs" className="text-primary hover:text-secondary text-sm font-medium">View all</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No jobs posted yet.</td>
                                    </tr>
                                ) : (
                                    recentJobs.map(job => (
                                        <tr key={job._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${job.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
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

export default RecruiterDashboard;
