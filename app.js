const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const homeRoute = require('./routes/web/homeRoute');
const authRoute = require('./routes/web/authRoute');
const User = require('./models/user');

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

// test url
app.get('/add-user', (req, res) => {
    const user = new User({
        fullName: 'البراء عمر خلف الله',
        email: 'albaraomer445@gmail.com',
        address: 'Shendi',
        phoneNumber: 926699368,
        picture: 'Albara Picture',
        password: '123456789'
    });
    user.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);

        });
})

// home page router
app.use('/', homeRoute);

// Auth pages route
app.use('/', authRoute);