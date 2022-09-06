var method = {};

method.masterData = (request) => {
    let mastercitizenshipId = request.body.mastercitizenshipId || 0;
    let mastercitizenshipCode = request.body.mastercitizenshipCode || '';
    let mastercitizenshipTitle = request.body.mastercitizenshipTitle || '';
    let mastercitizenshipIsActive = request.body.mastercitizenshipIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        mastercitizenshipId,
        mastercitizenshipCode,
        mastercitizenshipTitle,
        mastercitizenshipIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmastercitizenship where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select mastercitizenshipId,mastercitizenshipCode,mastercitizenshipTitle,mastercitizenshipIsActive,createdBy,createdDate from tblmastercitizenship where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmastercitizenship where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmastercitizenship where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmastercitizenship where 1 = 1 and mastercitizenshipId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmastercitizenship where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    var strquery = "insert into tblmastercitizenship (mastercitizenshipCode, mastercitizenshipTitle, mastercitizenshipIsActive, createdBy, createdDate) values ('" + pera.mastercitizenshipCode + "', '" + pera.mastercitizenshipTitle + "', " + pera.mastercitizenshipIsActive + ", '" + pera.createdBy + "', now())";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmastercitizenship (mastercitizenshipCode, mastercitizenshipTitle, mastercitizenshipIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    var strquery = "update tblmastercitizenship set mastercitizenshipCode = '" + pera.mastercitizenshipCode + "', mastercitizenshipTitle = '" + pera.mastercitizenshipTitle + "', mastercitizenshipIsActive = " + pera.mastercitizenshipIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = now() where mastercitizenshipId = '" + pera.mastercitizenshipId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmastercitizenship set " + column + " where mastercitizenshipId = " + id + " ";
    return strquery;
};

exports.data = method;