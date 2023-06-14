const jwt = require('jsonwebtoken')
const config = require('./config/config')
const token = '$2b$10$JHr4WlGTWKctrW6jfTcoHeW85agqrfVpJCzMyTZMVemyO2Uy21bMC'
const decodedToken =  jwt.verify(token, config.jwtSecret);
console.log(decodedToken)