const express = require('express');
const router = express.Router();
const deleteUser = require('../controllers/deleteController');
const { authenticateAdmin, authenticateUser } = require('../middleware/authMiddleware');


// Register a new user by admin
router.delete('/:id', authenticateUser,authenticateAdmin, deleteUser.deleteUser);

module.exports = router;