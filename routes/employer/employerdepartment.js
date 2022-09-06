/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerdepartment = require("../../docs/components/component_employer/employerdepartment");

router.post('/employerdepartment_apiSelection/', function (request, response) {
    try {

        let strResult = _employerdepartment.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No department found!");
            else {
                clientResponse.sendAll(result, response, "Department records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerdepartment_apiSelect/', function (request, response) {
    try {

        let strResult = _employerdepartment.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No department found!");
            else {
                clientResponse.sendData(result, response, "Department records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerdepartment_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerdepartment.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No department found!");
            else {
                clientResponse.sendData(result, response, "Department records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerdepartment_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerdepartment.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Department, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Department, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerdepartment_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerdepartment.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Department, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Department, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerdepartment_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerdepartment.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Department, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Department, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employerdepartment_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employerdepartment.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No department found!");
            else {
                clientResponse.sendAll(result, response, "Department records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerdepartment_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = await _employerdepartment.dbInsertDefaultValue(request, response);
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
                clientResponse.insertData(result, response, "Department, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Department, employerdepartment_apiInsertDefaulValue : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;