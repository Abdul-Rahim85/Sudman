const User = require('../models/user');


// This function is use to receive the user date and stor it in the DB
const singup_post = (req, res) => {
    const newUserData = req.body ;
    let allUser = '';

    User.find()
    .then((result) => {
        allUser = result; 
    })
    .catch((err) => {
        console.log(err);
        
    });
    console.log(allUser);
    res.send('testing')
    
    
    // const newUser = new User(newUserData);
    // newUser.save()
    // .then((result) => {
    //     console.log();
    //     res.send({statuse: 'singup sccessfull', userID: result, aba: allUser});
    // })
    // .catch((err) => {
    //     console.log(err);
        
    // })
    
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