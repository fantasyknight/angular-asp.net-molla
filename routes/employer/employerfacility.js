/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerfacility = require("../../docs/components/component_employer/employerfacility");

router.post('/employerfacility_apiSelection/', function (request, response) {
    try {

        let strResult = _employerfacility.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No facility found!");
            else {
                clientResponse.sendAll(result, response, "Facility records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Facility, employerfacility_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerfacility_apiSelect/', function (request, response) {
    try {

        let strResult = _employerfacility.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No facility found!");
            else {
                clientResponse.sendData(result, response, "Facility records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Facility, employerfacility_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerfacility_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employerfacility.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No facility found!");
            else {
                clientResponse.sendData(result, response, "Facility records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Facility, employerfacility_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerfacility_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employerfacility.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Facility, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Facility, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Facility, employerfacility_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerfacility_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerfacility.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Facility, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Facility, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Facility, employerfacility_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerfacility_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employerfacility.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Facility, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Facility, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Facility, employerfacility_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;