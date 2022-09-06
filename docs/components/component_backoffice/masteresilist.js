/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasteresilist = require("../../modules/model_backoffice/clsmasteresilist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masteresilistIsActive = request.body.masteresilistIsActive || true;

            strwhere += " and masteresilistIsActive = " + masteresilistIsActive;

            let strquery = _clsmasteresilist.data.select(strwhere);
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
            let masteresilistId = request.body.masteresilistId;

            strwhere += " and masteresilistId = " + masteresilistId;

            let strquery = _clsmasteresilist.data.select(strwhere);
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
            let masteresiId = request.body.masteresiId;

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and masteresiId = " + masteresiId;
            strwhere += " order by masteresilistId desc ";

            let strquery = _clsmasteresilist.data.select(strwhere + strlimit);
            let strcount = _clsmasteresilist.data.getcount(strwhere);

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

            let masteresilistId = request.body.masteresilistId;
            let strquery = _clsmasteresilist.data.delete(masteresilistId);

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

            let verb = _clsmasteresilist.data.masterData(request);
            let strquery = _clsmasteresilist.data.insert(verb);

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

            let verb = _clsmasteresilist.data.masterData(request);
            let strquery = _clsmasteresilist.data.update(verb);

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