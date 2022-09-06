/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clspayrollovertime = require("../../modules/model_payroll/clspayrollovertime");

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

            let strquery = _clspayrollovertime.data.select("");
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

            let verb = _clspayrollovertime.data.masterData(request);
            let strquery = _clspayrollovertime.data.select(" and payrollovertimeId = " + verb.payrollovertimeId);
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

            let strquery = _clspayrollovertime.data.select(strwhere + strlimit);
            let strcount = _clspayrollovertime.data.getcount(strwhere);

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

            let verb = _clspayrollovertime.data.masterData(request);
            let strquery = _clspayrollovertime.data.delete(verb.payrollovertimeId);

            let strCount = _clspayrollovertime.data.getcount("");
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

            let verb = _clspayrollovertime.data.masterData(request);
            let strquery = _clspayrollovertime.data.insert(verb);

            let strCount = _clspayrollovertime.data.getcount("");
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

            let verb = _clspayrollovertime.data.masterData(request);
            let strquery = _clspayrollovertime.data.update(verb);

            let strCount = _clspayrollovertime.data.getcount("");
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