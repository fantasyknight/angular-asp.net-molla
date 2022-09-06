var method = {};

method.masterData = (request) => {
    let payrolladditionalpayId = request.body.payrolladditionalpayId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let employeradditionalpaysetupId = request.body.employeradditionalpaysetupId || 0;
    let payrolladditionalpayRate = request.body.payrolladditionalpayRate || 0.0;
    let payrolladditionalpayUnit = request.body.payrolladditionalpayUnit || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrolladditionalpayId,
        payrollsalaryId,
        employeradditionalpaysetupId,
        payrolladditionalpayRate,
        payrolladditionalpayUnit,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrolladditionalpay where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrolladditionalpayId,payrollsalaryId,employeradditionalpaysetupId,payrolladditionalpayRate,payrolladditionalpayUnit,createdBy,createdDate from tblpayrolladditionalpay where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrolladditionalpay where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrolladditionalpay where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrolladditionalpay where 1 = 1 and payrolladditionalpayId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrolladditionalpay where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrolladditionalpay (payrollsalaryId, employeradditionalpaysetupId, payrolladditionalpayRate, payrolladditionalpayUnit, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.employeradditionalpaysetupId + "', '" + pera.payrolladditionalpayRate + "', '" + pera.payrolladditionalpayUnit + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrolladditionalpay (payrollsalaryId, employeradditionalpaysetupId, payrolladditionalpayRate, payrolladditionalpayUnit, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrolladditionalpay set payrollsalaryId = '" + pera.payrollsalaryId + "', employeradditionalpaysetupId = '" + pera.employeradditionalpaysetupId + "', payrolladditionalpayRate = '" + pera.payrolladditionalpayRate + "', payrolladditionalpayUnit = '" + pera.payrolladditionalpayUnit + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrolladditionalpayId = '" + pera.payrolladditionalpayId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrolladditionalpay set " + column + " where payrolladditionalpayId = " + id + " ";
    return strquery;
};

method.select_view_payrolladditionalpay = function (strwhere) {
    var strquery = `select * from (select a.payrolladditionalpayId, a.payrollsalaryId, a.employeradditionalpaysetupId, a.payrolladditionalpayRate, 
                    a.payrolladditionalpayUnit, b.employeradditionalpaysetupCode, b.employeradditionalpaysetupDescription, b.employeradditionalpaysetupEPF, 
                    b.employeradditionalpaysetupSocso, b.employeradditionalpaysetupPCB, b.employeradditionalpaysetupEIS, b.employeradditionalpaysetupOT, 
                    b.employeradditionalpaysetupNPL, b.employeradditionalpaysetupCP8A, b.employeradditionalpaysetupCP22A, b.employeradditionalpaysetupHRDF,
                    CAST(ROUND(a.payrolladditionalpayRate, 2) AS CHAR CHARSET utf8) AS payrolladditionalpayRateRound2,
                    CAST(ROUND(a.payrolladditionalpayRate, 4) AS CHAR CHARSET utf8) AS payrolladditionalpayRateRound4 
                    from tblpayrolladditionalpay as a left join tblemployeradditionalpaysetup as b 
                    on a.employeradditionalpaysetupId = b.employeradditionalpaysetupId) as data where 1 = 1 ` + strwhere;
    return strquery;
};

method.select_payrollAdditionalPayForPrint = function (strwhere) {
    var strquery = `select *,
                    CAST(ROUND(totalAdditionalPay, 2) AS CHAR CHARSET utf8) AS totalAdditionalPayRound2,
                    CAST(ROUND(totalAdditionalPay, 4) AS CHAR CHARSET utf8) AS totalAdditionalPayRound4
                    from 
                    (select a.payrolladditionalpayId, a.payrollsalaryId, a.employeradditionalpaysetupId, a.payrolladditionalpayRate, 
                    (a.payrolladditionalpayRate * a.payrolladditionalpayUnit) AS totalAdditionalPay,
                    a.payrolladditionalpayUnit, b.employeradditionalpaysetupCode, b.employeradditionalpaysetupDescription,
                    CAST(ROUND(a.payrolladditionalpayRate, 2) AS CHAR CHARSET utf8) AS payrolladditionalpayRateRound2,
                    CAST(ROUND(a.payrolladditionalpayRate, 4) AS CHAR CHARSET utf8) AS payrolladditionalpayRateRound4 
                    from tblpayrolladditionalpay as a left join tblemployeradditionalpaysetup as b 
                    on a.employeradditionalpaysetupId = b.employeradditionalpaysetupId) as data where 1 = 1 ` + strwhere;
    return strquery;
};

method.select_payrollAdditionalPayGroupForPrint = function (strwhere) {
    var strquery = `SELECT *,
                    CAST(ROUND(SUM(payrolladditionalpayUnit), 2) AS CHAR CHARSET utf8) AS totalPayrolladditionalpayUnit,
                    CAST(ROUND(SUM(totalAdditionalPay), 2) AS CHAR CHARSET utf8) AS totalAdditionalPayRound2,
                    CAST(ROUND(SUM(totalAdditionalPay), 4) AS CHAR CHARSET utf8) AS totalAdditionalPayRound4 FROM 
                    (SELECT a.payrolladditionalpayId, a.payrollsalaryId, a.employeradditionalpaysetupId, a.payrolladditionalpayRate, a.payrolladditionalpayUnit, 
                    (a.payrolladditionalpayRate * a.payrolladditionalpayUnit) AS totalAdditionalPay, b.employeeId, b.employerId 
                    FROM tblpayrolladditionalpay AS a INNER JOIN tblpayrollsalary AS b ON a.payrollsalaryId = b.payrollsalaryId) AS DATA WHERE 1 = 1 ` + strwhere + ` GROUP BY employeeId `;
    return strquery;
};

exports.data = method;