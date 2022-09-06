/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployersubscriptiontopup = require("../../modules/model_employer/clsemployersubscriptiontopup");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            strwhere = " and employersubscriptiontopupIsActive = true ";

            let strquery = _clsemployersubscriptiontopup.data.select(strwhere);
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

            let strwhere = "";
            let employersubscriptiontopupId = request.body.employersubscriptiontopupId;

            strwhere = " and employersubscriptiontopupId = " + employersubscriptiontopupId;
            let strquery = _clsemployersubscriptiontopup.data.select(strwhere);
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

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            let employersubscriptionId = request.body.employersubscriptionId;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employersubscriptionId = " + employersubscriptionId;
            strwhere += " order by employersubscriptiontopupId desc ";

            let strquery = _clsemployersubscriptiontopup.data.select(strwhere + strlimit);
            let strcount = _clsemployersubscriptiontopup.data.getcount(strwhere);

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

            let employersubscriptiontopupId = request.body.employersubscriptiontopupId;

            let strquery = _clsemployersubscriptiontopup.data.delete(employersubscriptiontopupId);
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

            let verb = _clsemployersubscriptiontopup.data.masterData(request);
            let strquery = _clsemployersubscriptiontopup.data.insert(verb);

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

            let verb = _clsemployersubscriptiontopup.data.masterData(request);
            let strquery = _clsemployersubscriptiontopup.data.update(verb);

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

};