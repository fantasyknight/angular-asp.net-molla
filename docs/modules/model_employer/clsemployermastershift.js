var method = {};

method.masterData = (request) => {
    let employerMasterShiftId = request.body.employerMasterShiftId || 0;
    let employerId = request.body.employerId || 0;
    let shiftName = request.body.shiftName || '';
    let weeklyHour = request.body.weeklyHour || '';
    let dayHour = request.body.dayHour || '';
    let halfHour = request.body.halfHour || 0;
    let inTime = request.body.inTime || null;
    let rangeInTime1 = request.body.rangeInTime1 || null;
    let rangeInTime2 = request.body.rangeInTime2 || null;
    let allowLateInTime = request.body.allowLateInTime || null;
    let outTime = request.body.outTime || null;
    let rangeOutTime1 = request.body.rangeOutTime1 || null;
    let rangeOutTime2 = request.body.rangeOutTime2 || null;
    let allowEarlyOutTime = request.body.allowEarlyOutTime || null;
    let overtimeStartTime = request.body.overtimeStartTime || null;
    let outTime_Full = request.body.outTime_Full || null;
    let rangeOutTime1_Full = request.body.rangeOutTime1_Full || null;
    let rangeOutTime2_Full = request.body.rangeOutTime2_Full || null;
    let allowEarlyOutTime_Full = request.body.allowEarlyOutTime_Full || null;
    let overtimeStartTime_Full = request.body.overtimeStartTime_Full || null;
    let lunchInTime = request.body.lunchInTime || null;
    let rangelunchInTime1 = request.body.rangelunchInTime1 || null;
    let rangelunchInTime2 = request.body.rangelunchInTime2 || null;
    let lunchOutTime = request.body.lunchOutTime || null;
    let rangelunchOutTime1 = request.body.rangelunchOutTime1 || null;
    let rangelunchOutTime2 = request.body.rangelunchOutTime2 || null;
    let breakInTime1 = request.body.breakInTime1 || null;
    let rangebreakInTime1_1 = request.body.rangebreakInTime1_1 || null;
    let rangebreakInTime1_2 = request.body.rangebreakInTime1_2 || null;
    let breakOutTime1 = request.body.breakOutTime1 || null;
    let rangebreakOutTime1_1 = request.body.rangebreakOutTime1_1 || null;
    let rangebreakOutTime1_2 = request.body.rangebreakOutTime1_2 || null;
    let breakInTime2 = request.body.breakInTime2 || null;
    let rangebreakInTime2_1 = request.body.rangebreakInTime2_1 || null;
    let rangebreakInTime2_2 = request.body.rangebreakInTime2_2 || null;
    let breakOutTime2 = request.body.breakOutTime2 || null;
    let rangebreakOutTime2_1 = request.body.rangebreakOutTime2_1 || null;
    let rangebreakOutTime2_2 = request.body.rangebreakOutTime2_2 || null;
    let isOverTime30 = request.body.isOverTime30 || false;
    let isOverTime60 = request.body.isOverTime60 || false;
    let isMonday = request.body.isMonday || false;
    let isTuesday = request.body.isTuesday || false;
    let isWednesday = request.body.isWednesday || false;
    let isThursday = request.body.isThursday || false;
    let isFriday = request.body.isFriday || false;
    let isSaturday = request.body.isSaturday || false;
    let isSunday = request.body.isSunday || false;
    let mondayType = request.body.mondayType || '';
    let tuesdayType = request.body.tuesdayType || '';
    let wednesdayType = request.body.wednesdayType || '';
    let thursdayType = request.body.thursdayType || '';
    let fridayType = request.body.fridayType || '';
    let saturdayType = request.body.saturdayType || '';
    let sundayType = request.body.sundayType || '';
    let employerotsetupId = request.body.employerotsetupId || 0;
    let shiftType = request.body.shiftType || '';
    let isOverTimeEarly30 = request.body.isOverTimeEarly30 || false;
    let isOverTimeEarly60 = request.body.isOverTimeEarly60 || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerMasterShiftId,
        employerId,
        shiftName,
        weeklyHour,
        dayHour,
        halfHour,
        inTime,
        rangeInTime1,
        rangeInTime2,
        allowLateInTime,
        outTime,
        rangeOutTime1,
        rangeOutTime2,
        allowEarlyOutTime,
        overtimeStartTime,
        outTime_Full,
        rangeOutTime1_Full,
        rangeOutTime2_Full,
        allowEarlyOutTime_Full,
        overtimeStartTime_Full,
        lunchInTime,
        rangelunchInTime1,
        rangelunchInTime2,
        lunchOutTime,
        rangelunchOutTime1,
        rangelunchOutTime2,
        breakInTime1,
        rangebreakInTime1_1,
        rangebreakInTime1_2,
        breakOutTime1,
        rangebreakOutTime1_1,
        rangebreakOutTime1_2,
        breakInTime2,
        rangebreakInTime2_1,
        rangebreakInTime2_2,
        breakOutTime2,
        rangebreakOutTime2_1,
        rangebreakOutTime2_2,
        isOverTime30,
        isOverTime60,
        isMonday,
        isTuesday,
        isWednesday,
        isThursday,
        isFriday,
        isSaturday,
        isSunday,
        mondayType,
        tuesdayType,
        wednesdayType,
        thursdayType,
        fridayType,
        saturdayType,
        sundayType,
        employerotsetupId,
        shiftType,
        isOverTimeEarly30,
        isOverTimeEarly60,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *,
                    DATE_FORMAT(inTime,'%H:%i') AS inTimeHHMM, 
                    DATE_FORMAT(outTime,'%H:%i') AS outTimeHHMM, 
                    DATE_FORMAT(outTime_Full,'%H:%i') AS outTime_FullHHMM
                    from tblemployermastershift where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employerMasterShiftId, employerId, shiftName,weeklyHour,dayHour,halfHour,inTime,rangeInTime1,rangeInTime2,
                    allowLateInTime,outTime,rangeOutTime1,rangeOutTime2,allowEarlyOutTime,overtimeStartTime,outTime_Full,rangeOutTime1_Full,
                    rangeOutTime2_Full,allowEarlyOutTime_Full,overtimeStartTime_Full,lunchInTime,rangelunchInTime1,rangelunchInTime2,lunchOutTime,
                    rangelunchOutTime1,rangelunchOutTime2,breakInTime1,rangebreakInTime1_1,rangebreakInTime1_2,breakOutTime1,rangebreakOutTime1_1,
                    rangebreakOutTime1_2,breakInTime2,rangebreakInTime2_1,rangebreakInTime2_2,breakOutTime2,rangebreakOutTime2_1,rangebreakOutTime2_2,
                    isOverTime30,isOverTime60,isOverTimeEarly30,isOverTimeEarly60,isMonday,isTuesday,isWednesday,isThursday,isFriday,isSaturday,isSunday,
                    mondayType,tuesdayType,wednesdayType,thursdayType,fridayType,saturdayType,sundayType,employerotsetupId, shiftType,
                    DATE_FORMAT(inTime,'%H:%i') AS inTimeHHMM, 
                    DATE_FORMAT(outTime,'%H:%i') AS outTimeHHMM, 
                    DATE_FORMAT(outTime_Full,'%H:%i') AS outTime_FullHHMM,
                    createdBy,createdDate from tblemployermastershift where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployermastershift where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployermastershift where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployermastershift where 1 = 1 and employerMasterShiftId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployermastershift where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.inTime == null) pera.inTime = null;
    else pera.inTime = "'" + pera.inTime + "'";

    if (pera.rangeInTime1 == null) pera.rangeInTime1 = null;
    else pera.rangeInTime1 = "'" + pera.rangeInTime1 + "'";

    if (pera.rangeInTime2 == null) pera.rangeInTime2 = null;
    else pera.rangeInTime2 = "'" + pera.rangeInTime2 + "'";

    if (pera.allowLateInTime == null) pera.allowLateInTime = null;
    else pera.allowLateInTime = "'" + pera.allowLateInTime + "'";

    if (pera.outTime == null) pera.outTime = null;
    else pera.outTime = "'" + pera.outTime + "'";

    if (pera.rangeOutTime1 == null) pera.rangeOutTime1 = null;
    else pera.rangeOutTime1 = "'" + pera.rangeOutTime1 + "'";

    if (pera.rangeOutTime2 == null) pera.rangeOutTime2 = null;
    else pera.rangeOutTime2 = "'" + pera.rangeOutTime2 + "'";

    if (pera.allowEarlyOutTime == null) pera.allowEarlyOutTime = null;
    else pera.allowEarlyOutTime = "'" + pera.allowEarlyOutTime + "'";

    if (pera.overtimeStartTime == null) pera.overtimeStartTime = null;
    else pera.overtimeStartTime = "'" + pera.overtimeStartTime + "'";

    if (pera.outTime_Full == null) pera.outTime_Full = null;
    else pera.outTime_Full = "'" + pera.outTime_Full + "'";

    if (pera.rangeOutTime1_Full == null) pera.rangeOutTime1_Full = null;
    else pera.rangeOutTime1_Full = "'" + pera.rangeOutTime1_Full + "'";

    if (pera.rangeOutTime2_Full == null) pera.rangeOutTime2_Full = null;
    else pera.rangeOutTime2_Full = "'" + pera.rangeOutTime2_Full + "'";

    if (pera.allowEarlyOutTime_Full == null) pera.allowEarlyOutTime_Full = null;
    else pera.allowEarlyOutTime_Full = "'" + pera.allowEarlyOutTime_Full + "'";

    if (pera.overtimeStartTime_Full == null) pera.overtimeStartTime_Full = null;
    else pera.overtimeStartTime_Full = "'" + pera.overtimeStartTime_Full + "'";

    if (pera.lunchInTime == null) pera.lunchInTime = null;
    else pera.lunchInTime = "'" + pera.lunchInTime + "'";

    if (pera.rangelunchInTime1 == null) pera.rangelunchInTime1 = null;
    else pera.rangelunchInTime1 = "'" + pera.rangelunchInTime1 + "'";

    if (pera.rangelunchInTime2 == null) pera.rangelunchInTime2 = null;
    else pera.rangelunchInTime2 = "'" + pera.rangelunchInTime2 + "'";

    if (pera.lunchOutTime == null) pera.lunchOutTime = null;
    else pera.lunchOutTime = "'" + pera.lunchOutTime + "'";

    if (pera.rangelunchOutTime1 == null) pera.rangelunchOutTime1 = null;
    else pera.rangelunchOutTime1 = "'" + pera.rangelunchOutTime1 + "'";

    if (pera.rangelunchOutTime2 == null) pera.rangelunchOutTime2 = null;
    else pera.rangelunchOutTime2 = "'" + pera.rangelunchOutTime2 + "'";

    if (pera.breakInTime1 == null) pera.breakInTime1 = null;
    else pera.breakInTime1 = "'" + pera.breakInTime1 + "'";

    if (pera.rangebreakInTime1_1 == null) pera.rangebreakInTime1_1 = null;
    else pera.rangebreakInTime1_1 = "'" + pera.rangebreakInTime1_1 + "'";

    if (pera.rangebreakInTime1_2 == null) pera.rangebreakInTime1_2 = null;
    else pera.rangebreakInTime1_2 = "'" + pera.rangebreakInTime1_2 + "'";

    if (pera.breakOutTime1 == null) pera.breakOutTime1 = null;
    else pera.breakOutTime1 = "'" + pera.breakOutTime1 + "'";

    if (pera.rangebreakOutTime1_1 == null) pera.rangebreakOutTime1_1 = null;
    else pera.rangebreakOutTime1_1 = "'" + pera.rangebreakOutTime1_1 + "'";

    if (pera.rangebreakOutTime1_2 == null) pera.rangebreakOutTime1_2 = null;
    else pera.rangebreakOutTime1_2 = "'" + pera.rangebreakOutTime1_2 + "'";

    if (pera.breakInTime2 == null) pera.breakInTime2 = null;
    else pera.breakInTime2 = "'" + pera.breakInTime2 + "'";

    if (pera.rangebreakInTime2_1 == null) pera.rangebreakInTime2_1 = null;
    else pera.rangebreakInTime2_1 = "'" + pera.rangebreakInTime2_1 + "'";

    if (pera.rangebreakInTime2_2 == null) pera.rangebreakInTime2_2 = null;
    else pera.rangebreakInTime2_2 = "'" + pera.rangebreakInTime2_2 + "'";

    if (pera.breakOutTime2 == null) pera.breakOutTime2 = null;
    else pera.breakOutTime2 = "'" + pera.breakOutTime2 + "'";

    if (pera.rangebreakOutTime2_1 == null) pera.rangebreakOutTime2_1 = null;
    else pera.rangebreakOutTime2_1 = "'" + pera.rangebreakOutTime2_1 + "'";

    if (pera.rangebreakOutTime2_2 == null) pera.rangebreakOutTime2_2 = null;
    else pera.rangebreakOutTime2_2 = "'" + pera.rangebreakOutTime2_2 + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployermastershift (employerId, shiftName, weeklyHour, dayHour, halfHour, inTime, rangeInTime1, rangeInTime2, allowLateInTime, outTime, rangeOutTime1, rangeOutTime2, allowEarlyOutTime, overtimeStartTime, outTime_Full, rangeOutTime1_Full, rangeOutTime2_Full, allowEarlyOutTime_Full, overtimeStartTime_Full, lunchInTime, rangelunchInTime1, rangelunchInTime2, lunchOutTime, rangelunchOutTime1, rangelunchOutTime2, breakInTime1, rangebreakInTime1_1, rangebreakInTime1_2, breakOutTime1, rangebreakOutTime1_1, rangebreakOutTime1_2, breakInTime2, rangebreakInTime2_1, rangebreakInTime2_2, breakOutTime2, rangebreakOutTime2_1, rangebreakOutTime2_2, isOverTime30, isOverTime60, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, mondayType, tuesdayType, wednesdayType, thursdayType, fridayType, saturdayType, sundayType, employerotsetupId, shiftType, isOverTimeEarly30, isOverTimeEarly60, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.shiftName + "', '" + pera.weeklyHour + "', '" + pera.dayHour + "', '" + pera.halfHour + "', " + pera.inTime + ", " + pera.rangeInTime1 + ", " + pera.rangeInTime2 + ", " + pera.allowLateInTime + ", " + pera.outTime + ", " + pera.rangeOutTime1 + ", " + pera.rangeOutTime2 + ", " + pera.allowEarlyOutTime + ", " + pera.overtimeStartTime + ", " + pera.outTime_Full + ", " + pera.rangeOutTime1_Full + ", " + pera.rangeOutTime2_Full + ", " + pera.allowEarlyOutTime_Full + ", " + pera.overtimeStartTime_Full + ", " + pera.lunchInTime + ", " + pera.rangelunchInTime1 + ", " + pera.rangelunchInTime2 + ", " + pera.lunchOutTime + ", " + pera.rangelunchOutTime1 + ", " + pera.rangelunchOutTime2 + ", " + pera.breakInTime1 + ", " + pera.rangebreakInTime1_1 + ", " + pera.rangebreakInTime1_2 + ", " + pera.breakOutTime1 + ", " + pera.rangebreakOutTime1_1 + ", " + pera.rangebreakOutTime1_2 + ", " + pera.breakInTime2 + ", " + pera.rangebreakInTime2_1 + ", " + pera.rangebreakInTime2_2 + ", " + pera.breakOutTime2 + ", " + pera.rangebreakOutTime2_1 + ", " + pera.rangebreakOutTime2_2 + ", " + pera.isOverTime30 + ", " + pera.isOverTime60 + ", " + pera.isMonday + ", " + pera.isTuesday + ", " + pera.isWednesday + ", " + pera.isThursday + ", " + pera.isFriday + ", " + pera.isSaturday + ", " + pera.isSunday + ", '" + pera.mondayType + "', '" + pera.tuesdayType + "', '" + pera.wednesdayType + "', '" + pera.thursdayType + "', '" + pera.fridayType + "', '" + pera.saturdayType + "', '" + pera.sundayType + "', '" + pera.employerotsetupId + "', '" + pera.shiftType + "', " + pera.isOverTimeEarly30 + ", " + pera.isOverTimeEarly60 + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployermastershift (employerId, shiftName, weeklyHour, dayHour, halfHour, inTime, rangeInTime1, rangeInTime2, allowLateInTime, outTime, rangeOutTime1, rangeOutTime2, allowEarlyOutTime, overtimeStartTime, outTime_Full, rangeOutTime1_Full, rangeOutTime2_Full, allowEarlyOutTime_Full, overtimeStartTime_Full, lunchInTime, rangelunchInTime1, rangelunchInTime2, lunchOutTime, rangelunchOutTime1, rangelunchOutTime2, breakInTime1, rangebreakInTime1_1, rangebreakInTime1_2, breakOutTime1, rangebreakOutTime1_1, rangebreakOutTime1_2, breakInTime2, rangebreakInTime2_1, rangebreakInTime2_2, breakOutTime2, rangebreakOutTime2_1, rangebreakOutTime2_2, isOverTime30, isOverTime60, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, mondayType, tuesdayType, wednesdayType, thursdayType, fridayType, saturdayType, sundayType, employerotsetupId, shiftType, isOverTimeEarly30, isOverTimeEarly60, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.inTime == null) pera.inTime = null;
    else pera.inTime = "'" + pera.inTime + "'";

    if (pera.rangeInTime1 == null) pera.rangeInTime1 = null;
    else pera.rangeInTime1 = "'" + pera.rangeInTime1 + "'";

    if (pera.rangeInTime2 == null) pera.rangeInTime2 = null;
    else pera.rangeInTime2 = "'" + pera.rangeInTime2 + "'";

    if (pera.allowLateInTime == null) pera.allowLateInTime = null;
    else pera.allowLateInTime = "'" + pera.allowLateInTime + "'";

    if (pera.outTime == null) pera.outTime = null;
    else pera.outTime = "'" + pera.outTime + "'";

    if (pera.rangeOutTime1 == null) pera.rangeOutTime1 = null;
    else pera.rangeOutTime1 = "'" + pera.rangeOutTime1 + "'";

    if (pera.rangeOutTime2 == null) pera.rangeOutTime2 = null;
    else pera.rangeOutTime2 = "'" + pera.rangeOutTime2 + "'";

    if (pera.allowEarlyOutTime == null) pera.allowEarlyOutTime = null;
    else pera.allowEarlyOutTime = "'" + pera.allowEarlyOutTime + "'";

    if (pera.overtimeStartTime == null) pera.overtimeStartTime = null;
    else pera.overtimeStartTime = "'" + pera.overtimeStartTime + "'";

    if (pera.outTime_Full == null) pera.outTime_Full = null;
    else pera.outTime_Full = "'" + pera.outTime_Full + "'";

    if (pera.rangeOutTime1_Full == null) pera.rangeOutTime1_Full = null;
    else pera.rangeOutTime1_Full = "'" + pera.rangeOutTime1_Full + "'";

    if (pera.rangeOutTime2_Full == null) pera.rangeOutTime2_Full = null;
    else pera.rangeOutTime2_Full = "'" + pera.rangeOutTime2_Full + "'";

    if (pera.allowEarlyOutTime_Full == null) pera.allowEarlyOutTime_Full = null;
    else pera.allowEarlyOutTime_Full = "'" + pera.allowEarlyOutTime_Full + "'";

    if (pera.overtimeStartTime_Full == null) pera.overtimeStartTime_Full = null;
    else pera.overtimeStartTime_Full = "'" + pera.overtimeStartTime_Full + "'";

    if (pera.lunchInTime == null) pera.lunchInTime = null;
    else pera.lunchInTime = "'" + pera.lunchInTime + "'";

    if (pera.rangelunchInTime1 == null) pera.rangelunchInTime1 = null;
    else pera.rangelunchInTime1 = "'" + pera.rangelunchInTime1 + "'";

    if (pera.rangelunchInTime2 == null) pera.rangelunchInTime2 = null;
    else pera.rangelunchInTime2 = "'" + pera.rangelunchInTime2 + "'";

    if (pera.lunchOutTime == null) pera.lunchOutTime = null;
    else pera.lunchOutTime = "'" + pera.lunchOutTime + "'";

    if (pera.rangelunchOutTime1 == null) pera.rangelunchOutTime1 = null;
    else pera.rangelunchOutTime1 = "'" + pera.rangelunchOutTime1 + "'";

    if (pera.rangelunchOutTime2 == null) pera.rangelunchOutTime2 = null;
    else pera.rangelunchOutTime2 = "'" + pera.rangelunchOutTime2 + "'";

    if (pera.breakInTime1 == null) pera.breakInTime1 = null;
    else pera.breakInTime1 = "'" + pera.breakInTime1 + "'";

    if (pera.rangebreakInTime1_1 == null) pera.rangebreakInTime1_1 = null;
    else pera.rangebreakInTime1_1 = "'" + pera.rangebreakInTime1_1 + "'";

    if (pera.rangebreakInTime1_2 == null) pera.rangebreakInTime1_2 = null;
    else pera.rangebreakInTime1_2 = "'" + pera.rangebreakInTime1_2 + "'";

    if (pera.breakOutTime1 == null) pera.breakOutTime1 = null;
    else pera.breakOutTime1 = "'" + pera.breakOutTime1 + "'";

    if (pera.rangebreakOutTime1_1 == null) pera.rangebreakOutTime1_1 = null;
    else pera.rangebreakOutTime1_1 = "'" + pera.rangebreakOutTime1_1 + "'";

    if (pera.rangebreakOutTime1_2 == null) pera.rangebreakOutTime1_2 = null;
    else pera.rangebreakOutTime1_2 = "'" + pera.rangebreakOutTime1_2 + "'";

    if (pera.breakInTime2 == null) pera.breakInTime2 = null;
    else pera.breakInTime2 = "'" + pera.breakInTime2 + "'";

    if (pera.rangebreakInTime2_1 == null) pera.rangebreakInTime2_1 = null;
    else pera.rangebreakInTime2_1 = "'" + pera.rangebreakInTime2_1 + "'";

    if (pera.rangebreakInTime2_2 == null) pera.rangebreakInTime2_2 = null;
    else pera.rangebreakInTime2_2 = "'" + pera.rangebreakInTime2_2 + "'";

    if (pera.breakOutTime2 == null) pera.breakOutTime2 = null;
    else pera.breakOutTime2 = "'" + pera.breakOutTime2 + "'";

    if (pera.rangebreakOutTime2_1 == null) pera.rangebreakOutTime2_1 = null;
    else pera.rangebreakOutTime2_1 = "'" + pera.rangebreakOutTime2_1 + "'";

    if (pera.rangebreakOutTime2_2 == null) pera.rangebreakOutTime2_2 = null;
    else pera.rangebreakOutTime2_2 = "'" + pera.rangebreakOutTime2_2 + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployermastershift set employerId = '" + pera.employerId + "', shiftName = '" + pera.shiftName + "', weeklyHour = '" + pera.weeklyHour + "', dayHour = '" + pera.dayHour + "', halfHour = '" + pera.halfHour + "', inTime = " + pera.inTime + ", rangeInTime1 = " + pera.rangeInTime1 + ", rangeInTime2 = " + pera.rangeInTime2 + ", allowLateInTime = " + pera.allowLateInTime + ", outTime = " + pera.outTime + ", rangeOutTime1 = " + pera.rangeOutTime1 + ", rangeOutTime2 = " + pera.rangeOutTime2 + ", allowEarlyOutTime = " + pera.allowEarlyOutTime + ", overtimeStartTime = " + pera.overtimeStartTime + ", outTime_Full = " + pera.outTime_Full + ", rangeOutTime1_Full = " + pera.rangeOutTime1_Full + ", rangeOutTime2_Full = " + pera.rangeOutTime2_Full + ", allowEarlyOutTime_Full = " + pera.allowEarlyOutTime_Full + ", overtimeStartTime_Full = " + pera.overtimeStartTime_Full + ", lunchInTime = " + pera.lunchInTime + ", rangelunchInTime1 = " + pera.rangelunchInTime1 + ", rangelunchInTime2 = " + pera.rangelunchInTime2 + ", lunchOutTime = " + pera.lunchOutTime + ", rangelunchOutTime1 = " + pera.rangelunchOutTime1 + ", rangelunchOutTime2 = " + pera.rangelunchOutTime2 + ", breakInTime1 = " + pera.breakInTime1 + ", rangebreakInTime1_1 = " + pera.rangebreakInTime1_1 + ", rangebreakInTime1_2 = " + pera.rangebreakInTime1_2 + ", breakOutTime1 = " + pera.breakOutTime1 + ", rangebreakOutTime1_1 = " + pera.rangebreakOutTime1_1 + ", rangebreakOutTime1_2 = " + pera.rangebreakOutTime1_2 + ", breakInTime2 = " + pera.breakInTime2 + ", rangebreakInTime2_1 = " + pera.rangebreakInTime2_1 + ", rangebreakInTime2_2 = " + pera.rangebreakInTime2_2 + ", breakOutTime2 = " + pera.breakOutTime2 + ", rangebreakOutTime2_1 = " + pera.rangebreakOutTime2_1 + ", rangebreakOutTime2_2 = " + pera.rangebreakOutTime2_2 + ", isOverTime30 = " + pera.isOverTime30 + ", isOverTime60 = " + pera.isOverTime60 + ", isMonday = " + pera.isMonday + ", isTuesday = " + pera.isTuesday + ", isWednesday = " + pera.isWednesday + ", isThursday = " + pera.isThursday + ", isFriday = " + pera.isFriday + ", isSaturday = " + pera.isSaturday + ", isSunday = " + pera.isSunday + ", mondayType = '" + pera.mondayType + "', tuesdayType = '" + pera.tuesdayType + "', wednesdayType = '" + pera.wednesdayType + "', thursdayType = '" + pera.thursdayType + "', fridayType = '" + pera.fridayType + "', saturdayType = '" + pera.saturdayType + "', sundayType = '" + pera.sundayType + "', employerotsetupId = '" + pera.employerotsetupId + "', shiftType = '" + pera.shiftType + "', isOverTimeEarly30 = " + pera.isOverTimeEarly30 + ", isOverTimeEarly60 = " + pera.isOverTimeEarly60 + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerMasterShiftId = '" + pera.employerMasterShiftId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployermastershift set " + column + " where employerMasterShiftId = " + id + " ";
    return strquery;
};

exports.data = method;