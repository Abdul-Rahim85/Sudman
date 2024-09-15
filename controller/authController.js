// this function render the login page to the browser
const login_get = (req, res) => {
    res.render('./auth/login');
}

module.exports = {
    login_get
}