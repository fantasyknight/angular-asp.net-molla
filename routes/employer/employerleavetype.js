/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerleavetype = require("../../docs/components/component_employer/employerleavetype");

router.post('/employerleavetype_apiSelection/', function (request, response) {
    try {

        let strResult = _employerleavetype.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave type found!");
            else {
                clientResponse.sendAll(result, response, "Leave Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiSelect/', function (request, response) {
    try {

        let strResult = _employerleavetype.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave type found!");
            else {
                clientResponse.sendData(result, response, "Leave Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerleavetype.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No leave type found!");
            else {
                clientResponse.sendData(result, response, "Leave Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerleavetype.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Leave Type, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Leave Type, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerleavetype.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Type, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Leave Type, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerleavetype.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Type, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Leave Type, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employerleavetype_apiDelete_All/', async function (request, response) {
    try {

        let strResult = await _employerleavetype.dbDelete_All(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Leave Type, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Leave Type, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employerleavetype.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave type found!");
            else {
                clientResponse.sendAll(result, response, "Leave Type records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerleavetype_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = await _employerleavetype.dbInsertDefaultValue(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Leave Type, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Leave Type, employerleavetype_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;