/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _masteremployeebank = require("../../docs/components/component_backoffice/masteremployeebank");

router.post('/masteremployeebank_apiSelection/', function (request, response) {
    try {

        let strResult = _masteremployeebank.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employee bank found!");
            else {
                clientResponse.sendAll(result, response, "Employee-bank records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployeebank_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployeebank_apiSelect/', function (request, response) {
    try {

        let strResult = _masteremployeebank.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employee bank found!");
            else {
                clientResponse.sendData(result, response, "Employee-bank records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployeebank_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployeebank_apiSelectAll/', function (request, response) {
    try {

        let strResult = _masteremployeebank.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No employee bank found!");
            else {
                clientResponse.sendData(result, response, "Employee-bank records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployeebank_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployeebank_apiDelete/', async function (request, response) {
    try {

        let strResult = await _masteremployeebank.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Employee-bank, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Employee-bank, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployeebank_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployeebank_apiInsert/', async function (request, response) {
    try {

        let strResult = await _masteremployeebank.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Employee-bank, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Employee-bank, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployeebank_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployeebank_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _masteremployeebank.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Employee-bank, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Employee-bank, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployeebank_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;