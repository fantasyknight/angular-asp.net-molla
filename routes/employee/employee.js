/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employee = require("../../docs/components/component_employee/employee");

router.post('/employee_apiSelection/', function (request, response) {
    try {

        let strResult = _employee.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employee found!");
            else {
                clientResponse.sendAll(result, response, "Employee records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiSelect/', function (request, response) {
    try {

        let strResult = _employee.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employee found!");
            else {
                clientResponse.sendData(result, response, "Employee records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employee.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No employee found!");
            else {
                clientResponse.sendData(result, response, "Employee records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employee.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Employee, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Employee, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employee.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Employee, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Employee, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employee.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Employee, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Employee, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employee_apiUpdateEntitlement/', function (request, response) {
    try {

        let strResult = _employee.dbUpdateEntitlement(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Employee, Record updated!");
            }
        });
    } catch (error) {
        dbCommon.log_file('Employee, apiUpdateEntitlement : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employee.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employee found!");
            else {
                clientResponse.sendAll(result, response, "Employee records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employee_apiUpdate_MultipleShiftStatus/', async function (request, response) {
    try {

        let strResult = await _employee.dbUpdateMultipleShift(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Employee, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee, employee_apiUpdate_MultipleShiftStatus : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;