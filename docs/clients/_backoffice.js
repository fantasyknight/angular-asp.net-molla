var express = require('express');
var route = express.Router();

//todo. Citizenship Service
var citizenship = require('../../routes/backoffice/mastercitizenship');
route.use('/api/citizenship', citizenship);

//todo. Country Service
var country = require('../../routes/backoffice/mastercountry');
route.use('/api/country', country);

//todo. State Service
var state = require('../../routes/backoffice/masterstate');
route.use('/api/state', state);

//todo. Facility Service
var facility = require('../../routes/backoffice/masterfacility');
route.use('/api/facility', facility);

//todo. Race Service
var race = require('../../routes/backoffice/masterrace');
route.use('/api/race', race);

//todo. Relationship Service
var relationship = require('../../routes/backoffice/masterrelationship');
route.use('/api/relationship', relationship);

//todo. Subscription-type Service
var mastersubscriptiontype = require('../../routes/backoffice/mastersubscriptiontype');
route.use('/api/mastersubscriptiontype', mastersubscriptiontype);

//todo. Terms Service
var masterterms = require('../../routes/backoffice/masterterms');
route.use('/api/masterterms', masterterms);

//todo. EPF Service
var epf = require('../../routes/backoffice/masterepf');
route.use('/api/epf', epf);

//todo. EPF List Service
var epflist = require('../../routes/backoffice/masterepflist');
route.use('/api/epflist', epflist);

//todo. ESI Service
var eis = require('../../routes/backoffice/masteresi');
route.use('/api/eis', eis);

//todo. ESI List Service
var eislist = require('../../routes/backoffice/masteresilist');
route.use('/api/eislist', eislist);

//todo. SOCSO Service
var socso = require('../../routes/backoffice/mastersocso');
route.use('/api/socso', socso);

//todo. SOCSO List Service
var socsolist = require('../../routes/backoffice/mastersocsolist');
route.use('/api/socsolist', socsolist);

//todo. Company Authentication List Service
var companyauth = require('../../routes/backoffice/companyauth');
route.use('/api/companyauth', companyauth);

//todo. HRDF Service
var hrdf = require('../../routes/backoffice/masterhrdf');
route.use('/api/hrdf', hrdf);

//todo. HRDF List Service
var hrdflist = require('../../routes/backoffice/masterhrdflist');
route.use('/api/hrdflist', hrdflist);

//todo. Master Employer-Bank Service
var masteremployeebank = require('../../routes/backoffice/masteremployeebank');
route.use('/api/masteremployeebank', masteremployeebank);

//todo. Master Employer-Bank Service
var masteremployerbank = require('../../routes/backoffice/masteremployerbank');
route.use('/api/masteremployerbank', masteremployerbank);

module.exports = route;