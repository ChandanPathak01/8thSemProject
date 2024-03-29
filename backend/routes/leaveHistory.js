const express = require('express');
const router = express.Router();
const leaveHistController = require('../controllers/leaveHistController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateUser, leaveHistController.leaveHistory);

module.exports = router;