var method = {};

method.masterData = (request) => {
    let signupId = request.body.signupId || 0;
    let name = request.body.name || '';
    let mobile = request.body.mobile || '';
    let email = request.body.email || '';
    let role = request.body.role || '';
    let password = request.body.password || '';
    let isReadTerm = request.body.isReadTerm || false;
    let isVerify = request.body.isVerify || false;
    let accessCode = request.body.accessCode || '';
    let isAccessCode = request.body.isAccessCode || false;
    let createdDate = request.body.createdDate || null;
    return {
        signupId,
        name,
        mobile,
        email,
        role,
        password,
        isReadTerm,
        isVerify,
        accessCode,
        isAccessCode,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblsignup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select signupId,name,mobile,email,role,password,isReadTerm,isVerify,accessCode,isAccessCode,createdDate from tblsignup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblsignup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblsignup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblsignup where 1 = 1 and signupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblsignup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblsignup (name, mobile, email, role, password, isReadTerm, isVerify, accessCode, isAccessCode, createdDate) values ('" + pera.name + "', '" + pera.mobile + "', '" + pera.email + "', '" + pera.role + "', '" + pera.password + "', " + pera.isReadTerm + ", " + pera.isVerify + ", '" + pera.accessCode + "', " + pera.isAccessCode + ", " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblsignup (name, mobile, email, role, password, isReadTerm, isVerify, accessCode, isAccessCode, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblsignup set name = '" + pera.name + "', mobile = '" + pera.mobile + "', email = '" + pera.email + "', role = '" + pera.role + "', password = '" + pera.password + "', isReadTerm = " + pera.isReadTerm + ", isVerify = " + pera.isVerify + ", accessCode = '" + pera.accessCode + "', isAccessCode = " + pera.isAccessCode + ", createdDate = " + pera.createdDate + " where signupId = '" + pera.signupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblsignup set " + column + " where signupId = " + id + " ";
    return strquery;
};

/* Custom */

method.signIn = function (strwhere) {
    var strquery = `select signupId, name, mobile, email, role, password, case when isReadTerm = true then true else false end AS isReadTerm,
                    case when isVerify = true then true else false end as isVerify,
                    case when isAccessCode = true then true else false end as isAccessCode from tblsignup where 1=1 ` + strwhere;
    return strquery;
};

exports.data = method;