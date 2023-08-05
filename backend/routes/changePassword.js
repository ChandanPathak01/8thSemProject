const express = require('express');
const router = express.Router();
const changePasswordController = require('../controllers/changePasswordController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Change password for logged-in users
router.post('/', authenticateUser, changePasswordController.changePassword);

module.exports = router;
