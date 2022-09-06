/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployershiftsetup = require("../../modules/model_employer/clsemployershiftsetup");

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

            let strquery = _clsemployershiftsetup.data.select(strwhere);
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
            let employershiftsetupId = request.body.employershiftsetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employershiftsetupId = " + employershiftsetupId;

            let verb = _clsemployershiftsetup.data.masterData(request);
            let strquery = _clsemployershiftsetup.data.select(strwhere);
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
            strwhere += " order by employershiftsetupId asc ";

            let strquery = _clsemployershiftsetup.data.select(strwhere + strlimit);
            let strcount = _clsemployershiftsetup.data.getcount(strwhere);

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
            let employershiftsetupId = request.body.employershiftsetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employershiftsetupId = " + employershiftsetupId;

            let strquery = _clsemployershiftsetup.data.deleteString(strwhere);

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

            let verb = _clsemployershiftsetup.data.masterData(request);
            let strquery = _clsemployershiftsetup.data.insert(verb);

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

            let verb = _clsemployershiftsetup.data.masterData(request);
            let strquery = _clsemployershiftsetup.data.update(verb);

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

            let strquery = _clsemployershiftsetup.data.insertString();
            strquery += "(" + employerId + ", 'S1', 'Shift 1', '0.0', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'S2', 'Shift 2', '0.0', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'S3', 'Shift 3', '0.0', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'S4', 'Shift 4', '0.0', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'S5', 'Shift 5', '0.0', false, false, false, false, false, false, false, false, false, 0, now())";

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
            let strcount = _clsemployershiftsetup.data.getcount(strwhere);

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