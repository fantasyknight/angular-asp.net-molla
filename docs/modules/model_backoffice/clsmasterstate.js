var method = {};

method.masterData = (request) => {
    let masterstateId = request.body.masterstateId || 0;
    let mastercountryId = request.body.mastercountryId || 0;
    let masterstateCode = request.body.masterstateCode || '';
    let masterstateTitle = request.body.masterstateTitle || '';
    let masterstateIsActive = request.body.masterstateIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterstateId,
        mastercountryId,
        masterstateCode,
        masterstateTitle,
        masterstateIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterstate where 1 = 1 " + strwhere;
    return strquery;
};

method.view_select = function (strwhere) {
    var strquery = "select * from view_state where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterstateId,mastercountryId,masterstateCode,masterstateTitle,masterstateIsActive,createdBy,createdDate from tblmasterstate where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterstate where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterstate where 1=1 " + strwhere;
    return strquery;
};

method.view_getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  view_state where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterstate where 1 = 1 and masterstateId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterstate where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterstate (mastercountryId, masterstateCode, masterstateTitle, masterstateIsActive, createdBy, createdDate) values ('" + pera.mastercountryId + "', '" + pera.masterstateCode + "', '" + pera.masterstateTitle + "', " + pera.masterstateIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterstate (mastercountryId, masterstateCode, masterstateTitle, masterstateIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterstate set mastercountryId = '" + pera.mastercountryId + "', masterstateCode = '" + pera.masterstateCode + "', masterstateTitle = '" + pera.masterstateTitle + "', masterstateIsActive = " + pera.masterstateIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterstateId = '" + pera.masterstateId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterstate set " + column + " where masterstateId = " + id + " ";
    return strquery;
};

exports.data = method;