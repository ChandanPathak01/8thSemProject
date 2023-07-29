const User = require('../models/User');

const logout = async (req, res) => {
  try {
    // Get the user from the request (set by the auth middleware)
    
    const user = req.user;
    const updatedUser = await User.findByIdAndUpdate(user._id, { tokens : [] });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { logout };
