const mongoose = require('mongoose');
const leaveList = require('../models/appliedLeave');

const leaveHistory = async (req, res) => {
    try{
    username = req.user.name;
    role = req.user.role;
    department = req.user.department;
    const details = await leaveList.find({name: username , role: role, department: department}, 'leaveType from to reason status -_id');
    res.send({details});
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding history'});

}}

module.exports = {leaveHistory};