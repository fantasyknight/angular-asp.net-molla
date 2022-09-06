/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployer = require("../../modules/model_employer/clsemployer");
const _clssignup = require("../../modules/model_registration/clssignup");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strquery = _clsemployer.data.select("");
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
            let employerId = request.body.employerId;

            strwhere += " and employerId = " + employerId;

            let strquery = _clsemployer.data.select_view_employer(strwhere);
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

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " order by employerId desc ";

            let strquery = _clsemployer.data.select_view_employer(strwhere + strlimit);
            let strcount = _clsemployer.data.getcount_view_employer(strwhere);

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

            let strwhere = "";
            let employerId = request.body.employerId;

            strwhere += " and employerId = " + employerId;

            let strquery = _clsemployer.data.deleteString(strwhere);
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

            let verb = _clsemployer.data.masterData(request);
            let strquery = _clsemployer.data.insert(verb);

            strwhere += " and employerId != 0 ";
            strwhere += " and employerRegistration = '" + verb.employerRegistration + "'";

            let strCount = _clsemployer.data.getcount(strwhere);
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

            let verb = _clsemployer.data.masterData(request);
            let strquery = _clsemployer.data.update(verb);

            strwhere += " and employerId != " + verb.employerId;
            strwhere += " and employerRegistration = '" + verb.employerRegistration + "'";

            let strCount = _clsemployer.data.getcount(strwhere);
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

    dbEmployerDetail: (request, response) => {
        try {

            let strwhere = '';
            let signupId = request.body.signupId;

            strwhere += " and signupId = " + signupId;

            let strSignup = _clssignup.data.select(strwhere);
            let strEmployer = _clsemployer.data.select(strwhere);

            return {
                'flag': true,
                'query': strSignup + ";" + strEmployer
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },
};