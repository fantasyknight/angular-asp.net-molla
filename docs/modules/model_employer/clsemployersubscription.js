var method = {};

method.masterData = (request) => {
    let employersubscriptionId = request.body.employersubscriptionId || 0;
    let mastersubscriptiontypeId = request.body.mastersubscriptiontypeId || 0;
    let employerId = request.body.employerId || 0;
    let employersubscriptionPurchaseDate = request.body.employersubscriptionPurchaseDate || null;
    let employersubscriptionActivationDate = request.body.employersubscriptionActivationDate || null;
    let employersubscriptionValidUpto = request.body.employersubscriptionValidUpto || null;
    let employersubscriptionAmount = request.body.employersubscriptionAmount || 0.0;
    let employersubscriptionPaymodeMode = request.body.employersubscriptionPaymodeMode || '';
    let employersubscriptionRefNo = request.body.employersubscriptionRefNo || '';
    let employersubscriptionNoOfEmployee = request.body.employersubscriptionNoOfEmployee || 0;
    let employersubscriptionPaymentDate = request.body.employersubscriptionPaymentDate || null;
    let employersubscriptionIsVerified = request.body.employersubscriptionIsVerified || false;
    let employersubscriptionIsActive = request.body.employersubscriptionIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employersubscriptionId,
        mastersubscriptiontypeId,
        employerId,
        employersubscriptionPurchaseDate,
        employersubscriptionActivationDate,
        employersubscriptionValidUpto,
        employersubscriptionAmount,
        employersubscriptionPaymodeMode,
        employersubscriptionRefNo,
        employersubscriptionNoOfEmployee,
        employersubscriptionPaymentDate,
        employersubscriptionIsVerified,
        employersubscriptionIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select * from view_employersubscription where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employersubscriptionId,mastersubscriptiontypeId,employerId,employersubscriptionPurchaseDate,employersubscriptionActivationDate,
                    employersubscriptionValidUpto,employersubscriptionAmount,employersubscriptionPaymodeMode,employersubscriptionRefNo,
                    employersubscriptionNoOfEmployee,employersubscriptionPaymentDate,employersubscriptionIsVerified,employersubscriptionIsActive,
                    DATE_FORMAT(employersubscriptionPurchaseDate,'%d-%m-%Y') AS employersubscriptionPurchaseDateDDMMYYYY,
                    DATE_FORMAT(employersubscriptionActivationDate,'%d-%m-%Y') AS employersubscriptionActivationDateDDMMYYYY,
                    DATE_FORMAT(employersubscriptionValidUpto,'%d-%m-%Y') AS employersubscriptionValidUptoDDMMYYYY,
                    DATE_FORMAT(employersubscriptionPaymentDate,'%d-%m-%Y') AS employersubscriptionPaymentDateDDMMYYYY,
                    DATE_FORMAT(employersubscriptionPurchaseDate,'%Y-%m-%d') AS employersubscriptionPurchaseDateYYYYMMDD,
                    DATE_FORMAT(employersubscriptionActivationDate,'%Y-%m-%d') AS employersubscriptionActivationDateYYYYMMDD,
                    DATE_FORMAT(employersubscriptionValidUpto,'%Y-%m-%d') AS employersubscriptionValidUptoYYYYMMDD,
                    DATE_FORMAT(employersubscriptionPaymentDate,'%Y-%m-%d') AS employersubscriptionPaymentDateYYYYMMDD,
                    createdBy,createdDate from tblemployersubscription where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployersubscription where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployersubscription where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployersubscription where 1 = 1 and employersubscriptionId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployersubscription where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employersubscriptionPurchaseDate == null) pera.employersubscriptionPurchaseDate = null;
    else pera.employersubscriptionPurchaseDate = "'" + pera.employersubscriptionPurchaseDate + "'";

    if (pera.employersubscriptionActivationDate == null) pera.employersubscriptionActivationDate = null;
    else pera.employersubscriptionActivationDate = "'" + pera.employersubscriptionActivationDate + "'";

    if (pera.employersubscriptionValidUpto == null) pera.employersubscriptionValidUpto = null;
    else pera.employersubscriptionValidUpto = "'" + pera.employersubscriptionValidUpto + "'";

    if (pera.employersubscriptionPaymentDate == null) pera.employersubscriptionPaymentDate = null;
    else pera.employersubscriptionPaymentDate = "'" + pera.employersubscriptionPaymentDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployersubscription (mastersubscriptiontypeId, employerId, employersubscriptionPurchaseDate, employersubscriptionActivationDate, employersubscriptionValidUpto, employersubscriptionAmount, employersubscriptionPaymodeMode, employersubscriptionRefNo, employersubscriptionNoOfEmployee, employersubscriptionPaymentDate, employersubscriptionIsVerified, employersubscriptionIsActive, createdBy, createdDate) values ('" + pera.mastersubscriptiontypeId + "', '" + pera.employerId + "', " + pera.employersubscriptionPurchaseDate + ", " + pera.employersubscriptionActivationDate + ", " + pera.employersubscriptionValidUpto + ", '" + pera.employersubscriptionAmount + "', '" + pera.employersubscriptionPaymodeMode + "', '" + pera.employersubscriptionRefNo + "', '" + pera.employersubscriptionNoOfEmployee + "', " + pera.employersubscriptionPaymentDate + ", " + pera.employersubscriptionIsVerified + ", " + pera.employersubscriptionIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployersubscription (mastersubscriptiontypeId, employerId, employersubscriptionPurchaseDate, employersubscriptionActivationDate, employersubscriptionValidUpto, employersubscriptionAmount, employersubscriptionPaymodeMode, employersubscriptionRefNo, employersubscriptionNoOfEmployee, employersubscriptionPaymentDate, employersubscriptionIsVerified, employersubscriptionIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employersubscriptionPurchaseDate == null) pera.employersubscriptionPurchaseDate = null;
    else pera.employersubscriptionPurchaseDate = "'" + pera.employersubscriptionPurchaseDate + "'";

    if (pera.employersubscriptionActivationDate == null) pera.employersubscriptionActivationDate = null;
    else pera.employersubscriptionActivationDate = "'" + pera.employersubscriptionActivationDate + "'";

    if (pera.employersubscriptionValidUpto == null) pera.employersubscriptionValidUpto = null;
    else pera.employersubscriptionValidUpto = "'" + pera.employersubscriptionValidUpto + "'";

    if (pera.employersubscriptionPaymentDate == null) pera.employersubscriptionPaymentDate = null;
    else pera.employersubscriptionPaymentDate = "'" + pera.employersubscriptionPaymentDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployersubscription set mastersubscriptiontypeId = '" + pera.mastersubscriptiontypeId + "', employerId = '" + pera.employerId + "', employersubscriptionPurchaseDate = " + pera.employersubscriptionPurchaseDate + ", employersubscriptionActivationDate = " + pera.employersubscriptionActivationDate + ", employersubscriptionValidUpto = " + pera.employersubscriptionValidUpto + ", employersubscriptionAmount = '" + pera.employersubscriptionAmount + "', employersubscriptionPaymodeMode = '" + pera.employersubscriptionPaymodeMode + "', employersubscriptionRefNo = '" + pera.employersubscriptionRefNo + "', employersubscriptionNoOfEmployee = '" + pera.employersubscriptionNoOfEmployee + "', employersubscriptionPaymentDate = " + pera.employersubscriptionPaymentDate + ", employersubscriptionIsVerified = " + pera.employersubscriptionIsVerified + ", employersubscriptionIsActive = " + pera.employersubscriptionIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employersubscriptionId = '" + pera.employersubscriptionId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployersubscription set " + column + " where employersubscriptionId = " + id + " ";
    return strquery;
};

exports.data = method;