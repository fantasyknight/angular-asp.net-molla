var method = {};

method.masterData = (request) => {
    let masterepfId = request.body.masterepfId || 0;
    let masterepfCode = request.body.masterepfCode || '';
    let masterepfTitle = request.body.masterepfTitle || '';
    let masterepfIsActive = request.body.masterepfIsActive || false;
    let masterepfEmployeePer = request.body.masterepfEmployeePer || 0.0;
    let masterepfEmployerPer = request.body.masterepfEmployerPer || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterepfId,
        masterepfCode,
        masterepfTitle,
        masterepfIsActive,
        masterepfEmployeePer,
        masterepfEmployerPer,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterepf where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterepfId,masterepfCode,masterepfTitle,masterepfIsActive,masterepfEmployeePer,masterepfEmployerPer,createdBy,createdDate from tblmasterepf where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterepf where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterepf where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterepf where 1 = 1 and masterepfId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterepf where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterepf (masterepfCode, masterepfTitle, masterepfIsActive, masterepfEmployeePer, masterepfEmployerPer, createdBy, createdDate) values ('" + pera.masterepfCode + "', '" + pera.masterepfTitle + "', " + pera.masterepfIsActive + ", '" + pera.masterepfEmployeePer + "', '" + pera.masterepfEmployerPer + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterepf (masterepfCode, masterepfTitle, masterepfIsActive, masterepfEmployeePer, masterepfEmployerPer, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterepf set masterepfCode = '" + pera.masterepfCode + "', masterepfTitle = '" + pera.masterepfTitle + "', masterepfIsActive = " + pera.masterepfIsActive + ", masterepfEmployeePer = '" + pera.masterepfEmployeePer + "', masterepfEmployerPer = '" + pera.masterepfEmployerPer + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterepfId = '" + pera.masterepfId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterepf set " + column + " where masterepfId = " + id + " ";
    return strquery;
};

exports.data = method;