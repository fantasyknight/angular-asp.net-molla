/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerentitlement = require("../../docs/components/component_employer/employerentitlement");

router.post('/employerentitlement_apiSelection/', function (request, response) {
    try {

        let strResult = _employerentitlement.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No entitlement found!");
            else {
                clientResponse.sendAll(result, response, "Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerentitlement_apiSelect/', function (request, response) {
    try {

        let strResult = _employerentitlement.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No entitlement found!");
            else {
                clientResponse.sendData(result, response, "Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerentitlement_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerentitlement.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No entitlement found!");
            else {
                clientResponse.sendData(result, response, "Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerentitlement_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerentitlement.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Entitlement, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Entitlement, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerentitlement_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerentitlement.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Entitlement, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Entitlement, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerentitlement_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerentitlement.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Entitlement, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Entitlement, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employerentitlement_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employerentitlement.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No entitlement found!");
            else {
                clientResponse.sendAll(result, response, "Entitlement records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Entitlement, employerentitlement_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerentitlement_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = await _employerentitlement.dbInsertDefaultValue(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Entitlement, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiInsertDefaulValue : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;