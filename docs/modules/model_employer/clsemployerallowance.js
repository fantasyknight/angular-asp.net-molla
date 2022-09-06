var method = {};

method.masterData = (request) => {
    let employerallowanceId = request.body.employerallowanceId || 0;
    let employerId = request.body.employerId || 0;
    let employerallowanceType = request.body.employerallowanceType || '';
    let employerallowanceCode = request.body.employerallowanceCode || '';
    let employerallowanceDescription = request.body.employerallowanceDescription || '';
    let employerallowanceProrate = request.body.employerallowanceProrate || false;
    let employerallowanceEpf = request.body.employerallowanceEpf || false;
    let employerallowanceSocso = request.body.employerallowanceSocso || false;
    let employerallowancePCB = request.body.employerallowancePCB || false;
    let employerallowanceEIS = request.body.employerallowanceEIS || false;
    let employerallowanceOT = request.body.employerallowanceOT || false;
    let employerallowanceNPL = request.body.employerallowanceNPL || false;
    let employerallowanceCP8A = request.body.employerallowanceCP8A || false;
    let employerallowanceCP22A = request.body.employerallowanceCP22A || false;
    let employerallowanceCP38Tax = request.body.employerallowanceCP38Tax || false;
    let employerallowanceShift = request.body.employerallowanceShift || false;
    let employerallowanceAddPay = request.body.employerallowanceAddPay || false;
    let employerallowancePTPTN = request.body.employerallowancePTPTN || false;
    let employerallowanceZakat = request.body.employerallowanceZakat || false;
    let employerallowanceTabungHaji = request.body.employerallowanceTabungHaji || false;
    let employerallowanceHRDF = request.body.employerallowanceHRDF || false;
    let employerallowanceBenefitInKind = request.body.employerallowanceBenefitInKind || false;
    let employerallowanceAdditionalRemuneration = request.body.employerallowanceAdditionalRemuneration || false;
    let employerallowanceEAPosition = request.body.employerallowanceEAPosition || false;
    let employerallowanceCP22APosition = request.body.employerallowanceCP22APosition || false;
    let employerallowanceIsActive = request.body.employerallowanceIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerallowanceId,
        employerId,
        employerallowanceType,
        employerallowanceCode,
        employerallowanceDescription,
        employerallowanceProrate,
        employerallowanceEpf,
        employerallowanceSocso,
        employerallowancePCB,
        employerallowanceEIS,
        employerallowanceOT,
        employerallowanceNPL,
        employerallowanceCP8A,
        employerallowanceCP22A,
        employerallowanceCP38Tax,
        employerallowanceShift,
        employerallowanceAddPay,
        employerallowancePTPTN,
        employerallowanceZakat,
        employerallowanceTabungHaji,
        employerallowanceHRDF,
        employerallowanceBenefitInKind,
        employerallowanceAdditionalRemuneration,
        employerallowanceEAPosition,
        employerallowanceCP22APosition,
        employerallowanceIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployerallowance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerallowanceId,employerId,employerallowanceType,employerallowanceCode,employerallowanceDescription,employerallowanceProrate,employerallowanceEpf,employerallowanceSocso,employerallowancePCB,employerallowanceEIS,employerallowanceOT,employerallowanceNPL,employerallowanceCP8A,employerallowanceCP22A,employerallowanceCP38Tax,employerallowanceShift,employerallowanceAddPay,employerallowancePTPTN,employerallowanceZakat,employerallowanceTabungHaji,employerallowanceHRDF,employerallowanceBenefitInKind,employerallowanceAdditionalRemuneration,employerallowanceEAPosition,employerallowanceCP22APosition,employerallowanceIsActive,createdBy,createdDate from tblemployerallowance where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerallowance where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerallowance where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerallowance where 1 = 1 and employerallowanceId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerallowance where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerallowance (employerId, employerallowanceType, employerallowanceCode, employerallowanceDescription, employerallowanceProrate, employerallowanceEpf, employerallowanceSocso, employerallowancePCB, employerallowanceEIS, employerallowanceOT, employerallowanceNPL, employerallowanceCP8A, employerallowanceCP22A, employerallowanceCP38Tax, employerallowanceShift, employerallowanceAddPay, employerallowancePTPTN, employerallowanceZakat, employerallowanceTabungHaji, employerallowanceHRDF, employerallowanceBenefitInKind, employerallowanceAdditionalRemuneration, employerallowanceEAPosition,employerallowanceCP22APosition, employerallowanceIsActive, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerallowanceType + "', '" + pera.employerallowanceCode + "', '" + pera.employerallowanceDescription + "', " + pera.employerallowanceProrate + ", " + pera.employerallowanceEpf + ", " + pera.employerallowanceSocso + ", " + pera.employerallowancePCB + ", " + pera.employerallowanceEIS + ", " + pera.employerallowanceOT + ", " + pera.employerallowanceNPL + ", " + pera.employerallowanceCP8A + ", " + pera.employerallowanceCP22A + ", " + pera.employerallowanceCP38Tax + ", " + pera.employerallowanceShift + ", " + pera.employerallowanceAddPay + ", " + pera.employerallowancePTPTN + ", " + pera.employerallowanceZakat + ", " + pera.employerallowanceTabungHaji + ", " + pera.employerallowanceHRDF + ", " + pera.employerallowanceBenefitInKind + ", " + pera.employerallowanceAdditionalRemuneration + ", " + pera.employerallowanceEAPosition + ", " + pera.employerallowanceCP22APosition + ", " + pera.employerallowanceIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerallowance (employerId, employerallowanceType, employerallowanceCode, employerallowanceDescription, employerallowanceProrate, employerallowanceEpf, employerallowanceSocso, employerallowancePCB, employerallowanceEIS, employerallowanceOT, employerallowanceNPL, employerallowanceCP8A, employerallowanceCP22A, employerallowanceCP38Tax, employerallowanceShift, employerallowanceAddPay, employerallowancePTPTN, employerallowanceZakat, employerallowanceTabungHaji, employerallowanceHRDF, employerallowanceBenefitInKind, employerallowanceAdditionalRemuneration, employerallowanceEAPosition, employerallowanceCP22APosition, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerallowance set employerId = '" + pera.employerId + "', employerallowanceType = '" + pera.employerallowanceType + "', employerallowanceCode = '" + pera.employerallowanceCode + "', employerallowanceDescription = '" + pera.employerallowanceDescription + "', employerallowanceProrate = " + pera.employerallowanceProrate + ", employerallowanceEpf = " + pera.employerallowanceEpf + ", employerallowanceSocso = " + pera.employerallowanceSocso + ", employerallowancePCB = " + pera.employerallowancePCB + ", employerallowanceEIS = " + pera.employerallowanceEIS + ", employerallowanceOT = " + pera.employerallowanceOT + ", employerallowanceNPL = " + pera.employerallowanceNPL + ", employerallowanceCP8A = " + pera.employerallowanceCP8A + ", employerallowanceCP22A = " + pera.employerallowanceCP22A + ", employerallowanceCP38Tax = " + pera.employerallowanceCP38Tax + ", employerallowanceShift = " + pera.employerallowanceShift + ", employerallowanceAddPay = " + pera.employerallowanceAddPay + ", employerallowancePTPTN = " + pera.employerallowancePTPTN + ", employerallowanceZakat = " + pera.employerallowanceZakat + ", employerallowanceTabungHaji = " + pera.employerallowanceTabungHaji + ", employerallowanceHRDF = " + pera.employerallowanceHRDF + ", employerallowanceBenefitInKind = " + pera.employerallowanceBenefitInKind + ", employerallowanceAdditionalRemuneration = " + pera.employerallowanceAdditionalRemuneration +
        ", employerallowanceEAPosition = " + pera.employerallowanceEAPosition + ", employerallowanceCP22APosition = " + pera.employerallowanceCP22APosition + ", employerallowanceIsActive = " + pera.employerallowanceIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerallowanceId = '" + pera.employerallowanceId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerallowance set " + column + " where employerallowanceId = " + id + " ";
    return strquery;
};

exports.data = method;