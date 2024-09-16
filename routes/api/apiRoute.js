const express = require('express');
const apiController = require('../../controller/apiController');

const apiRoute = express.Router();

apiRoute.post('/singup', apiController.singup_post); //This route is use to send the sining in data
apiRoute.post('/login', apiController.login_post); //This route is use to send the username and password to check them
apiRoute.get('/detectdevice/:id', apiController.detectdevice_get); //This route is use to 
apiRoute.put('/user/:id', apiController.user_put); //This route is use to update a user data

module.exports = apiRoute;