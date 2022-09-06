/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterpage = require("../../modules/model_backoffice/clsmasterpage");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strquery = _clsmasterpage.data.select("");
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

            let verb = _clsmasterpage.data.masterData(request);
            let strquery = _clsmasterpage.data.select(" and masterPageId = " + verb.masterPageId);
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

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit" + ((pageIndex - 1) * pageSize) + "," + pageSize;

            let strquery = _clsmasterpage.data.select(strwhere + strlimit);
            let strcount = _clsmasterpage.data.getcount(strwhere);

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

            let verb = _clsmasterpage.data.masterData(request);
            let strquery = _clsmasterpage.data.delete(verb.masterPageId);

            let strCount = _clsmasterpage.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let verb = _clsmasterpage.data.masterData(request);
            let strquery = _clsmasterpage.data.insert(verb);

            let strCount = _clsmasterpage.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let verb = _clsmasterpage.data.masterData(request);
            let strquery = _clsmasterpage.data.update(verb);

            let strCount = _clsmasterpage.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

};