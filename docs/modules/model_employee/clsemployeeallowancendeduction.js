var method = {};

method.masterData = (request) => {
    let employeeallowancendeductionId = request.body.employeeallowancendeductionId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employerallowanceId = request.body.employerallowanceId || 0;
    let employeeallowancendeductionAmount = request.body.employeeallowancendeductionAmount || 0.0;
    let employeeallowancendeductionFromDate = request.body.employeeallowancendeductionFromDate || null;
    let employeeallowancendeductionToDate = request.body.employeeallowancendeductionToDate || null;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeallowancendeductionId,
        employerId,
        employeeId,
        employerallowanceId,
        employeeallowancendeductionAmount,
        employeeallowancendeductionFromDate,
        employeeallowancendeductionToDate,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeallowancendeductionId,employerId,employeeId,employerallowanceId,employeeallowancendeductionAmount,employeeallowancendeductionFromDate,employeeallowancendeductionToDate,createdBy,createdDate from tblemployeeallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeallowancendeduction where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeallowancendeduction where 1 = 1 and employeeallowancendeductionId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employeeallowancendeductionFromDate == null) pera.employeeallowancendeductionFromDate = null;
    else pera.employeeallowancendeductionFromDate = "'" + pera.employeeallowancendeductionFromDate + "'";

    if (pera.employeeallowancendeductionToDate == null) pera.employeeallowancendeductionToDate = null;
    else pera.employeeallowancendeductionToDate = "'" + pera.employeeallowancendeductionToDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeallowancendeduction (employerId, employeeId, employerallowanceId, employeeallowancendeductionAmount, employeeallowancendeductionFromDate, employeeallowancendeductionToDate, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employerallowanceId + "', '" + pera.employeeallowancendeductionAmount + "', " + pera.employeeallowancendeductionFromDate + ", " + pera.employeeallowancendeductionToDate + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeallowancendeduction (employerId, employeeId, employerallowanceId, employeeallowancendeductionAmount, employeeallowancendeductionFromDate, employeeallowancendeductionToDate, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employeeallowancendeductionFromDate == null) pera.employeeallowancendeductionFromDate = null;
    else pera.employeeallowancendeductionFromDate = "'" + pera.employeeallowancendeductionFromDate + "'";

    if (pera.employeeallowancendeductionToDate == null) pera.employeeallowancendeductionToDate = null;
    else pera.employeeallowancendeductionToDate = "'" + pera.employeeallowancendeductionToDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeallowancendeduction set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employerallowanceId = '" + pera.employerallowanceId + "', employeeallowancendeductionAmount = '" + pera.employeeallowancendeductionAmount + "', employeeallowancendeductionFromDate = " + pera.employeeallowancendeductionFromDate + ", employeeallowancendeductionToDate = " + pera.employeeallowancendeductionToDate + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeallowancendeductionId = '" + pera.employeeallowancendeductionId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeallowancendeduction set " + column + " where employeeallowancendeductionId = " + id + " ";
    return strquery;
};

method.select_view_employeeallowancendeduction = function (strwhere) {
    var strquery = "select * from view_employeeallowancendeduction where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeeallowancendeduction = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeeallowancendeduction where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;