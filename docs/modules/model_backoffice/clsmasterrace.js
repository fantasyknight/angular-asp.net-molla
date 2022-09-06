var method = {};

method.masterData = (request) => {
    let masterraceId = request.body.masterraceId || 0;
    let masterraceCode = request.body.masterraceCode || '';
    let masterraceTitle = request.body.masterraceTitle || '';
    let masterraceIsActive = request.body.masterraceIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterraceId,
        masterraceCode,
        masterraceTitle,
        masterraceIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterrace where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterraceId,masterraceCode,masterraceTitle,masterraceIsActive,createdBy,createdDate from tblmasterrace where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterrace where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterrace where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterrace where 1 = 1 and masterraceId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterrace where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterrace (masterraceCode, masterraceTitle, masterraceIsActive, createdBy, createdDate) values ('" + pera.masterraceCode + "', '" + pera.masterraceTitle + "', " + pera.masterraceIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterrace (masterraceCode, masterraceTitle, masterraceIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterrace set masterraceCode = '" + pera.masterraceCode + "', masterraceTitle = '" + pera.masterraceTitle + "', masterraceIsActive = " + pera.masterraceIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterraceId = '" + pera.masterraceId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterrace set " + column + " where masterraceId = " + id + " ";
    return strquery;
};

exports.data = method;