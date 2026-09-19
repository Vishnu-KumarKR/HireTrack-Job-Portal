import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, Clock, Video, MapPin, Phone } from 'lucide-react';

const RecruiterInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await api.get('/interviews');
                setInterviews(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchInterviews();
    }, []);

    if (loading) return <div className="text-center py-10">Loading interviews...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Scheduled Interviews</h1>
                {/* Note: In a real app, scheduling happens from the Applicant Details view */}
            </div>
            
            {interviews.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
                    No interviews scheduled.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviews.map(interview => (
                        <div key={interview._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{interview.applicant?.name}</h3>
                                    <p className="text-sm font-medium text-primary">{interview.application?.job?.title}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}>
                                    {interview.mode}
                                </span>
                            </div>
                            
                            <div className="space-y-3 mb-6 flex-grow">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                                    {new Date(interview.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                                    {interview.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecruiterInterviews;
