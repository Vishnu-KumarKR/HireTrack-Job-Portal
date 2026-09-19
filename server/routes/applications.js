const express = require('express');
const {
    applyForJob,
    getMyApplications,
    getApplication,
    updateApplicationStatus,
    getRecruiterApplications
} = require('../controllers/applicationController');

const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, authorizeRoles('seeker'), upload.single('resume'), applyForJob);
router.get('/my', protect, authorizeRoles('seeker'), getMyApplications);
router.get('/recruiter', protect, authorizeRoles('recruiter'), getRecruiterApplications);
router.route('/:id')
    .get(protect, getApplication);
router.patch('/:id/status', protect, authorizeRoles('recruiter'), updateApplicationStatus);

module.exports = router;
