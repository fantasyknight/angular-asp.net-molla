/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _mastersocso = require("../../docs/components/component_backoffice/mastersocso");

router.post('/socso_apiSelection/', function (request, response) {
    try {

        let strResult = _mastersocso.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No socso found!");
            else {
                clientResponse.sendAll(result, response, "SOCSO records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SOCSO, socso_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/socso_apiSelect/', function (request, response) {
    try {

        let strResult = _mastersocso.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No socso found!");
            else {
                clientResponse.sendData(result, response, "SOCSO records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SOCSO, socso_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/socso_apiSelectAll/', function (request, response) {
    try {

        let strResult = _mastersocso.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No socso found!");
            else {
                clientResponse.sendData(result, response, "SOCSO records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SOCSO, socso_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/socso_apiDelete/', async function (request, response) {
    try {

        let strResult = await _mastersocso.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "SOCSO, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "SOCSO, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SOCSO, socso_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/socso_apiInsert/', async function (request, response) {
    try {

        let strResult = await _mastersocso.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "SOCSO, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "SOCSO, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SOCSO, socso_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/socso_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _mastersocso.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "SOCSO, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "SOCSO, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('SOCSO, socso_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* excel bulk upload service */

router.post('/socso_apiUploadExcelFile/', async function (request, response) {
    try {

        let strResult = await _mastersocso.dbUploadExcelFile(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        clientResponse.insertData([], response, "EPF, Bulk record inserted!");

    } catch (error) {
        dbCommon.log_file('EPF, apiUploadExcelFile : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;