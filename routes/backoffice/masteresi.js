/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _masteresi = require("../../docs/components/component_backoffice/masteresi");

router.post('/eis_apiSelection/', function (request, response) {
    try {

        let strResult = _masteresi.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No esi found!");
            else {
                clientResponse.sendAll(result, response, "ESI records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('ESI, esi_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eis_apiSelect/', function (request, response) {
    try {

        let strResult = _masteresi.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No esi found!");
            else {
                clientResponse.sendData(result, response, "ESI records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('ESI, esi_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eis_apiSelectAll/', function (request, response) {
    try {

        let strResult = _masteresi.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No esi found!");
            else {
                clientResponse.sendData(result, response, "ESI records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('ESI, esi_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eis_apiDelete/', async function (request, response) {
    try {

        let strResult = await _masteresi.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "ESI, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "ESI, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('ESI, esi_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eis_apiInsert/', async function (request, response) {
    try {

        let strResult = await _masteresi.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "ESI, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "ESI, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('ESI, esi_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eis_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _masteresi.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "ESI, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "ESI, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('ESI, esi_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* excel bulk upload service */

router.post('/eis_apiUploadExcelFile/', async function (request, response) {
    try {

        let strResult = await _masteresi.dbUploadExcelFile(request, response);
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