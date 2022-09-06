/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _payroll = require("../../docs/components/component_payroll/payroll");

router.post('/payroll_apiSelection/', function (request, response) {
    try {

        let strResult = _payroll.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll found!");
            else {
                clientResponse.sendAll(result, response, "Payroll records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiSelect/', function (request, response) {
    try {

        let strResult = _payroll.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No payroll found!");
            else {
                clientResponse.sendData(result, response, "Payroll records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiSelectAll/', function (request, response) {
    try {

        let strResult = _payroll.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No payroll found!");
            else {
                clientResponse.sendData(result, response, "Payroll records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiDelete/', async function (request, response) {
    try {

        let strResult = await _payroll.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Payroll, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Payroll, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiInsert/', async function (request, response) {
    try {

        let strResult = await _payroll.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Payroll, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _payroll.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Payroll, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Payroll, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/payroll_apiDeleteAll/', async function (request, response) {
    try {

        let strResult = await _payroll.dbDeleteAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.deleteData([], response, "Payroll, Record deleted!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiDeleteAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiSalaryProcessExection/', async function (request, response) {
    try {

        let strResult = await _payroll.dbSalaryProcessExection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, strQuery);

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSalaryProcessExection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiSalaryProcessRecalculation/', async function (request, response) {
    try {

        let strResult = await _payroll.dbSalaryProcessRecalculation(request, response);
        clientResponse.insertData(strResult, response, "Payroll, Exection process is complated!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSalaryProcessRecalculation : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiSalaryInsertProcessExection/', async function (request, response) {
    try {

        let strResult = await _payroll.dbSalaryInsertProcessExection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, "Payroll, Record inserted!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiExportSalary/', async function (request, response) {
    try {

        let strResult = await _payroll.dbExportSalary(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiUploadSalary/', async function (request, response) {
    try {

        let strResult = await _payroll.dbUploadSalary(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, "Payroll, Exection process is complated!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSalaryProcessExection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiLockedSalary/', async function (request, response) {
    try {

        let strResult = await _payroll.dbLockedSalary(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, strQuery);

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiSalaryProcessExection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#reports
/* Section 1 */
router.post('/payroll_apiPayrollPayslipReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollPayslipReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollPayslipReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiPayrollDetailReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollDetailReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollDetailReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiPayrollOvertimeReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollOvertimeReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollOvertimeReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiPayrollAdditionalPayReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollAdditionalPayReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollAdditionalPayReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiPayrollShiftReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollShiftReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollShiftReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* Section 2 */
/* Payment method and all gov report */
router.post('/payroll_apiPayrollGovReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollGovReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollShiftReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiPayrollGovCP38Report/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollGovCP38Report(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollShiftReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* Section 3 */
/* Bank Report Based on bank code */

router.post('/payroll_apibankReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbSalaryBankReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollShiftReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* Section 4 */
/* EA Form and CP22A Report */

router.post('/payroll_apiEAFormReport/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollEAFormReport(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollShiftReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/payroll_apiPCB2Report/', async function (request, response) {
    try {

        let strResult = await _payroll.dbPayrollPCB2Report(request, response);
        let strFlag = strResult.flag;
        let result = strResult.result;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (result.length > 0)
            clientResponse.sendAll(result, response, "Payroll records are listed!");
        else
            clientResponse.emptyData([], response, "No payroll found!");

    } catch (error) {
        dbCommon.log_file('Payroll, payroll_apiPayrollShiftReport : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});



module.exports = router;