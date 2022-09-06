/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeleaveentitlement = require("../../modules/model_employee/clsemployeeleaveentitlement");
const _clsemployee = require("../../modules/model_employee/clsemployee");

const _clsemployerleavetypeentitlement = require("../../modules/model_Employer/clsemployerleavetypeentitlement");

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
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            let strquery = _clsemployeeleaveentitlement.data.select_view_employeeleaveentitlement(strwhere);
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
            let employeeleaveentitlementId = request.body.employeeleaveentitlementId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeleaveentitlementId = " + employeeleaveentitlementId;

            let strquery = _clsemployeeleaveentitlement.data.select(strwhere);
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
            strwhere += " order by employeeleaveentitlementId desc ";

            let strquery = _clsemployeeleaveentitlement.data.select_view_employeeleaveentitlement(strwhere + strlimit);
            let strcount = _clsemployeeleaveentitlement.data.getcount_view_employeeleaveentitlement(strwhere);

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
            let employeeleaveentitlementId = request.body.employeeleaveentitlementId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeleaveentitlementId = " + employeeleaveentitlementId;

            let strquery = _clsemployeeleaveentitlement.data.deleteString(strwhere);

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

            let verb = _clsemployeeleaveentitlement.data.masterData(request);
            let strquery = _clsemployeeleaveentitlement.data.insert(verb);

            strwhere += " and employeeleaveentitlementId != 0 ";
            strwhere += " and employerleavetypeId = '" + verb.employerleavetypeId + "'";
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employeeId = " + verb.employeeId;

            let strCount = _clsemployeeleaveentitlement.data.getcount(strwhere);
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

            let verb = _clsemployeeleaveentitlement.data.masterData(request);
            let strquery = _clsemployeeleaveentitlement.data.update(verb);

            strwhere += " and employeeleaveentitlementId != " + verb.employeeleaveentitlementId;
            strwhere += " and employerleavetypeId = '" + verb.employerleavetypeId + "'";
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employeeId = " + verb.employeeId;

            let strCount = _clsemployeeleaveentitlement.data.getcount(strwhere);
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

    dbEntitlementCalculation: async (request, response) => {
        try {
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;
            let employerleavetypeId = request.body.employerleavetypeId;

            let strSelectEmployee = _clsemployee.data.select_view_employee(" and employeeId = " + employeeId);
            let [strSelectEmployeeResult, _strSelectEmployeeResult] = await dbSecurity.asyncResult(strSelectEmployee);

            let totalYear = strSelectEmployeeResult[0].totalYear;

            //. Entitlement detail
            let strEntitlement = "";
            strEntitlement += " and employerleavetypeId = " + employerleavetypeId;
            strEntitlement += " and employerleavetypeentitlementStart <= " + totalYear + " && employerleavetypeentitlementEnd >= " + totalYear;

            let strSelectEntitlement = _clsemployerleavetypeentitlement.data.select(strEntitlement);
            let [strSelectEntitlementResult, _strSelectEntitlementResult] = await dbSecurity.asyncResult(strSelectEntitlement);

            let entitlementDay = 0;
            let maxBnf = 0;
            if (strSelectEntitlementResult.length > 0) {
                entitlementDay = strSelectEntitlementResult[0].employerleavetypeentitlementEntitleDay;
                maxBnf = strSelectEntitlementResult[0].employerleavetypeentitlementMaxBnf;
            }

            //. Entitlement History
            let strEntitlementHistory = "";
            strEntitlementHistory += " and employeeId = " + employeeId;
            strEntitlementHistory += " and employerleavetypeId = " + employerleavetypeId;

            let strSelectEntitlementHistory = _clsemployeeleaveentitlement.data.select(strEntitlementHistory);
            let [strSelectEntitlementHistoryResult, _strSelectEntitlementHistoryResult] = await dbSecurity.asyncResult(strSelectEntitlementHistory);

            let previousYearBnf = 0;
            if (strSelectEntitlementHistoryResult.length > 0) {
                previousYearBnf = strSelectEntitlementHistoryResult[0].employeeleaveentitlementPreviousYearBalance;
            }

            return {
                'flag': true,
                'result': [{
                    "entitlementDay": entitlementDay,
                    "maxBnf": maxBnf,
                    "previousYearBnf": previousYearBnf
                }],
                'query': ''
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdateStatus: async (request, response) => {
        try {

            let status = request.body.status;
            let employeeleaveentitlementId = request.body.employeeleaveentitlementId;

            let strquery = '';
            if (status == 'false')
                strquery = _clsemployeeleaveentitlement.data.updateColumn(" employeeleaveentitlementIsActive = false ", employeeleaveentitlementId);
            else
                strquery = _clsemployeeleaveentitlement.data.updateColumn(" employeeleaveentitlementIsActive = true ", employeeleaveentitlementId);

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
};