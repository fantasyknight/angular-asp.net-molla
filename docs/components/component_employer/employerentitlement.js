/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerentitlement = require("../../modules/model_employer/clsemployerentitlement");

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
            strwhere += " and employerentitlementIsActive = true ";

            let strquery = _clsemployerentitlement.data.select(strwhere);
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
            let employerentitlementId = request.body.employerentitlementId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerentitlementId = " + employerentitlementId;

            let strquery = _clsemployerentitlement.data.select(strwhere);
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

            let SearchEmployerentitlementTitle = request.body.SearchEmployerentitlementTitle || '';
            let SearchEmployerentitlementIsActive = request.body.SearchEmployerentitlementIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            let employerId = self.fetchEmployerId(request);

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployerentitlementTitle != '')
                strwhere += " and employerentitlementTitle like '%" + SearchEmployerentitlementTitle + "%'";

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerentitlementIsActive = " + SearchEmployerentitlementIsActive;
            strwhere += " order by employerentitlementId desc ";

            let strquery = _clsemployerentitlement.data.select(strwhere + strlimit);
            let strcount = _clsemployerentitlement.data.getcount(strwhere);

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
            let employerentitlementId = request.body.employerentitlementId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerentitlementId = " + employerentitlementId;

            let strquery = _clsemployerentitlement.data.deleteString(strwhere);

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

            let strwhere = '';
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;
            request.body.createdBy = employerId;

            let verb = _clsemployerentitlement.data.masterData(request);
            let strquery = _clsemployerentitlement.data.insert(verb);

            strwhere += " and employerentitlementId != 0 ";
            strwhere += " and employerentitlementTitle = '" + verb.employerentitlementTitle + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerentitlement.data.getcount(strwhere);
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

            let strwhere = '';
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;
            request.body.createdBy = employerId;

            let verb = _clsemployerentitlement.data.masterData(request);
            let strquery = _clsemployerentitlement.data.update(verb);

            strwhere += " and employerentitlementId != " + verb.employerentitlementId;
            strwhere += " and employerentitlementTitle = '" + verb.employerentitlementTitle + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerentitlement.data.getcount(strwhere);
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

    dbSelect_Count: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            let strcount = _clsemployerentitlement.data.getcount(strwhere);

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

            let strquery = _clsemployerentitlement.data.insertString();
            strquery += "(" + employerId + ", 'N/A', '0', '0', '0', '0', '0', '0', 'Y', 'N/A', 'Auto', true, 0, now())";
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