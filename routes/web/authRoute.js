const express = require('express');
const authController = require('../../controller/authController');

const authRoute = express.Router();

authRoute.get('/login', authController.login_get);
// authRoute.post('/login', authController.login_post);
// authRoute.get('/singup', authController.singup_get);
// authRoute.post('/singup', authController.singup_post);

module.exports = authRoute;