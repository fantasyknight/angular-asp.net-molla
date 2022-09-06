/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const __masteremployerbank = require("../../docs/components/component_backoffice/masteremployerbank");

router.post('/masteremployerbank_apiSelection/', function (request, response) {
    try {

        let strResult = __masteremployerbank.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employer bank found!");
            else {
                clientResponse.sendAll(result, response, "Employer-bank records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployerbank_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployerbank_apiSelect/', function (request, response) {
    try {

        let strResult = __masteremployerbank.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No employer bank found!");
            else {
                clientResponse.sendData(result, response, "Employer-bank records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployerbank_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployerbank_apiSelectAll/', function (request, response) {
    try {

        let strResult = __masteremployerbank.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No employer bank found!");
            else {
                clientResponse.sendData(result, response, "Employer-bank records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployerbank_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployerbank_apiDelete/', async function (request, response) {
    try {

        let strResult = await __masteremployerbank.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Employer-bank, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Employer-bank, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployerbank_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployerbank_apiInsert/', async function (request, response) {
    try {

        let strResult = await __masteremployerbank.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Employer-bank, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Employer-bank, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployerbank_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/masteremployerbank_apiUpdate/', async function (request, response) {
    try {

        let strResult = await __masteremployerbank.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Employer-bank, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Employer-bank, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('EPF, masteremployerbank_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;