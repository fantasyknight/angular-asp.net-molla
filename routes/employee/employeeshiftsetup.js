/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeshiftsetup = require("../../docs/components/component_employee/employeeshiftsetup");

router.post('/employeeshiftsetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeshiftsetup.dbSelection(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeshiftsetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeshiftsetup.dbSelect(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeshiftsetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeshiftsetup.dbSelectAll(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeshiftsetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeshiftsetup.dbDelete(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeshiftsetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeshiftsetup.dbInsert(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeshiftsetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeshiftsetup.dbUpdate(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeeshiftsetup_apiSelectAll_View/', function (request, response) {
    try {

        let strResult = _employeeshiftsetup.dbSelectAll_View(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeshiftsetup_apiDelete_All/', dbSecurity.authorization, function (request, response) {
    try {

        let strResult = _employeeshiftsetup.dbDelete_All(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Shift setup, Record reseted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Shiftsetup, apiResetShiftSetup : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});


module.exports = router;