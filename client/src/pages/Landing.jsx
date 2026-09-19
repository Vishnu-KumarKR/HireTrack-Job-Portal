import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Search, 
    Briefcase, 
    Users, 
    Calendar, 
    Bell, 
    FileText, 
    CheckCircle2, 
    Building2, 
    ArrowRight, 
    Sparkles, 
    UserCheck,
    BarChart3,
    Clock,
    ShieldCheck
} from 'lucide-react';

const Landing = () => {
    const [activeTab, setActiveTab] = useState('seeker');

    return (
        <div className="flex flex-col items-center space-y-16 pb-12">
            {/* Hero Section - Matching screenshot layout with enhanced aesthetics */}
            <div className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-3xl p-8 sm:p-12 md:p-20 text-white text-center shadow-xl relative overflow-hidden">
                {/* Decorative background glow elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-blue-50 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md border border-white/20">
                        <Sparkles className="w-4 h-4 text-yellow-300" /> Unified Platform for Talent & Hiring
                    </span>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                        Find the right opportunity.<br className="hidden sm:inline" /> Hire the right talent.
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
                        The modern platform for job seekers and recruiters to connect, apply, and manage the entire hiring process seamlessly.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                        <Link 
                            to="/register" 
                            className="w-full sm:w-auto bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base flex items-center justify-center gap-2 group"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            to="/login" 
                            className="w-full sm:w-auto bg-transparent border-2 border-white/80 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/15 transition-all duration-200 backdrop-blur-sm text-base text-center"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Dual Quick Badges */}
                    <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-blue-400/30 text-white">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">Job Seekers</span>
                                <span className="text-sm font-medium text-white">Find jobs, upload PDF resumes & track applications live</span>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-indigo-400/30 text-white">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider block">Recruiters</span>
                                <span className="text-sm font-medium text-white">Post jobs, review candidates & schedule interviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Platform Feature Selector / Role Tabs */}
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tailored Experience for Every User</h2>
                    <p className="text-gray-600 mt-2 text-base max-w-xl mx-auto">
                        Whether you are looking to advance your career or build your dream team, HireTrack provides specialized tools for your workflow.
                    </p>

                    {/* Filter Tabs */}
                    <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl mt-6 border border-gray-200">
                        <button
                            onClick={() => setActiveTab('seeker')}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'seeker' 
                                    ? 'bg-white text-primary shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Users className="w-4 h-4 text-blue-500" /> For Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveTab('recruiter')}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'recruiter' 
                                    ? 'bg-white text-primary shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Building2 className="w-4 h-4 text-indigo-500" /> For Recruiters
                        </button>
                    </div>
                </div>

                {/* Role Specific Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Job Seeker Feature 1 */}
                    {activeTab === 'seeker' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <Search className="w-6 h-6" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
                                    Job Seeker
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Job Search</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Browse open positions with real-time keyword and location filtering to quickly find roles matching your background.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>1-Click Search & Filters</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    )}

                    {/* Job Seeker Feature 2 */}
                    {activeTab === 'seeker' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
                                    Job Seeker
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">PDF Resume Upload</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Submit your resume directly in PDF format (up to 5MB) with instant validation so recruiters evaluate your latest credentials.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>PDF Upload Support</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    )}

                    {/* Job Seeker Feature 3 */}
                    {activeTab === 'seeker' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
                                    Job Seeker
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Live Application Tracker</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Track every application in real-time through stages: <span className="font-semibold text-gray-800">Submitted</span>, <span className="font-semibold text-blue-600">Shortlisted</span>, <span className="font-semibold text-amber-600">Interview</span>, or <span className="font-semibold text-green-600">Selected</span>.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>Transparent Stage Progress</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    )}

                    {/* Recruiter Feature 1 */}
                    {activeTab === 'recruiter' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">
                                    Recruiter
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Job Posting & Control</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Post new job opportunities, edit requirements, manage active positions, and close listings with a single click.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>Full Job Lifecycle</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    )}

                    {/* Recruiter Feature 2 */}
                    {activeTab === 'recruiter' && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">
                                    Recruiter
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Applicant Management</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Review submitted applications by job, inspect candidate profiles, download resumes, and update applicant statuses effortlessly.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>Centralized Applicant Review</span>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    )}

                    {/* Recruiter & Seeker Shared Feature: Interview Scheduler */}
                    {(activeTab === 'recruiter' || activeTab === 'seeker') && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 mb-2">
                                    Shared Workflow
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Interview Scheduler & Alerts</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Recruiters schedule interviews with custom dates & notes; candidates receive automated notifications in their inbox.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                <span>In-App Notifications</span>
                                <Bell className="w-4 h-4 text-purple-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Side-by-Side Dual Portal Cards */}
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Job Seeker Portal Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-md">
                                    <Users className="w-6 h-6" />
                                </span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                    Job Seeker Portal
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Looking for your next career move?</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Create your profile, search among verified job listings, apply instantly with your resume, and stay updated on your application status.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    Filter jobs by title, skills & location
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    1-Click PDF resume upload & attachment
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    Real-time status updates & interview reminders
                                </li>
                            </ul>
                        </div>

                        <Link
                            to="/register"
                            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-center transition-colors shadow-md flex items-center justify-center gap-2 group"
                        >
                            Sign Up as Job Seeker
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Recruiter Command Center Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50/50 rounded-3xl p-8 border border-indigo-100 flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl"></div>
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md">
                                    <Building2 className="w-6 h-6" />
                                </span>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                    Recruiter Dashboard
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hiring top talent for your company?</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Post open positions, screen incoming candidate resumes, update application stages, and schedule interview rounds easily.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                    Post & manage job openings seamlessly
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                    Inspect applicant resumes & shortlist talent
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                    Schedule interviews & send instant candidate alerts
                                </li>
                            </ul>
                        </div>

                        <Link
                            to="/register"
                            className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-center transition-colors shadow-md flex items-center justify-center gap-2 group"
                        >
                            Sign Up as Recruiter
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
