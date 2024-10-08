const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if(token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if(err) {
        console.log(err);
        
        res.status(401).json({authorize: 'you are Unauthorized to access this resource'});
      } else {
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.status(401).json({authorize: 'you are Unauthorized to access this resource'});
  }
}

module.exports = {requireAuth};