var method = {};

method.masterData = (request) => {
    let employeeDailyAttendanceId = request.body.employeeDailyAttendanceId || 0;
    let employeeId = request.body.employeeId || 0;
    let employerId = request.body.employerId || 0;
    let entryDate = request.body.entryDate || null;
    let weeklyHour = request.body.weeklyHour || '';
    let dayHour = request.body.dayHour || '';
    let halfHour = request.body.halfHour || 0;
    let inTime = request.body.inTime || null;
    let allowLateInTime = request.body.allowLateInTime || null;
    let outTime = request.body.outTime || null;
    let allowEarlyOutTime = request.body.allowEarlyOutTime || null;
    let overtimeStartTime = request.body.overtimeStartTime || null;
    let outTime_Full = request.body.outTime_Full || null;
    let allowEarlyOutTime_Full = request.body.allowEarlyOutTime_Full || null;
    let overtimeStartTime_Full = request.body.overtimeStartTime_Full || null;
    let lunchInTime = request.body.lunchInTime || null;
    let lunchOutTime = request.body.lunchOutTime || null;
    let breakInTime1 = request.body.breakInTime1 || null;
    let breakOutTime1 = request.body.breakOutTime1 || null;
    let breakInTime2 = request.body.breakInTime2 || null;
    let breakOutTime2 = request.body.breakOutTime2 || null;
    let isOverTime30 = request.body.isOverTime30 || false;
    let isOverTime60 = request.body.isOverTime60 || false;
    let actInTime = request.body.actInTime || null;
    let actOutTime = request.body.actOutTime || null;
    let actOutTime_Full = request.body.actOutTime_Full || null;
    let actLunchInTime = request.body.actLunchInTime || null;
    let actLunchOutTime = request.body.actLunchOutTime || null;
    let actBreakInTime1 = request.body.actBreakInTime1 || null;
    let actBreakOutTime1 = request.body.actBreakOutTime1 || null;
    let actBreakInTime2 = request.body.actBreakInTime2 || null;
    let actBreakOutTime2 = request.body.actBreakOutTime2 || null;
    let dayType = request.body.dayType || '';
    let employermastershiftid = request.body.employermastershiftid || 0;
    let isOverTimeEarly30 = request.body.isOverTimeEarly30 || false;
    let isOverTimeEarly60 = request.body.isOverTimeEarly60 || false;
    return {
        employeeDailyAttendanceId,
        employeeId,
        employerId,
        entryDate,
        weeklyHour,
        dayHour,
        halfHour,
        inTime,
        allowLateInTime,
        outTime,
        allowEarlyOutTime,
        overtimeStartTime,
        outTime_Full,
        allowEarlyOutTime_Full,
        overtimeStartTime_Full,
        lunchInTime,
        lunchOutTime,
        breakInTime1,
        breakOutTime1,
        breakInTime2,
        breakOutTime2,
        isOverTime30,
        isOverTime60,
        actInTime,
        actOutTime,
        actOutTime_Full,
        actLunchInTime,
        actLunchOutTime,
        actBreakInTime1,
        actBreakOutTime1,
        actBreakInTime2,
        actBreakOutTime2,
        dayType,
        employermastershiftid,
        isOverTimeEarly30,
        isOverTimeEarly60
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeedailyattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeDailyAttendanceId,employeeId,employerId,entryDate,weeklyHour,dayHour,halfHour,inTime,allowLateInTime,outTime,allowEarlyOutTime,overtimeStartTime,outTime_Full,allowEarlyOutTime_Full,overtimeStartTime_Full,lunchInTime,lunchOutTime,breakInTime1,breakOutTime1,breakInTime2,breakOutTime2,isOverTime30,isOverTime60,actInTime,actOutTime,actOutTime_Full,actLunchInTime,actLunchOutTime,actBreakInTime1,actBreakOutTime1,actBreakInTime2,actBreakOutTime2,dayType,employermastershiftid, isOverTimeEarly30, isOverTimeEarly60 from tblemployeedailyattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeedailyattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeedailyattendance where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeedailyattendance where 1 = 1 and employeeDailyAttendanceId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeedailyattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.entryDate == null) pera.entryDate = null;
    else pera.entryDate = "'" + pera.entryDate + "'";

    if (pera.inTime == null) pera.inTime = null;
    else pera.inTime = "'" + pera.inTime + "'";

    if (pera.allowLateInTime == null) pera.allowLateInTime = null;
    else pera.allowLateInTime = "'" + pera.allowLateInTime + "'";

    if (pera.outTime == null) pera.outTime = null;
    else pera.outTime = "'" + pera.outTime + "'";

    if (pera.allowEarlyOutTime == null) pera.allowEarlyOutTime = null;
    else pera.allowEarlyOutTime = "'" + pera.allowEarlyOutTime + "'";

    if (pera.overtimeStartTime == null) pera.overtimeStartTime = null;
    else pera.overtimeStartTime = "'" + pera.overtimeStartTime + "'";

    if (pera.outTime_Full == null) pera.outTime_Full = null;
    else pera.outTime_Full = "'" + pera.outTime_Full + "'";

    if (pera.allowEarlyOutTime_Full == null) pera.allowEarlyOutTime_Full = null;
    else pera.allowEarlyOutTime_Full = "'" + pera.allowEarlyOutTime_Full + "'";

    if (pera.overtimeStartTime_Full == null) pera.overtimeStartTime_Full = null;
    else pera.overtimeStartTime_Full = "'" + pera.overtimeStartTime_Full + "'";

    if (pera.lunchInTime == null) pera.lunchInTime = null;
    else pera.lunchInTime = "'" + pera.lunchInTime + "'";

    if (pera.lunchOutTime == null) pera.lunchOutTime = null;
    else pera.lunchOutTime = "'" + pera.lunchOutTime + "'";

    if (pera.breakInTime1 == null) pera.breakInTime1 = null;
    else pera.breakInTime1 = "'" + pera.breakInTime1 + "'";

    if (pera.breakOutTime1 == null) pera.breakOutTime1 = null;
    else pera.breakOutTime1 = "'" + pera.breakOutTime1 + "'";

    if (pera.breakInTime2 == null) pera.breakInTime2 = null;
    else pera.breakInTime2 = "'" + pera.breakInTime2 + "'";

    if (pera.breakOutTime2 == null) pera.breakOutTime2 = null;
    else pera.breakOutTime2 = "'" + pera.breakOutTime2 + "'";

    if (pera.actInTime == null) pera.actInTime = null;
    else pera.actInTime = "'" + pera.actInTime + "'";

    if (pera.actOutTime == null) pera.actOutTime = null;
    else pera.actOutTime = "'" + pera.actOutTime + "'";

    if (pera.actOutTime_Full == null) pera.actOutTime_Full = null;
    else pera.actOutTime_Full = "'" + pera.actOutTime_Full + "'";

    if (pera.actLunchInTime == null) pera.actLunchInTime = null;
    else pera.actLunchInTime = "'" + pera.actLunchInTime + "'";

    if (pera.actLunchOutTime == null) pera.actLunchOutTime = null;
    else pera.actLunchOutTime = "'" + pera.actLunchOutTime + "'";

    if (pera.actBreakInTime1 == null) pera.actBreakInTime1 = null;
    else pera.actBreakInTime1 = "'" + pera.actBreakInTime1 + "'";

    if (pera.actBreakOutTime1 == null) pera.actBreakOutTime1 = null;
    else pera.actBreakOutTime1 = "'" + pera.actBreakOutTime1 + "'";

    if (pera.actBreakInTime2 == null) pera.actBreakInTime2 = null;
    else pera.actBreakInTime2 = "'" + pera.actBreakInTime2 + "'";

    if (pera.actBreakOutTime2 == null) pera.actBreakOutTime2 = null;
    else pera.actBreakOutTime2 = "'" + pera.actBreakOutTime2 + "'";

    var strquery = "insert into tblemployeedailyattendance (employeeId, employerId, entryDate, weeklyHour, dayHour, halfHour, inTime, allowLateInTime, outTime, allowEarlyOutTime, overtimeStartTime, outTime_Full, allowEarlyOutTime_Full, overtimeStartTime_Full, lunchInTime, lunchOutTime, breakInTime1, breakOutTime1, breakInTime2, breakOutTime2, isOverTime30, isOverTime60, actInTime, actOutTime, actOutTime_Full, actLunchInTime, actLunchOutTime, actBreakInTime1, actBreakOutTime1, actBreakInTime2, actBreakOutTime2, dayType, employermastershiftid, isOverTimeEarly30, isOverTimeEarly60) values ('" + pera.employeeId + "', '" + pera.employerId + "', " + pera.entryDate + ", '" + pera.weeklyHour + "', '" + pera.dayHour + "', '" + pera.halfHour + "', " + pera.inTime + ", " + pera.allowLateInTime + ", " + pera.outTime + ", " + pera.allowEarlyOutTime + ", " + pera.overtimeStartTime + ", " + pera.outTime_Full + ", " + pera.allowEarlyOutTime_Full + ", " + pera.overtimeStartTime_Full + ", " + pera.lunchInTime + ", " + pera.lunchOutTime + ", " + pera.breakInTime1 + ", " + pera.breakOutTime1 + ", " + pera.breakInTime2 + ", " + pera.breakOutTime2 + ", " + pera.isOverTime30 + ", " + pera.isOverTime60 + ", " + pera.actInTime + ", " + pera.actOutTime + ", " + pera.actOutTime_Full + ", " + pera.actLunchInTime + ", " + pera.actLunchOutTime + ", " + pera.actBreakInTime1 + ", " + pera.actBreakOutTime1 + ", " + pera.actBreakInTime2 + ", " + pera.actBreakOutTime2 + ", '" + pera.dayType + "', '" + pera.employermastershiftid + "', " + pera.isOverTimeEarly30 + ", " + pera.isOverTimeEarly60 + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeedailyattendance (employeeId, employerId, entryDate, weeklyHour, dayHour, halfHour, inTime, allowLateInTime, outTime, allowEarlyOutTime, overtimeStartTime, outTime_Full, allowEarlyOutTime_Full, overtimeStartTime_Full, lunchInTime, lunchOutTime, breakInTime1, breakOutTime1, breakInTime2, breakOutTime2, isOverTime30, isOverTime60, actInTime, actOutTime, actOutTime_Full, actLunchInTime, actLunchOutTime, actBreakInTime1, actBreakOutTime1, actBreakInTime2, actBreakOutTime2, dayType, employermastershiftid, isOverTimeEarly30, isOverTimeEarly60) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.entryDate == null) pera.entryDate = null;
    else pera.entryDate = "'" + pera.entryDate + "'";

    if (pera.inTime == null) pera.inTime = null;
    else pera.inTime = "'" + pera.inTime + "'";

    if (pera.allowLateInTime == null) pera.allowLateInTime = null;
    else pera.allowLateInTime = "'" + pera.allowLateInTime + "'";

    if (pera.outTime == null) pera.outTime = null;
    else pera.outTime = "'" + pera.outTime + "'";

    if (pera.allowEarlyOutTime == null) pera.allowEarlyOutTime = null;
    else pera.allowEarlyOutTime = "'" + pera.allowEarlyOutTime + "'";

    if (pera.overtimeStartTime == null) pera.overtimeStartTime = null;
    else pera.overtimeStartTime = "'" + pera.overtimeStartTime + "'";

    if (pera.outTime_Full == null) pera.outTime_Full = null;
    else pera.outTime_Full = "'" + pera.outTime_Full + "'";

    if (pera.allowEarlyOutTime_Full == null) pera.allowEarlyOutTime_Full = null;
    else pera.allowEarlyOutTime_Full = "'" + pera.allowEarlyOutTime_Full + "'";

    if (pera.overtimeStartTime_Full == null) pera.overtimeStartTime_Full = null;
    else pera.overtimeStartTime_Full = "'" + pera.overtimeStartTime_Full + "'";

    if (pera.lunchInTime == null) pera.lunchInTime = null;
    else pera.lunchInTime = "'" + pera.lunchInTime + "'";

    if (pera.lunchOutTime == null) pera.lunchOutTime = null;
    else pera.lunchOutTime = "'" + pera.lunchOutTime + "'";

    if (pera.breakInTime1 == null) pera.breakInTime1 = null;
    else pera.breakInTime1 = "'" + pera.breakInTime1 + "'";

    if (pera.breakOutTime1 == null) pera.breakOutTime1 = null;
    else pera.breakOutTime1 = "'" + pera.breakOutTime1 + "'";

    if (pera.breakInTime2 == null) pera.breakInTime2 = null;
    else pera.breakInTime2 = "'" + pera.breakInTime2 + "'";

    if (pera.breakOutTime2 == null) pera.breakOutTime2 = null;
    else pera.breakOutTime2 = "'" + pera.breakOutTime2 + "'";

    if (pera.actInTime == null) pera.actInTime = null;
    else pera.actInTime = "'" + pera.actInTime + "'";

    if (pera.actOutTime == null) pera.actOutTime = null;
    else pera.actOutTime = "'" + pera.actOutTime + "'";

    if (pera.actOutTime_Full == null) pera.actOutTime_Full = null;
    else pera.actOutTime_Full = "'" + pera.actOutTime_Full + "'";

    if (pera.actLunchInTime == null) pera.actLunchInTime = null;
    else pera.actLunchInTime = "'" + pera.actLunchInTime + "'";

    if (pera.actLunchOutTime == null) pera.actLunchOutTime = null;
    else pera.actLunchOutTime = "'" + pera.actLunchOutTime + "'";

    if (pera.actBreakInTime1 == null) pera.actBreakInTime1 = null;
    else pera.actBreakInTime1 = "'" + pera.actBreakInTime1 + "'";

    if (pera.actBreakOutTime1 == null) pera.actBreakOutTime1 = null;
    else pera.actBreakOutTime1 = "'" + pera.actBreakOutTime1 + "'";

    if (pera.actBreakInTime2 == null) pera.actBreakInTime2 = null;
    else pera.actBreakInTime2 = "'" + pera.actBreakInTime2 + "'";

    if (pera.actBreakOutTime2 == null) pera.actBreakOutTime2 = null;
    else pera.actBreakOutTime2 = "'" + pera.actBreakOutTime2 + "'";

    var strquery = "update tblemployeedailyattendance set employeeId = '" + pera.employeeId + "', employerId = '" + pera.employerId + "', entryDate = " + pera.entryDate + ", weeklyHour = '" + pera.weeklyHour + "', dayHour = '" + pera.dayHour + "', halfHour = '" + pera.halfHour + "', inTime = " + pera.inTime + ", allowLateInTime = " + pera.allowLateInTime + ", outTime = " + pera.outTime + ", allowEarlyOutTime = " + pera.allowEarlyOutTime + ", overtimeStartTime = " + pera.overtimeStartTime + ", outTime_Full = " + pera.outTime_Full + ", allowEarlyOutTime_Full = " + pera.allowEarlyOutTime_Full + ", overtimeStartTime_Full = " + pera.overtimeStartTime_Full + ", lunchInTime = " + pera.lunchInTime + ", lunchOutTime = " + pera.lunchOutTime + ", breakInTime1 = " + pera.breakInTime1 + ", breakOutTime1 = " + pera.breakOutTime1 + ", breakInTime2 = " + pera.breakInTime2 + ", breakOutTime2 = " + pera.breakOutTime2 + ", isOverTime30 = " + pera.isOverTime30 + ", isOverTime60 = " + pera.isOverTime60 + ", actInTime = " + pera.actInTime + ", actOutTime = " + pera.actOutTime + ", actOutTime_Full = " + pera.actOutTime_Full + ", actLunchInTime = " + pera.actLunchInTime + ", actLunchOutTime = " + pera.actLunchOutTime + ", actBreakInTime1 = " + pera.actBreakInTime1 + ", actBreakOutTime1 = " + pera.actBreakOutTime1 + ", actBreakInTime2 = " + pera.actBreakInTime2 + ", actBreakOutTime2 = " + pera.actBreakOutTime2 + ", dayType = '" + pera.dayType + "', employermastershiftid = '" + pera.employermastershiftid + "' , isOverTimeEarly30 = " + pera.isOverTimeEarly30 + ", isOverTimeEarly60 = " + pera.isOverTimeEarly60 + " where employeeDailyAttendanceId = '" + pera.employeeDailyAttendanceId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeedailyattendance set " + column + " where employeeDailyAttendanceId = " + id + " ";
    return strquery;
};

