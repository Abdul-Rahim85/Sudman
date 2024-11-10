const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;