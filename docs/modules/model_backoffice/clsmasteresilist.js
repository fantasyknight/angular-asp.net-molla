var method = {};

method.masterData = (request) => {
    let masteresilistId = request.body.masteresilistId || 0;
    let masteresiId = request.body.masteresiId || 0;
    let masteresilistFrom = request.body.masteresilistFrom || 0.0;
    let masteresilistTo = request.body.masteresilistTo || 0.0;
    let masteresilistEmployerContribution = request.body.masteresilistEmployerContribution || 0.0;
    let masteresilistEmployeeContribution = request.body.masteresilistEmployeeContribution || 0.0;
    let masteresilistTotalContribution = request.body.masteresilistTotalContribution || 0.0;
    let masteresilistEmployerContribution1 = request.body.masteresilistEmployerContribution1 || 0.0;
    let masteresilistIsActive = request.body.masteresilistIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masteresilistId,
        masteresiId,
        masteresilistFrom,
        masteresilistTo,
        masteresilistEmployerContribution,
        masteresilistEmployeeContribution,
        masteresilistTotalContribution,
        masteresilistEmployerContribution1,
        masteresilistIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasteresilist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masteresilistId,masteresiId,masteresilistFrom,masteresilistTo,masteresilistEmployerContribution,masteresilistEmployeeContribution,masteresilistTotalContribution,masteresilistEmployerContribution1,masteresilistIsActive,createdBy,createdDate from tblmasteresilist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasteresilist where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasteresilist where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasteresilist where 1 = 1 and masteresilistId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasteresilist where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasteresilist (masteresiId, masteresilistFrom, masteresilistTo, masteresilistEmployerContribution, masteresilistEmployeeContribution, masteresilistTotalContribution, masteresilistEmployerContribution1, masteresilistIsActive, createdBy, createdDate) values ('" + pera.masteresiId + "', '" + pera.masteresilistFrom + "', '" + pera.masteresilistTo + "', '" + pera.masteresilistEmployerContribution + "', '" + pera.masteresilistEmployeeContribution + "', '" + pera.masteresilistTotalContribution + "', '" + pera.masteresilistEmployerContribution1 + "', " + pera.masteresilistIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasteresilist (masteresiId, masteresilistFrom, masteresilistTo, masteresilistEmployerContribution, masteresilistEmployeeContribution, masteresilistTotalContribution, masteresilistEmployerContribution1, masteresilistIsActive, createdBy) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasteresilist set masteresiId = '" + pera.masteresiId + "', masteresilistFrom = '" + pera.masteresilistFrom + "', masteresilistTo = '" + pera.masteresilistTo + "', masteresilistEmployerContribution = '" + pera.masteresilistEmployerContribution + "', masteresilistEmployeeContribution = '" + pera.masteresilistEmployeeContribution + "', masteresilistTotalContribution = '" + pera.masteresilistTotalContribution + "', masteresilistEmployerContribution1 = '" + pera.masteresilistEmployerContribution1 + "', masteresilistIsActive = " + pera.masteresilistIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masteresilistId = '" + pera.masteresilistId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasteresilist set " + column + " where masteresilistId = " + id + " ";
    return strquery;
};

exports.data = method;