method.select_view_employeedailyattendance = function (strwhere) {
    var strquery = "select * from view_employeedailyattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeedailyattendance = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeedailyattendance where 1=1 " + strwhere;
    return strquery;
};

method.select_UnitCalculation = function (employerId, entryDateYear, entryDateMonth) {
    var strquery = `select employeeId, employerId, entryDate, 
                    SUM(ROUND(((TIME_TO_SEC(finalOverTime_Full) / 60) / 60) * 2) / 2) AS finalOverTime_Full_unit,
                    SUM(ROUND(((TIME_TO_SEC(finalOverTime) / 60) / 60) * 2) / 2) AS finalOverTime_unit,
                    SUM(CASE WHEN ISNULL(employeradditionalpaysetupCode) THEN 0 ELSE 1 END) AS employeradditionalpaysetupCode_unit,
                    SUM(CASE WHEN ISNULL(employershiftsetupCode) THEN 0 ELSE 1 END) AS employershiftsetupCode_unit, 
                    holidayOTTag, holidayAddPayTag, holidayShiftTag 
                    from view_employeedailyattendance where 1 = 1 
                    and employerId = ` + employerId + `
                    and YEAR(entryDate) = ` + entryDateYear + ` 
                    and MONTH(entryDate) = ` + entryDateMonth + `
                    group by employeeId, employerid, employerotsetupOTCode, employeradditionalpaysetupCode, employershiftsetupCode 
                    order by entryDate ,employeeId `;
    return strquery;
};

