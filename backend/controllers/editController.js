const User = require('../models/User');

const editUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    Object.keys(updates).forEach((update) => {
      user[update] = updates[update];
    });

    await user.save();

    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating user details' });
  }
};

module.exports = { editUserDetails };
