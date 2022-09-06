/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasteremployerbank = require("../../modules/model_backoffice/clsmasteremployerbank");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";

            let strquery = _clsmasteremployerbank.data.select(strwhere);
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
            let masteremployerbankId = request.body.masteremployerbankId;

            strwhere += " and masteremployerbankId = " + masteremployerbankId;

            let strquery = _clsmasteremployerbank.data.select(strwhere);
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

            strwhere += " order by masteremployerbankId desc ";

            let strquery = _clsmasteremployerbank.data.select(strwhere + strlimit);
            let strcount = _clsmasteremployerbank.data.getcount(strwhere);

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

            let masteremployerbankId = request.body.masteremployerbankId;

            let strquery = _clsmasteremployerbank.data.delete(masteremployerbankId);

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
            let verb = _clsmasteremployerbank.data.masterData(request);
            let strquery = _clsmasteremployerbank.data.insert(verb);

            strwhere += " and masteremployerbankId != 0 ";
            strwhere += " and masteremployerbankName = '" + verb.masteremployerbankName + "'";

            let strCount = _clsmasteremployerbank.data.getcount(strwhere);
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
            let verb = _clsmasteremployerbank.data.masterData(request);
            let strquery = _clsmasteremployerbank.data.update(verb);

            strwhere += " and masteremployerbankId != " + verb.masteremployerbankId;
            strwhere += " and masteremployerbankName = '" + verb.masteremployerbankName + "'";

            let strCount = _clsmasteremployerbank.data.getcount(strwhere);
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