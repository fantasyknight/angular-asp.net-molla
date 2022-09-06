/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterstate = require("../../modules/model_backoffice/clsmasterstate");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let mastercountryId = request.body.mastercountryId || "";
            let masterstateIsActive = request.body.masterstateIsActive || true;

            strwhere += " and mastercountryId = " + mastercountryId + " and masterstateIsActive = " + masterstateIsActive;

            let strquery = _clsmasterstate.data.select(strwhere);
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
            let masterstateId = request.body.masterstateId;

            strwhere += " and masterstateId = " + masterstateId;

            let strquery = _clsmasterstate.data.select(strwhere);
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

            let SearchMasterCountryId = request.body.SearchMasterCountryId || '';
            let SearchMasterStateTitle = request.body.SearchMasterStateTitle || '';
            let SearchMasterstateIsActive = request.body.SearchMasterstateIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterCountryId != '')
                strwhere += " and mastercountryId = " + SearchMasterCountryId;

            if (SearchMasterStateTitle != '')
                strwhere += " and masterstateTitle like '%" + SearchMasterStateTitle + "%'";
            strwhere += " and masterstateIsActive = " + SearchMasterstateIsActive;

            strwhere += " order by masterstateId desc ";

            let strquery = _clsmasterstate.data.view_select(strwhere + strlimit);
            let strcount = _clsmasterstate.data.view_getcount(strwhere);

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

            let masterstateId = request.body.masterstateId;
            let strquery = _clsmasterstate.data.delete(masterstateId);

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
            let verb = _clsmasterstate.data.masterData(request);
            let strquery = _clsmasterstate.data.insert(verb);

            strwhere += " and masterstateId != 0 ";
            strwhere += " and masterstateTitle = '" + verb.masterstateTitle + "'";

            let strCount = _clsmasterstate.data.getcount(strwhere);
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
            let verb = _clsmasterstate.data.masterData(request);
            let strquery = _clsmasterstate.data.update(verb);

            strwhere += " and masterstateId != " + verb.masterstateId;
            strwhere += " and masterstateTitle = '" + verb.masterstateTitle + "'";

            let strCount = _clsmasterstate.data.getcount(strwhere);
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