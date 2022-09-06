/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerotsetup = require("../../docs/components/component_employer/employerotsetup");

router.post('/employerotsetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employerotsetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No OT Setup found!");
            else {
                clientResponse.sendAll(result, response, "OT Setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerotsetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employerotsetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No OT Setup found!");
            else {
                clientResponse.sendData(result, response, "OT Setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerotsetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerotsetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No OT Setup found!");
            else {
                clientResponse.sendData(result, response, "OT Setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerotsetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerotsetup.dbDelete(request, response);
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
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerotsetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerotsetup.dbInsert(request, response);
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
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerotsetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerotsetup.dbUpdate(request, response);
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
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employerotsetup_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = _employerotsetup.dbInsertDefaultValue(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Otsetup, Default record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Otsetup, apiDefaultInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerotsetup_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employerotsetup.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No OT Setup found!");
            else {
                clientResponse.sendAll(result, response, "OT Setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer OT Setup, employerotsetup_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;