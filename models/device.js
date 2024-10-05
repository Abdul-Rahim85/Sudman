const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    serialNum: {
        type: String,
        required: [true, 'Device serial Number is Required'],
        unique: true
    },
    deviceName: {
        type: String,
        required: [true, 'Device name is required']
    },
    deviceOwner: {
        type: String,
        required: [true, 'Device owner is required']
    },
    deviceBrand: {
        type: String,
        required: [true, 'Device Brand is required']
    },
    deviceCategory: {
        type: String,
        required: [true, 'Device Category is required']
    },
    deviceColor: {
        type: String,
        required: [true, 'Device color is required']
    },
    deviceStatus: {
        type: Boolean
    }

}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;

// a device data
/*

    
{
    "serialNum" : 123456789,
    "deviceName" : "J6+",
    "deviceOwner" : "66faf718776da5719dbf4a91",
    "deviceBrand" : "Samsung",
    "deviceCategory" : "Smart Phone",
    "deviceColor": "Black",
    "deviceStatus" : false
}
*/