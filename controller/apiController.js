const User = require('../models/user');
const Device = require('../models/device');

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
        return 'Email or phone number are already registered';
    }
    
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

// This function is use to receive the user date and store it in the DataBase
const  singup_post = async (req, res) => {
    const newUserData = req.body ;

    try{
        const newUser = await User.create(newUserData);
        res.status(201).json({message: "User created successfully", newUser});
    }
    catch (err) {
        const errors = handelErrors(err);
        res.status(400).json(errors);
    }
};

// This function is check if the user tring to log in has an account or not
const login_post = async (req, res) => {
    const {phoneNumber, password} = req.body;
    
    try{
        const user = await User.login(phoneNumber, password);
        res.status(200).json({massage: "User is exists", user});
        
    }
    catch (err) {
        res.status(404).json({massage: "User is not exists", Error: err});
    }
};

// This function is used to get a device details includeing device owner
const detectdevice_get = async (req, res) => {
    const deviceSN = req.params.id;
    const deviceDetails = await Device.findOne({serialNum: deviceSN});
    const deviceOwner = await User.findById(deviceDetails.deviceOwner);

    if(deviceDetails && deviceOwner) {
        res.status(200).json({massage: "Device is exists", deviceDetails, deviceOwner});
    } else {
        res.status(404).json({massage: "Device is not exists"});
    }
}

// This function is used to update user personal data
const user_put = async (req, res) => {

    if(await User.findById(req.params.id)) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({massage: "User personal data update successfully", updatedUser});
    } else {
        res.status(404).json({massage: "There is no user with this id!"});
    }
}

module.exports = {
    login_post,
    singup_post,
    detectdevice_get,
    user_put
};