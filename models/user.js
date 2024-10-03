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

// This function is used to hash the user password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;

/*

    {
    "fullName" : "Ibrahim Muhamed Abdulrahim Ibrahim",
    "email" : "ibmo@gmail.com",
    "address" : "Khartoum",
    "phoneNumber" : 966867597,
    "picture" :"Ibrahim Picture",
    "password" : "IbMo123#"
}
*/