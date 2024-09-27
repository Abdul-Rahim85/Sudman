const User = require('../models/user');
const {getDb} = require('../db');

let db = getDb();

// This function is use to receive the user date and stor it in the DB
const  singup_post = async (req, res) => {
    const newUserData = req.body ;
    let allUser = '';

    // const users = await User.find()
    
    db.collection('users')
    .insertOne(newUserData)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({error: ["This user is already exist", err]});
            
        })
    
};

const login_post = (req, res) => {

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