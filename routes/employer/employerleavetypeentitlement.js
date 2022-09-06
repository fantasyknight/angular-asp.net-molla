/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerleavetypeentitlement = require("../../docs/components/component_employer/employerleavetypeentitlement");

router.post('/employerleavetypeentitlement_apiSelection/', function (request, response) {
    try {

        let strResult = _employerleavetypeentitlement.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No Leave type entitlement found!");
            else {
                clientResponse.sendAll(result, response, "LeaveType-Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type Entitlement, employerleavetypeentitlement_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetypeentitlement_apiSelect/', function (request, response) {
    try {

        let strResult = _employerleavetypeentitlement.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No Leave type entitlement found!");
            else {
                clientResponse.sendData(result, response, "LeaveType-Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type Entitlement, employerleavetypeentitlement_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetypeentitlement_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerleavetypeentitlement.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No Leave type entitlement found!");
            else {
                clientResponse.sendData(result, response, "LeaveType-Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type Entitlement, employerleavetypeentitlement_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetypeentitlement_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerleavetypeentitlement.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "LeaveType-Entitlement, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "LeaveType-Entitlement, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type Entitlement, employerleavetypeentitlement_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetypeentitlement_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerleavetypeentitlement.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "LeaveType-Entitlement, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "LeaveType-Entitlement, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type Entitlement, employerleavetypeentitlement_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetypeentitlement_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerleavetypeentitlement.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "LeaveType-Entitlement, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "LeaveType-Entitlement, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type Entitlement, employerleavetypeentitlement_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetypeentitlement_apiRemoveLeaveEntitlement/', dbSecurity.authorization, function (request, response) {
    try {

        let strResult = _employerleavetypeentitlement.dbRemoveLeaveEntitlement(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "");
            }
        });
    } catch (error) {
        dbCommon.log_file('Employee, apiRemoveLeaveEntitlement : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;