/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployertemplate = require("../../modules/model_employer/clsemployertemplate");

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

            strwhere = " and employerId = " + employerId;

            let strquery = _clsemployertemplate.data.select(strwhere);
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
            let employerTemplateId = request.body.employerTemplateId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerTemplateId = " + employerTemplateId;

            let strquery = _clsemployertemplate.data.select(strwhere);
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

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere = " and employerId = " + employerId;

            let strquery = _clsemployertemplate.data.select(strwhere + strlimit);
            let strcount = _clsemployertemplate.data.getcount(strwhere);

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
            let employerTemplateId = request.body.employerTemplateId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerTemplateId = " + employerTemplateId;

            let strquery = _clsemployertemplate.data.deleteString(strwhere);

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

            let verb = _clsemployertemplate.data.masterData(request);
            let strquery = _clsemployertemplate.data.insert(verb);

            strwhere += " and employerTemplateId != 0 ";
            strwhere += " and templateName = '" + verb.templateName + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployertemplate.data.getcount(strwhere);
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

            let verb = _clsemployertemplate.data.masterData(request);
            let strquery = _clsemployertemplate.data.update(verb);

            strwhere += " and employerTemplateId != " + verb.employerTemplateId;
            strwhere += " and templateName = '" + verb.templateName + "'";
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployertemplate.data.getcount(strwhere);
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