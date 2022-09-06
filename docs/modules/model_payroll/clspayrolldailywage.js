var method = {};

method.masterData = (request) => {
    let payrolldailywageId = request.body.payrolldailywageId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let payrolldailywageDayRate = request.body.payrolldailywageDayRate || 0.0;
    let payrolldailywageDayUnit = request.body.payrolldailywageDayUnit || 0.0;
    let payrolldailywageHourRate = request.body.payrolldailywageHourRate || 0.0;
    let payrolldailywageHourUnit = request.body.payrolldailywageHourUnit || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrolldailywageId,
        payrollsalaryId,
        payrolldailywageDayRate,
        payrolldailywageDayUnit,
        payrolldailywageHourRate,
        payrolldailywageHourUnit,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrolldailywage where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrolldailywageId,payrollsalaryId,payrolldailywageDayRate,payrolldailywageDayUnit,payrolldailywageHourRate,payrolldailywageHourUnit,createdBy,createdDate from tblpayrolldailywage where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrolldailywage where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrolldailywage where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrolldailywage where 1 = 1 and payrolldailywageId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrolldailywage where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrolldailywage (payrollsalaryId, payrolldailywageDayRate, payrolldailywageDayUnit, payrolldailywageHourRate, payrolldailywageHourUnit, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.payrolldailywageDayRate + "', '" + pera.payrolldailywageDayUnit + "', '" + pera.payrolldailywageHourRate + "', '" + pera.payrolldailywageHourUnit + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrolldailywage (payrollsalaryId, payrolldailywageDayRate, payrolldailywageDayUnit, payrolldailywageHourRate, payrolldailywageHourUnit, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrolldailywage set payrollsalaryId = '" + pera.payrollsalaryId + "', payrolldailywageDayRate = '" + pera.payrolldailywageDayRate + "', payrolldailywageDayUnit = '" + pera.payrolldailywageDayUnit + "', payrolldailywageHourRate = '" + pera.payrolldailywageHourRate + "', payrolldailywageHourUnit = '" + pera.payrolldailywageHourUnit + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrolldailywageId = '" + pera.payrolldailywageId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrolldailywage set " + column + " where payrolldailywageId = " + id + " ";
    return strquery;
};

exports.data = method;