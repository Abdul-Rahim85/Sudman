const express = require('express');
const apiController = require('../../controller/apiController');

const apiRoute = express.Router();

apiRoute.post('/singup', apiController.singup_post);
apiRoute.post('/login', apiController.login_post);
apiRoute.get('/devices/:id', apiController.device_get);
apiRoute.get('/devices', apiController.devices_get)