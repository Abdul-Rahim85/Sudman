const Device = require('../models/device');
const User = require('../models/user');

const dashboard_get = async (req, res) => {
    const devices = await Device.find();   
    const usersId = [];
    let users = [];
    devices.forEach(device => {
        usersId.push(device.deviceOwner);
    });
    for (let i=0; i < usersId.length; i++){
        users.push(await User.findById(usersId[i]));
    }    
    
    res.render('./index', {devices, users, view: 'devices'});
}

// This function get all devices
const detectDevice_get = async (req, res) => {
    const device = await Device.findOne({serialNum: req.params.id});
    if(device) {
        const deviceOwner = await User.findById(device.deviceOwner);
        if(deviceOwner){
            res.status(200).json({device, deviceOwner});
        } else {
            res.status(200).json({device, deviceOwner: 'This device has no user'});
        }
    } else {
        res.status(404).json({message: 'There is no device with this serail Number'});
    }
}

// This function get the device owner Name
const deviceOwner_get = async (req, res) => {
    
    const deviceOwner = await User.findById(req.params.id);
    if(deviceOwner) {
        res.status(200).json({deviceOwner: deviceOwner.fullName});
    } else {
        res.status(404).json({message: 'There is no user'})
    }
}

module.exports = {
    dashboard_get,
    detectDevice_get,
    deviceOwner_get
}