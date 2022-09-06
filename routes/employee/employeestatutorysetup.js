/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeestatutorysetup = require("../../docs/components/component_employee/employeestatutorysetup");

router.post('/employeestatutorysetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employeestatutorysetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No statutory setup found!");
            else {
                clientResponse.sendAll(result, response, "Statutory setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Statutory Setup, employeestatutorysetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeestatutorysetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employeestatutorysetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No statutory setup found!");
            else {
                clientResponse.sendData(result, response, "Statutory setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Statutory Setup, employeestatutorysetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeestatutorysetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeestatutorysetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No statutory setup found!");
            else {
                clientResponse.sendData(result, response, "Statutory setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Statutory Setup, employeestatutorysetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeestatutorysetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeestatutorysetup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Statutory setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Statutory setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Statutory Setup, employeestatutorysetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeestatutorysetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeestatutorysetup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Statutory setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Statutory setup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Statutory Setup, employeestatutorysetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeestatutorysetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeestatutorysetup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Statutory setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Statutory setup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Statutory Setup, employeestatutorysetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;