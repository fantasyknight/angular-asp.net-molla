/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeattendance = require("../../docs/components/component_employee/employeeattendance");

router.post('/employeeattendance_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeattendance.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No attendance found!");
            else {
                clientResponse.sendAll(result, response, "Attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeattendance_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeattendance.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No attendance found!");
            else {
                clientResponse.sendData(result, response, "Attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeattendance_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeattendance.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No attendance found!");
            else {
                clientResponse.sendData(result, response, "Attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeattendance_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeattendance.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Attendance, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Attendance, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeattendance_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeattendance.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Attendance, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Attendance, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeattendance_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeattendance.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Attendance, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Attendance, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeeattendance_apiCalculateAndTransfer/', async function (request, response) {
    try {

        let strResult = await _employeeattendance.dbCalculateAndTransfer(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery);

        clientResponse.sendAll("", response, strQuery);

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiCalculateAndTransfer : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeattendance_apiBulkUploadExcel/', async function (request, response) {
    try {

        let strResult = await _employeeattendance.dbBulkUploadExcel(request, response);
        let strFlag = strResult.flag;

        if (strFlag == true)
            clientResponse.insertData([], response, "Attendance, Record inserted!");
        else
            clientResponse.emptyData([], response, "Attendance, Record are missing!");

    } catch (error) {
        dbCommon.log_file('Employee Attendance, employeeattendance_apiBulkUploadExcel : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;