/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employertemplatepage = require("../../docs/components/component_employer/employertemplatepage");

router.post('/employertemplatepage_apiSelect/', function (request, response) {
    try {

        let strResult = _employertemplatepage.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No template-page found!");
            else {
                clientResponse.sendAll(result, response, "Template-page records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Template-Page, employertemplatepage_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employertemplatepage_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employertemplatepage.dbDelete(request, response);
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
                clientResponse.deleteData(result, response, "Template-page, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Template-Page, employertemplatepage_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employertemplatepage_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employertemplatepage.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, "Template-page, Record inserted!");

    } catch (error) {
        dbCommon.log_file('Employer Template-Page, employertemplatepage_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;