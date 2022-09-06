/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmastersocsolist = require("../../modules/model_backoffice/clsmastersocsolist");


let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let mastersocsolistIsActive = request.body.mastersocsolistIsActive || true;

            strwhere += " and mastersocsolistIsActive = " + mastersocsolistIsActive;

            let strquery = _clsmastersocsolist.data.select(strwhere);
            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbSelect: (request, response) => {
        try {

            let strwhere = '';
            let mastersocsolistId = request.body.mastersocsolistId;

            strwhere += " and mastersocsolistId = " + mastersocsolistId;

            let strquery = _clsmastersocsolist.data.select(strwhere);
            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbSelectAll: (request, response) => {
        try {

            let strwhere = "";
            let strlimit = "";
            let mastersocsoId = request.body.mastersocsoId;

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and mastersocsoId = " + mastersocsoId;
            strwhere += " order by mastersocsolistId desc ";

            let strquery = _clsmastersocsolist.data.select(strwhere + strlimit);
            let strcount = _clsmastersocsolist.data.getcount(strwhere);

            return {
                'flag': true,
                'query': strquery + ";" + strcount
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbDelete: async (request, response) => {
        try {

            let mastersocsolistId = request.body.mastersocsolistId;
            let strquery = _clsmastersocsolist.data.delete(mastersocsolistId);

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
                'query': error
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let verb = _clsmastersocsolist.data.masterData(request);
            let strquery = _clsmastersocsolist.data.insert(verb);

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
                'query': error
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let verb = _clsmastersocsolist.data.masterData(request);
            let strquery = _clsmastersocsolist.data.update(verb);

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
                'query': error
            };
        }
    }
};