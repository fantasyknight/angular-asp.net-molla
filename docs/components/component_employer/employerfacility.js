/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerfacility = require("../../modules/model_employer/clsemployerfacility");

let self = module.exports = {

    fetchEmployerId: (request) => {
        try {

            let decryptionData = dbSecurity._decryption(request.body.employerId);
            if (decryptionData.encryption == false) {
                return {
                    'flag': false,
                    'query': 'No valid employerId'
                };
            }

            return decryptionData.decrypt;
        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerfacilityIsActive = true ";

            let strquery = _clsemployerfacility.data.select(strwhere);
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
            let employerId = self.fetchEmployerId(request);
            let employerfacilityId = request.body.employerfacilityId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerfacilityId = " + employerfacilityId;

            let strquery = _clsemployerfacility.data.select(strwhere);
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

            let SearchMasterfacilityId = request.body.SearchMasterfacilityId || '';
            let SearchEmployerfacilityIsActive = request.body.SearchEmployerfacilityIsActive || true;

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterfacilityId != '')
                strwhere += " and masterfacilityId = " + SearchMasterfacilityId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerfacilityIsActive = " + SearchEmployerfacilityIsActive;

            let strquery = _clsemployerfacility.data.select(strwhere + strlimit);
            let strcount = _clsemployerfacility.data.getcount(strwhere);

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
            let employerId = self.fetchEmployerId(request);
            let employerfacilityId = request.body.employerfacilityId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerfacilityId = " + employerfacilityId;

            let strquery = _clsemployerfacility.data.deleteString(strwhere);
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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;
            request.body.createdBy = employerId;

            let verb = _clsemployerfacility.data.masterData(request);
            let strquery = _clsemployerfacility.data.insert(verb);

            strwhere += " and employerfacilityId != 0 ";
            strwhere += " and masterfacilityId = '" + verb.masterfacilityId + "'";
            strwhere += " and employerId = " + employerId;

            let strCount = _clsemployerfacility.data.getcount(strwhere);
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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;
            request.body.createdBy = createdBy;

            let verb = _clsemployerfacility.data.masterData(request);
            let strquery = _clsemployerfacility.data.update(verb);

            strwhere += " and employerfacilityId != " + verb.employerfacilityId;
            strwhere += " and masterfacilityId = '" + verb.masterfacilityId + "'";
            strwhere += " and employerId = " + employerId;

            let strCount = _clsemployerfacility.data.getcount(strwhere);
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