/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterepflist = require("../../modules/model_backoffice/clsmasterepflist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterepflistIsActive = request.body.masterepflistIsActive || true;

            strwhere += " and masterepflistIsActive = " + masterepflistIsActive;

            let strquery = _clsmasterepflist.data.select(strwhere);
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
            let masterepflistId = request.body.masterepflistId;

            strwhere += " and masterepflistId = " + masterepflistId;

            let strquery = _clsmasterepflist.data.select(strwhere);

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
            let masterepfId = request.body.masterepfId;

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and masterepfId = " + masterepfId;
            strwhere += " order by masterepflistId desc ";

            let strquery = _clsmasterepflist.data.select(strwhere + strlimit);
            let strcount = _clsmasterepflist.data.getcount(strwhere);

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

            let masterepflistId = request.body.masterepflistId;
            let strquery = _clsmasterepflist.data.delete(masterepflistId);

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

            let verb = _clsmasterepflist.data.masterData(request);
            let strquery = _clsmasterepflist.data.insert(verb);

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

            let verb = _clsmasterepflist.data.masterData(request);
            let strquery = _clsmasterepflist.data.update(verb);

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