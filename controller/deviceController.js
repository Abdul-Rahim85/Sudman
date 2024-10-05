const User = require('../models/user');
const Device = require('../models/device');

const handelErrors = (err) => {
    const errors = {
        serialNum: '',
        deviceName: '',
        deviceOwner: '',
        deviceBrand: '',
        deviceCategory: '',
        deviceColor: ''
    }

    if(err.code === 11000){
        return 'Serial Number must be  unique'
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

// This function get all devices that belong to spcefic user
const devices_get = async (req, res) => {
    const allDevice = await Device.find({deviceOwner: req.params.id});

    if(allDevice.length > 0){
        res.status(200).json({massage: "successfull retriving user devices", devices: allDevice});
    } else {
        res.status(404).json({massage: "This user has no devices"})
    }
};

// This function get one device that belong to spcefic user
const device_get = async (req, res) => {
    const deviceDetails = await Device.findById(req.params.id);
    
    if(deviceDetails){
        res.status(200).json({massage: "Success finding device details", deviceDetails});
    } else {
        res.status(404).json({massage: "There is no device with this id"});
    }
}

// This function is used to add new device to the database.
const device_post = async (req, res) => {
    const newDeviceData = req.body;

    try {
        const newDevice = Device.create(newDeviceData);
        res.status(201).json({message: "New device added successfully", newDevice});

    } catch (err) {
        const errors = handelErrors(err)
        res.status(400).json(errors)
    }
}

// This function is use to updat a device data
const device_put = async (req, res) => {

    if(await Device.findById(req.params.id)){
        const lostDevice = await Device.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        res.status(200).json({massage: "Device data update successfully", lostDevice});
    } else {
        res.status(404).json({massage: "There is no device with this id!"})
    }
}

// This function is use to set a device status LOST!
const deviceLost_put = async (req, res) => {
    const lostDevice = await Device.findById(req.params.id)

    if(lostDevice){
        const lostDevice = await Device.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        res.status(200).json({massage: "Set device as lost successfull", lostDevice});
    } else {
        res.status(404).json({massage: "There is no device with this id!"})
    }
}

// This function is used to delete user device
const device_delete = async (req, res) => {

    if (await Device.findById(req.params.id)){
        await Device.findByIdAndDelete(req.params.id);
        res.status(200).json({massage: "User device deleted successfull"});

    } else {
        res.status(404).json({massage: "There is no device with this id!"})
    }
}

// This function is use to get the new owner detailse
const owner_get = async (req, res) => {
    const newOwner = await User.findOne({phoneNumber: req.params.id});

    if(newOwner){
        res.status(200).json({massage: "User to transfer ownership to him", newOwner})
    } else {
        res.status(404).json({massage: "No user exists with this phone number"});
    }
}

// This function is use to transfer ownership of a device from user to anther
const transferownership_put = async (req, res) => {
    const transformerDevice = await Device.findById(req.params.id);

    if(transformerDevice) {
        const newDeviceOwner = await Device.findByIdAndUpdate(req.params.id, req.body, {new: true})        
        res.status(200).json({massage: "Device ownership transfer successfully", newDeviceOwner});
    } else {
        res.status(404).json({massage: "There is no device with this id"});
    }
}

module.exports = {
    devices_get,
    device_get,
    device_post,
    device_put,
    deviceLost_put,
    owner_get,
    transferownership_put,
    device_delete
}