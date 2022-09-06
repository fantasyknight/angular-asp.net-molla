var method = {};

method.masterData = (request) => {
    let employerleavetypeentitlementId = request.body.employerleavetypeentitlementId || 0;
    let employerleavetypeId = request.body.employerleavetypeId || 0;
    let employerleavetypeentitlementStart = request.body.employerleavetypeentitlementStart || 0;
    let employerleavetypeentitlementEnd = request.body.employerleavetypeentitlementEnd || 0;
    let employerleavetypeentitlementEntitleDay = request.body.employerleavetypeentitlementEntitleDay || 0;
    let employerleavetypeentitlementMaxBnf = request.body.employerleavetypeentitlementMaxBnf || 0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerleavetypeentitlementId,
        employerleavetypeId,
        employerleavetypeentitlementStart,
        employerleavetypeentitlementEnd,
        employerleavetypeentitlementEntitleDay,
        employerleavetypeentitlementMaxBnf,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployerleavetypeentitlement where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerleavetypeentitlementId,employerleavetypeId,employerleavetypeentitlementStart,employerleavetypeentitlementEnd,employerleavetypeentitlementEntitleDay,employerleavetypeentitlementMaxBnf,createdBy,createdDate from tblemployerleavetypeentitlement where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerleavetypeentitlement where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerleavetypeentitlement where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerleavetypeentitlement where 1 = 1 and employerleavetypeentitlementId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerleavetypeentitlement where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerleavetypeentitlement (employerleavetypeId, employerleavetypeentitlementStart, employerleavetypeentitlementEnd, employerleavetypeentitlementEntitleDay, employerleavetypeentitlementMaxBnf, createdBy, createdDate) values ('" + pera.employerleavetypeId + "', '" + pera.employerleavetypeentitlementStart + "', '" + pera.employerleavetypeentitlementEnd + "', '" + pera.employerleavetypeentitlementEntitleDay + "', '" + pera.employerleavetypeentitlementMaxBnf + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerleavetypeentitlement (employerleavetypeId, employerleavetypeentitlementStart, employerleavetypeentitlementEnd, employerleavetypeentitlementEntitleDay, employerleavetypeentitlementMaxBnf, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerleavetypeentitlement set employerleavetypeId = '" + pera.employerleavetypeId + "', employerleavetypeentitlementStart = '" + pera.employerleavetypeentitlementStart + "', employerleavetypeentitlementEnd = '" + pera.employerleavetypeentitlementEnd + "', employerleavetypeentitlementEntitleDay = '" + pera.employerleavetypeentitlementEntitleDay + "', employerleavetypeentitlementMaxBnf = '" + pera.employerleavetypeentitlementMaxBnf + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerleavetypeentitlementId = '" + pera.employerleavetypeentitlementId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerleavetypeentitlement set " + column + " where employerleavetypeentitlementId = " + id + " ";
    return strquery;
};

exports.data = method;