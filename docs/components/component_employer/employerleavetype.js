/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerleavetype = require("../../modules/model_employer/clsemployerleavetype");
const _clsemployerleavetypeentitlement = require("../../modules/model_employer/clsemployerleavetypeentitlement");
//.
const _clsemployeeleaveentitlement = require("../../modules/model_employee/clsemployeeleaveentitlement");

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
            strwhere += " and employerleavetypeIsActive = true";

            let strquery = _clsemployerleavetype.data.select(strwhere);
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
            let employerleavetypeId = request.body.employerleavetypeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerleavetypeId = " + employerleavetypeId;

            let strquery = _clsemployerleavetype.data.select(strwhere);
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

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            strwhere += " order by employerleavetypeId desc ";

            let strquery = _clsemployerleavetype.data.select(strwhere + strlimit);
            let strcount = _clsemployerleavetype.data.getcount(strwhere);

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
            let employerleavetypeId = request.body.employerleavetypeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerleavetypeId = " + employerleavetypeId;

            let strCount = _clsemployeeleaveentitlement.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            let strquery = _clsemployerleavetype.data.deleteString(strwhere);
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

    dbInsert: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployerleavetype.data.masterData(request);
            let strquery = _clsemployerleavetype.data.insert(verb);

            strwhere += " and employerleavetypeId != 0 ";
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employerleavetypeLeaveCode = '" + verb.employerleavetypeLeaveCode + "'";
            strwhere += " and employerleavetypeLeaveType = '" + verb.employerleavetypeLeaveType + "'";

            let strCount = _clsemployerleavetype.data.getcount(strwhere);
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

            let verb = _clsemployerleavetype.data.masterData(request);
            let strquery = _clsemployerleavetype.data.update(verb);

            strwhere += " and employerleavetypeId != " + verb.employerleavetypeId;
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employerleavetypeLeaveCode = '" + verb.employerleavetypeLeaveCode + "'";
            strwhere += " and employerleavetypeLeaveType = '" + verb.employerleavetypeLeaveType + "'";

            let strCount = _clsemployerleavetype.data.getcount(strwhere);
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

    dbDelete_All: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employerleavetypeId = request.body.employerleavetypeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerleavetypeId = " + employerleavetypeId;
            let strquery = _clsemployerleavetype.data.deleteString(strwhere);

            let strwhere_sub = " and employerleavetypeId = " + employerleavetypeId;
            let strquery_sub = _clsemployerleavetypeentitlement.data.deleteString(strwhere_sub);

            let strCount = _clsemployeeleaveentitlement.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery + ";" + strquery_sub
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelect_Count: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            let strcount = _clsemployerleavetype.data.getcount(strwhere);

            return {
                'flag': true,
                'query': strcount
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbInsertDefaultValue: (request, response) => {
        try {
            let employerId = self.fetchEmployerId(request);

            let strquery = _clsemployerleavetype.data.insertString();
            strquery += "(" + employerId + ", 'UL', 'Unpaid Leave', '0', '1', '0', '#000000', false, false, false, false, true, true, 0, now())";
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
    }
};