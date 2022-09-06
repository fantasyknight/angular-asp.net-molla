/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeotsetup = require("../../docs/components/component_employee/employeeotsetup");

router.post('/employeeotsetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeotsetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No Ot setup found!");
            else {
                clientResponse.sendAll(result, response, "OT setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeotsetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeotsetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No Ot setup found!");
            else {
                clientResponse.sendData(result, response, "OT setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeotsetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeotsetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No Ot setup found!");
            else {
                clientResponse.sendData(result, response, "OT setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeotsetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeotsetup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "OT Setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "OT Setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeotsetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeotsetup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "OT Setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "OT Setup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeotsetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeotsetup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "OT Setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "OT Setup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeeotsetup_apiSelectAll_View/', function (request, response) {
    try {

        let strResult = _employeeotsetup.dbSelectAll_View(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No Ot setup found!");
            else {
                clientResponse.sendAll(result, response, "OT setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeotsetup_apiDelete_All/', async function (request, response) {
    try {

        let strResult = await _employeeotsetup.dbDelete_All(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "OT Setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "OT Setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee OT Setup, employeeotsetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;