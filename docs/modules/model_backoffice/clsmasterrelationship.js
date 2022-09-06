var method = {};

method.masterData = (request) => {
    let masterrelationshipId = request.body.masterrelationshipId || 0;
    let masterrelationshipCode = request.body.masterrelationshipCode || '';
    let masterrelationshipTitle = request.body.masterrelationshipTitle || '';
    let masterrelationshipIsActive = request.body.masterrelationshipIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterrelationshipId,
        masterrelationshipCode,
        masterrelationshipTitle,
        masterrelationshipIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterrelationship where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterrelationshipId,masterrelationshipCode,masterrelationshipTitle,masterrelationshipIsActive,createdBy,createdDate from tblmasterrelationship where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterrelationship where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterrelationship where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterrelationship where 1 = 1 and masterrelationshipId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterrelationship where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterrelationship (masterrelationshipCode, masterrelationshipTitle, masterrelationshipIsActive, createdBy, createdDate) values ('" + pera.masterrelationshipCode + "', '" + pera.masterrelationshipTitle + "', " + pera.masterrelationshipIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterrelationship (masterrelationshipCode, masterrelationshipTitle, masterrelationshipIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterrelationship set masterrelationshipCode = '" + pera.masterrelationshipCode + "', masterrelationshipTitle = '" + pera.masterrelationshipTitle + "', masterrelationshipIsActive = " + pera.masterrelationshipIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterrelationshipId = '" + pera.masterrelationshipId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterrelationship set " + column + " where masterrelationshipId = " + id + " ";
    return strquery;
};

exports.data = method;