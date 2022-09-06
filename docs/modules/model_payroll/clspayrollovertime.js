var method = {};

method.masterData = (request) => {
    let payrollovertimeId = request.body.payrollovertimeId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let employeeotsetupId = request.body.employeeotsetupId || 0;
    let payrollovertimeRate = request.body.payrollovertimeRate || 0.0;
    let payrollovertimeUnit = request.body.payrollovertimeUnit || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollovertimeId,
        payrollsalaryId,
        employeeotsetupId,
        payrollovertimeRate,
        payrollovertimeUnit,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollovertime where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollovertimeId,payrollsalaryId,employeeotsetupId,payrollovertimeRate,payrollovertimeUnit,createdBy,createdDate from tblpayrollovertime where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollovertime where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollovertime where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollovertime where 1 = 1 and payrollovertimeId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollovertime where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollovertime (payrollsalaryId, employeeotsetupId, payrollovertimeRate, payrollovertimeUnit, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.employeeotsetupId + "', '" + pera.payrollovertimeRate + "', '" + pera.payrollovertimeUnit + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollovertime (payrollsalaryId, employeeotsetupId, payrollovertimeRate, payrollovertimeUnit, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollovertime set payrollsalaryId = '" + pera.payrollsalaryId + "', employeeotsetupId = '" + pera.employeeotsetupId + "', payrollovertimeRate = '" + pera.payrollovertimeRate + "', payrollovertimeUnit = '" + pera.payrollovertimeUnit + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollovertimeId = '" + pera.payrollovertimeId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollovertime set " + column + " where payrollovertimeId = " + id + " ";
    return strquery;
};

method.select_view_payrollovertime = function (strwhere) {
    var strquery = `select * from (select a.payrollovertimeId, a.payrollsalaryId, a.employeeotsetupId, a.payrollovertimeRate, a.payrollovertimeUnit ,
                    b.employerotsetupDescription, b.employerotsetupEPF, b.employerotsetupSocso, b.employerotsetupPCB, b.employerotsetupEIS, b.employerotsetupCP8A,
                    b.employerotsetupCP22A, b.employerotsetupHRDF,
                    CAST(ROUND(a.payrollovertimeRate, 2) AS CHAR CHARSET utf8) AS payrollovertimeRateRound2,
                    CAST(ROUND(a.payrollovertimeRate, 4) AS CHAR CHARSET utf8) AS payrollovertimeRateRound4
                    from tblpayrollovertime as a left join tblemployerotsetup as b 
                    on a.employeeotsetupId = b.employerotsetupId) as data where 1 = 1 ` + strwhere;
    return strquery;
};

method.select_payrollOvertimeForPrint = function (strwhere) {
    var strquery = `select *,
                    CAST(ROUND(totalOverTime, 2) AS CHAR CHARSET utf8) AS totalOverTimeRound2,
                    CAST(ROUND(totalOverTime, 4) AS CHAR CHARSET utf8) AS totalOverTimeRound4 from 
                    (select a.payrollovertimeId, a.payrollsalaryId, a.employeeotsetupId, a.payrollovertimeRate, a.payrollovertimeUnit ,
                    (a.payrollovertimeRate * a.payrollovertimeUnit) AS totalOverTime,
                    b.employerotsetupDescription, b.employerotsetupOTCode,
                    CAST(ROUND(a.payrollovertimeRate, 2) AS CHAR CHARSET utf8) AS payrollovertimeRateRound2,
                    CAST(ROUND(a.payrollovertimeRate, 4) AS CHAR CHARSET utf8) AS payrollovertimeRateRound4
                    from tblpayrollovertime as a left join tblemployerotsetup as b 
                    on a.employeeotsetupId = b.employerotsetupId) as data where 1 = 1 ` + strwhere;
    return strquery;
};

method.select_payrollOvertimeGroupForPrint = function (strwhere) {
    var strquery = `SELECT *,
                    CAST(ROUND(SUM(payrollovertimeUnit), 2) AS CHAR CHARSET utf8) AS totalPayrollovertimeUnit,
                    CAST(ROUND(SUM(totalOverTime), 2) AS CHAR CHARSET utf8) AS totalOverTimeRound2,
                    CAST(ROUND(SUM(totalOverTime), 4) AS CHAR CHARSET utf8) AS totalOverTimeRound4 FROM
                    (SELECT a.payrollovertimeId, a.payrollsalaryId, a.employeeotsetupId, a.payrollovertimeRate, a.payrollovertimeUnit, (a.payrollovertimeRate * a.payrollovertimeUnit) AS totalOverTime,
                    b.employeeId, b.employerId FROM tblpayrollovertime AS a INNER JOIN tblpayrollsalary AS b ON a.payrollsalaryId = b.payrollsalaryId) AS DATA 
                    WHERE 1 = 1 ` + strwhere + ` GROUP BY employeeId `;
    return strquery;
};

exports.data = method;