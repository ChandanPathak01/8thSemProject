const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

// Middleware to authenticate regular users
const authenticateUser = (req, res, next) => {
  // Extract the token from the request headers
  const authtoken = req.headers.authorization;
  const token = authtoken.slice(7, authtoken.length);

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, config.jwtSecret);

    // Check if the decoded token contains a valid user ID
    if (!decodedToken.userId) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    // Fetch the user from the database
    User.findById(decodedToken.userId)
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }


        if(user.tokens.find((_token)=>_token === token) === undefined){
          return res.status(401).json({ message: 'Session Expired' });
        }
        // Attach the user object to the request for further use
        req.user = user;
        next();
      })
      .catch(error => {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

// Middleware to authenticate admins
const authenticateAdmin = (req, res, next) => {
  
    try{

    if(req.user.role!=='Admin'){
      res.status(401).json({ message: 'You are not an admin' });

    }
    next();
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin
};

