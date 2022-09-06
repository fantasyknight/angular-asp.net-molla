/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerbranch = require("../../modules/model_employer/clsemployerbranch");

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
            strwhere += " and employerbranchIsActive = true";

            let strquery = _clsemployerbranch.data.select(strwhere);
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
            let employerbranchId = request.body.employerbranchId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerbranchId = " + employerbranchId;

            let strquery = _clsemployerbranch.data.select(strwhere);
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

            let SearchEmployerbranchName = request.body.SearchEmployerbranchName || '';
            let SearchEmployerbranchIsActive = request.body.SearchEmployerbranchIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployerbranchName != '')
                strwhere += " and employerbranchName like '%" + SearchEmployerbranchName + "%'";

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerbranchIsActive = " + SearchEmployerbranchIsActive;
            strwhere += " order by employerbranchId desc ";

            let strquery = _clsemployerbranch.data.select(strwhere + strlimit);
            let strcount = _clsemployerbranch.data.getcount(strwhere);

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
            let employerbranchId = request.body.employerbranchId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerbranchId = " + employerbranchId;

            let strquery = _clsemployerbranch.data.deleteString(strwhere);

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

            let verb = _clsemployerbranch.data.masterData(request);
            let strquery = _clsemployerbranch.data.insert(verb);

            strwhere += " and employerbranchId != 0 ";
            strwhere += " and employerbranchName = '" + verb.employerbranchName + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerbranch.data.getcount(strwhere);
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

            let verb = _clsemployerbranch.data.masterData(request);
            let strquery = _clsemployerbranch.data.update(verb);

            strwhere += " and employerbranchId != " + verb.employerbranchId;
            strwhere += " and employerbranchName = '" + verb.employerbranchName + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerbranch.data.getcount(strwhere);
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
            let strcount = _clsemployerbranch.data.getcount(strwhere);

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

            let strquery = _clsemployerbranch.data.insertString();
            strquery += "(" + employerId + ", 'N/A', '0', '0', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '', '', '', 'N/A', '', '', true,'','', 0, now())";
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