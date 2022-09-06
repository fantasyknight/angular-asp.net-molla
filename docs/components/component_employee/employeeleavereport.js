let moment = require('moment');
/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeleavereport = require("../../modules/model_employee/clsemployeeleavereport");
const _clsemployerleavetype = require("../../modules/model_employer/clsemployerleavetype");
const _classEmployeeLeaveEntitlement = require("../../modules/model_employee/clsemployeeleaveentitlement");
const _classemployerleavetypeentitlement = require("../../modules/model_employer/clsemployerleavetypeentitlement");
const _clsemployeeleaveapplication = require("../../modules/model_employee/clsemployeeleaveapplication");

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
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            strwhere += " order by startYear desc ";

            let strquery = _clsemployeeleavereport.data.select_view_employeeleavereport(strwhere);
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
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            strwhere += " order by startYear desc ";

            let strquery = _clsemployeeleavereport.data.select_view_employeeleavereport(strwhere);
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

            let SearchEmployeeId = request.body.SearchEmployeeId || "";
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || "";
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || "";

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployeeId != "")
                strwhere += " and employeeId = " + SearchEmployeeId;
            if (SearchEmployerdepartmentId != "")
                strwhere += " and employerdepartmentId = " + SearchEmployerdepartmentId;
            if (SearchEmployerbranchId != "")
                strwhere += " and employerbranchId = " + SearchEmployerbranchId;

            strwhere += " and employerId = " + employerId;
            strwhere += " order by memberName asc ";

            let strquery = _clsemployeeleavereport.data.select_distinct_view_employeeleavereport(strwhere + strlimit);
            let strcount = _clsemployeeleavereport.data.getcount_distinct_view_employeeleavereport(strwhere);

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
            let employeeleavereportId = request.body.employeeleavereportId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeleavereportId = " + employeeleavereportId;

            let strquery = _clsemployeeleavereport.data.deleteString(strwhere);
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

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeeleavereport.data.masterData(request);
            let strquery = _clsemployeeleavereport.data.insert(verb);

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

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeeleavereport.data.masterData(request);
            let strquery = _clsemployeeleavereport.data.update(verb);

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

    dbInsertMaster: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;
            let employerleavetypeId = request.body.employerleavetypeId;
            let startYear = request.body.startYear;
            let endYear = request.body.endYear;
            let reportEntitlementDay = request.body.reportEntitlementDay;
            let reportEntitlementGeneratedDay = request.body.reportEntitlementGeneratedDay;
            let reportTakenLeave = request.body.reportTakenLeave;
            let reportTotalBalanceLeave = request.body.reportTotalBalanceLeave;

            let strquery = _clsemployeeleavereport.data.select(" and employeeId = " + employeeId +
                " and employerId = " + employerId +
                " and employerleavetypeId = " + employerleavetypeId +
                " and startYear = '" + startYear + "' and endYear = '" + endYear + "'");

            let [strqueryResult, _strqueryResult] = await dbSecurity.asyncResult(strquery);
            if (strqueryResult.length == 0) {

                let strinsert = _clsemployeeleavereport.data.insertString();
                strinsert += " (" + employerId + ", " + employeeId + ", " + employerleavetypeId + ", '" + startYear + "', '" + endYear +
                    "', " + reportEntitlementDay + ", " + reportEntitlementGeneratedDay + ", " + reportTakenLeave + ", " + reportTotalBalanceLeave + ") ";

                let [strinsertResult, _strinsertResult] = await dbSecurity.asyncResult(strinsert);

            } else {

                let employeeleavereportId = strqueryResult[0].employeeleavereportId;
                let strupdate = "update tblemployeeleavereport set employerId = '" + employerId + "', employeeId = '" + employeeId +
                    "', employerleavetypeId = '" + employerleavetypeId + "', startYear = '" + startYear + "', endYear = '" + endYear +
                    "', reportEntitlementDay = '" + reportEntitlementDay + "', reportEntitlementGeneratedDay = '" + reportEntitlementGeneratedDay +
                    "', reportTakenLeave = '" + reportTakenLeave + "', reportTotalBalanceLeave = '" + reportTotalBalanceLeave +
                    "' where employeeleavereportId = '" + employeeleavereportId + "'";

                let [strupdateResult, _strupdateResult] = await dbSecurity.asyncResult(strupdate);

            }

            return {
                'flag': true,
                'query': "value updated!"
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbReportLeave: (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let SearchYear = request.body.SearchYear;

            let strqueryMaster = _clsemployerleavetype.data.select(" and employerId = " + employerId);
            let strquery = _clsemployeeleavereport.data.select_view_employeeleavereport(" and YEAR(startYear) = " + SearchYear + " and employerId = " + employerId + " order by memberName asc ");
            return {
                'flag': true,
                'query': strqueryMaster + ";" + strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbReportEmployeeDetail: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId || "";
            let SearchYear = request.body.SearchYear;

            strwhere += " and employerId = " + employerId;
            strwhere += " and YEAR(startYear) = " + SearchYear;
            if (employeeId != "")
                strwhere += " and employeeId = " + employeeId;
            strwhere += " order by memberName asc ";

            let strquery = _clsemployeeleavereport.data.select_EmployeeDetailReport(strwhere);
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

    dbReportCurrentYearSummary: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId || "";

            strwhere += " and employerId = " + employerId;
            if (employeeId != "")
                strwhere += " and employeeId = " + employeeId;
            strwhere += " order by memberName, employerleavetypeLeaveType asc ";

            let strquery = _clsemployeeleavereport.data.select_CurrentYearSummaryReport(strwhere);
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

    dbReportLeaveDetail: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId || "";
            let isCurrentYear = request.body.isCurrentYear;
            let reportYear = request.body.reportYear;

            strwhere += " and employerId = " + employerId;
            if (employeeId != "")
                strwhere += " and employeeId = " + employeeId;
            let strquery = '';
            if (isCurrentYear == true) {
                strwhere += " order by memberName, employerleavetypeLeaveType asc ";

                strquery = _clsemployeeleavereport.data.select_CurrentYearLeaveDetailReport(strwhere);
            } else {
                strwhere += " and YEAR(startYear) = " + reportYear;
                strwhere += " order by memberName ";

                strquery = _clsemployeeleavereport.data.select_LeaveDetailReport(strwhere);
            }
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

    dbLeaveCalculation: async (request, response) => {
        try {

            let result = [];
            let employerId = self.fetchEmployerId(request);
            let SearchYear = request.body.SearchYear;

            let _date = SearchYear + '-01-01 00:00:00'

            const startOfMonth = moment(_date).startOf('year').format('YYYY-MM-DD 00:00:00');
            const endOfMonth = moment(_date).endOf('year').format('YYYY-MM-DD 00:00:00');

            let strCalculateLeave = _classEmployeeLeaveEntitlement.data.select_LeavecalculationReport(employerId, startOfMonth, endOfMonth);
            let [strCalculateLeaveResult, _strCalculateLeaveResult] = await dbSecurity.asyncResult(strCalculateLeave);

            //. Leave type
            let strSelectLeaveType = _classEmployeeLeaveEntitlement.data.select_view_employeeleaveentitlement(" and employerId = " + employerId);
            let strSelectLeaveEntitlement = _classEmployeeLeaveEntitlement.data.select(" and employerId = " + employerId);
            let [strSelectLeaveTypeResult, _strSelectLeaveTypeResult] = await dbSecurity.asyncResult(strSelectLeaveType + ';' + strSelectLeaveEntitlement);

            let employerLeaveTypeData = strSelectLeaveTypeResult[0];
            let employeeLeaveEntitlementData = strSelectLeaveTypeResult[1];

            let _employerleavetypeIdList = [];
            if (employeeLeaveEntitlementData.length > 0) {
                for (let i = 0; i < employeeLeaveEntitlementData.length; i++) {
                    _employerleavetypeIdList.push(employeeLeaveEntitlementData[i].employerleavetypeId);
                }
            }

            let strSelectEmployerLeaveTypeEntitlement = _classemployerleavetypeentitlement.data.select(" and employerleavetypeId in (" + _employerleavetypeIdList.toString() + ")");
            let [strSelectEmployerLeaveTypeEntitlementResult, _strSelectEmployerLeaveTypeEntitlementResult] = await dbSecurity.asyncResult(strSelectEmployerLeaveTypeEntitlement);

            employerLeaveEntitlementData = strSelectEmployerLeaveTypeEntitlementResult;

            /* Calculation */
            if (strCalculateLeaveResult.length > 0) {
                for (let i = 0; i < strCalculateLeaveResult.length; i++) {

                    let _employeeId = strCalculateLeaveResult[i].employeeId;
                    let _memberName = strCalculateLeaveResult[i].memberName;
                    let _employerdepartmentTitle = strCalculateLeaveResult[i].employerdepartmentTitle;
                    let _memberNric = strCalculateLeaveResult[i].memberNric;
                    let _employeeJoining = moment(strCalculateLeaveResult[i].employeeJoining).format("DD/MM/YYYY");
                    let _employeesalarysetupCurrentBasic = strCalculateLeaveResult[i].employeesalarysetupCurrentBasicRound22;
                    let _memberPassport = strCalculateLeaveResult[i].memberPassport;
                    let _currentStartDate = strCalculateLeaveResult[i].currentStartDate;
                    let _currentEndDate = strCalculateLeaveResult[i].currentEndDate;
                    let _fromJoinDay = parseFloat(strCalculateLeaveResult[i].fromJoinDay);
                    let _priorJoinDay = parseFloat(strCalculateLeaveResult[i].priorJoinDay);
                    let _fromJoinDay1 = parseFloat(strCalculateLeaveResult[i].fromJoinDay1);
                    let _priorJoinDay1 = parseFloat(strCalculateLeaveResult[i].priorJoinDay1);
                    let _totalYear = strCalculateLeaveResult[i].totalYear;
                    let _matchYear = strCalculateLeaveResult[i].matchYear;

                    //. Leave Count
                    strwhere = "";
                    strwhere += " and employeeId = " + _employeeId;
                    strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') >= DATE_FORMAT('" + _currentStartDate + "', '%Y-%m')";
                    strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') <= DATE_FORMAT('" + _currentEndDate + "', '%Y-%m')";
                    strwhere += " GROUP BY employeeId, employerleavetypeId ";

                    let strSelectLeaveCount = _clsemployeeleaveapplication.data.total_view_employeeleaveapplicationReport(strwhere);
                    let [strSelectLeaveCountResult, _strSelectLeaveCountResult] = await dbSecurity.asyncResult(strSelectLeaveCount);

                    let filterEmployerLeaveTypeData = employerLeaveTypeData.filter(x => x.employeeId == _employeeId);

                    for (let j = 0; j < filterEmployerLeaveTypeData.length; j++) {

                        let employerleavetypeId = filterEmployerLeaveTypeData[j].employerleavetypeId;
                        let employerleavetypeLeaveType = filterEmployerLeaveTypeData[j].employerleavetypeLeaveType;
                        let employerleavetypeEntitlementRounding = filterEmployerLeaveTypeData[j].employerleavetypeEntitlementRounding;
                        let employerleavetypeOnProrateBasis = filterEmployerLeaveTypeData[j].employerleavetypeOnProrateBasis;

                        let _employeeLeaveEntitle = employeeLeaveEntitlementData.filter(x => x.employeeId == _employeeId && x.employerleavetypeId == employerleavetypeId);
                        let _employerLeaveEntitle = employerLeaveEntitlementData.filter(x => x.employerleavetypeId == employerleavetypeId);

                        let previousYearBnf = 0;
                        let employerleavetypeentitlementEntitleDay1 = 0;
                        let employerleavetypeentitlementEntitleDay2 = 0;
                        let totalEntitleDay = 0;

                        if (_employerLeaveEntitle.length > 0) {
                            let _roundTotalYear = Math.ceil(_totalYear);
                            let _roundPrevTotalYear = Math.ceil(_totalYear - 1);

                            let filterData1 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundTotalYear);
                            let filterData2 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundPrevTotalYear);
                            let lastFilterData1 = filterData1[filterData1.length - 1];
                            let lastFilterData2 = filterData2[filterData2.length - 1];

                            employerleavetypeentitlementEntitleDay1 = lastFilterData1.employerleavetypeentitlementEntitleDay;
                            employerleavetypeentitlementEntitleDay2 = lastFilterData2.employerleavetypeentitlementEntitleDay;
                        }

                        let _totalEntitleDay = 0;
                        if (_matchYear >= 11) {
                            _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
                        } else {
                            if (employerleavetypeOnProrateBasis == 0)
                                _totalEntitleDay = (_fromJoinDay * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay * employerleavetypeentitlementEntitleDay2);
                            else
                                _totalEntitleDay = (_fromJoinDay1 * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay1 * employerleavetypeentitlementEntitleDay2);
                        }

                        if (_employeeLeaveEntitle.length > 0)
                            previousYearBnf = _employeeLeaveEntitle[0].employeeleaveentitlementPreviousYearBnf;

                        totalEntitleDay = _totalEntitleDay;

                        let _totalEntitleDay1 = 0;
                        if (!Number.isInteger(totalEntitleDay)) {
                            _totalEntitleDay1 = Math.floor(totalEntitleDay);
                            if (employerleavetypeEntitlementRounding == 1)
                                _totalEntitleDay1 = _totalEntitleDay1 + 0.5;
                            if (employerleavetypeEntitlementRounding == 2)
                                _totalEntitleDay1 = _totalEntitleDay1;
                        } else
                            _totalEntitleDay1 = totalEntitleDay;



                        let _filterLeaveCount = strSelectLeaveCountResult.filter(x => x.employerleavetypeId == employerleavetypeId);

                        let totalLeave = 0;
                        if (_filterLeaveCount.length > 0)
                            totalLeave = _filterLeaveCount[0].cnt;

                        let totalLeaveBalance = (_totalEntitleDay1 - totalLeave) + previousYearBnf;

                        let dataValue = {
                            'employeeId': _employeeId,
                            'memberName': _memberName,
                            'employerdepartmentTitle': _employerdepartmentTitle,
                            'memberNric': _memberNric,
                            'memberPassport': _memberPassport,
                            'employeeJoining': _employeeJoining,
                            'employeesalarysetupCurrentBasic': _employeesalarysetupCurrentBasic,
                            'employerleavetypeLeaveType': employerleavetypeLeaveType,
                            'previousYearBnf': previousYearBnf,
                            'EntitleDay': _totalEntitleDay1,
                            'totalLeave': totalLeave,
                            'totalLeaveBalance': totalLeaveBalance,
                            'totalEntitleForYear': employerleavetypeentitlementEntitleDay1,
                            'currentStartYear': moment(_currentStartDate).format('YYYY-MM-DD'),
                            'currentEndYear': moment(_currentEndDate).format('YYYY-MM-DD')
                        };
                        result.push(dataValue);
                    }
                }
                return {
                    'flag': true,
                    'data': result
                };
            }

        } catch (error) {
            console.log(error);
        }
    },

    dbEmployeeLeaveCalculation: async (request, response) => {
        try {

            let result = [];
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;
            let SearchYear = request.body.SearchYear;

            let _date = SearchYear + '-01-01 00:00:00';

            const startOfMonth = moment(_date).startOf('year').format('YYYY-MM-DD 00:00:00');
            const endOfMonth = moment(_date).endOf('year').format('YYYY-MM-DD 00:00:00');

            let strCalculateLeave = _classEmployeeLeaveEntitlement.data.select_LeavecalculationEmployeeWiseReport(employeeId, employerId, startOfMonth, endOfMonth);
            let [strCalculateLeaveResult, _strCalculateLeaveResult] = await dbSecurity.asyncResult(strCalculateLeave);

            let strSelectLeaveType = _classEmployeeLeaveEntitlement.data.select_view_employeeleaveentitlement(" and employeeId = " + employeeId);
            let strSelectLeaveEntitlement = _classEmployeeLeaveEntitlement.data.select(" and employerId = " + employerId);
            let [strSelectLeaveTypeResult, _strSelectLeaveTypeResult] = await dbSecurity.asyncResult(strSelectLeaveType + ';' + strSelectLeaveEntitlement);

            let employerLeaveTypeData = strSelectLeaveTypeResult[0];
            let employeeLeaveEntitlementData = strSelectLeaveTypeResult[1];

            let _employerleavetypeIdList = [];
            if (employeeLeaveEntitlementData.length > 0) {
                for (let i = 0; i < employeeLeaveEntitlementData.length; i++) {
                    _employerleavetypeIdList.push(employeeLeaveEntitlementData[i].employerleavetypeId);
                }
            }

            let strSelectEmployerLeaveTypeEntitlement = _classemployerleavetypeentitlement.data.select(" and employerleavetypeId in (" + _employerleavetypeIdList.toString() + ")");
            let [strSelectEmployerLeaveTypeEntitlementResult, _strSelectEmployerLeaveTypeEntitlementResult] = await dbSecurity.asyncResult(strSelectEmployerLeaveTypeEntitlement);

            employerLeaveEntitlementData = strSelectEmployerLeaveTypeEntitlementResult;

            if (strCalculateLeaveResult.length > 0) {
                let _employeeId = strCalculateLeaveResult[0].employeeId;
                let _memberName = strCalculateLeaveResult[0].memberName;
                let _employerdepartmentTitle = strCalculateLeaveResult[0].employerdepartmentTitle;
                let _memberNric = strCalculateLeaveResult[0].memberNric;
                let _memberPassport = strCalculateLeaveResult[0].memberPassport;
                let _currentStartDate = strCalculateLeaveResult[0].currentStartDate;
                let _currentEndDate = strCalculateLeaveResult[0].currentEndDate;
                let _fromJoinDay = parseFloat(strCalculateLeaveResult[0].fromJoinDay);
                let _priorJoinDay = parseFloat(strCalculateLeaveResult[0].priorJoinDay);
                let _fromJoinDay1 = parseFloat(strCalculateLeaveResult[0].fromJoinDay1);
                let _priorJoinDay1 = parseFloat(strCalculateLeaveResult[0].priorJoinDay1);
                let _totalYear = strCalculateLeaveResult[0].totalYear;
                let _matchYear = strCalculateLeaveResult[0].matchYear;

                //. Leave Count
                strwhere = "";
                strwhere += " and employeeId = " + _employeeId;
                strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') >= DATE_FORMAT('" + _currentStartDate + "', '%Y-%m')";
                strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') <= DATE_FORMAT('" + _currentEndDate + "', '%Y-%m')";
                strwhere += " GROUP BY employeeId, employerleavetypeId ";

                let strSelectLeaveCount = _clsemployeeleaveapplication.data.total_view_employeeleaveapplicationReport(strwhere);
                let [strSelectLeaveCountResult, _strSelectLeaveCountResult] = await dbSecurity.asyncResult(strSelectLeaveCount);

                for (let j = 0; j < employerLeaveTypeData.length; j++) {

                    let employerleavetypeId = employerLeaveTypeData[j].employerleavetypeId;
                    let employerleavetypeLeaveType = employerLeaveTypeData[j].employerleavetypeLeaveType;
                    let employerleavetypeEntitlementRounding = employerLeaveTypeData[j].employerleavetypeEntitlementRounding;
                    let employerleavetypeOnProrateBasis = employerLeaveTypeData[j].employerleavetypeOnProrateBasis;

                    let _employeeLeaveEntitle = employeeLeaveEntitlementData.filter(x => x.employeeId == _employeeId && x.employerleavetypeId == employerleavetypeId);
                    let _employerLeaveEntitle = employerLeaveEntitlementData.filter(x => x.employerleavetypeId == employerleavetypeId);

                    let previousYearBnf = 0;
                    let employerleavetypeentitlementEntitleDay1 = 0;
                    let employerleavetypeentitlementEntitleDay2 = 0;
                    let totalEntitleDay = 0;

                    if (_employerLeaveEntitle.length > 0) {
                        let _roundTotalYear = Math.ceil(_totalYear);
                        let _roundPrevTotalYear = Math.ceil(_totalYear - 1);

                        let filterData1 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundTotalYear);
                        let filterData2 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundPrevTotalYear);
                        let lastFilterData1 = filterData1[filterData1.length - 1];
                        let lastFilterData2 = filterData2[filterData2.length - 1];

                        employerleavetypeentitlementEntitleDay1 = lastFilterData1.employerleavetypeentitlementEntitleDay;
                        employerleavetypeentitlementEntitleDay2 = lastFilterData2.employerleavetypeentitlementEntitleDay;
                    }

                    let _totalEntitleDay = 0;
                    if (_matchYear >= 11) {
                        _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
                    } else {
                        if (employerleavetypeOnProrateBasis == 0) {
                            _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
                        }
                        //_totalEntitleDay = (_fromJoinDay * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay * employerleavetypeentitlementEntitleDay2);
                        else
                            _totalEntitleDay = (_fromJoinDay1 * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay1 * employerleavetypeentitlementEntitleDay2);
                    }

                    if (_employeeLeaveEntitle.length > 0)
                        previousYearBnf = _employeeLeaveEntitle[0].employeeleaveentitlementPreviousYearBnf;

                    totalEntitleDay = _totalEntitleDay + previousYearBnf;

                    let _totalEntitleDay1 = 0;
                    if (!Number.isInteger(totalEntitleDay)) {
                        _totalEntitleDay1 = Math.floor(totalEntitleDay);
                        if (employerleavetypeEntitlementRounding == 1)
                            _totalEntitleDay1 = _totalEntitleDay1 + 0.5;
                        if (employerleavetypeEntitlementRounding == 2)
                            _totalEntitleDay1 = _totalEntitleDay1;
                    } else
                        _totalEntitleDay1 = totalEntitleDay;

                    let _filterLeaveCount = strSelectLeaveCountResult.filter(x => x.employerleavetypeId == employerleavetypeId);

                    let totalLeave = 0;
                    if (_filterLeaveCount.length > 0)
                        totalLeave = _filterLeaveCount[0].cnt;

                    let totalLeaveBalance = (_totalEntitleDay1 - totalLeave);

                    let dataValue = {
                        'employeeId': _employeeId,
                        'memberName': _memberName,
                        'employerdepartmentTitle': _employerdepartmentTitle,
                        'memberNric': _memberNric,
                        'memberPassport': _memberPassport,
                        'employerleavetypeLeaveType': employerleavetypeLeaveType,
                        'totalEntitleForYear': employerleavetypeentitlementEntitleDay1,
                        'EntitleDay': _totalEntitleDay1,
                        'previousYearBnf': previousYearBnf,
                        'totalLeave': totalLeave,
                        'totalLeaveBalance': totalLeaveBalance,
                        'currentStartYear': moment(_currentStartDate).format('YYYY-MM-DD'),
                        'currentEndYear': moment(_currentEndDate).format('YYYY-MM-DD')
                    };
                    result.push(dataValue);

                }

                return {
                    'flag': true,
                    'data': result
                };
            }


        } catch (error) {
            console.log(error);
        }
    },

    dbAutoCalculatePreviousYearBNF: async (request) => {
        try {

            let result = [];
            const startOfMonth = moment().startOf('year').format('YYYY-MM-DD 00:00:00');
            const endOfMonth = moment().endOf('year').format('YYYY-MM-DD 00:00:00');

            let strCalculateLeave = _classEmployeeLeaveEntitlement.data.select_LeavecalculationAllEmployee(startOfMonth, endOfMonth);
            let [strCalculateLeaveResult, _strCalculateLeaveResult] = await dbSecurity.asyncResult(strCalculateLeave);

            let strSelectLeaveType = _classEmployeeLeaveEntitlement.data.select_view_employeeleaveentitlement("");
            let strSelectEmployerLeaveTypeEntitlement = _classemployerleavetypeentitlement.data.select("");
            let [strSelectLeaveTypeResult, _strSelectLeaveTypeResult] = await dbSecurity.asyncResult(strSelectLeaveType + ";" + strSelectEmployerLeaveTypeEntitlement);

            let employeeLeaveTypeData = strSelectLeaveTypeResult[0];
            let employerLeaveTypeEntitlementData = strSelectLeaveTypeResult[1];

            if (strCalculateLeaveResult.length > 0) {
                for (let i = 0; i < strCalculateLeaveResult.length; i++) {

                    let _employeeId = strCalculateLeaveResult[i].employeeId;
                    let _employerId = strCalculateLeaveResult[i].employerId;
                    let _currentStartDate = strCalculateLeaveResult[i].currentStartDate;
                    let _currentEndDate = strCalculateLeaveResult[i].currentEndDate;
                    let _fromJoinDay = parseFloat(strCalculateLeaveResult[i].fromJoinDay);
                    let _priorJoinDay = parseFloat(strCalculateLeaveResult[i].priorJoinDay);
                    let _fromJoinDay1 = parseFloat(strCalculateLeaveResult[i].fromJoinDay1);
                    let _priorJoinDay1 = parseFloat(strCalculateLeaveResult[i].priorJoinDay1);
                    let _totalYear = strCalculateLeaveResult[i].totalYear;
                    let _matchYear = strCalculateLeaveResult[i].matchYear;

                    //. Leave Count
                    strwhere = "";
                    strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') >= DATE_FORMAT('" + _currentStartDate + "', '%Y-%m')";
                    strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') <= DATE_FORMAT('" + _currentEndDate + "', '%Y-%m')";
                    strwhere += " GROUP BY employeeId, employerleavetypeId ";

                    let strSelectLeaveCount = _clsemployeeleaveapplication.data.total_view_employeeleaveapplicationReport(strwhere);
                    let [strSelectLeaveCountResult, _strSelectLeaveCountResult] = await dbSecurity.asyncResult(strSelectLeaveCount);

                    let _filterEmployeeLeaveTypeData = employeeLeaveTypeData.filter(x => x.employeeId == _employeeId && x.employerId == _employerId);

                    for (let j = 0; j < _filterEmployeeLeaveTypeData.length; j++) {

                        let employerleavetypeId = _filterEmployeeLeaveTypeData[j].employerleavetypeId;
                        let employerleavetypeLeaveType = _filterEmployeeLeaveTypeData[j].employerleavetypeLeaveType;
                        let employerleavetypeEntitlementRounding = _filterEmployeeLeaveTypeData[j].employerleavetypeEntitlementRounding;
                        let employerleavetypeOnProrateBasis = _filterEmployeeLeaveTypeData[j].employerleavetypeOnProrateBasis;

                        let _employeeLeaveEntitle = employerLeaveTypeEntitlementData.filter(x => x.employeeId == _employeeId && x.employerleavetypeId == employerleavetypeId);
                        let _employerLeaveEntitle = employerLeaveTypeEntitlementData.filter(x => x.employerleavetypeId == employerleavetypeId);

                        let previousYearBnf = 0;
                        let employerleavetypeentitlementEntitleDay1 = 0;
                        let employerleavetypeentitlementEntitleDay2 = 0;
                        let employerleavetypeentitlementMaxBnf = 0;
                        let totalEntitleDay = 0;

                        if (_employerLeaveEntitle.length > 0) {
                            let _roundTotalYear = Math.ceil(_totalYear);
                            let _roundPrevTotalYear = Math.ceil(_totalYear - 1);

                            let filterData1 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundTotalYear);
                            let filterData2 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundPrevTotalYear);
                            let lastFilterData1 = filterData1[filterData1.length - 1];
                            let lastFilterData2 = filterData2[filterData2.length - 1];

                            employerleavetypeentitlementEntitleDay1 = lastFilterData1.employerleavetypeentitlementEntitleDay;
                            employerleavetypeentitlementEntitleDay2 = lastFilterData2.employerleavetypeentitlementEntitleDay;
                            employerleavetypeentitlementMaxBnf = lastFilterData1.employerleavetypeentitlementMaxBnf;
                        }

                        let _totalEntitleDay = 0;
                        if (_matchYear >= 11) {
                            _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
                        } else {
                            if (employerleavetypeOnProrateBasis == 0) {
                                _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
                            }
                            // _totalEntitleDay = (_fromJoinDay * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay * employerleavetypeentitlementEntitleDay2);
                            else
                                _totalEntitleDay = (_fromJoinDay1 * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay1 * employerleavetypeentitlementEntitleDay2);

                            if (_employeeLeaveEntitle.length > 0)
                                previousYearBnf = _employeeLeaveEntitle[0].employeeleaveentitlementPreviousYearBnf;
                        }
                        totalEntitleDay = _totalEntitleDay + previousYearBnf;

                        let _totalEntitleDay1 = 0;
                        if (!Number.isInteger(totalEntitleDay)) {
                            _totalEntitleDay1 = Math.floor(totalEntitleDay);
                            if (employerleavetypeEntitlementRounding == 1)
                                _totalEntitleDay1 = _totalEntitleDay1 + 0.5;
                            if (employerleavetypeEntitlementRounding == 2)
                                _totalEntitleDay1 = _totalEntitleDay1;
                        } else
                            _totalEntitleDay1 = totalEntitleDay;

                        let _filterLeaveCount = strSelectLeaveCountResult.filter(x => x.employerleavetypeId == employerleavetypeId);

                        let totalLeave = 0;
                        if (_filterLeaveCount.length > 0)
                            totalLeave = _filterLeaveCount[0].cnt;

                        let totalLeaveBalance = (_totalEntitleDay1 - totalLeave);

                        let finalPrevYearBNF = 0;
                        if (employerleavetypeentitlementMaxBnf == 0) {
                            finalPrevYearBNF = 0;
                        }
                        if (employerleavetypeentitlementMaxBnf < totalLeaveBalance) {
                            finalPrevYearBNF = employerleavetypeentitlementMaxBnf;
                        }
                        if (employerleavetypeentitlementMaxBnf > totalLeaveBalance)
                            finalPrevYearBNF = totalLeaveBalance;

                        let dataValue = {
                            'employeeId': _employeeId,
                            'employerleavetypeId': employerleavetypeId,
                            'previousYearBnf': finalPrevYearBNF
                        };

                        result.push(dataValue);

                    }
                }
            }

            if (result.length > 0) {
                let strWhere = "";
                for (let i = 0; i < result.length; i++) {
                    if (i != 0)
                        strWhere += ";";

                    strWhere += " UPDATE tblemployeeleaveentitlement SET employeeleaveentitlementPreviousYearBnf = " + result[i].previousYearBnf +
                        " WHERE 1=1 AND employeeId = " + result[i].employeeId + " AND employerleavetypeId = " + result[i].employerleavetypeId;
                }

                let [strWhereResult, _strWhereResult] = await dbSecurity.asyncResult(strWhere);
            }

        } catch (error) {

        }
    }
};