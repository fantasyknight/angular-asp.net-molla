var method = {};

method.masterData = (request) => {
    let employerotsetupId = request.body.employerotsetupId || 0;
    let employerId = request.body.employerId || 0;
    let employerotsetupOTCode = request.body.employerotsetupOTCode || '';
    let employerotsetupDescription = request.body.employerotsetupDescription || '';
    let employerotsetupRate = request.body.employerotsetupRate || 0.0;
    let employerotsetupEPF = request.body.employerotsetupEPF || false;
    let employerotsetupSocso = request.body.employerotsetupSocso || false;
    let employerotsetupPCB = request.body.employerotsetupPCB || false;
    let employerotsetupEIS = request.body.employerotsetupEIS || false;
    let employerotsetupCP8A = request.body.employerotsetupCP8A || false;
    let employerotsetupCP22A = request.body.employerotsetupCP22A || false;
    let employerotsetupHRDF = request.body.employerotsetupHRDF || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerotsetupId,
        employerId,
        employerotsetupOTCode,
        employerotsetupDescription,
        employerotsetupRate,
        employerotsetupEPF,
        employerotsetupSocso,
        employerotsetupPCB,
        employerotsetupEIS,
        employerotsetupCP8A,
        employerotsetupCP22A,
        employerotsetupHRDF,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *,
                    CONVERT(ROUND(employerotsetupRate,2),CHAR) AS employerotsetupRateRound2,
                    CONVERT(ROUND(employerotsetupRate,4),CHAR) AS employerotsetupRateRound4 
                    from tblemployerotsetup where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employerotsetupId,employerId,employerotsetupOTCode,employerotsetupDescription,employerotsetupRate,employerotsetupEPF,
                    employerotsetupSocso,employerotsetupPCB,employerotsetupEIS,employerotsetupCP8A,employerotsetupCP22A,employerotsetupHRDF,
                    CONVERT(ROUND(employerotsetupRate,2),CHAR) AS employerotsetupRateRound2,
                    CONVERT(ROUND(employerotsetupRate,4),CHAR) AS employerotsetupRateRound4,
                    createdBy,createdDate from tblemployerotsetup where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerotsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerotsetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerotsetup where 1 = 1 and employerotsetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerotsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerotsetup (employerId, employerotsetupOTCode, employerotsetupDescription, employerotsetupRate, employerotsetupEPF, employerotsetupSocso, employerotsetupPCB, employerotsetupEIS, employerotsetupCP8A, employerotsetupCP22A, employerotsetupHRDF, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerotsetupOTCode + "', '" + pera.employerotsetupDescription + "', '" + pera.employerotsetupRate + "', " + pera.employerotsetupEPF + ", " + pera.employerotsetupSocso + ", " + pera.employerotsetupPCB + ", " + pera.employerotsetupEIS + ", " + pera.employerotsetupCP8A + ", " + pera.employerotsetupCP22A + ", " + pera.employerotsetupHRDF + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerotsetup (employerId, employerotsetupOTCode, employerotsetupDescription, employerotsetupRate, employerotsetupEPF, employerotsetupSocso, employerotsetupPCB, employerotsetupEIS, employerotsetupCP8A, employerotsetupCP22A, employerotsetupHRDF, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerotsetup set employerId = '" + pera.employerId + "', employerotsetupOTCode = '" + pera.employerotsetupOTCode + "', employerotsetupDescription = '" + pera.employerotsetupDescription + "', employerotsetupRate = '" + pera.employerotsetupRate + "', employerotsetupEPF = " + pera.employerotsetupEPF + ", employerotsetupSocso = " + pera.employerotsetupSocso + ", employerotsetupPCB = " + pera.employerotsetupPCB + ", employerotsetupEIS = " + pera.employerotsetupEIS + ", employerotsetupCP8A = " + pera.employerotsetupCP8A + ", employerotsetupCP22A = " + pera.employerotsetupCP22A + ", employerotsetupHRDF = " + pera.employerotsetupHRDF + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerotsetupId = '" + pera.employerotsetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerotsetup set " + column + " where employerotsetupId = " + id + " ";
    return strquery;
};

exports.data = method;