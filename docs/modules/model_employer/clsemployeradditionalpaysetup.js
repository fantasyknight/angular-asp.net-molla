var method = {};

method.masterData = (request) => {
    let employeradditionalpaysetupId = request.body.employeradditionalpaysetupId || 0;
    let employerId = request.body.employerId || 0;
    let employeradditionalpaysetupCode = request.body.employeradditionalpaysetupCode || '';
    let employeradditionalpaysetupDescription = request.body.employeradditionalpaysetupDescription || '';
    let employeradditionalpaysetupRate = request.body.employeradditionalpaysetupRate || 0.0;
    let employeradditionalpaysetupEPF = request.body.employeradditionalpaysetupEPF || false;
    let employeradditionalpaysetupSocso = request.body.employeradditionalpaysetupSocso || false;
    let employeradditionalpaysetupPCB = request.body.employeradditionalpaysetupPCB || false;
    let employeradditionalpaysetupEIS = request.body.employeradditionalpaysetupEIS || false;
    let employeradditionalpaysetupOT = request.body.employeradditionalpaysetupOT || false;
    let employeradditionalpaysetupNPL = request.body.employeradditionalpaysetupNPL || false;
    let employeradditionalpaysetupCP8A = request.body.employeradditionalpaysetupCP8A || false;
    let employeradditionalpaysetupCP22A = request.body.employeradditionalpaysetupCP22A || false;
    let employeradditionalpaysetupHRDF = request.body.employeradditionalpaysetupHRDF || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeradditionalpaysetupId,
        employerId,
        employeradditionalpaysetupCode,
        employeradditionalpaysetupDescription,
        employeradditionalpaysetupRate,
        employeradditionalpaysetupEPF,
        employeradditionalpaysetupSocso,
        employeradditionalpaysetupPCB,
        employeradditionalpaysetupEIS,
        employeradditionalpaysetupOT,
        employeradditionalpaysetupNPL,
        employeradditionalpaysetupCP8A,
        employeradditionalpaysetupCP22A,
        employeradditionalpaysetupHRDF,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *, 
                    CONVERT(ROUND(employeradditionalpaysetupRate,2),CHAR) AS employeradditionalpaysetupRateRound2,
                    CONVERT(ROUND(employeradditionalpaysetupRate,4),CHAR) AS employeradditionalpaysetupRateRound4 
                    from tblemployeradditionalpaysetup where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employeradditionalpaysetupId,employerId,employeradditionalpaysetupCode,employeradditionalpaysetupDescription,
                    employeradditionalpaysetupRate,employeradditionalpaysetupEPF,employeradditionalpaysetupSocso,employeradditionalpaysetupPCB,
                    employeradditionalpaysetupEIS,employeradditionalpaysetupOT,employeradditionalpaysetupNPL,employeradditionalpaysetupCP8A,
                    employeradditionalpaysetupCP22A, employeradditionalpaysetupHRDF,
                    CONVERT(ROUND(employeradditionalpaysetupRate,2),CHAR) AS employeradditionalpaysetupRateRound2,
                    CONVERT(ROUND(employeradditionalpaysetupRate,4),CHAR) AS employeradditionalpaysetupRateRound4, createdBy,createdDate 
                    from tblemployeradditionalpaysetup where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeradditionalpaysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeradditionalpaysetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeradditionalpaysetup where 1 = 1 and employeradditionalpaysetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeradditionalpaysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeradditionalpaysetup (employerId, employeradditionalpaysetupCode, employeradditionalpaysetupDescription, employeradditionalpaysetupRate, employeradditionalpaysetupEPF, employeradditionalpaysetupSocso, employeradditionalpaysetupPCB, employeradditionalpaysetupEIS, employeradditionalpaysetupOT, employeradditionalpaysetupNPL, employeradditionalpaysetupCP8A, employeradditionalpaysetupCP22A, employeradditionalpaysetupHRDF, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeradditionalpaysetupCode + "', '" + pera.employeradditionalpaysetupDescription + "', '" + pera.employeradditionalpaysetupRate + "', " + pera.employeradditionalpaysetupEPF + ", " + pera.employeradditionalpaysetupSocso + ", " + pera.employeradditionalpaysetupPCB + ", " + pera.employeradditionalpaysetupEIS + ", " + pera.employeradditionalpaysetupOT + ", " + pera.employeradditionalpaysetupNPL + ", " + pera.employeradditionalpaysetupCP8A + ", " + pera.employeradditionalpaysetupCP22A + ", " + pera.employeradditionalpaysetupHRDF + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeradditionalpaysetup (employerId, employeradditionalpaysetupCode, employeradditionalpaysetupDescription, employeradditionalpaysetupRate, employeradditionalpaysetupEPF, employeradditionalpaysetupSocso, employeradditionalpaysetupPCB, employeradditionalpaysetupEIS, employeradditionalpaysetupOT, employeradditionalpaysetupNPL, employeradditionalpaysetupCP8A, employeradditionalpaysetupCP22A, employeradditionalpaysetupHRDF, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeradditionalpaysetup set employerId = '" + pera.employerId + "', employeradditionalpaysetupCode = '" + pera.employeradditionalpaysetupCode + "', employeradditionalpaysetupDescription = '" + pera.employeradditionalpaysetupDescription + "', employeradditionalpaysetupRate = '" + pera.employeradditionalpaysetupRate + "', employeradditionalpaysetupEPF = " + pera.employeradditionalpaysetupEPF + ", employeradditionalpaysetupSocso = " + pera.employeradditionalpaysetupSocso + ", employeradditionalpaysetupPCB = " + pera.employeradditionalpaysetupPCB + ", employeradditionalpaysetupEIS = " + pera.employeradditionalpaysetupEIS + ", employeradditionalpaysetupOT = " + pera.employeradditionalpaysetupOT + ", employeradditionalpaysetupNPL = " + pera.employeradditionalpaysetupNPL + ", employeradditionalpaysetupCP8A = " + pera.employeradditionalpaysetupCP8A + ", employeradditionalpaysetupCP22A = " + pera.employeradditionalpaysetupCP22A + ", employeradditionalpaysetupHRDF = " + pera.employeradditionalpaysetupHRDF + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeradditionalpaysetupId = '" + pera.employeradditionalpaysetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeradditionalpaysetup set " + column + " where employeradditionalpaysetupId = " + id + " ";
    return strquery;
};

exports.data = method;