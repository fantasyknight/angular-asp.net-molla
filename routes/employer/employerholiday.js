/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerholiday = require("../../docs/components/component_employer/employerholiday");

router.post('/employerholiday_apiSelection/', function (request, response) {
    try {

        let strResult = _employerholiday.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No holiday found!");
            else {
                clientResponse.sendAll(result, response, "Holiday records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerholiday_apiSelect/', function (request, response) {
    try {

        let strResult = _employerholiday.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No holiday found!");
            else {
                clientResponse.sendData(result, response, "Holiday records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerholiday_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerholiday.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No holiday found!");
            else {
                clientResponse.sendData(result, response, "Holiday records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerholiday_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerholiday.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Holiday, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Holiday, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerholiday_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerholiday.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Holiday, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Holiday, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerholiday_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerholiday.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Holiday, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Holiday, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employerholiday_apiInsertList/', async function (request, response) {
    try {

        let strResult = await _employerholiday.dbInsertList(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;
        let strCount = strResult.count;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        if (strCount > false)
            return clientResponse.existData([], response, "Holiday, Record exists!");

        clientResponse.insertData([], response, "Holiday, Record inserted!");

    } catch (error) {
        dbCommon.log_file('Employer Holiday, employerholiday_apiInsertList : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;