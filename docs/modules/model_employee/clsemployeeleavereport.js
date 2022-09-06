var method = {};

method.masterData = (request) => {
    let employeeleavereportId = request.body.employeeleavereportId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employerleavetypeId = request.body.employerleavetypeId || 0;
    let startYear = request.body.startYear || null;
    let endYear = request.body.endYear || null;
    let reportEntitlementDay = request.body.reportEntitlementDay || 0.0;
    let reportEntitlementGeneratedDay = request.body.reportEntitlementGeneratedDay || 0.0;
    let reportTakenLeave = request.body.reportTakenLeave || 0.0;
    let reportTotalBalanceLeave = request.body.reportTotalBalanceLeave || 0.0;
    return {
        employeeleavereportId,
        employerId,
        employeeId,
        employerleavetypeId,
        startYear,
        endYear,
        reportEntitlementDay,
        reportEntitlementGeneratedDay,
        reportTakenLeave,
        reportTotalBalanceLeave
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeleavereport where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeleavereportId,employerId,employeeId,employerleavetypeId,startYear,endYear,reportEntitlementDay,reportEntitlementGeneratedDay,reportTakenLeave,reportTotalBalanceLeave from tblemployeeleavereport where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeleavereport where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeleavereport where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeleavereport where 1 = 1 and employeeleavereportId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeleavereport where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.startYear == null) pera.startYear = null;
    else pera.startYear = "'" + pera.startYear + "'";

    if (pera.endYear == null) pera.endYear = null;
    else pera.endYear = "'" + pera.endYear + "'";

    var strquery = "insert into tblemployeeleavereport (employerId, employeeId, employerleavetypeId, startYear, endYear, reportEntitlementDay, reportEntitlementGeneratedDay, reportTakenLeave, reportTotalBalanceLeave) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employerleavetypeId + "', " + pera.startYear + ", " + pera.endYear + ", '" + pera.reportEntitlementDay + "', '" + pera.reportEntitlementGeneratedDay + "', '" + pera.reportTakenLeave + "', '" + pera.reportTotalBalanceLeave + "')";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeleavereport (employerId, employeeId, employerleavetypeId, startYear, endYear, reportEntitlementDay, reportEntitlementGeneratedDay, reportTakenLeave, reportTotalBalanceLeave) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.startYear == null) pera.startYear = null;
    else pera.startYear = "'" + pera.startYear + "'";

    if (pera.endYear == null) pera.endYear = null;
    else pera.endYear = "'" + pera.endYear + "'";

    var strquery = "update tblemployeeleavereport set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employerleavetypeId = '" + pera.employerleavetypeId + "', startYear = " + pera.startYear + ", endYear = " + pera.endYear + ", reportEntitlementDay = '" + pera.reportEntitlementDay + "', reportEntitlementGeneratedDay = '" + pera.reportEntitlementGeneratedDay + "', reportTakenLeave = '" + pera.reportTakenLeave + "', reportTotalBalanceLeave = '" + pera.reportTotalBalanceLeave + "' where employeeleavereportId = '" + pera.employeeleavereportId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeleavereport set " + column + " where employeeleavereportId = " + id + " ";
    return strquery;
};

method.select_view_employeeleavereport = function (strwhere) {
    var strquery = "select * from view_employeeleavereport where 1 = 1 " + strwhere;
    return strquery;
};

method.select_distinct_view_employeeleavereport = function (strwhere) {
    var strquery = `select 
                    DISTINCT employeeId, employerId, memberNric, memberPassport, memberName, employeeJoiningDDMMYYYY, employerdepartmentTitle, 
                    currentStartYear, currentEndYear 
                    from 
                    view_employeeleavereport where 1 = 1 ` + strwhere;
    return strquery;
};

method.getcount_distinct_view_employeeleavereport = function (strwhere) {
    var strquery = "select count(DISTINCT employeeId) as cnt from view_employeeleavereport where 1=1 " + strwhere;
    return strquery;
};

method.select_EmployeeDetailReport = function (strwhere) {
    var strquery = `SELECT * FROM
                    (SELECT d.employeesalarysetupCurrentBasic * 12 AS salaryperAnnum,d.employeesalarysetupCurrentBasic,a.employeeleavereportId,
                    a.employerId, a.employerName, a.memberNric, a.employeejoiningDDMMYYYY, a.employeeId, a.memberName, a.employerleavetypeId, a.startYear,
                    a.endYear, a.reportEntitlementDay, a.reportEntitlementGeneratedDay, a.reportTakenLeave, a.reportTotalBalanceLeave, a.employerleavetypeLeaveType 
                    FROM view_employeeleavereport AS a 
                    LEFT JOIN tblemployeesalarysetup AS d ON a.employeeId = d.employeeId AND a.employerId = d.employerId) AS DATA 
                    where 1=1 ` + strwhere;
    return strquery;
};

