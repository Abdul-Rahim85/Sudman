const express = require('express');
const { requireAuth } = require('../../authMiddleware');
const apiController = require('../../controller/apiController');

const apiRoute = express.Router();

apiRoute.post('/singup', apiController.singup_post); //This route is use to send the sining in data
apiRoute.post('/singup/pictures', apiController.uploadpictures_post)
apiRoute.post('/login', apiController.login_post); //This route is use to send the username and password to check them
apiRoute.get('/detectdevice/:id', apiController.detectdevice_get); //This route is use to detect a device data
apiRoute.put('/user/:id', requireAuth, apiController.user_put); //This route is use to update a user data

module.exports = apiRoute;