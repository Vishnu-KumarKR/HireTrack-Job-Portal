const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    experienceMin: {
        type: Number,
        default: 0
    },
    experienceMax: {
        type: Number,
        required: [true, 'Please add maximum experience']
    },
    salaryMin: {
        type: Number,
        default: 0
    },
    salaryMax: {
        type: Number,
        required: [true, 'Please add maximum salary']
    },
    employmentType: {
        type: String,
        required: [true, 'Please add employment type'],
        enum: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Remote']
    },
    skills: {
        type: [String],
        required: [true, 'Please add required skills']
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Closed'],
        default: 'Published'
    },
    recruiter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Indexes for searching
jobSchema.index({ title: 'text', company: 'text' });
jobSchema.index({ location: 1 });
jobSchema.index({ employmentType: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);
