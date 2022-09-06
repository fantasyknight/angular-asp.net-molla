/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeassignshift = require("../../modules/model_employee/clsemployeeassignshift");

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

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;

            let strquery = _clsemployeeassignshift.data.select(strwhere);
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

    dbSelect: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;
            let employeeassignshiftid = request.body.employeeassignshiftid;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;
            strwhere += " and employeeassignshiftid = " + employeeassignshiftid;

            let strquery = _clsemployeeassignshift.data.select(strwhere);
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

    dbSelectAll: (request, response) => {
        try {

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            let strquery = _clsemployeeassignshift.data.select_view_employeeassignshift(strwhere + strlimit);
            let strcount = _clsemployeeassignshift.data.getcount_view_employeeassignshift(strwhere);

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
            let employeeassignshiftid = request.body.employeeassignshiftid;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeassignshiftid = " + employeeassignshiftid;

            let strquery = _clsemployeeassignshift.data.deleteString(strwhere);
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

    dbInsert: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeeassignshift.data.masterData(request);
            let strquery = _clsemployeeassignshift.data.insert(verb);

            strwhere += " and employeeassignshiftid != 0";
            strwhere += " and employermastershiftId = " + verb.employermastershiftId;
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployeeassignshift.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

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
    },

    dbUpdate: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeeassignshift.data.masterData(request);
            let strquery = _clsemployeeassignshift.data.update(verb);

            strwhere += " and employeeassignshiftid != " + verb.employeeassignshiftid;
            strwhere += " and employermastershiftId = " + verb.employermastershiftId;
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployeeassignshift.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

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