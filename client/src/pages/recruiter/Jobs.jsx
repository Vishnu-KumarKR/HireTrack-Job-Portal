import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const RecruiterJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [jobToDelete, setJobToDelete] = useState(null);
    const [jobToView, setJobToView] = useState(null);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/jobs?myJobs=true&page=${page}&limit=10`);
            setJobs(res.data.data.jobs);
            setTotalPages(res.data.data.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch jobs');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [page]);

    const confirmDelete = async () => {
        if (!jobToDelete) return;
        try {
            await api.delete(`/jobs/${jobToDelete}`);
            toast.success('Job deleted successfully');
            setJobToDelete(null);
            fetchJobs();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete job');
            setJobToDelete(null);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Published' ? 'Closed' : 'Published';
        try {
            await api.patch(`/jobs/${id}/status`, { status: newStatus });
            toast.success(`Job status updated to ${newStatus}`);
            fetchJobs();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update status');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
                <Link to="/recruiter/jobs/create" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium">
                    Post New Job
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
                    You haven't posted any jobs yet.
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {jobs.map(job => (
                                <tr key={job._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                        <div className="text-sm text-gray-500">{job.employmentType}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {job.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button 
                                            onClick={() => toggleStatus(job._id, job.status)}
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full hover:opacity-80 transition-opacity
                                            ${job.status === 'Published' ? 'bg-green-100 text-green-800' : 
                                              job.status === 'Closed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {job.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(job.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-3">
                                            <button onClick={() => setJobToView(job)} className="text-blue-500 hover:text-blue-700" title="View Job Details">
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <Link to={`/recruiter/jobs/${job._id}/edit`} className="text-yellow-500 hover:text-yellow-700" title="Edit Job">
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            <button onClick={() => setJobToDelete(job._id)} className="text-red-500 hover:text-red-700" title="Delete Job">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {jobToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-bold mb-4 text-gray-900">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={() => setJobToDelete(null)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Job Modal */}
            {jobToView && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-gray-900">{jobToView.title}</h2>
                            <button onClick={() => setJobToView(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Company</p>
                                    <p className="text-gray-900">{jobToView.company}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Location</p>
                                    <p className="text-gray-900">{jobToView.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Employment Type</p>
                                    <p className="text-gray-900">{jobToView.employmentType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Salary Range</p>
                                    <p className="text-gray-900">₹{jobToView.salaryMin?.toLocaleString() || 0} - ₹{jobToView.salaryMax?.toLocaleString() || 0}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Experience</p>
                                    <p className="text-gray-900">{jobToView.experienceMin || 0} - {jobToView.experienceMax || 0} Years</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Status</p>
                                    <p className="text-gray-900">{jobToView.status}</p>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Skills Required</p>
                                <div className="flex flex-wrap gap-2">
                                    {jobToView.skills.map((skill, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Description</p>
                                <div className="text-gray-700 whitespace-pre-wrap text-sm border p-3 rounded-md bg-gray-50">
                                    {jobToView.description}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
                            <button 
                                onClick={() => setJobToView(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecruiterJobs;
