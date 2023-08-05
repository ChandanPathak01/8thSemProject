const express = require('express');
const router = express.Router();
const { forgotPassword, verifyOTP, resetPassword } = require('../controllers/forgotPasswordController');

// Route to initiate the forgot password process
router.post('/forgot-password', forgotPassword);

// Route to verify the OTP sent to the user's email
router.post('/verify-otp', verifyOTP);

// Route to reset the user's password
router.post('/reset-password', resetPassword);

module.exports = router;
