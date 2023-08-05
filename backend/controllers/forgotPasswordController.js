const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { jwtSecret, emailConfig } = require('../config/config');

const generateOTP = () => {
  // Generate a 6-digit random OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email, otp) => {
  // Create a nodemailer transporter using the email configuration
  const transporter = nodemailer.createTransport(emailConfig);

  // Set up email data
  const mailOptions = {
    from: emailConfig.auth.user,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP and store it in the user's document
    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    // Send OTP to user's email
    await sendOTP(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in sending OTP:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the OTP provided by the user matches the OTP stored in the user's document
    if (otp !== user.otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // If the OTP is correct, delete it from the user's document
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error in verifying OTP:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetting password:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { forgotPassword, verifyOTP, resetPassword };
