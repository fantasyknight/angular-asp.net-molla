/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _masterhrdf = require("../../docs/components/component_backoffice/masterhrdf");

router.post('/hrdf_apiSelection/', function (request, response) {
    try {

        let strResult = _masterhrdf.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No hrdf found!");
            else {
                clientResponse.sendAll(result, response, "hrdf records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('hrdf, hrdf_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/hrdf_apiSelect/', function (request, response) {
    try {

        let strResult = _masterhrdf.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No hrdf found!");
            else {
                clientResponse.sendData(result, response, "hrdf records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('hrdf, hrdf_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/hrdf_apiSelectAll/', function (request, response) {
    try {

        let strResult = _masterhrdf.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No hrdf found!");
            else {
                clientResponse.sendData(result, response, "hrdf records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('hrdf, hrdf_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/hrdf_apiDelete/', async function (request, response) {
    try {

        let strResult = await _masterhrdf.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "hrdf, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "hrdf, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('hrdf, hrdf_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/hrdf_apiInsert/', async function (request, response) {
    try {

        let strResult = await _masterhrdf.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "hrdf, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "hrdf, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('hrdf, hrdf_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/hrdf_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _masterhrdf.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "hrdf, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "hrdf, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('hrdf, hrdf_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* excel bulk upload service */

router.post('/hrdf_apiUploadExcelFile/', async function (request, response) {
    try {

        let strResult = await _masterhrdf.dbUploadExcelFile(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        clientResponse.insertData([], response, "hrdf, Bulk record inserted!");

    } catch (error) {
        dbCommon.log_file('hrdf, apiUploadExcelFile : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;