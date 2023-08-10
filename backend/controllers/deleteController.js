const User = require('../models/User');
// const mongoose = require('mongoose');


const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({_id:id});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.deleteOne({_id:id});
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the user'});
  }
};

module.exports = { deleteUser };
