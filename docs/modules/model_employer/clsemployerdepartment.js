var method = {};

method.masterData = (request) => {
    let employerdepartmentId = request.body.employerdepartmentId || 0;
    let employerId = request.body.employerId || 0;
    let employerdepartmentTitle = request.body.employerdepartmentTitle || '';
    let employerdepartmentIsActive = request.body.employerdepartmentIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerdepartmentId,
        employerId,
        employerdepartmentTitle,
        employerdepartmentIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployerdepartment where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerdepartmentId,employerId,employerdepartmentTitle,employerdepartmentIsActive,createdBy,createdDate from tblemployerdepartment where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerdepartment where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerdepartment where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerdepartment where 1 = 1 and employerdepartmentId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerdepartment where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerdepartment (employerId, employerdepartmentTitle, employerdepartmentIsActive, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerdepartmentTitle + "', " + pera.employerdepartmentIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerdepartment (employerId, employerdepartmentTitle, employerdepartmentIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerdepartment set employerId = '" + pera.employerId + "', employerdepartmentTitle = '" + pera.employerdepartmentTitle + "', employerdepartmentIsActive = " + pera.employerdepartmentIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerdepartmentId = '" + pera.employerdepartmentId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerdepartment set " + column + " where employerdepartmentId = " + id + " ";
    return strquery;
};

exports.data = method;