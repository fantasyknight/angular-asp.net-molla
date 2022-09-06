var method = {};

method.masterData = (request) => {
  let employeeleaveentitlementId = request.body.employeeleaveentitlementId || 0;
  let employeeId = request.body.employeeId || 0;
  let employerId = request.body.employerId || 0;
  let employerleavetypeId = request.body.employerleavetypeId || 0;
  let employeeleaveentitlementAllowendbnf = request.body.employeeleaveentitlementAllowendbnf || 0.0;
  let employeeleaveentitlementEntitled = request.body.employeeleaveentitlementEntitled || 0.0;
  let employeeleaveentitlementPreviousYearBnf = request.body.employeeleaveentitlementPreviousYearBnf || 0.0;
  let employeeleaveentitlementAllowedbnfOverride = request.body.employeeleaveentitlementAllowedbnfOverride || 0.0;
  let employeeleaveentitlementPreviousYearBalance = request.body.employeeleaveentitlementPreviousYearBalance || 0.0;
  let employeeleaveentitlementIsActive = request.body.employeeleaveentitlementIsActive || true;
  let createdBy = request.body.createdBy || 0;
  let createdDate = request.body.createdDate || null;
  return {
    employeeleaveentitlementId,
    employeeId,
    employerId,
    employerleavetypeId,
    employeeleaveentitlementAllowendbnf,
    employeeleaveentitlementEntitled,
    employeeleaveentitlementPreviousYearBnf,
    employeeleaveentitlementAllowedbnfOverride,
    employeeleaveentitlementPreviousYearBalance,
    employeeleaveentitlementIsActive,
    createdBy,
    createdDate
  };
};

method.select = function (strwhere) {
  var strquery = "select * from tblemployeeleaveentitlement where 1 = 1 " + strwhere;
  return strquery;
};

method.selectall = function (strwhere) {
  var strquery = "select employeeleaveentitlementId,employeeId,employerId,employerleavetypeId,employeeleaveentitlementAllowendbnf,employeeleaveentitlementEntitled,employeeleaveentitlementPreviousYearBnf,employeeleaveentitlementAllowedbnfOverride,employeeleaveentitlementPreviousYearBalance,employeeleaveentitlementIsActive,createdBy,createdDate from tblemployeeleaveentitlement where 1 = 1 " + strwhere;
  return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
  var strquery = "select " + strcolumn + " from tblemployeeleaveentitlement where 1 = 1 " + strwhere;
  return strquery;
};

method.getcount = function (strwhere) {
  var strquery = "select count(*) as cnt from  tblemployeeleaveentitlement where 1=1 " + strwhere;
  return strquery;
};

method.delete = function (strwhere) {
  var strquery = "delete from tblemployeeleaveentitlement where 1 = 1 and employeeleaveentitlementId = " + strwhere;
  return strquery;
};

method.deleteString = function (strwhere) {
  var strquery = "delete from tblemployeeleaveentitlement where 1 = 1 " + strwhere;
  return strquery;
};

method.insert = function (pera) {
  if (pera.createdDate == null) pera.createdDate = null;
  else pera.createdDate = "'" + pera.createdDate + "'";

  var strquery = "insert into tblemployeeleaveentitlement (employeeId, employerId, employerleavetypeId, employeeleaveentitlementAllowendbnf, employeeleaveentitlementEntitled, employeeleaveentitlementPreviousYearBnf, employeeleaveentitlementAllowedbnfOverride, employeeleaveentitlementPreviousYearBalance, employeeleaveentitlementIsActive, createdBy, createdDate) values ('" + pera.employeeId + "', '" + pera.employerId + "', '" + pera.employerleavetypeId + "', '" + pera.employeeleaveentitlementAllowendbnf + "', '" + pera.employeeleaveentitlementEntitled + "', '" + pera.employeeleaveentitlementPreviousYearBnf + "', '" + pera.employeeleaveentitlementAllowedbnfOverride + "', '" + pera.employeeleaveentitlementPreviousYearBalance + "', " + pera.employeeleaveentitlementIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
  return strquery;
};

method.insertString = function () {
  var strquery = "insert into tblemployeeleaveentitlement (employeeId, employerId, employerleavetypeId, employeeleaveentitlementAllowendbnf, employeeleaveentitlementEntitled, employeeleaveentitlementPreviousYearBnf, employeeleaveentitlementAllowedbnfOverride, employeeleaveentitlementPreviousYearBalance, employeeleaveentitlementIsActive, createdBy, createdDate) values ";
  return strquery;
};

