/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clssignup = require("../../modules/model_registration/clssignup");

let self = module.exports = {

    dbSelectAll: (request, response) => {
        try {

            let SearchEmail = request.body.SearchEmail || "";
            let SearchRole = request.body.SearchRole || "";

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmail != "")
                strwhere += " and email like '%" + SearchEmail + "%'";
            if (SearchRole != "")
                strwhere += " and role like '%" + SearchRole + "%'";
            strwhere += " order by signupId desc ";

            let strquery = _clssignup.data.select(strwhere + strlimit);
            let strcount = _clssignup.data.getcount(strwhere);

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

    dbInsert: async (request, response) => {
        try {

            let strwhere = "";
            request.body.password = dbSecurity.encrypt(request.body.password) || '';

            let randomNumber = Math.floor(100000 + Math.random() * 900000);
            request.body.accessCode = randomNumber;

            let verb = _clssignup.data.masterData(request);
            let strquery = _clssignup.data.insert(verb);

            strwhere += " and signupId != 0 ";
            strwhere += " and email = '" + verb.email + "'";

            let strCount = _clssignup.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
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

            let verb = _clssignup.data.masterData(request);
            let strquery = _clssignup.data.update(verb);

            strwhere += " and signupId != " + verb.signupId;
            strwhere += " and email = '" + verb.email + "'";

            let strCount = _clssignup.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbVerifyFlag: async (request, response) => {
        try {

            let signupId = request.body.signupId;
            let strquery = _clssignup.data.updateColumn(" isVerify = true ", signupId);

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

    dbChangePassword: async (request, response) => {
        try {

            let verb = _clssignup.data.masterData(request);
            let pass = dbSecurity.encrypt(verb.password);
            let strquery = _clssignup.data.updateColumn(" password = '" + pass + "' ", verb.signupId);

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
    }
};