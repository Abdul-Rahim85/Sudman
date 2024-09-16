const devices_get = (req, res) => {
    res.send('response for the request that request all devices');
};

const device_get = (req, res) => {
    res.send('response for the request that request one device');
}

const device_post = (req, res) => {
    res.send('response for the request that request to add new device');
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