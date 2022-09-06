/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrollattendance = require("../../docs/components/component_payroll/payrollattendance");

router.post('/payrollattendance_apiSelection/', function (request, response) {
    try {

        let strResult = _payrollattendance.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll attendance found!");
            else {
                clientResponse.sendAll(result, response, "Payroll attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiSelect/', function (request, response) {
    try {

        let strResult = _payrollattendance.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll attendance found!");
            else {
                clientResponse.sendAll(result, response, "Payroll attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrollattendance.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll attendance found!");
            else {
                clientResponse.sendData(result, response, "Payroll attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrollattendance.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Attendance, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Attendance, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrollattendance.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Attendance, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Attendance, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrollattendance.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Attendance, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Attendance, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/payrollattendance_apiUpdateManual/', async function (request, response) {
    try {

        let strResult = await _payrollattendance.dbUpdateManual(request, response);
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
                clientResponse.updateData(result, response, "Payroll Attendance, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiInsertAttendanceSalaryProcess/', async function (request, response) {
    try {

        let strResult = await _payrollattendance.dbAttendanceSalaryCalculation(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, "Payroll Attendance, Record inserted!");


    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollattendance_apiReportAttendance/', function (request, response) {
    try {

        let strResult = _payrollattendance.dbReportAttendance(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll attendance found!");
            else {
                clientResponse.sendAll(result, response, "Payroll attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Attendance, payrollattendance_apiReportAttendance : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;