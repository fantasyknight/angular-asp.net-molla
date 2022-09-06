/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeruserright = require("../../modules/model_employer/clsemployeruserright");

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

    dbSelectAll: (request, response) => {
        try {

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            strwhere += " order by memberName asc ";

            let strquery = _clsemployeruserright.data.select_view_userright(strwhere + strlimit);
            let strcount = _clsemployeruserright.data.getcount_view_userright(strwhere);

            return {
                'flag': true,
                'query': strquery + ";" + strcount
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbDelete: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeruserrightId = request.body.employeruserrightId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeruserrightId = " + employeruserrightId;

            let strquery = _clsemployeruserright.data.deleteString(strwhere);

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeruserright.data.masterData(request);

            let strCount = _clsemployeruserright.data.getcount(" and employerId = " + verb.employerId + " and employeeId = " + verb.employeeId);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            if (strCountResult[0].cnt > 0) {
                let strUpdate = "update tblemployeruserright set employerTemplateId = '" + verb.employerTemplateId + "' WHERE employerId = " + verb.employerId + " AND employeeId = " + verb.employeeId;
                let [strUpdateResult, _strUpdateResult] = await dbSecurity.asyncResult(strUpdate);
            } else {
                let strInsert = _clsemployeruserright.data.insert(verb);
                let [strInsertResult, _strInsertResult] = await dbSecurity.asyncResult(strInsert);
            }

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};