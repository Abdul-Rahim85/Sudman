const dashboard_get = (req, res) => {
    res.render('index');
}

const dashboard_post = (req, res) => {
    res.send('Done!');
}

module.exports = {
    dashboard_get,
    dashboard_post
}