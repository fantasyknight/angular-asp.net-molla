var method = {};

method.masterData = (request) => {
    let employeesalarysetupId = request.body.employeesalarysetupId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employeesalarysetupCurrentBasic = request.body.employeesalarysetupCurrentBasic || 0.0;
    let employeesalarysetupOldBasic = request.body.employeesalarysetupOldBasic || 0.0;
    let employeesalarysetupPaymentRate = request.body.employeesalarysetupPaymentRate || '';
    let employeesalarysetupConfirmationDate = request.body.employeesalarysetupConfirmationDate || null;
    let employeesalarysetupIncrementDate = request.body.employeesalarysetupIncrementDate || null;
    let employeesalarysetupEPFGroup = request.body.employeesalarysetupEPFGroup || 0;
    let employeesalarysetupSocsoGroup = request.body.employeesalarysetupSocsoGroup || 0;
    let employeesalarysetupSocsoCategory = request.body.employeesalarysetupSocsoCategory || 0;
    let employeesalarysetupEISGroup = request.body.employeesalarysetupEISGroup || 0;
    let employeesalarysetupEISCategory = request.body.employeesalarysetupEISCategory || 0;
    let employeesalarysetupPCBGroup = request.body.employeesalarysetupPCBGroup || 0;
    let employeesalarysetupHRDFGroup = request.body.employeesalarysetupHRDFGroup || 0;
    let employeesalarysetupPaymentType = request.body.employeesalarysetupPaymentType || '';
    let employeesalarysetupRemarks = request.body.employeesalarysetupRemarks || '';
    let employeesalarysetupResign = request.body.employeesalarysetupResign || null;
    let employeesalarysetupResidentialStatus = request.body.employeesalarysetupResidentialStatus || false;
    let employeesalarysetupCategory = request.body.employeesalarysetupCategory || '';
    let employeesalarysetupChildren = request.body.employeesalarysetupChildren || 0;
    let employeesalarysetupRemunerationType = request.body.employeesalarysetupRemunerationType || '';
    let employeesalarysetupTaxBorneEmployer = request.body.employeesalarysetupTaxBorneEmployer || false;
    let employeesalarysetupCalculateMTDAR = request.body.employeesalarysetupCalculateMTDAR || false;
    let employeesalarysetupAccumulatedPTAE = request.body.employeesalarysetupAccumulatedPTAE || 0;
    let employeesalarysetupAccumulatedPTABIK = request.body.employeesalarysetupAccumulatedPTABIK || 0;
    let employeesalarysetupAccumulatedEPF = request.body.employeesalarysetupAccumulatedEPF || 0;
    let employeesalarysetupAccumulatedSocso = request.body.employeesalarysetupAccumulatedSocso || 0;
    let employeesalarysetupAccumulatedMTD = request.body.employeesalarysetupAccumulatedMTD || 0;
    let employeesalarysetupAccumulatedZakat = request.body.employeesalarysetupAccumulatedZakat || 0;
    let employeesalarysetupDisabledIndividual = request.body.employeesalarysetupDisabledIndividual || 0;
    let employeesalarysetupDisabledSpouse = request.body.employeesalarysetupDisabledSpouse || 0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeesalarysetupId,
        employerId,
        employeeId,
        employeesalarysetupCurrentBasic,
        employeesalarysetupOldBasic,
        employeesalarysetupPaymentRate,
        employeesalarysetupConfirmationDate,
        employeesalarysetupIncrementDate,
        employeesalarysetupEPFGroup,
        employeesalarysetupSocsoGroup,
        employeesalarysetupSocsoCategory,
        employeesalarysetupEISGroup,
        employeesalarysetupEISCategory,
        employeesalarysetupPCBGroup,
        employeesalarysetupHRDFGroup,
        employeesalarysetupPaymentType,
        employeesalarysetupRemarks,
        employeesalarysetupResign,
        employeesalarysetupResidentialStatus,
        employeesalarysetupCategory,
        employeesalarysetupChildren,
        employeesalarysetupRemunerationType,
        employeesalarysetupTaxBorneEmployer,
        employeesalarysetupCalculateMTDAR,
        employeesalarysetupAccumulatedPTAE,
        employeesalarysetupAccumulatedPTABIK,
        employeesalarysetupAccumulatedEPF,
        employeesalarysetupAccumulatedSocso,
        employeesalarysetupAccumulatedMTD,
        employeesalarysetupAccumulatedZakat,
        employeesalarysetupDisabledIndividual,
        employeesalarysetupDisabledSpouse,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployeesalarysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employeesalarysetupId,employerId,employeeId,employeesalarysetupCurrentBasic,employeesalarysetupOldBasic,employeesalarysetupPaymentRate,employeesalarysetupConfirmationDate,employeesalarysetupIncrementDate,employeesalarysetupEPFGroup,employeesalarysetupSocsoGroup,employeesalarysetupSocsoCategory,employeesalarysetupEISGroup,employeesalarysetupEISCategory,employeesalarysetupPCBGroup,employeesalarysetupHRDFGroup,employeesalarysetupPaymentType,employeesalarysetupRemarks,employeesalarysetupResign,employeesalarysetupResidentialStatus, employeesalarysetupCategory, employeesalarysetupChildren, employeesalarysetupRemunerationType, employeesalarysetupTaxBorneEmployer, employeesalarysetupCalculateMTDAR, employeesalarysetupAccumulatedPTAE, employeesalarysetupAccumulatedPTABIK, employeesalarysetupAccumulatedEPF, employeesalarysetupAccumulatedSocso, employeesalarysetupAccumulatedMTD, employeesalarysetupAccumulatedZakat, employeesalarysetupDisabledIndividual, employeesalarysetupDisabledSpouse, createdBy,createdDate from tblemployeesalarysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeesalarysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeesalarysetup where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeesalarysetup where 1 = 1 and employeesalarysetupId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeesalarysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employeesalarysetupConfirmationDate == null) pera.employeesalarysetupConfirmationDate = null;
    else pera.employeesalarysetupConfirmationDate = "'" + pera.employeesalarysetupConfirmationDate + "'";

    if (pera.employeesalarysetupIncrementDate == null) pera.employeesalarysetupIncrementDate = null;
    else pera.employeesalarysetupIncrementDate = "'" + pera.employeesalarysetupIncrementDate + "'";

    if (pera.employeesalarysetupResign == null) pera.employeesalarysetupResign = null;
    else pera.employeesalarysetupResign = "'" + pera.employeesalarysetupResign + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeesalarysetup (employerId, employeeId, employeesalarysetupCurrentBasic, employeesalarysetupOldBasic, employeesalarysetupPaymentRate, employeesalarysetupConfirmationDate, employeesalarysetupIncrementDate, employeesalarysetupEPFGroup, employeesalarysetupSocsoGroup, employeesalarysetupSocsoCategory, employeesalarysetupEISGroup, employeesalarysetupEISCategory, employeesalarysetupPCBGroup, employeesalarysetupHRDFGroup, employeesalarysetupPaymentType, employeesalarysetupRemarks, employeesalarysetupResign,employeesalarysetupResidentialStatus, employeesalarysetupCategory, employeesalarysetupChildren, employeesalarysetupRemunerationType, employeesalarysetupTaxBorneEmployer, employeesalarysetupCalculateMTDAR, employeesalarysetupAccumulatedPTAE, employeesalarysetupAccumulatedPTABIK, employeesalarysetupAccumulatedEPF, employeesalarysetupAccumulatedSocso, employeesalarysetupAccumulatedMTD, employeesalarysetupAccumulatedZakat, employeesalarysetupDisabledIndividual, employeesalarysetupDisabledSpouse, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employeesalarysetupCurrentBasic + "', '" + pera.employeesalarysetupOldBasic + "', '" + pera.employeesalarysetupPaymentRate + "', " + pera.employeesalarysetupConfirmationDate + ", " + pera.employeesalarysetupIncrementDate + ", '" + pera.employeesalarysetupEPFGroup + "', '" + pera.employeesalarysetupSocsoGroup + "', '" + pera.employeesalarysetupSocsoCategory + "', '" + pera.employeesalarysetupEISGroup + "', '" + pera.employeesalarysetupEISCategory + "', '" + pera.employeesalarysetupPCBGroup + "', '" + pera.employeesalarysetupHRDFGroup + "', '" + pera.employeesalarysetupPaymentType + "', '" + pera.employeesalarysetupRemarks + "', " + pera.employeesalarysetupResign + ", " + pera.employeesalarysetupResidentialStatus + ", '" + pera.employeesalarysetupResidentialStatus + "', " + pera.employeesalarysetupChildren + ", '" + pera.employeesalarysetupRemunerationType + "', " + pera.employeesalarysetupTaxBorneEmployer + ", " + pera.employeesalarysetupCalculateMTDAR + ", '" + pera.employeesalarysetupAccumulatedPTAE + "', '" + pera.employeesalarysetupAccumulatedPTABIK + "', '" + pera.employeesalarysetupAccumulatedEPF + "', '" + pera.employeesalarysetupAccumulatedSocso + "', '" + pera.employeesalarysetupAccumulatedMTD + "', '" + pera.employeesalarysetupAccumulatedZakat + "', " + pera.employeesalarysetupDisabledIndividual + ", " + pera.employeesalarysetupDisabledSpouse + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeesalarysetup (employerId, employeeId, employeesalarysetupCurrentBasic, employeesalarysetupOldBasic, employeesalarysetupPaymentRate, employeesalarysetupConfirmationDate, employeesalarysetupIncrementDate, employeesalarysetupEPFGroup, employeesalarysetupSocsoGroup, employeesalarysetupSocsoCategory, employeesalarysetupEISGroup, employeesalarysetupEISCategory, employeesalarysetupPCBGroup, employeesalarysetupHRDFGroup, employeesalarysetupPaymentType, employeesalarysetupRemarks, employeesalarysetupResign, employeesalarysetupResidentialStatus, employeesalarysetupCategory, employeesalarysetupChildren, employeesalarysetupRemunerationType, employeesalarysetupTaxBorneEmployer, employeesalarysetupCalculateMTDAR, employeesalarysetupAccumulatedPTAE, employeesalarysetupAccumulatedPTABIK, employeesalarysetupAccumulatedEPF, employeesalarysetupAccumulatedSocso, employeesalarysetupAccumulatedMTD, employeesalarysetupAccumulatedZakat, employeesalarysetupDisabledIndividual, employeesalarysetupDisabledSpouse, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employeesalarysetupConfirmationDate == null) pera.employeesalarysetupConfirmationDate = null;
    else pera.employeesalarysetupConfirmationDate = "'" + pera.employeesalarysetupConfirmationDate + "'";

    if (pera.employeesalarysetupIncrementDate == null) pera.employeesalarysetupIncrementDate = null;
    else pera.employeesalarysetupIncrementDate = "'" + pera.employeesalarysetupIncrementDate + "'";

    if (pera.employeesalarysetupResign == null) pera.employeesalarysetupResign = null;
    else pera.employeesalarysetupResign = "'" + pera.employeesalarysetupResign + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeesalarysetup set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employeesalarysetupCurrentBasic = '" + pera.employeesalarysetupCurrentBasic + "', employeesalarysetupOldBasic = '" + pera.employeesalarysetupOldBasic + "', employeesalarysetupPaymentRate = '" + pera.employeesalarysetupPaymentRate + "', employeesalarysetupConfirmationDate = " + pera.employeesalarysetupConfirmationDate + ", employeesalarysetupIncrementDate = " + pera.employeesalarysetupIncrementDate + ", employeesalarysetupEPFGroup = '" + pera.employeesalarysetupEPFGroup + "', employeesalarysetupSocsoGroup = '" + pera.employeesalarysetupSocsoGroup + "', employeesalarysetupSocsoCategory = '" + pera.employeesalarysetupSocsoCategory + "', employeesalarysetupEISGroup = '" + pera.employeesalarysetupEISGroup + "', employeesalarysetupEISCategory = '" + pera.employeesalarysetupEISCategory + "', employeesalarysetupPCBGroup = '" + pera.employeesalarysetupPCBGroup + "', employeesalarysetupHRDFGroup = '" + pera.employeesalarysetupHRDFGroup + "', employeesalarysetupPaymentType = '" + pera.employeesalarysetupPaymentType + "', employeesalarysetupRemarks = '" + pera.employeesalarysetupRemarks + "', employeesalarysetupResign = " + pera.employeesalarysetupResign + ", employeesalarysetupResidentialStatus = " + pera.employeesalarysetupResidentialStatus + ", employeesalarysetupCategory = '" + pera.employeesalarysetupCategory + "', employeesalarysetupChildren = " + pera.employeesalarysetupChildren + ", employeesalarysetupRemunerationType = '" + pera.employeesalarysetupRemunerationType + "', employeesalarysetupTaxBorneEmployer = " + pera.employeesalarysetupTaxBorneEmployer + ", employeesalarysetupCalculateMTDAR = " + pera.employeesalarysetupCalculateMTDAR + ", employeesalarysetupAccumulatedPTAE = '" + pera.employeesalarysetupAccumulatedPTAE + "', employeesalarysetupAccumulatedPTABIK = '" + pera.employeesalarysetupAccumulatedPTABIK + "', employeesalarysetupAccumulatedEPF = '" + pera.employeesalarysetupAccumulatedEPF + "', employeesalarysetupAccumulatedSocso = '" + pera.employeesalarysetupAccumulatedSocso + "', employeesalarysetupAccumulatedMTD = '" + pera.employeesalarysetupAccumulatedMTD + "', employeesalarysetupAccumulatedZakat = '" + pera.employeesalarysetupAccumulatedZakat + "', employeesalarysetupDisabledIndividual = " + pera.employeesalarysetupDisabledIndividual + ", employeesalarysetupDisabledSpouse = " + pera.employeesalarysetupDisabledSpouse + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeesalarysetupId = '" + pera.employeesalarysetupId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeesalarysetup set " + column + " where employeesalarysetupId = " + id + " ";
    return strquery;
};

method.select_view_employeesalarysetup = function (strwhere) {
    var strquery = "select * from view_employeesalarysetup where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employeesalarysetup = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employeesalarysetup where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;