/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerbranch = require("../../docs/components/component_employer/employerbranch");

router.post('/employerbranch_apiSelection/', function (request, response) {
    try {

        let strResult = _employerbranch.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No branch found!");
            else {
                clientResponse.sendAll(result, response, "Branch records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerbranch_apiSelect/', function (request, response) {
    try {

        let strResult = _employerbranch.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No branch found!");
            else {
                clientResponse.sendData(result, response, "Branch records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerbranch_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerbranch.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No branch found!");
            else {
                clientResponse.sendData(result, response, "Branch records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerbranch_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerbranch.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Branch, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Branch, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerbranch_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerbranch.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Branch, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Branch, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerbranch_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerbranch.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Branch, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Branch, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employerbranch_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employerbranch.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No branch found!");
            else {
                clientResponse.sendAll(result, response, "Branch records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerbranch_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = await _employerbranch.dbInsertDefaultValue(request, response);
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
                clientResponse.insertData(result, response, "Branch, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Branch, employerbranch_apiInsertDefaulValue : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;