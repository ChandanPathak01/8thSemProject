const express = require('express');
const router = express.Router();
const getAllUser = require('../controllers/getUserController');
const { authenticateAdmin, authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateUser,authenticateAdmin, getAllUser.userDetails);

module.exports = router;