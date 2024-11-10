const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

// Error handler
const handelErrors = (err) => {    
    const errors = {userName: '', password: ''};

    
    if(err.message === 'Incorrect password'){
        errors.password = 'كلمة المرور غير صحيحة'
    }

    if (err.message === 'Incorrect userName or password') {
        errors.userName = 'إسم المستخدم او كلمة المرور غير صحيحة';
    }

    return errors;
}

// Create json web tokens
const maxAge = 7 * 24 * 1 * 60 * 60
const creatToken = (id) => {
    return jwt.sign(id, process.env.JWT_SECRET_KEY, {expiresIn: maxAge})
}

// this function render the login page to the browser
const login_get = (req, res) => {
    res.render('./auth/login');
}

const login_post = async (req, res) => {
const {userName, password} = req.body;

try{
    const admin = await Admin.login(userName, password);
    const token = creatToken({adminId: admin._id});
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});    
    res.status(200).json({admin: admin._id});
}
catch (err) { 
    console.log(err);
    const errors = handelErrors(err);
    
    res.status(404).json({errors});
}

}

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).redirect('/login');
}

module.exports = {
    login_get,
    login_post,
    logout_get
}