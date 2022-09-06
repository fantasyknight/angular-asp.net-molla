var method = {};

method.masterData = (request) => {
    let employerTemplateId = request.body.employerTemplateId || 0;
    let templateName = request.body.templateName || '';
    let employerId = request.body.employerId || 0;
    let isFullAccess = request.body.isFullAccess || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerTemplateId,
        templateName,
        employerId,
        isFullAccess,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployertemplate where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerTemplateId,templateName,employerId,isFullAccess,createdBy,createdDate from tblemployertemplate where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployertemplate where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployertemplate where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployertemplate where 1 = 1 and employerTemplateId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployertemplate where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployertemplate (templateName, employerId, isFullAccess, createdBy, createdDate) values ('" + pera.templateName + "', '" + pera.employerId + "', " + pera.isFullAccess + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployertemplate (templateName, employerId, isFullAccess, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployertemplate set templateName = '" + pera.templateName + "', employerId = '" + pera.employerId + "', isFullAccess = " + pera.isFullAccess + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerTemplateId = '" + pera.employerTemplateId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployertemplate set " + column + " where employerTemplateId = " + id + " ";
    return strquery;
};

exports.data = method;