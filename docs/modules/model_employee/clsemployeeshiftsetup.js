var method = {};

method.masterData = (request) => {
    let employeeshiftsetupId = request.body.employeeshiftsetupId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employershiftsetupId = request.body.employershiftsetupId || 0;
    let employeeshiftsetupRate = request.body.employeeshiftsetupRate || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeshiftsetupId,
        employerId,
        employeeId,
        employershiftsetupId,
        employeeshiftsetupRate,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeeshiftsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeeshiftsetupId,employerId,employeeId,employershiftsetupId,employeeshiftsetupRate,createdBy,createdDate from tblemployeeshiftsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeshiftsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeshiftsetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeshiftsetup where 1 = 1 and employeeshiftsetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeshiftsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeshiftsetup (employerId, employeeId, employershiftsetupId, employeeshiftsetupRate, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employershiftsetupId + "', '" + pera.employeeshiftsetupRate + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeshiftsetup (employerId, employeeId, employershiftsetupId, employeeshiftsetupRate, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeshiftsetup set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employershiftsetupId = '" + pera.employershiftsetupId + "', employeeshiftsetupRate = '" + pera.employeeshiftsetupRate + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeshiftsetupId = '" + pera.employeeshiftsetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeshiftsetup set " + column + " where employeeshiftsetupId = " + id + " ";
    return strquery;
};

method.select_view_employeeshiftsetup = function (employerId, employeeId) {
    var strquery = `select a.employershiftsetupId AS employershiftsetupId,a.employerId AS employerId,a.employershiftsetupCode AS employershiftsetupCode,
                    a.employershiftsetupDescription AS employershiftsetupDescription, a.employershiftsetupAmount AS employershiftsetupAmount, 
                    IFNULL(b.employeeId, 0) AS employeeId, IFNULL(b.employeeshiftsetupId, 0) AS employeeshiftsetupId, IFNULL(b.employeeshiftsetupRate, 0) AS employeeshiftsetupRate  
                    FROM tblemployershiftsetup a LEFT JOIN tblemployeeshiftsetup b ON a.employershiftsetupId = b.employershiftsetupId 
                    AND a.employerId = b.employerId 
                    AND b.employeeId = ` + employeeId + ` where 1 = 1 and a.employerId = ` + employerId + ` order by employershiftsetupCode asc `;
    return strquery;
};

method.select_view_employeeshiftsetup_salary = function (strwhere) {
    var strquery = `select * from 
                    (select a.employeeshiftsetupId,a.employerId,a.employeeId,a.employershiftsetupId,a.employeeshiftsetupRate,b.employershiftsetupCode,
                    b.employershiftsetupDescription,b.employershiftsetupAmount,b.employershiftsetupEPF,b.employershiftsetupSocso,b.employershiftsetupPCB,
                    b.employershiftsetupEIS,b.employershiftsetupOT,b.employershiftsetupNPL,b.employershiftsetupCP8A,b.employershiftsetupCP22A, b.employershiftsetupHRDF from 
                    tblemployeeshiftsetup AS a 
                    LEFT JOIN tblemployershiftsetup AS b ON a.employershiftsetupId = b.employershiftsetupId AND a.employerId = b.employerId) AS DATA WHERE 1 = 1  ` + strwhere;
    return strquery;
};

exports.data = method;