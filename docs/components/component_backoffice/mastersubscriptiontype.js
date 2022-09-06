/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmastersubscriptiontype = require("../../modules/model_backoffice/clsmastersubscriptiontype");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let mastersubscriptiontypeIsActive = request.body.mastersubscriptiontypeIsActive || true;

            strwhere += " and mastersubscriptiontypeIsActive = " + mastersubscriptiontypeIsActive;

            let strquery = _clsmastersubscriptiontype.data.select(strwhere);
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
            let mastersubscriptiontypeId = request.body.mastersubscriptiontypeId;

            strwhere += " and mastersubscriptiontypeId = " + mastersubscriptiontypeId;

            let strquery = _clsmastersubscriptiontype.data.select(strwhere);
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

            let SearchMasterSubscriptionTypeTitle = request.body.SearchMasterSubscriptionTypeTitle || '';
            let SearchMastersubscriptiontypeIsActive = request.body.SearchMastersubscriptiontypeIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterSubscriptionTypeTitle != '')
                strwhere += " and mastersubscriptiontypeTitle like '%" + SearchMasterSubscriptionTypeTitle + "%' ";
            strwhere += " and mastersubscriptiontypeIsActive = " + SearchMastersubscriptiontypeIsActive;
            strwhere += " order by mastersubscriptiontypeId desc ";

            let strquery = _clsmastersubscriptiontype.data.select(strwhere + strlimit);
            let strcount = _clsmastersubscriptiontype.data.getcount(strwhere);

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

            let mastersubscriptiontypeId = request.body.mastersubscriptiontypeId;
            let strquery = _clsmastersubscriptiontype.data.delete(mastersubscriptiontypeId);

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
            let verb = _clsmastersubscriptiontype.data.masterData(request);
            let strquery = _clsmastersubscriptiontype.data.insert(verb);

            strwhere += " and mastersubscriptiontypeId != 0 ";
            strwhere += " and mastersubscriptiontypeTitle = '" + verb.mastersubscriptiontypeTitle + "'";

            let strCount = _clsmastersubscriptiontype.data.getcount(strwhere);
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
            let verb = _clsmastersubscriptiontype.data.masterData(request);
            let strquery = _clsmastersubscriptiontype.data.update(verb);

            strwhere += " and mastersubscriptiontypeId != " + verb.mastersubscriptiontypeId;
            strwhere += " and mastersubscriptiontypeTitle = '" + verb.mastersubscriptiontypeTitle + "'";

            let strCount = _clsmastersubscriptiontype.data.getcount(strwhere);
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