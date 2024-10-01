const User = require('../models/user');
const Device = require('../models/device');

// This function is use to receive the user date and stor it in the DB
const  singup_post = async (req, res) => {
    const newUserData = req.body ;

    const allUser = await User.find();
    if(allUser.length > 0){
// check if the email or phone number are exists
        for(let i = 0; i < allUser.length; i++){

            if(newUserData.email == allUser[i].email || newUserData.phoneNumber == allUser[i].phoneNumber){
                res.status(409).json({massage: "User data conflict: Email or phone number already exists"});
                break;

            } else if (i == allUser.length - 1){

                const createNewUser = new User(newUserData);
                const newUser = await createNewUser.save();
                res.status(201).json({massage: "User created successfully", newUser});
            } 
        }

    } else {
        const createNewUser = new User(newUserData);
        createNewUser.save()
        .then(newUser => {
            res.status(201).json({massage: 'New user created successfully', newUser});
        })
        .catch(err => {
            res.status(500).send({massage: "can'n create this user", error: err})
        });
    }
};

// This function is check if the user tring to log in has an account or not
const login_post = async (req, res) => {
    const user = req.body;
    const existsUser = await User.findOne({phoneNumber: user.phoneNumber, password: user.password});
    
    if(existsUser.length) {
        res.status(200).json({massage: "User is exists", User: existsUser});
    } else {
        res.status(404).json({massage: "User is not exists"});
    }
    
};

// This function is used to get a device details includeing device owner
const detectdevice_get = async (req, res) => {
    const deviceSN = req.params.id;
    const deviceDetails = await Device.findOne({serialNum: deviceSN});

    if(deviceDetails) {
        res.status(200).json({massage: "Device is exists", deviceDetails});
    } else {
        res.status(404).json({massage: "Device is not exists"});
    }
}

// This function is used to update user personal data
const user_put = async (req, res) => {

    if(await User.findById(req.params.id)) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({massage: "User personal data update successfully"}, updatedUser);
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