const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Determine the role of the user
    const role = user.role;
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {expiresIn: '1h'});
    res.status(200).json({ role, token});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


module.exports = {login};
