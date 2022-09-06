/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clscompanyauth = require("../../modules/model_backoffice/clscompanyauth");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strquery = _clscompanyauth.data.select("");
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
            let companyAuthId = request.body.companyAuthId;

            strwhere += " and companyAuthId = " + companyAuthId;

            let strquery = _clscompanyauth.data.select(strwhere);
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

            let SearchLocation = request.body.SearchLocation || '';
            let SearchEnrollNoPattern = request.body.SearchEnrollNoPattern || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchLocation != '')
                strwhere += " and location like '%" + SearchLocation + "%'";

            if (SearchEnrollNoPattern != '')
                strwhere += " and enrollNoPattern = '" + SearchEnrollNoPattern + "'";
            strwhere += " order by companyAuthId desc ";

            let strquery = _clscompanyauth.data.select_view_companyauth(strwhere + strlimit);
            let strcount = _clscompanyauth.data.getcount_view_companyauth(strwhere);

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
            let companyAuthId = request.body.companyAuthId;

            strwhere += " and companyAuthId = " + companyAuthId;

            let strquery = _clscompanyauth.data.deleteString(strwhere);

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

            request.body.employerIdEncrypt = dbSecurity.encrypt(request.body.employerId.toString()) || '';
            request.body.companyAuthPassword = dbSecurity.encrypt(request.body.companyAuthPassword) || '';

            let verb = _clscompanyauth.data.masterData(request);
            let strquery = _clscompanyauth.data.insert(verb);

            let strCount0 = _clscompanyauth.data.getcount(" and companyAuthId != 0 and employerId ='" + verb.employerId + "'");
            let [strCount0Result, _strCount0Result] = await dbSecurity.asyncResult(strCount0);
            if (strCount0Result[0].cnt > 0) {
                return {
                    'flag': true,
                    'count': strCount0Result,
                    'query': "Employer is already registered!"
                };
            }

            let strCount1 = _clscompanyauth.data.getcount(" and companyAuthId != 0 and enrollNoPattern ='" + verb.enrollNoPattern + "'");
            let [strCount1Result, _strCount1Result] = await dbSecurity.asyncResult(strCount1);
            if (strCount1Result[0].cnt > 0) {
                return {
                    'flag': true,
                    'count': strCount1Result,
                    'query': "This pattern is already registered!"
                };
            }

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

            request.body.employerIdEncrypt = dbSecurity.encrypt(request.body.employerId.toString()) || '';
            request.body.companyAuthPassword = dbSecurity.encrypt(request.body.companyAuthPassword) || '';

            let verb = _clscompanyauth.data.masterData(request);
            let strquery = _clscompanyauth.data.update(verb);

            let strCount0 = _clscompanyauth.data.getcount(" and companyAuthId != " + verb.companyAuthId + " and employerId ='" + verb.employerId + "'");
            let [strCount0Result, _strCount0Result] = await dbSecurity.asyncResult(strCount0);
            if (strCount0Result[0].cnt > 0) {
                return {
                    'flag': true,
                    'count': strCount0Result,
                    'query': "Employer is already registered!"
                };
            }

            let strCount1 = _clscompanyauth.data.getcount(" and companyAuthId != " + verb.companyAuthId + " and enrollNoPattern ='" + verb.enrollNoPattern + "'");
            let [strCount1Result, _strCount1Result] = await dbSecurity.asyncResult(strCount1);
            if (strCount1Result[0].cnt > 0) {
                return {
                    'flag': true,
                    'count': strCount1Result,
                    'query': "This pattern is already registered!"
                };
            }

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

    dbCountData: (request, response) => {
        try {

            let strwhere = '';
            let charValue = request.body.charValue || '';

            if (charValue != '')
                strwhere += "  and enrollNoPattern like '" + charValue + "%' ";

            let strquery = _clscompanyauth.data.getcount(strwhere);
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