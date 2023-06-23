const mongoose = require('mongoose');
// const DateOnly = require('mongoose-dateonly')(mongoose);


const appliedLeaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
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
  hod: {
    type: String,
    default: '',
    required: function () {
      return this.role === 'Faculty';
    }
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
  hodStatus: {
    type: String,
    default: '',
    required: function () {
      return this.role === 'Faculty';
    }
  },
  status: { 
    type: String, 
    default: 'Pending' 
  }
});

const appliedLeave = mongoose.model('appliedLeaves', appliedLeaveSchema);

module.exports = appliedLeave;
