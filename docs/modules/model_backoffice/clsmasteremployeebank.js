var method = {};

method.masterData = (request) => {
    let masteremployeebankId = request.body.masteremployeebankId || 0;
    let masteremployeebankName = request.body.masteremployeebankName || '';
    let masteremployeebankAddress = request.body.masteremployeebankAddress || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masteremployeebankId,
        masteremployeebankName,
        masteremployeebankAddress,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasteremployeebank where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masteremployeebankId,masteremployeebankName,masteremployeebankAddress,createdBy,createdDate from tblmasteremployeebank where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasteremployeebank where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasteremployeebank where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasteremployeebank where 1 = 1 and masteremployeebankId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasteremployeebank where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasteremployeebank (masteremployeebankName, masteremployeebankAddress, createdBy, createdDate) values ('" + pera.masteremployeebankName + "', '" + pera.masteremployeebankAddress + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasteremployeebank (masteremployeebankName, masteremployeebankAddress, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasteremployeebank set masteremployeebankName = '" + pera.masteremployeebankName + "', masteremployeebankAddress = '" + pera.masteremployeebankAddress + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masteremployeebankId = '" + pera.masteremployeebankId + "' ";
    return strquery;
};

exports.data = method;