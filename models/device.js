const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    serialNum: {
        type: String,
        required: [true, 'الرقم التسلسلي مطلوب'],
        unique: true
    },
    deviceName: {
        type: String,
        required: [true, 'إسم الجهاز مطلوب']
    },
    deviceOwner: {
        type: String,
        required: [true, 'Device owner is required']
    },
    deviceBrand: {
        type: String,
        required: [true, 'ماركة الجهاز مطلوبه']
    },
    deviceCategory: {
        type: String,
        required: [true, 'نوع الجهاز مطلوب']
    },
    deviceColor: {
        type: String,
        required: [true, 'لون الجهاز مطلوب']
    },
    deviceStatus: {
        type: Boolean
    }

}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;