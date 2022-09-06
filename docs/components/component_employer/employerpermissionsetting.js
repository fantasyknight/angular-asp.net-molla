/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerpermissionsetting = require("../../modules/model_employer/clsemployerpermissionsetting");

let self = module.exports = {

    fetchEmployerId: (request) => {
        try {

            let decryptionData = dbSecurity._decryption(request.body.employerId);
            if (decryptionData.encryption == false) {
                return {
                    'flag': false,
                    'query': 'No valid employerId'
                };
            }

            return decryptionData.decrypt;
        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelect: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            let strquery = _clsemployerpermissionsetting.data.select(strwhere);
            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let isAutoAttendanceData = request.body.isAutoAttendanceData;
            let isAutoSendEmailData = request.body.isAutoSendEmailData;
            let lockPassword = request.body.lockPassword;
            let employerBankName = request.body.employerBankName;

            let strDeleteQuery = _clsemployerpermissionsetting.data.deleteString(" and employerId = " + employerId);
            let [strDeleteQueryResult, _strDeleteQueryResult] = await dbSecurity.asyncResult(strDeleteQuery);

            let strInsertQuery = _clsemployerpermissionsetting.data.insertString();
            strInsertQuery += "(" + employerId + ", 'AutoPushAttendance', '" + isAutoAttendanceData + "'),";
            strInsertQuery += "(" + employerId + ", 'AutoSendEmail', '" + isAutoSendEmailData + "'),";
            strInsertQuery += "(" + employerId + ", 'lockPassword', '" + lockPassword + "'),";
            strInsertQuery += "(" + employerId + ", 'employerBankName', '" + employerBankName + "')";

            let [strInsertQueryResult, _strInsertQueryResult] = await dbSecurity.asyncResult(strInsertQuery);

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': "Inserted"
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};