var method = {};

method.masterData = (request) => {
    let employeeloanId = request.body.employeeloanId || 0;
    let employerId = request.body.employerId || 0;
    let employeeId = request.body.employeeId || 0;
    let employeeloanNote = request.body.employeeloanNote || '';
    let employeeloanTakenDate = request.body.employeeloanTakenDate || null;
    let employeeloanAmount = request.body.employeeloanAmount || 0.0;
    let employeeloanFromDate = request.body.employeeloanFromDate || null;
    let employeeloanToDate = request.body.employeeloanToDate || null;
    let employeeloanDeductionAmount = request.body.employeeloanDeductionAmount || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employeeloanId,
        employerId,
        employeeId,
        employeeloanNote,
        employeeloanTakenDate,
        employeeloanAmount,
        employeeloanFromDate,
        employeeloanToDate,
        employeeloanDeductionAmount,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *, 
                    CONVERT(ROUND(employeeloanAmount, 2),CHAR) AS employeeloanAmountRound2,
                    CONVERT(ROUND(employeeloanAmount, 4),CHAR) AS employeeloanAmountRound4,
                    CONVERT(ROUND(employeeloanDeductionAmount, 2),CHAR) AS employeeloanDeductionAmountRound2,
                    CONVERT(ROUND(employeeloanDeductionAmount, 4),CHAR) AS employeeloanDeductionAmountRound4,
                    DATE_FORMAT(employeeloanToDate, '%d-%m-%Y') AS employeeloanToDateDDMMYYYY,
                    DATE_FORMAT(employeeloanToDate, '%Y-%m-%d') AS employeeloanToDateYYYYMMDD,
                    DATE_FORMAT(employeeloanFromDate,'%d-%m-%Y') AS employeeloanFromDateDDMMYYYY,
                    DATE_FORMAT(employeeloanFromDate,'%Y-%m-%d') AS employeeloanFromDateYYYYMMDD,
                    DATE_FORMAT(employeeloanTakenDate,'%d-%m-%Y') AS employeeloanTakenDateDDMMYYYY,
                    DATE_FORMAT(employeeloanTakenDate,'%Y-%m-%d') AS employeeloanTakenDateYYYYMMDD 
                    from tblemployeeloan where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employeeloanId,employerId,employeeId,employeeloanNote,employeeloanTakenDate,employeeloanAmount,
                    employeeloanFromDate,employeeloanToDate,employeeloanDeductionAmount,
                    CONVERT(ROUND(employeeloanAmount, 2),CHAR) AS employeeloanAmountRound2,
                    CONVERT(ROUND(employeeloanAmount, 4),CHAR) AS employeeloanAmountRound4,
                    CONVERT(ROUND(employeeloanDeductionAmount, 2),CHAR) AS employeeloanDeductionAmountRound2,
                    CONVERT(ROUND(employeeloanDeductionAmount, 4),CHAR) AS employeeloanDeductionAmountRound4,
                    DATE_FORMAT(employeeloanToDate, '%d-%m-%Y') AS employeeloanToDateDDMMYYYY,
                    DATE_FORMAT(employeeloanToDate, '%Y-%m-%d') AS employeeloanToDateYYYYMMDD,
                    DATE_FORMAT(employeeloanFromDate,'%d-%m-%Y') AS employeeloanFromDateDDMMYYYY,
                    DATE_FORMAT(employeeloanFromDate,'%Y-%m-%d') AS employeeloanFromDateYYYYMMDD,
                    DATE_FORMAT(employeeloanTakenDate,'%d-%m-%Y') AS employeeloanTakenDateDDMMYYYY,
                    DATE_FORMAT(employeeloanTakenDate,'%Y-%m-%d') AS employeeloanTakenDateYYYYMMDD,
                    createdBy,createdDate from tblemployeeloan where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployeeloan where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployeeloan where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployeeloan where 1 = 1 and employeeloanId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployeeloan where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.employeeloanTakenDate == null) pera.employeeloanTakenDate = null;
    else pera.employeeloanTakenDate = "'" + pera.employeeloanTakenDate + "'";

    if (pera.employeeloanFromDate == null) pera.employeeloanFromDate = null;
    else pera.employeeloanFromDate = "'" + pera.employeeloanFromDate + "'";

    if (pera.employeeloanToDate == null) pera.employeeloanToDate = null;
    else pera.employeeloanToDate = "'" + pera.employeeloanToDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployeeloan (employerId, employeeId, employeeloanNote, employeeloanTakenDate, employeeloanAmount, employeeloanFromDate, employeeloanToDate, employeeloanDeductionAmount, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employeeId + "', '" + pera.employeeloanNote + "', " + pera.employeeloanTakenDate + ", '" + pera.employeeloanAmount + "', " + pera.employeeloanFromDate + ", " + pera.employeeloanToDate + ", '" + pera.employeeloanDeductionAmount + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployeeloan (employerId, employeeId, employeeloanNote, employeeloanTakenDate, employeeloanAmount, employeeloanFromDate, employeeloanToDate, employeeloanDeductionAmount, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.employeeloanTakenDate == null) pera.employeeloanTakenDate = null;
    else pera.employeeloanTakenDate = "'" + pera.employeeloanTakenDate + "'";

    if (pera.employeeloanFromDate == null) pera.employeeloanFromDate = null;
    else pera.employeeloanFromDate = "'" + pera.employeeloanFromDate + "'";

    if (pera.employeeloanToDate == null) pera.employeeloanToDate = null;
    else pera.employeeloanToDate = "'" + pera.employeeloanToDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployeeloan set employerId = '" + pera.employerId + "', employeeId = '" + pera.employeeId + "', employeeloanNote = '" + pera.employeeloanNote + "', employeeloanTakenDate = " + pera.employeeloanTakenDate + ", employeeloanAmount = '" + pera.employeeloanAmount + "', employeeloanFromDate = " + pera.employeeloanFromDate + ", employeeloanToDate = " + pera.employeeloanToDate + ", employeeloanDeductionAmount = '" + pera.employeeloanDeductionAmount + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employeeloanId = '" + pera.employeeloanId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployeeloan set " + column + " where employeeloanId = " + id + " ";
    return strquery;
};

exports.data = method;