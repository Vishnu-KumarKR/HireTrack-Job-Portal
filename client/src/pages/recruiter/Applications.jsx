import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, FileText, Search, UserCheck, CheckCircle2, X } from 'lucide-react';

const RecruiterApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');

    // Schedule Interview Modal State
    const [selectedAppForInterview, setSelectedAppForInterview] = useState(null);
    const [interviewForm, setInterviewForm] = useState({
        date: '',
        time: '',
        mode: 'Online',
        meetingLink: '',
        location: '',
        notes: ''
    });
    const [schedulingLoading, setSchedulingLoading] = useState(false);
    const [schedulingMessage, setSchedulingMessage] = useState('');

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page,
                limit: 10,
                ...(statusFilter && { status: statusFilter })
            });
            const res = await api.get(`/applications/recruiter?${query}`);
            setApplications(res.data.data.applications);
            setTotalPages(res.data.data.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [page, statusFilter]);

    const updateStatus = async (id, newStatus) => {
        try {
            await api.patch(`/applications/${id}/status`, { status: newStatus });
            fetchApplications();
        } catch (error) {
            console.error(error);
            alert('Failed to update application status');
        }
    };

    const handleOpenInterviewModal = (app) => {
        setSelectedAppForInterview(app);
        setInterviewForm({
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            mode: 'Online',
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            location: 'Remote',
            notes: 'Technical discussion round'
        });
        setSchedulingMessage('');
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAppForInterview) return;
        setSchedulingLoading(true);
        setSchedulingMessage('');

        try {
            await api.post('/interviews', {
                application: selectedAppForInterview._id,
                ...interviewForm
            });
            setSchedulingMessage('Interview scheduled successfully!');
            setTimeout(() => {
                setSelectedAppForInterview(null);
                fetchApplications();
            }, 1200);
        } catch (error) {
            console.error(error);
            setSchedulingMessage(error.response?.data?.message || 'Failed to schedule interview');
        } finally {
            setSchedulingLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Applications</h1>
                    <p className="text-sm text-gray-500 mt-1">Review candidate resumes, update status pipeline, and schedule interviews.</p>
                </div>
                
                <div className="w-full sm:w-64">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-primary focus:border-primary bg-white"
                    >
                        <option value="">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                    Loading applications...
                </div>
            ) : applications.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                    No applicant records found for this view.
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied Date</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Pipeline</th>
                                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map(app => (
                                    <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{app.applicant?.name}</div>
                                            <div className="text-xs text-gray-500">{app.applicant?.email} • {app.phone || app.applicant?.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                                            {app.job?.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={app.status}
                                                onChange={(e) => updateStatus(app._id, e.target.value)}
                                                className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer focus:ring-2 focus:ring-primary ${
                                                    app.status === 'Selected' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                    app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                                                    app.status === 'Interview' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                                                    app.status === 'Shortlisted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-blue-50 text-blue-700 border-blue-200'
                                                }`}
                                            >
                                                <option value="Applied">Applied</option>
                                                <option value="Shortlisted">Shortlisted</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Selected">Selected</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                            <a 
                                                href={`http://localhost:5000/${app.resume?.includes('uploads') ? app.resume.substring(app.resume.indexOf('uploads')).replace(/\\/g, '/') : app.resume?.replace(/\\/g, '/')}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-secondary bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100"
                                            >
                                                <FileText className="w-3.5 h-3.5" /> PDF Resume
                                            </a>

                                            <button
                                                onClick={() => handleOpenInterviewModal(app)}
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg shadow-sm"
                                            >
                                                <Calendar className="w-3.5 h-3.5" /> Schedule Interview
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-gray-50/30">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <span className="text-xs font-semibold text-gray-600">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Schedule Interview Modal */}
            {selectedAppForInterview && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setSelectedAppForInterview(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Schedule Interview</h3>
                                <p className="text-xs text-gray-500">Applicant: <span className="font-semibold text-gray-800">{selectedAppForInterview.applicant?.name}</span> ({selectedAppForInterview.job?.title})</p>
                            </div>
                        </div>

                        {schedulingMessage && (
                            <div className={`p-3 rounded-xl text-xs font-medium mb-4 ${schedulingMessage.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                                {schedulingMessage}
                            </div>
                        )}

                        <form onSubmit={handleScheduleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Interview Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={interviewForm.date}
                                        onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Interview Time</label>
                                    <input 
                                        type="time" 
                                        required
                                        value={interviewForm.time}
                                        onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Mode</label>
                                <select 
                                    value={interviewForm.mode}
                                    onChange={(e) => setInterviewForm({...interviewForm, mode: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:ring-primary focus:border-primary"
                                >
                                    <option value="Online">Online Video Call</option>
                                    <option value="In-person">In-person</option>
                                    <option value="Phone">Phone Call</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Meeting Link or Location</label>
                                <input 
                                    type="text" 
                                    value={interviewForm.meetingLink || interviewForm.location}
                                    onChange={(e) => setInterviewForm({...interviewForm, meetingLink: e.target.value, location: e.target.value})}
                                    placeholder="e.g. Google Meet URL or Office Address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-primary focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Notes / Instructions</label>
                                <textarea 
                                    rows="2"
                                    value={interviewForm.notes}
                                    onChange={(e) => setInterviewForm({...interviewForm, notes: e.target.value})}
                                    placeholder="Instructions for the applicant..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-primary focus:border-primary"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedAppForInterview(null)}
                                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={schedulingLoading}
                                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    {schedulingLoading ? 'Scheduling...' : 'Confirm & Send Notification'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterApplications;
