const express = require('express');
const router = express.Router();
const userRegController = require('../controllers/userRegController');
const { authenticateAdmin, authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.post('/register', authenticateUser,authenticateAdmin, userRegController.registerUser);

module.exports = router;
