const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'يرجى إدخال الإسم الكامل']
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'الرجاء إدخال بريد إلكتروني صحيح']
    },
    address: {
        type: String,
        required: [true, 'العنوان مطلوب']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'رقم الهاتف مطلوب'],
        unique: true
    },
    picture: {
        type: Buffer,
        required: [true, 'الصورة الشخصية مطلوبة']
    },
    password: {
        type: String,
        required: [true, 'الرجاء إدخال كلمة المرور']
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