var method = {};

method.masterData = (request) => {
    let employeeId = request.body.employeeId || 0;
    let memberId = request.body.memberId || 0;
    let employerId = request.body.employerId || 0;
    let employerdepartmentId = request.body.employerdepartmentId || 0;
    let employerbranchId = request.body.employerbranchId || 0;
    let employeeEnroll = request.body.employeeEnroll || '';
    let employeeAlternativeEnroll = request.body.employeeAlternativeEnroll || '';
    let employeeManagerId = request.body.employeeManagerId || '';
    let employerentitlementId = request.body.employerentitlementId || 0;
    let employeeCompanyEmail = request.body.employeeCompanyEmail || '';
    let employeeJoining = request.body.employeeJoining || null;
    let employeeLeaving = request.body.employeeLeaving || null;
    let employeeLimitCategroy = request.body.employeeLimitCategroy || '';
    let employeeLimitEmployee = request.body.employeeLimitEmployee || 0.0;
    let employeeLimitDependent = request.body.employeeLimitDependent || 0.0;
    let employeeVisitLimitEmployee = request.body.employeeVisitLimitEmployee || 0.0;
    let employeeVisitLimitDependent = request.body.employeeVisitLimitDependent || 0.0;
    let employeeVisitAllowed = request.body.employeeVisitAllowed || 0;
    let employeeVisitDuration = request.body.employeeVisitDuration || '';
    let employeeEntitlementRemarks = request.body.employeeEntitlementRemarks || '';
    let employeeDesignation = request.body.employeeDesignation || '';
    let employeeIsCustomEntitled = request.body.employeeIsCustomEntitled || false;
    let employeeIsActive = request.body.employeeIsActive || false;
    let employeeIsMachine = request.body.employeeIsMachine || false;
    let employeeIsFixJoining = request.body.employeeIsFixJoining || false;
    let isMultiShift = request.body.isMultiShift || false;
    let employeeIsManualAttendance = request.body.employeeIsManualAttendance || false;
    let employeeIsMultipleLogin = request.body.employeeIsMultipleLogin || false;
    let employeeType = request.body.employeeType || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeId,
        memberId,
        employerId,
        employerdepartmentId,
        employerbranchId,
        employeeEnroll,
        employeeAlternativeEnroll,
        employeeManagerId,
        employerentitlementId,
        employeeCompanyEmail,
        employeeJoining,
        employeeLeaving,
        employeeLimitCategroy,
        employeeLimitEmployee,
        employeeLimitDependent,
        employeeVisitLimitEmployee,
        employeeVisitLimitDependent,
        employeeVisitAllowed,
        employeeVisitDuration,
        employeeEntitlementRemarks,
        employeeDesignation,
        employeeIsCustomEntitled,
        employeeIsActive,
        employeeIsMachine,
        employeeIsFixJoining,
        isMultiShift,
        employeeIsManualAttendance,
        employeeIsMultipleLogin,
        employeeType,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployee where 1 = 1 " + strwhere;
    return strquery;
};

