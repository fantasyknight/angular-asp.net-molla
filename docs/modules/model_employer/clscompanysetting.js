var method = {};

method.masterData = (request) => {
    let settingId = request.body.settingId || 0;
    let employerId = request.body.employerId || 0;
    let companyName = request.body.companyName || '';
    let companyAddress = request.body.companyAddress || '';
    let companyContactEmail = request.body.companyContactEmail || '';
    let emailId = request.body.emailId || '';
    let password = request.body.password || '';
    return {
        settingId,
        employerId,
        companyName,
        companyAddress,
        companyContactEmail,
        emailId,
        password
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblcompanysetting where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select settingId,employerId,companyName,companyAddress,companyContactEmail,emailId,password from tblcompanysetting where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblcompanysetting where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblcompanysetting where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblcompanysetting where 1 = 1 and settingId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblcompanysetting where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    var strquery = "insert into tblcompanysetting (employerId, companyName, companyAddress, companyContactEmail, emailId, password) values ('" + pera.employerId + "', '" + pera.companyName + "', '" + pera.companyAddress + "', '" + pera.companyContactEmail + "', '" + pera.emailId + "', '" + pera.password + "')";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblcompanysetting (employerId, companyName, companyAddress, companyContactEmail, emailId, password) values ";
    return strquery;
};

method.update = function (pera) {
    var strquery = "update tblcompanysetting set employerId = '" + pera.employerId + "', companyName = '" + pera.companyName + "', companyAddress = '" + pera.companyAddress + "', companyContactEmail = '" + pera.companyContactEmail + "', emailId = '" + pera.emailId + "', password = '" + pera.password + "' where settingId = '" + pera.settingId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblcompanysetting set " + column + " where settingId = " + id + " ";
    return strquery;
};

exports.data = method;