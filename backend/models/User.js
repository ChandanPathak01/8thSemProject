const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Principal', 'HOD', 'Faculty'],
    default: 'Faculty'
  },
  department: {
    type: String,
    required: function () {
      return this.role === 'Faculty' || this.role === 'HOD';
    },
    default: ''
  },
  hod: {
    type: String,
    default: '',
    required: function () {
      return this.role === 'Faculty';
    }
  },
  contact: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('appusers', userSchema);

module.exports = User;
