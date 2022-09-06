/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeedailyattendance = require("../../docs/components/component_employee/employeedailyattendance");

router.post('/employeedailyattendance_apiSelection/', function (request, response) {
    try {

        let strResult = _employeedailyattendance.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No daily attendance found!");
            else {
                clientResponse.sendAll(result, response, "Daily attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiSelect/', function (request, response) {
    try {

        let strResult = _employeedailyattendance.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No daily attendance found!");
            else {
                clientResponse.sendData(result, response, "Daily attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeedailyattendance.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No daily attendance found!");
            else {
                clientResponse.sendData(result, response, "Daily attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Daily Attendance, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Daily Attendance, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Daily Attendance, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Daily Attendance, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Daily Attendance, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Daily Attendance, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeedailyattendance_apiReportAttendance/', function (request, response) {
    try {

        let strResult = _employeedailyattendance.dbReportAttendance(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No daily attendance found!");
            else {
                clientResponse.sendAll(result, response, "Daily attendance records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportStartEnd1/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportStartEnd1(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Startend-1 records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportStartEnd3/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportStartEnd3(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Startend-3 records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportStartEnd4/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportStartEnd4(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Startend-4 records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportStartEnd5/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportStartEnd5(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Startend-5 records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportOvertime/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportOvertime(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Overtime records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportAddPay/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportAddPay(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "AddPay records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportShift/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportShift(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Shift records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportMonthlyStatistic/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportMonthlyStatistic(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Monthly statistic records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiReportMonthlyStatistic : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportMonthlyAttendance/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportMonthlyAttendance(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Attendance records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiReportMonthlyStatistic : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedailyattendance_apiReportMultipleSheet/', async function (request, response) {
    try {

        let strResult = await _employeedailyattendance.dbReportMultipleSheet(request, response);
        let strFlag = strResult.flag;
        let strData = strResult.data;

        if (strFlag == false)
            clientResponse.emptyData([], response, "No attendance found!");
        else
            clientResponse.sendAll(strData, response, "Attendance records are listed!");

    } catch (error) {
        dbCommon.log_file('Daily Attendance, employeedailyattendance_apiReportMonthlyStatistic : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;