/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerallowance = require("../../modules/model_employer/clsemployerallowance");

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
            let employerallowanceBenefitInKind = request.body.employerallowanceBenefitInKind;

            strwhere += " and employerId = " + employerId;

            if (employerallowanceBenefitInKind === true)
                strwhere += " and employerallowanceBenefitInKind = " + true;
            if (employerallowanceBenefitInKind === false)
                strwhere += " and employerallowanceBenefitInKind = " + false;

            strwhere += " order by employerallowanceCode asc ";

            let strquery = _clsemployerallowance.data.select(strwhere);
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
            let employerallowanceId = request.body.employerallowanceId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerallowanceId = " + employerallowanceId;

            let strquery = _clsemployerallowance.data.select(strwhere);
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

            let SearchEmployerallowanceCode = request.body.SearchEmployerallowanceCode || '';
            let SearchEmployerallowanceIsActive = request.body.SearchEmployerallowanceIsActive;

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployerallowanceCode != "")
                strwhere += " and employerallowanceCode like '%" + SearchEmployerallowanceCode + "%' ";

            strwhere += " and employerallowanceIsActive  = " + SearchEmployerallowanceIsActive;
            strwhere += " and employerId = " + employerId;
            strwhere += " order by employerallowanceCode asc ";

            let strquery = _clsemployerallowance.data.select(strwhere + strlimit);
            let strcount = _clsemployerallowance.data.getcount(strwhere);

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
            let employerallowanceId = request.body.employerallowanceId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerallowanceId = " + employerallowanceId;

            let strquery = _clsemployerallowance.data.deleteString(strwhere);

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
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployerallowance.data.masterData(request);
            let strquery = _clsemployerallowance.data.insert(verb);

            strwhere += " and employerallowanceId != 0 ";
            strwhere += " and employerallowanceCode = '" + verb.employerallowanceCode + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerallowance.data.getcount(strwhere);
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
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployerallowance.data.masterData(request);
            let strquery = _clsemployerallowance.data.update(verb);

            strwhere += " and employerallowanceId != " + verb.employerallowanceId;
            strwhere += " and employerallowanceCode = '" + verb.employerallowanceCode + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployerallowance.data.getcount(strwhere);
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