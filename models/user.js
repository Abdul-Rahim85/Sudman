const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
});

// Statics methode to login user
userSchema.statics.login = async function(phoneNumber, password) {
    const user = await this.findOne({phoneNumber});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
        
    }
    throw Error ('Incorrect Phone number');
}

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