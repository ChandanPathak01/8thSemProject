const User = require('../models/User');

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ userDetails: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching user details' });
  }
};

module.exports = { getUserById };
