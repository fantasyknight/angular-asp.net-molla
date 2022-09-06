/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployermastershift = require("../../modules/model_employer/clsemployermastershift");

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

            let strquery = _clsemployermastershift.data.select(strwhere);
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
            let employerMasterShiftId = request.body.employerMasterShiftId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerMasterShiftId = " + employerMasterShiftId;

            let verb = _clsemployermastershift.data.masterData(request);
            let strquery = _clsemployermastershift.data.select(strwhere);
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

            let SearchshiftName = request.body.SearchshiftName || '';

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchshiftName != '')
                strwhere += " and shiftName like '%" + SearchshiftName + "%'";

            strwhere += " and employerId = " + employerId;
            strwhere += " order by employerMasterShiftId desc ";

            let strquery = _clsemployermastershift.data.select(strwhere + strlimit);
            let strcount = _clsemployermastershift.data.getcount(strwhere);

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
            let employerMasterShiftId = request.body.employerMasterShiftId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerMasterShiftId = " + employerMasterShiftId;

            let strquery = _clsemployermastershift.data.deleteString(strwhere);

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

            let verb = _clsemployermastershift.data.masterData(request);
            let strquery = _clsemployermastershift.data.insert(verb);

            strwhere += " and employerMasterShiftId != 0 ";
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and shiftName = '" + verb.shiftName + "'";

            let strCount = _clsemployermastershift.data.getcount(strwhere);
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

            let verb = _clsemployermastershift.data.masterData(request);
            let strquery = _clsemployermastershift.data.update(verb);

            strwhere += " and employerMasterShiftId != " + verb.employerMasterShiftId;
            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and shiftName = '" + verb.shiftName + "'";

            let strCount = _clsemployermastershift.data.getcount(strwhere);
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

    dbSelect_Count: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            let strcount = _clsemployermastershift.data.getcount(strwhere);

            return {
                'flag': true,
                'query': strcount
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};