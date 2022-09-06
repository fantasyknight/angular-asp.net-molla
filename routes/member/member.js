/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
const dbEmailTemp = require("../../docs/config/dbEmailTemp");
const dbEmailSetup = require("../../docs/config/dbEmailSetup");
/* component */
const _member = require("../../docs/components/component_member/member");

router.post('/member_apiSelection/', function (request, response) {
    try {

        let strResult = _member.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No member found!");
            else {
                clientResponse.sendAll(result, response, "Member records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/member_apiSelect/', function (request, response) {
    try {

        let strResult = _member.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No member found!");
            else {
                clientResponse.sendData(result, response, "Member records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/member_apiSelectAll/', function (request, response) {
    try {

        let strResult = _member.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No member found!");
            else {
                clientResponse.sendData(result, response, "Member records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/member_apiDelete/', async function (request, response) {
    try {

        let strResult = await _member.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Member, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Member, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/member_apiInsert/', async function (request, response) {
    try {

        let strResult = await _member.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, strQuery);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Member, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/member_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _member.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, strQuery);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Member, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/member_apiSelect_Search/', function (request, response) {
    try {

        let strResult = _member.dbSelectAll_Search(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No member found!");
            else {
                clientResponse.sendAll(result, response, "Member records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Member, member_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/member_apiSignInAccount/', async function (request, response) {
    try {

        let strResult = await _member.dbSignInAccount(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, strQuery);

        let str_registrationTemp = dbEmailTemp.temp_registration_employee(request.body.email, request.body.accessCode);
        dbEmailSetup.sendEmail(request.body.email, 'Izem System - Registration', str_registrationTemp);

        clientResponse.insertData([], response, strQuery);

    } catch (error) {
        dbCommon.log_file('Member, member_apiSignInAccount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;