const mongoose = require('mongoose');
const appliedLeave = require('../models/appliedLeave');


// Register a new user by admin
const leaveApply = async (req, res) => {
  const apply = new appliedLeave({
    _id:new mongoose.Types.ObjectId,
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
           result
      })
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
      })
  })
}

module.exports = {leaveApply};

