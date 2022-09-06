/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterrace = require("../../modules/model_backoffice/clsmasterrace");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterraceIsActive = request.body.masterraceIsActive || true;

            strwhere += " and masterraceIsActive = " + masterraceIsActive;

            let strquery = _clsmasterrace.data.select(strwhere);
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

            let strwhere = '';
            let masterraceId = request.body.masterraceId;

            strwhere += " and masterraceId = " + masterraceId;

            let strquery = _clsmasterrace.data.select(strwhere);
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

            let SearchMasterraceIsActive = request.body.SearchMasterraceIsActive || true;
            let SearchMasterRaceTitle = request.body.SearchMasterRaceTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterRaceTitle != '')
                strwhere += " and masterraceTitle like '%" + SearchMasterRaceTitle + "%'";
            strwhere += " and masterraceIsActive = " + SearchMasterraceIsActive;

            strwhere += " order by masterraceId desc ";

            let strquery = _clsmasterrace.data.select(strwhere + strlimit);
            let strcount = _clsmasterrace.data.getcount(strwhere);

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

            let masterraceId = request.body.masterraceId;
            let strquery = _clsmasterrace.data.delete(masterraceId);

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
            let verb = _clsmasterrace.data.masterData(request);
            let strquery = _clsmasterrace.data.insert(verb);

            strwhere += " and masterraceId != 0 ";
            strwhere += " and masterraceTitle = '" + verb.masterraceTitle + "'";

            let strCount = _clsmasterrace.data.getcount(strwhere);
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
            let verb = _clsmasterrace.data.masterData(request);
            let strquery = _clsmasterrace.data.update(verb);

            strwhere += " and masterraceId != " + verb.masterraceId;
            strwhere += " and masterraceTitle = '" + verb.masterraceTitle + "'";

            let strCount = _clsmasterrace.data.getcount(strwhere);
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