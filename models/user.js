const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    picture: {
        type: Buffer,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;