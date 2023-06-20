const mongoose = require('mongoose');
const User = require('../models/User');

const profile = async (req, res) => {
    try{
    email = req.user.email
    const details = await User.find({email: email}, 'name department role contact email -_id');
res.send({details});
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding profile'});

}}

module.exports = {profile};