/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeedependent = require("../../docs/components/component_employee/employeedependent");

router.post('/employeedependent_apiSelection/', function (request, response) {
    try {

        let strResult = _employeedependent.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No dependent found!");
            else {
                clientResponse.sendAll(result, response, "Dependent records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Dependent, employeedependent_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedependent_apiSelect/', function (request, response) {
    try {

        let strResult = _employeedependent.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No dependent found!");
            else {
                clientResponse.sendData(result, response, "Dependent records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Dependent, employeedependent_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedependent_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeedependent.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No dependent found!");
            else {
                clientResponse.sendData(result, response, "Dependent records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Dependent, employeedependent_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedependent_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeedependent.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Dependent, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Dependent, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Dependent, employeedependent_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedependent_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeedependent.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Dependent, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Dependent, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Dependent, employeedependent_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeedependent_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeedependent.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Dependent, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Dependent, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Dependent, employeedependent_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeedependent_apiUpdate_Relation/', dbSecurity.authorization, function (request, response) {
    try {

        let strResult = _employeedependent.dbUpdateRelation(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Dependent, Record updated!");
            }
        });
    } catch (error) {
        dbCommon.log_file('Dependent, apiUpdateData : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;