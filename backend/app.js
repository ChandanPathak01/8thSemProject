const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/login');
const userProfile = require('./routes/profile');
const addUser = require('./routes/userRegRoutes');
const allUser = require('./routes/getUser');
const leaveApply = require('./routes/applyForLeave');
const leaveList = require('./routes/pplOnTheLeave');
const facultyRequest = require('./routes/facultyRequest');
const hodRequest = require('./routes/hodRequest');
const hodApproved = require('./routes/hodApproved');
const leaveHistory = require('./routes/leaveHistory');
const verification = require('./routes/verification');
const logout = require('./routes/logout')
const editUser = require('./routes/edit');
const deleteUser = require('./routes/delete');
const changePassword = require('./routes/changePassword');




app.use(cors({
  origin:"*"
}))

const url = 'mongodb+srv://8thSemBackend:achs1234@cluster0.9oc3ala.mongodb.net/8thSem?retryWrites=true&w=majority'
mongoose.connect(url);
mongoose.connection.on('error',err=>{
  console.log('Connection failed')
});

mongoose.connection.on('connected',conncted=>{
  console.log('Database Connected')
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// Routes
app.use('/login', authRoutes);
app.use('/users', allUser);
app.use('/userReg', addUser);
app.use('/editUser', editUser);
app.use('/deleteUser', deleteUser);
app.use('/userProfile', userProfile);
app.use('/leaveApply', leaveApply);
app.use('/leaveList', leaveList);
app.use('/facultyRequest', facultyRequest);
app.use('/hodRequest', hodRequest);
app.use('/hodApproved', hodApproved);
app.use('/leaveHistory', leaveHistory);
app.use('/verify', verification);
app.use('/logout', logout);
app.use('/changePassword', changePassword);

app.use((req,res,next)=>{
  res.status(404).json({
      error:'bad request'
  })
})


module.exports = app;