method.select_ReportAttendance = function (strwhere) {
    var strquery = `SELECT * ,
    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE  IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(actInTime, '%H:%i'),TIME_FORMAT(allowLateInTime, '%H:%i')),'%H:%i'),'00:00') END AS lateIn,
    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE  IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowLateInTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')),'%H:%i'),'00:00') END AS EarlyIn,
    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE  IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime_Full,'%H:%i'),TIME_FORMAT(actOutTime_Full, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime_Full,
    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE  IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime, '%H:%i'),TIME_FORMAT(actOutTime, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime,
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime_Full, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour_Full,
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour,
                    ROUND((TIME_TO_SEC(finalOverTime_Full) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Full_Unit,
                    ROUND((TIME_TO_SEC(finalOverTime) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Unit,
                    (ROUND((TIME_TO_SEC(finalOverTimeEarly) / 60 / 60) / 0.5 ,0) * 0.5) + ROUND((TIME_TO_SEC(finalOverTime_Full) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Full_Unit_2,
                    (ROUND((TIME_TO_SEC(finalOverTimeEarly) / 60 / 60) / 0.5 ,0) * 0.5) + ROUND((TIME_TO_SEC(finalOverTime) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Unit_2,
                    ROUND((TIME_TO_SEC(IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime_Full, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00')) / 60 / 60) / 0.5 ,0) * 0.5 AS workingHour_Full_Unit,
                    ROUND((TIME_TO_SEC(IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00')) / 60 / 60) / 0.5 ,0) * 0.5 AS workingHour_Unit,
                    CASE WHEN ISNULL(holidayDate) THEN 'No' ELSE 'Yes' END AS holidayStatus,
                    finalOverTimeEarly,
                    ROUND((TIME_TO_SEC(finalOverTimeEarly) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTimeEarlyUnit,
                    CASE
                    WHEN TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60) > 0 
                    THEN IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)),'%H:%i'),'00:00') 
                    ELSE '00:00' 
                    END AS finalOverTime_Full_With_Early,
                    CASE
                    WHEN TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60) > 0 
                    THEN IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)),'%H:%i'),'00:00') 
                    ELSE '00:00' 
                    END AS finalOverTime_With_Early,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_Full_With_Early_Unit,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_With_Early_Unit 
                    FROM view_employeedailyattendance where 1=1 ` + strwhere;
    return strquery;
};

