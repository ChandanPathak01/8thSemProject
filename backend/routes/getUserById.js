const express = require('express');
const router = express.Router();
const getUser = require('../controllers/getUserByIDController');
const { authenticateAdmin, authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/:userId', authenticateUser,authenticateAdmin, getUser.getUserById);

module.exports = router;