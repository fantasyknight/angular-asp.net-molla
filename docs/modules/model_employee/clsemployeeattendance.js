var method = {};

method.masterData = (request) => {
    let employeeattendanceId = request.body.employeeattendanceId || 0;
    let employerId = request.body.employerId || 0;
    let employeeEnroll = request.body.employeeEnroll || '';
    let employeeattendanceStatus = request.body.employeeattendanceStatus || '';
    let employeeattendanceEntryTime = request.body.employeeattendanceEntryTime || null;
    let isManual = request.body.isManual || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeattendanceId,
        employerId,
        employeeEnroll,
        employeeattendanceStatus,
        employeeattendanceEntryTime,
        isManual,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select *, DATE_FORMAT(employeeattendanceEntryTime,'%Y-%m-%d') AS entryDate from tblemployeeattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeattendanceId,employerId,employeeEnroll,employeeattendanceStatus,employeeattendanceEntryTime,isManual,createdBy,createdDate from tblemployeeattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeattendance where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeattendance where 1 = 1 and employeeattendanceId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employeeattendanceEntryTime == null) pera.employeeattendanceEntryTime = null;
    else pera.employeeattendanceEntryTime = "'" + pera.employeeattendanceEntryTime + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeattendance (employerId, employeeEnroll, employeeattendanceStatus, employeeattendanceEntryTime, isManual, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeEnroll + "', '" + pera.employeeattendanceStatus + "', " + pera.employeeattendanceEntryTime + ", " + pera.isManual + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeattendance (employerId, employeeEnroll, employeeattendanceStatus, employeeattendanceEntryTime, isManual, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employeeattendanceEntryTime == null) pera.employeeattendanceEntryTime = null;
    else pera.employeeattendanceEntryTime = "'" + pera.employeeattendanceEntryTime + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeattendance set employerId = '" + pera.employerId + "', employeeEnroll = '" + pera.employeeEnroll + "', employeeattendanceStatus = '" + pera.employeeattendanceStatus + "', employeeattendanceEntryTime = " + pera.employeeattendanceEntryTime + ", isManual = " + pera.isManual + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeattendanceId = '" + pera.employeeattendanceId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeattendance set " + column + " where employeeattendanceId = " + id + " ";
    return strquery;
};

method.select_view_employeeattendance = function (strwhere) {
    var strquery = "select * from view_employeeattendance where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeeattendance = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeeattendance where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;