method.select_ReportAttendanceWithOT = function (strwhere) {
    var strquery = `SELECT * ,
                    ROUND(ROUND(((TIME_TO_SEC(finalOverTime_Full) / 60) / 60) * 2) / 2, 2) AS finalOverTime_Full_unit,
                    ROUND(ROUND(((TIME_TO_SEC(finalOverTime) / 60) / 60) * 2) / 2, 2) AS finalOverTime_unit,
                    ROUND((TIME_TO_SEC(finalOverTime_Full) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Full_Unit_1,
                    ROUND((TIME_TO_SEC(finalOverTime) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Unit_1,
                    finalOverTimeEarlyUnit + ROUND((TIME_TO_SEC(finalOverTime_Full) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Full_Unit_2,
                    finalOverTimeEarlyUnit + ROUND((TIME_TO_SEC(finalOverTime) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTime_Unit_2,
                    holidayOTTag From 
                    (SELECT * ,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(actInTime, '%H:%i'),TIME_FORMAT(allowLateInTime, '%H:%i')),'%H:%i'),'00:00') END AS lateIn,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime_Full,'%H:%i'),TIME_FORMAT(actOutTime_Full, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime_Full,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime, '%H:%i'),TIME_FORMAT(actOutTime, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime,
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime_Full, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour_Full,
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour,
                    ROUND((TIME_TO_SEC(IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime_Full, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00')) / 60 / 60) / 0.5 ,0) * 0.5 AS workingHour_Full_Unit,
                    ROUND((TIME_TO_SEC(IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00')) / 60 / 60) / 0.5 ,0) * 0.5 AS workingHour_Unit,
                    CASE WHEN ISNULL(holidayDate) THEN 'No' ELSE 'Yes' END AS holidayStatus,
                    ROUND((TIME_TO_SEC(finalOverTimeEarly) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTimeEarlyUnit,
                    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)),'%H:%i'),'00:00') END AS finalOverTime_Full_With_Early,
                    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)),'%H:%i'),'00:00') END AS finalOverTime_With_Early,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_Full_With_Early_Unit,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_With_Early_Unit 
                    FROM view_employeedailyattendance) AS DATA  where 1=1 ` + strwhere;
    return strquery;
};

