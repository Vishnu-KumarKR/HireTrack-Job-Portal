import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar, Clock, Video, MapPin, Phone } from 'lucide-react';

const SeekerInterviews = () => {
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Interviews</h1>
            
            {interviews.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
                    You have no scheduled interviews at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviews.map(interview => (
                        <div key={interview._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{interview.application?.job?.title}</h3>
                                    <p className="text-sm font-medium text-primary">{interview.application?.job?.company}</p>
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
                                
                                {interview.mode === 'Online' && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Video className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                                        <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
                                            {interview.meetingLink}
                                        </a>
                                    </div>
                                )}
                                
                                {interview.mode === 'Offline' && (
                                    <div className="flex items-start text-sm text-gray-600">
                                        <MapPin className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400 mt-0.5" />
                                        <span>{interview.location}</span>
                                    </div>
                                )}

                                {interview.mode === 'Phone' && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                                        <span>Will call your registered number</span>
                                    </div>
                                )}
                            </div>
                            
                            {interview.notes && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600 italic">
                                    "{interview.notes}"
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeekerInterviews;
