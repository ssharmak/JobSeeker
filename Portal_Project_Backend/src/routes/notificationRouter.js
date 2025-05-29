const express = require('express');
const { instNotification, markNotification, getUnseenApplications } = require('../controllers/notificationController');
const { authenticateTempToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/unseen-applications-count', authenticateTempToken , instNotification);
router.post('/mark-all-seen', authenticateTempToken,markNotification);
router.get('/applications', getUnseenApplications);


module.exports=router;