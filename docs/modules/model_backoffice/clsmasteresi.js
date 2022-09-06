var method = {};

method.masterData = (request) => {
    let masteresiId = request.body.masteresiId || 0;
    let masteresiCode = request.body.masteresiCode || '';
    let masteresiTitle = request.body.masteresiTitle || '';
    let masteresiIsActive = request.body.masteresiIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masteresiId,
        masteresiCode,
        masteresiTitle,
        masteresiIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasteresi where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masteresiId,masteresiCode,masteresiTitle,masteresiIsActive,createdBy,createdDate from tblmasteresi where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasteresi where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasteresi where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasteresi where 1 = 1 and masteresiId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasteresi where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasteresi (masteresiCode, masteresiTitle, masteresiIsActive, createdBy, createdDate) values ('" + pera.masteresiCode + "', '" + pera.masteresiTitle + "', " + pera.masteresiIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasteresi (masteresiCode, masteresiTitle, masteresiIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasteresi set masteresiCode = '" + pera.masteresiCode + "', masteresiTitle = '" + pera.masteresiTitle + "', masteresiIsActive = " + pera.masteresiIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masteresiId = '" + pera.masteresiId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasteresi set " + column + " where masteresiId = " + id + " ";
    return strquery;
};

exports.data = method;