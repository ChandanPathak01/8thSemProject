const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt')

// Register a new user by admin
const registerUser = async (req, res) => {
  const userDetails = new User({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    department:req.body.department,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password, 10),
    role:req.body.role,
    hod:req.body.hod,
  })
  userDetails.save()
  .then(result=>{
      console.log(result);
      res.status(200).json({
          newUser : result
      })
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
      })
  })
}

module.exports = {registerUser};

