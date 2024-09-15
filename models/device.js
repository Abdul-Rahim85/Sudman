const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    serialNum: {
        type: String,
        require: true
    },
    deviceName: {
        type: String,
        require: true
    },
    deviceOwner: {
        type: String,
        require: true
    },
    deviceBrand: {
        type: String,
        require: true
    },
    deviceCategory: {
        type: String,
        require: true
    },
    deviceColor: {
        type: String,
        require: true
    },
    deviceStatus: {
        type: Boolean
    }

}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;