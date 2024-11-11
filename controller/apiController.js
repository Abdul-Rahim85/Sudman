const User = require('../models/user');
const Device = require('../models/device');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// handle errors
const handelErrors = (err) => {    
    const errors = {
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        picture: '',
        password: ''
    }
    if(err.code === 11000) {
        return 'البريد الإلكتروني او رقم الهاتف مسجلا بالفعل';
    }
    
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

// Create json web tokens
const maxAge = 7 * 24 * 1 * 60 * 60
const creatToken = (id) => {
    return jwt.sign(id, process.env.JWT_SECRET_KEY, {expiresIn: maxAge})
}

// This function is use to receive the user date and store it in the DataBase
const  singup_post = async (req, res) => {
    const newUserData = req.body ;

    try{
        const newUser = await User.create(newUserData);
        const token = creatToken({userId: newUser._id});
        res.status(201).json({message: "تم إنشاء الحساب بنجاح", newUser, token});
    }
    catch (err) {
        const errors = handelErrors(err);
        res.status(400).json(errors);
    }
};
// This function is used to upload picture
const uploadpictures_post = async (req, res) => {
    
}

// This function is check if the user tring to log in has an account or not
const login_post = async (req, res) => {
    const {phoneNumber, password} = req.body;
    
    try{
        const user = await User.login(phoneNumber, password);
        const token = creatToken({userId: user._id});
        res.status(200).json({massage: "المستخدم موجود", user, token});
        
    }
    catch (err) {        
        res.status(404).json({massage: "لايوجد مستخدم", Error: err});
    }
};

// This function is used to get a device details includeing device owner
const detectdevice_get = async (req, res) => {
    const deviceSN = req.params.id;
    const deviceDetails = await Device.findOne({serialNum: deviceSN});
    const deviceOwner = await User.findById(deviceDetails.deviceOwner);

    if(deviceDetails && deviceOwner) {
        res.status(200).json({message: "الجهاز موجود", deviceDetails, deviceOwner});
    } else {
        res.status(404).json({massage: "لايوجد جهاز"});
    }
}

// This function is used to update user personal data
const user_put = async (req, res) => {

    if(await User.findById(req.params.id)) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({massage: "تم تعديل البيانات بنجاح", updatedUser});
    } else {
        res.status(404).json({massage: "لا يوجد مستخدم"});
    }
}

module.exports = {
    login_post,
    singup_post,
    uploadpictures_post,
    detectdevice_get,
    user_put
};