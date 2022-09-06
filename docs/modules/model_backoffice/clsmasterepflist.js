var method = {};

method.masterData = (request) => {
    let masterepflistId = request.body.masterepflistId || 0;
    let masterepfId = request.body.masterepfId || 0;
    let masterepflistFrom = request.body.masterepflistFrom || 0.0;
    let masterepflistTo = request.body.masterepflistTo || 0.0;
    let masterepflistDifference = request.body.masterepflistDifference || 0.0;
    let masterepflistEmploeePercentage = request.body.masterepflistEmploeePercentage || 0.0;
    let masterepflistEmployerPercentage = request.body.masterepflistEmployerPercentage || 0.0;
    let masterepflistIsActive = request.body.masterepflistIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterepflistId,
        masterepfId,
        masterepflistFrom,
        masterepflistTo,
        masterepflistDifference,
        masterepflistEmploeePercentage,
        masterepflistEmployerPercentage,
        masterepflistIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterepflist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterepflistId,masterepfId,masterepflistFrom,masterepflistTo,masterepflistDifference,masterepflistEmploeePercentage,masterepflistEmployerPercentage,masterepflistIsActive,createdBy,createdDate from tblmasterepflist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterepflist where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterepflist where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterepflist where 1 = 1 and masterepflistId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterepflist where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterepflist (masterepfId, masterepflistFrom, masterepflistTo, masterepflistDifference, masterepflistEmploeePercentage, masterepflistEmployerPercentage, masterepflistIsActive, createdBy, createdDate) values ('" + pera.masterepfId + "', '" + pera.masterepflistFrom + "', '" + pera.masterepflistTo + "', '" + pera.masterepflistDifference + "', '" + pera.masterepflistEmploeePercentage + "', '" + pera.masterepflistEmployerPercentage + "', " + pera.masterepflistIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterepflist (masterepfId, masterepflistFrom, masterepflistTo, masterepflistDifference, masterepflistEmploeePercentage, masterepflistEmployerPercentage, masterepflistIsActive, createdBy) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterepflist set masterepfId = '" + pera.masterepfId + "', masterepflistFrom = '" + pera.masterepflistFrom + "', masterepflistTo = '" + pera.masterepflistTo + "', masterepflistDifference = '" + pera.masterepflistDifference + "', masterepflistEmploeePercentage = '" + pera.masterepflistEmploeePercentage + "', masterepflistEmployerPercentage = '" + pera.masterepflistEmployerPercentage + "', masterepflistIsActive = " + pera.masterepflistIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterepflistId = '" + pera.masterepflistId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterepflist set " + column + " where masterepflistId = " + id + " ";
    return strquery;
};

method.select_view_masterepflist = function (strwhere) {
    var strquery = "select * from view_masterepflist where 1 = 1 " + strwhere;
    return strquery;
};

exports.data = method;