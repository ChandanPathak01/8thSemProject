const express = require('express');
const router = express.Router();
const leaveList = require('../controllers/leaveListController');


// Register a new user by admin
router.get('/', leaveList.list);

module.exports = router;
