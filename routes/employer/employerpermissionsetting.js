/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employerpermissionsetting = require("../../docs/components/component_employer/employerpermissionsetting");

router.post('/employerpermissionsetting_apiSelect/', function (request, response) {
    try {

        let strResult = _employerpermissionsetting.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No permission setting found!");
            else {
                clientResponse.sendAll(result, response, "Permission setting records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employer Permission Setting, employerpermissionsetting_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employerpermissionsetting_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employerpermissionsetting.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        clientResponse.insertData([], response, "Permission setting, Record inserted!");

    } catch (error) {
        dbCommon.log_file('Employer Permission Setting, employerpermissionsetting_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;