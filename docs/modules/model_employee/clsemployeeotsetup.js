var method = {};

method.masterData = (request) => {
    let employeeotsetupId = request.body.employeeotsetupId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employerotsetupId = request.body.employerotsetupId || 0;
    let employeeotsetupRate = request.body.employeeotsetupRate || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeotsetupId,
        employerId,
        employeeId,
        employerotsetupId,
        employeeotsetupRate,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeotsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeotsetupId,employerId,employeeId,employerotsetupId,employeeotsetupRate,createdBy,createdDate from tblemployeeotsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeotsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeotsetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeotsetup where 1 = 1 and employeeotsetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeotsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeotsetup (employerId, employeeId, employerotsetupId, employeeotsetupRate, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employerotsetupId + "', '" + pera.employeeotsetupRate + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeotsetup (employerId, employeeId, employerotsetupId, employeeotsetupRate, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeotsetup set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employerotsetupId = '" + pera.employerotsetupId + "', employeeotsetupRate = '" + pera.employeeotsetupRate + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeotsetupId = '" + pera.employeeotsetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeotsetup set " + column + " where employeeotsetupId = " + id + " ";
    return strquery;
};

method.select_view_employeeotsetup = function (employerId, employeeId) {
    var strquery = `select a.employerotsetupId, a.employerId, a.employerotsetupOTCode, a.employerotsetupDescription, a.employerotsetupRate, 
                    IFNULL(b.employeeId, 0) AS employeeId, IFNULL(b.employeeotsetupId, 0) AS employeeotsetupId, IFNULL(b.employeeotsetupRate, 0) AS employeeotsetupRate 
                    FROM tblemployerotsetup AS a LEFT JOIN tblemployeeotsetup AS b 
                    ON a.employerotsetupId = b.employerotsetupId 
                    AND a.employerId = b.employerId 
                    AND b.employeeId = ` + employeeId + ` 
                    WHERE 1 = 1 AND a.employerId = ` + employerId + ` order by employerotsetupOTCode ASC `;
    return strquery;
};

method.select_view_employeeotsetup_salary = function (strwhere) {
    var strquery = `select * from
    (select a.employeeotsetupId, a.employerId, a.employeeId, a.employerotsetupId, a.employeeotsetupRate, b.employerotsetupOTCode, b.employerotsetupDescription, b.employerotsetupRate,
    b.employerotsetupEPF, b.employerotsetupSocso, b.employerotsetupPCB, b.employerotsetupEIS, b.employerotsetupCP8A, b.employerotsetupCP22A, b.employerotsetupHRDF
    from tblemployeeotsetup as a left join tblemployerotsetup as b on a.employerotsetupId = b.employerotsetupId and a.employerId = b.employerId) as data where 1 = 1 ` + strwhere;
    return strquery;
};

exports.data = method;