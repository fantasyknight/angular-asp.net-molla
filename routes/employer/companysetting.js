/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _companysetting = require("../../docs/components/component_employer/companysetting");

router.post('/companysetting_apiSelection/', function (request, response) {
    try {

        let strResult = _companysetting.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No company setting found!");
            else {
                clientResponse.sendAll(result, response, "Company setting records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companysetting_apiSelect/', function (request, response) {
    try {

        let strResult = _companysetting.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No company setting found!");
            else {
                clientResponse.sendData(result, response, "Company setting records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companysetting_apiSelectAll/', function (request, response) {
    try {

        let strResult = _companysetting.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No company setting found!");
            else {
                clientResponse.sendData(result, response, "Company setting records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companysetting_apiDelete/', async function (request, response) {
    try {

        let strResult = await _companysetting.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Company setting, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Company setting, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companysetting_apiInsert/', async function (request, response) {
    try {

        let strResult = await _companysetting.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Company setting, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Company setting, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/companysetting_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _companysetting.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Company setting, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Company setting, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/companysetting_apiSelectCount/', function (request, response) {
    try {

        let strResult = _companysetting.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No company setting found!");
            else {
                clientResponse.sendAll(result, response, "Company setting records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Company Setting, companysetting_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;