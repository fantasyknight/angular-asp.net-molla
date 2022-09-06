/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasteremployeebank = require("../../modules/model_backoffice/clsmasteremployeebank");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";

            let strquery = _clsmasteremployeebank.data.select(strwhere);
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
            let masteremployeebankId = request.body.masteremployeebankId;

            strwhere += " and masteremployeebankId = " + masteremployeebankId;

            let strquery = _clsmasteremployeebank.data.select(strwhere);
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
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " order by masteremployeebankId desc ";

            let strquery = _clsmasteremployeebank.data.select(strwhere + strlimit);
            let strcount = _clsmasteremployeebank.data.getcount(strwhere);

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

            let masteremployeebankId = request.body.masteremployeebankId;

            let strquery = _clsmasteremployeebank.data.delete(masteremployeebankId);

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

            let strwhere = "";
            let verb = _clsmasteremployeebank.data.masterData(request);
            let strquery = _clsmasteremployeebank.data.insert(verb);

            strwhere += " and masteremployeebankId != 0 ";
            strwhere += " and masteremployeebankName = '" + verb.masteremployeebankName + "'";

            let strCount = _clsmasteremployeebank.data.getcount(strwhere);
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

            let strwhere = "";
            let verb = _clsmasteremployeebank.data.masterData(request);
            let strquery = _clsmasteremployeebank.data.update(verb);

            strwhere += " and masteremployeebankId != " + verb.masterepfId;
            strwhere += " and masteremployeebankName = '" + verb.masteremployeebankName + "'";

            let strCount = _clsmasteremployeebank.data.getcount(strwhere);
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
    }
};