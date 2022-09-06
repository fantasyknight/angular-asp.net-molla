var method = {};

method.masterData = (request) => {
    let employerentitlementId = request.body.employerentitlementId || 0;
    let employerId = request.body.employerId || 0;
    let employerentitlementTitle = request.body.employerentitlementTitle || '';
    let employerentitlementLimitCategroy = request.body.employerentitlementLimitCategroy || '';
    let employerentitlementLimitEmployee = request.body.employerentitlementLimitEmployee || 0.0;
    let employerentitlementLimitDependent = request.body.employerentitlementLimitDependent || 0.0;
    let employerentitlementVisitLimitEmployee = request.body.employerentitlementVisitLimitEmployee || 0.0;
    let employerentitlementVisitLimitDependent = request.body.employerentitlementVisitLimitDependent || 0.0;
    let employerentitlementVisitAllowed = request.body.employerentitlementVisitAllowed || 0;
    let employerentitlementVisitDuration = request.body.employerentitlementVisitDuration || '';
    let employerentitlementRemarks = request.body.employerentitlementRemarks || '';
    let employerentitlementEslipGeneratingType = request.body.employerentitlementEslipGeneratingType || '';
    let employerentitlementIsActive = request.body.employerentitlementIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerentitlementId,
        employerId,
        employerentitlementTitle,
        employerentitlementLimitCategroy,
        employerentitlementLimitEmployee,
        employerentitlementLimitDependent,
        employerentitlementVisitLimitEmployee,
        employerentitlementVisitLimitDependent,
        employerentitlementVisitAllowed,
        employerentitlementVisitDuration,
        employerentitlementRemarks,
        employerentitlementEslipGeneratingType,
        employerentitlementIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *, 
                    CONVERT(ROUND(employerentitlementLimitEmployee,2),CHAR) AS employerentitlementLimitEmployeeRound2,
                    CONVERT(ROUND(employerentitlementLimitDependent,2),CHAR) AS employerentitlementLimitDependentRound2,
                    CONVERT(ROUND(employerentitlementVisitLimitEmployee,2),CHAR) AS employerentitlementVisitLimitEmployeeRound2,
                    CONVERT(ROUND(employerentitlementVisitLimitDependent,2),CHAR) AS employerentitlementVisitLimitDependentRound2,
                    CONVERT(ROUND(employerentitlementLimitEmployee,4),CHAR) AS employerentitlementLimitEmployeeRound4,
                    CONVERT(ROUND(employerentitlementLimitDependent,4),CHAR) AS employerentitlementLimitDependentRound4,
                    CONVERT(ROUND(employerentitlementVisitLimitEmployee,4),CHAR) AS employerentitlementVisitLimitEmployeeRound4,
                    CONVERT(ROUND(employerentitlementVisitLimitDependent,4),CHAR) AS employerentitlementVisitLimitDependentRound4
                    from tblemployerentitlement where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employerentitlementId,employerId,employerentitlementTitle,employerentitlementLimitCategroy,employerentitlementLimitEmployee,
                    employerentitlementLimitDependent,employerentitlementVisitLimitEmployee,employerentitlementVisitLimitDependent,employerentitlementVisitAllowed,
                    employerentitlementVisitDuration,employerentitlementRemarks,employerentitlementEslipGeneratingType,employerentitlementIsActive,
                    CONVERT(ROUND(employerentitlementLimitEmployee,2),CHAR) AS employerentitlementLimitEmployeeRound2,
                    CONVERT(ROUND(employerentitlementLimitDependent,2),CHAR) AS employerentitlementLimitDependentRound2,
                    CONVERT(ROUND(employerentitlementVisitLimitEmployee,2),CHAR) AS employerentitlementVisitLimitEmployeeRound2,
                    CONVERT(ROUND(employerentitlementVisitLimitDependent,2),CHAR) AS employerentitlementVisitLimitDependentRound2,
                    CONVERT(ROUND(employerentitlementLimitEmployee,4),CHAR) AS employerentitlementLimitEmployeeRound4,
                    CONVERT(ROUND(employerentitlementLimitDependent,4),CHAR) AS employerentitlementLimitDependentRound4,
                    CONVERT(ROUND(employerentitlementVisitLimitEmployee,4),CHAR) AS employerentitlementVisitLimitEmployeeRound4,
                    CONVERT(ROUND(employerentitlementVisitLimitDependent,4),CHAR) AS employerentitlementVisitLimitDependentRound4
                    createdBy,createdDate from tblemployerentitlement where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerentitlement where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerentitlement where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerentitlement where 1 = 1 and employerentitlementId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerentitlement where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerentitlement (employerId, employerentitlementTitle, employerentitlementLimitCategroy, employerentitlementLimitEmployee, employerentitlementLimitDependent, employerentitlementVisitLimitEmployee, employerentitlementVisitLimitDependent, employerentitlementVisitAllowed, employerentitlementVisitDuration, employerentitlementRemarks, employerentitlementEslipGeneratingType, employerentitlementIsActive, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerentitlementTitle + "', '" + pera.employerentitlementLimitCategroy + "', '" + pera.employerentitlementLimitEmployee + "', '" + pera.employerentitlementLimitDependent + "', '" + pera.employerentitlementVisitLimitEmployee + "', '" + pera.employerentitlementVisitLimitDependent + "', '" + pera.employerentitlementVisitAllowed + "', '" + pera.employerentitlementVisitDuration + "', '" + pera.employerentitlementRemarks + "', '" + pera.employerentitlementEslipGeneratingType + "', " + pera.employerentitlementIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerentitlement (employerId, employerentitlementTitle, employerentitlementLimitCategroy, employerentitlementLimitEmployee, employerentitlementLimitDependent, employerentitlementVisitLimitEmployee, employerentitlementVisitLimitDependent, employerentitlementVisitAllowed, employerentitlementVisitDuration, employerentitlementRemarks, employerentitlementEslipGeneratingType, employerentitlementIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerentitlement set employerId = '" + pera.employerId + "', employerentitlementTitle = '" + pera.employerentitlementTitle + "', employerentitlementLimitCategroy = '" + pera.employerentitlementLimitCategroy + "', employerentitlementLimitEmployee = '" + pera.employerentitlementLimitEmployee + "', employerentitlementLimitDependent = '" + pera.employerentitlementLimitDependent + "', employerentitlementVisitLimitEmployee = '" + pera.employerentitlementVisitLimitEmployee + "', employerentitlementVisitLimitDependent = '" + pera.employerentitlementVisitLimitDependent + "', employerentitlementVisitAllowed = '" + pera.employerentitlementVisitAllowed + "', employerentitlementVisitDuration = '" + pera.employerentitlementVisitDuration + "', employerentitlementRemarks = '" + pera.employerentitlementRemarks + "', employerentitlementEslipGeneratingType = '" + pera.employerentitlementEslipGeneratingType + "', employerentitlementIsActive = " + pera.employerentitlementIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerentitlementId = '" + pera.employerentitlementId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerentitlement set " + column + " where employerentitlementId = " + id + " ";
    return strquery;
};

exports.data = method;