method.select_ReportAttendanceWithAddPay = function (strwhere) {
    var strquery = `SELECT * ,
                    CASE WHEN ISNULL(employeradditionalpaysetupCode) THEN 0 ELSE 1 END AS employeradditionalpaysetupCode_unit,
                    finalOverTimeEarly,
                    holidayAddPayTag From 
                    (SELECT * ,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(actInTime, '%H:%i'),TIME_FORMAT(allowLateInTime, '%H:%i')),'%H:%i'),'00:00') END AS lateIn,	
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime_Full,'%H:%i'),TIME_FORMAT(actOutTime_Full, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime_Full,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime, '%H:%i'),TIME_FORMAT(actOutTime, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime,                    
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime_Full, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour_Full,
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour,
                    CASE WHEN ISNULL(holidayDate) THEN 'No' ELSE 'Yes' END AS holidayStatus,
                    ROUND((TIME_TO_SEC(finalOverTimeEarly) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTimeEarlyUnit,
                    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)),'%H:%i'),'00:00') END AS finalOverTime_Full_With_Early,
                    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)),'%H:%i'),'00:00') END AS finalOverTime_With_Early,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_Full_With_Early_Unit,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_With_Early_Unit                     
                    FROM view_employeedailyattendance) AS DATA  where 1=1 ` + strwhere;
    return strquery;
};

