const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists and is an admin
    const admin = await User.findOne({ email, role: 'Admin' });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    console.log(jwtSecret)
    const token = jwt.sign({ adminId: admin._id, role: admin.role }, jwtSecret, {
      expiresIn: '1h'
    });

    // Return the token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// User login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists and is not an admin
    const user = await User.findOne({ email, role: { $ne: 'Admin' } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: '1h'
    });

    // Return the token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  adminLogin,
  userLogin
};
