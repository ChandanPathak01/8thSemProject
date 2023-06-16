const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/login');
const userProfile = require('./routes/profile');
const userRegRoutes = require('./routes/userRegRoutes');
const allUser = require('./routes/getUser');
const leaveApply = require('./routes/applyForLeave')




app.use(cors({
  origin:"*"
}))


mongoose.connect('mongodb+srv://8thSemBackend:achs1234@cluster0.9oc3ala.mongodb.net/8thSem');
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
app.use('/userReg', userRegRoutes);
app.use('/userProfile', userProfile);
app.use('/leaveApply', leaveApply);


app.use((req,res,next)=>{
  res.status(404).json({
      error:'bad request'
  })
})


module.exports = app;