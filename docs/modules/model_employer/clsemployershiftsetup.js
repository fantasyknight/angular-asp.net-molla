var method = {};

method.masterData = (request) => {
    let employershiftsetupId = request.body.employershiftsetupId || 0;
    let employerId = request.body.employerId || 0;
    let employershiftsetupCode = request.body.employershiftsetupCode || '';
    let employershiftsetupDescription = request.body.employershiftsetupDescription || '';
    let employershiftsetupAmount = request.body.employershiftsetupAmount || 0.0;
    let employershiftsetupEPF = request.body.employershiftsetupEPF || false;
    let employershiftsetupSocso = request.body.employershiftsetupSocso || false;
    let employershiftsetupPCB = request.body.employershiftsetupPCB || false;
    let employershiftsetupEIS = request.body.employershiftsetupEIS || false;
    let employershiftsetupOT = request.body.employershiftsetupOT || false;
    let employershiftsetupNPL = request.body.employershiftsetupNPL || false;
    let employershiftsetupCP8A = request.body.employershiftsetupCP8A || false;
    let employershiftsetupCP22A = request.body.employershiftsetupCP22A || false;
    let employershiftsetupHRDF = request.body.employershiftsetupHRDF || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employershiftsetupId,
        employerId,
        employershiftsetupCode,
        employershiftsetupDescription,
        employershiftsetupAmount,
        employershiftsetupEPF,
        employershiftsetupSocso,
        employershiftsetupPCB,
        employershiftsetupEIS,
        employershiftsetupOT,
        employershiftsetupNPL,
        employershiftsetupCP8A,
        employershiftsetupCP22A,
        employershiftsetupHRDF,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *, 
                    CONVERT(ROUND(employershiftsetupAmount,2),CHAR) AS employershiftsetupAmountRound2,
                    CONVERT(ROUND(employershiftsetupAmount,4),CHAR) AS employershiftsetupAmountRound4
                    from tblemployershiftsetup where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employershiftsetupId,employerId,employershiftsetupCode,employershiftsetupDescription,employershiftsetupAmount,
                    employershiftsetupEPF,employershiftsetupSocso,employershiftsetupPCB,employershiftsetupEIS,employershiftsetupOT,
                    employershiftsetupNPL,employershiftsetupCP8A,employershiftsetupCP22A, employershiftsetupHRDF,
                    CONVERT(ROUND(employershiftsetupAmount,2),CHAR) AS employershiftsetupAmountRound2,
                    CONVERT(ROUND(employershiftsetupAmount,4),CHAR) AS employershiftsetupAmountRound4,
                    createdBy,createdDate from tblemployershiftsetup where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployershiftsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployershiftsetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployershiftsetup where 1 = 1 and employershiftsetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployershiftsetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployershiftsetup (employerId, employershiftsetupCode, employershiftsetupDescription, employershiftsetupAmount, employershiftsetupEPF, employershiftsetupSocso, employershiftsetupPCB, employershiftsetupEIS, employershiftsetupOT, employershiftsetupNPL, employershiftsetupCP8A, employershiftsetupCP22A, employershiftsetupHRDF, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employershiftsetupCode + "', '" + pera.employershiftsetupDescription + "', '" + pera.employershiftsetupAmount + "', " + pera.employershiftsetupEPF + ", " + pera.employershiftsetupSocso + ", " + pera.employershiftsetupPCB + ", " + pera.employershiftsetupEIS + ", " + pera.employershiftsetupOT + ", " + pera.employershiftsetupNPL + ", " + pera.employershiftsetupCP8A + ", " + pera.employershiftsetupCP22A + ", " + pera.employershiftsetupHRDF + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployershiftsetup (employerId, employershiftsetupCode, employershiftsetupDescription, employershiftsetupAmount, employershiftsetupEPF, employershiftsetupSocso, employershiftsetupPCB, employershiftsetupEIS, employershiftsetupOT, employershiftsetupNPL, employershiftsetupCP8A, employershiftsetupCP22A, employershiftsetupHRDF, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployershiftsetup set employerId = '" + pera.employerId + "', employershiftsetupCode = '" + pera.employershiftsetupCode + "', employershiftsetupDescription = '" + pera.employershiftsetupDescription + "', employershiftsetupAmount = '" + pera.employershiftsetupAmount + "', employershiftsetupEPF = " + pera.employershiftsetupEPF + ", employershiftsetupSocso = " + pera.employershiftsetupSocso + ", employershiftsetupPCB = " + pera.employershiftsetupPCB + ", employershiftsetupEIS = " + pera.employershiftsetupEIS + ", employershiftsetupOT = " + pera.employershiftsetupOT + ", employershiftsetupNPL = " + pera.employershiftsetupNPL + ", employershiftsetupCP8A = " + pera.employershiftsetupCP8A + ", employershiftsetupCP22A = " + pera.employershiftsetupCP22A + ", employershiftsetupHRDF = " + pera.employershiftsetupHRDF + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employershiftsetupId = '" + pera.employershiftsetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployershiftsetup set " + column + " where employershiftsetupId = " + id + " ";
    return strquery;
};

exports.data = method;