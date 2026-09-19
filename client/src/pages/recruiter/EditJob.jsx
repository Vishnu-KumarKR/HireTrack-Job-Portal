import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/jobs/${id}`);
                const jobData = res.data.data;
                // Format skills back to string
                const formattedJobData = {
                    ...jobData,
                    skills: jobData.skills.join(', ')
                };
                reset(formattedJobData);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to load job details');
                navigate('/recruiter/jobs');
            }
        };

        fetchJob();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        try {
            setError('');
            // Convert skills to array
            const formattedData = {
                ...data,
                skills: data.skills.split(',').map(s => s.trim()).filter(s => s)
            };
            
            await api.put(`/jobs/${id}`, formattedData);
            toast.success('Job updated successfully!');
            navigate('/recruiter/jobs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update job');
            toast.error('Failed to update job');
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading job details...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Job</h1>
            
            <div className="bg-white shadow rounded-lg p-6 md:p-8">
                {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-sm text-red-700">{error}</div>}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                                type="text"
                                {...register('company', { required: 'Company is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                {...register('location', { required: 'Location is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Min Salary (INR)</label>
                            <input
                                type="number"
                                {...register('salaryMin')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Salary (INR)</label>
                            <input
                                type="number"
                                {...register('salaryMax', { required: 'Max salary is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Min Experience (Years)</label>
                            <input
                                type="number"
                                {...register('experienceMin')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Experience (Years)</label>
                            <input
                                type="number"
                                {...register('experienceMax', { required: 'Max experience is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                            <select
                                {...register('employmentType')}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
                            >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                            <input
                                type="text"
                                placeholder="React, Node.js, MongoDB"
                                {...register('skills', { required: 'Skills are required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Job Description</label>
                            <textarea
                                rows={6}
                                {...register('description', { required: 'Description is required' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/recruiter/jobs')}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJob;
