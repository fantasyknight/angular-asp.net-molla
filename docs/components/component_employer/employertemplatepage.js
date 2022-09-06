/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployertemplatepage = require("../../modules/model_employer/clsemployertemplatepage");

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

    dbSelect: (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employerTemplateId = request.body.employerTemplateId;

            let strquery = _clsemployertemplatepage.data.select_view_templatepage(employerId, employerTemplateId);
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

    dbDelete: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employerTemplateId = request.body.employerTemplateId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerTemplateId = " + employerTemplateId;

            let strquery = _clsemployertemplatepage.data.deleteString(strwhere);
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
            let employerTemplateId = request.body.employerTemplateId;
            let tableData = JSON.parse(request.body.tableData);

            let strRemoveTemplate = _clsemployertemplatepage.data.deleteString(" and employerId = " + employerId + " and employerTemplateId = " + employerTemplateId);
            let [strRemoveTemplateResult, _strRemoveTemplateResult] = await dbSecurity.asyncResult(strRemoveTemplate);

            if (tableData.length > 0) {
                let strInsert = _clsemployertemplatepage.data.insertString();
                for (let i = 0; i < tableData.length; i++) {
                    if (i != 0)
                        strInsert += ",";
                    strInsert += "(" + employerTemplateId + ", " + employerId + "," + tableData[i].masterPageId +
                        " ," + tableData[i].isAccess + " ," + tableData[i].isAdd + " , " + tableData[i].isEdit + "," + tableData[i].isDelete +
                        " ," + tableData[i].isReport + " , 0, Now())";
                }
                let [strInsertResult, _strInsertResult] = await dbSecurity.asyncResult(strInsert);
            }
            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': "Inserted"
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};