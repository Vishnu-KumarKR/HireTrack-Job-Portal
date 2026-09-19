const Interview = require('../models/Interview');
const Application = require('../models/Application');
const Notification = require('../models/Notification');

// @desc    Schedule an interview
// @route   POST /api/interviews
// @access  Private (Recruiter only)
exports.scheduleInterview = async (req, res, next) => {
    try {
        const { application: appId, date, time, mode, meetingLink, location, notes } = req.body;

        const application = await Application.findById(appId).populate('job');

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        if (application.job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const interview = await Interview.create({
            application: appId,
            recruiter: req.user.id,
            applicant: application.applicant,
            date,
            time,
            mode,
            meetingLink,
            location,
            notes
        });

        // Create Notification
        await Notification.create({
            user: application.applicant,
            title: 'Interview Scheduled',
            message: `An interview has been scheduled for your application to ${application.job.title} on ${date} at ${time}.`,
            type: 'INTERVIEW'
        });

        res.status(201).json({
            success: true,
            data: interview
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all interviews for current user (seeker or recruiter)
// @route   GET /api/interviews
// @access  Private
exports.getInterviews = async (req, res, next) => {
    try {
        let queryObj = {};

        if (req.user.role === 'recruiter') {
            queryObj.recruiter = req.user.id;
        } else {
            queryObj.applicant = req.user.id;
        }

        const interviews = await Interview.find(queryObj)
            .populate({
                path: 'application',
                populate: { path: 'job', select: 'title company' }
            })
            .populate('applicant', 'name email phone')
            .populate('recruiter', 'name email company')
            .sort('-date');

        res.status(200).json({
            success: true,
            data: interviews
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single interview
// @route   GET /api/interviews/:id
// @access  Private
exports.getInterview = async (req, res, next) => {
    try {
        const interview = await Interview.findById(req.params.id)
            .populate({
                path: 'application',
                populate: { path: 'job', select: 'title company' }
            })
            .populate('applicant', 'name email phone')
            .populate('recruiter', 'name email company');

        if (!interview) {
             return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        if (interview.applicant._id.toString() !== req.user.id && interview.recruiter._id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.status(200).json({
            success: true,
            data: interview
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update interview
// @route   PUT /api/interviews/:id
// @access  Private (Recruiter only)
exports.updateInterview = async (req, res, next) => {
    try {
        let interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        if (interview.recruiter.toString() !== req.user.id) {
             return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        interview = await Interview.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: interview
        });
    } catch (err) {
        next(err);
    }
};
