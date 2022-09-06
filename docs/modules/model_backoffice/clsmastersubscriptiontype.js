var method = {};

method.masterData = (request) => {
    let mastersubscriptiontypeId = request.body.mastersubscriptiontypeId || 0;
    let mastersubscriptiontypeTitle = request.body.mastersubscriptiontypeTitle || '';
    let mastersubscriptiontypeMonth = request.body.mastersubscriptiontypeMonth || '';
    let mastersubscriptiontypeAmount = request.body.mastersubscriptiontypeAmount || 0.0;
    let mastersubscriptiontypeIsActive = request.body.mastersubscriptiontypeIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        mastersubscriptiontypeId,
        mastersubscriptiontypeTitle,
        mastersubscriptiontypeMonth,
        mastersubscriptiontypeAmount,
        mastersubscriptiontypeIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmastersubscriptiontype where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select mastersubscriptiontypeId,mastersubscriptiontypeTitle,mastersubscriptiontypeMonth,mastersubscriptiontypeAmount,mastersubscriptiontypeIsActive,createdBy,createdDate from tblmastersubscriptiontype where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmastersubscriptiontype where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmastersubscriptiontype where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmastersubscriptiontype where 1 = 1 and mastersubscriptiontypeId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmastersubscriptiontype where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmastersubscriptiontype (mastersubscriptiontypeTitle, mastersubscriptiontypeMonth, mastersubscriptiontypeAmount, mastersubscriptiontypeIsActive, createdBy, createdDate) values ('" + pera.mastersubscriptiontypeTitle + "', '" + pera.mastersubscriptiontypeMonth + "', '" + pera.mastersubscriptiontypeAmount + "', " + pera.mastersubscriptiontypeIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmastersubscriptiontype (mastersubscriptiontypeTitle, mastersubscriptiontypeMonth, mastersubscriptiontypeAmount, mastersubscriptiontypeIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmastersubscriptiontype set mastersubscriptiontypeTitle = '" + pera.mastersubscriptiontypeTitle + "', mastersubscriptiontypeMonth = '" + pera.mastersubscriptiontypeMonth + "', mastersubscriptiontypeAmount = '" + pera.mastersubscriptiontypeAmount + "', mastersubscriptiontypeIsActive = " + pera.mastersubscriptiontypeIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where mastersubscriptiontypeId = '" + pera.mastersubscriptiontypeId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmastersubscriptiontype set " + column + " where mastersubscriptiontypeId = " + id + " ";
    return strquery;
};

exports.data = method;