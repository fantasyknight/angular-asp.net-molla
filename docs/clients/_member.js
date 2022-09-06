var express = require('express');
var route = express.Router();

//todo. Member Service
var member = require('../../routes/member/member');
route.use('/api/member', member);

module.exports = route;