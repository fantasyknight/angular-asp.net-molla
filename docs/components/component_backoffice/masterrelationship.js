/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterrelationship = require("../../modules/model_backoffice/clsmasterrelationship");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterrelationshipIsActive = request.body.masterrelationshipIsActive || true;

            strwhere += " and masterrelationshipIsActive = " + masterrelationshipIsActive;

            let strquery = _clsmasterrelationship.data.select(strwhere);
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
            let masterrelationshipId = request.body.masterrelationshipId;

            strwhere += " and masterrelationshipId = " + masterrelationshipId;

            let strquery = _clsmasterrelationship.data.select(strwhere);
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

            let SearchMasterRelationshipIsActive = request.body.SearchMasterRelationshipIsActive || true;
            let SearchMasterRelationshipTitle = request.body.SearchMasterRelationshipTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterRelationshipTitle != '')
                strwhere += " and masterrelationshipTitle like '%" + SearchMasterRelationshipTitle + "%'";
            strwhere += " and masterrelationshipIsActive = " + SearchMasterRelationshipIsActive;
            strwhere += " order by masterrelationshipId desc ";

            let strquery = _clsmasterrelationship.data.select(strwhere + strlimit);
            let strcount = _clsmasterrelationship.data.getcount(strwhere);

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

            let masterrelationshipId = request.body.masterrelationshipId;
            let strquery = _clsmasterrelationship.data.delete(masterrelationshipId);

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

            let strwhere = '';
            let verb = _clsmasterrelationship.data.masterData(request);
            let strquery = _clsmasterrelationship.data.insert(verb);

            strwhere += " and masterrelationshipId != 0 ";
            strwhere += " and masterrelationshipTitle = '" + verb.masterrelationshipTitle + "'";

            let strCount = _clsmasterrelationship.data.getcount(strwhere);
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

            let strwhere = '';
            let verb = _clsmasterrelationship.data.masterData(request);
            let strquery = _clsmasterrelationship.data.update(verb);

            strwhere += " and masterrelationshipId != " + verb.masterrelationshipId;
            strwhere += " and masterrelationshipTitle = '" + verb.masterrelationshipTitle + "'";

            let strCount = _clsmasterrelationship.data.getcount(strwhere);
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
    }
};