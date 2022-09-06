/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrollallowancendeduction = require("../../docs/components/component_payroll/payrollallowancendeduction");

router.post('/payrollallowancendeduction_apiSelection/', function (request, response) {
    try {

        let strResult = _payrollallowancendeduction.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll allowancen-deduction found!");
            else {
                clientResponse.sendAll(result, response, "Payroll allowancen-deduction records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Allowancen-Deduction, payrollallowancendeduction_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollallowancendeduction_apiSelect/', function (request, response) {
    try {

        let strResult = _payrollallowancendeduction.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll allowancen-deduction found!");
            else {
                clientResponse.sendData(result, response, "Payroll allowancen-deduction records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Allowancen-Deduction, payrollallowancendeduction_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollallowancendeduction_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrollallowancendeduction.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll allowancen-deduction found!");
            else {
                clientResponse.sendData(result, response, "Payroll allowancen-deduction records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Allowancen-Deduction, payrollallowancendeduction_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollallowancendeduction_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrollallowancendeduction.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Allowancen-Deduction, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Allowancen-Deduction, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Allowancen-Deduction, payrollallowancendeduction_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollallowancendeduction_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrollallowancendeduction.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Allowancen-Deduction, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Allowancen-Deduction, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Allowancen-Deduction, payrollallowancendeduction_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollallowancendeduction_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrollallowancendeduction.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Allowancen-Deduction, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Allowancen-Deduction, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Allowancen-Deduction, payrollallowancendeduction_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;