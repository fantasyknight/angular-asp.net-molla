var method = {};

method.masterData = (request) => {
    let employerfacilityId = request.body.employerfacilityId || 0;
    let employerId = request.body.employerId || 0;
    let masterfacilityId = request.body.masterfacilityId || 0;
    let employerfacilityValue = request.body.employerfacilityValue || '';
    let employerfacilityIsActive = request.body.employerfacilityIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerfacilityId,
        employerId,
        masterfacilityId,
        employerfacilityValue,
        employerfacilityIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from view_facility where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerfacilityId,employerId,masterfacilityId,employerfacilityValue,employerfacilityIsActive,createdBy,createdDate from tblemployerfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerfacility where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerfacility where 1 = 1 and employerfacilityId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerfacility (employerId, masterfacilityId, employerfacilityValue, employerfacilityIsActive, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.masterfacilityId + "', '" + pera.employerfacilityValue + "', " + pera.employerfacilityIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerfacility (employerId, masterfacilityId, employerfacilityValue, employerfacilityIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerfacility set employerId = '" + pera.employerId + "', masterfacilityId = '" + pera.masterfacilityId + "', employerfacilityValue = '" + pera.employerfacilityValue + "', employerfacilityIsActive = " + pera.employerfacilityIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerfacilityId = '" + pera.employerfacilityId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerfacility set " + column + " where employerfacilityId = " + id + " ";
    return strquery;
};

exports.data = method;