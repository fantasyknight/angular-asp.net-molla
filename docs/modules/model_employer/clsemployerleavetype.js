var method = {};

method.masterData = (request) => {
    let employerleavetypeId = request.body.employerleavetypeId || 0;
    let employerId = request.body.employerId || 0;
    let employerleavetypeLeaveCode = request.body.employerleavetypeLeaveCode || '';
    let employerleavetypeLeaveType = request.body.employerleavetypeLeaveType || '';
    let employerleavetypeOnProrateBasis = request.body.employerleavetypeOnProrateBasis || '';
    let employerleavetypeEntitlementRounding = request.body.employerleavetypeEntitlementRounding || '';
    let employerleavetypeLeaveConfirmationDay = request.body.employerleavetypeLeaveConfirmationDay || '';
    let employerleavetypeLeaveTypeColor = request.body.employerleavetypeLeaveTypeColor || '';
    let employerleavetypeIsAnnual = request.body.employerleavetypeIsAnnual || false;
    let employerleavetypeIsHospitalization = request.body.employerleavetypeIsHospitalization || false;
    let employerleavetypeIsOther = request.body.employerleavetypeIsOther || false;
    let employerleavetypeIsMedical = request.body.employerleavetypeIsMedical || false;
    let employerleavetypeIsUnpaid = request.body.employerleavetypeIsUnpaid || false;
    let employerleavetypeIsActive = request.body.employerleavetypeIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerleavetypeId,
        employerId,
        employerleavetypeLeaveCode,
        employerleavetypeLeaveType,
        employerleavetypeOnProrateBasis,
        employerleavetypeEntitlementRounding,
        employerleavetypeLeaveConfirmationDay,
        employerleavetypeLeaveTypeColor,
        employerleavetypeIsAnnual,
        employerleavetypeIsHospitalization,
        employerleavetypeIsOther,
        employerleavetypeIsMedical,
        employerleavetypeIsUnpaid,
        employerleavetypeIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployerleavetype where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerleavetypeId,employerId,employerleavetypeLeaveCode,employerleavetypeLeaveType,employerleavetypeOnProrateBasis,employerleavetypeEntitlementRounding,employerleavetypeLeaveConfirmationDay,employerleavetypeLeaveTypeColor,employerleavetypeIsAnnual,employerleavetypeIsHospitalization,employerleavetypeIsOther,employerleavetypeIsMedical,employerleavetypeIsUnpaid,employerleavetypeIsActive,createdBy,createdDate from tblemployerleavetype where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerleavetype where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerleavetype where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerleavetype where 1 = 1 and employerleavetypeId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerleavetype where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerleavetype (employerId, employerleavetypeLeaveCode, employerleavetypeLeaveType, employerleavetypeOnProrateBasis, employerleavetypeEntitlementRounding, employerleavetypeLeaveConfirmationDay, employerleavetypeLeaveTypeColor, employerleavetypeIsAnnual, employerleavetypeIsHospitalization, employerleavetypeIsOther, employerleavetypeIsMedical, employerleavetypeIsUnpaid, employerleavetypeIsActive, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerleavetypeLeaveCode + "', '" + pera.employerleavetypeLeaveType + "', '" + pera.employerleavetypeOnProrateBasis + "', '" + pera.employerleavetypeEntitlementRounding + "', '" + pera.employerleavetypeLeaveConfirmationDay + "', '" + pera.employerleavetypeLeaveTypeColor + "', " + pera.employerleavetypeIsAnnual + ", " + pera.employerleavetypeIsHospitalization + ", " + pera.employerleavetypeIsOther + ", " + pera.employerleavetypeIsMedical + ", " + pera.employerleavetypeIsUnpaid + ", " + pera.employerleavetypeIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerleavetype (employerId, employerleavetypeLeaveCode, employerleavetypeLeaveType, employerleavetypeOnProrateBasis, employerleavetypeEntitlementRounding, employerleavetypeLeaveConfirmationDay, employerleavetypeLeaveTypeColor, employerleavetypeIsAnnual, employerleavetypeIsHospitalization, employerleavetypeIsOther, employerleavetypeIsMedical, employerleavetypeIsUnpaid, employerleavetypeIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerleavetype set employerId = '" + pera.employerId + "', employerleavetypeLeaveCode = '" + pera.employerleavetypeLeaveCode + "', employerleavetypeLeaveType = '" + pera.employerleavetypeLeaveType + "', employerleavetypeOnProrateBasis = '" + pera.employerleavetypeOnProrateBasis + "', employerleavetypeEntitlementRounding = '" + pera.employerleavetypeEntitlementRounding + "', employerleavetypeLeaveConfirmationDay = '" + pera.employerleavetypeLeaveConfirmationDay + "', employerleavetypeLeaveTypeColor = '" + pera.employerleavetypeLeaveTypeColor + "', employerleavetypeIsAnnual = " + pera.employerleavetypeIsAnnual + ", employerleavetypeIsHospitalization = " + pera.employerleavetypeIsHospitalization + ", employerleavetypeIsOther = " + pera.employerleavetypeIsOther + ", employerleavetypeIsMedical = " + pera.employerleavetypeIsMedical + ", employerleavetypeIsUnpaid = " + pera.employerleavetypeIsUnpaid + ", employerleavetypeIsActive = " + pera.employerleavetypeIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerleavetypeId = '" + pera.employerleavetypeId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerleavetype set " + column + " where employerleavetypeId = " + id + " ";
    return strquery;
};

exports.data = method;