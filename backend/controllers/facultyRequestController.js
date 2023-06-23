const mongoose = require('mongoose');
const leaveList = require('../models/appliedLeave')

const facultyRequest = async (req, res) => {
    try{
    hodName = req.user.name;
    // console.log(leaveList);
    // console.log(hodName);
    const details = await leaveList.find({hod: hodName, hodStatus:"Pending"  }, 'name department reason');
    res.send({details});
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding requests'});

}}

module.exports = {facultyRequest};