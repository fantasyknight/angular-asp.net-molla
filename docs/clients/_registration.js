var express = require('express');
var route = express.Router();

//todo. Sign-in Service
var signin = require('../../routes/registration/signin');
route.use('/api/signin', signin);

//todo. Sign-Up Service
var signup = require('../../routes/registration/signup');
route.use('/api/signup', signup);

module.exports = route;