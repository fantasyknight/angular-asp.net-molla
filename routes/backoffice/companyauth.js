/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _companyauth = require("../../docs/components/component_backoffice/companyauth");

router.post('/companyauth_apiSelection/', function (request, response) {
    try {

        let strResult = _companyauth.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No company found!");
            else {
                clientResponse.sendAll(result, response, "Company authentication records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Company Authentication, companyauth_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companyauth_apiSelect/', function (request, response) {
    try {

        let strResult = _companyauth.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No company found!");
            else {
                result[0].companyAuthPassword = dbSecurity.decrypt(result[0].companyAuthPassword);
                clientResponse.sendData(result, response, "Company authentication records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Company Authentication, companyauth_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companyauth_apiSelectAll/', function (request, response) {
    try {

        let strResult = _companyauth.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No company found!");
            else {
                clientResponse.sendData(result, response, "Company authentication records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Company Authentication, companyauth_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companyauth_apiDelete/', async function (request, response) {
    try {

        let strResult = await _companyauth.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Company Authentication, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Company Authentication, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Company Authentication, companyauth_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companyauth_apiInsert/', async function (request, response) {
    try {

        let strResult = await _companyauth.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Company Authentication, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Company Authentication, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Company Authentication, companyauth_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companyauth_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _companyauth.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Company Authentication, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Company Authentication, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Company Authentication, companyauth_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companyauth_apiCountData/', dbSecurity.authorization, function (request, response) {
    try {

        let strResult = _companyauth.dbCountData(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "");
            else {
                clientResponse.sendData(result, response, "");
            }
        });

    } catch (error) {
        dbCommon.log_file('CompanyAuth, apiCountData : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;