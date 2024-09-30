const User = require('../models/user');

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

const login_post = async (req, res) => {
    const user = req.body;
    const existsUser = await User.find({phoneNumber: user.phoneNumber, password: user.password});
    
    if(existsUser.length > 0) {
        res.status(200).json({massage: "User is exists", User: existsUser});
    } else {
        res.status(404).json({massage: "User is not exists"});
    }
    
};

const detectdevice_get = (req, res) => {
    res.send('This is the data of the device you looking for');
}

const user_put = (req, res) => {
    res.send('User data update successfull');
}

module.exports = {
    login_post,
    singup_post,
    detectdevice_get,
    user_put
};