var method = {};

method.masterData = (request) => {
    let payrollloanId = request.body.payrollloanId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let employeeloanId = request.body.employeeloanId || 0;
    let payrollloanAmount = request.body.payrollloanAmount || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollloanId,
        payrollsalaryId,
        employeeloanId,
        payrollloanAmount,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollloan where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollloanId,payrollsalaryId,employeeloanId,payrollloanAmount,createdBy,createdDate from tblpayrollloan where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollloan where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollloan where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollloan where 1 = 1 and payrollloanId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollloan where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollloan (payrollsalaryId, employeeloanId, payrollloanAmount, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.employeeloanId + "', '" + pera.payrollloanAmount + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollloan (payrollsalaryId, employeeloanId, payrollloanAmount, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollloan set payrollsalaryId = '" + pera.payrollsalaryId + "', employeeloanId = '" + pera.employeeloanId + "', payrollloanAmount = '" + pera.payrollloanAmount + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollloanId = '" + pera.payrollloanId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollloan set " + column + " where payrollloanId = " + id + " ";
    return strquery;
};

method.select_view_payrollloan = function (strwhere) {
    var strquery = "select * from view_payrollloan where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_payrollloan = function (strwhere) {
    var strquery = "select count(*) as cnt from view_payrollloan where 1=1 " + strwhere;
    return strquery;
};

method.select_payrollLoanForPrint = function (strwhere) {
    var strquery = `SELECT payrollsalaryId, payrollloanAmount, payrollloanAmountRound2, payrollloanAmountRound4, employeeloanNote FROM view_payrollloan WHERE 1 = 1  ` + strwhere;
    return strquery;
};

method.select_payrollLoanGroupForPrint = function (strwhere) {
    var strquery = `SELECT *, 
                    CAST(ROUND(SUM(payrollloanAmount), 2) AS CHAR CHARSET utf8) AS totalPayrollloanAmountRound2,
                    CAST(ROUND(SUM(payrollloanAmount), 4) AS CHAR CHARSET utf8) AS totalPayrollloanAmountRound4 
                    FROM 
                    (SELECT a.payrollsalaryId, a.payrollloanAmount, a.employeeloanNote, b.employeeId, b.employerId 
                    FROM view_payrollloan AS a INNER JOIN tblpayrollsalary AS b ON a.payrollsalaryId = b.payrollsalaryId) AS DATA WHERE 1 = 1 ` + strwhere + ` GROUP BY employeeId, employeeloanNote `;
    return strquery;
};

exports.data = method;