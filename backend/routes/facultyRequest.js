const express = require('express');
const router = express.Router();
const facultyRequest = require('../controllers/facultyRequestController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateUser, facultyRequest.facultyRequest);

module.exports = router;