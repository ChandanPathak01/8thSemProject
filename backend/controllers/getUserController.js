const mongoose = require('mongoose');
const User = require('../models/User');


const userDetails = async (req,res) => {
    try{   
    const userDetails = await User.find({ role: { $ne: 'Admin' } }, 'name email password role -_id');
res.send({userDetails});    
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding profile'});

}}


module.exports = {userDetails};
