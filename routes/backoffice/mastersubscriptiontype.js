/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _mastersubscriptiontype = require("../../docs/components/component_backoffice/mastersubscriptiontype");

router.post('/mastersubscriptiontype_apiSelection/', function (request, response) {
    try {

        let strResult = _mastersubscriptiontype.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No subscriptiontype found!");
            else {
                clientResponse.sendAll(result, response, "Subscription Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Subscription Type, mastersubscriptiontype_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/mastersubscriptiontype_apiSelect/', function (request, response) {
    try {

        let strResult = _mastersubscriptiontype.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No subscriptiontype found!");
            else {
                clientResponse.sendData(result, response, "Subscription Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Subscription Type, mastersubscriptiontype_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/mastersubscriptiontype_apiSelectAll/', function (request, response) {
    try {

        let strResult = _mastersubscriptiontype.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No subscriptiontype found!");
            else {
                clientResponse.sendData(result, response, "Subscription Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Subscription Type, mastersubscriptiontype_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/mastersubscriptiontype_apiDelete/', async function (request, response) {
    try {

        let strResult = await _mastersubscriptiontype.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Subscription Type, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Subscription Type, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Subscription Type, mastersubscriptiontype_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/mastersubscriptiontype_apiInsert/', async function (request, response) {
    try {

        let strResult = await _mastersubscriptiontype.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Subscription Type, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Subscription Type, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Subscription Type, mastersubscriptiontype_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/mastersubscriptiontype_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _mastersubscriptiontype.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Subscription Type, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Subscription Type, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Subscription Type, mastersubscriptiontype_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;