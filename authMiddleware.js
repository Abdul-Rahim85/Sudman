const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if(token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if(err) {        
        res.status(401).json({authorize: 'غير مصرح لك الوصول لهذه الموارد'});

      } else {
        next();
      }
    })
  } else {
    res.status(401).json({authorize: 'غير مصرح لك الوصول لهذا الموارد'});
  }
}

module.exports = {requireAuth};
