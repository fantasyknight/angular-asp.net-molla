/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeradditionalpaysetup = require("../../docs/components/component_employer/employeradditionalpaysetup");

router.post('/employeradditionalpaysetup_apiSelection/', function (request, response) {
    try {

        let strResult = _employeradditionalpaysetup.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No additional pay setup found!");
            else {
                clientResponse.sendAll(result, response, "Additional pay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeradditionalpaysetup_apiSelect/', function (request, response) {
    try {

        let strResult = _employeradditionalpaysetup.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No additional pay setup found!");
            else {
                clientResponse.sendData(result, response, "Additional pay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeradditionalpaysetup_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeradditionalpaysetup.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No additional pay setup found!");
            else {
                clientResponse.sendData(result, response, "Additional pay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeradditionalpaysetup_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeradditionalpaysetup.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Additional pay setup, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Additional pay setup, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeradditionalpaysetup_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeradditionalpaysetup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Additional pay setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Additional pay setup, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeradditionalpaysetup_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeradditionalpaysetup.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Additional pay setup, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Additional pay setup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employeradditionalpaysetup_apiInsertDefaulValue/', async function (request, response) {
    try {

        let strResult = _employeradditionalpaysetup.dbInsertDefaultValue(request, response);
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
                clientResponse.insertData(result, response, "Additional pay setup, Default record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiInsertDefaulValue : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeradditionalpaysetup_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employeradditionalpaysetup.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No additional pay setup found!");
            else {
                clientResponse.sendAll(result, response, "Additional pay setup records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Additional Pay Setup, employeradditionalpaysetup_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;