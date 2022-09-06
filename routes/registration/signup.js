/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _signup = require("../../docs/components/component_registration/signup");

router.post('/signup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _signup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No signup found!");
            else {
                clientResponse.sendData(result, response, "Signup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Sign-Up, signup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/signup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _signup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Signup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Signup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Sign-Up, signup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/signup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _signup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Signup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Signup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Sign-Up, signup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/signup_apiVerifyFlag/', async function (request, response) {
    try {

        let strResult = await _signup.dbVerifyFlag(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "SignIn, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SignIn, apiVerifyFlag : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;