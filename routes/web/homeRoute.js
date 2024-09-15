const express = require('express');
const homeController = require('../../controller/homeController');

homeRouter = express.Router();

homeRouter.get('/', homeController.home_get)

module.exports = homeRouter;