/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employershiftsetup = require("../../docs/components/component_employer/employershiftsetup");

router.post('/employershiftsetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employershiftsetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No shift setup found!");
            else {
                clientResponse.sendAll(result, response, "Shift setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employershiftsetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employershiftsetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No shift setup found!");
            else {
                clientResponse.sendData(result, response, "Shift setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employershiftsetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employershiftsetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No shift setup found!");
            else {
                clientResponse.sendData(result, response, "Shift setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employershiftsetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employershiftsetup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Shift setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Shift setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employershiftsetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employershiftsetup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Shift setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Shift setup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employershiftsetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employershiftsetup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Shift setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Shift setup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employershiftsetup_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = _employershiftsetup.dbInsertDefaultValue(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Otsetup, Default record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Otsetup, apiDefaultInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employershiftsetup_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employershiftsetup.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No shift setup found!");
            else {
                clientResponse.sendAll(result, response, "Shift setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Shift Setup, employershiftsetup_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;