/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployersubscription = require("../../modules/model_employer/clsemployersubscription");

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
            strwhere += " and employersubscriptionIsActive = true ";

            let strquery = _clsemployersubscription.data.select(strwhere);
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
            let employersubscriptionId = request.body.employersubscriptionId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employersubscriptionId = " + employersubscriptionId;

            let strquery = _clsemployersubscription.data.select(strwhere);
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

            let SearchEmployersubscriptionIsActive = request.body.SearchEmployersubscriptionIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employersubscriptionIsActive = " + SearchEmployersubscriptionIsActive;
            strwhere += " order by employersubscriptionId desc ";

            let strquery = _clsemployersubscription.data.select(strwhere + strlimit);
            let strcount = _clsemployersubscription.data.getcount(strwhere);

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
            let employersubscriptionId = request.body.employersubscriptionId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employersubscriptionId = " + employersubscriptionId;

            let strquery = _clsemployersubscription.data.deleteString(strwhere);
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

            let verb = _clsemployersubscription.data.masterData(request);
            let strquery = _clsemployersubscription.data.insert(verb);

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

            let verb = _clsemployersubscription.data.masterData(request);
            let strquery = _clsemployersubscription.data.update(verb);

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