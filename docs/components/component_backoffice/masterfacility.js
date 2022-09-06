/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterfacility = require("../../modules/model_backoffice/clsmasterfacility");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterfacilityIsActive = request.body.masterfacilityIsActive || true;

            strwhere += " and masterfacilityIsActive = " + masterfacilityIsActive;

            let strquery = _clsmasterfacility.data.select(strwhere);
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
            let masterfacilityId = request.body.masterfacilityId;

            strwhere += " and masterfacilityId = " + masterfacilityId;

            let strquery = _clsmasterfacility.data.select(strwhere);
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

            let SearchMasterfacilityIsActive = request.body.SearchMasterfacilityIsActive || true;
            let SearchMasterFacilityTitle = request.body.SearchMasterFacilityTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterFacilityTitle != '')
                strwhere += " and masterfacilityTitle like '%" + SearchMasterFacilityTitle + "%'";
            strwhere += " and masterfacilityIsActive = " + SearchMasterfacilityIsActive;

            strwhere += " order by masterfacilityId desc ";

            let strquery = _clsmasterfacility.data.select(strwhere + strlimit);
            let strcount = _clsmasterfacility.data.getcount(strwhere);

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

            let masterfacilityId = request.body.masterfacilityId;
            let strquery = _clsmasterfacility.data.delete(masterfacilityId);

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
            let verb = _clsmasterfacility.data.masterData(request);
            let strquery = _clsmasterfacility.data.insert(verb);

            strwhere += " and masterfacilityId != 0 ";
            strwhere += " and masterfacilityTitle = '" + verb.mastercitizenshipTitle + "'";

            let strCount = _clsmasterfacility.data.getcount(strwhere);
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
            let verb = _clsmasterfacility.data.masterData(request);
            let strquery = _clsmasterfacility.data.update(verb);

            strwhere += " and masterfacilityId != " + verb.masterfacilityId;
            strwhere += " and masterfacilityTitle = '" + verb.mastercitizenshipTitle + "'";

            let strCount = _clsmasterfacility.data.getcount(strwhere);
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
    }
};