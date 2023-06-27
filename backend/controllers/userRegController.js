const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt')

// Register a new user by admin
const registerUser = async (req, res) => {
  const userDetails = new User({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    role:req.body.role,
    department:req.body.department,
    hod:req.body.hod,
    contact:req.body.contact,
    email:req.body.email,
    biometricId:req.body.biometricId,
    password:bcrypt.hashSync(req.body.password, 10)
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

