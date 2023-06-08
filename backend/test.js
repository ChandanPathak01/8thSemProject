const jwt = require('jsonwebtoken')
const config = require('./config/config')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdjMjNhMGZjMzg3ODU2ZDU2YzgzNjAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODYxOTI5NjMsImV4cCI6MTY4NjE5NjU2M30.GqDyKfY7tknItvLVGY49w1NvMyxGchwf1UC0MQv5v90'
const decodedToken =  jwt.verify(token, config.jwtSecret);
console.log(decodedToken)