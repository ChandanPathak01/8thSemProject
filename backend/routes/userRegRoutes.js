const express = require('express');
const router = express.Router();
const userRegController = require('../controllers/userRegController');
const { authenticateAdmin } = require('../middleware/authMiddleware');


// Register a new user by admin
router.post('/register', authenticateAdmin, userRegController.registerUser);

module.exports = router;
