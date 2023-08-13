const mongoose = require('mongoose');
const User = require('../models/User');


const userDetails = async (req,res) => {
    try{   
    const userDetails = await User.find({ role: { $ne: 'Admin' } }, 'name email  contact role department ');
res.send({userDetails});    
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding users'});

}}


module.exports = {userDetails};
