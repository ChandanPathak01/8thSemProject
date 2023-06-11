const mongoose = require('mongoose');
const User = require('../models/User');

const profile = async (req, res) => {
    try{
    email = req.query.email
    const details = await User.find({email: email}, 'name email role -_id');
res.send({results:details});
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding profile'});

}}


module.exports = {profile};