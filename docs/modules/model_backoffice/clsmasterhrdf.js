var method = {};

method.masterData = (request) => {
    let masterhrdfId = request.body.masterhrdfId || 0;
    let masterhrdfCode = request.body.masterhrdfCode || '';
    let masterhrdfTitle = request.body.masterhrdfTitle || '';
    let masterhrdfIsActive = request.body.masterhrdfIsActive || false;
    let masterhrdfEmployeePer = request.body.masterhrdfEmployeePer || 0.0;
    let masterhrdfEmployerPer = request.body.masterhrdfEmployerPer || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masterhrdfId,
        masterhrdfCode,
        masterhrdfTitle,
        masterhrdfIsActive,
        masterhrdfEmployeePer,
        masterhrdfEmployerPer,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterhrdf where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterhrdfId,masterhrdfCode,masterhrdfTitle,masterhrdfIsActive,masterhrdfEmployeePer,masterhrdfEmployerPer,createdBy,createdDate from tblmasterhrdf where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterhrdf where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterhrdf where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterhrdf where 1 = 1 and masterhrdfId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterhrdf where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterhrdf (masterhrdfCode, masterhrdfTitle, masterhrdfIsActive, masterhrdfEmployeePer, masterhrdfEmployerPer, createdBy, createdDate) values ('" + pera.masterhrdfCode + "', '" + pera.masterhrdfTitle + "', " + pera.masterhrdfIsActive + ", '" + pera.masterhrdfEmployeePer + "', '" + pera.masterhrdfEmployerPer + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterhrdf (masterhrdfCode, masterhrdfTitle, masterhrdfIsActive, masterhrdfEmployeePer, masterhrdfEmployerPer, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterhrdf set masterhrdfCode = '" + pera.masterhrdfCode + "', masterhrdfTitle = '" + pera.masterhrdfTitle + "', masterhrdfIsActive = " + pera.masterhrdfIsActive + ", masterhrdfEmployeePer = '" + pera.masterhrdfEmployeePer + "', masterhrdfEmployerPer = '" + pera.masterhrdfEmployerPer + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masterhrdfId = '" + pera.masterhrdfId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterhrdf set " + column + " where masterhrdfId = " + id + " ";
    return strquery;
};

exports.data = method;