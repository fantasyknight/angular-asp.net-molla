var method = {};

method.masterData = (request) => {
    let payrollAttendanceId = request.body.payrollAttendanceId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let payrollDate = request.body.payrollDate || null;
    let payrollInTime = request.body.payrollInTime || null;
    let payrollOutTime = request.body.payrollOutTime || null;
    let payrollBasicSalary = request.body.payrollBasicSalary || 0.0;
    let payrollNetSalary = request.body.payrollNetSalary || 0.0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollAttendanceId,
        employerId,
        employeeId,
        payrollDate,
        payrollInTime,
        payrollOutTime,
        payrollBasicSalary,
        payrollNetSalary,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollAttendanceId,employerId,employeeId,payrollDate,payrollInTime,payrollOutTime,payrollBasicSalary,payrollNetSalary,createdDate from tblpayrollattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollattendance where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollattendance where 1 = 1 and payrollAttendanceId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.payrollDate == null) pera.payrollDate = null;
    else pera.payrollDate = "'" + pera.payrollDate + "'";

    if (pera.payrollInTime == null) pera.payrollInTime = null;
    else pera.payrollInTime = "'" + pera.payrollInTime + "'";

    if (pera.payrollOutTime == null) pera.payrollOutTime = null;
    else pera.payrollOutTime = "'" + pera.payrollOutTime + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollattendance (employerId, employeeId, payrollDate, payrollInTime, payrollOutTime, payrollBasicSalary, payrollNetSalary, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', " + pera.payrollDate + ", " + pera.payrollInTime + ", " + pera.payrollOutTime + ", '" + pera.payrollBasicSalary + "', '" + pera.payrollNetSalary + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollattendance (employerId, employeeId, payrollDate, payrollInTime, payrollOutTime, payrollBasicSalary, payrollNetSalary, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.payrollDate == null) pera.payrollDate = null;
    else pera.payrollDate = "'" + pera.payrollDate + "'";

    if (pera.payrollInTime == null) pera.payrollInTime = null;
    else pera.payrollInTime = "'" + pera.payrollInTime + "'";

    if (pera.payrollOutTime == null) pera.payrollOutTime = null;
    else pera.payrollOutTime = "'" + pera.payrollOutTime + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollattendance set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', payrollDate = " + pera.payrollDate + ", payrollInTime = " + pera.payrollInTime + ", payrollOutTime = " + pera.payrollOutTime + ", payrollBasicSalary = '" + pera.payrollBasicSalary + "', payrollNetSalary = '" + pera.payrollNetSalary + "', createdDate = " + pera.createdDate + " where payrollAttendanceId = '" + pera.payrollAttendanceId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollattendance set " + column + " where payrollAttendanceId = " + id + " ";
    return strquery;
};

method.select_view_payrollattendance = function (strwhere) {
    var strquery = `SELECT * FROM 
                    (SELECT a.payrollAttendanceId, a.employerId, a.employeeId, a.payrollDate, a.payrollInTime, a.payrollOutTime, a.payrollBasicSalary, 
                    CAST(ROUND(a.payrollBasicSalary,2) AS CHAR CHARSET utf8) AS payrollBasicSalaryRound2,
                    CAST(ROUND(a.payrollBasicSalary,4) AS CHAR CHARSET utf8) AS payrollBasicSalaryRound4,
                    CONVERT(a.payrollNetSalary, CHAR) AS payrollNetSalary,
                    CAST(ROUND(a.payrollNetSalary,2) AS CHAR CHARSET utf8) AS payrollNetSalaryRound2,
                    CAST(ROUND(a.payrollNetSalary,4) AS CHAR CHARSET utf8) AS payrollNetSalaryRound4,
                    b.memberName , SEC_TO_TIME(TIMESTAMPDIFF(SECOND,a.payrollInTime,a.payrollOutTime)) AS totalTime,
                    b.memberNric, b.employerdepartmentTitle, b.employerbranchName, b.employeeEnroll, b.memberEmail, b.employerdepartmentId, b.employerbranchId,
                    DATE_FORMAT(a.payrollDate,'%d/%m/%Y') AS _payrollDate, DATE_FORMAT(a.payrollInTime,'%d/%m/%Y %H:%i:%s') AS _payrollInTime, DATE_FORMAT(a.payrollOutTime,'%d/%m/%Y %H:%i:%s') AS _payrollOutTime
                    FROM 
                    tblpayrollattendance AS a 
                    INNER JOIN view_employee AS b ON a.employeeId = b.employeeId AND a.employerId = b.employerId) AS DATA 
                    WHERE 1=1 ` + strwhere;
    return strquery;
};

method.getcount_view_payrollattendance = function (strwhere) {
    var strquery = `SELECT count(*) as cnt  FROM 
                    (SELECT a.payrollAttendanceId, a.employerId, a.employeeId, a.payrollDate, a.payrollInTime, a.payrollOutTime, a.payrollBasicSalary, 
                    a.payrollNetSalary, b.memberName , SEC_TO_TIME(TIMESTAMPDIFF(SECOND,a.payrollInTime,a.payrollOutTime)) AS totalTime,
                    b.memberNric, b.employerdepartmentTitle, b.employerbranchName, b.employeeEnroll, b.memberEmail, b.employerdepartmentId, b.employerbranchId
                    FROM 
                    tblpayrollattendance AS a 
                    INNER JOIN view_employee AS b ON a.employeeId = b.employeeId AND a.employerId = b.employerId) AS DATA 
                    WHERE 1=1 ` + strwhere;
    return strquery;
};

method.select_distinct = function (strwhere) {
    var strquery = `SELECT DISTINCT _payrollDate FROM 
                    (SELECT a.payrollAttendanceId, a.employerId, a.employeeId, a.payrollDate, a.payrollInTime, a.payrollOutTime, a.payrollBasicSalary, 
                    a.payrollNetSalary, b.memberName , SEC_TO_TIME(TIMESTAMPDIFF(SECOND,a.payrollInTime,a.payrollOutTime)) AS totalTime,
                    b.memberNric, b.employerdepartmentTitle, b.employerbranchName, b.employeeEnroll, b.memberEmail, b.employerdepartmentId, b.employerbranchId,
                    DATE_FORMAT(a.payrollDate,'%d/%m/%Y') AS _payrollDate, DATE_FORMAT(a.payrollInTime,'%d/%m/%Y %H:%i:%s') AS _payrollInTime, DATE_FORMAT(a.payrollOutTime,'%d/%m/%Y %H:%i:%s') AS _payrollOutTime
                    FROM 
                    tblpayrollattendance AS a 
                    INNER JOIN view_employee AS b ON a.employeeId = b.employeeId AND a.employerId = b.employerId) AS DATA 
                    WHERE 1=1 ` + strwhere;
    return strquery;
};

method.select_view_payrollattendance_report = function (strwhere) {
    var strquery = `SELECT * FROM view_payrollattendance WHERE 1=1 ` + strwhere;
    return strquery;
};

method.select_view_payrollattendance_payment_method_report = function (strwhere) {
    var strquery = `SELECT *,
    CAST(ROUND(SUM(payrollNetSalary),2) AS CHAR CHARSET utf8) AS payrollNetSalaryTotalRound2, 
    CAST(ROUND(SUM(payrollNetSalary),4) AS CHAR CHARSET utf8) AS payrollNetSalaryTotalRound4
    FROM view_payrollattendance WHERE 1=1 ` + strwhere;
    return strquery;
};


exports.data = method;