method.select1 = function (strwhere, selectedFromDate) {
    var strquery = `select *, ((YEAR('` + selectedFromDate + `') - YEAR(employeeJoining)) - (DATE_FORMAT('` + selectedFromDate + `', '%m%d') < DATE_FORMAT(employeeJoining, '%m%d'))) AS diff_years   from tblemployee where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeId,memberId,employerId,employerdepartmentId,employerbranchId,employeeEnroll,employeeAlternativeEnroll,employeeManagerId,employerentitlementId,employeeCompanyEmail,employeeJoining,employeeLeaving,employeeLimitCategroy,employeeLimitEmployee,employeeLimitDependent,employeeVisitLimitEmployee,employeeVisitLimitDependent,employeeVisitAllowed,employeeVisitDuration,employeeEntitlementRemarks,employeeDesignation,employeeIsCustomEntitled,employeeIsActive,employeeIsMachine,employeeIsFixJoining,isMultiShift,employeeIsMultipleLogin,employeeIsManualAttendance,employeeType,createdBy,createdDate from tblemployee where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployee where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployee where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployee where 1 = 1 and employeeId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployee where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employeeJoining == null) pera.employeeJoining = null;
    else pera.employeeJoining = "'" + pera.employeeJoining + "'";

    if (pera.employeeLeaving == null) pera.employeeLeaving = null;
    else pera.employeeLeaving = "'" + pera.employeeLeaving + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployee (memberId, employerId, employerdepartmentId, employerbranchId, employeeEnroll, employeeAlternativeEnroll, employeeManagerId, employerentitlementId, employeeCompanyEmail, employeeJoining, employeeLeaving, employeeLimitCategroy, employeeLimitEmployee, employeeLimitDependent, employeeVisitLimitEmployee, employeeVisitLimitDependent, employeeVisitAllowed, employeeVisitDuration, employeeEntitlementRemarks, employeeDesignation, employeeIsCustomEntitled, employeeIsActive, employeeIsMachine, employeeIsFixJoining, isMultiShift, employeeIsMultipleLogin, employeeIsManualAttendance, employeeType, createdBy, createdDate) values ('" + pera.memberId + "', '" + pera.employerId + "', '" + pera.employerdepartmentId + "', '" + pera.employerbranchId + "', '" + pera.employeeEnroll + "', '" + pera.employeeAlternativeEnroll + "', '" + pera.employeeManagerId + "', '" + pera.employerentitlementId + "', '" + pera.employeeCompanyEmail + "', " + pera.employeeJoining + ", " + pera.employeeLeaving + ", '" + pera.employeeLimitCategroy + "', '" + pera.employeeLimitEmployee + "', '" + pera.employeeLimitDependent + "', '" + pera.employeeVisitLimitEmployee + "', '" + pera.employeeVisitLimitDependent + "', '" + pera.employeeVisitAllowed + "', '" + pera.employeeVisitDuration + "', '" + pera.employeeEntitlementRemarks + "', '" + pera.employeeDesignation + "', " + pera.employeeIsCustomEntitled + ", " + pera.employeeIsActive + ", " + pera.employeeIsMachine + ", " + pera.employeeIsFixJoining + ", " + pera.isMultiShift + ", " + pera.employeeIsMultipleLogin + ", " + pera.employeeIsManualAttendance + ", '" + pera.employeeType + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployee (memberId, employerId, employerdepartmentId, employerbranchId, employeeEnroll, employeeAlternativeEnroll, employeeManagerId, employerentitlementId, employeeCompanyEmail, employeeJoining, employeeLeaving, employeeLimitCategroy, employeeLimitEmployee, employeeLimitDependent, employeeVisitLimitEmployee, employeeVisitLimitDependent, employeeVisitAllowed, employeeVisitDuration, employeeEntitlementRemarks, employeeDesignation, employeeIsCustomEntitled, employeeIsActive, employeeIsMachine, employeeIsFixJoining, isMultiShift, employeeIsMultipleLogin, employeeIsManualAttendance, employeeType, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employeeJoining == null) pera.employeeJoining = null;
    else pera.employeeJoining = "'" + pera.employeeJoining + "'";

    if (pera.employeeLeaving == null) pera.employeeLeaving = null;
    else pera.employeeLeaving = "'" + pera.employeeLeaving + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployee set memberId = '" + pera.memberId + "', employerId = '" + pera.employerId + "', employerdepartmentId = '" + pera.employerdepartmentId + "', employerbranchId = '" + pera.employerbranchId + "', employeeEnroll = '" + pera.employeeEnroll + "', employeeAlternativeEnroll = '" + pera.employeeAlternativeEnroll + "', employeeManagerId = '" + pera.employeeManagerId + "', employerentitlementId = '" + pera.employerentitlementId + "', employeeCompanyEmail = '" + pera.employeeCompanyEmail + "', employeeJoining = " + pera.employeeJoining + ", employeeLeaving = " + pera.employeeLeaving + ", employeeLimitCategroy = '" + pera.employeeLimitCategroy + "', employeeLimitEmployee = '" + pera.employeeLimitEmployee + "', employeeLimitDependent = '" + pera.employeeLimitDependent + "', employeeVisitLimitEmployee = '" + pera.employeeVisitLimitEmployee + "', employeeVisitLimitDependent = '" + pera.employeeVisitLimitDependent + "', employeeVisitAllowed = '" + pera.employeeVisitAllowed + "', employeeVisitDuration = '" + pera.employeeVisitDuration + "', employeeEntitlementRemarks = '" + pera.employeeEntitlementRemarks + "', employeeDesignation = '" + pera.employeeDesignation + "', employeeIsCustomEntitled = " + pera.employeeIsCustomEntitled + ", employeeIsActive = " + pera.employeeIsActive + ", employeeIsMachine = " + pera.employeeIsMachine + ", employeeIsFixJoining = " + pera.employeeIsFixJoining + ", isMultiShift = " + pera.isMultiShift + ", employeeIsMultipleLogin = " + pera.employeeIsMultipleLogin + ", employeeIsManualAttendance = " + pera.employeeIsManualAttendance + ", employeeType = '" + pera.employeeType + "' ,createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeId = '" + pera.employeeId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployee set " + column + " where employeeId = " + id + " ";
    return strquery;
};

//.

method.updateColumnFromEnroll = function (column, id) {
    var strquery = "update tblemployee set " + column + " where employeeEnroll = '" + id + "'";
    return strquery;
};

method.select_view_employee = function (strwhere) {
    var strquery = "select * from view_employee where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employee = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employee where 1=1 " + strwhere;
    return strquery;
};

method.select_calculate_Joining = function (strwhere, selectedFromDate) {
    var strquery = `select *, 
                    (startYearDate + INTERVAL 1 YEAR) - INTERVAL 1 DAY AS endYearDate, 
                    TIMESTAMPDIFF(MONTH, startYearDate, '` + selectedFromDate + `') AS earnMonth 
                    from 
                    (select *, 
                    CASE 
                    WHEN (diff_years > 0) THEN (employeeJoining + INTERVAL diff_years YEAR) 
                    ELSE employeeJoining END  AS startYearDate 
                    from 
                    (select employerId, employeeId, memberId, employeeJoining, 
                    ((YEAR('` + selectedFromDate + `') - YEAR(employeeJoining)) - (DATE_FORMAT('` + selectedFromDate + `', '%m%d') < DATE_FORMAT(employeeJoining, '%m%d'))) AS diff_years 
                    from tblemployee) AS firstDate) AS secondDate where 1 = 1` + strwhere;
    return strquery;
};

method.select_calculate_Year = function (strwhere, year) {
    var strquery = `select *,
                    (startYearDate + INTERVAL 1 YEAR) - INTERVAL 1 DAY AS endYearDate
                    from 
                    (select *, 
                    CASE WHEN (` + year + ` > 0) THEN (employeeJoining + INTERVAL ` + year + ` YEAR) ELSE employeeJoining END  AS startYearDate 
                    from 
                    (select employerId, employeeId, memberId, employeeJoining from tblemployee) AS firstDate) AS secondDate WHERE 1 = 1 ` + strwhere;
    return strquery;
};

method.select_employeeshift = function (strwhere) {
    var strquery = `select * from (select d.employerbranchId,a.employeeId, a.memberId,a.employerId,a.employeeEnroll,a.employeeIsActive,a.isMultiShift, a.employeeIsManualAttendance, b.shiftName,b.weeklyHour,b.dayHour,
                    b.halfHour,b.inTime,b.rangeInTime1,b.rangeInTime2,b.allowLateInTime,b.outTime,b.rangeOutTime1,b.rangeOutTime2,b.allowEarlyOutTime,b.overtimeStartTime,
                    b.outTime_Full,b.rangeOutTime1_Full,b.rangeOutTime2_Full,b.allowEarlyOutTime_Full,b.overtimeStartTime_Full,b.lunchInTime,b.rangelunchInTime1,b.rangelunchInTime2,
                    b.lunchOutTime,b.rangelunchOutTime1,b.rangelunchOutTime2,b.breakInTime1,b.rangebreakInTime1_1,b.rangebreakInTime1_2,b.breakOutTime1,b.rangebreakOutTime1_1,
                    b.rangebreakOutTime1_2,b.breakInTime2,b.rangebreakInTime2_1,b.rangebreakInTime2_2,b.breakOutTime2,b.rangebreakOutTime2_1,b.rangebreakOutTime2_2,
                    b.isOverTime30,b.isOverTime60,b.isOverTimeEarly30,b.isOverTimeEarly60,b.isMonday,b.isTuesday,b.isWednesday,b.isThursday,b.isFriday,b.isSaturday,b.isSunday,b.mondayType,b.tuesdayType,b.wednesdayType,
                    b.thursdayType,b.fridayType,b.saturdayType, b.sundayType, b.shifttype, c.employermastershiftid 
                    from 
                    tblemployee as a 
                    inner join tblemployeeassignshift AS c on a.employeeId = c.employeeId and a.employerId = c.employerId
                    inner join tblemployermastershift as b on c.employermastershiftid = b.employermastershiftid 
                    inner join view_employee AS d ON a.employeeId = d.employeeId) as data 
                    where 1 = 1 and employeeisactive = true ` + strwhere;
    return strquery;
};

exports.data = method;