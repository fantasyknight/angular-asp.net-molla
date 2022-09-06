/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeallowancendeduction = require("../../modules/model_employee/clsemployeeallowancendeduction");

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

            let strquery = _clsemployeeallowancendeduction.data.select(strwhere);
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
            let employeeallowancendeductionId = request.body.employeeallowancendeductionId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeallowancendeductionId = " + employeeallowancendeductionId;

            let strquery = _clsemployeeallowancendeduction.data.select(strwhere);
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
            strwhere += " order by employeeallowancendeductionId desc ";

            let strquery = _clsemployeeallowancendeduction.data.select_view_employeeallowancendeduction(strwhere + strlimit);
            let strcount = _clsemployeeallowancendeduction.data.getcount_view_employeeallowancendeduction(strwhere);

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
            let employeeallowancendeductionId = request.body.employeeallowancendeductionId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeallowancendeductionId = " + employeeallowancendeductionId;

            let strquery = _clsemployeeallowancendeduction.data.deleteString(strwhere);
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

            let verb = _clsemployeeallowancendeduction.data.masterData(request);
            let strquery = _clsemployeeallowancendeduction.data.insert(verb);

            strwhere += " and employeeallowancendeductionId != 0 ";
            strwhere += " and employerallowanceId = " + verb.employerallowanceId;
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and DATE_FORMAT(employeeallowancendeductionToDate,'%y-%m') >= DATE_FORMAT(" + verb.employeeallowancendeductionFromDate + ",'%y-%m') ";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployeeallowancendeduction.data.getcount(strwhere);
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

            let verb = _clsemployeeallowancendeduction.data.masterData(request);
            let strquery = _clsemployeeallowancendeduction.data.update(verb);

            strwhere += " and employeeallowancendeductionId != " + verb.employeeallowancendeductionId;
            strwhere += " and employerallowanceId = " + verb.employerallowanceId;
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and DATE_FORMAT(employeeallowancendeductionToDate,'%y-%m') >= DATE_FORMAT(" + verb.employeeallowancendeductionFromDate + ",'%y-%m') ";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployeeallowancendeduction.data.getcount(strwhere);
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