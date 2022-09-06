/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterterms = require("../../modules/model_backoffice/clsmasterterms");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let mastertermsIsActive = request.body.mastertermsIsActive || true;

            strwhere += " and mastertermsIsActive = " + mastertermsIsActive;

            let strquery = _clsmasterterms.data.select(strwhere);
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
            let mastertermsId = request.body.mastertermsId;

            strwhere += " and mastertermsId = " + mastertermsId;

            let strquery = _clsmasterterms.data.select(strwhere);
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

            let SearchMastertermsTitle = request.body.SearchMastertermsTitle || '';
            let SearchMastertermsIsActive = request.body.SearchMastertermsIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMastertermsTitle != '')
                strwhere += " and mastertermsTitle like '%" + SearchMastertermsTitle + "%' ";
            strwhere += " and mastertermsIsActive = " + SearchMastertermsIsActive;
            strwhere += " order by mastertermsId desc ";

            let strquery = _clsmasterterms.data.select(strwhere + strlimit);
            let strcount = _clsmasterterms.data.getcount(strwhere);

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

            let mastertermsId = request.body.mastertermsId;
            let strquery = _clsmasterterms.data.delete(mastertermsId);

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
            let verb = _clsmasterterms.data.masterData(request);
            let strquery = _clsmasterterms.data.insert(verb);

            strwhere += " and mastertermsId != 0 ";
            strwhere += " and mastertermsTitle = '" + verb.mastertermsTitle + "'";

            let strCount = _clsmasterterms.data.getcount(strwhere);
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
            let verb = _clsmasterterms.data.masterData(request);
            let strquery = _clsmasterterms.data.update(verb);

            strwhere += " and mastertermsId != " + verb.mastertermsId;
            strwhere += " and mastertermsTitle = '" + verb.mastertermsTitle + "'";

            let strCount = _clsmasterterms.data.getcount(strwhere);
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