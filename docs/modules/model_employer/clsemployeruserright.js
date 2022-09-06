var method = {};

method.masterData = (request) => {
    let employeruserrightId = request.body.employeruserrightId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employerTemplateId = request.body.employerTemplateId || 0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeruserrightId,
        employerId,
        employeeId,
        employerTemplateId,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeruserright where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeruserrightId,employerId,employeeId,employerTemplateId,createdBy,createdDate from tblemployeruserright where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeruserright where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeruserright where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeruserright where 1 = 1 and employeruserrightId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeruserright where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeruserright (employerId, employeeId, employerTemplateId, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employerTemplateId + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeruserright (employerId, employeeId, employerTemplateId, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeruserright set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employerTemplateId = '" + pera.employerTemplateId + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeruserrightId = '" + pera.employeruserrightId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeruserright set " + column + " where employeruserrightId = " + id + " ";
    return strquery;
};

method.select_view_userright = function (strwhere) {
    var strquery = `select * from (select a.employeeId, a.employerId, a.memberName, 
                    IFNULL(b.employeruserrightId, 0) AS employeruserrightId,
                    IFNULL(b.employerTemplateId, 0) AS employerTemplateId from 
                    view_employee AS a left join tblemployeruserright as b on a.employeeId = b.employeeId 
                    and a.employerId = b.employerId) as data WHERE 1 = 1 ` + strwhere;
    return strquery;
};

method.getcount_view_userright = function (strwhere) {
    var strquery = `select count(*) as cnt from (select a.employeeId, a.employerId, a.memberName, b.employerTemplateId from 
        view_employee AS a left join tblemployeruserright as b on a.employeeId = b.employeeId 
        and a.employerId = b.employerId) as data WHERE 1 = 1 ` + strwhere;
    return strquery;
};

method.select_employee_rights = function (strwhere) {
    var strquery = "select * from view_memberuserrightsaccess where 1 = 1 " + strwhere;
    return strquery;
};



exports.data = method;