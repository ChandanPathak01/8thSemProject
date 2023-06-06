const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRegRoutes = require('./routes/userRegRoutes');
const authRoutes = require('./routes/authRoutes');


app.use(cors({
  origin:"http://localhost:3001"
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

// Routes
app.use('/userReg', userRegRoutes);
app.use('/auth', authRoutes);

app.use((req,res,next)=>{
  res.status(404).json({
      error:'bad request'
  })
})


module.exports = app;