method.select_CurrentYearSummaryReport = function (strwhere) {
    var strquery = `SELECT * FROM 
                    (SELECT b.memberName, b.memberNric, b.currentStartYear, b.currentEndYear, c.employerleavetypeLeaveType, a.employeeleavereportId, 
                    a.employerId, a.employeeId, a.employerleavetypeId, a.startYear, a.endYear, a.reportEntitlementDay, a.reportEntitlementGeneratedDay,
                    a.reportTakenLeave, a.reportTotalBalanceLeave 
                    FROM
                    tblemployeeleavereport AS a 
                    INNER JOIN view_employee AS b ON a.employeeId = b.employeeId 
                        AND a.employerId = b.employerId 
                        AND DATE_FORMAT(startYear, '%d-%m-%Y') = currentStartYear 
                        AND DATE_FORMAT(endYear, '%d-%m-%Y') = currentEndYear 
                    LEFT JOIN tblemployerleavetype AS c ON a.employerId = b.employerId 
                        AND a.employerleavetypeId = c.employerleavetypeId) AS DATA WHERE 1 = 1 ` + strwhere;
    return strquery;
};

method.select_CurrentYearLeaveDetailReport = function (strwhere) {
    var strquery = `SELECT * FROM 
                    (SELECT a.employeeleavereportId, a.employerId, a.employeeId, a.employerleavetypeId, a.startYear, a.endYear, a.startYearDDMMYYYY, 
                    a.endYearDDMMYYYY, a.reportEntitlementDay, a.reportEntitlementGeneratedDay, a.reportTakenLeave, a.reportTotalBalanceLeave, 
                    a.employerleavetypeLeaveType, c.memberName, c.employeeEnroll, c.memberNric, c.employeeJoiningDDMMYYYY, 
                    d.employeeleaveapplicationLeaveFromDDMMYYYY, d.employeeleaveapplicationLeaveToDDMMYYYY, 
                    IFNULL(d.employeeleaveapplicationNoOfDays,0) AS employeeleaveapplicationNoOfDays,
                    IFNULL(d.employeeleaveapplicationReason,'') AS employeeleaveapplicationReason 
                    FROM view_employeeleavereport AS a 
                    INNER JOIN view_employee AS c ON a.employerId = c.employerId 
                        AND a.employeeId = c.employeeId
                        AND DATE_FORMAT(a.startYear, '%d-%m-%Y') = c.currentStartYear 
                        AND DATE_FORMAT(a.endYear, '%d-%m-%Y') = c.currentEndYear 
                    LEFT JOIN view_employeeleaveapplication AS d ON a.employeeId = d.employeeId 
                        AND a.employerId = d.employerId 
                        AND a.employerleavetypeId = d.employerleavetypeId 
                        AND DATE_FORMAT(a.startYear, '%Y%m%d') <= DATE_FORMAT(d.employeeleaveapplicationLeaveFrom,'%Y%m%d') 
                        AND DATE_FORMAT(a.endYear, '%Y%m%d') >= DATE_FORMAT(d.employeeleaveapplicationLeaveTo,'%Y%m%d')) AS DATA WHERE 1=1 ` + strwhere;
    return strquery;
};

method.select_LeaveDetailReport = function (strwhere) {
    var strquery = `SELECT * FROM 
                    (SELECT a.employeeleavereportId, a.employerId, a.employeeId, a.employerleavetypeId, a.startYear, a.endYear, a.startYearDDMMYYYY, 
                    a.endYearDDMMYYYY, a.reportEntitlementDay, a.reportEntitlementGeneratedDay, a.reportTakenLeave, a.reportTotalBalanceLeave, 
                    a.employerleavetypeLeaveType, c.memberName, c.employeeEnroll, c.memberNric, c.employeeJoiningDDMMYYYY, 
                    d.employeeleaveapplicationLeaveFromDDMMYYYY, d.employeeleaveapplicationLeaveToDDMMYYYY, 
                    IFNULL(d.employeeleaveapplicationNoOfDays,0) AS employeeleaveapplicationNoOfDays,
                    IFNULL(d.employeeleaveapplicationReason,'') AS employeeleaveapplicationReason 
                    FROM view_employeeleavereport AS a 
                    INNER JOIN view_employee AS c ON a.employerId = c.employerId 
                        AND a.employeeId = c.employeeId 
                    LEFT JOIN view_employeeleaveapplication AS d ON a.employeeId = d.employeeId 
                        AND a.employerId = d.employerId 
                        AND a.employerleavetypeId = d.employerleavetypeId 
                        AND DATE_FORMAT(a.startYear, '%Y%m%d') <= DATE_FORMAT(d.employeeleaveapplicationLeaveFrom,'%Y%m%d') 
                        AND DATE_FORMAT(a.endYear, '%Y%m%d') >= DATE_FORMAT(d.employeeleaveapplicationLeaveTo,'%Y%m%d')) AS DATA WHERE 1=1 ` + strwhere;
    return strquery;
};

exports.data = method;