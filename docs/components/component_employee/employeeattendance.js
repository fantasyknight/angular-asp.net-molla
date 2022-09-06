let moment = require("moment");

/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployeeattendance = require("../../modules/model_employee/clsemployeeattendance");
const _clsemployee = require("../../modules/model_employee/clsemployee");
const _clsemployeedailyattendance = require("../../modules/model_employee/clsemployeedailyattendance");
const _clsemployerholiday = require("../../modules/model_employer/clsemployerholiday");
const _clscompanyauth = require("../../modules/model_backoffice/clscompanyauth");

function daysPermission(params, currentDate) {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let dayName = days[new Date(currentDate).getDay()];

    let _isMonday = params.isMonday[0] == 0 ? false : true;
    let _isTuesday = params.isTuesday[0] == 0 ? false : true;
    let _isWednesday = params.isWednesday[0] == 0 ? false : true;
    let _isThursday = params.isThursday[0] == 0 ? false : true;
    let _isFriday = params.isFriday[0] == 0 ? false : true;
    let _isSaturday = params.isSaturday[0] == 0 ? false : true;
    let _isSunday = params.isSunday[0] == 0 ? false : true;
    let _mondayType = params.mondayType;
    let _tuesdayType = params.tuesdayType;
    let _wednesdayType = params.wednesdayType;
    let _thursdayType = params.thursdayType;
    let _fridayType = params.fridayType;
    let _saturdayType = params.saturdayType;
    let _sundayType = params.sundayType;

    if (dayName == 'Monday') {
        return {
            'flag': _isMonday,
            'type': _mondayType
        };
    }
    if (dayName == 'Tuesday') {
        return {
            'flag': _isTuesday,
            'type': _tuesdayType
        };
    }
    if (dayName == 'Wednesday') {
        return {
            'flag': _isWednesday,
            'type': _wednesdayType
        };
    }
    if (dayName == 'Thursday') {
        return {
            'flag': _isThursday,
            'type': _thursdayType
        };
    }
    if (dayName == 'Friday') {
        return {
            'flag': _isFriday,
            'type': _fridayType
        };
    }
    if (dayName == 'Saturday') {
        return {
            'flag': _isSaturday,
            'type': _saturdayType
        };
    }
    if (dayName == 'Sunday') {
        return {
            'flag': _isSunday,
            'type': _sundayType
        };
    }
}

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

            let strquery = _clsemployeeattendance.data.select("");
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

            let verb = _clsemployeeattendance.data.masterData(request);
            let strquery = _clsemployeeattendance.data.select(" and employeeattendanceId = " + verb.employeeattendanceId);
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

            let SearchEmployeeId = request.body.SearchEmployeeId;
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId;
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId;
            let SearchFromDate = request.body.SearchFromDate;
            let SearchToDate = request.body.SearchToDate;

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployerbranchId != "")
                strwhere += " and employerbranchId = " + SearchEmployerbranchId;
            if (SearchEmployerdepartmentId != "")
                strwhere += " and employerdepartmentId = " + SearchEmployerdepartmentId;
            if (SearchEmployeeId != "")
                strwhere += " and employeeId = " + SearchEmployeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') >= DATE_FORMAT('" + moment(SearchFromDate).format("YYYY-MM-DD") + "' ,'%Y-%m-%d')";
            strwhere += " and DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') <= DATE_FORMAT('" + moment(SearchToDate).format("YYYY-MM-DD") + "' ,'%Y-%m-%d')";
            strwhere += " order by employeeattendanceEntryTime desc ";

            let strquery = _clsemployeeattendance.data.select_view_employeeattendance(strwhere + strlimit);
            let strcount = _clsemployeeattendance.data.getcount_view_employeeattendance(strwhere);

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

            let verb = _clsemployeeattendance.data.masterData(request);
            let strquery = _clsemployeeattendance.data.delete(verb.employeeattendanceId);

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

            let verb = _clsemployeeattendance.data.masterData(request);
            let strquery = _clsemployeeattendance.data.insert(verb);

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

            let verb = _clsemployeeattendance.data.masterData(request);
            let strquery = _clsemployeeattendance.data.update(verb);

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

    dbGetDates: (startDate, stopDate) => {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    },

    //. Single Shift Calculation
    dbCalculateAndTransferSingleShift: async (employerId, branchId, fromDate, toDate) => {
        try {

            let dailyAttendanceData = [];

            let strWhereShift = '';
            strWhereShift += ' and employerId = ' + employerId;
            strWhereShift += ' and isMultiShift = false ';
            if (branchId != 0)
                strWhereShift += ' and employerbranchId = ' + branchId;
            let employeeData = _clsemployee.data.select_employeeshift(strWhereShift);

            let [strEmployeeData, _strEmployeeData] = await dbSecurity.asyncResult(employeeData);
            if (strEmployeeData.length > 0) {
                let strWhereAttendace = '';
                let employeeenrolls = [...new Set(strEmployeeData.map(item => "'" + item.employeeEnroll + "'"))];

                strWhereAttendace += " and employeeEnroll in (" + employeeenrolls.toString() + ")";
                strWhereAttendace += " and DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d')";
                strWhereAttendace += " and DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d')";
                let attendanceData = _clsemployeeattendance.data.select(strWhereAttendace + " order by employeeattendanceEntryTime asc ");

                let [strAttendanceData, _strAttendanceData] = await dbSecurity.asyncResult(attendanceData);
                if (strAttendanceData.length > 0) {

                    /* filter holiday leave */
                    let strWhereHoliday = '';
                    strWhereHoliday += " and employerId =  " + employerId;
                    strWhereHoliday += " and DATE_FORMAT(holidayDate,'%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d')";
                    strWhereHoliday += " and DATE_FORMAT(holidayDate,'%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d')";
                    let strSelectHoliday = _clsemployerholiday.data.select(strWhereHoliday);
                    let [strSelectHolidayResult, _strSelectHolidayResult] = await dbSecurity.asyncResult(strSelectHoliday);

                    for (let i = 0; i < strEmployeeData.length; i++) {

                        let attendaceData = {};
                        let _employeeId = strEmployeeData[i].employeeId;
                        let _employerId = strEmployeeData[i].employerId;
                        let _enrollNo = strEmployeeData[i].employeeEnroll;
                        let _weeklyHour = strEmployeeData[i].weeklyHour;
                        let _fullHour = strEmployeeData[i].dayHour;
                        let _halfHour = strEmployeeData[i].halfHour || 0;
                        let _isOverTime30 = strEmployeeData[i].isOverTime30;
                        let _isOverTime60 = strEmployeeData[i].isOverTime60;
                        let shiftType = strEmployeeData[i].shifttype;
                        let employermastershiftid = strEmployeeData[i].employermastershiftid;
                        let _isOverTimeEarly30 = strEmployeeData[i].isOverTimeEarly30;
                        let _isOverTimeEarly60 = strEmployeeData[i].isOverTimeEarly60;

                        //todo Assign section 1
                        attendaceData.employeeId = _employeeId;
                        attendaceData.employerId = _employerId;
                        attendaceData.employeeEnroll = _enrollNo;
                        attendaceData.weeklyHour = _weeklyHour;
                        attendaceData.dayHour = _fullHour;
                        attendaceData.halfHour = _halfHour;
                        attendaceData.isOverTime30 = _isOverTime30[0] == 0 ? false : true;
                        attendaceData.isOverTime60 = _isOverTime60[0] == 0 ? false : true;
                        attendaceData.isOverTimeEarly30 = _isOverTimeEarly30[0] == 0 ? false : true;
                        attendaceData.isOverTimeEarly60 = _isOverTimeEarly60[0] == 0 ? false : true;
                        /* InTime Setting */
                        let _inTime = strEmployeeData[i].inTime;
                        let _lateInTime = strEmployeeData[i].allowLateInTime;
                        let _rangeinTime1 = strEmployeeData[i].rangeInTime1;
                        let _rangeinTime2 = strEmployeeData[i].rangeInTime2;
                        //todo Assign section 2
                        attendaceData.inTime = _inTime == null ? null : moment(_inTime).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.lateInTime = _lateInTime == null ? null : moment(_lateInTime).format("YYYY-MM-DD HH:mm:ss");
                        /* OutTime Setting */
                        let outTime_Full = strEmployeeData[i].outTime_Full;
                        let allowEarlyOutTime_Full = strEmployeeData[i].allowEarlyOutTime_Full;
                        let rangeOutTime1_Full = strEmployeeData[i].rangeOutTime1_Full;
                        let rangeOutTime2_Full = strEmployeeData[i].rangeOutTime2_Full;
                        //todo Assign section 3
                        attendaceData.outTime_Full = outTime_Full == null ? null : moment(outTime_Full).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.allowEarlyOutTime_Full = allowEarlyOutTime_Full == null ? null : moment(allowEarlyOutTime_Full).format("YYYY-MM-DD HH:mm:ss");
                        /* HalfTime Setting */
                        let _outTime = strEmployeeData[i].outTime;
                        let _earlyOutTime = strEmployeeData[i].allowEarlyOutTime;
                        let _rangeoutTime1 = strEmployeeData[i].rangeOutTime1;
                        let _rangeoutTime2 = strEmployeeData[i].rangeOutTime2;
                        //todo Assign section 3.1
                        attendaceData.outTime = _outTime == null ? null : moment(_outTime).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.earlyOutTime = _earlyOutTime == null ? null : moment(_earlyOutTime).format("YYYY-MM-DD HH:mm:ss");
                        /* LunchTime Setting */
                        /* 1. */
                        let _lunchInTime = strEmployeeData[i].lunchInTime;
                        let _rangelunchInTime1 = strEmployeeData[i].rangelunchInTime1;
                        let _rangelunchInTime2 = strEmployeeData[i].rangelunchInTime2;
                        /* 2. */
                        let _lunchOutTime = strEmployeeData[i].lunchOutTime;
                        let _rangelunchOutTime1 = strEmployeeData[i].rangelunchOutTime1;
                        let _rangelunchOutTime2 = strEmployeeData[i].rangelunchOutTime2;
                        //todo Assign section 4
                        attendaceData.lunchInTime = _lunchInTime == null ? null : moment(_lunchInTime).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.lunchOutTime = _lunchOutTime == null ? null : moment(_lunchOutTime).format("YYYY-MM-DD HH:mm:ss");
                        /* BreakTime Setting */
                        /* 1. */
                        let _breakInTime1 = strEmployeeData[i].breakInTime1;
                        let _rangebreakInTime1_1 = strEmployeeData[i].rangebreakInTime1_1;
                        let _rangebreakInTime1_2 = strEmployeeData[i].rangebreakInTime1_2;
                        let _breakOutTime1 = strEmployeeData[i].breakOutTime1;
                        let _rangebreakOutTime1_1 = strEmployeeData[i].rangebreakOutTime1_1;
                        let _rangebreakOutTime1_2 = strEmployeeData[i].rangebreakOutTime1_2;
                        /* 2. */
                        let _breakInTime2 = strEmployeeData[i].breakInTime2;
                        let _rangebreakInTime2_1 = strEmployeeData[i].rangebreakInTime2_1;
                        let _rangebreakInTime2_2 = strEmployeeData[i].rangebreakInTime2_2;
                        let _breakOutTime2 = strEmployeeData[i].breakOutTime2;
                        let _rangebreakOutTime2_1 = strEmployeeData[i].rangebreakOutTime2_1;
                        let _rangebreakOutTime2_2 = strEmployeeData[i].rangebreakOutTime2_2;
                        //todo Assign section 5
                        attendaceData.breakInTime1 = _breakInTime1 == null ? null : moment(_breakInTime1).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.breakOutTime1 = _breakOutTime1 == null ? null : moment(_breakOutTime1).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.breakInTime2 = _breakInTime2 == null ? null : moment(_breakInTime2).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.breakOutTime2 = _breakOutTime2 == null ? null : moment(_breakOutTime2).format("YYYY-MM-DD HH:mm:ss");
                        /* OverTime Setting */
                        let _overtimeStartTime = strEmployeeData[i].overtimeStartTime;
                        let _overtimeStartTime_Full = strEmployeeData[i].overtimeStartTime_Full;
                        //todo Assign section 6
                        attendaceData.overtimeStartTime = _overtimeStartTime == null ? null : moment(_overtimeStartTime).format("YYYY-MM-DD HH:mm:ss");
                        attendaceData.overtimeStartTime_Full = _overtimeStartTime_Full == null ? null : moment(_overtimeStartTime_Full).format("YYYY-MM-DD HH:mm:ss");

                        /* Attendance Records */
                        let _entryDate = [];
                        let attendaceDataOnEnrollNo = strAttendanceData.filter(x => x.employeeEnroll == _enrollNo);
                        if (shiftType == 'day') {
                            let _filterDate = self.dbGetDates(fromDate, toDate);
                            if (_filterDate.length > 0) {
                                for (let j = 0; j < _filterDate.length; j++) {
                                    let entryDate = {};
                                    let filteredAttendance = attendaceDataOnEnrollNo.filter(x => x.entryDate == _filterDate[j]);
                                    let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateYYYYMMDD == _filterDate[j]);
                                    let permission = daysPermission(strEmployeeData[i], _filterDate[j]);
                                    if (filterHoliday.length > 0) permission.type = 'holiday';
                                    entryDate.entryDate = _filterDate[j];

                                    if (filteredAttendance.length > 0) {
                                        entryDate.dayType = permission.type;
                                        entryDate.employermastershiftid = employermastershiftid;
                                        //#region In-Time
                                        let _filterInTime = [];
                                        if (_rangeinTime1 != null && _rangeinTime2 != null) {
                                            _filterInTime = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangeinTime1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangeinTime2).format("HH:mm")
                                            );
                                        }
                                        if (_filterInTime.length > 0) {
                                            let _inTime = _filterInTime[0];
                                            entryDate.actInTime = moment(_inTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actInTime = null;
                                        //#endregion

                                        //#region Lunch-In
                                        let _filterLunchIn = [];
                                        if (permission.type == 'full' && _rangelunchInTime1 != null && _rangelunchInTime2 != null) {
                                            _filterLunchIn = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangelunchInTime1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangelunchInTime2).format("HH:mm")
                                            );
                                        }
                                        if (_filterLunchIn.length > 0) {
                                            let _lunchIn = _filterLunchIn[0];
                                            entryDate.actLunchInTime = moment(_lunchIn.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actLunchInTime = null;
                                        //#endregion

                                        //#region Lunch-Out
                                        let _filterLunchOut = [];
                                        if (permission.type == 'full' && _rangelunchOutTime1 != null && _rangelunchOutTime2 != null) {
                                            _filterLunchOut = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangelunchOutTime1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangelunchOutTime2).format("HH:mm")
                                            );
                                        }
                                        if (_filterLunchOut.length > 0) {
                                            let _lunchOut = _filterLunchOut[_filterLunchOut.length - 1];
                                            entryDate.actLunchOutTime = moment(_lunchOut.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actLunchOutTime = null;
                                        //#endregion

                                        //#region Break-In
                                        let _filterBreakIn = [];
                                        if (permission.type == 'full' && _rangebreakInTime1_1 != null && _rangebreakInTime1_2 != null) {
                                            _filterBreakIn = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangebreakInTime1_1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangebreakInTime1_2).format("HH:mm")
                                            );
                                        }
                                        if (_filterBreakIn.length > 0) {
                                            let _breakIn = _filterBreakIn[0];
                                            entryDate.actBreakInTime1 = moment(_breakIn.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actBreakInTime1 = null;
                                        //#endregion

                                        //#region Break-Out
                                        let _filterBreakOut = [];
                                        if (permission.type == 'full' && _rangebreakOutTime1_1 != null && _rangebreakOutTime1_2 != null) {
                                            _filterBreakOut = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangebreakOutTime1_1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangebreakOutTime1_2).format("HH:mm")
                                            );
                                        }
                                        if (_filterBreakOut.length > 0) {
                                            let _breakOut = _filterBreakOut[_filterBreakOut.length - 1];
                                            entryDate.actBreakOutTime1 = moment(_breakOut.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actBreakOutTime1 = null;
                                        //#endregion

                                        //#region Break-In 1
                                        let _filterBreakIn1 = [];
                                        if (permission.type == 'full' && _rangebreakInTime2_1 != null && _rangebreakInTime2_2 != null) {
                                            _filterBreakIn1 = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangebreakInTime2_1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangebreakInTime2_2).format("HH:mm")
                                            );
                                        }
                                        if (_filterBreakIn1.length > 0) {
                                            let _breakIn1 = _filterBreakIn1[0];
                                            entryDate.actBreakInTime2 = moment(_breakIn1.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actBreakInTime2 = null;
                                        //#endregion

                                        //#region Break-Out 1
                                        let _filterBreakOut1 = [];
                                        if (permission.type == 'full' && _rangebreakOutTime2_1 != null && _rangebreakOutTime2_2 != null) {
                                            _filterBreakOut1 = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangebreakOutTime2_1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangebreakOutTime2_2).format("HH:mm")
                                            );
                                        }
                                        if (_filterBreakOut1.length > 0) {
                                            let _breakOut1 = _filterBreakOut1[_filterBreakOut1.length - 1];
                                            entryDate.actBreakOutTime2 = moment(_breakOut1.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actBreakOutTime2 = null;
                                        //#endregion

                                        //#region Out-Time
                                        let _filterOutTime_Full = [];
                                        if (permission.type == 'full' && rangeOutTime1_Full != null && rangeOutTime2_Full != null) {
                                            _filterOutTime_Full = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(rangeOutTime1_Full).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(rangeOutTime2_Full).format("HH:mm")
                                            );
                                        }
                                        if (_filterOutTime_Full.length > 0) {
                                            let _outTime = _filterOutTime_Full[_filterOutTime_Full.length - 1];
                                            entryDate.actOutTime_Full = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actOutTime_Full = null;
                                        //#endregion

                                        //#region Half Out-Time
                                        let _filterOutTime = [];
                                        if (permission.type == 'half' && _rangeoutTime1 != null && _rangeoutTime2 != null) {
                                            _filterOutTime = filteredAttendance.filter(x =>
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangeoutTime1).format("HH:mm") &&
                                                moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangeoutTime2).format("HH:mm")
                                            );
                                        }
                                        if (_filterOutTime.length > 0) {
                                            let _outTime = _filterOutTime[_filterOutTime.length - 1];
                                            entryDate.actOutTime = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        } else
                                            entryDate.actOutTime = null;
                                        //#endregion

                                        //#region Offday Out-Time
                                        if (permission.type == 'off' || permission.type == 'holiday') {
                                            let _outTime = filteredAttendance[filteredAttendance.length - 1];
                                            entryDate.actOutTime_Full = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                        }
                                        _entryDate.push(entryDate);
                                        //#endregion
                                    } else {
                                        entryDate.dayType = permission.type;
                                        entryDate.employermastershiftid = employermastershiftid;
                                        entryDate.actInTime = null;
                                        entryDate.actLunchInTime = null;
                                        entryDate.actLunchOutTime = null;
                                        entryDate.actBreakInTime1 = null;
                                        entryDate.actBreakOutTime1 = null;
                                        entryDate.actBreakInTime2 = null;
                                        entryDate.actBreakOutTime2 = null;
                                        entryDate.actOutTime_Full = null;
                                        entryDate.actOutTime = null;
                                        _entryDate.push(entryDate);
                                    }
                                }
                                attendaceData.machineData = _entryDate;
                                dailyAttendanceData.push(attendaceData);
                            }
                        }
                        if (shiftType == 'night') {
                            if (attendaceDataOnEnrollNo.length > 0) {
                                let _filterDate = self.dbGetDates(fromDate, toDate);
                                if (_filterDate.length > 0) {

                                    for (let j = 0; j < _filterDate.length - 1; j++) {
                                        let entryDate = {};
                                        let currentDate = moment(_filterDate[j]).format("YYYY-MM-DD");
                                        let nextDate = moment(currentDate).add(1, 'days').format("YYYY-MM-DD");
                                        let filteredAttendance = attendaceDataOnEnrollNo.filter(x => x.entryDate == _filterDate[j] || x.entryDate == nextDate);
                                        let filterHoliday = strSelectHolidayResult.filter(x => x.holidayDateYYYYMMDD == _filterDate[j]);
                                        let permission = daysPermission(strEmployeeData[i], _filterDate[j]);
                                        if (filterHoliday.length > 0) permission.type = 'holiday';
                                        entryDate.entryDate = _filterDate[j];

                                        if (filteredAttendance.length > 0) {
                                            entryDate.dayType = permission.type;
                                            entryDate.employermastershiftid = employermastershiftid;
                                            //#region In-Time
                                            let _filterInTime = [];
                                            if (_rangeinTime1 != null && _rangeinTime2 != null) {
                                                _filterInTime = filteredAttendance.filter(x =>
                                                    moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangeinTime1).format("HH:mm") &&
                                                    moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangeinTime2).format("HH:mm")
                                                );
                                            }
                                            if (_filterInTime.length > 0) {
                                                let _inTime = _filterInTime[0];
                                                entryDate.actInTime = moment(_inTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                            } else
                                                entryDate.actInTime = null;
                                            //#endregion
                                            entryDate.actLunchInTime = null;
                                            entryDate.actLunchOutTime = null;
                                            entryDate.actBreakInTime1 = null;
                                            entryDate.actBreakOutTime1 = null;
                                            entryDate.actBreakInTime2 = null;
                                            entryDate.actBreakOutTime2 = null;
                                            //#region Out-Time
                                            let _filterOutTime_Full = [];
                                            if (rangeOutTime1_Full != null && rangeOutTime2_Full != null) {
                                                _filterOutTime_Full = filteredAttendance.filter(x =>
                                                    moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(rangeOutTime1_Full).format("HH:mm") &&
                                                    moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(rangeOutTime2_Full).format("HH:mm")
                                                );
                                            }
                                            if (_filterOutTime_Full.length > 0) {
                                                let _outTime = _filterOutTime_Full[_filterOutTime_Full.length - 1];
                                                entryDate.actOutTime_Full = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                            } else
                                                entryDate.actOutTime_Full = null;
                                            //#endregion
                                            entryDate.actOutTime = null;
                                            //#region Offday Out-Time
                                            if (permission.type == 'off' || permission.type == 'holiday') {
                                                let _outTime = filteredAttendance[filteredAttendance.length - 1];
                                                entryDate.actOutTime_Full = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                            }
                                            _entryDate.push(entryDate);
                                            //#endregion
                                        } else {
                                            entryDate.dayType = permission.type;
                                            entryDate.employermastershiftid = employermastershiftid;
                                            entryDate.actInTime = null;
                                            entryDate.actLunchInTime = null;
                                            entryDate.actLunchOutTime = null;
                                            entryDate.actBreakInTime1 = null;
                                            entryDate.actBreakOutTime1 = null;
                                            entryDate.actBreakInTime2 = null;
                                            entryDate.actBreakOutTime2 = null;
                                            entryDate.actOutTime_Full = null;
                                            entryDate.actOutTime = null;
                                            _entryDate.push(entryDate);
                                        }
                                    }
                                    attendaceData.machineData = _entryDate;
                                    dailyAttendanceData.push(attendaceData);
                                }
                            }
                        }
                    }
                    if (dailyAttendanceData.length > 0) {
                        let _strWhereAttendace = '';
                        let employeeIds = [...new Set(strEmployeeData.map(item => item.employeeId))];
                        _strWhereAttendace += " and employerId  = " + employerId + " and employeeId in (" + employeeIds.toString() + ")";
                        _strWhereAttendace += " and DATE_FORMAT(entryDate,'%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d')";
                        _strWhereAttendace += " and DATE_FORMAT(entryDate,'%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d')";

                        let strAttendanceRemove = _clsemployeedailyattendance.data.deleteString(_strWhereAttendace);
                        let strAttendanceInsert = _clsemployeedailyattendance.data.insertString();

                        for (let p = 0; p < dailyAttendanceData.length; p++) {
                            let _machineData = dailyAttendanceData[p].machineData;
                            if (_machineData.length > 0) {
                                for (let k = 0; k < _machineData.length; k++) {

                                    let strActInTime = null;
                                    let strActOutTime = null;
                                    let strActOutTime_Full = null;
                                    let strActLunchInTime = null;
                                    let strActLunchOutTime = null;
                                    let strActBreakInTime1 = null;
                                    let strActBreakOutTime1 = null;
                                    let strActBreakInTime2 = null;
                                    let strActBreakOutTime2 = null;

                                    let strLunchInTime = null;
                                    let strLunchOutTime = null;
                                    let strBreakInTime1 = null;
                                    let strBreakOutTime1 = null;
                                    let strBreakInTime2 = null;
                                    let strBreakOutTime2 = null;

                                    let strInTime = null;
                                    let strLateInTime = null;
                                    let strOutTime = null;
                                    let strEarlyOutTime = null;
                                    let strOvertimeStartTime = null;
                                    let strOutTime_Full = null;
                                    let strAllowEarlyOutTime_Full = null;
                                    let strOvertimeStartTime_Full = null;

                                    /* machine Data */
                                    if (dailyAttendanceData[p].inTime != null) strInTime = "'" + dailyAttendanceData[p].inTime + "'";
                                    if (dailyAttendanceData[p].lateInTime != null) strLateInTime = "'" + dailyAttendanceData[p].lateInTime + "'";
                                    if (dailyAttendanceData[p].outTime != null) strOutTime = "'" + dailyAttendanceData[p].outTime + "'";
                                    if (dailyAttendanceData[p].earlyOutTime != null) strEarlyOutTime = "'" + dailyAttendanceData[p].earlyOutTime + "'";
                                    if (dailyAttendanceData[p].overtimeStartTime != null) strOvertimeStartTime = "'" + dailyAttendanceData[p].overtimeStartTime + "'";
                                    if (dailyAttendanceData[p].outTime_Full != null) strOutTime_Full = "'" + dailyAttendanceData[p].outTime_Full + "'";
                                    if (dailyAttendanceData[p].allowEarlyOutTime_Full != null) strAllowEarlyOutTime_Full = "'" + dailyAttendanceData[p].allowEarlyOutTime_Full + "'";
                                    if (dailyAttendanceData[p].overtimeStartTime_Full != null) strOvertimeStartTime_Full = "'" + dailyAttendanceData[p].overtimeStartTime_Full + "'";

                                    if (dailyAttendanceData[p].lunchInTime != null) strLunchInTime = "'" + dailyAttendanceData[p].lunchInTime + "'";
                                    if (dailyAttendanceData[p].lunchOutTime != null) strLunchOutTime = "'" + dailyAttendanceData[p].lunchOutTime + "'";
                                    if (dailyAttendanceData[p].breakInTime1 != null) strBreakInTime1 = "'" + dailyAttendanceData[p].breakInTime1 + "'";
                                    if (dailyAttendanceData[p].breakOutTime1 != null) strBreakOutTime1 = "'" + dailyAttendanceData[p].breakOutTime1 + "'";
                                    if (dailyAttendanceData[p].breakInTime2 != null) strBreakInTime2 = "'" + dailyAttendanceData[p].breakInTime2 + "'";
                                    if (dailyAttendanceData[p].breakOutTime2 != null) strBreakOutTime2 = "'" + dailyAttendanceData[p].breakOutTime2 + "'";

                                    /* manual Data */
                                    if (_machineData[k].actInTime != null) strActInTime = "'" + _machineData[k].actInTime + "'";
                                    if (_machineData[k].actOutTime != null) strActOutTime = "'" + _machineData[k].actOutTime + "'";
                                    if (_machineData[k].actOutTime_Full != null) strActOutTime_Full = "'" + _machineData[k].actOutTime_Full + "'";
                                    if (_machineData[k].actLunchInTime != null) strActLunchInTime = "'" + _machineData[k].actLunchInTime + "'";
                                    if (_machineData[k].actLunchOutTime != null) strActLunchOutTime = "'" + _machineData[k].actLunchOutTime + "'";
                                    if (_machineData[k].actBreakInTime1 != null) strActBreakInTime1 = "'" + _machineData[k].actBreakInTime1 + "'";
                                    if (_machineData[k].actBreakOutTime1 != null) strActBreakOutTime1 = "'" + _machineData[k].actBreakOutTime1 + "'";
                                    if (_machineData[k].actBreakInTime2 != null) strActBreakInTime2 = "'" + _machineData[k].actBreakInTime2 + "'";
                                    if (_machineData[k].actBreakOutTime2 != null) strActBreakOutTime2 = "'" + _machineData[k].actBreakOutTime2 + "'";

                                    strAttendanceInsert += "(" +
                                        dailyAttendanceData[p].employeeId + ", " +
                                        dailyAttendanceData[p].employerId + ",'" +
                                        _machineData[k].entryDate + "' ,'" +
                                        dailyAttendanceData[p].weeklyHour + "' , '" +
                                        dailyAttendanceData[p].dayHour + "','" +
                                        dailyAttendanceData[p].halfHour + "' , " +
                                        strInTime + "," +
                                        strLateInTime + " , " +
                                        strOutTime + "," +
                                        strEarlyOutTime + " ," +
                                        strOvertimeStartTime + " ," +
                                        strOutTime_Full + " ," +
                                        strAllowEarlyOutTime_Full + " ," +
                                        strOvertimeStartTime_Full + " , " +
                                        strLunchInTime + ", " +
                                        strLunchOutTime + ", " +
                                        strBreakInTime1 + ", " +
                                        strBreakOutTime1 + "," +
                                        strBreakInTime2 + " ," +
                                        strBreakOutTime2 + " ," +
                                        dailyAttendanceData[p].isOverTime30 + " ," +
                                        dailyAttendanceData[p].isOverTime60 + " ," +
                                        strActInTime + " , " +
                                        strActOutTime + ", " +
                                        strActOutTime_Full + ", " +
                                        strActLunchInTime + ", " +
                                        strActLunchOutTime + ", " +
                                        strActBreakInTime1 + ", " +
                                        strActBreakOutTime1 + ", " +
                                        strActBreakInTime2 + ", " +
                                        strActBreakOutTime2 + ", '" +
                                        _machineData[k].dayType + "', " +
                                        _machineData[k].employermastershiftid + "," +
                                        dailyAttendanceData[p].isOverTimeEarly30 + ", " +
                                        dailyAttendanceData[p].isOverTimeEarly60 + " ),";
                                }
                            }
                        }
                        let [strAttendanceRemoveResult, _strAttendanceRemoveResult] = await dbSecurity.asyncResult(strAttendanceRemove);
                        strAttendanceInsert = strAttendanceInsert.slice(0, -1);
                        let [strAttendanceInsertResult, _strAttendanceInsertResult] = await dbSecurity.asyncResult(strAttendanceInsert);
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }
    },

    //. Multiple Shift Calculation
    dbCalculateAndTransferMultipleShift: async (employerId, branchId, fromDate, toDate) => {
        try {

            let dailyAttendanceData = [];

            let strWhereShift = '';
            strWhereShift += ' and employerId = ' + employerId;
            strWhereShift += ' and isMultiShift = true ';
            if (branchId != 0)
                strWhereShift += ' and employerbranchId = ' + branchId;

            let employeeData = _clsemployee.data.select_employeeshift(strWhereShift);
            let [strEmployeeData, _strEmployeeData] = await dbSecurity.asyncResult(employeeData);
            if (strEmployeeData.length > 0) {

                let _listOfEnroll = [...new Set(strEmployeeData.map(item => "'" + item.employeeEnroll + "'"))];
                let listOfEnroll = [...new Set(strEmployeeData.map(item => item.employeeEnroll))];

                let strWhereAttendace = '';
                strWhereAttendace += " and employeeEnroll in (" + _listOfEnroll.toString() + ")";
                strWhereAttendace += " and DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d')";
                strWhereAttendace += " and DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d')";
                let attendanceData = _clsemployeeattendance.data.select(strWhereAttendace + " order by employeeattendanceEntryTime asc ");
                let [strAttendanceData, _strAttendanceData] = await dbSecurity.asyncResult(attendanceData);

                if (listOfEnroll.length > 0) {
                    for (let i = 0; i < listOfEnroll.length; i++) {
                        let filterShift = strEmployeeData.filter(x => x.employeeEnroll == listOfEnroll[i]);
                        let attendaceDataOnEnrollNo = strAttendanceData.filter(x => x.employeeEnroll == listOfEnroll[i]);

                        if (attendaceDataOnEnrollNo.length > 0) {
                            let _filterDate = self.dbGetDates(fromDate, toDate);
                            if (_filterDate.length > 0) {
                                for (let j = 0; j < _filterDate.length; j++) {
                                    let currentDate = moment(_filterDate[j]).format("YYYY-MM-DD");
                                    let nextDate = moment(currentDate).add(1, 'days').format("YYYY-MM-DD");
                                    if (filterShift.length > 0) {
                                        for (let k = 0; k < filterShift.length; k++) {
                                            let entryDate = {};

                                            let _employeeId = filterShift[k].employeeId;
                                            let _employerId = filterShift[k].employerId;
                                            let _enrollNo = filterShift[k].employeeEnroll;
                                            let _weeklyHour = filterShift[k].weeklyHour;
                                            let _fullHour = filterShift[k].dayHour;
                                            let _halfHour = filterShift[k].halfHour || 0;
                                            let _isOverTime30 = filterShift[k].isOverTime30;
                                            let _isOverTime60 = filterShift[k].isOverTime60;
                                            let shiftType = filterShift[k].shifttype;
                                            let employermastershiftid = filterShift[k].employermastershiftid;
                                            let _isOverTimeEarly30 = filterShift[k].isOverTimeEarly30;
                                            let _isOverTimeEarly60 = filterShift[k].isOverTimeEarly60;

                                            entryDate.employeeId = _employeeId;
                                            entryDate.employerId = _employerId;
                                            entryDate.employeeEnroll = _enrollNo;
                                            entryDate.weeklyHour = _weeklyHour;
                                            entryDate.dayHour = _fullHour;
                                            entryDate.halfHour = _halfHour;
                                            entryDate.isOverTime30 = _isOverTime30[0] == 0 ? false : true;
                                            entryDate.isOverTime60 = _isOverTime60[0] == 0 ? false : true;
                                            entryDate.isOverTimeEarly30 = _isOverTimeEarly30[0] == 0 ? false : true;
                                            entryDate.isOverTimeEarly60 = _isOverTimeEarly60[0] == 0 ? false : true;

                                            entryDate.entryDate = currentDate;
                                            if (shiftType == 'day') {
                                                entryDate.employermastershiftid = employermastershiftid;
                                                let filteredAttendance = attendaceDataOnEnrollNo.filter(x => x.entryDate == currentDate);
                                                /* InTime Setting */
                                                let _inTime = filterShift[k].inTime;
                                                let _lateInTime = filterShift[k].allowLateInTime;
                                                let _rangeinTime1 = filterShift[k].rangeInTime1;
                                                let _rangeinTime2 = filterShift[k].rangeInTime2;
                                                entryDate.inTime = _inTime == null ? null : moment(_inTime).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.lateInTime = _lateInTime == null ? null : moment(_lateInTime).format("YYYY-MM-DD HH:mm:ss");
                                                /* OutTime Setting */
                                                let outTime_Full = filterShift[k].outTime_Full;
                                                let allowEarlyOutTime_Full = filterShift[k].allowEarlyOutTime_Full;
                                                let rangeOutTime1_Full = filterShift[k].rangeOutTime1_Full;
                                                let rangeOutTime2_Full = filterShift[k].rangeOutTime2_Full;
                                                entryDate.outTime_Full = outTime_Full == null ? null : moment(outTime_Full).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.allowEarlyOutTime_Full = allowEarlyOutTime_Full == null ? null : moment(allowEarlyOutTime_Full).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.outTime = null;
                                                entryDate.earlyOutTime = null;
                                                entryDate.lunchInTime = null;
                                                entryDate.lunchOutTime = null;
                                                entryDate.breakInTime1 = null;
                                                entryDate.breakOutTime1 = null;
                                                entryDate.breakInTime2 = null;
                                                entryDate.breakOutTime2 = null;
                                                let _overtimeStartTime = filterShift[k].overtimeStartTime;
                                                let _overtimeStartTime_Full = filterShift[k].overtimeStartTime_Full;
                                                entryDate.overtimeStartTime = _overtimeStartTime == null ? null : moment(_overtimeStartTime).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.overtimeStartTime_Full = _overtimeStartTime_Full == null ? null : moment(_overtimeStartTime_Full).format("YYYY-MM-DD HH:mm:ss");
                                                //#region In-Time
                                                let _filterInTime = [];
                                                if (_rangeinTime1 != null && _rangeinTime2 != null) {
                                                    _filterInTime = filteredAttendance.filter(x =>
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangeinTime1).format("HH:mm") &&
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangeinTime2).format("HH:mm")
                                                    );
                                                }
                                                if (_filterInTime.length > 0) {
                                                    let _inTime = _filterInTime[0];
                                                    entryDate.actInTime = moment(_inTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                                } else
                                                    entryDate.actInTime = null;
                                                //#endregion
                                                entryDate.actLunchInTime = null;
                                                entryDate.actLunchOutTime = null;
                                                entryDate.actBreakInTime1 = null;
                                                entryDate.actBreakOutTime1 = null;
                                                entryDate.actBreakInTime2 = null;
                                                entryDate.actBreakOutTime2 = null;
                                                //#region Out-Time
                                                let _filterOutTime_Full = [];
                                                if (rangeOutTime1_Full != null && rangeOutTime2_Full != null) {
                                                    _filterOutTime_Full = filteredAttendance.filter(x =>
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(rangeOutTime1_Full).format("HH:mm") &&
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(rangeOutTime2_Full).format("HH:mm")
                                                    );
                                                }
                                                if (_filterOutTime_Full.length > 0) {
                                                    let _outTime = _filterOutTime_Full[_filterOutTime_Full.length - 1];
                                                    entryDate.actOutTime_Full = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                                } else
                                                    entryDate.actOutTime_Full = null;
                                                //#endregion
                                                entryDate.actOutTime = null;
                                                if (entryDate.actOutTime_Full != null && entryDate.actInTime != null)
                                                    dailyAttendanceData.push(entryDate);
                                                //#endregion
                                            }
                                            if (shiftType == 'night') {
                                                let filteredAttendance = attendaceDataOnEnrollNo.filter(x => x.entryDate == currentDate);
                                                entryDate.employermastershiftid = employermastershiftid;
                                                /* InTime Setting */
                                                let _inTime = filterShift[k].inTime;
                                                let _lateInTime = filterShift[k].allowLateInTime;
                                                let _rangeinTime1 = filterShift[k].rangeInTime1;
                                                let _rangeinTime2 = filterShift[k].rangeInTime2;
                                                entryDate.inTime = _inTime == null ? null : moment(_inTime).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.lateInTime = _lateInTime == null ? null : moment(_lateInTime).format("YYYY-MM-DD HH:mm:ss");
                                                /* OutTime Setting */
                                                let outTime_Full = filterShift[k].outTime_Full;
                                                let allowEarlyOutTime_Full = filterShift[k].allowEarlyOutTime_Full;
                                                let rangeOutTime1_Full = filterShift[k].rangeOutTime1_Full;
                                                let rangeOutTime2_Full = filterShift[k].rangeOutTime2_Full;
                                                entryDate.outTime_Full = outTime_Full == null ? null : moment(outTime_Full).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.allowEarlyOutTime_Full = allowEarlyOutTime_Full == null ? null : moment(allowEarlyOutTime_Full).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.outTime = null;
                                                entryDate.earlyOutTime = null;
                                                entryDate.lunchInTime = null;
                                                entryDate.lunchOutTime = null;
                                                entryDate.breakInTime1 = null;
                                                entryDate.breakOutTime1 = null;
                                                entryDate.breakInTime2 = null;
                                                entryDate.breakOutTime2 = null;

                                                let _overtimeStartTime = filterShift[k].overtimeStartTime;
                                                let _overtimeStartTime_Full = filterShift[k].overtimeStartTime_Full;
                                                entryDate.overtimeStartTime = _overtimeStartTime == null ? null : moment(_overtimeStartTime).format("YYYY-MM-DD HH:mm:ss");
                                                entryDate.overtimeStartTime_Full = _overtimeStartTime_Full == null ? null : moment(_overtimeStartTime_Full).format("YYYY-MM-DD HH:mm:ss");

                                                //#region In-Time
                                                let _filterInTime = [];
                                                if (_rangeinTime1 != null && _rangeinTime2 != null) {
                                                    _filterInTime = filteredAttendance.filter(x =>
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(_rangeinTime1).format("HH:mm") &&
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(_rangeinTime2).format("HH:mm")
                                                    );
                                                }
                                                if (_filterInTime.length > 0) {
                                                    let _inTime = _filterInTime[0];
                                                    entryDate.actInTime = moment(_inTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                                } else
                                                    entryDate.actInTime = null;
                                                //#endregion
                                                entryDate.actLunchInTime = null;
                                                entryDate.actLunchOutTime = null;
                                                entryDate.actBreakInTime1 = null;
                                                entryDate.actBreakOutTime1 = null;
                                                entryDate.actBreakInTime2 = null;
                                                entryDate.actBreakOutTime2 = null;
                                                //#region Out-Time
                                                filteredAttendance = attendaceDataOnEnrollNo.filter(x => x.entryDate == nextDate);
                                                let _filterOutTime_Full = [];
                                                if (rangeOutTime1_Full != null && rangeOutTime2_Full != null) {
                                                    _filterOutTime_Full = filteredAttendance.filter(x =>
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") >= moment(rangeOutTime1_Full).format("HH:mm") &&
                                                        moment(x.employeeattendanceEntryTime).format("HH:mm") <= moment(rangeOutTime2_Full).format("HH:mm")
                                                    );
                                                }
                                                if (_filterOutTime_Full.length > 0) {
                                                    let _outTime = _filterOutTime_Full[_filterOutTime_Full.length - 1];
                                                    entryDate.actOutTime_Full = moment(_outTime.employeeattendanceEntryTime).format("YYYY-MM-DD HH:mm:ss");
                                                } else
                                                    entryDate.actOutTime_Full = null;
                                                //#endregion
                                                entryDate.actOutTime = null;
                                                if (entryDate.actOutTime_Full != null && entryDate.actInTime != null)
                                                    dailyAttendanceData.push(entryDate);
                                                //#endregion
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (dailyAttendanceData.length > 0) {
                    let _strWhereAttendace = '';
                    let employeeIds = [...new Set(strEmployeeData.map(item => item.employeeId))];
                    _strWhereAttendace += " and employerId  = " + employerId + " and employeeId in (" + employeeIds.toString() + ")";
                    _strWhereAttendace += " and DATE_FORMAT(entryDate,'%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d')";
                    _strWhereAttendace += " and DATE_FORMAT(entryDate,'%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d')";

                    let strAttendanceRemove = _clsemployeedailyattendance.data.deleteString(_strWhereAttendace);
                    let strAttendanceInsert = _clsemployeedailyattendance.data.insertString();
                    for (let p = 0; p < dailyAttendanceData.length; p++) {

                        let strActInTime = null;
                        let strActOutTime = null;
                        let strActOutTime_Full = null;
                        let strActLunchInTime = null;
                        let strActLunchOutTime = null;
                        let strActBreakInTime1 = null;
                        let strActBreakOutTime1 = null;
                        let strActBreakInTime2 = null;
                        let strActBreakOutTime2 = null;

                        let strLunchInTime = null;
                        let strLunchOutTime = null;
                        let strBreakInTime1 = null;
                        let strBreakOutTime1 = null;
                        let strBreakInTime2 = null;
                        let strBreakOutTime2 = null;

                        let strInTime = null;
                        let strLateInTime = null;
                        let strOutTime = null;
                        let strEarlyOutTime = null;
                        let strOvertimeStartTime = null;
                        let strOutTime_Full = null;
                        let strAllowEarlyOutTime_Full = null;
                        let strOvertimeStartTime_Full = null;

                        /* machine Data */
                        if (dailyAttendanceData[p].inTime != null) strInTime = "'" + dailyAttendanceData[p].inTime + "'";
                        if (dailyAttendanceData[p].lateInTime != null) strLateInTime = "'" + dailyAttendanceData[p].lateInTime + "'";
                        if (dailyAttendanceData[p].outTime != null) strOutTime = "'" + dailyAttendanceData[p].outTime + "'";
                        if (dailyAttendanceData[p].earlyOutTime != null) strEarlyOutTime = "'" + dailyAttendanceData[p].earlyOutTime + "'";
                        if (dailyAttendanceData[p].overtimeStartTime != null) strOvertimeStartTime = "'" + dailyAttendanceData[p].overtimeStartTime + "'";
                        if (dailyAttendanceData[p].outTime_Full != null) strOutTime_Full = "'" + dailyAttendanceData[p].outTime_Full + "'";
                        if (dailyAttendanceData[p].allowEarlyOutTime_Full != null) strAllowEarlyOutTime_Full = "'" + dailyAttendanceData[p].allowEarlyOutTime_Full + "'";
                        if (dailyAttendanceData[p].overtimeStartTime_Full != null) strOvertimeStartTime_Full = "'" + dailyAttendanceData[p].overtimeStartTime_Full + "'";

                        if (dailyAttendanceData[p].lunchInTime != null) strLunchInTime = "'" + dailyAttendanceData[p].lunchInTime + "'";
                        if (dailyAttendanceData[p].lunchOutTime != null) strLunchOutTime = "'" + dailyAttendanceData[p].lunchOutTime + "'";
                        if (dailyAttendanceData[p].breakInTime1 != null) strBreakInTime1 = "'" + dailyAttendanceData[p].breakInTime1 + "'";
                        if (dailyAttendanceData[p].breakOutTime1 != null) strBreakOutTime1 = "'" + dailyAttendanceData[p].breakOutTime1 + "'";
                        if (dailyAttendanceData[p].breakInTime2 != null) strBreakInTime2 = "'" + dailyAttendanceData[p].breakInTime2 + "'";
                        if (dailyAttendanceData[p].breakOutTime2 != null) strBreakOutTime2 = "'" + dailyAttendanceData[p].breakOutTime2 + "'";

                        /* manual Data */
                        if (dailyAttendanceData[p].actInTime != null) strActInTime = "'" + dailyAttendanceData[p].actInTime + "'";
                        if (dailyAttendanceData[p].actOutTime != null) strActOutTime = "'" + dailyAttendanceData[p].actOutTime + "'";
                        if (dailyAttendanceData[p].actOutTime_Full != null) strActOutTime_Full = "'" + dailyAttendanceData[p].actOutTime_Full + "'";
                        if (dailyAttendanceData[p].actLunchInTime != null) strActLunchInTime = "'" + dailyAttendanceData[p].actLunchInTime + "'";
                        if (dailyAttendanceData[p].actLunchOutTime != null) strActLunchOutTime = "'" + dailyAttendanceData[p].actLunchOutTime + "'";
                        if (dailyAttendanceData[p].actBreakInTime1 != null) strActBreakInTime1 = "'" + dailyAttendanceData[p].actBreakInTime1 + "'";
                        if (dailyAttendanceData[p].actBreakOutTime1 != null) strActBreakOutTime1 = "'" + dailyAttendanceData[p].actBreakOutTime1 + "'";
                        if (dailyAttendanceData[p].actBreakInTime2 != null) strActBreakInTime2 = "'" + dailyAttendanceData[p].actBreakInTime2 + "'";
                        if (dailyAttendanceData[p].actBreakOutTime2 != null) strActBreakOutTime2 = "'" + dailyAttendanceData[p].actBreakOutTime2 + "'";

                        strAttendanceInsert += "(" +
                            dailyAttendanceData[p].employeeId + ", " +
                            dailyAttendanceData[p].employerId + ",'" +
                            dailyAttendanceData[p].entryDate + "' ,'" +
                            dailyAttendanceData[p].weeklyHour + "' , '" +
                            dailyAttendanceData[p].dayHour + "','" +
                            dailyAttendanceData[p].halfHour + "' , " +
                            strInTime + "," +
                            strLateInTime + " , " +
                            strOutTime + "," +
                            strEarlyOutTime + " ," +
                            strOvertimeStartTime + " ," +
                            strOutTime_Full + " ," +
                            strAllowEarlyOutTime_Full + " ," +
                            strOvertimeStartTime_Full + " , " +
                            strLunchInTime + ", " +
                            strLunchOutTime + ", " +
                            strBreakInTime1 + ", " +
                            strBreakOutTime1 + "," +
                            strBreakInTime2 + " ," +
                            strBreakOutTime2 + " ," +
                            dailyAttendanceData[p].isOverTime30 + " ," +
                            dailyAttendanceData[p].isOverTime60 + " ," +
                            strActInTime + " , " +
                            strActOutTime + ", " +
                            strActOutTime_Full + ", " +
                            strActLunchInTime + ", " +
                            strActLunchOutTime + ", " +
                            strActBreakInTime1 + ", " +
                            strActBreakOutTime1 + ", " +
                            strActBreakInTime2 + ", " +
                            strActBreakOutTime2 + ", 'full', " +
                            dailyAttendanceData[p].employermastershiftid + ", " +
                            dailyAttendanceData[p].isOverTimeEarly30 + " , " +
                            dailyAttendanceData[p].isOverTimeEarly60 + " ),";
                    }
                    let [strAttendanceRemoveResult, _strAttendanceRemoveResult] = await dbSecurity.asyncResult(strAttendanceRemove);
                    strAttendanceInsert = strAttendanceInsert.slice(0, -1);
                    let [strAttendanceInsertResult, _strAttendanceInsertResult] = await dbSecurity.asyncResult(strAttendanceInsert);
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    dbCalculateAndTransfer: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let fromDate = request.body.fromDate;
            let toDate = request.body.toDate;
            let branchId = request.body.branchId || 0;

            let _singleShift = await self.dbCalculateAndTransferSingleShift(employerId, branchId, fromDate, toDate);
            let _multipleShift = await self.dbCalculateAndTransferMultipleShift(employerId, branchId, fromDate, toDate);

            return {
                'flag': true,
                'query': "Execution completed successfully!"
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message + "Execution failed!"
            };
        }
    },

    dbInsertToCloud: async (request, response) => {

        const pool = await dbSecurity.asyncDbConnection();
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            let rquDate = new Date(request.body.currentDate);
            let serialNumber = request.body.serialNumber;

            let DeviceData = JSON.parse(request.body.DeviceData);

            if (DeviceData.length > 0) {
                for (let i = 0; i < DeviceData.length; i++) {
                    DeviceData[i].pattern = DeviceData[i].employeeNoString.slice(0, 5);
                }
            }

            const _enrollNoPattern = DeviceData.map(x => "'" + x.pattern + "'");
            let valueOfEnrollNo = [...new Set(_enrollNoPattern)];

            let companyAuth = _clscompanyauth.data.select(" and LEFT(enrollNoPattern, 5) IN (" + valueOfEnrollNo.toString() + ") ");
            const [strcompanyAuthResult, _strcompanyAuthResult] = await connection.query(companyAuth);

            if (strcompanyAuthResult.length > 0) {
                for (let p = 0; p < strcompanyAuthResult.length; p++) {
                    strcompanyAuthResult[p].enrollNoPattern1 = strcompanyAuthResult[p].enrollNoPattern.slice(0, 5);
                }
            }

            const _valueOfEmployerId = strcompanyAuthResult.map(x => "'" + x.employerId + "'");
            let valueOfEmployerId = [...new Set(_valueOfEmployerId)];

            if (DeviceData.length > 0) {

                let currentDateString = moment(rquDate).format("YYYY-MM-DD");

                const enrollNoList = DeviceData.map(x => "'" + x.employeeNoString + "'");
                let valueOfEnroll = [...new Set(enrollNoList)];
                //! remove data from database base on date and enrollno..
                let strRemoveData = `delete from tblemployeeattendance where 1=1 
                                    and employeeEnroll in (` + valueOfEnroll.toString() + `) 
                                    and DATE_FORMAT(employeeattendanceEntryTime,'%d/%m/%Y') = DATE_FORMAT('` + currentDateString + `', '%d/%m/%Y') 
                                    and employeeattendanceStatus = '` + serialNumber + `'
                                    and employerId in (` + valueOfEmployerId.toString() + `)`;

                const [strRemoveDataResult, _strRemoveDataResult] = await connection.query(strRemoveData);

                strInsertData = 'insert into tblemployeeattendance (employerId, employeeEnroll, employeeattendanceStatus, employeeattendanceEntryTime, isManual, createdBy) values ';

                for (let i = 0; i < DeviceData.length; i++) {

                    if (i != 0)
                        strInsertData += ",";

                    let employeeNoString = DeviceData[i].employeeNoString;

                    let match = employeeNoString.slice(0, 5);
                    let result = strcompanyAuthResult.filter(x => x.enrollNoPattern1 == match);
                    let employerId = result[0].employerId;

                    let stringDate = moment(DeviceData[i].time).format("YYYY-MM-DD HH:mm:ss");

                    strInsertData += "(" + employerId + ",'" + employeeNoString + "','" + serialNumber + "','" + stringDate + "', false, 00)";
                }

                const [strInsertDataResult, _strInsertDataResult] = await connection.query(strInsertData);

                await connection.commit();
                connection.release();
                connection.destroy();

                return "Success";
            }

        } catch (error) {
            await connection.rollback();
            connection.release();
            connection.destroy();
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbBulkUploadExcel: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let rowAttendanceData = JSON.parse(request.body.rowData);

            if (rowAttendanceData.length > 0) {

                let strSelectEmployee = _clsemployee.data.select(" and employerId = " + employerId);
                let [strSelectEmployeeResult, _strSelectEmployeeResult] = await dbSecurity.asyncResult(strSelectEmployee);

                let strInsetDeviceEntry = _clsemployeeattendance.data.insertString();
                if (strSelectEmployeeResult.length > 0) {
                    for (let i = 0; i < strSelectEmployeeResult.length; i++) {

                        let enrollmentNo = strSelectEmployeeResult[i].employeeEnroll;
                        let filterAttendance = rowAttendanceData.filter(x => x.EnrollmentNo == enrollmentNo);

                        if (filterAttendance.length > 0) {
                            for (let j = 0; j < filterAttendance.length; j++) {

                                let _enrollmentNo = filterAttendance[j].EnrollmentNo;
                                let _entryDateTime = moment(filterAttendance[j].DateTime).format("YYYY-MM-DD HH:mm:ss");

                                strInsetDeviceEntry += "(" + employerId + ", '" + _enrollmentNo + "', '', '" + _entryDateTime + "', true, 0, now()),";
                            }
                        }
                    }
                    strInsetDeviceEntry = strInsetDeviceEntry.slice(0, -1);
                    let [strInsetDeviceEntryResult, _strInsetDeviceEntryResult] = await dbSecurity.asyncResult(strInsetDeviceEntry);

                    return {
                        'flag': true,
                        'query': "Done"
                    };
                } else {

                    return {
                        'flag': false,
                        'query': "No data"
                    };
                }

            } else {
                return {
                    'flag': false,
                    'query': "No data"
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};