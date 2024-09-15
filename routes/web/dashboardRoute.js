const express = require('express');
const dashboardController = require('../../controller/dashboardController');

dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardController.dashboard_get);
dashboardRouter.post('/', dashboardController.dashboard_post)

module.exports = dashboardRouter;