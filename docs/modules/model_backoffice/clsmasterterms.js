var method = {};

method.masterData = (request) => {
    let mastertermsId = request.body.mastertermsId || 0;
    let mastertermsCode = request.body.mastertermsCode || '';
    let mastertermsTitle = request.body.mastertermsTitle || '';
    let mastertermsType = request.body.mastertermsType || '';
    let mastertermsDays = request.body.mastertermsDays || '';
    let mastertermsIsActive = request.body.mastertermsIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        mastertermsId,
        mastertermsCode,
        mastertermsTitle,
        mastertermsType,
        mastertermsDays,
        mastertermsIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterterms where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select mastertermsId,mastertermsCode,mastertermsTitle,mastertermsType,mastertermsDays,mastertermsIsActive,createdBy,createdDate from tblmasterterms where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterterms where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterterms where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterterms where 1 = 1 and mastertermsId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterterms where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmasterterms (mastertermsCode, mastertermsTitle, mastertermsType, mastertermsDays, mastertermsIsActive, createdBy, createdDate) values ('" + pera.mastertermsCode + "', '" + pera.mastertermsTitle + "', '" + pera.mastertermsType + "', '" + pera.mastertermsDays + "', " + pera.mastertermsIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterterms (mastertermsCode, mastertermsTitle, mastertermsType, mastertermsDays, mastertermsIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmasterterms set mastertermsCode = '" + pera.mastertermsCode + "', mastertermsTitle = '" + pera.mastertermsTitle + "', mastertermsType = '" + pera.mastertermsType + "', mastertermsDays = '" + pera.mastertermsDays + "', mastertermsIsActive = " + pera.mastertermsIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where mastertermsId = '" + pera.mastertermsId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterterms set " + column + " where mastertermsId = " + id + " ";
    return strquery;
};

exports.data = method;