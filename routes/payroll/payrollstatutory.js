/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrollstatutory = require("../../docs/components/component_payroll/payrollstatutory");

router.post('/payrollstatutory_apiSelection/', function (request, response) {
    try {

        let strResult = _payrollstatutory.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll statutory found!");
            else {
                clientResponse.sendAll(result, response, "Payroll statutory records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Statutory, payrollstatutory_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollstatutory_apiSelect/', function (request, response) {
    try {

        let strResult = _payrollstatutory.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll statutory found!");
            else {
                clientResponse.sendData(result, response, "Payroll statutory records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Statutory, payrollstatutory_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollstatutory_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrollstatutory.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll statutory found!");
            else {
                clientResponse.sendData(result, response, "Payroll statutory records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Statutory, payrollstatutory_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollstatutory_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrollstatutory.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Statutory, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Statutory, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Statutory, payrollstatutory_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollstatutory_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrollstatutory.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Statutory, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Statutory, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Statutory, payrollstatutory_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollstatutory_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrollstatutory.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Statutory, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Statutory, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Statutory, payrollstatutory_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;