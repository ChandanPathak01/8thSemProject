const express = require('express');
const router = express.Router();
const hodRequest = require('../controllers/hodRequestController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateUser, hodRequest.hodRequest);

module.exports = router;