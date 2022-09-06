var method = {};

method.masterData = (request) => {
    let masterhrdflistId = request.body.masterhrdflistId || 0;
    let masterhrdfId = request.body.masterhrdfId || 0;
    let masterhrdflistFrom = request.body.masterhrdflistFrom || 0.0;
    let masterhrdflistTo = request.body.masterhrdflistTo || 0.0;
    let masterhrdflistDifference = request.body.masterhrdflistDifference || 0.0;
    let masterhrdflistEmploeePercentage = request.body.masterhrdflistEmploeePercentage || 0.0;
    let masterhrdflistEmployerPercentage = request.body.masterhrdflistEmployerPercentage || 0.0;
    let masterhrdflistIsActive = request.body.masterhrdflistIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterhrdflistId,
        masterhrdfId,
        masterhrdflistFrom,
        masterhrdflistTo,
        masterhrdflistDifference,
        masterhrdflistEmploeePercentage,
        masterhrdflistEmployerPercentage,
        masterhrdflistIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterhrdflist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterhrdflistId,masterhrdfId,masterhrdflistFrom,masterhrdflistTo,masterhrdflistDifference,masterhrdflistEmploeePercentage,masterhrdflistEmployerPercentage,masterhrdflistIsActive,createdBy,createdDate from tblmasterhrdflist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterhrdflist where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterhrdflist where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterhrdflist where 1 = 1 and masterhrdflistId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterhrdflist where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterhrdflist (masterhrdfId, masterhrdflistFrom, masterhrdflistTo, masterhrdflistDifference, masterhrdflistEmploeePercentage, masterhrdflistEmployerPercentage, masterhrdflistIsActive, createdBy, createdDate) values ('" + pera.masterhrdfId + "', '" + pera.masterhrdflistFrom + "', '" + pera.masterhrdflistTo + "', '" + pera.masterhrdflistDifference + "', '" + pera.masterhrdflistEmploeePercentage + "', '" + pera.masterhrdflistEmployerPercentage + "', " + pera.masterhrdflistIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterhrdflist (masterhrdfId, masterhrdflistFrom, masterhrdflistTo, masterhrdflistDifference, masterhrdflistEmploeePercentage, masterhrdflistEmployerPercentage, masterhrdflistIsActive, createdBy) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterhrdflist set masterhrdfId = '" + pera.masterhrdfId + "', masterhrdflistFrom = '" + pera.masterhrdflistFrom + "', masterhrdflistTo = '" + pera.masterhrdflistTo + "', masterhrdflistDifference = '" + pera.masterhrdflistDifference + "', masterhrdflistEmploeePercentage = '" + pera.masterhrdflistEmploeePercentage + "', masterhrdflistEmployerPercentage = '" + pera.masterhrdflistEmployerPercentage + "', masterhrdflistIsActive = " + pera.masterhrdflistIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterhrdflistId = '" + pera.masterhrdflistId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterhrdflist set " + column + " where masterhrdflistId = " + id + " ";
    return strquery;
};

exports.data = method;