var method = {};

method.masterData = (request) => {
    let mastersocsoId = request.body.mastersocsoId || 0;
    let mastersocsoCode = request.body.mastersocsoCode || '';
    let mastersocsoTitle = request.body.mastersocsoTitle || '';
    let mastersocsoIsActive = request.body.mastersocsoIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        mastersocsoId,
        mastersocsoCode,
        mastersocsoTitle,
        mastersocsoIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmastersocso where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select mastersocsoId,mastersocsoCode,mastersocsoTitle,mastersocsoIsActive,createdBy,createdDate from tblmastersocso where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmastersocso where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmastersocso where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmastersocso where 1 = 1 and mastersocsoId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmastersocso where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmastersocso (mastersocsoCode, mastersocsoTitle, mastersocsoIsActive, createdBy, createdDate) values ('" + pera.mastersocsoCode + "', '" + pera.mastersocsoTitle + "', " + pera.mastersocsoIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmastersocso (mastersocsoCode, mastersocsoTitle, mastersocsoIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmastersocso set mastersocsoCode = '" + pera.mastersocsoCode + "', mastersocsoTitle = '" + pera.mastersocsoTitle + "', mastersocsoIsActive = " + pera.mastersocsoIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where mastersocsoId = '" + pera.mastersocsoId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmastersocso set " + column + " where mastersocsoId = " + id + " ";
    return strquery;
};

exports.data = method;