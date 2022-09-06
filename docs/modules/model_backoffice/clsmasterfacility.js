var method = {};

method.masterData = (request) => {
    let masterfacilityId = request.body.masterfacilityId || 0;
    let masterfacilityCode = request.body.masterfacilityCode || '';
    let masterfacilityTitle = request.body.masterfacilityTitle || '';
    let masterfacilityIsActive = request.body.masterfacilityIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterfacilityId,
        masterfacilityCode,
        masterfacilityTitle,
        masterfacilityIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterfacilityId,masterfacilityCode,masterfacilityTitle,masterfacilityIsActive,createdBy,createdDate from tblmasterfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterfacility where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterfacility where 1 = 1 and masterfacilityId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterfacility where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterfacility (masterfacilityCode, masterfacilityTitle, masterfacilityIsActive, createdBy, createdDate) values ('" + pera.masterfacilityCode + "', '" + pera.masterfacilityTitle + "', " + pera.masterfacilityIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterfacility (masterfacilityCode, masterfacilityTitle, masterfacilityIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterfacility set masterfacilityCode = '" + pera.masterfacilityCode + "', masterfacilityTitle = '" + pera.masterfacilityTitle + "', masterfacilityIsActive = " + pera.masterfacilityIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterfacilityId = '" + pera.masterfacilityId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterfacility set " + column + " where masterfacilityId = " + id + " ";
    return strquery;
};

exports.data = method;