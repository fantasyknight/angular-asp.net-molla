var method = {};

method.masterData = (request) => {
    let employershiftId = request.body.employershiftId || 0;
    let employerId = request.body.employerId || 0;
    let empoyershiftName = request.body.empoyershiftName || '';
    let employershiftFullDayHour = request.body.employershiftFullDayHour || 0.0;
    let employershiftHalfDayHour = request.body.employershiftHalfDayHour || 0.0;
    let employershiftInTime = request.body.employershiftInTime || null;
    let employershiftOutTime = request.body.employershiftOutTime || null;
    let employershiftInLunch = request.body.employershiftInLunch || null;
    let employershiftOutLunch = request.body.employershiftOutLunch || null;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employershiftId,
        employerId,
        empoyershiftName,
        employershiftFullDayHour,
        employershiftHalfDayHour,
        employershiftInTime,
        employershiftOutTime,
        employershiftInLunch,
        employershiftOutLunch,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployershift where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employershiftId,employerId,empoyershiftName,employershiftFullDayHour,employershiftHalfDayHour,employershiftInTime,employershiftOutTime,employershiftInLunch,employershiftOutLunch,createdBy,createdDate from tblemployershift where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployershift where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployershift where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployershift where 1 = 1 and employershiftId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployershift where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employershiftInTime == null) pera.employershiftInTime = null;
    else pera.employershiftInTime = "'" + pera.employershiftInTime + "'";

    if (pera.employershiftOutTime == null) pera.employershiftOutTime = null;
    else pera.employershiftOutTime = "'" + pera.employershiftOutTime + "'";

    if (pera.employershiftInLunch == null) pera.employershiftInLunch = null;
    else pera.employershiftInLunch = "'" + pera.employershiftInLunch + "'";

    if (pera.employershiftOutLunch == null) pera.employershiftOutLunch = null;
    else pera.employershiftOutLunch = "'" + pera.employershiftOutLunch + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployershift (employerId, empoyershiftName, employershiftFullDayHour, employershiftHalfDayHour, employershiftInTime, employershiftOutTime, employershiftInLunch, employershiftOutLunch, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.empoyershiftName + "', '" + pera.employershiftFullDayHour + "', '" + pera.employershiftHalfDayHour + "', " + pera.employershiftInTime + ", " + pera.employershiftOutTime + ", " + pera.employershiftInLunch + ", " + pera.employershiftOutLunch + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployershift (employerId, empoyershiftName, employershiftFullDayHour, employershiftHalfDayHour, employershiftInTime, employershiftOutTime, employershiftInLunch, employershiftOutLunch, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employershiftInTime == null) pera.employershiftInTime = null;
    else pera.employershiftInTime = "'" + pera.employershiftInTime + "'";

    if (pera.employershiftOutTime == null) pera.employershiftOutTime = null;
    else pera.employershiftOutTime = "'" + pera.employershiftOutTime + "'";

    if (pera.employershiftInLunch == null) pera.employershiftInLunch = null;
    else pera.employershiftInLunch = "'" + pera.employershiftInLunch + "'";

    if (pera.employershiftOutLunch == null) pera.employershiftOutLunch = null;
    else pera.employershiftOutLunch = "'" + pera.employershiftOutLunch + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployershift set employerId = '" + pera.employerId + "', empoyershiftName = '" + pera.empoyershiftName + "', employershiftFullDayHour = '" + pera.employershiftFullDayHour + "', employershiftHalfDayHour = '" + pera.employershiftHalfDayHour + "', employershiftInTime = " + pera.employershiftInTime + ", employershiftOutTime = " + pera.employershiftOutTime + ", employershiftInLunch = " + pera.employershiftInLunch + ", employershiftOutLunch = " + pera.employershiftOutLunch + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employershiftId = '" + pera.employershiftId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployershift set " + column + " where employershiftId = " + id + " ";
    return strquery;
};

exports.data = method;