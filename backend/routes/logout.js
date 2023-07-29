const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Logout route for both regular users and admin users
router.post('/', authenticateUser, logoutController.logout);

module.exports = router;
