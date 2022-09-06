var method = {};

method.masterData = (request) => {
    let employeedependentId = request.body.employeedependentId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let masterrelationshipId = request.body.masterrelationshipId || 0;
    let employeedependentMemberId = request.body.employeedependentMemberId || 0;
    let employeedependentIsActive = request.body.employeedependentIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeedependentId,
        employerId,
        employeeId,
        masterrelationshipId,
        employeedependentMemberId,
        employeedependentIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeedependent where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeedependentId,employerId,employeeId,masterrelationshipId,employeedependentMemberId,employeedependentIsActive,createdBy,createdDate from tblemployeedependent where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeedependent where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeedependent where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeedependent where 1 = 1 and employeedependentId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeedependent where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeedependent (employerId, employeeId, masterrelationshipId, employeedependentMemberId, employeedependentIsActive, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.masterrelationshipId + "', '" + pera.employeedependentMemberId + "', " + pera.employeedependentIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeedependent (employerId, employeeId, masterrelationshipId, employeedependentMemberId, employeedependentIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeedependent set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', masterrelationshipId = '" + pera.masterrelationshipId + "', employeedependentMemberId = '" + pera.employeedependentMemberId + "', employeedependentIsActive = " + pera.employeedependentIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeedependentId = '" + pera.employeedependentId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeedependent set " + column + " where employeedependentId = " + id + " ";
    return strquery;
};

method.select_view_employeedependent = function (strwhere) {
    var strquery = "select * from view_employeedependent where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeedependent = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeedependent where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;