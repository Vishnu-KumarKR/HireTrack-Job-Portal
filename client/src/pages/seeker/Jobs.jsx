import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Search, MapPin, Briefcase, DollarSign, Filter, SlidersHorizontal, Clock } from 'lucide-react';

const SeekerJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Search & Filter state
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [employmentType, setEmploymentType] = useState('All');
    const [salaryMin, setSalaryMin] = useState('');
    const [experienceMax, setExperienceMax] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    
    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobsCount, setTotalJobsCount] = useState(0);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page,
                limit: 6,
                ...(search && { search }),
                ...(location && { location }),
                ...(employmentType !== 'All' && { employmentType }),
                ...(salaryMin && { salaryMin }),
                ...(experienceMax && { experienceMax }),
                ...(sortBy && { sortBy }),
                ...(sortOrder && { sortOrder })
            });
            const res = await api.get(`/jobs?${query}`);
            setJobs(res.data.data.jobs);
            setTotalPages(res.data.data.pagination.totalPages);
            setTotalJobsCount(res.data.data.pagination.totalJobs);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [page, employmentType, sortBy, sortOrder]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchJobs();
    };

    const handleResetFilters = () => {
        setSearch('');
        setLocation('');
        setEmploymentType('All');
        setSalaryMin('');
        setExperienceMax('');
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Explore Opportunity Listings</h1>
                <p className="text-gray-500 text-sm mt-1">Search, filter, and apply to top matching jobs in real-time.</p>
            </div>

            {/* Filter Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                    {/* Top Row: Search & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Search title, skills, or company..."
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="City or Remote"
                            />
                        </div>

                        <div>
                            <select
                                value={employmentType}
                                onChange={(e) => { setEmploymentType(e.target.value); setPage(1); }}
                                className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                            >
                                <option value="All">All Job Types</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <Filter className="w-4 h-4" /> Filter Jobs
                        </button>
                    </div>

                    {/* Secondary Row: Additional Filters & Sorting */}
                    <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Min Salary (₹/yr)</label>
                            <input
                                type="number"
                                value={salaryMin}
                                onChange={(e) => setSalaryMin(e.target.value)}
                                placeholder="e.g. 500000"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Max Experience (Years)</label>
                            <input
                                type="number"
                                value={experienceMax}
                                onChange={(e) => setExperienceMax(e.target.value)}
                                placeholder="e.g. 5"
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white"
                            >
                                <option value="createdAt">Date Posted (Newest)</option>
                                <option value="salary">Salary (Highest)</option>
                                <option value="title">Job Title (A-Z)</option>
                            </select>
                        </div>

                        <div className="flex items-end justify-end">
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors py-2"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Showing {jobs.length} of {totalJobsCount} matching openings</span>
            </div>

            {/* Jobs List */}
            {loading ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                    Loading job listings...
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-700 font-semibold text-lg">No jobs found</p>
                    <p className="text-gray-500 text-sm mt-1">Try broadening your search keywords or location filters.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-all group">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                                            {job.employmentType}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm font-semibold text-primary mb-4">{job.company}</p>
                                    
                                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            ₹{job.salaryMin.toLocaleString()} - ₹{job.salaryMax.toLocaleString()} / yr
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {job.experienceMin} - {job.experienceMax} years experience
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {job.skills.slice(0, 3).map(skill => (
                                            <span key={skill} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                                {skill}
                                            </span>
                                        ))}
                                        {job.skills.length > 3 && (
                                            <span className="text-xs text-gray-400 py-0.5">+{job.skills.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                <Link
                                    to={`/seeker/jobs/${job._id}`}
                                    className="w-full text-center py-2.5 border border-primary text-primary font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    View Details & Apply
                                </Link>
                            </div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center items-center space-x-3">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <span className="text-xs font-medium text-gray-600">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SeekerJobs;
