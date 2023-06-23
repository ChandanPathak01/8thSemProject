const mongoose = require('mongoose');
const leaveList = require('../models/appliedLeave');

const leaveHistory = async (req, res) => {
    try{
    id = req.user.id
    role = req.user.role
    if (role === 'Faculty'){const details = await leaveList.find({userId:id}, 'leaveType from to reason hodStatus status -_id');res.send({details});}
    else {const details = await leaveList.find({userId:id}, 'leaveType from to reason status -_id');res.send({details});}
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding history'});

}}

module.exports = {leaveHistory};