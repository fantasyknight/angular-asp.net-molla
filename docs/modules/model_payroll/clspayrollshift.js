var method = {};

method.masterData = (request) => {
    let payrollshiftId = request.body.payrollshiftId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let employeeshiftsetupId = request.body.employeeshiftsetupId || 0;
    let payrollShiftRate = request.body.payrollShiftRate || 0.0;
    let payrollShiftUnit = request.body.payrollShiftUnit || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollshiftId,
        payrollsalaryId,
        employeeshiftsetupId,
        payrollShiftRate,
        payrollShiftUnit,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollshift where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollshiftId,payrollsalaryId,employeeshiftsetupId,payrollShiftRate,payrollShiftUnit,createdBy,createdDate from tblpayrollshift where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollshift where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollshift where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollshift where 1 = 1 and payrollshiftId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollshift where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollshift (payrollsalaryId, employeeshiftsetupId, payrollShiftRate, payrollShiftUnit, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.employeeshiftsetupId + "', '" + pera.payrollShiftRate + "', '" + pera.payrollShiftUnit + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollshift (payrollsalaryId, employeeshiftsetupId, payrollShiftRate, payrollShiftUnit, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollshift set payrollsalaryId = '" + pera.payrollsalaryId + "', employeeshiftsetupId = '" + pera.employeeshiftsetupId + "', payrollShiftRate = '" + pera.payrollShiftRate + "', payrollShiftUnit = '" + pera.payrollShiftUnit + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollshiftId = '" + pera.payrollshiftId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollshift set " + column + " where payrollshiftId = " + id + " ";
    return strquery;
};

method.select_view_payrollshift = function (strwhere) {
    var strquery = `select * from (select a.payrollshiftId, a.payrollsalaryId, a.employeeshiftsetupId, a.payrollShiftRate, a.payrollShiftUnit,
                    b.employershiftsetupDescription, b.employershiftsetupEPF, b.employershiftsetupSocso, b.employershiftsetupPCB, b.employershiftsetupEIS,
                    b.employershiftsetupOT, b.employershiftsetupNPL, b.employershiftsetupCP8A, b.employershiftsetupCP22A, b.employershiftsetupHRDF,
                    CAST(ROUND(a.payrollShiftRate,2) AS CHAR CHARSET utf8) AS payrollShiftRateRound2, 
                    CAST(ROUND(a.payrollShiftRate,4) AS CHAR CHARSET utf8) AS payrollShiftRateRound4   
                    from tblpayrollshift as a left join tblemployershiftsetup as b on a.employeeshiftsetupId = b.employershiftsetupId) as data where 1=1 ` + strwhere;
    return strquery;
};

method.select_payrollShiftForPrint = function (strwhere) {
    var strquery = `select *,
                    CAST(ROUND(totalShift, 2) AS CHAR CHARSET utf8) AS totalShiftRound2,
                    CAST(ROUND(totalShift, 4) AS CHAR CHARSET utf8) AS totalShiftRound4  
                    from 
                    (select a.payrollshiftId, a.payrollsalaryId, a.employeeshiftsetupId, a.payrollShiftRate, a.payrollShiftUnit,
                    (a.payrollShiftRate * a.payrollShiftUnit) AS totalShift,
                    b.employershiftsetupDescription, b.employershiftsetupCode,
                    CAST(ROUND(a.payrollShiftRate,2) AS CHAR CHARSET utf8) AS payrollShiftRateRound2, 
                    CAST(ROUND(a.payrollShiftRate,4) AS CHAR CHARSET utf8) AS payrollShiftRateRound4   
                    from tblpayrollshift as a left join tblemployershiftsetup as b on a.employeeshiftsetupId = b.employershiftsetupId) as data where 1=1 ` + strwhere;
    return strquery;
};

method.select_payrollShiftGroupForPrint = function (strwhere) {
    var strquery = `SELECT *, 
                    CAST(ROUND(SUM(payrollShiftUnit), 2) AS CHAR CHARSET utf8) AS totalpayrollShiftUnit,
                    CAST(ROUND(SUM(totalShift), 2) AS CHAR CHARSET utf8) AS totalShiftRound2,
                    CAST(ROUND(SUM(totalShift), 4) AS CHAR CHARSET utf8) AS totalShiftRound4 
                    FROM 
                    (SELECT a.payrollshiftId, a.payrollsalaryId, a.employeeshiftsetupId, a.payrollShiftRate, (a.payrollShiftRate * a.payrollShiftUnit) AS totalShift, a.payrollShiftUnit,
                    b.employeeId, b.employerId 
                    FROM tblpayrollshift AS a INNER JOIN tblpayrollsalary AS b ON a.payrollsalaryId = b.payrollsalaryId) AS DATA WHERE 1 = 1 ` + strwhere + ` GROUP BY employeeId `;
    return strquery;
};

exports.data = method;