const express = require('express');
const router = express.Router();
const verification = require('../controllers/verification');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.put('/', authenticateUser, verification.updateLeaveStatus);

module.exports = router;