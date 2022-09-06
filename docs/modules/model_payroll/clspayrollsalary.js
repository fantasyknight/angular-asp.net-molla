var method = {};

method.masterData = (request) => {
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let payrollId = request.body.payrollId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let payrollsalaryBasic = request.body.payrollsalaryBasic || 0.0;
    let payrollsalaryGenerated = request.body.payrollsalaryGenerated || 0.0;
    let payrollsalaryEarning = request.body.payrollsalaryEarning || 0.0;
    let payrollsalaryDeduction = request.body.payrollsalaryDeduction || 0.0;
    let payrollsalaryGross = request.body.payrollsalaryGross || 0.0;
    let payrollsalaryNet = request.body.payrollsalaryNet || 0.0;
    let payrollsalaryWorkingDay = request.body.payrollsalaryWorkingDay || 0.0;
    let payrollIsStatutory = request.body.payrollIsStatutory || false;
    let payrollIsPaidLeave = request.body.payrollIsPaidLeave || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollsalaryId,
        payrollId,
        employerId,
        employeeId,
        payrollsalaryBasic,
        payrollsalaryGenerated,
        payrollsalaryEarning,
        payrollsalaryDeduction,
        payrollsalaryGross,
        payrollsalaryNet,
        payrollsalaryWorkingDay,
        payrollIsStatutory,
        payrollIsPaidLeave,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollsalary where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollsalaryId,payrollId,employerId,employeeId,payrollsalaryBasic,payrollsalaryGenerated,payrollsalaryEarning,payrollsalaryDeduction,payrollsalaryGross,payrollsalaryNet,payrollsalaryWorkingDay,payrollIsStatutory,payrollIsPaidLeave,createdBy,createdDate from tblpayrollsalary where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollsalary where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollsalary where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollsalary where 1 = 1 and payrollsalaryId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollsalary where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollsalary (payrollId, employerId, employeeId, payrollsalaryBasic, payrollsalaryGenerated, payrollsalaryEarning, payrollsalaryDeduction, payrollsalaryGross, payrollsalaryNet, payrollsalaryWorkingDay, payrollIsStatutory, payrollIsPaidLeave, createdBy, createdDate) values ('" + pera.payrollId + "', '" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.payrollsalaryBasic + "', '" + pera.payrollsalaryGenerated + "', '" + pera.payrollsalaryEarning + "', '" + pera.payrollsalaryDeduction + "', '" + pera.payrollsalaryGross + "', '" + pera.payrollsalaryNet + "', '" + pera.payrollsalaryWorkingDay + "', " + pera.payrollIsStatutory + ", " + pera.payrollIsPaidLeave + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollsalary (payrollId, employerId, employeeId, payrollsalaryBasic, payrollsalaryGenerated, payrollsalaryEarning, payrollsalaryDeduction, payrollsalaryGross, payrollsalaryNet, payrollsalaryWorkingDay, payrollIsStatutory, payrollIsPaidLeave, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollsalary set payrollId = '" + pera.payrollId + "', employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', payrollsalaryBasic = '" + pera.payrollsalaryBasic + "', payrollsalaryGenerated = '" + pera.payrollsalaryGenerated + "', payrollsalaryEarning = '" + pera.payrollsalaryEarning + "', payrollsalaryDeduction = '" + pera.payrollsalaryDeduction + "', payrollsalaryGross = '" + pera.payrollsalaryGross + "', payrollsalaryNet = '" + pera.payrollsalaryNet + "', payrollsalaryWorkingDay = '" + pera.payrollsalaryWorkingDay + "', payrollIsStatutory = " + pera.payrollIsStatutory + ", payrollIsPaidLeave = " + pera.payrollIsPaidLeave + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollsalaryId = '" + pera.payrollsalaryId + "' ";
    return strquery;
};

method.updateStringColumn = function (pera) {
    var strquery = "update tblpayrollsalary set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', payrollsalaryBasic = '" + pera.payrollsalaryBasic + "', payrollsalaryGenerated = '" + pera.payrollsalaryGenerated + "', payrollsalaryEarning = '" + pera.payrollsalaryEarning + "', payrollsalaryDeduction = '" + pera.payrollsalaryDeduction + "', payrollsalaryGross = '" + pera.payrollsalaryGross + "', payrollsalaryNet = '" + pera.payrollsalaryNet + "', payrollsalaryWorkingDay = '" + pera.payrollsalaryWorkingDay + "', payrollIsStatutory = " + pera.payrollIsStatutory + ", payrollIsPaidLeave = " + pera.payrollIsPaidLeave + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollsalaryId = '" + pera.payrollsalaryId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollsalary set " + column + " where payrollsalaryId = " + id + " ";
    return strquery;
};

method.select_view_payrollsalary = function (strwhere) {
    var strquery = "select * from view_payrollsalary where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_payrollsalary = function (strwhere) {
    var strquery = "select count(*) as cnt from view_payrollsalary where 1=1 " + strwhere;
    return strquery;
};

method.select_PayrollSalaryForReport = function (strwhere) {
    var strquery = `SELECT *
                    FROM 
                    (SELECT a.payrollsalaryId, a.payrollId, 
                    (SELECT _payrollDateMonth FROM view_payroll WHERE 1=1 AND a.payrollId = view_payroll.payrollId )AS payrollDateMonth, a.employerId, a.employeeId, a.memberName, a.memberNric, a.memberPassport, a.memberEmail, a.employeeDesignation, a.employeeJoiningDDMMYYYY, a.employeeLeavingDDMMYYYY, a.memberIncomeTax, a.employeeAlternativeEnroll,
                    a.memberBankName, a.employeesalarysetupPaymentType, a.memberAccount, a.memberEIS, a.memberSocso, a.memberEPF, a.employeeEnroll, a.memberAddress1, a.employerbranchName, 
                    a.employerdepartmentTitle, a.employerdepartmentId, a.employerbranchId, a.payrollsalaryBasic, a.payrollsalaryBasicRound2, a.payrollsalaryBasicRound4, a.payrollsalaryGenerated,
                    a.payrollsalaryGeneratedRound2, a.payrollsalaryGeneratedRound4, a.payrollsalaryEarning, a.payrollsalaryEarningRound2, a.payrollsalaryEarningRound4, a.payrollsalaryDeduction,
                    a.payrollsalaryDeductionRound2, a.payrollsalaryDeductionRound4, a.payrollsalaryGross, a.payrollsalaryGrossRound2, a.payrollsalaryGrossRound4, a.payrollsalaryNet, a.payrollsalaryNetRound2,
                    CASE WHEN a.employeeIsActive = TRUE THEN 1 ELSE 0 END employeeIsActive,
                    a.payrollsalaryNetRound4, a.payrollsalaryWorkingDay, a.payrollIsStatutory, a.payrollIsPaidLeave, a.memberAddress2, a.memberAddress3, a.memberPostcode, a.memberCity, a.masterstateTitle, a.memberMobile,
                    b.payrollstatutoryId, b.payrollstatutoryEpfWages, b.payrollstatutoryEpfWagesRound2, 
                    b.payrollstatutoryEpfWagesRound4, b.payrollstatutoryEpfEmployee, b.payrollstatutoryEpfEmployeeRound2, b.payrollstatutoryEpfEmployeeRound4, b.payrollstatutoryEpfEmployer, b.payrollstatutoryEpfEmployerRound2,
                    b.payrollstatutoryEpfEmployerRound4, b.payrollstatutorySocsoWages, b.payrollstatutorySocsoWagesRound2, b.payrollstatutorySocsoWagesRound4, b.payrollstatutorySocsoEmployee, b.payrollstatutorySocsoEmployeeRound2, 
                    b.payrollstatutorySocsoEmployeeRound4, b.payrollstatutorySocsoEmployer, b.payrollstatutorySocsoEmployerRound2, b.payrollstatutorySocsoEmployerRound4, b.payrollstatutoryEISWages, 
                    b.payrollstatutoryEISWagesRound2, b.payrollstatutoryEISWagesRound4, b.payrollstatutoryEISEmployee, b.payrollstatutoryEISEmployeeRound2, b.payrollstatutoryEISEmployeeRound4, b.payrollstatutoryEISEmployer,
                    b.payrollstatutoryEISEmployerRound2, b.payrollstatutoryEISEmployerRound4, b.payrollstatutoryPcbWages, b.payrollstatutoryPcbWagesRound2, b.payrollstatutoryPcbWagesRound4, 
                    b.payrollstatutoryPcbEmployee, b.payrollstatutoryPcbEmployeeRound2, b.payrollstatutoryPcbEmployeeRound4, b.payrollstatutoryPcbEmployer, b.payrollstatutoryPcbEmployerRound2, b.payrollstatutoryPcbEmployerRound4,
                    b.payrollstatutoryHrdfWages, b.payrollstatutoryHrdfWagesRound2, b.payrollstatutoryHrdfWagesRound4, b.payrollstatutoryHrdfEmployee, b.payrollstatutoryHrdfEmployeeRound2, b.payrollstatutoryHrdfEmployeeRound4, 
                    b.payrollstatutoryHrdfEmployer, b.payrollstatutoryHrdfEmployerRound2, b.payrollstatutoryHrdfEmployerRound4,
                    c.employeesalarysetupEPFGroup, c.employeesalarysetupSocsoGroup, c.employeesalarysetupSocsoCategory, c.employeesalarysetupEISGroup, c.employeesalarysetupEISCategory,c.employeesalarysetupTaxBorneEmployer,
                    c.employeesalarysetupCategory, c.employeesalarysetupChildren 
                    FROM view_payrollsalary AS a 
                    INNER JOIN view_payrollstatutory AS b ON a.payrollsalaryId = b.payrollsalaryId
                    LEFT JOIN tblemployeesalarysetup AS c ON a.employeeId = c.employeeId AND a.employerId = c.employerId) AS DATA WHERE 1 = 1  ` + strwhere;
    return strquery;
};

method.select_PayrollSalaryGroupForReport = function (strwhere) {
    var strquery = `SELECT *,
                    GROUP_CONCAT(payrollsalaryId) AS payrollsalaryId_sum,
                    CAST(ROUND(SUM(payrollsalaryBasicRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryBasicRound2,
                    CAST(ROUND(SUM(payrollsalaryBasicRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryBasicRound4,
                    CAST(ROUND(SUM(payrollsalaryGeneratedRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryGeneratedRound2,
                    CAST(ROUND(SUM(payrollsalaryGeneratedRound2), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryGeneratedRound4,
                    CAST(ROUND(SUM(payrollsalaryEarningRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryEarningRound2,
                    CAST(ROUND(SUM(payrollsalaryEarningRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryEarningRound4,
                    CAST(ROUND(SUM(payrollsalaryDeductionRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryDeductionRound2,
                    CAST(ROUND(SUM(payrollsalaryDeductionRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryDeductionRound2,
                    CAST(ROUND(SUM(payrollsalaryGrossRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryGrossRound2,
                    CAST(ROUND(SUM(payrollsalaryGrossRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryGrossRound4,
                    CAST(ROUND(SUM(payrollsalaryNetRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryNetRound2,
                    CAST(ROUND(SUM(payrollsalaryNetRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryNetRound4,
                    CAST(ROUND(SUM(payrollstatutoryEpfWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryEpfWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutorySocsoWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoWagesRound2,
                    CAST(ROUND(SUM(payrollstatutorySocsoWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoWagesRound4,  
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutoryEISWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryEISWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutoryPcbWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryPcbWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutoryHrdfWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryHrdfWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryHrdfWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryHrdfWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryHrdfEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryHrdfEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryHrdfEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryHrdfEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryHrdfEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryHrdfEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryHrdfEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryHrdfEmployerRound
                    FROM 
                    (SELECT a.payrollsalaryId, a.payrollId, a.employerId, a.employeeId, a.memberName, 
                    CASE WHEN  a.memberNric != '' THEN a.memberNric ELSE a.memberPassport END AS memberNric, a.memberOther,
                    a.employeeJoiningDDMMYYYY, a.employeeLeavingDDMMYYYY, a.memberIncomeTax, a.employeeAlternativeEnroll,
                    a.memberBankName, a.employeesalarysetupPaymentType, a.memberAccount, a.memberEIS, a.memberSocso, a.memberEPF, a.employeeEnroll, a.memberAddress1, a.employerbranchName, 
                    a.employerdepartmentTitle, a.employerdepartmentId, a.employerbranchId, a.payrollsalaryBasic, a.payrollsalaryBasicRound2, a.payrollsalaryBasicRound4, a.payrollsalaryGenerated,
                    a.payrollsalaryGeneratedRound2, a.payrollsalaryGeneratedRound4, a.payrollsalaryEarning, a.payrollsalaryEarningRound2, a.payrollsalaryEarningRound4, a.payrollsalaryDeduction,
                    a.payrollsalaryDeductionRound2, a.payrollsalaryDeductionRound4, a.payrollsalaryGross, a.payrollsalaryGrossRound2, a.payrollsalaryGrossRound4, a.payrollsalaryNet, a.payrollsalaryNetRound2,
                    CASE WHEN a.employeeIsActive = TRUE THEN 1 ELSE 0 END employeeIsActive,
                    a.payrollsalaryNetRound4, a.payrollsalaryWorkingDay, a.payrollIsStatutory, a.payrollIsPaidLeave, b.payrollstatutoryId, b.payrollstatutoryEpfWages, b.payrollstatutoryEpfWagesRound0,  b.payrollstatutoryEpfWagesRound2, 
                    b.payrollstatutoryEpfWagesRound4, b.payrollstatutoryEpfEmployee, b.payrollstatutoryEpfEmployeeRound0, b.payrollstatutoryEpfEmployeeRound2, b.payrollstatutoryEpfEmployeeRound4, b.payrollstatutoryEpfEmployer, b.payrollstatutoryEpfEmployerRound0, b.payrollstatutoryEpfEmployerRound2,
                    b.payrollstatutoryEpfEmployerRound4, b.payrollstatutorySocsoWages, b.payrollstatutorySocsoWagesRound2, b.payrollstatutorySocsoWagesRound4, b.payrollstatutorySocsoEmployee, b.payrollstatutorySocsoEmployeeRound2, 
                    b.payrollstatutorySocsoEmployeeRound4, b.payrollstatutorySocsoEmployer, b.payrollstatutorySocsoEmployerRound2, b.payrollstatutorySocsoEmployerRound4, b.payrollstatutoryEISWages, 
                    b.payrollstatutoryEISWagesRound2, b.payrollstatutoryEISWagesRound4, b.payrollstatutoryEISEmployee, b.payrollstatutoryEISEmployeeRound2, b.payrollstatutoryEISEmployeeRound4, b.payrollstatutoryEISEmployer,
                    b.payrollstatutoryEISEmployerRound2, b.payrollstatutoryEISEmployerRound4, b.payrollstatutoryPcbWages, b.payrollstatutoryPcbWagesRound2, b.payrollstatutoryPcbWagesRound4, 
                    b.payrollstatutoryPcbEmployee, b.payrollstatutoryPcbEmployeeRound2, b.payrollstatutoryPcbEmployeeRound4, b.payrollstatutoryPcbEmployer, b.payrollstatutoryPcbEmployerRound2, b.payrollstatutoryPcbEmployerRound4, 
                    b.payrollstatutoryHrdfWages, b.payrollstatutoryHrdfWagesRound0, b.payrollstatutoryHrdfWagesRound2, b.payrollstatutoryHrdfWagesRound4, b.payrollstatutoryHrdfEmployee, b.payrollstatutoryHrdfEmployeeRound0, b.payrollstatutoryHrdfEmployeeRound2, b.payrollstatutoryHrdfEmployeeRound4,
                    b.payrollstatutoryHrdfEmployer, b.payrollstatutoryHrdfEmployerRound0, b.payrollstatutoryHrdfEmployerRound2, b.payrollstatutoryHrdfEmployerRound4,
                    c.employerRegistration , c.employerName, c.employerAddress1, c.employerAddress2, c.employerAddress3
                    FROM view_payrollsalary AS a 
                    INNER JOIN view_payrollstatutory AS b ON a.payrollsalaryId = b.payrollsalaryId
                    INNER JOIN view_employer AS c ON a.employerId = c.employerId
                    ) AS DATA WHERE 1 = 1  ` + strwhere;
    return strquery;
};

method.select_PayrollSalaryGroupForCP38Report = function (strwhere) {
    var strquery = `SELECT *,
                    GROUP_CONCAT(payrollsalaryId) AS payrollsalaryId_sum,
                    CAST(ROUND(SUM(payrollsalaryBasicRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryBasicRound2,
                    CAST(ROUND(SUM(payrollsalaryBasicRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryBasicRound4,
                    CAST(ROUND(SUM(payrollsalaryGeneratedRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryGeneratedRound2,
                    CAST(ROUND(SUM(payrollsalaryGeneratedRound2), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryGeneratedRound4,
                    CAST(ROUND(SUM(payrollsalaryEarningRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryEarningRound2,
                    CAST(ROUND(SUM(payrollsalaryEarningRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryEarningRound4,
                    CAST(ROUND(SUM(payrollsalaryDeductionRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryDeductionRound2,
                    CAST(ROUND(SUM(payrollsalaryDeductionRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryDeductionRound2,
                    CAST(ROUND(SUM(payrollsalaryGrossRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryGrossRound2,
                    CAST(ROUND(SUM(payrollsalaryGrossRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryGrossRound4,
                    CAST(ROUND(SUM(payrollsalaryNetRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollsalaryNetRound2,
                    CAST(ROUND(SUM(payrollsalaryNetRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollsalaryNetRound4,
                    CAST(ROUND(SUM(payrollstatutoryEpfWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryEpfWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryEpfEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEpfEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutorySocsoWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoWagesRound2,
                    CAST(ROUND(SUM(payrollstatutorySocsoWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoWagesRound4,  
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutorySocsoEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutorySocsoEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutoryEISWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryEISWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryEISEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryEISEmployerRound4,
                    CAST(ROUND(SUM(payrollstatutoryPcbWagesRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbWagesRound2,
                    CAST(ROUND(SUM(payrollstatutoryPcbWagesRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbWagesRound4,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployeeRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployeeRound2,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployeeRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployeeRound4,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployerRound2), 2) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployerRound2,
                    CAST(ROUND(SUM(payrollstatutoryPcbEmployerRound4), 4) AS CHAR CHARSET utf8) AS totalPayrollstatutoryPcbEmployerRound4,
                    CAST(ROUND(SUM(payrollallowancendeductionAmount), 2) AS CHAR CHARSET utf8) AS totalPayrollallowancendeductionAmountRound2,
                    CAST(ROUND(SUM(payrollallowancendeductionAmount), 4) AS CHAR CHARSET utf8) AS totalPayrollallowancendeductionAmountRound4                 
                    FROM 
                    (SELECT a.payrollsalaryId, a.payrollId, a.employerId, a.employeeId, a.memberName, a.memberNric, a.employeeJoiningDDMMYYYY, a.employeeLeavingDDMMYYYY, a.memberIncomeTax, 
                        a.memberPassport,
                    a.memberBankName, a.employeesalarysetupPaymentType, a.memberAccount, a.memberEIS, a.memberSocso, a.memberEPF, a.employeeEnroll, a.memberAddress1, a.employerbranchName, 
                    a.employerdepartmentTitle, a.employerdepartmentId, a.employerbranchId, a.payrollsalaryBasic, a.payrollsalaryBasicRound2, a.payrollsalaryBasicRound4, a.payrollsalaryGenerated,
                    a.payrollsalaryGeneratedRound2, a.payrollsalaryGeneratedRound4, a.payrollsalaryEarning, a.payrollsalaryEarningRound2, a.payrollsalaryEarningRound4, a.payrollsalaryDeduction,
                    a.payrollsalaryDeductionRound2, a.payrollsalaryDeductionRound4, a.payrollsalaryGross, a.payrollsalaryGrossRound2, a.payrollsalaryGrossRound4, a.payrollsalaryNet, a.payrollsalaryNetRound2,
                    CASE WHEN a.employeeIsActive = TRUE THEN 1 ELSE 0 END employeeIsActive,
                    a.payrollsalaryNetRound4, a.payrollsalaryWorkingDay, a.payrollIsStatutory, a.payrollIsPaidLeave, b.payrollstatutoryId, b.payrollstatutoryEpfWages, b.payrollstatutoryEpfWagesRound2, 
                    b.payrollstatutoryEpfWagesRound4, b.payrollstatutoryEpfEmployee, b.payrollstatutoryEpfEmployeeRound2, b.payrollstatutoryEpfEmployeeRound4, b.payrollstatutoryEpfEmployer, b.payrollstatutoryEpfEmployerRound2,
                    b.payrollstatutoryEpfEmployerRound4, b.payrollstatutorySocsoWages, b.payrollstatutorySocsoWagesRound2, b.payrollstatutorySocsoWagesRound4, b.payrollstatutorySocsoEmployee, b.payrollstatutorySocsoEmployeeRound2, 
                    b.payrollstatutorySocsoEmployeeRound4, b.payrollstatutorySocsoEmployer, b.payrollstatutorySocsoEmployerRound2, b.payrollstatutorySocsoEmployerRound4, b.payrollstatutoryEISWages, 
                    b.payrollstatutoryEISWagesRound2, b.payrollstatutoryEISWagesRound4, b.payrollstatutoryEISEmployee, b.payrollstatutoryEISEmployeeRound2, b.payrollstatutoryEISEmployeeRound4, b.payrollstatutoryEISEmployer,
                    b.payrollstatutoryEISEmployerRound2, b.payrollstatutoryEISEmployerRound4, b.payrollstatutoryPcbWages, b.payrollstatutoryPcbWagesRound2, b.payrollstatutoryPcbWagesRound4, 
                    b.payrollstatutoryPcbEmployee, b.payrollstatutoryPcbEmployeeRound2, b.payrollstatutoryPcbEmployeeRound4, b.payrollstatutoryPcbEmployer, b.payrollstatutoryPcbEmployerRound2, b.payrollstatutoryPcbEmployerRound4, 
                    c.employerRegistration , c.employerName, c.employerAddress1, c.employerAddress2, c.employerAddress3, 
                    (SELECT mastercitizenshipCode FROM tblmastercitizenship WHERE 1 = 1 AND a.mastercitizenshipId = tblmastercitizenship.mastercitizenshipId) AS mastercitizenshipCode,

                    IFNULL((SELECT aa.payrollallowancendeductionAmount AS payrollallowancendeductionAmount FROM tblpayrollallowancendeduction AS aa 
                        INNER JOIN tblemployerallowance AS bb ON aa.employerallowanceId = bb.employerallowanceId 
                        WHERE 1 = 1 AND bb.employerallowanceCode = 'CP38' AND aa.payrollsalaryId = a.payrollsalaryId),0) AS payrollallowancendeductionAmount,
                    
                    IFNULL((SELECT count(*) FROM tblpayrollallowancendeduction AS aa 
                        INNER JOIN tblemployerallowance AS bb ON aa.employerallowanceId = bb.employerallowanceId 
                        WHERE 1 = 1 AND bb.employerallowanceCode = 'CP38' AND aa.payrollsalaryId = a.payrollsalaryId),0) AS payrollallowancendeductionCount,

                    (SELECT mastercountryCode FROM view_employee WHERE 1=1 AND a.employeeId = view_employee.employeeId) AS mastercountryCode

                    FROM view_payrollsalary AS a 
                    INNER JOIN view_payrollstatutory AS b ON a.payrollsalaryId = b.payrollsalaryId
                    INNER JOIN view_employer AS c ON a.employerId = c.employerId
                    ) AS DATA WHERE 1 = 1  ` + strwhere;
    return strquery;
};



exports.data = method;