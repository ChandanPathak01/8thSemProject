const express = require('express');
const router = express.Router();
const appliedLeaveController = require('../controllers/appliedLeaveController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.post('/', authenticateUser, appliedLeaveController.leaveApply);

module.exports = router;
