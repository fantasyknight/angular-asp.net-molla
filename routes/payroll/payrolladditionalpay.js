/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrolladditionalpay = require("../../docs/components/component_payroll/payrolladditionalpay");

router.post('/payrolladditionalpay_apiSelection/', function (request, response) {
    try {

        let strResult = _payrolladditionalpay.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll additional-pay found!");
            else {
                clientResponse.sendAll(result, response, "Payroll additional-pay records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Additional-Pay, payrolladditionalpay_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolladditionalpay_apiSelect/', function (request, response) {
    try {

        let strResult = _payrolladditionalpay.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll additional-pay found!");
            else {
                clientResponse.sendData(result, response, "Payroll additional-pay records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Additional-Pay, payrolladditionalpay_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolladditionalpay_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrolladditionalpay.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll additional-pay found!");
            else {
                clientResponse.sendData(result, response, "Payroll additional-pay records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Additional-Pay, payrolladditionalpay_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolladditionalpay_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrolladditionalpay.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll additional-pay, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll additional-pay, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Additional-Pay, payrolladditionalpay_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolladditionalpay_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrolladditionalpay.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll additional-pay, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll additional-pay, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Additional-Pay, payrolladditionalpay_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolladditionalpay_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrolladditionalpay.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll additional-pay, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll additional-pay, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Additional-Pay, payrolladditionalpay_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;