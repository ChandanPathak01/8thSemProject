const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateUser, profileController.profile);

module.exports = router;