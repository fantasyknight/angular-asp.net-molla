/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employersubscriptiontopup = require("../../docs/components/component_employer/employersubscriptiontopup");

router.post('/employersubscriptiontopup_apiSelection/', function (request, response) {
    try {

        let strResult = _employersubscriptiontopup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No subscription top-up found!");
            else {
                clientResponse.sendAll(result, response, "Subscription Top-up records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Subscription Top-up, employersubscriptiontopup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employersubscriptiontopup_apiSelect/', function (request, response) {
    try {

        let strResult = _employersubscriptiontopup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No subscription top-up found!");
            else {
                clientResponse.sendData(result, response, "Subscription Top-up records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Subscription Top-up, employersubscriptiontopup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employersubscriptiontopup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employersubscriptiontopup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No subscription top-up found!");
            else {
                clientResponse.sendData(result, response, "Subscription Top-up records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Subscription Top-up, employersubscriptiontopup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employersubscriptiontopup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employersubscriptiontopup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Subscription Top-up, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Subscription Top-up, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Subscription Top-up, employersubscriptiontopup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employersubscriptiontopup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employersubscriptiontopup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Subscription Top-up, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Subscription Top-up, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Subscription Top-up, employersubscriptiontopup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employersubscriptiontopup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employersubscriptiontopup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Subscription Top-up, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Subscription Top-up, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Subscription Top-up, employersubscriptiontopup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;