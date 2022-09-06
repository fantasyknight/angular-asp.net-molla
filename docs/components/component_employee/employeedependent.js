/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeedependent = require("../../modules/model_employee/clsemployeedependent");

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

            let strquery = _clsemployeedependent.data.select(strwhere);
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
            let employeedependentId = request.body.employeedependentId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeedependentId = " + employeedependentId;

            let strquery = _clsemployeedependent.data.select(strwhere);
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
            strwhere += " and employeeId =  " + employeeId;
            strwhere += " order by employeedependentId desc ";

            let strquery = _clsemployeedependent.data.select_view_employeedependent(strwhere + strlimit);
            let strcount = _clsemployeedependent.data.getcount_view_employeedependent(strwhere);

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
            let employeedependentId = request.body.employeedependentId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeedependentId = " + employeedependentId;

            let strquery = _clsemployeedependent.data.deleteString(strwhere);
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

            let verb = _clsemployeedependent.data.masterData(request);
            let strquery = _clsemployeedependent.data.insert(verb);

            strwhere += " and employeedependentId != 0 ";
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employeedependentMemberId = " + verb.employeedependentMemberId;

            let strCount = _clsemployeedependent.data.getcount(strwhere);
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

            let verb = _clsemployeedependent.data.masterData(request);
            let strquery = _clsemployeedependent.data.update(verb);

            strwhere += " and employeedependentId != " + verb.employeedependentId;
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employeedependentMemberId = " + verb.employeedependentMemberId;

            let strCount = _clsemployeedependent.data.getcount(strwhere);
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

    dbUpdateRelation: (request, response) => {
        try {

            let verb = _clsemployeedependent.data.masterData(request);
            let strquery = _clsemployeedependent.data.updateColumn("masterrelationshipId = " + verb.masterrelationshipId, verb.employeedependentId);

            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    }
};