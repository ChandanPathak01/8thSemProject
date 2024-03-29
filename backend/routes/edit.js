const express = require('express');
const router = express.Router();
const editUser = require('../controllers/editController');
const { authenticateAdmin, authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.put('/:id', authenticateUser,authenticateAdmin, editUser.editUserDetails);

module.exports = router;