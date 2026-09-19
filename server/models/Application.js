const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: String,
        required: [true, 'Please provide a resume']
    },
    coverLetter: {
        type: String
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    additionalDetails: {
        type: String
    },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
        default: 'Applied'
    }
}, {
    timestamps: true
});

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
