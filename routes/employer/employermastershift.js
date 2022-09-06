/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employermastershift = require("../../docs/components/component_employer/employermastershift");

router.post('/employermastershift_apiSelection/', function (request, response) {
    try {

        let strResult = _employermastershift.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No master shift found!");
            else {
                clientResponse.sendAll(result, response, "Master shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employermastershift_apiSelect/', function (request, response) {
    try {

        let strResult = _employermastershift.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No master shift found!");
            else {
                clientResponse.sendData(result, response, "Master shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employermastershift_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employermastershift.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No master shift found!");
            else {
                clientResponse.sendData(result, response, "Master shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employermastershift_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employermastershift.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Master Shift, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Master Shift, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employermastershift_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employermastershift.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Master Shift, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Master Shift, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employermastershift_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employermastershift.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Master Shift, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Master Shift, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/employermastershift_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employermastershift.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No master shift found!");
            else {
                clientResponse.sendAll(result, response, "Master shift records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Master Shift, employermastershift_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;