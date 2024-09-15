const express = require('express');
const authController = require('../../controller/authController').default;

const authRoute = express.Router();

authRoute.get('/', authController.login_get);
authRoute.post('/', authController.login_post);

module.exports = authRoute;