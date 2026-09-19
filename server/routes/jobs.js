const express = require('express');
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    updateJobStatus,
    deleteJob,
    getDashboardStats
} = require('../controllers/jobController');

const router = express.Router();

const { protect, optionalAuth, authorizeRoles } = require('../middleware/auth');

router.route('/dashboard/stats')
    .get(protect, authorizeRoles('recruiter'), getDashboardStats);

router.route('/')
    .get(optionalAuth, getJobs)
    .post(protect, authorizeRoles('recruiter'), createJob);

router.route('/:id')
    .get(optionalAuth, getJob)
    .put(protect, authorizeRoles('recruiter'), updateJob)
    .delete(protect, authorizeRoles('recruiter'), deleteJob);

router.route('/:id/status')
    .patch(protect, authorizeRoles('recruiter'), updateJobStatus);

module.exports = router;
