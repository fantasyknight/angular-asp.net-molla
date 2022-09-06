/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clspayrolldailywage = require("../../modules/model_payroll/clspayrolldailywage");

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

            let strquery = _clspayrolldailywage.data.select("");
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

            let verb = _clspayrolldailywage.data.masterData(request);
            let strquery = _clspayrolldailywage.data.select(" and payrolldailywageId = " + verb.payrolldailywageId);
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

            if (pageSize != "all")
                strlimit = "limit" + ((pageIndex - 1) * pageSize) + "," + pageSize;

            let strquery = _clspayrolldailywage.data.select(strwhere + strlimit);
            let strcount = _clspayrolldailywage.data.getcount(strwhere);

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

            let verb = _clspayrolldailywage.data.masterData(request);
            let strquery = _clspayrolldailywage.data.delete(verb.payrolldailywageId);

            let strCount = _clspayrolldailywage.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let verb = _clspayrolldailywage.data.masterData(request);
            let strquery = _clspayrolldailywage.data.insert(verb);

            let strCount = _clspayrolldailywage.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let verb = _clspayrolldailywage.data.masterData(request);
            let strquery = _clspayrolldailywage.data.update(verb);

            let strCount = _clspayrolldailywage.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

};