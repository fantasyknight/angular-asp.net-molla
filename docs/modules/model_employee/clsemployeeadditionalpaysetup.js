var method = {};

method.masterData = (request) => {
    let employeeadditionalpaysetupId = request.body.employeeadditionalpaysetupId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employeradditionalpaysetupId = request.body.employeradditionalpaysetupId || 0;
    let employeeadditionalpaysetupRate = request.body.employeeadditionalpaysetupRate || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeadditionalpaysetupId,
        employerId,
        employeeId,
        employeradditionalpaysetupId,
        employeeadditionalpaysetupRate,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeadditionalpaysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeadditionalpaysetupId,employerId,employeeId,employeradditionalpaysetupId,employeeadditionalpaysetupRate,createdBy,createdDate from tblemployeeadditionalpaysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeadditionalpaysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeadditionalpaysetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeadditionalpaysetup where 1 = 1 and employeeadditionalpaysetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeadditionalpaysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeadditionalpaysetup (employerId, employeeId, employeradditionalpaysetupId, employeeadditionalpaysetupRate, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employeradditionalpaysetupId + "', '" + pera.employeeadditionalpaysetupRate + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeadditionalpaysetup (employerId, employeeId, employeradditionalpaysetupId, employeeadditionalpaysetupRate, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeadditionalpaysetup set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employeradditionalpaysetupId = '" + pera.employeradditionalpaysetupId + "', employeeadditionalpaysetupRate = '" + pera.employeeadditionalpaysetupRate + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeadditionalpaysetupId = '" + pera.employeeadditionalpaysetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeadditionalpaysetup set " + column + " where employeeadditionalpaysetupId = " + id + " ";
    return strquery;
};


method.select_view_employeeadditionalpaysetup = function (employerId, employeeId) {
    var strquery = `select a.employeradditionalpaysetupId, a.employerId, a.employeradditionalpaysetupCode, a.employeradditionalpaysetupDescription, 
                    a.employeradditionalpaysetupRate, IFNULL(b.employeeId, 0) AS employeeId, IFNULL(b.employeeadditionalpaysetupId,0) AS employeeadditionalpaysetupId, 
                    IFNULL(b.employeeadditionalpaysetupRate,0) AS employeeadditionalpaysetupRate 
                    FROM tblemployeradditionalpaysetup AS a LEFT JOIN tblemployeeadditionalpaysetup AS b 
                    ON a.employeradditionalpaysetupId = b.employeradditionalpaysetupId 
                    AND a.employerId = b.employerId 
                    AND b.employeeId = ` + employeeId + ` where 1 = 1 and a.employerId = ` + employerId + ` order by employeradditionalpaysetupCode ASC `;
    return strquery;
};

method.select_view_employeeadditionalpaysetup_salary = function (strwhere) {
    var strquery = `select * from 
    (select a.employeeadditionalpaysetupId, a.employerId, a.employeeId, a.employeradditionalpaysetupId, a.employeeadditionalpaysetupRate, b.employeradditionalpaysetupCode,
    b.employeradditionalpaysetupDescription, b.employeradditionalpaysetupRate, b.employeradditionalpaysetupEPF, b.employeradditionalpaysetupSocso, b.employeradditionalpaysetupPCB,
    b.employeradditionalpaysetupEIS, b.employeradditionalpaysetupOT, b.employeradditionalpaysetupNPL, b.employeradditionalpaysetupCP8A, b.employeradditionalpaysetupCP22A,
    b.employeradditionalpaysetupHRDF
    from tblemployeeadditionalpaysetup as a left join tblemployeradditionalpaysetup as b on a.employeradditionalpaysetupId = b.employeradditionalpaysetupId 
    and a.employerId = b.employerId) as data where 1 = 1 ` + strwhere;
    return strquery;
};

exports.data = method;