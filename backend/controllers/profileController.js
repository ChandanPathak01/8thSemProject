const mongoose = require('mongoose');
const User = require('../models/User');

const profile = async (req, res) => {
    try{
    id = req.user._id
    const details = await User.find({_id: id}, 'name department role contact email -_id');
res.send({details});
} catch (error) {
    console.log(error);
    res.status(500).send({message: 'error in finding profile'});

}}

module.exports = {profile};