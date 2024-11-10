const express = require('express');
const dashboardController = require('../../controller/dashboardController');

dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardController.dashboard_get);
dashboardRouter.get('/detectDevice/:id', dashboardController.detectDevice_get);
dashboardRouter.get('/dashboard/deviceOwner/:id', dashboardController.deviceOwner_get);

module.exports = dashboardRouter;