const User = require('../models/User');

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.remove();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the user' });
  }
};

module.exports = { deleteUser };
