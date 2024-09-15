// this function render the login page to the browser
const login_get = (req, res) => {
    res.render('./auth/login');
}

const login_post = (req, res) => {
    res.render('./index');
}

module.exports = {
    login_get
}