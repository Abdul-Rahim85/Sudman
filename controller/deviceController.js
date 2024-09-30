const Device = require('../models/device');

const devices_get = (req, res) => {
    res.send('response for the request that request all devices');
};

const device_get = (req, res) => {
    res.send('response for the request that request one device');
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
            res.status(201).json({massage: 'New user created successfully', newDevice});
        })
        .catch(err => {
            res.status(500).send({massage: "can'n create this user", error: err})
        });
    }
}

const device_put = (req, res) => {
    res.send('response for the request that request to update a device data');
}

const deviceLost_put = (req, res) => {
    res.send('response for the request that request to tell that the device is missing');
}

const transferownership_put = (req, res) => {
    res.send('response for the request that request to transfer the ownership');
}

const device_delete = (req, res) => {
    res.send('response for the request that request to delete this device');
}

module.exports = {
    devices_get,
    device_get,
    device_post,
    device_put,
    deviceLost_put,
    transferownership_put,
    device_delete
}