// this function render the login page to the browser
const login_get = (req, res) => {
    res.send('Login page');
}

const login_post = (req, res) => {
    res.send('login successfull');
}

module.exports = {
    login_get,
    login_post
}