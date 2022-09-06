var method = {};

method.masterData = (request) => {
    let mastercountryId = request.body.mastercountryId || 0;
    let mastercountryCode = request.body.mastercountryCode || '';
    let mastercountryTitle = request.body.mastercountryTitle || '';
    let mastercountryIsActive = request.body.mastercountryIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        mastercountryId,
        mastercountryCode,
        mastercountryTitle,
        mastercountryIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmastercountry where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select mastercountryId,mastercountryCode,mastercountryTitle,mastercountryIsActive,createdBy,createdDate from tblmastercountry where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmastercountry where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmastercountry where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmastercountry where 1 = 1 and mastercountryId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmastercountry where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmastercountry (mastercountryCode, mastercountryTitle, mastercountryIsActive, createdBy, createdDate) values ('" + pera.mastercountryCode + "', '" + pera.mastercountryTitle + "', " + pera.mastercountryIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmastercountry (mastercountryCode, mastercountryTitle, mastercountryIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmastercountry set mastercountryCode = '" + pera.mastercountryCode + "', mastercountryTitle = '" + pera.mastercountryTitle + "', mastercountryIsActive = " + pera.mastercountryIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where mastercountryId = '" + pera.mastercountryId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmastercountry set " + column + " where mastercountryId = " + id + " ";
    return strquery;
};

exports.data = method;