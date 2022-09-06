/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeotsetup = require("../../modules/model_employee/clsemployeeotsetup");

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

            let strquery = _clsemployeeotsetup.data.select(strwhere);
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
            let employeeotsetupId = request.body.employeeotsetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeotsetupId = " + employeeotsetupId;

            let strquery = _clsemployeeotsetup.data.select(strwhere);
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
            strwhere += " order by employeeotsetupId asc ";

            let strquery = _clsemployeeotsetup.data.select(strwhere + strlimit);
            let strcount = _clsemployeeotsetup.data.getcount(strwhere);

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
            let employeeotsetupId = request.body.employeeotsetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeotsetupId = " + employeeotsetupId;

            let strquery = _clsemployeeotsetup.data.deleteString(strwhere);
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

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeeotsetup.data.masterData(request);
            let strquery = _clsemployeeotsetup.data.insert(verb);

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

            let verb = _clsemployeeotsetup.data.masterData(request);
            let strquery = _clsemployeeotsetup.data.update(verb);

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

    dbSelectAll_View: (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;

            let strquery = _clsemployeeotsetup.data.select_view_employeeotsetup(employerId, employeeId);
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

    dbDelete_All: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            let strquery = _clsemployeeotsetup.data.deleteString(strwhere);
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
    }
};