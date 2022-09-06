/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrollshift = require("../../docs/components/component_payroll/payrollshift");

router.post('/payrollshift_apiSelection/', function (request, response) {
    try {

        let strResult = _payrollshift.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll shift found!");
            else {
                clientResponse.sendAll(result, response, "Payroll shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Shift, payrollshift_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollshift_apiSelect/', function (request, response) {
    try {

        let strResult = _payrollshift.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll shift found!");
            else {
                clientResponse.sendData(result, response, "Payroll shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Shift, payrollshift_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollshift_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrollshift.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll shift found!");
            else {
                clientResponse.sendData(result, response, "Payroll shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Shift, payrollshift_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollshift_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrollshift.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Shift, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Shift, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Shift, payrollshift_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollshift_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrollshift.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Shift, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Shift, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Shift, payrollshift_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollshift_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrollshift.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Shift, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Shift, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Shift, payrollshift_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;