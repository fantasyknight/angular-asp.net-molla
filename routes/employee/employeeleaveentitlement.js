/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeleaveentitlement = require("../../docs/components/component_employee/employeeleaveentitlement");

router.post('/employeeleaveentitlement_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeleaveentitlement.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave entitlement found!");
            else {
                clientResponse.sendAll(result, response, "Leave entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveentitlement_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeleaveentitlement.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave entitlement found!");
            else {
                clientResponse.sendData(result, response, "Leave entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveentitlement_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeleaveentitlement.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No leave entitlement found!");
            else {
                clientResponse.sendData(result, response, "Leave entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveentitlement_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeleaveentitlement.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Leave Entitlement, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Leave Entitlement, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveentitlement_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeleaveentitlement.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Entitlement, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Leave Entitlement, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveentitlement_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeleaveentitlement.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Entitlement, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Leave Entitlement, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeeleaveentitlement_apiEntitlementCalculation/', async function (request, response) {
    try {

        let strResult = await _employeeleaveentitlement.dbEntitlementCalculation(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;
        let _result = strResult.result;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.sendAll(_result, response, "Leave entitlement records are listed!");

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveentitlement_apiUpdateStatus/', async function (request, response) {
    try {

        let strResult = await _employeeleaveentitlement.dbUpdateStatus(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Leave Entitlement, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Entitlement, employeeleaveentitlement_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});



module.exports = router;