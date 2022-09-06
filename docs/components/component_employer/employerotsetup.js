/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerotsetup = require("../../modules/model_employer/clsemployerotsetup");

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

            let strquery = _clsemployerotsetup.data.select(strwhere);
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
            let employerotsetupId = request.body.employerotsetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerotsetupId = " + employerotsetupId;

            let strquery = _clsemployerotsetup.data.select(strwhere);
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

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            let employerId = self.fetchEmployerId(request);

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            strwhere += " order by employerotsetupId asc ";

            let strquery = _clsemployerotsetup.data.select(strwhere + strlimit);
            let strcount = _clsemployerotsetup.data.getcount(strwhere);

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
            let employerotsetupId = request.body.employerotsetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerotsetupId = " + employerotsetupId;

            let strquery = _clsemployerotsetup.data.deleteString(strwhere);

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

            let verb = _clsemployerotsetup.data.masterData(request);
            let strquery = _clsemployerotsetup.data.insert(verb);

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

            let verb = _clsemployerotsetup.data.masterData(request);
            let strquery = _clsemployerotsetup.data.update(verb);

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

    dbInsertDefaultValue: (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);

            let strquery = _clsemployerotsetup.data.insertString();
            strquery += "(" + employerId + ", 'OT1', 'Normal OT', '1.5', false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'OT2', 'Off Day OT', '2', false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'OT3', 'Public Holiday OT', '3', false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'OT4', '', '0.0', false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'OT5', '', '0.0', false, false, false, false, false, false, false, 0, now())";

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

    dbSelect_Count: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            let strcount = _clsemployerotsetup.data.getcount(strwhere);

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
    }
};