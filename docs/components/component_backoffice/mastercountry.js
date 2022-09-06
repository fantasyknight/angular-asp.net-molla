/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmastercountry = require("../../modules/model_backoffice/clsmastercountry");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = '';
            strwhere += " and mastercountryIsActive = true";

            let strquery = _clsmastercountry.data.select(strwhere);
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
            let mastercountryId = request.body.mastercountryId;

            strwhere += " and mastercountryId = " + mastercountryId;

            let strquery = _clsmastercountry.data.select(strwhere);

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

            let SearchMastercountryIsActive = request.body.SearchMastercountryIsActive || true;
            let SearchMasterCountryTitle = request.body.SearchMasterCountryTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterCountryTitle != '')
                strwhere += " and mastercountryTitle like '%" + SearchMasterCountryTitle + "%'";
            strwhere += " and mastercountryIsActive = " + SearchMastercountryIsActive;

            strwhere += " order by mastercountryId desc ";

            let strquery = _clsmastercountry.data.select(strwhere + strlimit);
            let strcount = _clsmastercountry.data.getcount(strwhere);

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

            let mastercountryId = request.body.mastercountryId;
            let strquery = _clsmastercountry.data.delete(mastercountryId);

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
            let verb = _clsmastercountry.data.masterData(request);
            let strquery = _clsmastercountry.data.insert(verb);

            strwhere += " and mastercountryId != 0 ";
            strwhere += " and mastercountryTitle = '" + verb.mastercountryTitle + "'";

            let strCount = _clsmastercountry.data.getcount(strwhere);
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
            let verb = _clsmastercountry.data.masterData(request);
            let strquery = _clsmastercountry.data.update(verb);

            strwhere += " and mastercountryId != " + verb.mastercountryId;
            strwhere += " and mastercountryTitle = '" + verb.mastercountryTitle + "'";

            let strCount = _clsmastercountry.data.getcount(strwhere);
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