method.select_ReportAttendanceWithShift = function (strwhere) {
    var strquery = `SELECT * ,
                    CASE WHEN ISNULL(employershiftsetupCode) THEN 0 ELSE 1 END AS employershiftsetupCode_unit,
                    finalOverTimeEarly,
                    holidayShiftTag From 
                    (SELECT * ,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(actInTime, '%H:%i'),TIME_FORMAT(allowLateInTime, '%H:%i')),'%H:%i'),'00:00') END AS lateIn,	
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime_Full,'%H:%i'),TIME_FORMAT(actOutTime_Full, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime_Full,
                        CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime, '%H:%i'),TIME_FORMAT(actOutTime, '%H:%i')),'%H:%i'),'00:00') END AS earlyOutTime,                    
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime_Full, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour_Full,
                    IFNULL(TIME_FORMAT(SEC_TO_TIME(ABS(TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(actOutTime, '%H:%i'),TIME_FORMAT(actInTime, '%H:%i')))) - (halfHour * 60)),'%H:%i'),'00:00') AS workingHour,
                    CASE WHEN ISNULL(holidayDate) THEN 'No' ELSE 'Yes' END AS holidayStatus,
                    ROUND((TIME_TO_SEC(finalOverTimeEarly) / 60 / 60) / 0.5 ,0) * 0.5 AS finalOverTimeEarlyUnit,
                    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)),'%H:%i'),'00:00') END AS finalOverTime_Full_With_Early,
                    CASE WHEN daytype = 'off' || daytype = 'holiday' THEN '00:00' ELSE IFNULL(TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)),'%H:%i'),'00:00') END AS finalOverTime_With_Early,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime_Full) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_Full_With_Early_Unit,
                    ROUND((((TIME_TO_SEC(finalOverTimeEarly) + TIME_TO_SEC(finalOverTime) - (halfHour * 60)) / 60 / 60) / 0.5),0) * 0.5 AS finalOverTime_With_Early_Unit 
                    FROM view_employeedailyattendance) AS DATA  where 1=1 ` + strwhere;
    return strquery;
};

