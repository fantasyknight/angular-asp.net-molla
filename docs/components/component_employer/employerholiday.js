/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployerholiday = require("../../modules/model_employer/clsemployerholiday");

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

            let strquery = _clsemployerholiday.data.select(strwhere);
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
            let employerHolidayId = request.body.employerHolidayId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerHolidayId = " + employerHolidayId;

            let strquery = _clsemployerholiday.data.select(strwhere);
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

            let SearchHolidayDate = request.body.SearchHolidayDate || '';
            let SearchHolidayTitle = request.body.SearchHolidayTitle || '';

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchHolidayDate != "")
                strwhere += " and YEAR(holidayDate) = " + SearchHolidayDate;
            if (SearchHolidayTitle != "")
                strwhere += " and holidayTitle like '%" + SearchHolidayTitle + "%' ";
            strwhere += " and employerId = " + employerId;

            let strquery = _clsemployerholiday.data.select_view_holiday(strwhere + strlimit);
            let strcount = _clsemployerholiday.data.getcount_view_holiday(strwhere);

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
            let employerHolidayId = request.body.employerHolidayId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employerHolidayId = " + employerHolidayId;

            let strquery = _clsemployerholiday.data.deleteString(strwhere);
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

            let verb = _clsemployerholiday.data.masterData(request);
            let strquery = _clsemployerholiday.data.insert(verb);

            strwhere += " and employerHolidayId != 0 ";
            strwhere += " and holidayDate = " + verb.holidayDate + "";
            strwhere += " and employerId = " + employerId;

            let strCount = _clsemployerholiday.data.getcount(strwhere);
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

            let verb = _clsemployerholiday.data.masterData(request);
            let strquery = _clsemployerholiday.data.update(verb);

            strwhere += " and employerHolidayId != " + verb.employerHolidayId;
            strwhere += " and holidayDate = " + verb.holidayDate + "";
            strwhere += " and employerId = " + employerId;

            let strCount = _clsemployerholiday.data.getcount(strwhere);
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

    dbInsertList: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;
            let data = JSON.parse(request.body.holidayList);

            if (data.length > 0) {
                let strCount = _clsemployerholiday.data.getcount(" AND YEAR(holidayDate) = '" + data[0]._holidayDate + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

                if (strCountResult[0].cnt > 0) {
                    return {
                        'flag': true,
                        'count': strCountResult[0].cnt,
                        'query': "Record already inserted!"
                    };
                }

                let strquery = _clsemployerholiday.data.insertString();
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (i != 0)
                            strquery += ",";
                        strquery += "(" + employerId + ", '" + data[i].holidayTitle + "', '" + data[i]._holidayDate + "', '" + data[i].holidayDescription + "', '" + data[i].holidayOTTag + "', '" + data[i].holidayAddPayTag + "',  '" + data[i].holidayShiftTag + "', 0, now())";
                    }
                }

                let [strqueryResult, _strqueryResult] = await dbSecurity.asyncResult(strquery);

                return {
                    'flag': true,
                    'count': 0,
                    'query': "Inserted"
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },
};