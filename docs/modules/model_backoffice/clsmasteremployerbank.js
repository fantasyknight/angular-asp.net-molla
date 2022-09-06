var method = {};

method.masterData = (request) => {
    let masteremployerbankId = request.body.masteremployerbankId || 0;
    let masteremployerbankName = request.body.masteremployerbankName || '';
    let masteremployerbankAddress = request.body.masteremployerbankAddress || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        masteremployerbankId,
        masteremployerbankName,
        masteremployerbankAddress,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasteremployerbank where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masteremployerbankId,masteremployerbankName,masteremployerbankAddress,createdBy,createdDate from tblmasteremployerbank where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasteremployerbank where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasteremployerbank where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasteremployerbank where 1 = 1 and masteremployerbankId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasteremployerbank where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasteremployerbank (masteremployerbankName, masteremployerbankAddress, createdBy, createdDate) values ('" + pera.masteremployerbankName + "', '" + pera.masteremployerbankAddress + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasteremployerbank (masteremployerbankName, masteremployerbankAddress, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasteremployerbank set masteremployerbankName = '" + pera.masteremployerbankName + "', masteremployerbankAddress = '" + pera.masteremployerbankAddress + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where masteremployerbankId = '" + pera.masteremployerbankId + "' ";
    return strquery;
};

exports.data = method;