method.select_ReportMonthlyStatistic = function (strwhere) {
    var strquery = `SELECT 
                    CASE WHEN (IFNULL(TIME_TO_SEC(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime_Full, '%H:%i'),TIME_FORMAT(actOutTime_Full, '%H:%i')),'%H:%i')),0)) > 0 
                    OR (IFNULL(TIME_TO_SEC(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(allowEarlyOutTime, '%H:%i'),TIME_FORMAT(actOutTime, '%H:%i')),'%H:%i')),0)) > 0 
                    THEN 1 ELSE 0 END earlyOut, 
                    CASE WHEN (IFNULL(TIME_TO_SEC(TIME_FORMAT(TIMEDIFF(TIME_FORMAT(actInTime, '%H:%i'),TIME_FORMAT(allowLateInTime, '%H:%i')),'%H:%i')),0)) > 0 
                    THEN 1 ELSE 0 END lateIn,
                    CASE WHEN ISNULL(holidayDate) THEN 0 ELSE 1 END AS holidayStatus, 
                    entryDateDDMMYYYY, employeeId, employerId, entryDate, employerdepartmentTitle, employerbranchName, memberName, employeeEnroll, 
                    employerdepartmentId, employerbranchId, employermastershiftid, shiftName, actInTime, actOutTime, actOutTime_Full FROM view_employeedailyattendance WHERE 1 = 1  ` + strwhere;
    return strquery;
};

exports.data = method;