method.update = function (pera) {
  if (pera.createdDate == null) pera.createdDate = null;
  else pera.createdDate = "'" + pera.createdDate + "'";

  var strquery = "update tblemployeeleaveentitlement set employeeId = '" + pera.employeeId + "', employerId = '" + pera.employerId + "', employerleavetypeId = '" + pera.employerleavetypeId + "', employeeleaveentitlementAllowendbnf = '" + pera.employeeleaveentitlementAllowendbnf + "', employeeleaveentitlementEntitled = '" + pera.employeeleaveentitlementEntitled + "', employeeleaveentitlementPreviousYearBnf = '" + pera.employeeleaveentitlementPreviousYearBnf + "', employeeleaveentitlementAllowedbnfOverride = '" + pera.employeeleaveentitlementAllowedbnfOverride + "', employeeleaveentitlementPreviousYearBalance = '" + pera.employeeleaveentitlementPreviousYearBalance + "', employeeleaveentitlementIsActive = " + pera.employeeleaveentitlementIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeleaveentitlementId = '" + pera.employeeleaveentitlementId + "' ";
  return strquery;
};

method.updateColumn = function (column, id) {
  var strquery = "update tblemployeeleaveentitlement set " + column + " where employeeleaveentitlementId = " + id + " ";
  return strquery;
};

method.select_view_employeeleaveentitlement = function (strwhere) {
  var strquery = "select * from view_employeeleaveentitlement where 1 = 1 " + strwhere;
  return strquery;
};

method.getcount_view_employeeleaveentitlement = function (strwhere) {
  var strquery = "select count(*) as cnt from view_employeeleaveentitlement where 1=1 " + strwhere;
  return strquery;
};

method.select_leavecalculation = function (employeeId, currentStartDate, currentEndDate) {
  var strquery = `SELECT *,
  CASE WHEN totalYear > 1 THEN  
TIMESTAMPDIFF(MONTH,currentStartDate,currentMonthDate) + 1
ELSE 
TIMESTAMPDIFF(MONTH,currentJoiningDate,currentMonthDate) + 1
END AS matchYear,
  CASE 
  WHEN 
  YEAR(employeeJoining) = YEAR(currentEndDate) 
  THEN 0 
  ELSE 
  CASE 
  WHEN 
  ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue  > priorJoinDay 
  THEN priorJoinDay 
  ELSE ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue 
  END END AS priorJoinDay1 
  FROM 
  (SELECT *,
  ROUND(DATEDIFF(currentEndDate,currentJoiningDate),2) * fixValue AS fromJoinDay, 
  CASE 
  WHEN YEAR(employeeJoining) = YEAR(currentEndDate) 
  THEN 0 
  ELSE ROUND(DATEDIFF(currentJoiningDate,currentStartDate),2)  * fixValue
  END AS priorJoinDay,
  CASE
  WHEN ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2) < 0 
  THEN 0 
  ELSE ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2)  * fixValue 
  END AS fromJoinDay1, 
  DATEDIFF(currentEndDate, employeeJoining) / 365 AS totalYear 
  FROM 
  (SELECT employeeId, employerId, employeeJoining, employeeLeaving, employerdepartmentTitle, memberNric, memberPassport, 0.00273973 AS fixValue, memberName,
  employeesalarysetupCurrentBasic,
  CASE
  WHEN ISNULL(employeeLeaving) 
  THEN 
  CASE 
  WHEN YEAR(now()) = YEAR('` + currentEndDate + `') 
  THEN LAST_DAY(now()) 
  ELSE ('` + currentEndDate + `') 
  END 
  ELSE employeeLeaving 
  END AS currentMonthDate,
  ('` + currentStartDate + `') AS currentStartDate, 
  CASE
  WHEN ISNULL(employeeLeaving) 
  THEN ('` + currentEndDate + `') 
  ELSE employeeLeaving 
  END AS currentEndDate, 
  CASE 
  WHEN YEAR(employeeJoining) = YEAR('` + currentEndDate + `') 
  THEN employeeJoining 
  ELSE CONCAT(YEAR('` + currentEndDate + `'),'-',LPAD(MONTH(employeeJoining), 2, '0'),'-',LPAD(DAY(employeeJoining), 2, '0'),' ','00:00:00') 
  END AS currentJoiningDate FROM view_employee) AS DATA WHERE 1 = 1 AND ISNULL(employeeLeaving) and employeeId = ` + employeeId + `) AS DATA  `;
  return strquery;
};

