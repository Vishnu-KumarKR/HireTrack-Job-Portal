const express = require('express');
const {
    getNotifications,
    markAsRead,
    markAllAsRead
} = require('../controllers/notificationController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.patch('/read-all', protect, markAllAsRead);
router.route('/')
    .get(protect, getNotifications);

router.route('/:id/read')
    .patch(protect, markAsRead);

module.exports = router;
