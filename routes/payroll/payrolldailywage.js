/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrolldailywage = require("../../docs/components/component_payroll/payrolldailywage");

router.post('/payrolldailywage_apiSelection/', function (request, response) {
    try {

        let strResult = _payrolldailywage.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll dailywage found!");
            else {
                clientResponse.sendAll(result, response, "Payroll dailywage records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Daily-Wage, payrolldailywage_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolldailywage_apiSelect/', function (request, response) {
    try {

        let strResult = _payrolldailywage.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll dailywage found!");
            else {
                clientResponse.sendData(result, response, "Payroll dailywage records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Daily-Wage, payrolldailywage_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolldailywage_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrolldailywage.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll dailywage found!");
            else {
                clientResponse.sendData(result, response, "Payroll dailywage records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Daily-Wage, payrolldailywage_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolldailywage_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrolldailywage.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Daily-Wage, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Daily-Wage, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Daily-Wage, payrolldailywage_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolldailywage_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrolldailywage.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Daily-Wage, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Daily-Wage, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Daily-Wage, payrolldailywage_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrolldailywage_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrolldailywage.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Daily-Wage, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Daily-Wage, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Daily-Wage, payrolldailywage_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;