const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { requireAuth } = require('./authMiddleware');
const apiRoute = require('./routes/api/apiRoute');
const cookieParser = require('cookie-parser');
const authController = require('./controller/authController');
const deviceRoute = require('./routes/api/deviceRoute');
const dashboardRoute = require('./routes/web/dashboardRoute');
const authRoute = require('./routes/web/authRoute');
require('dotenv').config();

// the app
const app = express();
const PORT = process.env.PORT || 3000;

// htis uri is to connect to the DB 
const dbConnectionString = process.env.DB_URI;
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connecting to the Database sccesfull');
    })
    .catch((err) => {
        console.log(err);

    });

app.listen(PORT)

// app setting
app.set('view engine', 'ejs');


// third party middleware
app.use([
    express.urlencoded({ extended: false }),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    cookieParser()
]);

// API Router
app.use('/api/v1', apiRoute);

// API Device Router
app.use('/api/v1/devices', requireAuth, deviceRoute);

// Auth pages route
app.use('/login', authRoute);

// home page router
app.use('/dashboard', requireAuth, dashboardRoute);

app.get('/logout', authController.logout_get)

// Not found page
app.use('/', (req, res) => {
    res.render('./404');
});