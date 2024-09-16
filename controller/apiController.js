const singup_post = (req, res) => {
    res.send('sing up successfull');
};

const login_post = (req, res) => {
    res.send('log in successfull');
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