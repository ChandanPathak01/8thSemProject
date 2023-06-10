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
    const userDetails = await User.find({ role: { $ne: 'Admin' } }, 'name email password role -_id');
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: '1h'
    });

    res.status(200).json({ role, token, userDetails });

    // Redirect the user based on their role
    // switch (role) {
    //   case 'Admin':
    //     // Redirect to admin dashboard
    //     res.status(200).json({ role: 'Admin', redirect: '/admin/dashboard', token });
    //     break;
    //   case 'Principal':
    //     // Redirect to principal dashboard
    //     res.status(200).json({ role: 'Principal', redirect: '/principal/dashboard', token });
    //     break;
    //   case 'HOD':
    //     // Redirect to HOD dashboard
    //     res.status(200).json({ role: 'HOD', redirect: '/hod/dashboard', token });
    //     break;
    //   case 'Faculty':
    //     // Redirect to faculty dashboard
    //     res.status(200).json({ role: 'Faculty', redirect: '/faculty/dashboard', token });
    //     break;
    //   default:
    //     res.status(401).json({ message: 'Invalid user' });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  login
};
