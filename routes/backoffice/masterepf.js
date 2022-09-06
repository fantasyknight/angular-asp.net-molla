/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _masterepf = require("../../docs/components/component_backoffice/masterepf");

router.post('/epf_apiSelection/', function (request, response) {
    try {

        let strResult = _masterepf.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No epf found!");
            else {
                clientResponse.sendAll(result, response, "EPF records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, epf_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/epf_apiSelect/', function (request, response) {
    try {

        let strResult = _masterepf.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No epf found!");
            else {
                clientResponse.sendData(result, response, "EPF records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, epf_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/epf_apiSelectAll/', function (request, response) {
    try {

        let strResult = _masterepf.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No epf found!");
            else {
                clientResponse.sendData(result, response, "EPF records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, epf_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/epf_apiDelete/', async function (request, response) {
    try {

        let strResult = await _masterepf.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "EPF, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "EPF, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, epf_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/epf_apiInsert/', async function (request, response) {
    try {

        let strResult = await _masterepf.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "EPF, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "EPF, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, epf_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/epf_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _masterepf.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "EPF, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "EPF, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, epf_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

/* excel bulk upload service */

router.post('/epf_apiUploadExcelFile/', async function (request, response) {
    try {

        let strResult = await _masterepf.dbUploadExcelFile(request, response);
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