const mongoose = require('mongoose');
const leaveList = require('../models/appliedLeave')

const hodApproved = async (req, res) => {
    try{
    // console.log(leaveList);
    // console.log(hodName);
    const details = await leaveList.find({ hodStatus:"Verified", status:"Pending" }, 'name department -_id');
    res.send({details});
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding requests'});

}}

module.exports = {hodApproved};