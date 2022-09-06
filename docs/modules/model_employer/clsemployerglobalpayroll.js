var method = {};

method.masterData = (request) => {
    let employerglobalpayrollId = request.body.employerglobalpayrollId || 0;
    let employerId = request.body.employerId || 0;
    let employerglobalpayrollEPFNumber = request.body.employerglobalpayrollEPFNumber || '';
    let employerglobalpayrollSocsoNumber = request.body.employerglobalpayrollSocsoNumber || '';
    let employerglobalpayrollPCBNumber = request.body.employerglobalpayrollPCBNumber || '';
    let employerglobalpayrollEISNumber = request.body.employerglobalpayrollEISNumber || '';
    let employerglobalpayrollIncomeTaxNumber = request.body.employerglobalpayrollIncomeTaxNumber || '';
    let employerglobalpayrollOther1 = request.body.employerglobalpayrollOther1 || '';
    let employerglobalpayrollOther2 = request.body.employerglobalpayrollOther2 || '';
    let employerglobalpayrollPayslipTemplateType = request.body.employerglobalpayrollPayslipTemplateType || 0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerglobalpayrollId,
        employerId,
        employerglobalpayrollEPFNumber,
        employerglobalpayrollSocsoNumber,
        employerglobalpayrollPCBNumber,
        employerglobalpayrollEISNumber,
        employerglobalpayrollIncomeTaxNumber,
        employerglobalpayrollOther1,
        employerglobalpayrollOther2,
        employerglobalpayrollPayslipTemplateType,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployerglobalpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerglobalpayrollId,employerId,employerglobalpayrollEPFNumber,employerglobalpayrollSocsoNumber,employerglobalpayrollPCBNumber,employerglobalpayrollEISNumber,employerglobalpayrollIncomeTaxNumber,employerglobalpayrollOther1,employerglobalpayrollOther2,employerglobalpayrollPayslipTemplateType,createdBy,createdDate from tblemployerglobalpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerglobalpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerglobalpayroll where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerglobalpayroll where 1 = 1 and employerglobalpayrollId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerglobalpayroll where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerglobalpayroll (employerId, employerglobalpayrollEPFNumber, employerglobalpayrollSocsoNumber, employerglobalpayrollPCBNumber, employerglobalpayrollEISNumber, employerglobalpayrollIncomeTaxNumber, employerglobalpayrollOther1, employerglobalpayrollOther2, employerglobalpayrollPayslipTemplateType, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerglobalpayrollEPFNumber + "', '" + pera.employerglobalpayrollSocsoNumber + "', '" + pera.employerglobalpayrollPCBNumber + "', '" + pera.employerglobalpayrollEISNumber + "', '" + pera.employerglobalpayrollIncomeTaxNumber + "', '" + pera.employerglobalpayrollOther1 + "', '" + pera.employerglobalpayrollOther2 + "', '" + pera.employerglobalpayrollPayslipTemplateType + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerglobalpayroll (employerId, employerglobalpayrollEPFNumber, employerglobalpayrollSocsoNumber, employerglobalpayrollPCBNumber, employerglobalpayrollEISNumber, employerglobalpayrollIncomeTaxNumber, employerglobalpayrollOther1, employerglobalpayrollOther2, employerglobalpayrollPayslipTemplateType, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerglobalpayroll set employerId = '" + pera.employerId + "', employerglobalpayrollEPFNumber = '" + pera.employerglobalpayrollEPFNumber + "', employerglobalpayrollSocsoNumber = '" + pera.employerglobalpayrollSocsoNumber + "', employerglobalpayrollPCBNumber = '" + pera.employerglobalpayrollPCBNumber + "', employerglobalpayrollEISNumber = '" + pera.employerglobalpayrollEISNumber + "', employerglobalpayrollIncomeTaxNumber = '" + pera.employerglobalpayrollIncomeTaxNumber + "', employerglobalpayrollOther1 = '" + pera.employerglobalpayrollOther1 + "', employerglobalpayrollOther2 = '" + pera.employerglobalpayrollOther2 + "', employerglobalpayrollPayslipTemplateType = '" + pera.employerglobalpayrollPayslipTemplateType + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerglobalpayrollId = '" + pera.employerglobalpayrollId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerglobalpayroll set " + column + " where employerglobalpayrollId = " + id + " ";
    return strquery;
};

exports.data = method;