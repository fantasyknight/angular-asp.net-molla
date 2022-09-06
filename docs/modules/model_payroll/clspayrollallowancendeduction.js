var method = {};

method.masterData = (request) => {
    let payrollallowancendeductionId = request.body.payrollallowancendeductionId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let employerallowanceId = request.body.employerallowanceId || 0;
    let payrollallowancendeductionAmount = request.body.payrollallowancendeductionAmount || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollallowancendeductionId,
        payrollsalaryId,
        employerallowanceId,
        payrollallowancendeductionAmount,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollallowancendeductionId,payrollsalaryId,employerallowanceId,payrollallowancendeductionAmount,createdBy,createdDate from tblpayrollallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollallowancendeduction where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollallowancendeduction where 1 = 1 and payrollallowancendeductionId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollallowancendeduction (payrollsalaryId, employerallowanceId, payrollallowancendeductionAmount, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.employerallowanceId + "', '" + pera.payrollallowancendeductionAmount + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollallowancendeduction (payrollsalaryId, employerallowanceId, payrollallowancendeductionAmount, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollallowancendeduction set payrollsalaryId = '" + pera.payrollsalaryId + "', employerallowanceId = '" + pera.employerallowanceId + "', payrollallowancendeductionAmount = '" + pera.payrollallowancendeductionAmount + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollallowancendeductionId = '" + pera.payrollallowancendeductionId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollallowancendeduction set " + column + " where payrollallowancendeductionId = " + id + " ";
    return strquery;
};

method.select_view_payrollallowancendeduction = function (strwhere) {
    var strquery = "select * from view_payrollallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_payrollallowancendeduction = function (strwhere) {
    var strquery = "select count(*) as cnt from view_payrollallowancendeduction where 1=1 " + strwhere;
    return strquery;
};

method.select_payrollAllowancenDeductionForPrint = function (strwhere) {
    var strquery = `SELECT payrollsalaryId, employerallowanceId, payrollallowancendeductionAmount, payrollallowancendeductionAmountRound2, payrollallowancendeductionAmountRound4, employerallowanceCode, 
                    employerallowanceDescription 
                    FROM view_payrollallowancendeduction WHERE 1 = 1  ` + strwhere;
    return strquery;
};

method.select_payrollAllowancenDeductionGroupForPrint = function (strwhere) {
    var strquery = `SELECT *,
                    CAST(ROUND(SUM(payrollallowancendeductionAmount), 2) AS CHAR CHARSET utf8) AS totalPayrollallowancendeductionAmountRound2,
                    CAST(ROUND(SUM(payrollallowancendeductionAmount), 4) AS CHAR CHARSET utf8) AS totalPayrollallowancendeductionAmountRound4
                    FROM 
                    (SELECT a.payrollsalaryId, a.payrollallowancendeductionAmount, a.employerallowanceCode, a.employerallowanceDescription, b.employeeId, b.employerId 
                    FROM view_payrollallowancendeduction AS a 
                    INNER JOIN tblpayrollsalary AS b ON a.payrollsalaryId = b.payrollsalaryId) AS DATA WHERE 1 = 1 ` + strwhere + ` GROUP BY employeeId, employerallowanceCode  `;
    return strquery;
};

exports.data = method;