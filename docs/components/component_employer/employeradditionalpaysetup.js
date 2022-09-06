/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeradditionalpaysetup = require("../../modules/model_employer/clsemployeradditionalpaysetup");

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

            let strquery = _clsemployeradditionalpaysetup.data.select(strwhere);
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
            let employeradditionalpaysetupId = request.body.employeradditionalpaysetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeradditionalpaysetupId = " + employeradditionalpaysetupId;

            let strquery = _clsemployeradditionalpaysetup.data.select(strwhere);
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
            strwhere += " order by employeradditionalpaysetupId asc ";

            let strquery = _clsemployeradditionalpaysetup.data.select(strwhere + strlimit);
            let strcount = _clsemployeradditionalpaysetup.data.getcount(strwhere);

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
            let employeradditionalpaysetupId = request.body.employeradditionalpaysetupId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeradditionalpaysetupId = " + employeradditionalpaysetupId;

            let strquery = _clsemployeradditionalpaysetup.data.deleteString(strwhere);

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

            let verb = _clsemployeradditionalpaysetup.data.masterData(request);
            let strquery = _clsemployeradditionalpaysetup.data.insert(verb);

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

            let verb = _clsemployeradditionalpaysetup.data.masterData(request);
            let strquery = _clsemployeradditionalpaysetup.data.update(verb);

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

            let strquery = _clsemployeradditionalpaysetup.data.insertString();
            strquery += "(" + employerId + ", 'A1', 'Add Pay x 1', '1', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'A2', 'Add Pay x 1.5', '1.5', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'A3', 'Add Pay x 2', '2', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'A4', 'Add Pay x 2.5', '2.5', false, false, false, false, false, false, false, false, false, 0, now())";
            strquery += ",(" + employerId + ", 'A5', 'Add Pay x 3', '3', false, false, false, false, false, false, false, false, false, 0, now())";
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
            let strcount = _clsemployeradditionalpaysetup.data.getcount(strwhere);

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