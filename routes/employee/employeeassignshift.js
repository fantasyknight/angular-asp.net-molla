/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeassignshift = require("../../docs/components/component_employee/employeeassignshift");

router.post('/employeeassignshift_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeassignshift.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No shift found!");
            else {
                clientResponse.sendAll(result, response, "Shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Assign Shift, employeeassignshift_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeassignshift_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeassignshift.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No shift found!");
            else {
                clientResponse.sendData(result, response, "Shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Assign Shift, employeeassignshift_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeassignshift_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeassignshift.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No shift found!");
            else {
                clientResponse.sendData(result, response, "Shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Assign Shift, employeeassignshift_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeassignshift_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeassignshift.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Shift, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Shift, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Assign Shift, employeeassignshift_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeassignshift_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeassignshift.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Shift, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Shift, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Assign Shift, employeeassignshift_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeassignshift_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeassignshift.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Shift, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Shift, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Assign Shift, employeeassignshift_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;