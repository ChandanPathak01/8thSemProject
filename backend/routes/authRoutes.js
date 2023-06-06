const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin login route
router.post('/admin/login', authController.adminLogin);

// User login route
router.post('/user/login', authController.userLogin);

// Other authentication routes (e.g., logout, password reset, etc.)...

module.exports = router;
