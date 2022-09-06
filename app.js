var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug');

var indexRouter = require('./routes/index');
var _registrationRouter = require('./docs/clients/_registration');
var _backofficeRouter = require('./docs/clients/_backoffice');
var _employerRouter = require('./docs/clients/_employer');
var _payrollRouter = require('./docs/clients/_payroll');
var _memberRouter = require('./docs/clients/_member');

var app = express();

app.use(logger('dev'));
app.use(express.json({
    limit: '5mb',
    extended: true
}));
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, employerAuthorization, authorization-data");
    next();
});

app.use('/', indexRouter);
app.use('/registration', _registrationRouter);
app.use('/backoffice', _backofficeRouter);
app.use('/employer', _employerRouter);
app.use('/payroll', _payrollRouter);
app.use('/member', _memberRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Route not found!'
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});