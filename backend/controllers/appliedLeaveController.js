const mongoose = require('mongoose');
const appliedLeave = require('../models/appliedLeave');


// Register a new user by admin
const leaveApply = async (req, res) => {

  if (req.user.role=='Faculty'){
    const apply = new appliedLeave({
      _id:new mongoose.Types.ObjectId,
      name:req.user.name,
      hod:req.user.hod,
      department:req.user.department,
      role:req.user.role,
      leaveType:req.body.leaveType,
      from:req.body.from,
      to:req.body.to,
      totalDays:req.body.totalDays,
      reason:req.body.reason
    })
    apply.save()
  .then(result=>{
      console.log(result);
      res.status(200).json({
        message: 'leave applied successfully'
      })
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          message : 'something went wrong'
      })
  })

  }
  else{
  const apply = new appliedLeave({
    _id:new mongoose.Types.ObjectId,
    name:req.user.name,
    department:req.user.department,
    role:req.user.role,
    leaveType:req.body.leaveType,
    from:req.body.from,
    to:req.body.to,
    totalDays:req.body.totalDays,
    reason:req.body.reason
  })
  apply.save()
  .then(result=>{
      console.log(result);
      res.status(200).json({
        message: 'leave applied successfully'
      })
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          message : 'something went wrong'
      })
  })
}}
  

module.exports = {leaveApply};

