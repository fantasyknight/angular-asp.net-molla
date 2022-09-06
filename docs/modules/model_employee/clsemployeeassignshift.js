var method = {};

method.masterData = (request) => {
    let employeeassignshiftid = request.body.employeeassignshiftid || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employermastershiftId = request.body.employermastershiftId || 0;
    return {
        employeeassignshiftid,
        employerId,
        employeeId,
        employermastershiftId
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeassignshift where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeassignshiftid,employerId,employeeId,employermastershiftId from tblemployeeassignshift where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeassignshift where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeassignshift where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeassignshift where 1 = 1 and employeeassignshiftid = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeassignshift where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    var strquery = "insert into tblemployeeassignshift (employerId, employeeId, employermastershiftId) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employermastershiftId + "')";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeassignshift (employerId, employeeId, employermastershiftId) values ";
    return strquery;
};

method.update = function (pera) {
    var strquery = "update tblemployeeassignshift set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employermastershiftId = '" + pera.employermastershiftId + "' where employeeassignshiftid = '" + pera.employeeassignshiftid + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeassignshift set " + column + " where employeeassignshiftid = " + id + " ";
    return strquery;
};

method.select_view_employeeassignshift = function (strwhere) {
    var strquery = "select * from view_employeeassignshift where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeeassignshift = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeeassignshift where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;