const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);


const appliedLeaveSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  from: {
    type:DateOnly,
    required: true
  },
  to: {
    type: DateOnly,
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
