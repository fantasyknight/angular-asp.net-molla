var method = {};

method.masterData = (request) => {
    let companyAuthId = request.body.companyAuthId || 0;
    let employerId = request.body.employerId || 0;
    let employerIdEncrypt = request.body.employerIdEncrypt || '';
    let companyAuthUser = request.body.companyAuthUser || '';
    let companyAuthPassword = request.body.companyAuthPassword || '';
    let enrollNoPattern = request.body.enrollNoPattern || '';
    let location = request.body.location || '';
    let downloadEmail = request.body.downloadEmail || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        companyAuthId,
        employerId,
        employerIdEncrypt,
        companyAuthUser,
        companyAuthPassword,
        enrollNoPattern,
        location,
        downloadEmail,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblcompanyauth where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select companyAuthId,employerId,employerIdEncrypt,companyAuthUser,companyAuthPassword,enrollNoPattern,location,downloadEmail,createdBy,createdDate from tblcompanyauth where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblcompanyauth where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblcompanyauth where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblcompanyauth where 1 = 1 and companyAuthId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblcompanyauth where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblcompanyauth (employerId, employerIdEncrypt, companyAuthUser, companyAuthPassword, enrollNoPattern, location, downloadEmail, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerIdEncrypt + "', '" + pera.companyAuthUser + "', '" + pera.companyAuthPassword + "', '" + pera.enrollNoPattern + "', '" + pera.location + "', '" + pera.downloadEmail + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblcompanyauth (employerId, employerIdEncrypt, companyAuthUser, companyAuthPassword, enrollNoPattern, location, downloadEmail, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblcompanyauth set employerId = '" + pera.employerId + "', employerIdEncrypt = '" + pera.employerIdEncrypt + "', companyAuthUser = '" + pera.companyAuthUser + "', companyAuthPassword = '" + pera.companyAuthPassword + "', enrollNoPattern = '" + pera.enrollNoPattern + "', location = '" + pera.location + "', downloadEmail = '" + pera.downloadEmail + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where companyAuthId = '" + pera.companyAuthId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblcompanyauth set " + column + " where companyAuthId = " + id + " ";
    return strquery;
};

method.select_view_companyauth = function (strwhere) {
    var strquery = "select * from view_companyauth where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_companyauth = function (strwhere) {
    var strquery = "select count(*) as cnt from view_companyauth where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;