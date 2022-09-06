/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterhrdflist = require("../../modules/model_backoffice/clsmasterhrdflist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterhrdflistIsActive = request.body.masterhrdflistIsActive || true;

            strwhere += " and masterhrdflistIsActive = " + masterhrdflistIsActive;

            let strquery = _clsmasterhrdflist.data.select(strwhere);
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
            let masterhrdflistId = request.body.masterhrdflistId;

            strwhere += " and masterhrdflistId = " + masterhrdflistId;

            let strquery = _clsmasterhrdflist.data.select(strwhere);

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
            let masterhrdfId = request.body.masterhrdfId;

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and masterhrdfId = " + masterhrdfId;
            strwhere += " order by masterhrdflistId desc ";

            let strquery = _clsmasterhrdflist.data.select(strwhere + strlimit);
            let strcount = _clsmasterhrdflist.data.getcount(strwhere);

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

            let masterhrdflistId = request.body.masterhrdflistId;
            let strquery = _clsmasterhrdflist.data.delete(masterhrdflistId);

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

            let verb = _clsmasterhrdflist.data.masterData(request);
            let strquery = _clsmasterhrdflist.data.insert(verb);

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

    dbUpdate: async (request, response) => {
        try {

            let verb = _clsmasterhrdflist.data.masterData(request);
            let strquery = _clsmasterhrdflist.data.update(verb);

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
    }
};