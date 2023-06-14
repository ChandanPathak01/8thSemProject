const express = require('express');
const router = express.Router();
const getAllUser = require('../controllers/getUserController');
const { authenticateAdmin } = require('../middleware/authMiddleware');


// Register a new user by admin
router.get('/', authenticateAdmin, getAllUser.userDetails);

module.exports = router;