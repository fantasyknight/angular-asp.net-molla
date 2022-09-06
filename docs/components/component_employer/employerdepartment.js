/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerdepartment = require("../../modules/model_employer/clsemployerdepartment");

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
            strwhere += " and employerdepartmentIsActive = true";

            let strquery = _clsemployerdepartment.data.select(strwhere);
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
            let employerdepartmentId = request.body.employerdepartmentId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerdepartmentId = " + employerdepartmentId;

            let strquery = _clsemployerdepartment.data.select(strwhere);
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

            let SearchEmployerdepartmentTitle = request.body.SearchEmployerdepartmentTitle || '';
            let SearchEmployerdepartmentIsActive = request.body.SearchEmployerdepartmentIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployerdepartmentTitle != '')
                strwhere += " and employerdepartmentTitle like '%" + SearchEmployerdepartmentTitle + "%'";

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerdepartmentIsActive = " + SearchEmployerdepartmentIsActive;
            strwhere += " order by employerdepartmentId desc ";

            let strquery = _clsemployerdepartment.data.select(strwhere + strlimit);
            let strcount = _clsemployerdepartment.data.getcount(strwhere);

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
            let employerdepartmentId = request.body.employerdepartmentId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerdepartmentId = " + employerdepartmentId;

            let strquery = _clsemployerdepartment.data.deleteString(strwhere);

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

            let verb = _clsemployerdepartment.data.masterData(request);
            let strquery = _clsemployerdepartment.data.insert(verb);

            strwhere += " and employerdepartmentId != 0 ";
            strwhere += " and employerdepartmentTitle = '" + verb.employerdepartmentTitle + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerdepartment.data.getcount(strwhere);
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

            let verb = _clsemployerdepartment.data.masterData(request);
            let strquery = _clsemployerdepartment.data.update(verb);

            strwhere += " and employerdepartmentId != " + verb.employerdepartmentId;
            strwhere += " and employerdepartmentTitle = '" + verb.employerdepartmentTitle + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerdepartment.data.getcount(strwhere);
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
            let strcount = _clsemployerdepartment.data.getcount(strwhere);

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

            let strquery = _clsemployerdepartment.data.insertString();
            strquery += "(" + employerId + ", 'N/A', true, 0, now())";
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