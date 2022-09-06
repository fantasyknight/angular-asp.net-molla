var method = {};

method.masterData = (request) => {
    let payrollId = request.body.payrollId || 0;
    let employerId = request.body.employerId || 0;
    let payrollDate = request.body.payrollDate || null;
    let payrollYear = request.body.payrollYear || '';
    let payrollMonth = request.body.payrollMonth || '';
    let isLocked = request.body.isLocked || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollId,
        employerId,
        payrollDate,
        payrollYear,
        payrollMonth,
        isLocked,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollId,employerId,payrollDate,payrollYear,payrollMonth,isLocked,createdBy,createdDate from tblpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayroll where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayroll where 1 = 1 and payrollId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.payrollDate == null) pera.payrollDate = null;
    else pera.payrollDate = "'" + pera.payrollDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayroll (employerId, payrollDate, payrollYear, payrollMonth, isLocked, createdBy, createdDate) values ('" + pera.employerId + "', " + pera.payrollDate + ", '" + pera.payrollYear + "', '" + pera.payrollMonth + "', " + pera.isLocked + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayroll (employerId, payrollDate, payrollYear, payrollMonth, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.payrollDate == null) pera.payrollDate = null;
    else pera.payrollDate = "'" + pera.payrollDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayroll set employerId = '" + pera.employerId + "', payrollDate = " + pera.payrollDate + ", payrollYear = '" + pera.payrollYear + "', payrollMonth = '" + pera.payrollMonth + "', isLocked = " + pera.isLocked + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollId = '" + pera.payrollId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayroll set " + column + " where payrollId = " + id + " ";
    return strquery;
};

method.select_view_payroll = function (strwhere) {
    var strquery = "select * from view_payroll where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_payroll = function (strwhere) {
    var strquery = "select count(*) as cnt from view_payroll where 1=1 " + strwhere;
    return strquery;
};

method.sp_ExecuteSalaryProcessAll = function (employerID, firstDateOfMonth, lastDateOfMonth, totalDays) {
    var strquery = "CALL sp_ExecuteSalaryProcessAll ( " + employerID + ", " + totalDays + ",'" + firstDateOfMonth + "','" + lastDateOfMonth + "')";
    return strquery;
};

method.sp_ExecuteSalaryProcessEmployee = function (employeeList, employerID, firstDateOfMonth, lastDateOfMonth, totalDays) {
    var strquery = "CALL sp_ExecuteSalaryProcessEmployee ( " + employerID + ", " + totalDays + ",'" + firstDateOfMonth + "','" + lastDateOfMonth + "','" + employeeList + "')";
    return strquery;
};

method.selectForExport = function (strwhere) {
    var strquery = `select * from 
                    (select a.payrollsalaryId, a.payrollId, a.employerId, a.employeeId, a.payrollsalaryBasic, a.payrollsalaryGenerated, 
                    a.payrollsalaryEarning, a.payrollsalaryDeduction, a.payrollsalaryGross, a.payrollsalaryWorkingDay, 
                    a.payrollIsStatutory, a.payrollIsPaidLeave, b.employeeEnroll, b.memberName, b.memberNric, b.employerdepartmentId, b.employerbranchId,
                    b.employeeAlternativeEnroll, b.employeeJoiningDDMMYYYY, b.employerDepartmentTitle, b.employerBranchName 
                    from tblpayrollsalary as a 
                    left join view_employee as b on a.employeeId = b.employeeId and a.employerId = b.employerId ) as data where 1 = 1 ` + strwhere;
    return strquery;
};

method.updateLocked = function (flag, id) {
    var strquery = "update tblpayroll set isLocked = " + flag + " where 1=1 and payrollId = " + id;
    return strquery;
};

exports.data = method;