/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeadditionalpaysetup = require("../../docs/components/component_employee/employeeadditionalpaysetup");

router.post('/employeeadditionalpaysetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeadditionalpaysetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No additionalpay setup found!");
            else {
                clientResponse.sendAll(result, response, "AdditionalPay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee AdditionalPay Setup, employeeadditionalpaysetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeadditionalpaysetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeadditionalpaysetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No additionalpay setup found!");
            else {
                clientResponse.sendData(result, response, "AdditionalPay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee AdditionalPay Setup, employeeadditionalpaysetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeadditionalpaysetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeadditionalpaysetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No additionalpay setup found!");
            else {
                clientResponse.sendData(result, response, "AdditionalPay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee AdditionalPay Setup, employeeadditionalpaysetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeadditionalpaysetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeadditionalpaysetup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "AdditionalPay setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "AdditionalPay setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee AdditionalPay Setup, employeeadditionalpaysetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeadditionalpaysetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeadditionalpaysetup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "AdditionalPay setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "AdditionalPay setup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee AdditionalPay Setup, employeeadditionalpaysetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeadditionalpaysetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeadditionalpaysetup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "AdditionalPay setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "AdditionalPay setup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee AdditionalPay Setup, employeeadditionalpaysetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeeadditionalpaysetup_apiSelectAll_View/', function (request, response) {
    try {

        let strResult = _employeeadditionalpaysetup.dbSelectAll_View(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No Ot setup found!");
            else {
                clientResponse.sendAll(result, response, "OT setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeadditionalpaysetup_apiDelete_All/', async function (request, response) {
    try {

        let strResult = await _employeeadditionalpaysetup.dbDelete_All(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "OT Setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "OT Setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;