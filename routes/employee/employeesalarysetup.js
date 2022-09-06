/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeesalarysetup = require("../../docs/components/component_employee/employeesalarysetup");

router.post('/employeesalarysetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employeesalarysetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No salary setup found!");
            else {
                clientResponse.sendAll(result, response, "Salary setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Salary Setup, employeesalarysetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeesalarysetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employeesalarysetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No salary setup found!");
            else {
                clientResponse.sendData(result, response, "Salary setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Salary Setup, employeesalarysetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeesalarysetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeesalarysetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No salary setup found!");
            else {
                clientResponse.sendData(result, response, "Salary setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Salary Setup, employeesalarysetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeesalarysetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeesalarysetup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Salary setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Salary setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Salary Setup, employeesalarysetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeesalarysetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeesalarysetup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Salary setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Salary setup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Salary Setup, employeesalarysetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeesalarysetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeesalarysetup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Salary setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Salary setup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Salary Setup, employeesalarysetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;