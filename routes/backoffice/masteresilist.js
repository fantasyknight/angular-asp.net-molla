/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _masteresilist = require("../../docs/components/component_backoffice/masteresilist");

router.post('/eislist_apiSelection/', function (request, response) {
    try {

        let strResult = _masteresilist.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No Eis list found!");
            else {
                clientResponse.sendAll(result, response, "Eis List records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Eis List, eislist_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eislist_apiSelect/', function (request, response) {
    try {

        let strResult = _masteresilist.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No Eis list found!");
            else {
                clientResponse.sendData(result, response, "Eis List records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Eis List, eislist_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eislist_apiSelectAll/', function (request, response) {
    try {

        let strResult = _masteresilist.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No Eis list found!");
            else {
                clientResponse.sendData(result, response, "Eis List records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Eis List, eislist_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eislist_apiDelete/', async function (request, response) {
    try {

        let strResult = await _masteresilist.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Eis List, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Eis List, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Eis List, eislist_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eislist_apiInsert/', async function (request, response) {
    try {

        let strResult = await _masteresilist.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Eis List, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Eis List, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Eis List, eislist_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/eislist_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _masteresilist.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Eis List, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Eis List, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Eis List, eislist_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;