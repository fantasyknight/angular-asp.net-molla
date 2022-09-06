/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerleavetypeentitlement = require("../../modules/model_employer/clsemployerleavetypeentitlement");
// -
const _clsemployeeleaveentitlement = require("../../modules/model_employee/clsemployeeleaveentitlement");
const _clsemployeeleavereport = require("../../modules/model_employee/clsemployeeleavereport");
const _clsemployeeleaveapplication = require("../../modules/model_employee/clsemployeeleaveapplication");

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
            let employerleavetypeentitlementId = request.body.employerleavetypeentitlementId;

            strwhere += " and employerleavetypeentitlementId = " + employerleavetypeentitlementId;

            let strquery = _clsemployerleavetypeentitlement.data.select(strwhere);
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
            let employerleavetypeentitlementId = request.body.employerleavetypeentitlementId;

            strwhere += " and employerleavetypeentitlementId = " + employerleavetypeentitlementId;

            let strquery = _clsemployerleavetypeentitlement.data.select(strwhere);
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

            let employerleavetypeId = request.body.employerleavetypeId;

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerleavetypeId =" + employerleavetypeId;
            strwhere += " order by employerleavetypeentitlementId desc ";

            let strquery = _clsemployerleavetypeentitlement.data.select(strwhere + strlimit);
            let strcount = _clsemployerleavetypeentitlement.data.getcount(strwhere);

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
            let employerleavetypeentitlementId = request.body.employerleavetypeentitlementId;

            strwhere += " and employerleavetypeentitlementId = " + employerleavetypeentitlementId;

            let strquery = _clsemployerleavetypeentitlement.data.deleteString(strwhere);
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

            let verb = _clsemployerleavetypeentitlement.data.masterData(request);
            let strquery = _clsemployerleavetypeentitlement.data.insert(verb);

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

            let verb = _clsemployerleavetypeentitlement.data.masterData(request);
            let strquery = _clsemployerleavetypeentitlement.data.update(verb);

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

    dbRemoveLeaveEntitlement: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            let strRemoveLeaveEntitlment = _clsemployeeleaveentitlement.data.deleteString(strwhere);
            let strRemoveLeaveReport = _clsemployeeleavereport.data.deleteString(strwhere);
            let strRemoveLeaveApplication = _clsemployeeleaveapplication.data.deleteString(strwhere);

            return {
                'flag': true,
                'query': strRemoveLeaveEntitlment + ";" + strRemoveLeaveReport + ";" + strRemoveLeaveApplication
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },
};