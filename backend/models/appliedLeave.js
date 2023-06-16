const mongoose = require('mongoose');
// const DateOnly = require('mongoose-dateonly')(mongoose);


const appliedLeaveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  from: {
    type:Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: { 
    type: String, 
    default: 'Pending' 
  }
});

const appliedLeave = mongoose.model('appliedLeaves', appliedLeaveSchema);

module.exports = appliedLeave;
