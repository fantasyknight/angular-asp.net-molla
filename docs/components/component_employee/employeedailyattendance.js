const moment = require("moment");
/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeedailyattendance = require("../../modules/model_employee/clsemployeedailyattendance");
const _clsemployeeleaveapplication = require("../../modules/model_employee/clsemployeeleaveapplication");

const _clsemployermastershift = require("../../modules/model_employer/clsemployermastershift");
const _clsemployerholiday = require("../../modules/model_employer/clsemployerholiday");
const _clsemployerotsetup = require("../../modules/model_employer/clsemployerotsetup");
const _clsemployeradditionalpaysetup = require("../../modules/model_employer/clsemployeradditionalpaysetup");
const _clsemployershiftsetup = require("../../modules/model_employer/clsemployershiftsetup");

let self = module.exports = {

    dbIsOffDay: (strSelectShiftMasterResult, employerMasterShiftId, convertDate) => {

        let mondayType = '';
        let tuesdayType = '';
        let wednesdayType = '';
        let thursdayType = '';
        let fridayType = '';
        let saturdayType = '';
        let sundayType = '';

        let filterShiftMaster = strSelectShiftMasterResult.filter(x => x.employerMasterShiftId == employerMasterShiftId);
        if (filterShiftMaster.length > 0) {
            mondayType = filterShiftMaster[0].mondayType;
            tuesdayType = filterShiftMaster[0].tuesdayType;
            wednesdayType = filterShiftMaster[0].wednesdayType;
            thursdayType = filterShiftMaster[0].thursdayType;
            fridayType = filterShiftMaster[0].fridayType;
            saturdayType = filterShiftMaster[0].saturdayType;
            sundayType = filterShiftMaster[0].sundayType;
        }

        let isOffDay = false;
        if (convertDate == 'Monday')
            if (mondayType == 'off')
                isOffDay = true;
        if (convertDate == 'Tuesday')
            if (tuesdayType == 'off')
                isOffDay = true;
        if (convertDate == 'Wednesday')
            if (wednesdayType == 'off')
                isOffDay = true;
        if (convertDate == 'Thursday')
            if (thursdayType == 'off')
                isOffDay = true;
        if (convertDate == 'Friday')
            if (fridayType == 'off')
                isOffDay = true;
        if (convertDate == 'Saturday')
            if (saturdayType == 'off')
                isOffDay = true;
        if (convertDate == 'Sunday')
            if (sundayType == 'off')
                isOffDay = true;

        return isOffDay;
    },

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

            let strquery = _clsemployeedailyattendance.data.select(strwhere);
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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeDailyAttendanceId = request.body.employeeDailyAttendanceId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeDailyAttendanceId = " + employeeDailyAttendanceId;

            let strquery = _clsemployeedailyattendance.data.select(strwhere);
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

            let SearchEmployeeId = request.body.SearchEmployeeId;
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId;
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId;
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || 0;
            let SearchFromDate = request.body.SearchFromDate;
            let SearchToDate = request.body.SearchToDate;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            let employerId = self.fetchEmployerId(request);

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployeeId != 0)
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";

            if (SearchEmployerbranchId != 0)
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";

            if (SearchEmployerdepartmentId != 0)
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";

            if (SearchEmployerMasterShiftId != 0)
                strwhere += " and employerMasterShiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " and employerId = " + employerId;
            strwhere += " and DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT(entryDate, '" + SearchFromDate + "') ";
            strwhere += " and DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT(entryDate, '" + SearchToDate + "') ";
            strwhere += " order by entryDate, _actInTime asc";

            let strquery = _clsemployeedailyattendance.data.select_view_employeedailyattendance(strwhere + strlimit);
            let strcount = _clsemployeedailyattendance.data.getcount_view_employeedailyattendance(strwhere);

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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let employeeDailyAttendanceId = request.body.employeeDailyAttendanceId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeDailyAttendanceId = " + employeeDailyAttendanceId;

            let strquery = _clsemployeedailyattendance.data.deleteString(strwhere);

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

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeedailyattendance.data.masterData(request);
            let strquery = _clsemployeedailyattendance.data.insert(verb);

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

    dbUpdate: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployeedailyattendance.data.masterData(request);
            let strquery = _clsemployeedailyattendance.data.update(verb);

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

    dbReportAttendance: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            if (sortBy == 'memberName')
                strwhere += " order by memberName, entryDate, _actInTime";
            if (sortBy == 'employeeEnroll')
                strwhere += " order by employeeEnroll, entryDate, _actInTime";
            if (sortBy == 'employerdepartmentTitle')
                strwhere += " order by employerdepartmentTitle, memberName, entryDate, _actInTime";
            if (sortBy == 'employerbranchName')
                strwhere += " order by employerbranchName, memberName, entryDate, _actInTime";

            let strquery = _clsemployeedailyattendance.data.select_ReportAttendance(strwhere);
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

    dbReportStartEnd1: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strquery = _clsemployeedailyattendance.data.select_ReportAttendance(strwhere);
            let [strSelectStartEnd1Result, _strSelectStartEnd1Result] = await dbSecurity.asyncResult(strquery);

            if (strSelectStartEnd1Result.length > 0) {

                /* leave application data */
                let strWhereLeaveApplication = '';
                strWhereLeaveApplication += " and employerId = " + employerId;
                strWhereLeaveApplication += " AND (DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') = DATE_FORMAT('" + SearchFromDate + "','%Y-%m') OR DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') = DATE_FORMAT('" + SearchToDate + "','%Y-%m')) ";
                let strLeaveApplication = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strWhereLeaveApplication);
                /* shift data */
                let strSelectShiftMaster = _clsemployermastershift.data.select(" and employerId = " + employerId);
                /* holiday data */
                let strWhereHoliday = '';
                strWhereHoliday += " and employerId = " + employerId;
                strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
                strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";
                let strSelectHolidayMaster = _clsemployerholiday.data.select(strWhereHoliday);

                let [strLeaveApplicationShiftResult, _strLeaveApplicationResult] = await dbSecurity.asyncResult(strLeaveApplication + ";" + strSelectShiftMaster + ";" + strSelectHolidayMaster);
                let strLeaveApplicationResult = strLeaveApplicationShiftResult[0];
                let strSelectShiftMasterResult = strLeaveApplicationShiftResult[1];
                let strSelectHolidayResult = strLeaveApplicationShiftResult[2];

                let manageLeaveApplication = [];
                if (strLeaveApplicationResult.length > 0) {
                    for (let d = 0; d < strLeaveApplicationResult.length; d++) {
                        let leaveFromDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveFrom);
                        let leaveToDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveTo);
                        let leaveEmployeeId = strLeaveApplicationResult[d].employeeId;
                        let leaveCode = strLeaveApplicationResult[d].employerleavetypeLeaveCode;
                        for (var day = leaveFromDate; day <= leaveToDate; day.setDate(day.getDate() + 1)) {
                            manageLeaveApplication.push({
                                employeeId: leaveEmployeeId,
                                leaveDate: moment(day).format("DD-MM-YYYY"),
                                leaveCode: leaveCode
                            });
                        }
                    }
                }

                let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                const unique = [...new Set(strSelectStartEnd1Result.map(item => item.employeeId))];
                let startEnd1 = [];

                for (let i = 0; i < unique.length; i++) {
                    startEnd1.push({});
                    let filterOverTimeData = strSelectStartEnd1Result.filter(x => x.employeeId == unique[i]);

                    startEnd1[i].Name = filterOverTimeData[0].memberName;
                    startEnd1[i].Branch = filterOverTimeData[0].employerbranchName;
                    startEnd1[i].Department = filterOverTimeData[0].employerdepartmentTitle;
                    startEnd1[i].shiftName = filterOverTimeData[0].shiftName;
                    startEnd1[i].data = [];

                    for (let j = 0; j < totalDay; j++) {
                        startEnd1[i].data.push({});
                        let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                        startEnd1[i].data[j].Date = _date;
                        let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                        startEnd1[i].data[j].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                        let isOffDay = self.dbIsOffDay(strSelectShiftMasterResult, filterOverTimeData[0].employermastershiftid, convertDate);

                        let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == startEnd1[i].data[j].Date);
                        if (filterLeave.length > 0)
                            startEnd1[i].data[j].AppliedLeave = filterLeave[0].leaveCode;
                        else
                            startEnd1[i].data[j].AppliedLeave = '-';

                        let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateDDMMYYYY == startEnd1[i].data[j].Date);
                        if (filterHoliday.length > 0)
                            startEnd1[i].data[j].HolidayStatus = 'Yes';
                        else
                            startEnd1[i].data[j].HolidayStatus = '-';

                        let filterStartEnd1DataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == startEnd1[i].data[j].Date);

                        startEnd1[i].data[j].InTime = '-';
                        startEnd1[i].data[j].BreakOut1 = '-';
                        startEnd1[i].data[j].BreakIn1 = '-';
                        startEnd1[i].data[j].LunchOut = '-';
                        startEnd1[i].data[j].LunchIn = '-';
                        startEnd1[i].data[j].BreakOut2 = '-';
                        startEnd1[i].data[j].BreakIn2 = '-';
                        startEnd1[i].data[j].TimeOut = '-';
                        startEnd1[i].data[j].HourWorked = '-';
                        startEnd1[i].data[j].HourWorkedUnit = '-';
                        startEnd1[i].data[j].OvertimeHour = '-';
                        startEnd1[i].data[j].OvertimeHourUnit = '-';
                        startEnd1[i].data[j].finalOverTimeEarly = '-';
                        startEnd1[i].data[j].OvertimeFinalHour = '-';
                        startEnd1[i].data[j].OvertimeFinalHourUnit = '-';
                        startEnd1[i].data[j].Late = '-';
                        startEnd1[i].data[j].EarlyIn = '-';
                        startEnd1[i].data[j].EarlyLeave = '-';
                        startEnd1[i].data[j].Absent = '-';

                        if (filterStartEnd1DataWithValue.length > 0) {
                            startEnd1[i].data[j].InTime = filterStartEnd1DataWithValue[0].actInTime == null ? '-' : moment(filterStartEnd1DataWithValue[0].actInTime).format("HH:mm");

                            startEnd1[i].data[j].BreakOut1 = filterStartEnd1DataWithValue[0].actBreakInTime1 == null ? '-' : moment(filterStartEnd1DataWithValue[0].actBreakInTime1).format("HH:mm");
                            startEnd1[i].data[j].BreakIn1 = filterStartEnd1DataWithValue[0].actBreakOutTime1 == null ? '-' : moment(filterStartEnd1DataWithValue[0].actBreakOutTime1).format("HH:mm");
                            startEnd1[i].data[j].LunchOut = filterStartEnd1DataWithValue[0].actLunchInTime == null ? '-' : moment(filterStartEnd1DataWithValue[0].actLunchInTime).format("HH:mm");
                            startEnd1[i].data[j].LunchIn = filterStartEnd1DataWithValue[0].actLunchOutTime == null ? '-' : moment(filterStartEnd1DataWithValue[0].actLunchOutTime).format("HH:mm");
                            startEnd1[i].data[j].BreakOut2 = filterStartEnd1DataWithValue[0].actBreakInTime2 == null ? '-' : moment(filterStartEnd1DataWithValue[0].actBreakInTime2).format("HH:mm");
                            startEnd1[i].data[j].BreakIn2 = filterStartEnd1DataWithValue[0].actBreakOutTime2 == null ? '-' : moment(filterStartEnd1DataWithValue[0].actBreakOutTime2).format("HH:mm");
                            startEnd1[i].data[j].finalOverTimeEarly = filterStartEnd1DataWithValue[0].finalOverTimeEarly;

                            if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                startEnd1[i].data[j].TimeOut = moment(filterStartEnd1DataWithValue[0].actOutTime).format("HH:mm");
                            else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                startEnd1[i].data[j].TimeOut = moment(filterStartEnd1DataWithValue[0].actOutTime_Full).format("HH:mm");
                            else
                                startEnd1[i].data[j].TimeOut = '-';

                            if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                startEnd1[i].data[j].HourWorked = filterStartEnd1DataWithValue[0].workingHour;
                            else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                startEnd1[i].data[j].HourWorked = filterStartEnd1DataWithValue[0].workingHour_Full;
                            else
                                startEnd1[i].data[j].HourWorked = '-';
                            /* Unit */
                            if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                startEnd1[i].data[j].HourWorkedUnit = filterStartEnd1DataWithValue[0].workingHour_Unit;
                            else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                startEnd1[i].data[j].HourWorkedUnit = filterStartEnd1DataWithValue[0].workingHour_Full_Unit;
                            else
                                startEnd1[i].data[j].HourWorkedUnit = '-';

                            if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                startEnd1[i].data[j].OvertimeHour = filterStartEnd1DataWithValue[0].finalOverTime;
                            else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                startEnd1[i].data[j].OvertimeHour = filterStartEnd1DataWithValue[0].finalOverTime_Full;
                            else
                                startEnd1[i].data[j].OvertimeHour = '-';
                            /* overtime */
                            if (filterStartEnd1DataWithValue[0].actOutTime != null) {
                                startEnd1[i].data[j].OvertimeFinalHour = filterStartEnd1DataWithValue[0].finalOverTime_With_Early;
                                startEnd1[i].data[j].OvertimeFinalHourUnit = filterStartEnd1DataWithValue[0].finalOverTime_Unit_2;
                            } else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null) {
                                startEnd1[i].data[j].OvertimeFinalHour = filterStartEnd1DataWithValue[0].finalOverTime_Full_With_Early;
                                startEnd1[i].data[j].OvertimeFinalHourUnit = filterStartEnd1DataWithValue[0].finalOverTime_Full_Unit_2;
                            } else {
                                startEnd1[i].data[j].OvertimeFinalHour = '-';
                                startEnd1[i].data[j].OvertimeFinalHourUnit = "0";
                            }
                            /* Unit */
                            if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                startEnd1[i].data[j].OvertimeHourUnit = filterStartEnd1DataWithValue[0].finalOverTime_Unit;
                            else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                startEnd1[i].data[j].OvertimeHourUnit = filterStartEnd1DataWithValue[0].finalOverTime_Full_Unit;
                            else
                                startEnd1[i].data[j].OvertimeHourUnit = '-';

                            startEnd1[i].data[j].Late = filterStartEnd1DataWithValue[0].lateIn;
                            let lateSec = moment.duration(startEnd1[i].data[j].Late).asSeconds();
                            if (lateSec < 0) {
                                startEnd1[i].data[j].Late = '-';
                            }

                            if (startEnd1[i].data[j].Late == '00:00')
                                startEnd1[i].data[j].Late = '-';


                            /*  */
                            startEnd1[i].data[j].EarlyIn = filterStartEnd1DataWithValue[0].EarlyIn;
                            let EarlyInSec = moment.duration(startEnd1[i].data[j].EarlyIn).asSeconds();
                            if (EarlyInSec < 0) {
                                startEnd1[i].data[j].EarlyIn = '-';
                            }

                            if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                startEnd1[i].data[j].EarlyLeave = filterStartEnd1DataWithValue[0].earlyOutTime;
                            else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                startEnd1[i].data[j].EarlyLeave = filterStartEnd1DataWithValue[0].earlyOutTime_Full;
                            else
                                startEnd1[i].data[j].EarlyLeave = '-';

                            let sec = moment.duration(startEnd1[i].data[j].EarlyLeave).asSeconds();
                            if (sec < 0) {
                                startEnd1[i].data[j].EarlyLeave = '-';
                            }

                            if (startEnd1[i].data[j].EarlyLeave == '00:00')
                                startEnd1[i].data[j].EarlyLeave = '-';

                        }

                        // if (isOffDay == false &&
                        //     startEnd1[i].data[j].HolidayStatus == '-' &&
                        //     startEnd1[i].data[j].AppliedLeave == '-' &&
                        //     filterStartEnd1DataWithValue.length == 0) {
                        //     startEnd1[i].data[j].Absent = 'A';
                        // }

                        if (isOffDay == false &&
                            startEnd1[i].data[j].HolidayStatus == '-' &&
                            startEnd1[i].data[j].AppliedLeave == '-' &&
                            startEnd1[i].data[j].InTime == '-' &&
                            startEnd1[i].data[j].TimeOut == '-')
                            startEnd1[i].data[j].Absent = 'A';

                        if (isOffDay == true)
                            startEnd1[i].data[j].Absent = 'O';
                    }
                }
                return {
                    'flag': true,
                    'data': startEnd1
                };
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportStartEnd3: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strSelectOvertimeSetup = _clsemployerotsetup.data.select(" and employerId = " + employerId);
            let [strSelectOvertimeSetupResult, _strSelectOvertimeSetupResult] = await dbSecurity.asyncResult(strSelectOvertimeSetup);

            if (strSelectOvertimeSetupResult.length > 0) {
                let strquery = _clsemployeedailyattendance.data.select_ReportAttendanceWithOT(strwhere);
                let [strSelectOvertimeDataResult, _strSelectOvertimeDataResult] = await dbSecurity.asyncResult(strquery);

                let overTime = [];
                if (strSelectOvertimeDataResult.length > 0) {

                    /* leave application data */
                    let strWhereLeaveApplication = '';
                    strWhereLeaveApplication += " and employerId = " + employerId;
                    strWhereLeaveApplication += " AND (DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') = DATE_FORMAT('" + SearchFromDate + "','%Y-%m') OR DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') = DATE_FORMAT('" + SearchToDate + "','%Y-%m')) ";
                    let strLeaveApplication = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strWhereLeaveApplication);
                    /* shift data */
                    let strSelectShiftMaster = _clsemployermastershift.data.select(" and employerId = " + employerId);
                    /* holiday data */
                    let strWhereHoliday = '';
                    strWhereHoliday += " and employerId = " + employerId;
                    strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
                    strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";
                    let strSelectHolidayMaster = _clsemployerholiday.data.select(strWhereHoliday);

                    let [strLeaveApplicationShiftResult, _strLeaveApplicationResult] = await dbSecurity.asyncResult(strLeaveApplication + ";" + strSelectShiftMaster + ";" + strSelectHolidayMaster);
                    let strLeaveApplicationResult = strLeaveApplicationShiftResult[0];
                    let strSelectShiftMasterResult = strLeaveApplicationShiftResult[1];
                    let strSelectHolidayResult = strLeaveApplicationShiftResult[2];

                    let manageLeaveApplication = [];
                    if (strLeaveApplicationResult.length > 0) {
                        for (let d = 0; d < strLeaveApplicationResult.length; d++) {
                            let leaveFromDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveFrom);
                            let leaveToDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveTo);
                            let leaveEmployeeId = strLeaveApplicationResult[d].employeeId;
                            let leaveCode = strLeaveApplicationResult[d].employerleavetypeLeaveCode;
                            for (var day = leaveFromDate; day <= leaveToDate; day.setDate(day.getDate() + 1)) {
                                manageLeaveApplication.push({
                                    employeeId: leaveEmployeeId,
                                    leaveDate: moment(day).format("DD-MM-YYYY"),
                                    leaveCode: leaveCode
                                });
                            }
                        }
                    }

                    let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                    const unique = [...new Set(strSelectOvertimeDataResult.map(item => item.employeeId))];
                    for (let i = 0; i < unique.length; i++) {
                        overTime.push({});
                        let filterOverTimeData = strSelectOvertimeDataResult.filter(x => x.employeeId == unique[i]);
                        overTime[i].Name = filterOverTimeData[0].memberName;
                        overTime[i].Branch = filterOverTimeData[0].employerbranchName;
                        overTime[i].Department = filterOverTimeData[0].employerdepartmentTitle;
                        overTime[i].shiftName = filterOverTimeData[0].shiftName;
                        overTime[i].employerotsetupId = filterOverTimeData[0].employerotsetupId;
                        let _dayType = filterOverTimeData[0].dayType;
                        overTime[i].data = [];

                        for (let j = 0; j < totalDay; j++) {
                            overTime[i].data.push({});
                            let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                            overTime[i].data[j].Date = _date;
                            let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                            overTime[i].data[j].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                            let isOffDay = self.dbIsOffDay(strSelectShiftMasterResult, filterOverTimeData[0].employermastershiftid, convertDate);

                            let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == overTime[i].data[j].Date);
                            if (filterLeave.length > 0)
                                overTime[i].data[j].AppliedLeave = filterLeave[0].leaveCode;
                            else
                                overTime[i].data[j].AppliedLeave = '-';

                            let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateDDMMYYYY == overTime[i].data[j].Date);
                            if (filterHoliday.length > 0)
                                overTime[i].data[j].HolidayStatus = 'Yes';
                            else
                                overTime[i].data[j].HolidayStatus = '-';

                            for (let k = 0; k < strSelectOvertimeSetupResult.length; k++) {
                                let unit = 0;
                                let _employerotsetupDescription = strSelectOvertimeSetupResult[k].employerotsetupDescription;
                                let employerotsetupOTCode = strSelectOvertimeSetupResult[k].employerotsetupOTCode;
                                let employerotsetupOTRate = strSelectOvertimeSetupResult[k].employerotsetupRate;
                                let employerotsetupId = strSelectOvertimeSetupResult[k].employerotsetupId;

                                if (overTime[i].employerotsetupId == 0) {
                                    let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == employerotsetupId && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                    if (filterOverTimeDataWithValue.length == 0) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == 0 && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (_employerotsetupDescription == 'Normal OT' && isOffDay != true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else
                                                    unit = 0;
                                            }

                                            if (_employerotsetupDescription == 'Off Day OT' && isOffDay == true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else
                                                    unit = 0;
                                            }
                                        }
                                    }

                                    if (filterOverTimeDataWithValue.length > 0) {
                                        if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                            unit = 0;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                        else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                        else
                                            unit = 0;
                                    }

                                    if (unit == null)
                                        unit = 0;

                                    overTime[i].data[j]["'" + employerotsetupOTCode + "'"] = unit;
                                } else {
                                    overTime[i].data[j]["'" + employerotsetupOTCode + "'"] = 0;
                                    if (overTime[i].employerotsetupId == employerotsetupId) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                unit = 0;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                            else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                            else
                                                unit = 0;

                                            overTime[i].data[j]["'" + employerotsetupOTCode + "'"] = unit;
                                        }
                                    }
                                }
                                overTime[i].data[j]["'" + employerotsetupOTCode + "_Rate'"] = employerotsetupOTRate;
                            }

                            let _filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);

                            overTime[i].data[j].InTime = '-';
                            overTime[i].data[j].BreakOut1 = '-';
                            overTime[i].data[j].BreakIn1 = '-';
                            overTime[i].data[j].LunchOut = '-';
                            overTime[i].data[j].LunchIn = '-';
                            overTime[i].data[j].BreakOut2 = '-';
                            overTime[i].data[j].BreakIn2 = '-';
                            overTime[i].data[j].TimeOut = '-';
                            overTime[i].data[j].HourWorked = '-';
                            overTime[i].data[j].HourWorkedUnit = '-';
                            overTime[i].data[j].OvertimeHour = '-';
                            overTime[i].data[j].OvertimeHourUnit = '-';
                            overTime[i].data[j].finalOverTimeEarly = '-';
                            overTime[i].data[j].finalOverTimeEarlyUnit = '-';
                            overTime[i].data[j].OvertimeFinalHour = '-';
                            overTime[i].data[j].OvertimeFinalHourUnit = '-';
                            overTime[i].data[j].Late = '-';
                            overTime[i].data[j].EarlyIn = '-';
                            overTime[i].data[j].EarlyLeave = '-';
                            overTime[i].data[j].Absent = '-';

                            if (_filterOverTimeDataWithValue.length > 0) {

                                overTime[i].data[j].InTime = _filterOverTimeDataWithValue[0].actInTime == null ? '-' : moment(_filterOverTimeDataWithValue[0].actInTime).format("HH:mm");
                                overTime[i].data[j].BreakOut1 = _filterOverTimeDataWithValue[0].actBreakInTime1 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakInTime1).format("HH:mm");
                                overTime[i].data[j].BreakIn1 = _filterOverTimeDataWithValue[0].actBreakOutTime1 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakOutTime1).format("HH:mm");
                                overTime[i].data[j].LunchOut = _filterOverTimeDataWithValue[0].actLunchInTime == null ? '-' : moment(_filterOverTimeDataWithValue[0].actLunchInTime).format("HH:mm");
                                overTime[i].data[j].LunchIn = _filterOverTimeDataWithValue[0].actLunchOutTime == null ? '-' : moment(_filterOverTimeDataWithValue[0].actLunchOutTime).format("HH:mm");
                                overTime[i].data[j].BreakOut2 = _filterOverTimeDataWithValue[0].actBreakInTime2 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakInTime2).format("HH:mm");
                                overTime[i].data[j].BreakIn2 = _filterOverTimeDataWithValue[0].actBreakOutTime2 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakOutTime2).format("HH:mm");
                                overTime[i].data[j].finalOverTimeEarly = _filterOverTimeDataWithValue[0].finalOverTimeEarly;
                                overTime[i].data[j].finalOverTimeEarlyUnit = _filterOverTimeDataWithValue[0].finalOverTimeEarlyUnit;

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].TimeOut = moment(_filterOverTimeDataWithValue[0].actOutTime).format("HH:mm");
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].TimeOut = moment(_filterOverTimeDataWithValue[0].actOutTime_Full).format("HH:mm");
                                else
                                    overTime[i].data[j].TimeOut = '-';

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].HourWorked = _filterOverTimeDataWithValue[0].workingHour;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].HourWorked = _filterOverTimeDataWithValue[0].workingHour_Full;
                                else
                                    overTime[i].data[j].HourWorked = '-';
                                /* Unit */
                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].HourWorkedUnit = _filterOverTimeDataWithValue[0].workingHour_Unit;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].HourWorkedUnit = _filterOverTimeDataWithValue[0].workingHour_Full_Unit;
                                else
                                    overTime[i].data[j].HourWorkedUnit = '-';

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].OvertimeHour = _filterOverTimeDataWithValue[0].finalOverTime;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].OvertimeHour = _filterOverTimeDataWithValue[0].finalOverTime_Full;
                                else
                                    overTime[i].data[j].OvertimeHour = '-';
                                /* overtime */
                                if (_filterOverTimeDataWithValue[0].actOutTime != null) {
                                    overTime[i].data[j].OvertimeFinalHour = _filterOverTimeDataWithValue[0].finalOverTime_With_Early;
                                    overTime[i].data[j].OvertimeFinalHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                } else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null) {
                                    overTime[i].data[j].OvertimeFinalHour = _filterOverTimeDataWithValue[0].finalOverTime_Full_With_Early;
                                    overTime[i].data[j].OvertimeFinalHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                }
                                else if (_filterOverTimeDataWithValue[0].finalOverTimeEarly != null) {
                                    overTime[i].data[j].OvertimeFinalHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                }
                                else {
                                    overTime[i].data[j].OvertimeFinalHour = '-';
                                    overTime[i].data[j].OvertimeFinalHourUnit = '-';
                                }
                                /* Unit */
                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].OvertimeHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Unit_1;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].OvertimeHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_1;
                                else
                                    overTime[i].data[j].OvertimeHourUnit = '-';

                                overTime[i].data[j].Late = _filterOverTimeDataWithValue[0].lateIn;
                                let lateSec = moment.duration(overTime[i].data[j].Late).asSeconds();
                                if (lateSec < 0) {
                                    overTime[i].data[j].Late = '-';
                                }

                                if (overTime[i].data[j].Late == '00:00')
                                    overTime[i].data[j].Late = '-';

                                /* */
                                overTime[i].data[j].EarlyIn = _filterOverTimeDataWithValue[0].EarlyIn;
                                let EarlyInSec = moment.duration(overTime[i].data[j].EarlyIn).asSeconds();
                                if (EarlyInSec < 0) {
                                    overTime[i].data[j].EarlyIn = '-';
                                }

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].EarlyLeave = _filterOverTimeDataWithValue[0].earlyOutTime;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].EarlyLeave = _filterOverTimeDataWithValue[0].earlyOutTime_Full;
                                else
                                    overTime[i].data[j].EarlyLeave = '-';

                                let sec = moment.duration(overTime[i].data[j].EarlyLeave).asSeconds();
                                if (sec < 0) {
                                    overTime[i].data[j].EarlyLeave = '-';
                                }

                                if (overTime[i].data[j].EarlyLeave == '00:00')
                                    overTime[i].data[j].EarlyLeave = '-';
                            }

                            if (isOffDay == false &&
                                overTime[i].data[j].HolidayStatus == '-' &&
                                overTime[i].data[j].AppliedLeave == '-' &&
                                overTime[i].data[j].InTime == '-' &&
                                overTime[i].data[j].TimeOut == '-')
                                overTime[i].data[j].Absent = 'A';

                            if (isOffDay == true)
                                overTime[i].data[j].Absent = 'O';

                        }
                    }
                    return {
                        'flag': true,
                        'data': overTime
                    };
                } else {
                    return {
                        'flag': false,
                        'data': []
                    };
                }
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }
        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportStartEnd4: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strquery = _clsemployeedailyattendance.data.select_ReportAttendance(strwhere);
            let [strSelectStartEnd1Result, _strSelectStartEnd1Result] = await dbSecurity.asyncResult(strquery);

            if (strSelectStartEnd1Result.length > 0) {

                /* leave application data */
                let strWhereLeaveApplication = '';
                strWhereLeaveApplication += " and employerId = " + employerId;
                strWhereLeaveApplication += " AND (DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') = DATE_FORMAT('" + SearchFromDate + "','%Y-%m') OR DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') = DATE_FORMAT('" + SearchToDate + "','%Y-%m')) ";
                let strLeaveApplication = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strWhereLeaveApplication);
                /* shift data */
                let strSelectShiftMaster = _clsemployermastershift.data.select(" and employerId = " + employerId);
                /* holiday data */
                let strWhereHoliday = '';
                strWhereHoliday += " and employerId = " + employerId;
                strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
                strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";
                let strSelectHolidayMaster = _clsemployerholiday.data.select(strWhereHoliday);

                let [strLeaveApplicationShiftResult, _strLeaveApplicationResult] = await dbSecurity.asyncResult(strLeaveApplication + ";" + strSelectShiftMaster + ";" + strSelectHolidayMaster);
                let strLeaveApplicationResult = strLeaveApplicationShiftResult[0];
                let strSelectShiftMasterResult = strLeaveApplicationShiftResult[1];
                let strSelectHolidayResult = strLeaveApplicationShiftResult[2];

                let manageLeaveApplication = [];
                if (strLeaveApplicationResult.length > 0) {
                    for (let d = 0; d < strLeaveApplicationResult.length; d++) {
                        let leaveFromDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveFrom);
                        let leaveToDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveTo);
                        let leaveEmployeeId = strLeaveApplicationResult[d].employeeId;
                        let leaveCode = strLeaveApplicationResult[d].employerleavetypeLeaveCode;
                        for (var day = leaveFromDate; day <= leaveToDate; day.setDate(day.getDate() + 1)) {
                            manageLeaveApplication.push({
                                employeeId: leaveEmployeeId,
                                leaveDate: moment(day).format("DD-MM-YYYY"),
                                leaveCode: leaveCode
                            });
                        }
                    }
                }

                let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                const unique = [...new Set(strSelectStartEnd1Result.map(item => item.employeeId))];
                let startEnd1 = [];
                for (let i = 0; i < unique.length; i++) {
                    startEnd1.push({});
                    let filterOverTimeData = strSelectStartEnd1Result.filter(x => x.employeeId == unique[i]);

                    startEnd1[i].Name = filterOverTimeData[0].memberName;
                    startEnd1[i].Branch = filterOverTimeData[0].employerbranchName;
                    startEnd1[i].Department = filterOverTimeData[0].employerdepartmentTitle;
                    startEnd1[i].shiftName = filterOverTimeData[0].shiftName;
                    startEnd1[i].data = [];
                    let count = 0;
                    for (let j = 0; j < totalDay; j++) {

                        let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                        let filterStartEnd1DataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == _date);

                        if (filterStartEnd1DataWithValue.length == 0) {
                            startEnd1[i].data.push({});
                            startEnd1[i].data[count].Date = _date;
                            let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                            startEnd1[i].data[count].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                            let isOffDay = self.dbIsOffDay(strSelectShiftMasterResult, filterOverTimeData[0].employermastershiftid, convertDate);

                            let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == _date);
                            if (filterLeave.length > 0)
                                startEnd1[i].data[count].AppliedLeave = filterLeave[0].leaveCode;
                            else
                                startEnd1[i].data[count].AppliedLeave = '-';

                            let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateDDMMYYYY == _date);
                            if (filterHoliday.length > 0)
                                startEnd1[i].data[count].HolidayStatus = 'Yes';
                            else
                                startEnd1[i].data[count].HolidayStatus = '-';

                            startEnd1[i].data[count].InTime = '-';
                            startEnd1[i].data[count].BreakOut1 = '-';
                            startEnd1[i].data[count].BreakIn1 = '-';
                            startEnd1[i].data[count].LunchOut = '-';
                            startEnd1[i].data[count].LunchIn = '-';
                            startEnd1[i].data[count].BreakOut2 = '-';
                            startEnd1[i].data[count].BreakIn2 = '-';
                            startEnd1[i].data[count].TimeOut = '-';
                            startEnd1[i].data[count].HourWorked = '-';
                            startEnd1[i].data[count].HourWorkedUnit = '-';
                            startEnd1[i].data[count].OvertimeHour = '-';
                            startEnd1[i].data[count].OvertimeHourUnit = '-';
                            startEnd1[i].data[count].finalOverTimeEarly = '-';
                            startEnd1[i].data[count].OvertimeFinalHour = '-';
                            startEnd1[i].data[count].OvertimeFinalHourUnit = '-';
                            startEnd1[i].data[count].Late = '-';
                            startEnd1[i].data[count].EarlyIn = '-';
                            startEnd1[i].data[count].EarlyLeave = '-';
                            startEnd1[i].data[count].shiftName = '-';
                            if (isOffDay == true) {
                                startEnd1[i].data[count].Absent = 'O';
                            } else
                                startEnd1[i].data[count].Absent = 'A';

                            count++;
                        }

                        if (filterStartEnd1DataWithValue.length > 0) {

                            for (let p = 0; p < filterStartEnd1DataWithValue.length; p++) {
                                startEnd1[i].data.push({});
                                startEnd1[i].data[count].Date = _date;
                                let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                                startEnd1[i].data[count].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                                let isOffDay = self.dbIsOffDay(strSelectShiftMasterResult, filterOverTimeData[0].employermastershiftid, convertDate);

                                let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == _date);
                                if (filterLeave.length > 0)
                                    startEnd1[i].data[count].AppliedLeave = filterLeave[0].leaveCode;
                                else
                                    startEnd1[i].data[count].AppliedLeave = '-';

                                let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateDDMMYYYY == _date);
                                if (filterHoliday.length > 0)
                                    startEnd1[i].data[count].HolidayStatus = 'Yes';
                                else
                                    startEnd1[i].data[count].HolidayStatus = '-';

                                startEnd1[i].data[count].InTime = filterStartEnd1DataWithValue[p].actInTime == null ? '-' : moment(filterStartEnd1DataWithValue[p].actInTime).format("HH:mm");

                                startEnd1[i].data[count].BreakOut1 = filterStartEnd1DataWithValue[p].actBreakInTime1 == null ? '-' : moment(filterStartEnd1DataWithValue[p].actBreakInTime1).format("HH:mm");
                                startEnd1[i].data[count].BreakIn1 = filterStartEnd1DataWithValue[p].actBreakOutTime1 == null ? '-' : moment(filterStartEnd1DataWithValue[p].actBreakOutTime1).format("HH:mm");
                                startEnd1[i].data[count].LunchOut = filterStartEnd1DataWithValue[p].actLunchInTime == null ? '-' : moment(filterStartEnd1DataWithValue[p].actLunchInTime).format("HH:mm");
                                startEnd1[i].data[count].LunchIn = filterStartEnd1DataWithValue[p].actLunchOutTime == null ? '-' : moment(filterStartEnd1DataWithValue[p].actLunchOutTime).format("HH:mm");
                                startEnd1[i].data[count].BreakOut2 = filterStartEnd1DataWithValue[p].actBreakInTime2 == null ? '-' : moment(filterStartEnd1DataWithValue[p].actBreakInTime2).format("HH:mm");
                                startEnd1[i].data[count].BreakIn2 = filterStartEnd1DataWithValue[p].actBreakOutTime2 == null ? '-' : moment(filterStartEnd1DataWithValue[p].actBreakOutTime2).format("HH:mm");
                                startEnd1[i].data[count].finalOverTimeEarly = filterStartEnd1DataWithValue[0].finalOverTimeEarly;

                                if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                    startEnd1[i].data[count].TimeOut = moment(filterStartEnd1DataWithValue[p].actOutTime).format("HH:mm");
                                else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                    startEnd1[i].data[count].TimeOut = moment(filterStartEnd1DataWithValue[p].actOutTime_Full).format("HH:mm");
                                else
                                    startEnd1[i].data[count].TimeOut = '-';

                                if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                    startEnd1[i].data[count].HourWorked = filterStartEnd1DataWithValue[p].workingHour;
                                else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                    startEnd1[i].data[count].HourWorked = filterStartEnd1DataWithValue[p].workingHour_Full;
                                else
                                    startEnd1[i].data[count].HourWorked = '-';
                                /* Unit */
                                if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                    startEnd1[i].data[count].HourWorkedUnit = filterStartEnd1DataWithValue[p].workingHour_Unit;
                                else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                    startEnd1[i].data[count].HourWorkedUnit = filterStartEnd1DataWithValue[p].workingHour_Full_Unit;
                                else
                                    startEnd1[i].data[count].HourWorkedUnit = '-';

                                if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                    startEnd1[i].data[count].OvertimeHour = filterStartEnd1DataWithValue[p].finalOverTime;
                                else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                    startEnd1[i].data[count].OvertimeHour = filterStartEnd1DataWithValue[p].finalOverTime_Full;
                                else
                                    startEnd1[i].data[count].OvertimeHour = '-';
                                /* overtime */
                                if (filterStartEnd1DataWithValue[p].actOutTime != null) {
                                    startEnd1[i].data[count].OvertimeFinalHour = filterStartEnd1DataWithValue[p].finalOverTime_With_Early;
                                    startEnd1[i].data[count].OvertimeFinalHourUnit = filterStartEnd1DataWithValue[p].finalOverTime_Unit_2;
                                } else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null) {
                                    startEnd1[i].data[count].OvertimeFinalHour = filterStartEnd1DataWithValue[p].finalOverTime_Full_With_Early;
                                    startEnd1[i].data[count].OvertimeFinalHourUnit = filterStartEnd1DataWithValue[p].finalOverTime_Full_Unit_2;
                                } else {
                                    startEnd1[i].data[count].OvertimeFinalHour = '-';
                                    startEnd1[i].data[count].OvertimeFinalHourUnit = '-';
                                }
                                /* Unit */
                                if (filterStartEnd1DataWithValue[0].actOutTime != null)
                                    startEnd1[i].data[j].OvertimeHourUnit = filterStartEnd1DataWithValue[0].finalOverTime_Unit;
                                else if (filterStartEnd1DataWithValue[0].actOutTime_Full != null)
                                    startEnd1[i].data[j].OvertimeHourUnit = filterStartEnd1DataWithValue[0].finalOverTime_Full_Unit;
                                else
                                    startEnd1[i].data[j].OvertimeHourUnit = '-';

                                startEnd1[i].data[count].Late = filterStartEnd1DataWithValue[p].lateIn;
                                let lateSec = moment.duration(startEnd1[i].data[count].Late).asSeconds();
                                if (lateSec < 0) {
                                    startEnd1[i].data[count].Late = '-';
                                }

                                if (startEnd1[i].data[count].Late == '00:00')
                                    startEnd1[i].data[count].Late = '-';

                                /* */
                                startEnd1[i].data[count].EarlyIn = filterStartEnd1DataWithValue[p].EarlyIn;
                                let EarlyInSec = moment.duration(startEnd1[i].data[count].EarlyIn).asSeconds();
                                if (EarlyInSec < 0) {
                                    startEnd1[i].data[count].EarlyIn = '-';
                                }

                                if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                    startEnd1[i].data[count].EarlyLeave = filterStartEnd1DataWithValue[p].earlyOutTime;
                                else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                    startEnd1[i].data[count].EarlyLeave = filterStartEnd1DataWithValue[p].earlyOutTime_Full;
                                else
                                    startEnd1[i].data[count].EarlyLeave = '-';

                                let sec = moment.duration(startEnd1[i].data[count].EarlyLeave).asSeconds();
                                if (sec < 0) {
                                    startEnd1[i].data[count].EarlyLeave = '-';
                                }

                                if (startEnd1[i].data[count].EarlyLeave == '00:00')
                                    startEnd1[i].data[count].EarlyLeave = '-';

                                startEnd1[i].data[count].Absent = '-';
                                if (isOffDay == false && startEnd1[i].data[count].HolidayStatus == '-' && startEnd1[i].data[count].AppliedLeave == '-' && filterStartEnd1DataWithValue.length == 0) {
                                    startEnd1[i].data[count].Absent = 'A';
                                } else if (isOffDay == true && filterStartEnd1DataWithValue.length == 0) {
                                    startEnd1[i].data[count].Absent = 'O';
                                } else
                                    startEnd1[i].data[count].Absent = '-';

                                startEnd1[i].data[count].shiftName = filterStartEnd1DataWithValue[p].shiftName;
                                count++;
                            }
                        }
                    }
                }
                return {
                    'flag': true,
                    'data': startEnd1
                };

            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportStartEnd5: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strSelectOvertimeSetup = _clsemployerotsetup.data.select(" and employerId = " + employerId);
            let [strSelectOvertimeSetupResult, _strSelectOvertimeSetupResult] = await dbSecurity.asyncResult(strSelectOvertimeSetup);

            if (strSelectOvertimeSetupResult.length > 0) {
                let strquery = _clsemployeedailyattendance.data.select_ReportAttendanceWithOT(strwhere);
                let [strSelectOvertimeDataResult, _strSelectOvertimeDataResult] = await dbSecurity.asyncResult(strquery);

                let overTime = [];
                if (strSelectOvertimeDataResult.length > 0) {

                    /* leave application data */
                    let strWhereLeaveApplication = '';
                    strWhereLeaveApplication += " and employerId = " + employerId;
                    strWhereLeaveApplication += " AND (DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') = DATE_FORMAT('" + SearchFromDate + "','%Y-%m') OR DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') = DATE_FORMAT('" + SearchToDate + "','%Y-%m')) ";
                    let strLeaveApplication = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strWhereLeaveApplication);
                    /* shift data */
                    let strSelectShiftMaster = _clsemployermastershift.data.select(" and employerId = " + employerId);
                    /* holiday data */
                    let strWhereHoliday = '';
                    strWhereHoliday += " and employerId = " + employerId;
                    strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
                    strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";
                    let strSelectHolidayMaster = _clsemployerholiday.data.select(strWhereHoliday);

                    let [strLeaveApplicationShiftResult, _strLeaveApplicationResult] = await dbSecurity.asyncResult(strLeaveApplication + ";" + strSelectShiftMaster + ";" + strSelectHolidayMaster);
                    let strLeaveApplicationResult = strLeaveApplicationShiftResult[0];
                    let strSelectShiftMasterResult = strLeaveApplicationShiftResult[1];
                    let strSelectHolidayResult = strLeaveApplicationShiftResult[2];

                    let manageLeaveApplication = [];
                    if (strLeaveApplicationResult.length > 0) {
                        for (let d = 0; d < strLeaveApplicationResult.length; d++) {
                            let leaveFromDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveFrom);
                            let leaveToDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveTo);
                            let leaveEmployeeId = strLeaveApplicationResult[d].employeeId;
                            let leaveCode = strLeaveApplicationResult[d].employerleavetypeLeaveCode;
                            for (var day = leaveFromDate; day <= leaveToDate; day.setDate(day.getDate() + 1)) {
                                manageLeaveApplication.push({
                                    employeeId: leaveEmployeeId,
                                    leaveDate: moment(day).format("DD-MM-YYYY"),
                                    leaveCode: leaveCode
                                });
                            }
                        }
                    }

                    let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                    const unique = [...new Set(strSelectOvertimeDataResult.map(item => item.employeeId))];
                    for (let i = 0; i < unique.length; i++) {
                        overTime.push({});
                        let filterOverTimeData = strSelectOvertimeDataResult.filter(x => x.employeeId == unique[i]);
                        overTime[i].Name = filterOverTimeData[0].memberName;
                        overTime[i].Branch = filterOverTimeData[0].employerbranchName;
                        overTime[i].Department = filterOverTimeData[0].employerdepartmentTitle;
                        overTime[i].shiftName = filterOverTimeData[0].shiftName;
                        overTime[i].employerotsetupId = filterOverTimeData[0].employerotsetupId;
                        let _dayType = filterOverTimeData[0].dayType;
                        overTime[i].data = [];

                        for (let j = 0; j < totalDay; j++) {
                            overTime[i].data.push({});
                            let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                            overTime[i].data[j].Date = _date;
                            let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                            overTime[i].data[j].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                            let isOffDay = self.dbIsOffDay(strSelectShiftMasterResult, filterOverTimeData[0].employermastershiftid, convertDate);

                            let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == overTime[i].data[j].Date);
                            if (filterLeave.length > 0)
                                overTime[i].data[j].AppliedLeave = filterLeave[0].leaveCode;
                            else
                                overTime[i].data[j].AppliedLeave = '-';

                            let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateDDMMYYYY == overTime[i].data[j].Date);
                            if (filterHoliday.length > 0)
                                overTime[i].data[j].HolidayStatus = 'Yes';
                            else
                                overTime[i].data[j].HolidayStatus = '-';

                            /* Total Calculation */
                            for (let k = 0; k < strSelectOvertimeSetupResult.length; k++) {
                                let unit = 0;
                                let _employerotsetupDescription = strSelectOvertimeSetupResult[k].employerotsetupDescription;
                                let employerotsetupOTCode = strSelectOvertimeSetupResult[k].employerotsetupOTCode;
                                let employerotsetupOTRate = strSelectOvertimeSetupResult[k].employerotsetupRate;
                                let employerotsetupId = strSelectOvertimeSetupResult[k].employerotsetupId;

                                if (overTime[i].employerotsetupId == 0) {
                                    let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == employerotsetupId && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                    if (filterOverTimeDataWithValue.length == 0) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == 0 && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (_employerotsetupDescription == 'Normal OT' && isOffDay != true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else
                                                    unit = 0;
                                            }

                                            if (_employerotsetupDescription == 'Off Day OT' && isOffDay == true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else
                                                    unit = 0;
                                            }
                                        }
                                    }

                                    if (filterOverTimeDataWithValue.length > 0) {
                                        if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                            unit = 0;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                        else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                        else
                                            unit = 0;
                                    }

                                    if (unit == null)
                                        unit = 0;

                                    overTime[i].data[j]["'T_" + employerotsetupOTCode + "'"] = unit;
                                } else {
                                    overTime[i].data[j]["'T_" + employerotsetupOTCode + "'"] = 0;
                                    if (overTime[i].employerotsetupId == employerotsetupId) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                unit = 0;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                            else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                            else
                                                unit = 0;

                                            overTime[i].data[j]["'T_" + employerotsetupOTCode + "'"] = unit;
                                        }
                                    }
                                }
                                overTime[i].data[j]["'T_" + employerotsetupOTCode + "_Rate'"] = employerotsetupOTRate;
                            }
                            /* Overtime Calculation */
                            for (let k = 0; k < strSelectOvertimeSetupResult.length; k++) {
                                let unit = 0;
                                let _employerotsetupDescription = strSelectOvertimeSetupResult[k].employerotsetupDescription;
                                let employerotsetupOTCode = strSelectOvertimeSetupResult[k].employerotsetupOTCode;
                                let employerotsetupOTRate = strSelectOvertimeSetupResult[k].employerotsetupRate;
                                let employerotsetupId = strSelectOvertimeSetupResult[k].employerotsetupId;

                                if (overTime[i].employerotsetupId == 0) {
                                    let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == employerotsetupId && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                    if (filterOverTimeDataWithValue.length == 0) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == 0 && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (_employerotsetupDescription == 'Normal OT' && isOffDay != true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_1;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_1;
                                                else
                                                    unit = 0;
                                            }

                                            if (_employerotsetupDescription == 'Off Day OT' && isOffDay == true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_1;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_1;
                                                else
                                                    unit = 0;
                                            }
                                        }
                                    }

                                    if (filterOverTimeDataWithValue.length > 0) {
                                        if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                            unit = 0;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_1;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_1;
                                        else
                                            unit = 0;
                                    }

                                    if (unit == null)
                                        unit = 0;

                                    overTime[i].data[j]["'O_" + employerotsetupOTCode + "'"] = unit;
                                } else {
                                    overTime[i].data[j]["'O_" + employerotsetupOTCode + "'"] = 0;
                                    if (overTime[i].employerotsetupId == employerotsetupId) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                unit = 0;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_1;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_1;
                                            else
                                                unit = 0;

                                            overTime[i].data[j]["'O_" + employerotsetupOTCode + "'"] = unit;
                                        }
                                    }
                                }
                                overTime[i].data[j]["'O_" + employerotsetupOTCode + "_Rate'"] = employerotsetupOTRate;
                            }
                            /* Earlyout Calculation */
                            for (let k = 0; k < strSelectOvertimeSetupResult.length; k++) {
                                let unit = 0;
                                let _employerotsetupDescription = strSelectOvertimeSetupResult[k].employerotsetupDescription;
                                let employerotsetupOTCode = strSelectOvertimeSetupResult[k].employerotsetupOTCode;
                                let employerotsetupOTRate = strSelectOvertimeSetupResult[k].employerotsetupRate;
                                let employerotsetupId = strSelectOvertimeSetupResult[k].employerotsetupId;

                                if (overTime[i].employerotsetupId == 0) {
                                    let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == employerotsetupId && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                    if (filterOverTimeDataWithValue.length == 0) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == 0 && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (_employerotsetupDescription == 'Normal OT' && isOffDay != true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTimeEarlyUnit;
                                                else
                                                    unit = 0;
                                            }

                                            if (_employerotsetupDescription == 'Off Day OT' && isOffDay == true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTimeEarlyUnit;
                                                else
                                                    unit = 0;
                                            }
                                        }
                                    }

                                    if (filterOverTimeDataWithValue.length > 0) {
                                        if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTimeEarlyUnit;
                                        else
                                            unit = 0;
                                    }

                                    if (unit == null)
                                        unit = 0;

                                    overTime[i].data[j]["'E_" + employerotsetupOTCode + "'"] = unit;
                                } else {
                                    overTime[i].data[j]["'E_" + employerotsetupOTCode + "'"] = 0;
                                    if (overTime[i].employerotsetupId == employerotsetupId) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTimeEarlyUnit;
                                            else
                                                unit = 0;

                                            overTime[i].data[j]["'E_" + employerotsetupOTCode + "'"] = unit;
                                        }
                                    }
                                }
                                overTime[i].data[j]["'E_" + employerotsetupOTCode + "_Rate'"] = employerotsetupOTRate;
                            }

                            let _filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);

                            overTime[i].data[j].InTime = '-';
                            overTime[i].data[j].BreakOut1 = '-';
                            overTime[i].data[j].BreakIn1 = '-';
                            overTime[i].data[j].LunchOut = '-';
                            overTime[i].data[j].LunchIn = '-';
                            overTime[i].data[j].BreakOut2 = '-';
                            overTime[i].data[j].BreakIn2 = '-';
                            overTime[i].data[j].TimeOut = '-';
                            overTime[i].data[j].HourWorked = '-';
                            overTime[i].data[j].HourWorkedUnit = '-';
                            overTime[i].data[j].OvertimeHour = '-';
                            overTime[i].data[j].OvertimeHourUnit = '-';
                            overTime[i].data[j].finalOverTimeEarly = '-';
                            overTime[i].data[j].finalOverTimeEarlyUnit = '-';
                            overTime[i].data[j].OvertimeFinalHour = '-';
                            overTime[i].data[j].OvertimeFinalHourUnit = '-';
                            overTime[i].data[j].Late = '-';
                            overTime[i].data[j].EarlyIn = '-';
                            overTime[i].data[j].EarlyLeave = '-';
                            overTime[i].data[j].Absent = '-';

                            if (_filterOverTimeDataWithValue.length > 0) {

                                overTime[i].data[j].InTime = _filterOverTimeDataWithValue[0].actInTime == null ? '-' : moment(_filterOverTimeDataWithValue[0].actInTime).format("HH:mm");
                                overTime[i].data[j].BreakOut1 = _filterOverTimeDataWithValue[0].actBreakInTime1 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakInTime1).format("HH:mm");
                                overTime[i].data[j].BreakIn1 = _filterOverTimeDataWithValue[0].actBreakOutTime1 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakOutTime1).format("HH:mm");
                                overTime[i].data[j].LunchOut = _filterOverTimeDataWithValue[0].actLunchInTime == null ? '-' : moment(_filterOverTimeDataWithValue[0].actLunchInTime).format("HH:mm");
                                overTime[i].data[j].LunchIn = _filterOverTimeDataWithValue[0].actLunchOutTime == null ? '-' : moment(_filterOverTimeDataWithValue[0].actLunchOutTime).format("HH:mm");
                                overTime[i].data[j].BreakOut2 = _filterOverTimeDataWithValue[0].actBreakInTime2 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakInTime2).format("HH:mm");
                                overTime[i].data[j].BreakIn2 = _filterOverTimeDataWithValue[0].actBreakOutTime2 == null ? '-' : moment(_filterOverTimeDataWithValue[0].actBreakOutTime2).format("HH:mm");
                                overTime[i].data[j].finalOverTimeEarly = _filterOverTimeDataWithValue[0].finalOverTimeEarly;
                                overTime[i].data[j].finalOverTimeEarlyUnit = _filterOverTimeDataWithValue[0].finalOverTimeEarlyUnit;

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].TimeOut = moment(_filterOverTimeDataWithValue[0].actOutTime).format("HH:mm");
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].TimeOut = moment(_filterOverTimeDataWithValue[0].actOutTime_Full).format("HH:mm");
                                else
                                    overTime[i].data[j].TimeOut = '-';

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].HourWorked = _filterOverTimeDataWithValue[0].workingHour;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].HourWorked = _filterOverTimeDataWithValue[0].workingHour_Full;
                                else
                                    overTime[i].data[j].HourWorked = '-';
                                /* Unit */
                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].HourWorkedUnit = _filterOverTimeDataWithValue[0].workingHour_Unit;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].HourWorkedUnit = _filterOverTimeDataWithValue[0].workingHour_Full_Unit;
                                else
                                    overTime[i].data[j].HourWorkedUnit = '-';

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].OvertimeHour = _filterOverTimeDataWithValue[0].finalOverTime;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].OvertimeHour = _filterOverTimeDataWithValue[0].finalOverTime_Full;
                                else
                                    overTime[i].data[j].OvertimeHour = '-';
                                /* overtime */
                                if (_filterOverTimeDataWithValue[0].actOutTime != null) {
                                    overTime[i].data[j].OvertimeFinalHour = _filterOverTimeDataWithValue[0].finalOverTime_With_Early;
                                    overTime[i].data[j].OvertimeFinalHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_With_Early_Unit;
                                } else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null) {
                                    overTime[i].data[j].OvertimeFinalHour = _filterOverTimeDataWithValue[0].finalOverTime_Full_With_Early;
                                    overTime[i].data[j].OvertimeFinalHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Full_With_Early_Unit;
                                } else {
                                    overTime[i].data[j].OvertimeFinalHour = '-';
                                    overTime[i].data[j].OvertimeFinalHourUnit = '-';
                                }
                                /* Unit */
                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].OvertimeHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Unit_1;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].OvertimeHourUnit = _filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_1;
                                else
                                    overTime[i].data[j].OvertimeHourUnit = '-';

                                overTime[i].data[j].Late = _filterOverTimeDataWithValue[0].lateIn;
                                let lateSec = moment.duration(overTime[i].data[j].Late).asSeconds();
                                if (lateSec < 0) {
                                    overTime[i].data[j].Late = '-';
                                }

                                if (overTime[i].data[j].Late == '00:00')
                                    overTime[i].data[j].Late = '-';


                                /* */
                                overTime[i].data[j].EarlyIn = _filterOverTimeDataWithValue[0].EarlyIn;
                                let EarlyInSec = moment.duration(overTime[i].data[j].EarlyIn).asSeconds();
                                if (EarlyInSec < 0) {
                                    overTime[i].data[j].EarlyIn = '-';
                                }

                                if (_filterOverTimeDataWithValue[0].actOutTime != null)
                                    overTime[i].data[j].EarlyLeave = _filterOverTimeDataWithValue[0].earlyOutTime;
                                else if (_filterOverTimeDataWithValue[0].actOutTime_Full != null)
                                    overTime[i].data[j].EarlyLeave = _filterOverTimeDataWithValue[0].earlyOutTime_Full;
                                else
                                    overTime[i].data[j].EarlyLeave = '-';

                                let sec = moment.duration(overTime[i].data[j].EarlyLeave).asSeconds();
                                if (sec < 0) {
                                    overTime[i].data[j].EarlyLeave = '-';
                                }

                                if (overTime[i].data[j].EarlyLeave == '00:00')
                                    overTime[i].data[j].EarlyLeave = '-';
                            }

                            // if (isOffDay == false &&
                            //     overTime[i].data[j].HolidayStatus == '-' &&
                            //     overTime[i].data[j].AppliedLeave == '-' &&
                            //     _filterOverTimeDataWithValue.length == 0)
                            //     overTime[i].data[j].Absent = 'A';

                            if (isOffDay == false &&
                                overTime[i].data[j].HolidayStatus == '-' &&
                                overTime[i].data[j].AppliedLeave == '-' &&
                                overTime[i].data[j].InTime == '-' &&
                                overTime[i].data[j].TimeOut == '-')
                                overTime[i].data[j].Absent = 'A';

                            if (isOffDay == true)
                                overTime[i].data[j].Absent = 'O';
                        }
                    }
                    return {
                        'flag': true,
                        'data': overTime
                    };
                } else {
                    return {
                        'flag': false,
                        'data': []
                    };
                }
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }
        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportOvertime: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strSelectOvertimeSetup = _clsemployerotsetup.data.select(" and employerId = " + employerId);
            let [strSelectOvertimeSetupResult, _strSelectOvertimeSetupResult] = await dbSecurity.asyncResult(strSelectOvertimeSetup);

            /* shift data */
            let strSelectShiftMaster = _clsemployermastershift.data.select(" and employerId = " + employerId);
            let [strLeaveApplicationShiftResult, _strLeaveApplicationResult] = await dbSecurity.asyncResult(strSelectShiftMaster);
            let strSelectShiftMasterResult = strLeaveApplicationShiftResult;

            if (strSelectOvertimeSetupResult.length > 0) {

                let strquery = _clsemployeedailyattendance.data.select_ReportAttendanceWithOT(strwhere);
                let [strSelectOvertimeDataResult, _strSelectOvertimeDataResult] = await dbSecurity.asyncResult(strquery);

                if (strSelectOvertimeDataResult.length > 0) {

                    let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                    const unique = [...new Set(strSelectOvertimeDataResult.map(item => item.employeeId))];
                    let overTime = [];

                    for (let i = 0; i < unique.length; i++) {
                        overTime.push({});
                        let filterOverTimeData = strSelectOvertimeDataResult.filter(x => x.employeeId == unique[i]);

                        overTime[i].Name = filterOverTimeData[0].memberName;
                        overTime[i].Branch = filterOverTimeData[0].employerbranchName;
                        overTime[i].Department = filterOverTimeData[0].employerdepartmentTitle;
                        overTime[i].shiftName = filterOverTimeData[0].shiftName;
                        overTime[i].employerotsetupId = filterOverTimeData[0].employerotsetupId;
                        let _dayType = filterOverTimeData[0].dayType;

                        overTime[i].data = [];
                        for (let j = 0; j < totalDay; j++) {
                            overTime[i].data.push({});
                            let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                            overTime[i].data[j].Date = _date;
                            let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                            overTime[i].data[j].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                            let isOffDay = self.dbIsOffDay(strSelectShiftMasterResult, filterOverTimeData[0].employermastershiftid, convertDate);

                            for (let k = 0; k < strSelectOvertimeSetupResult.length; k++) {
                                let unit = 0;
                                let _employerotsetupDescription = strSelectOvertimeSetupResult[k].employerotsetupDescription;
                                let employerotsetupOTCode = strSelectOvertimeSetupResult[k].employerotsetupOTCode;
                                let employerotsetupId = strSelectOvertimeSetupResult[k].employerotsetupId;


                                if (overTime[i].employerotsetupId == 0) {
                                    let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == employerotsetupId && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                    if (filterOverTimeDataWithValue.length == 0) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.holidayOTTag == 0 && x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (_employerotsetupDescription == 'Normal OT' && isOffDay != true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else
                                                    unit = 0;
                                            }
                                            if (_employerotsetupDescription == 'Off Day OT' && isOffDay == true) {
                                                if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                    unit = 0;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                                else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                    unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                                else
                                                    unit = 0;
                                            }
                                        }
                                    }

                                    if (filterOverTimeDataWithValue.length > 0) {
                                        if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                            unit = 0;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                        else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                        else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                            unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                        else
                                            unit = 0;
                                    }

                                    if (unit == null)
                                        unit = 0;

                                    overTime[i].data[j]["'" + employerotsetupOTCode + "'"] = unit;
                                } else {
                                    overTime[i].data[j]["'" + employerotsetupOTCode + "'"] = 0;
                                    if (overTime[i].employerotsetupId == employerotsetupId) {
                                        let filterOverTimeDataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == overTime[i].data[j].Date);
                                        if (filterOverTimeDataWithValue.length > 0) {
                                            if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00' && filterOverTimeDataWithValue[0].finalOverTimeEarly == '00:00')
                                                unit = 0;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full != '00:00' && filterOverTimeDataWithValue[0].finalOverTime == '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                            else if (filterOverTimeDataWithValue[0].finalOverTime_Full == '00:00' && filterOverTimeDataWithValue[0].finalOverTime != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Unit_2;
                                            else if (filterOverTimeDataWithValue[0].finalOverTimeEarly != '00:00')
                                                unit = filterOverTimeDataWithValue[0].finalOverTime_Full_Unit_2;
                                            else
                                                unit = 0;

                                            overTime[i].data[j]["'" + employerotsetupOTCode + "'"] = unit;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return {
                        'flag': true,
                        'data': overTime
                    };
                } else {
                    return {
                        'flag': false,
                        'data': []
                    };
                }
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportAddPay: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strSelectAddPaySetup = _clsemployeradditionalpaysetup.data.select(" and employerId = " + employerId);
            let [strSelectAddPaySetupResult, _strSelectAddPaySetupResult] = await dbSecurity.asyncResult(strSelectAddPaySetup);

            if (strSelectAddPaySetupResult.length > 0) {

                let strquery = _clsemployeedailyattendance.data.select_ReportAttendanceWithAddPay(strwhere);
                let [strSelectAddPayDataResult, _strSelectAddPayDataResult] = await dbSecurity.asyncResult(strquery);

                if (strSelectAddPayDataResult.length > 0) {
                    let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                    const unique = [...new Set(strSelectAddPayDataResult.map(item => item.employeeId))];
                    let addPay = [];
                    for (let i = 0; i < unique.length; i++) {
                        addPay.push({});
                        let filterAddpayData = strSelectAddPayDataResult.filter(x => x.employeeId == unique[i]);

                        addPay[i].Name = filterAddpayData[0].memberName;
                        addPay[i].Branch = filterAddpayData[0].employerbranchName;
                        addPay[i].Department = filterAddpayData[0].employerdepartmentTitle;
                        addPay[i].shiftName = filterAddpayData[0].shiftName;
                        addPay[i].data = [];
                        for (let j = 0; j < totalDay; j++) {
                            addPay[i].data.push({});
                            let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                            addPay[i].data[j].Date = _date;

                            addPay[i].data[j].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                            for (let k = 0; k < strSelectAddPaySetupResult.length; k++) {
                                let employeradditionalpaysetupCode = strSelectAddPaySetupResult[k].employeradditionalpaysetupCode;
                                let employeradditionalpaysetupId = strSelectAddPaySetupResult[k].employeradditionalpaysetupId;

                                let filterAddpayDataWithValue = filterAddpayData.filter(x => x.holidayAddPayTag == employeradditionalpaysetupId && x.entryDateDDMMYYYY == addPay[i].data[j].Date);
                                if (filterAddpayDataWithValue.length > 0)
                                    addPay[i].data[j]["'" + employeradditionalpaysetupCode + "'"] = 1;
                                else
                                    addPay[i].data[j]["'" + employeradditionalpaysetupCode + "'"] = 0;
                            }
                        }
                    }
                    return {
                        'flag': true,
                        'data': addPay
                    };

                } else {
                    return {
                        'flag': false,
                        'data': []
                    };
                }
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportShift: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strSelectShiftSetup = _clsemployershiftsetup.data.select(" and employerId = " + employerId);
            let [strSelectShiftSetupResult, _strSelectShiftSetupResult] = await dbSecurity.asyncResult(strSelectShiftSetup);

            if (strSelectShiftSetupResult.length > 0) {

                let strquery = _clsemployeedailyattendance.data.select_ReportAttendanceWithShift(strwhere);
                let [strSelectShiftDataResult, _strSelectShiftDataResult] = await dbSecurity.asyncResult(strquery);

                if (strSelectShiftDataResult.length > 0) {

                    let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                    const unique = [...new Set(strSelectShiftDataResult.map(item => item.employeeId))];
                    let shift = [];
                    for (let i = 0; i < unique.length; i++) {
                        shift.push({});
                        let filterShiftData = strSelectShiftDataResult.filter(x => x.employeeId == unique[i]);

                        shift[i].Name = filterShiftData[0].memberName;
                        shift[i].Branch = filterShiftData[0].employerbranchName;
                        shift[i].Department = filterShiftData[0].employerdepartmentTitle;
                        shift[i].shiftName = filterShiftData[0].shiftName;
                        shift[i].data = [];
                        for (let j = 0; j < totalDay; j++) {
                            shift[i].data.push({});
                            let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                            shift[i].data[j].Date = _date;

                            shift[i].data[j].DateWithName = _date + " " + moment(SearchFromDate).add(j, 'days').format("ddd");

                            for (let k = 0; k < strSelectShiftSetupResult.length; k++) {
                                let employershiftsetupCode = strSelectShiftSetupResult[k].employershiftsetupCode;
                                let employershiftsetupId = strSelectShiftSetupResult[k].employershiftsetupId;

                                let filterShiftDataWithValue = filterShiftData.filter(x => x.holidayShiftTag == employershiftsetupId && x.entryDateDDMMYYYY == shift[i].data[j].Date);
                                if (filterShiftDataWithValue.length > 0)
                                    shift[i].data[j]["'" + employershiftsetupCode + "'"] = 1;
                                else
                                    shift[i].data[j]["'" + employershiftsetupCode + "'"] = 0;
                            }
                        }
                    }
                    return {
                        'flag': true,
                        'data': shift
                    };

                } else {
                    return {
                        'flag': false,
                        'data': []
                    };
                }
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportMonthlyStatistic: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchMonth = request.body.SearchMonth;
            let SearchYear = request.body.SearchYear;

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " and month(entryDate) = " + SearchMonth;
            strwhere += " and year(entryDate) = " + SearchYear;

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strquery = _clsemployeedailyattendance.data.select_ReportMonthlyStatistic(strwhere);
            let [strSelectAttendanceResult, _strSelectAttendanceResult] = await dbSecurity.asyncResult(strquery);

            if (strSelectAttendanceResult.length > 0) {
                let strWhereLeaveApplication = '';
                strWhereLeaveApplication += " and employerId = " + employerId;
                strWhereLeaveApplication += " AND (DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') = '" + SearchYear + "-" + SearchMonth + "' OR DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') = '" + SearchYear + "-" + SearchMonth + "') ";
                let strSelectLeaveApplication = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strWhereLeaveApplication);
                let strSelectShiftMaster = _clsemployermastershift.data.select(" and employerId = " + employerId);
                /* holiday data */
                let strWhereHoliday = '';
                strWhereHoliday += " and employerId = " + employerId;
                strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m') = '" + SearchYear + "-" + SearchMonth + "'";
                let strSelectHolidayMaster = _clsemployerholiday.data.select(strWhereHoliday);

                let [strSelectLeaveApplicationShiftResult, _strSelectLeaveApplicationShiftResult] = await dbSecurity.asyncResult(strSelectLeaveApplication + ";" + strSelectShiftMaster + ";" + strSelectHolidayMaster);

                let strSelectLeaveApplicationResult = strSelectLeaveApplicationShiftResult[0];
                let strSelectShiftMasterResult = strSelectLeaveApplicationShiftResult[1];
                let strSelectHolidayResult = strSelectLeaveApplicationShiftResult[2];

                let manageLeaveApplication = [];
                if (strSelectLeaveApplicationResult.length > 0) {
                    for (let d = 0; d < strSelectLeaveApplicationResult.length; d++) {
                        let leaveFromDate = new Date(strSelectLeaveApplicationResult[d].employeeleaveapplicationLeaveFrom);
                        let leaveToDate = new Date(strSelectLeaveApplicationResult[d].employeeleaveapplicationLeaveTo);
                        let leaveEmployeeId = strSelectLeaveApplicationResult[d].employeeId;
                        let leaveCode = strSelectLeaveApplicationResult[d].employerleavetypeLeaveCode;
                        for (var day = leaveFromDate; day <= leaveToDate; day.setDate(day.getDate() + 1)) {
                            manageLeaveApplication.push({
                                employeeId: leaveEmployeeId,
                                leaveDate: moment(day).format("DD-MM-YYYY"),
                                leaveCode: leaveCode
                            });
                        }
                    }
                }

                let totalDay = moment(SearchFromDate).daysInMonth();
                const unique = [...new Set(strSelectAttendanceResult.map(item => item.employeeId))];
                let attendanceData = [];

                for (let i = 0; i < unique.length; i++) {
                    attendanceData.push({});
                    let filterAttendanceResult = strSelectAttendanceResult.filter(x => x.employeeId == unique[i]);

                    attendanceData[i].Name = filterAttendanceResult[0].memberName;
                    attendanceData[i].Branch = filterAttendanceResult[0].employerbranchName;
                    attendanceData[i].Department = filterAttendanceResult[0].employerdepartmentTitle;
                    attendanceData[i].shiftName = filterAttendanceResult[0].shiftName;

                    let mondayType = '';
                    let tuesdayType = '';
                    let wednesdayType = '';
                    let thursdayType = '';
                    let fridayType = '';
                    let saturdayType = '';
                    let sundayType = '';

                    let employerMasterShiftId = filterAttendanceResult[0].employermastershiftid;
                    let filterShiftMaster = strSelectShiftMasterResult.filter(x => x.employerMasterShiftId == employerMasterShiftId);
                    if (filterShiftMaster.length > 0) {
                        mondayType = filterShiftMaster[0].mondayType;
                        tuesdayType = filterShiftMaster[0].tuesdayType;
                        wednesdayType = filterShiftMaster[0].wednesdayType;
                        thursdayType = filterShiftMaster[0].thursdayType;
                        fridayType = filterShiftMaster[0].fridayType;
                        saturdayType = filterShiftMaster[0].saturdayType;
                        sundayType = filterShiftMaster[0].sundayType;
                    }

                    for (let j = 0; j < totalDay; j++) {
                        let _day = ('0' + (j + 1)).slice(-2);
                        let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                        let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                        let isLeave = true;
                        let status = 'A';
                        let isHoliday = 0;

                        let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == _date);
                        if (filterLeave.length > 0)
                            isLeave = true;
                        else
                            isLeave = false;

                        let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateDDMMYYYY == _date);
                        if (filterHoliday.length > 0)
                            isHoliday = 1;
                        else
                            isHoliday = 0;

                        let isLate = 0;
                        let isEarlyOut = 0;
                        let filterAttendanceResultWithValue = filterAttendanceResult.filter(x => x.entryDateDDMMYYYY == _date);

                        if (filterAttendanceResultWithValue.length > 0) {

                            let inTime = filterAttendanceResultWithValue[0].actInTime == null ? '-' : moment(filterAttendanceResultWithValue[0].actInTime).format("HH:mm");
                            let outTime = '-';

                            if (filterAttendanceResultWithValue[0].actOutTime != null)
                                outTime = moment(filterAttendanceResultWithValue[0].actOutTime).format("HH:mm");
                            else if (filterAttendanceResultWithValue[0].actOutTime_Full != null)
                                outTime = moment(filterAttendanceResultWithValue[0].actOutTime_Full).format("HH:mm");
                            else
                                outTime = '-';

                            if (inTime == '-' && outTime == '-') {
                                status = 'A';
                            } else {
                                status = 'W';
                            }
                            isLate = filterAttendanceResultWithValue[0].lateIn;
                            isEarlyOut = filterAttendanceResultWithValue[0].earlyOut;
                        } else
                            status = 'A';

                        if (isLeave == true)
                            status = 'L';
                        if (isHoliday == 1)
                            status = 'H';

                        if (convertDate == 'Monday')
                            if (mondayType == 'off')
                                status = 'O';
                        if (convertDate == 'Tuesday')
                            if (tuesdayType == 'off')
                                status = 'O';
                        if (convertDate == 'Wednesday')
                            if (wednesdayType == 'off')
                                status = 'O';
                        if (convertDate == 'Thursday')
                            if (thursdayType == 'off')
                                status = 'O';
                        if (convertDate == 'Friday')
                            if (fridayType == 'off')
                                status = 'O';
                        if (convertDate == 'Saturday')
                            if (saturdayType == 'off')
                                status = 'O';
                        if (convertDate == 'Sunday')
                            if (sundayType == 'off')
                                status = 'O';

                        attendanceData[i]["Day" + _day + ""] = {
                            status: status,
                            isLate: isLate,
                            isEarlyOut: isEarlyOut,
                            date: _date
                        };
                    }
                }
                return {
                    'flag': true,
                    'data': attendanceData
                };
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportMonthlyAttendance: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchMonth = request.body.SearchMonth;
            let SearchYear = request.body.SearchYear;

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " and month(entryDate) = " + SearchMonth;
            strwhere += " and year(entryDate) = " + SearchYear;

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strquery = _clsemployeedailyattendance.data.select_ReportAttendance(strwhere);
            let [strSelectAttendanceResult, _strSelectAttendanceResult] = await dbSecurity.asyncResult(strquery);

            if (strSelectAttendanceResult.length > 0) {

                /* leave application data */
                let strWhereLeaveApplication = '';
                strWhereLeaveApplication += " and employerId = " + employerId;
                strWhereLeaveApplication += " AND (DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') = '" + SearchYear + "-" + SearchMonth + "' OR DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') = '" + SearchYear + "-" + SearchMonth + "') ";
                let strLeaveApplication = _clsemployeeleaveapplication.data.select_view_employeeleaveapplication(strWhereLeaveApplication);
                /* holiday data */
                let strWhereHoliday = '';
                strWhereHoliday += " and employerId = " + employerId;
                strWhereHoliday += " AND DATE_FORMAT(holidayDate, '%Y-%m') = '" + SearchYear + "-" + SearchMonth + "'";
                let strSelectHolidayMaster = _clsemployerholiday.data.select(strWhereHoliday);
                let [strLeaveApplicationHolidayResult, _strLeaveApplicationHolidayResult] = await dbSecurity.asyncResult(strLeaveApplication + ";" + strSelectHolidayMaster);

                let strLeaveApplicationResult = strLeaveApplicationHolidayResult[0];
                let strHolidayResult = strLeaveApplicationHolidayResult[1];

                let manageLeaveApplication = [];
                if (strLeaveApplicationResult.length > 0) {
                    for (let d = 0; d < strLeaveApplicationResult.length; d++) {
                        let leaveFromDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveFrom);
                        let leaveToDate = new Date(strLeaveApplicationResult[d].employeeleaveapplicationLeaveTo);
                        let leaveEmployeeId = strLeaveApplicationResult[d].employeeId;
                        let leaveCode = strLeaveApplicationResult[d].employerleavetypeLeaveCode;
                        for (var day = leaveFromDate; day <= leaveToDate; day.setDate(day.getDate() + 1)) {
                            manageLeaveApplication.push({
                                employeeId: leaveEmployeeId,
                                leaveDate: moment(day).format("DD-MM-YYYY"),
                                leaveCode: leaveCode
                            });
                        }
                    }
                }

                let totalDay = moment(SearchFromDate).daysInMonth();
                const unique = [...new Set(strSelectAttendanceResult.map(item => item.employeeId))];
                let attendanceData = [];

                for (let i = 0; i < unique.length; i++) {
                    attendanceData.push({});
                    let filterAttendanceResult = strSelectAttendanceResult.filter(x => x.employeeId == unique[i]);

                    attendanceData[i].Name = filterAttendanceResult[0].memberName;
                    attendanceData[i].Branch = filterAttendanceResult[0].employerbranchName;
                    attendanceData[i].Department = filterAttendanceResult[0].employerdepartmentTitle;
                    attendanceData[i].shiftName = filterAttendanceResult[0].shiftName;
                    attendanceData[i].data = {};
                    for (let j = 0; j < totalDay; j++) {
                        let _day = ('0' + (j + 1)).slice(-2);
                        let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                        let convertDate = moment(SearchFromDate).add(j, 'days').format("dddd");

                        let filterAttendanceWithValue = filterAttendanceResult.filter(x => x.entryDateDDMMYYYY == _date);

                        let _InTime = '-';
                        let _BreakOut1 = '-';
                        let _BreakIn1 = '-';
                        let _LunchOut = '-';
                        let _LunchIn = '-';
                        let _BreakOut2 = '-';
                        let _BreakIn2 = '-';
                        let _TimeOut = '-';
                        let _HourWorked = '-';
                        let _OvertimeHour = '-';
                        let _OvertimeHourUnit = '-';
                        let _EarlyOvertimeHour = '-';
                        let _EarlyOvertimeHourUnit = '-';
                        let _Late = '-';
                        let _EarlyLeave = '-';
                        let _AppliedLeave = '-';
                        let _HolidayStatus = '-';
                        let _OvertimeFinalHour = '-';
                        let _OvertimeFinalHourUnit = '-';

                        let filterLeave = manageLeaveApplication.filter(x => x.employeeId == unique[i] && x.leaveDate == _date);
                        if (filterLeave.length > 0)
                            _AppliedLeave = filterLeave[0].leaveCode;
                        else
                            _AppliedLeave = '-';

                        let filterHoliday = strHolidayResult.filter(x => x.holidayDateDDMMYYYY == _date);
                        if (filterHoliday.length > 0)
                            _HolidayStatus = 'Yes';
                        else
                            _HolidayStatus = '-';

                        if (filterAttendanceWithValue.length > 0) {
                            _InTime = filterAttendanceWithValue[0].actInTime == null ? '-' : moment(filterAttendanceWithValue[0].actInTime).format("HH:mm");

                            _BreakOut1 = filterAttendanceWithValue[0].actBreakInTime1 == null ? '-' : moment(filterAttendanceWithValue[0].actBreakInTime1).format("HH:mm");
                            _BreakIn1 = filterAttendanceWithValue[0].actBreakOutTime1 == null ? '-' : moment(filterAttendanceWithValue[0].actBreakOutTime1).format("HH:mm");
                            _LunchOut = filterAttendanceWithValue[0].actLunchInTime == null ? '-' : moment(filterAttendanceWithValue[0].actLunchInTime).format("HH:mm");
                            _LunchIn = filterAttendanceWithValue[0].actLunchOutTime == null ? '-' : moment(filterAttendanceWithValue[0].actLunchOutTime).format("HH:mm");
                            _BreakOut2 = filterAttendanceWithValue[0].actBreakInTime2 == null ? '-' : moment(filterAttendanceWithValue[0].actBreakInTime2).format("HH:mm");
                            _BreakIn2 = filterAttendanceWithValue[0].actBreakOutTime2 == null ? '-' : moment(filterAttendanceWithValue[0].actBreakOutTime2).format("HH:mm");
                            _EarlyOvertimeHour = filterAttendanceWithValue[0].finalOverTimeEarly;

                            _EarlyOvertimeHourUnit = filterAttendanceWithValue[0].finalOverTimeEarlyUnit;
                            if (_EarlyOvertimeHourUnit == '0' || _EarlyOvertimeHourUnit == '0.0')
                                _EarlyOvertimeHourUnit = '-';

                            if (filterAttendanceWithValue[0].actOutTime != null)
                                _TimeOut = moment(filterAttendanceWithValue[0].actOutTime).format("HH:mm");
                            else if (filterAttendanceWithValue[0].actOutTime_Full != null)
                                _TimeOut = moment(filterAttendanceWithValue[0].actOutTime_Full).format("HH:mm");
                            else
                                _TimeOut = '-';

                            if (filterAttendanceWithValue[0].actOutTime != null)
                                _HourWorked = filterAttendanceWithValue[0].workingHour;
                            else if (filterAttendanceWithValue[0].actOutTime_Full != null)
                                _HourWorked = filterAttendanceWithValue[0].workingHour_Full;
                            else
                                _HourWorked = '-';

                            if (filterAttendanceWithValue[0].actOutTime != null) {
                                _OvertimeHour = filterAttendanceWithValue[0].finalOverTime;
                                _OvertimeHourUnit = filterAttendanceWithValue[0].finalOverTime_Unit;
                                _OvertimeFinalHour = filterAttendanceWithValue[0].finalOverTime_With_Early;
                                _OvertimeFinalHourUnit = filterAttendanceWithValue[0].finalOverTime_Full_Unit_2;
                            } else if (filterAttendanceWithValue[0].actOutTime_Full != null) {
                                _OvertimeHour = filterAttendanceWithValue[0].finalOverTime_Full;
                                _OvertimeHourUnit = filterAttendanceWithValue[0].finalOverTime_Full_Unit;
                                _OvertimeFinalHour = filterAttendanceWithValue[0].finalOverTime_Full_With_Early;
                                _OvertimeFinalHourUnit = filterAttendanceWithValue[0].finalOverTime_Full_Unit_2;
                            } else {
                                _OvertimeHour = '-';
                                _OvertimeHourUnit = '-';
                                _OvertimeFinalHour = filterAttendanceWithValue[0].finalOverTime_Full_With_Early;
                                _OvertimeFinalHourUnit = filterAttendanceWithValue[0].finalOverTime_Full_Unit_2;
                            }

                            if (_OvertimeFinalHourUnit == '0' || _OvertimeFinalHourUnit == '0.0')
                                _OvertimeFinalHourUnit = '-';

                            _Late = filterAttendanceWithValue[0].lateIn;
                            let lateSec = moment.duration(_Late).asSeconds();
                            if (lateSec < 0) {
                                _Late = '-';
                            }

                            if (filterAttendanceWithValue[0].actOutTime != null)
                                _EarlyLeave = filterAttendanceWithValue[0].earlyOutTime;
                            else if (filterAttendanceWithValue[0].actOutTime_Full != null)
                                _EarlyLeave = filterAttendanceWithValue[0].earlyOutTime_Full;
                            else
                                _EarlyLeave = '-';

                            let sec = moment.duration(_EarlyLeave).asSeconds();
                            if (sec < 0) {
                                _EarlyLeave = '-';
                            }
                        }

                        attendanceData[i].data["Day" + _day + ""] = {
                            'Time-In': _InTime,
                            'Break-Out1': _BreakOut1,
                            'Break-In1': _BreakIn1,
                            'Lunch-Out': _LunchOut,
                            'Lunch-In': _LunchIn,
                            'Break-Out2': _BreakOut2,
                            'Break-In2': _BreakIn2,
                            'Time-Out': _TimeOut,
                            'Hours Worked': _HourWorked,
                            'Overtime Hours': _OvertimeHour,
                            'Overtime Hours Unit': _OvertimeHourUnit,
                            'Early Overtime Hours': _EarlyOvertimeHour,
                            'Early Overtime Hours Unit': _EarlyOvertimeHourUnit,
                            'Final Overtime Hours': _OvertimeFinalHour,
                            'Final Overtime Hours Unit': _OvertimeFinalHourUnit,
                            'Late': _Late,
                            'Early Leave': _EarlyLeave,
                            'Leave Applied': _AppliedLeave,
                            'Holiday Status': _HolidayStatus
                        };
                    }
                }
                return {
                    'flag': true,
                    'data': attendanceData
                };
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportMultipleSheet: async (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let SearchEmployeeId = request.body.SearchEmployeeId || '';
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || '';
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || '';
            let SearchEmployerMasterShiftId = request.body.SearchEmployerMasterShiftId || '';

            let SearchFromDate = moment(request.body.SearchFromDate).format("YYYY-MM-DD");
            let SearchToDate = moment(request.body.SearchToDate).format("YYYY-MM-DD");

            let sortBy = request.body.sortBy;

            strwhere += " and employerId = " + employerId;
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + SearchFromDate + "', '%Y-%m-%d') ";
            strwhere += " AND DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + SearchToDate + "', '%Y-%m-%d') ";

            if (SearchEmployeeId != '')
                strwhere += " and employeeId in (" + SearchEmployeeId + ")";
            if (SearchEmployerbranchId != '')
                strwhere += " and employerbranchId in (" + SearchEmployerbranchId + ")";
            if (SearchEmployerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + SearchEmployerdepartmentId + ")";
            if (SearchEmployerMasterShiftId != '')
                strwhere += " and employermastershiftId in (" + SearchEmployerMasterShiftId + ")";

            strwhere += " order by entryDate, _actInTime, " + sortBy;

            let strquery = _clsemployeedailyattendance.data.select_ReportAttendance(strwhere);
            let [strSelectStartEnd1Result, _strSelectStartEnd1Result] = await dbSecurity.asyncResult(strquery);

            if (strSelectStartEnd1Result.length > 0) {
                let totalDay = moment(SearchToDate).diff(moment(SearchFromDate), 'days') + 1;
                const unique = [...new Set(strSelectStartEnd1Result.map(item => item.employeeId))];
                let startEnd1 = [];
                for (let i = 0; i < unique.length; i++) {
                    startEnd1.push({});
                    let filterOverTimeData = strSelectStartEnd1Result.filter(x => x.employeeId == unique[i]);

                    startEnd1[i].Name = filterOverTimeData[0].memberName;
                    startEnd1[i].Branch = filterOverTimeData[0].employerbranchName;
                    startEnd1[i].Department = filterOverTimeData[0].employerdepartmentTitle;
                    startEnd1[i].shiftName = filterOverTimeData[0].shiftName;
                    startEnd1[i].data = [];
                    let count = 0;
                    for (let j = 0; j < totalDay; j++) {
                        let _date = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY");
                        let _date1 = moment(SearchFromDate).add(j, 'days').format("DD-MM-YYYY ddd");

                        let filterStartEnd1DataWithValue = filterOverTimeData.filter(x => x.entryDateDDMMYYYY == _date);
                        if (filterStartEnd1DataWithValue.length > 0) {

                            for (let p = 0; p < filterStartEnd1DataWithValue.length; p++) {
                                startEnd1[i].data.push({});
                                startEnd1[i].data[count].Date = _date1;
                                startEnd1[i].data[count].InTime1 = '-';
                                startEnd1[i].data[count].TimeOut1 = '-';
                                startEnd1[i].data[count].InTime2 = '-';
                                startEnd1[i].data[count].TimeOut2 = '-';
                                if (filterStartEnd1DataWithValue[p].shiftType == "day") {
                                    startEnd1[i].data[count].InTime1 = filterStartEnd1DataWithValue[p].actInTime == null ? '-' : moment(filterStartEnd1DataWithValue[p].actInTime).format("HH:mm");

                                    if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                        startEnd1[i].data[count].TimeOut1 = moment(filterStartEnd1DataWithValue[p].actOutTime).format("HH:mm");
                                    else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                        startEnd1[i].data[count].TimeOut1 = moment(filterStartEnd1DataWithValue[p].actOutTime_Full).format("HH:mm");
                                    else
                                        startEnd1[i].data[count].TimeOut1 = '-';
                                }
                                if (filterStartEnd1DataWithValue[p].shiftType == "night") {


                                    startEnd1[i].data[count].InTime2 = filterStartEnd1DataWithValue[p].actInTime == null ? '-' : moment(filterStartEnd1DataWithValue[p].actInTime).format("HH:mm");

                                    if (filterStartEnd1DataWithValue[p].actOutTime != null)
                                        startEnd1[i].data[count].TimeOut2 = moment(filterStartEnd1DataWithValue[p].actOutTime).format("HH:mm");
                                    else if (filterStartEnd1DataWithValue[p].actOutTime_Full != null)
                                        startEnd1[i].data[count].TimeOut2 = moment(filterStartEnd1DataWithValue[p].actOutTime_Full).format("HH:mm");
                                    else
                                        startEnd1[i].data[count].TimeOut2 = '-';
                                }
                            }
                            count++;
                        } else {
                            startEnd1[i].data.push({});
                            startEnd1[i].data[count].Date = _date1;
                            startEnd1[i].data[count].InTime1 = '-';
                            startEnd1[i].data[count].TimeOut1 = '-';
                            startEnd1[i].data[count].InTime2 = '-';
                            startEnd1[i].data[count].TimeOut2 = '-';
                            count++;
                        }
                    }
                }
                return {
                    'flag': true,
                    'data': startEnd1
                };
            } else {
                return {
                    'flag': false,
                    'data': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    }
};