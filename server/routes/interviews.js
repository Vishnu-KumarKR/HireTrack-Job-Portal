const express = require('express');
const {
    scheduleInterview,
    getInterviews,
    getInterview,
    updateInterview
} = require('../controllers/interviewController');

const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');

router.route('/')
    .post(protect, authorizeRoles('recruiter'), scheduleInterview)
    .get(protect, getInterviews);

router.route('/:id')
    .get(protect, getInterview)
    .put(protect, authorizeRoles('recruiter'), updateInterview);

module.exports = router;
