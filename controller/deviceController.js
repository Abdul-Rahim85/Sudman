const User = require('../models/user');
const Device = require('../models/device');

// This function get all devices that belong to spcefic user
const devices_get = async (req, res) => {
    const allDevice = await Device.find({deviceOwner: req.params.uid});

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

    const allDevice = await Device.find();
    if(allDevice.length > 0){
// check if the Device serial Number is exists
        for(let i = 0; i < allDevice.length; i++){

            if(newDeviceData.serialNum == allDevice[i].serialNum){
                res.status(409).json({massage: "Device Serial number conflict: Device serial number already exists"});
                break;

            } else if (i == allDevice.length - 1){

                const createNewDevice = new Device(newDeviceData);
                const newDevice = await createNewDevice.save();
                res.status(201).json({massage: "Device added successfully", newDevice});
            } 
        }

    } else {
        const createNewDevice = new Device(newDeviceData);
        createNewDevice.save()
        .then(newDevice => {
            res.status(201).json({massage: 'New Device created successfully', newDevice});
        })
        .catch(err => {
            res.status(500).send({massage: "can'n create this Device", error: err})
        });
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

    if(await Device.findById(req.params.id)){
        const lostDevice = await Device.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        res.status(200).json({massage: "Set device as lost successfull", lostDevice});
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
        const newDeviceOwner = await Device.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({massage: "Device ownership transfer successfully", newDeviceOwner});
    } else {
        res.status(404).json({massage: "There is no device with this id"});
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