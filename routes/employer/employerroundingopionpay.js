let express = require('express');
let router = express.Router();

const dbSecurity = require("../../config/dbSecurity");
const clientResponse = require("../../config/responseFile");

const _employerroundingopionpay = require("../../component/employerroundingopionpay");

router.post('/apiSelection/', function (request, response) {
    try {

        let strResult = _employerroundingopionpay.dbSelection(request, response);
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
                clientResponse.sendDrop(result, response, "");
            }
        });

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSelect/', function (request, response) {
    try {

        let strResult = _employerroundingopionpay.dbSelect(request, response);
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
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerroundingopionpay.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "");
            else {
                clientResponse.sendData(result, response, "");
            }
        });

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerroundingopionpay.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0][0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "You can't remove this record!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(deleteQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "");
            }
        });

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerroundingopionpay.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0][0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(insertQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "");
            }
        });

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerroundingopionpay.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0][0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(updateQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "");
            }
        });

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;