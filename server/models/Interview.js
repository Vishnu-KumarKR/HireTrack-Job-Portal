const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    application: {
        type: mongoose.Schema.ObjectId,
        ref: 'Application',
        required: true
    },
    recruiter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    applicant: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    },
    mode: {
        type: String,
        enum: ['Online', 'Offline', 'Phone'],
        required: [true, 'Please select interview mode']
    },
    meetingLink: {
        type: String
    },
    location: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);
