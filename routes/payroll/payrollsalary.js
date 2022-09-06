/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payrollsalary = require("../../docs/components/component_payroll/payrollsalary");

router.post('/payrollsalary_apiSelection/', function (request, response) {
    try {

        let strResult = _payrollsalary.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll salary found!");
            else {
                clientResponse.sendAll(result, response, "Payroll salary records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollsalary_apiSelect/', function (request, response) {
    try {

        let strResult = _payrollsalary.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll salary found!");
            else {
                clientResponse.sendData(result, response, "Payroll salary records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollsalary_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payrollsalary.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll salary found!");
            else {
                clientResponse.sendData(result, response, "Payroll salary records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollsalary_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payrollsalary.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll Salary, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll Salary, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollsalary_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payrollsalary.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Salary, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll Salary, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payrollsalary_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payrollsalary.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll Salary, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll Salary, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/payrollsalary_apiSelectAll_Detail/', function (request, response) {
    try {

        let strResult = _payrollsalary.dbSelectAllDetail(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let strpayrollsalary = strResult.query[0].payrollsalary;
        let payrollstatutory = strResult.query[0].payrollstatutory;
        let payrollnpl = strResult.query[0].payrollnpl;
        let payrollshift = strResult.query[0].payrollshift;
        let payrolladditionalpay = strResult.query[0].payrolladditionalpay;
        let payrollovertime = strResult.query[0].payrollovertime;
        let payrollallowancendeduction = strResult.query[0].payrollallowancendeduction;
        let payrollloan = strResult.query[0].payrollloan;

        let strQueryManage = strpayrollsalary +
            ";" + payrollstatutory +
            ";" + payrollnpl +
            ";" + payrollshift +
            ";" + payrolladditionalpay +
            ";" + payrollovertime +
            ";" + payrollallowancendeduction +
            ";" + payrollloan;

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQueryManage, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll salary found!");
            else {

                let data = {
                    PayrollSalary: result[0],
                    PayrollStatutory: result[1],
                    PayrollNPL: result[2],
                    payrollShift: result[3],
                    payrollAdditionalpay: result[4],
                    payrollOvertime: result[5],
                    payrollAllowancenDeduction: result[6],
                    payrollLoan: result[7]
                };

                clientResponse.sendAll(data, response, "Payroll salary records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll Salary, payrollsalary_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;