method.select_LeavecalculationReport = function (employerId, currentStartDate, currentEndDate) {
  var strquery = `SELECT *,
  CASE WHEN totalYear > 1 THEN  
  TIMESTAMPDIFF(MONTH,currentStartDate,currentMonthDate) + 1
  ELSE 
  TIMESTAMPDIFF(MONTH,currentJoiningDate,currentMonthDate) + 1
  END AS matchYear,
                  CASE 
                  WHEN 
                  YEAR(employeeJoining) = YEAR(currentEndDate) 
                  THEN 0 
                  ELSE 
                  CASE 
                  WHEN 
                  ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue > priorJoinDay 
                  THEN priorJoinDay 
                  ELSE ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue 
                  END END AS priorJoinDay1 
                  FROM 
                  (SELECT *,
                  ROUND(DATEDIFF(currentEndDate,currentJoiningDate),2) * fixValue AS fromJoinDay, 
                  CASE 
                  WHEN YEAR(employeeJoining) = YEAR(currentEndDate) 
                  THEN 0 
                  ELSE ROUND(DATEDIFF(currentJoiningDate,currentStartDate),2)  * fixValue
                  END AS priorJoinDay,
                  CASE
                  WHEN ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2) < 0 
                  THEN 0 
                  ELSE ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2)  * fixValue 
                  END AS fromJoinDay1, 
                  DATEDIFF(currentEndDate, employeeJoining) / 365 AS totalYear 
                  FROM 
                  (SELECT employeeId, employerId, employeeJoining, employeeLeaving, employerdepartmentTitle, memberNric, memberPassport, 0.00273973 AS fixValue, memberName,
                  employeesalarysetupCurrentBasic,
                  CAST(ROUND(IFNULL(employeesalarysetupCurrentBasic,0) * 12,2) AS CHAR CHARSET utf8) AS employeesalarysetupCurrentBasicRound22,
                  CASE
                  WHEN ISNULL(employeeLeaving) 
                  THEN 
                  CASE 
                  WHEN YEAR(NOW()) = YEAR('` + currentEndDate + `') 
                  THEN LAST_DAY(NOW()) 
                  ELSE ('` + currentEndDate + `') 
                  END 
                  ELSE employeeLeaving 
                  END AS currentMonthDate,
                  ('` + currentStartDate + `') AS currentStartDate, 
                  CASE
                  WHEN ISNULL(employeeLeaving) 
                  THEN ('` + currentEndDate + `') 
                  ELSE employeeLeaving 
                  END AS currentEndDate, 
                  CASE 
                  WHEN YEAR(employeeJoining) = YEAR('` + currentEndDate + `') 
                  THEN employeeJoining 
                  ELSE CONCAT(YEAR('` + currentEndDate + `'),'-',LPAD(MONTH(employeeJoining), 2, '0'),'-',LPAD(DAY(employeeJoining), 2, '0'),' ','00:00:00') 
                  END AS currentJoiningDate FROM view_employee) AS DATA WHERE 1 = 1 AND ISNULL(employeeLeaving) AND employerId = ` + employerId + ` AND YEAR(employeeJoining) <= '` + currentStartDate + `') AS DATA `;
  return strquery;
};

method.select_LeavecalculationEmployeeWiseReport = function (employeeId, employerId, currentStartDate, currentEndDate) {
  var strquery = `SELECT *, 
  CASE WHEN totalYear > 1 THEN  
  TIMESTAMPDIFF(MONTH,currentStartDate,currentMonthDate) + 1
  ELSE 
  TIMESTAMPDIFF(MONTH,currentJoiningDate,currentMonthDate) + 1
  END AS matchYear,
                  CASE 
                  WHEN 
                  YEAR(employeeJoining) = YEAR(currentEndDate) 
                  THEN 0 
                  ELSE 
                  CASE 
                  WHEN 
                  ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue > priorJoinDay 
                  THEN priorJoinDay 
                  ELSE ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue 
                  END END AS priorJoinDay1 
                  FROM 
                  (SELECT *,
                  ROUND(DATEDIFF(currentEndDate,currentJoiningDate),2) * fixValue AS fromJoinDay, 
                  CASE 
                  WHEN YEAR(employeeJoining) = YEAR(currentEndDate) 
                  THEN 0 
                  ELSE ROUND(DATEDIFF(currentJoiningDate,currentStartDate),2)  * fixValue
                  END AS priorJoinDay,
                  CASE
                  WHEN ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2) < 0 
                  THEN 0 
                  ELSE ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2)  * fixValue 
                  END AS fromJoinDay1, 
                  DATEDIFF(currentEndDate, employeeJoining) / 365 AS totalYear 
                  FROM 
                  (SELECT employeeId, employerId, employeeJoining, employeeLeaving, employerdepartmentTitle, memberNric, memberPassport, 0.00273973 AS fixValue, memberName,
                  employeesalarysetupCurrentBasic,
                  CASE
                  WHEN ISNULL(employeeLeaving) 
                  THEN 
                  CASE 
                  WHEN YEAR(NOW()) = YEAR('` + currentEndDate + `') 
                  THEN LAST_DAY(NOW()) 
                  ELSE ('` + currentEndDate + `') 
                  END 
                  ELSE employeeLeaving 
                  END AS currentMonthDate,
                  ('` + currentStartDate + `') AS currentStartDate, 
                  CASE
                  WHEN ISNULL(employeeLeaving) 
                  THEN ('` + currentEndDate + `') 
                  ELSE employeeLeaving 
                  END AS currentEndDate, 
                  CASE 
                  WHEN YEAR(employeeJoining) = YEAR('` + currentEndDate + `') 
                  THEN employeeJoining 
                  ELSE CONCAT(YEAR('` + currentEndDate + `'),'-',LPAD(MONTH(employeeJoining), 2, '0'),'-',LPAD(DAY(employeeJoining), 2, '0'),' ','00:00:00') 
                  END AS currentJoiningDate FROM view_employee) AS DATA WHERE 1 = 1 AND ISNULL(employeeLeaving) 
                  And employeeId = ` + employeeId + `
                  AND employerId = ` + employerId + ` 
                  AND YEAR(employeeJoining) <= '` + currentStartDate + `') AS DATA `;
  return strquery;
};

