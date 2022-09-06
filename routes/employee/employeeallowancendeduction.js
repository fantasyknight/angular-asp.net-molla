/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeallowancendeduction = require("../../docs/components/component_employee/employeeallowancendeduction");

router.post('/employeeallowancendeduction_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeallowancendeduction.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No allowancen deduction found!");
            else {
                clientResponse.sendAll(result, response, "Allowancen Deduction records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Allowancen Deduction, employeeallowancendeduction_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeallowancendeduction_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeallowancendeduction.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No allowancen deduction found!");
            else {
                clientResponse.sendData(result, response, "Allowancen Deduction records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Allowancen Deduction, employeeallowancendeduction_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeallowancendeduction_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeallowancendeduction.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No allowancen deduction found!");
            else {
                clientResponse.sendData(result, response, "Allowancen Deduction records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Allowancen Deduction, employeeallowancendeduction_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeallowancendeduction_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeallowancendeduction.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Allowancen Deduction, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Allowancen Deduction, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Allowancen Deduction, employeeallowancendeduction_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeallowancendeduction_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeallowancendeduction.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Allowancen Deduction, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Allowancen Deduction, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Allowancen Deduction, employeeallowancendeduction_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeallowancendeduction_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeallowancendeduction.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Allowancen Deduction, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Allowancen Deduction, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Allowancen Deduction, employeeallowancendeduction_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;