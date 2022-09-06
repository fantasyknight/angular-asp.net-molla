/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmastercitizenship = require("../../modules/model_backoffice/clsmastercitizenship");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = '';
            strwhere += " and mastercitizenshipIsActive = true";

            let strquery = _clsmastercitizenship.data.select(strwhere);
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
            let mastercitizenshipId = request.body.mastercitizenshipId;

            strwhere += " and mastercitizenshipId = " + mastercitizenshipId;

            let strquery = _clsmastercitizenship.data.select(strwhere);

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

            let SearchMasterCitizenshipIsActive = request.body.SearchMasterCitizenshipIsActive || true;
            let SearchMasterCitizenshipTitle = request.body.SearchMasterCitizenshipTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterCitizenshipTitle != '')
                strwhere += " and mastercitizenshipTitle like '%" + SearchMasterCitizenshipTitle + "%'";
            strwhere += " and mastercitizenshipIsActive = " + SearchMasterCitizenshipIsActive;

            strwhere += " order by mastercitizenshipId desc ";

            let strquery = _clsmastercitizenship.data.select(strwhere + strlimit);
            let strcount = _clsmastercitizenship.data.getcount(strwhere);

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

            let mastercitizenshipId = request.body.mastercitizenshipId;
            let strquery = _clsmastercitizenship.data.delete(mastercitizenshipId);

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
            let verb = _clsmastercitizenship.data.masterData(request);
            let strquery = _clsmastercitizenship.data.insert(verb);

            strwhere += " and mastercitizenshipId != 0 ";
            strwhere += " and mastercitizenshipTitle = '" + verb.mastercitizenshipTitle + "'";

            let strCount = _clsmastercitizenship.data.getcount(strwhere);
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
            let verb = _clsmastercitizenship.data.masterData(request);
            let strquery = _clsmastercitizenship.data.update(verb);

            strwhere += " and mastercitizenshipId != " + verb.mastercitizenshipId;
            strwhere += " and mastercitizenshipTitle = '" + verb.mastercitizenshipTitle + "'";

            let strCount = _clsmastercitizenship.data.getcount(strwhere);
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