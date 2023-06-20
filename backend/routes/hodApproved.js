const express = require('express');
const router = express.Router();
const hodApproved = require('../controllers/hodApprovedController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateUser, hodApproved.hodApproved);

module.exports = router;