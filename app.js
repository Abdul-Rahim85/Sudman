const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const apiRoute = require('./routes/api/apiRoute')
const deviceRoute = require('./routes/api/deviceRoute');
const dashboardRoute = require('./routes/web/dashboardRoute');
const authRoute = require('./routes/web/authRoute');

// the app
const app = express();
const PORT = 3000;
// htis uri is to connect to the DB 
const dbConnectionString = 'mongodb+srv://Abdu:Abdo2204@sudmandb.g9jq8k2.mongodb.net/sudmandb?retryWrites=true&w=majority&appName=sudmanDB';
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connecting to the Database sccesfull');
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err);

    })

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
app.use('/api/v1/', apiRoute);

// API Device Router
app.use('/api/v1/devices', deviceRoute);

// Auth pages route
app.use('/login', authRoute);

// home page router
app.use('/dashboard', dashboardRoute);