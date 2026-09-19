import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

const SeekerJobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const locationInfo = useLocation();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applicationStatus, setApplicationStatus] = useState(null); // 'none', 'applied'
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const formRef = useRef(null);
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        fetchJobDetails();
        checkApplicationStatus();
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            const res = await api.get(`/jobs/${id}`);
            setJob(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Failed to load job details.');
            setLoading(false);
        }
    };

    const checkApplicationStatus = async () => {
        try {
            // Quick check if applied
            const res = await api.get(`/applications/my?job=${id}`);
            // Filter down if necessary because query might not perfectly match
            const applied = res.data.data.applications.find(a => a.job._id === id || a.job === id);
            if (applied) {
                setApplicationStatus('applied');
            } else {
                setApplicationStatus('none');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onApply = async (data) => {
        try {
            setError('');
            const formData = new FormData();
            formData.append('job', id);
            formData.append('phone', data.phone);
            formData.append('coverLetter', data.coverLetter);
            formData.append('additionalDetails', data.additionalDetails);
            if (data.resume[0]) {
                formData.append('resume', data.resume[0]);
            }

            await api.post('/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setSuccess('Application submitted successfully!');
            setShowApplyForm(false);
            setApplicationStatus('applied');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        }
    };

    const handleApplyClick = () => {
        if (!showApplyForm) {
            setShowApplyForm(true);
            setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            setShowApplyForm(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading job details...</div>;
    if (!job) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <p className="text-lg text-primary font-medium mb-4">{job.company}</p>
                        </div>
                        {job.status === 'Closed' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                Applications Closed
                            </span>
                        ) : applicationStatus === 'applied' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Application Submitted
                            </span>
                        ) : (
                            <button
                                onClick={handleApplyClick}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary"
                            >
                                {showApplyForm ? 'Cancel Application' : 'Apply Now'}
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border-t border-b border-gray-200 py-6">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                            {job.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                            {job.employmentType}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                            ₹{job.salaryMin} - ₹{job.salaryMax}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="h-5 w-5 mr-2 text-gray-400" />
                            {job.experienceMin} - {job.experienceMax} years exp.
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Job Description</h2>
                        <div className="text-gray-700 whitespace-pre-line">{job.description}</div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Form */}
            {showApplyForm && job.status === 'Published' && applicationStatus !== 'applied' && (
                <div ref={formRef} className="bg-white shadow rounded-lg overflow-hidden p-6 md:p-8 mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Application</h2>
                    
                    {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-sm text-red-700">{error}</div>}
                    {success && <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 text-sm text-green-700">{success}</div>}

                    <form onSubmit={handleSubmit(onApply)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                            <input
                                type="text"
                                {...register('phone', { required: 'Phone number is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Resume (PDF only, max 5MB) *</label>
                            <input
                                type="file"
                                accept=".pdf"
                                {...register('resume', { 
                                    required: 'Resume is required',
                                    validate: {
                                        lessThan5MB: files => files[0]?.size < 5000000 || 'Max size is 5MB',
                                        isPdf: files => files[0]?.type === 'application/pdf' || 'Only PDF allowed'
                                    }
                                })}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                            <textarea
                                {...register('coverLetter')}
                                rows={4}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                            <textarea
                                {...register('additionalDetails')}
                                rows={2}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SeekerJobDetails;
