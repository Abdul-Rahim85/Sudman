const express = require('express');
const deviceController = require('../../controller/deviceController');

const deviceRoute = express.Router();

deviceRoute.get('/:id', deviceController.devices_get); //This route is use to RETRIEVE all devices
deviceRoute.get('/details/:id', deviceController.device_get); //This route is use to RETRIEVE the details of the one of the user device
deviceRoute.get('/deviceCategory/:id', deviceController.deviceCategory_get)
deviceRoute.get('/owner/:id', deviceController.owner_get); //This route is use to return the new owner details
deviceRoute.post('/', deviceController.device_post); //This route is use to ADD new device
deviceRoute.put('/:id', deviceController.device_put); // This route is use to UPDATE a device data
deviceRoute.put('/lost/:id', deviceController.deviceLost_put) //This route is use to set if the device is lost or not
deviceRoute.put('/transferownership/:id', deviceController.transferownership_put) //This route is use to TRANSFER THE OWNERSHIP
deviceRoute.delete('/:id', deviceController.device_delete) // This route is use to DELETE a device


module.exports = deviceRoute;