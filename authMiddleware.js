const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
  let token = '';
  req.originalUrl === '/dashboard'? token = req.cookies.jwt : token = req.headers['authorization'];
  

  if(token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if(err) {
        if(req.originalUrl == '/dashboard') {
          res.status(301).redirect('/login');
        } else {
          res.status(401).json({authorize: 'غير مصرح لك الوصول لهذه الموارد'});
        }  

      } else {
        if (req.originalUrl == '/dashboard') {
          res.status(200).render('./index');
        } else{
          
          next();
        }
      }
    })
  } else {
    if(req.originalUrl == '/dashboard'){
      res.status(301).redirect('/login');

    } else {
      res.status(401).json({authorize: 'غير مصرح لك الوصول لهذا الموارد'});
    }
  }
}

module.exports = {requireAuth};
