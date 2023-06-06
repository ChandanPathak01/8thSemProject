const jwt = require('jsonwebtoken')
const config = require('./config/config')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjQ3YzIzYTBmYzM4Nzg1NmQ1NmM4MzYwIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjg1ODY1ODQzLCJleHAiOjE2ODU4Njk0NDN9.M7H1DTo5OzJB73SBDSl7Z9RnOo5xPDFp4B6alFl2dAQ'
const decodedToken =  jwt.verify(token, config.jwtSecret);
console.log(decodedToken)