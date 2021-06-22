const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const surveyRoutes = require('./routes/surveyRoutes');
require('dotenv').config()


app.use(function (req, res, next) {
    var allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.FE,
        process.env.FESSL
    ];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(bodyParser.json());
app.use('/survey', surveyRoutes);



app.get('/', (req, res) => {
    res.send('OSP node server works!');
});



(async() => {
    try {
        await mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
        http.listen(process.env.PORT ||  4100, () => console.log('I am listening on port ' + process.env.PORT))
    } catch (e) {
        console.log(err);
    }
})();
