var method = {};

method.masterData = (request) => {
    let payrollnplId = request.body.payrollnplId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let payrollNplDaysRate = request.body.payrollNplDaysRate || 0.0;
    let payrollNplDayUnit = request.body.payrollNplDayUnit || 0.0;
    let payrollNplHourRate = request.body.payrollNplHourRate || 0.0;
    let payrollNplHourUnit = request.body.payrollNplHourUnit || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollnplId,
        payrollsalaryId,
        payrollNplDaysRate,
        payrollNplDayUnit,
        payrollNplHourRate,
        payrollNplHourUnit,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollnpl where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollnplId,payrollsalaryId,payrollNplDaysRate,payrollNplDayUnit,payrollNplHourRate,payrollNplHourUnit,createdBy,createdDate from tblpayrollnpl where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollnpl where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollnpl where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollnpl where 1 = 1 and payrollnplId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollnpl where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollnpl (payrollsalaryId, payrollNplDaysRate, payrollNplDayUnit, payrollNplHourRate, payrollNplHourUnit, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.payrollNplDaysRate + "', '" + pera.payrollNplDayUnit + "', '" + pera.payrollNplHourRate + "', '" + pera.payrollNplHourUnit + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollnpl (payrollsalaryId, payrollNplDaysRate, payrollNplDayUnit, payrollNplHourRate, payrollNplHourUnit, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollnpl set payrollsalaryId = '" + pera.payrollsalaryId + "', payrollNplDaysRate = '" + pera.payrollNplDaysRate + "', payrollNplDayUnit = '" + pera.payrollNplDayUnit + "', payrollNplHourRate = '" + pera.payrollNplHourRate + "', payrollNplHourUnit = '" + pera.payrollNplHourUnit + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollnplId = '" + pera.payrollnplId + "' ";
    return strquery;
};

method.updateStringColumn = function (pera) {
    var strquery = "update tblpayrollnpl set payrollNplDaysRate = " + pera.payrollNplDaysRate + ", payrollNplDayUnit = " + pera.payrollNplDayUnit +
        ", payrollNplHourRate = " + pera.payrollNplHourRate + ", payrollNplHourUnit = " + pera.payrollNplHourUnit + " where payrollsalaryId = " + pera.payrollsalaryId;
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollnpl set " + column + " where payrollnplId = " + id + " ";
    return strquery;
};

method.select_view_payrollnpl = function (strwhere) {
    var strquery = "select * from view_payrollnpl where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_payrollnpl = function (strwhere) {
    var strquery = "select count(*) as cnt from view_payrollnpl where 1=1 " + strwhere;
    return strquery;
};

method.select_payrollNplForPrint = function (strwhere) {
    var strquery = `select *,
                    CAST(ROUND(totalDay, 2) AS CHAR CHARSET utf8) AS totalDayRound2,
                    CAST(ROUND(totalDay, 4) AS CHAR CHARSET utf8) AS totalDayRound4,
                    CAST(ROUND(totalHour, 2) AS CHAR CHARSET utf8) AS totalHourRound2,
                    CAST(ROUND(totalHour, 4) AS CHAR CHARSET utf8) AS totalHourRound4 
                    from 
                    (SELECT payrollnplId, payrollsalaryId, payrollNplDaysRate,
                    CAST(ROUND(payrollNplDaysRate,2) AS CHAR CHARSET utf8) AS payrollNplDaysRateRound2, 
                    CAST(ROUND(payrollNplDaysRate,4) AS CHAR CHARSET utf8) AS payrollNplDaysRateRound4,
                    payrollNplDayUnit, payrollNplHourRate,
                    (payrollNplDaysRate * payrollNplDayUnit) AS totalDay,
                    CAST(ROUND(payrollNplHourRate,2) AS CHAR CHARSET utf8) AS payrollNplHourRateRound2,
                    CAST(ROUND(payrollNplHourRate,4) AS CHAR CHARSET utf8) AS payrollNplHourRateRound4,
                    payrollNplHourUnit,
                    (payrollNplHourRate * payrollNplHourUnit) AS totalHour
                    FROM tblpayrollnpl) as Data WHERE 1 = 1  ` + strwhere;
    return strquery;
};

method.select_payrollNplGroupForPrint = function (strwhere) {
    var strquery = `SELECT *,
                    SUM(payrollNplDayUnit) AS totalPayrollNplDayUnit,
                    SUM(payrollNplHourUnit) AS totalPayrollNplHourUnit,
                    CAST(ROUND(SUM(totalDays + totalHours), 2) AS CHAR CHARSET utf8) AS totalNPLRound2,
                    CAST(ROUND(SUM(totalDays + totalHours), 4) AS CHAR CHARSET utf8) AS totalNPLRound4 
                    FROM 
                    (SELECT a.payrollnplId, a.payrollsalaryId, a.payrollNplDaysRate, a.payrollNplDayUnit, a.payrollNplHourRate, a.payrollNplHourUnit, b.employeeId, b.employerId,
                    (a.payrollNplDaysRate * a.payrollNplDayUnit) AS totalDays,
                    (a.payrollNplHourRate * a.payrollNplHourUnit) AS totalHours
                    FROM tblpayrollnpl AS a INNER JOIN tblpayrollsalary AS b ON a.payrollsalaryId = b.payrollsalaryId) AS DATA WHERE 1 = 1 ` + strwhere + ` GROUP BY employeeId `;
    return strquery;
};

exports.data = method;