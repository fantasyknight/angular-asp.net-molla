/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrollloan = require("../../docs/components/component_payroll/payrollloan");

router.post('/payrollloan_apiSelection/', function (request, response) {
    try {

        let strResult = _payrollloan.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll loan found!");
            else {
                clientResponse.sendAll(result, response, "Payroll loan records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Loan, payrollloan_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollloan_apiSelect/', function (request, response) {
    try {

        let strResult = _payrollloan.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll loan found!");
            else {
                clientResponse.sendData(result, response, "Payroll loan records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Loan, payrollloan_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollloan_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrollloan.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll loan found!");
            else {
                clientResponse.sendData(result, response, "Payroll loan records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Loan, payrollloan_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollloan_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrollloan.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Loan, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Loan, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Loan, payrollloan_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollloan_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrollloan.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Loan, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Loan, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Loan, payrollloan_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollloan_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrollloan.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Loan, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Loan, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Loan, payrollloan_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;