method.select_LeavecalculationAllEmployee = function (currentStartDate, currentEndDate) {
  var strquery = `SELECT *,
  CASE WHEN totalYear > 1 THEN  
  TIMESTAMPDIFF(MONTH,currentStartDate,currentMonthDate) + 1
  ELSE 
  TIMESTAMPDIFF(MONTH,currentJoiningDate,currentMonthDate) + 1
  END AS matchYear,
                  CASE 
                  WHEN 
                  YEAR(employeeJoining) = YEAR(currentEndDate) 
                  THEN 0 
                  ELSE 
                  CASE 
                  WHEN 
                  ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue > priorJoinDay 
                  THEN priorJoinDay 
                  ELSE ROUND(DATEDIFF(currentMonthDate,currentStartDate),2) * fixValue 
                  END END AS priorJoinDay1 
                  FROM 
                  (SELECT *,
                  ROUND(DATEDIFF(currentEndDate,currentJoiningDate),2) * fixValue AS fromJoinDay, 
                  CASE 
                  WHEN YEAR(employeeJoining) = YEAR(currentEndDate) 
                  THEN 0 
                  ELSE ROUND(DATEDIFF(currentJoiningDate,currentStartDate),2)  * fixValue
                  END AS priorJoinDay,
                  CASE
                  WHEN ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2) < 0 
                  THEN 0 
                  ELSE ROUND(DATEDIFF(currentMonthDate,currentJoiningDate),2)  * fixValue 
                  END AS fromJoinDay1, 
                  DATEDIFF(currentEndDate, employeeJoining) / 365 AS totalYear 
                  FROM 
                  (SELECT employeeId, employerId, employeeJoining, employeeLeaving, employerdepartmentTitle, memberNric, memberPassport, 0.00273973 AS fixValue, memberName,
                  employeesalarysetupCurrentBasic,
                  CASE
                  WHEN ISNULL(employeeLeaving) 
                  THEN 
                  CASE 
                  WHEN YEAR(NOW()) = YEAR('` + currentEndDate + `') 
                  THEN LAST_DAY(NOW()) 
                  ELSE ('` + currentEndDate + `') 
                  END 
                  ELSE employeeLeaving 
                  END AS currentMonthDate,
                  ('` + currentStartDate + `') AS currentStartDate, 
                  CASE
                  WHEN ISNULL(employeeLeaving) 
                  THEN ('` + currentEndDate + `') 
                  ELSE employeeLeaving 
                  END AS currentEndDate, 
                  CASE 
                  WHEN YEAR(employeeJoining) = YEAR('` + currentEndDate + `') 
                  THEN employeeJoining 
                  ELSE CONCAT(YEAR('` + currentEndDate + `'),'-',LPAD(MONTH(employeeJoining), 2, '0'),'-',LPAD(DAY(employeeJoining), 2, '0'),' ','00:00:00') 
                  END AS currentJoiningDate FROM view_employee) AS DATA WHERE 1 = 1 AND ISNULL(employeeLeaving) AND YEAR(employeeJoining) <= '` + currentStartDate + `') AS DATA `;
  return strquery;
};

exports.data = method;