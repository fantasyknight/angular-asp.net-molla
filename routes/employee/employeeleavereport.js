/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeleavereport = require("../../docs/components/component_employee/employeeleavereport");

router.post('/employeeleavereport_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeleavereport.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendAll(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeleavereport.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendAll(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiSelectAll/', async function (request, response) {
    try {

        let strResult = _employeeleavereport.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendData(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeleavereport.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Leave Report, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Leave Report, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeleavereport.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Report, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Leave Report, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeleavereport.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Report, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Leave Report, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeeleavereport_apiInsertMaster/', async function (request, response) {
    try {

        let strResult = await _employeeleavereport.dbInsertMaster(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, "Leave Report, Record inserted!");

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiReportLeave/', function (request, response) {
    try {

        let strResult = _employeeleavereport.dbReportLeave(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendAll(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiReportLeave : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiReportEmployeeDetail/', function (request, response) {
    try {

        let strResult = _employeeleavereport.dbReportEmployeeDetail(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendAll(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiReportEmployeeDetail : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiReportCurrentYearSummary/', function (request, response) {
    try {

        let strResult = _employeeleavereport.dbReportCurrentYearSummary(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendAll(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiReportCurrentYearSummary : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiReportLeaveDetail/', function (request, response) {
    try {

        let strResult = _employeeleavereport.dbReportLeaveDetail(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave report found!");
            else {
                clientResponse.sendAll(result, response, "Leave report records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiReportCurrentYearSummary : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});



// Detail 

router.post('/employeeleavereport_apiEmployeeCurrentYearCalculation/', async function (request, response) {
    try {

        let strResult = await _employeeleavereport.dbEmployeeLeaveCalculation(request, response);
        let strFlag = strResult.flag;
        let result = strResult.data;

        if (strFlag == false)
            return clientResponse.errorData(strQuery, response);

        clientResponse.sendAll(result, response, "Leave report records are listed!");

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleavereport_apiCurrentYearCalculation/', async function (request, response) {
    try {

        let strResult = await _employeeleavereport.dbLeaveCalculation(request, response);
        let strFlag = strResult.flag;
        let result = strResult.data;

        if (strFlag == false)
            return clientResponse.errorData(strQuery, response);

        clientResponse.sendAll(result, response, "Leave report records are listed!");

    } catch (error) {
        dbCommon.log_file('Employee Leave Report, employeeleavereport_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;