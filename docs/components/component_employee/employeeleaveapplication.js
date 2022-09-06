let moment = require('moment');
/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeleaveapplication = require("../../modules/model_employee/clsemployeeleaveapplication");
const _clsemployerleavetype = require("../../modules/model_employer/clsemployerleavetype");
const _clsemployerleavetypeentitlement = require("../../modules/model_employer/clsemployerleavetypeentitlement");
const _clsemployeeleaveentitlement = require("../../modules/model_Employee/clsemployeeleaveentitlement");
const _clsemployee = require("../../modules/model_employee/clsemployee");
/* component */
const _employeeleavereport = require("../../components/component_employee/employeeleavereport");

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

            let strquery = _clsemployeeleaveapplication.data.select(strwhere);
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
            let employeeleaveapplicationId = request.body.employeeleaveapplicationId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeleaveapplicationId = " + employeeleaveapplicationId;

            let strquery = _clsemployeeleaveapplication.data.select(strwhere);
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

            let searchLeaveStatus = request.body.searchLeaveStatus || '';
            let searchFromDate = request.body.searchFromDate || '';
            let searchToDate = request.body.searchToDate || '';
            let searchMasterEmployeeId = request.body.searchMasterEmployeeId || '';
            let searchEmergency = request.body.searchEmergency || '';
            let searchLeaveType = request.body.searchLeaveType || '';

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (searchMasterEmployeeId != "")
                strwhere += " and employeeId = " + searchMasterEmployeeId;
            if (searchLeaveStatus != "")
                strwhere += " and employeeleaveapplicationLeaveStatus = '" + searchLeaveStatus + "' ";
            if (searchLeaveType != "")
                strwhere += " and employerleavetypeLeaveCode = '" + searchLeaveType + "' ";
            if (searchEmergency != "all") {
                if (searchEmergency == "yes")
                    strwhere += " and employeeleaveapplicationIsEmergency = true ";
                else
                    strwhere += " and employeeleaveapplicationIsEmergency = false ";
            }
            if (searchFromDate != "")
                strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m-%d') >= DATE_FORMAT('" + searchFromDate + "', '%Y-%m-%d')";
            if (searchToDate != "")
                strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m-%d') <= DATE_FORMAT('" + searchToDate + "', '%Y-%m-%d')";

            strwhere += " and employerId = " + employerId;
            strwhere += " order by employeeleaveapplicationId desc ";

            let strquery = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strwhere + strlimit);
            let strcount = _clsemployeeleaveapplication.data.getcount_view_employeeleaveapplication(strwhere);

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
            let employeeleaveapplicationId = request.body.employeeleaveapplicationId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeleaveapplicationId = " + employeeleaveapplicationId;

            let strquery = _clsemployeeleaveapplication.data.deleteString(strwhere);
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

            let verb = _clsemployeeleaveapplication.data.masterData(request);
            let strquery = _clsemployeeleaveapplication.data.insert(verb);

            strwhere += " and employerId = " + verb.employerId;
            strwhere += " and employeeId = " + verb.employeeId;
            strwhere += " and employerleavetypeId = " + verb.employerleavetypeId;
            strwhere += " AND ((STR_TO_DATE(employeeleaveapplicationLeaveFrom, '%Y-%m-%d') BETWEEN " + verb.employeeleaveapplicationLeaveFrom + " AND " + verb.employeeleaveapplicationLeaveTo + ") ";
            strwhere += " OR (STR_TO_DATE(employeeleaveapplicationLeaveTo, '%Y-%m-%d') BETWEEN " + verb.employeeleaveapplicationLeaveFrom + " AND " + verb.employeeleaveapplicationLeaveTo + ") ";
            strwhere += " OR ((STR_TO_DATE(employeeleaveapplicationLeaveFrom, '%Y-%m-%d') < " + verb.employeeleaveapplicationLeaveFrom + ") ";
            strwhere += " AND (STR_TO_DATE(employeeleaveapplicationLeaveTo, '%Y-%m-%d') > " + verb.employeeleaveapplicationLeaveTo + "))) ";

            let strCount = _clsemployeeleaveapplication.data.getcount(strwhere);
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

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeeleaveapplication.data.masterData(request);
            let strquery = _clsemployeeleaveapplication.data.update(verb);

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

    dbSelect_Count: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let currentDate = request.body.currentDate;
            let employeeId = request.body.employeeId || "";

            if (employeeId != "")
                strwhere += " and employeeId = " + employeeId;
            strwhere += " and employerId = " + employerId;
            strwhere += " and MONTH(employeeleaveapplicationLeaveApply) = MONTH('" + currentDate + "') ";

            let strPending = _clsemployeeleaveapplication.data.getcount(strwhere + " and employeeleaveapplicationLeaveStatus = 'Pending' ");
            let strApproved = _clsemployeeleaveapplication.data.getcount(strwhere + " and employeeleaveapplicationLeaveStatus = 'Approved' ");
            let strRejected = _clsemployeeleaveapplication.data.getcount(strwhere + " and employeeleaveapplicationLeaveStatus = 'Rejected' ");
            return {
                'flag': true,
                'query': strPending + " ; " + strApproved + " ; " + strRejected
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbAutoLeaveCalculation: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);

            let strEmployeeList = _clsemployee.data.select(" and employerId = " + employerId);
            let [strEmployeeListResult, _strEmployeeListResult] = await dbSecurity.asyncResult(strEmployeeList);
            if (strEmployeeListResult.length > 0) {
                for (let i = 0; i < strEmployeeListResult.length; i++) {
                    let employeeId = strEmployeeListResult[i].employeeId;

                    let strEmployerleavetypeentitlementList = _clsemployeeleaveentitlement.data.select(" and employeeId = " + employeeId + " and employerId = " + employerId);
                    let [strEmployerleavetypeentitlementListResult, _strEmployerleavetypeentitlementListResult] = await dbSecurity.asyncResult(strEmployerleavetypeentitlementList);
                    if (strEmployerleavetypeentitlementListResult.length > 0) {
                        for (let j = 0; j < strEmployerleavetypeentitlementListResult.length; j++) {
                            let employerleavetypeId = strEmployerleavetypeentitlementListResult[j].employerleavetypeId;
                            let selectedFromDate = moment(new Date()).format("YYYY-MM-DD");

                            let strSelectEmployee = _clsemployee.data.select_calculate_Joining(" and employeeId = " + employeeId, selectedFromDate);
                            let [strSelectEmployeeResult, _strSelectEmployeeResult] = await dbSecurity.asyncResult(strSelectEmployee);

                            let _joiningYearDate = moment(strSelectEmployeeResult[0].startYearDate).format("YYYY-MM-DD");
                            let _endingYearDate = moment(strSelectEmployeeResult[0].endYearDate).format("YYYY-MM-DD");
                            let earnMonth = strSelectEmployeeResult[0].earnMonth;

                            //. Leave Entitlement
                            let strSelectLeaveEntitlement = _clsemployeeleaveentitlement.data.select(" and employeeId = " + employeeId + " and employerleavetypeId = " + employerleavetypeId);
                            let [strSelectLeaveEntitlementResult, _strSelectLeaveEntitlementResult] = await dbSecurity.asyncResult(strSelectLeaveEntitlement);

                            let entitlement = 0;
                            let previousYearBnf = 0;

                            if (strSelectLeaveEntitlementResult.length > 0) {
                                entitlement = strSelectLeaveEntitlementResult[0].employeeleaveentitlementEntitled;
                                previousYearBnf = strSelectLeaveEntitlementResult[0].employeeleaveentitlementPreviousYearBnf;
                                overrideBnf = strSelectLeaveEntitlementResult[0].employeeleaveentitlementAllowedbnfOverride;
                                allowedBnf = strSelectLeaveEntitlementResult[0].employeeleaveentitlementAllowendbnf;
                            }

                            //. Leave type
                            let strSelectLeaveType = _clsemployerleavetype.data.select(" and employerleavetypeId = " + employerleavetypeId);
                            let [strSelectLeaveTypeResult, _strSelectLeaveTypeResult] = await dbSecurity.asyncResult(strSelectLeaveType);

                            let value = 2;
                            let employerleavetypeOnProrateBasis = 0;
                            if (strSelectLeaveTypeResult.length > 0) {
                                value = strSelectLeaveTypeResult[0].employerleavetypeEntitlementRounding;
                                employerleavetypeOnProrateBasis = strSelectLeaveTypeResult[0].employerleavetypeOnProrateBasis;
                            }
                            let entitlementDay1 = 0;
                            let entitlementDay2 = 0;

                            //. Leave Count

                            strwhere = "";
                            strwhere += " and employeeId = " + employeeId;
                            strwhere += " and employerleavetypeId = " + employerleavetypeId;
                            strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') >= DATE_FORMAT('" + _joiningYearDate + "', '%Y-%m')";
                            strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') <= DATE_FORMAT('" + _endingYearDate + "', '%Y-%m')";

                            let strSelectLeaveCount = _clsemployeeleaveapplication.data.total_view_employeeleaveapplication(strwhere);
                            let [strSelectLeaveCountResult, _strSelectLeaveCountResult] = await dbSecurity.asyncResult(strSelectLeaveCount);

                            let totalLeave = strSelectLeaveCountResult[0].cnt;
                            let dLeaveEntitled = 0;
                            let bal1 = 0;

                            if (employerleavetypeOnProrateBasis == 1) {
                                entitlementDay1 = (entitlement / 12) * (earnMonth);
                                if (!Number.isInteger(entitlementDay1)) {

                                    entitlementDay2 = Math.floor(entitlementDay1);
                                    if (value == 1)
                                        entitlementDay2 = entitlementDay2 + 1;
                                    if (value == 2)
                                        entitlementDay2 = entitlementDay2;

                                } else
                                    entitlementDay2 = entitlementDay1;

                                if (entitlement < entitlementDay2 || earnMonth == 11 || earnMonth == 12)
                                    entitlementDay2 = entitlement;

                                dLeaveEntitled = entitlementDay2 + previousYearBnf;
                                bal1 = dLeaveEntitled - totalLeave;
                            } else {
                                dLeaveEntitled = entitlement + previousYearBnf;
                                bal1 = dLeaveEntitled - totalLeave;
                            }

                            //! Insert Process
                            request.body.employeeId = employeeId;
                            request.body.employerleavetypeId = employerleavetypeId;
                            request.body.startYear = _joiningYearDate;
                            request.body.endYear = _endingYearDate;
                            request.body.reportEntitlementDay = entitlement;
                            request.body.reportEntitlementGeneratedDay = dLeaveEntitled;
                            request.body.reportTakenLeave = totalLeave;
                            request.body.reportTotalBalanceLeave = bal1;
                            await _employeeleavereport.dbInsertMaster(request, response);
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
};