var method = {};

method.masterData = (request) => {
    let employeeleaveapplicationId = request.body.employeeleaveapplicationId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employerleavetypeId = request.body.employerleavetypeId || 0;
    let employeeleaveapplicationLeaveApply = request.body.employeeleaveapplicationLeaveApply || null;
    let employeeleaveapplicationLeaveFrom = request.body.employeeleaveapplicationLeaveFrom || null;
    let employeeleaveapplicationLeaveTo = request.body.employeeleaveapplicationLeaveTo || null;
    let employeeleaveapplicationNoOfDays = request.body.employeeleaveapplicationNoOfDays || 0.0;
    let employeeleaveapplicationReason = request.body.employeeleaveapplicationReason || '';
    let employeeleaveapplicationDocumentRefNo = request.body.employeeleaveapplicationDocumentRefNo || '';
    let employeeleaveapplicationRemarks = request.body.employeeleaveapplicationRemarks || '';
    let employeeleaveapplicationIsPartialday = request.body.employeeleaveapplicationIsPartialday || false;
    let employeeleaveapplicationIsStartPartialday = request.body.employeeleaveapplicationIsStartPartialday || false;
    let employeeleaveapplicationIsEndPartialday = request.body.employeeleaveapplicationIsEndPartialday || false;
    let employeeleaveapplicationLeaveStatus = request.body.employeeleaveapplicationLeaveStatus || '';
    let employeeleaveapplicationIsEmergency = request.body.employeeleaveapplicationIsEmergency || false;
    let employeeleaveapplicationReasonReject = request.body.employeeleaveapplicationReasonReject || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeleaveapplicationId,
        employerId,
        employeeId,
        employerleavetypeId,
        employeeleaveapplicationLeaveApply,
        employeeleaveapplicationLeaveFrom,
        employeeleaveapplicationLeaveTo,
        employeeleaveapplicationNoOfDays,
        employeeleaveapplicationReason,
        employeeleaveapplicationDocumentRefNo,
        employeeleaveapplicationRemarks,
        employeeleaveapplicationIsPartialday,
        employeeleaveapplicationIsStartPartialday,
        employeeleaveapplicationIsEndPartialday,
        employeeleaveapplicationLeaveStatus,
        employeeleaveapplicationIsEmergency,
        employeeleaveapplicationReasonReject,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeleaveapplication where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeleaveapplicationId,employerId,employeeId,employerleavetypeId,employeeleaveapplicationLeaveApply,employeeleaveapplicationLeaveFrom,employeeleaveapplicationLeaveTo,employeeleaveapplicationNoOfDays,employeeleaveapplicationReason,employeeleaveapplicationDocumentRefNo,employeeleaveapplicationRemarks,employeeleaveapplicationIsPartialday,employeeleaveapplicationIsStartPartialday,employeeleaveapplicationIsEndPartialday,employeeleaveapplicationLeaveStatus,employeeleaveapplicationIsEmergency,employeeleaveapplicationReasonReject,createdBy,createdDate from tblemployeeleaveapplication where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeleaveapplication where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeleaveapplication where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeleaveapplication where 1 = 1 and employeeleaveapplicationId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeleaveapplication where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employeeleaveapplicationLeaveApply == null) pera.employeeleaveapplicationLeaveApply = null;
    else pera.employeeleaveapplicationLeaveApply = "'" + pera.employeeleaveapplicationLeaveApply + "'";

    if (pera.employeeleaveapplicationLeaveFrom == null) pera.employeeleaveapplicationLeaveFrom = null;
    else pera.employeeleaveapplicationLeaveFrom = "'" + pera.employeeleaveapplicationLeaveFrom + "'";

    if (pera.employeeleaveapplicationLeaveTo == null) pera.employeeleaveapplicationLeaveTo = null;
    else pera.employeeleaveapplicationLeaveTo = "'" + pera.employeeleaveapplicationLeaveTo + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeleaveapplication (employerId, employeeId, employerleavetypeId, employeeleaveapplicationLeaveApply, employeeleaveapplicationLeaveFrom, employeeleaveapplicationLeaveTo, employeeleaveapplicationNoOfDays, employeeleaveapplicationReason, employeeleaveapplicationDocumentRefNo, employeeleaveapplicationRemarks, employeeleaveapplicationIsPartialday, employeeleaveapplicationIsStartPartialday, employeeleaveapplicationIsEndPartialday, employeeleaveapplicationLeaveStatus, employeeleaveapplicationIsEmergency, employeeleaveapplicationReasonReject, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employerleavetypeId + "', " + pera.employeeleaveapplicationLeaveApply + ", " + pera.employeeleaveapplicationLeaveFrom + ", " + pera.employeeleaveapplicationLeaveTo + ", '" + pera.employeeleaveapplicationNoOfDays + "', '" + pera.employeeleaveapplicationReason + "', '" + pera.employeeleaveapplicationDocumentRefNo + "', '" + pera.employeeleaveapplicationRemarks + "', " + pera.employeeleaveapplicationIsPartialday + ", " + pera.employeeleaveapplicationIsStartPartialday + ", " + pera.employeeleaveapplicationIsEndPartialday + ", '" + pera.employeeleaveapplicationLeaveStatus + "', " + pera.employeeleaveapplicationIsEmergency + ", '" + pera.employeeleaveapplicationReasonReject + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeleaveapplication (employerId, employeeId, employerleavetypeId, employeeleaveapplicationLeaveApply, employeeleaveapplicationLeaveFrom, employeeleaveapplicationLeaveTo, employeeleaveapplicationNoOfDays, employeeleaveapplicationReason, employeeleaveapplicationDocumentRefNo, employeeleaveapplicationRemarks, employeeleaveapplicationIsPartialday, employeeleaveapplicationIsStartPartialday, employeeleaveapplicationIsEndPartialday, employeeleaveapplicationLeaveStatus, employeeleaveapplicationIsEmergency, employeeleaveapplicationReasonReject, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employeeleaveapplicationLeaveApply == null) pera.employeeleaveapplicationLeaveApply = null;
    else pera.employeeleaveapplicationLeaveApply = "'" + pera.employeeleaveapplicationLeaveApply + "'";

    if (pera.employeeleaveapplicationLeaveFrom == null) pera.employeeleaveapplicationLeaveFrom = null;
    else pera.employeeleaveapplicationLeaveFrom = "'" + pera.employeeleaveapplicationLeaveFrom + "'";

    if (pera.employeeleaveapplicationLeaveTo == null) pera.employeeleaveapplicationLeaveTo = null;
    else pera.employeeleaveapplicationLeaveTo = "'" + pera.employeeleaveapplicationLeaveTo + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeleaveapplication set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employerleavetypeId = '" + pera.employerleavetypeId + "', employeeleaveapplicationLeaveApply = " + pera.employeeleaveapplicationLeaveApply + ", employeeleaveapplicationLeaveFrom = " + pera.employeeleaveapplicationLeaveFrom + ", employeeleaveapplicationLeaveTo = " + pera.employeeleaveapplicationLeaveTo + ", employeeleaveapplicationNoOfDays = '" + pera.employeeleaveapplicationNoOfDays + "', employeeleaveapplicationReason = '" + pera.employeeleaveapplicationReason + "', employeeleaveapplicationDocumentRefNo = '" + pera.employeeleaveapplicationDocumentRefNo + "', employeeleaveapplicationRemarks = '" + pera.employeeleaveapplicationRemarks + "', employeeleaveapplicationIsPartialday = " + pera.employeeleaveapplicationIsPartialday + ", employeeleaveapplicationIsStartPartialday = " + pera.employeeleaveapplicationIsStartPartialday + ", employeeleaveapplicationIsEndPartialday = " + pera.employeeleaveapplicationIsEndPartialday + ", employeeleaveapplicationLeaveStatus = '" + pera.employeeleaveapplicationLeaveStatus + "', employeeleaveapplicationIsEmergency = " + pera.employeeleaveapplicationIsEmergency + ", employeeleaveapplicationReasonReject = '" + pera.employeeleaveapplicationReasonReject + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeleaveapplicationId = '" + pera.employeeleaveapplicationId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeleaveapplication set " + column + " where employeeleaveapplicationId = " + id + " ";
    return strquery;
};

method.select_view_employeeleaveapplication = function (strwhere) {
    var strquery = "select * from view_employeeleaveapplication where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeeleaveapplication = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeeleaveapplication where 1=1 " + strwhere;
    return strquery;
};

method.total_view_employeeleaveapplication = function (strwhere) {
    var strquery = "select IFNULL(SUM(employeeleaveapplicationNoOfDays),0) AS cnt from view_employeeleaveapplication where 1=1 " + strwhere;
    return strquery;
};

method.total_view_employeeleaveapplicationReport = function (strwhere) {
    var strquery = "select  employeeId, employerleavetypeId, IFNULL(SUM(employeeleaveapplicationNoOfDays),0) AS cnt from view_employeeleaveapplication where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;