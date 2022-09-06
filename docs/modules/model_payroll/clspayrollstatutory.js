var method = {};

method.masterData = (request) => {
    let payrollstatutoryId = request.body.payrollstatutoryId || 0;
    let payrollsalaryId = request.body.payrollsalaryId || 0;
    let payrollstatutoryEpfWages = request.body.payrollstatutoryEpfWages || 0.0;
    let payrollstatutoryEpfEmployee = request.body.payrollstatutoryEpfEmployee || 0.0;
    let payrollstatutoryEpfEmployer = request.body.payrollstatutoryEpfEmployer || 0.0;
    let payrollstatutorySocsoWages = request.body.payrollstatutorySocsoWages || 0.0;
    let payrollstatutorySocsoEmployee = request.body.payrollstatutorySocsoEmployee || 0.0;
    let payrollstatutorySocsoEmployer = request.body.payrollstatutorySocsoEmployer || 0.0;
    let payrollstatutoryEISWages = request.body.payrollstatutoryEISWages || 0.0;
    let payrollstatutoryEISEmployee = request.body.payrollstatutoryEISEmployee || 0.0;
    let payrollstatutoryEISEmployer = request.body.payrollstatutoryEISEmployer || 0.0;
    let payrollstatutoryPcbWages = request.body.payrollstatutoryPcbWages || 0.0;
    let payrollstatutoryPcbEmployee = request.body.payrollstatutoryPcbEmployee || 0.0;
    let payrollstatutoryPcbEmployer = request.body.payrollstatutoryPcbEmployer || 0.0;
    let payrollstatutoryHrdfWages = request.body.payrollstatutoryHrdfWages || 0.0;
    let payrollstatutoryHrdfEmployee = request.body.payrollstatutoryHrdfEmployee || 0.0;
    let payrollstatutoryHrdfEmployer = request.body.payrollstatutoryHrdfEmployer || 0.0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        payrollstatutoryId,
        payrollsalaryId,
        payrollstatutoryEpfWages,
        payrollstatutoryEpfEmployee,
        payrollstatutoryEpfEmployer,
        payrollstatutorySocsoWages,
        payrollstatutorySocsoEmployee,
        payrollstatutorySocsoEmployer,
        payrollstatutoryEISWages,
        payrollstatutoryEISEmployee,
        payrollstatutoryEISEmployer,
        payrollstatutoryPcbWages,
        payrollstatutoryPcbEmployee,
        payrollstatutoryPcbEmployer,
        payrollstatutoryHrdfWages,
        payrollstatutoryHrdfEmployee,
        payrollstatutoryHrdfEmployer,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblpayrollstatutory where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select payrollstatutoryId,payrollsalaryId,payrollstatutoryEpfWages,payrollstatutoryEpfEmployee,payrollstatutoryEpfEmployer,payrollstatutorySocsoWages,payrollstatutorySocsoEmployee,payrollstatutorySocsoEmployer,payrollstatutoryEISWages,payrollstatutoryEISEmployee,payrollstatutoryEISEmployer,payrollstatutoryPcbWages,payrollstatutoryPcbEmployee,payrollstatutoryPcbEmployer,payrollstatutoryHrdfWages, payrollstatutoryHrdfEmployee, payrollstatutoryHrdfEmployer,createdBy,createdDate from tblpayrollstatutory where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblpayrollstatutory where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblpayrollstatutory where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblpayrollstatutory where 1 = 1 and payrollstatutoryId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblpayrollstatutory where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblpayrollstatutory (payrollsalaryId, payrollstatutoryEpfWages, payrollstatutoryEpfEmployee, payrollstatutoryEpfEmployer, payrollstatutorySocsoWages, payrollstatutorySocsoEmployee, payrollstatutorySocsoEmployer, payrollstatutoryEISWages, payrollstatutoryEISEmployee, payrollstatutoryEISEmployer, payrollstatutoryPcbWages, payrollstatutoryPcbEmployee, payrollstatutoryPcbEmployer, payrollstatutoryHrdfWages, payrollstatutoryHrdfEmployee, payrollstatutoryHrdfEmployer, createdBy, createdDate) values ('" + pera.payrollsalaryId + "', '" + pera.payrollstatutoryEpfWages + "', '" + pera.payrollstatutoryEpfEmployee + "', '" + pera.payrollstatutoryEpfEmployer + "', '" + pera.payrollstatutorySocsoWages + "', '" + pera.payrollstatutorySocsoEmployee + "', '" + pera.payrollstatutorySocsoEmployer + "', '" + pera.payrollstatutoryEISWages + "', '" + pera.payrollstatutoryEISEmployee + "', '" + pera.payrollstatutoryEISEmployer + "', '" + pera.payrollstatutoryPcbWages + "', '" + pera.payrollstatutoryPcbEmployee + "', '" + pera.payrollstatutoryPcbEmployer + "', '" + pera.payrollstatutoryHrdfWages + "' ,'" + pera.payrollstatutoryHrdfEmployee + "' ,'" + pera.payrollstatutoryHrdfEmployer + "' , '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblpayrollstatutory (payrollsalaryId, payrollstatutoryEpfWages, payrollstatutoryEpfEmployee, payrollstatutoryEpfEmployer, payrollstatutorySocsoWages, payrollstatutorySocsoEmployee, payrollstatutorySocsoEmployer, payrollstatutoryEISWages, payrollstatutoryEISEmployee, payrollstatutoryEISEmployer, payrollstatutoryPcbWages, payrollstatutoryPcbEmployee, payrollstatutoryPcbEmployer, payrollstatutoryHrdfWages, payrollstatutoryHrdfEmployee, payrollstatutoryHrdfEmployer, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblpayrollstatutory set payrollsalaryId = '" + pera.payrollsalaryId + "', payrollstatutoryEpfWages = '" + pera.payrollstatutoryEpfWages + "', payrollstatutoryEpfEmployee = '" + pera.payrollstatutoryEpfEmployee + "', payrollstatutoryEpfEmployer = '" + pera.payrollstatutoryEpfEmployer + "', payrollstatutorySocsoWages = '" + pera.payrollstatutorySocsoWages + "', payrollstatutorySocsoEmployee = '" + pera.payrollstatutorySocsoEmployee + "', payrollstatutorySocsoEmployer = '" + pera.payrollstatutorySocsoEmployer + "', payrollstatutoryEISWages = '" + pera.payrollstatutoryEISWages + "', payrollstatutoryEISEmployee = '" + pera.payrollstatutoryEISEmployee + "', payrollstatutoryEISEmployer = '" + pera.payrollstatutoryEISEmployer + "', payrollstatutoryPcbWages = '" + pera.payrollstatutoryPcbWages + "', payrollstatutoryPcbEmployee = '" + pera.payrollstatutoryPcbEmployee + "', payrollstatutoryPcbEmployer = '" + pera.payrollstatutoryPcbEmployer + "', payrollstatutoryHrdfWages = '" + pera.payrollstatutoryHrdfWages + "', payrollstatutoryHrdfEmployee = '" + pera.payrollstatutoryHrdfEmployee + "', payrollstatutoryHrdfEmployer = '" + pera.payrollstatutoryHrdfEmployer + "' , createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where payrollstatutoryId = '" + pera.payrollstatutoryId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblpayrollstatutory set " + column + " where payrollstatutoryId = " + id + " ";
    return strquery;
};

method.updateStringColumn = function (pera) {
    var strquery = "update tblpayrollstatutory set  payrollstatutoryHrdfWages = '" + pera.payrollstatutoryHrdfWages + "', payrollstatutoryHrdfEmployee = '" + pera.payrollstatutoryHrdfEmployee + "', payrollstatutoryHrdfEmployer = '" + pera.payrollstatutoryHrdfEmployer + "', payrollstatutoryEpfWages = '" + pera.payrollstatutoryEpfWages + "', payrollstatutoryEpfEmployee = '" + pera.payrollstatutoryEpfEmployee + "', payrollstatutoryEpfEmployer = '" + pera.payrollstatutoryEpfEmployer + "', payrollstatutorySocsoWages = '" + pera.payrollstatutorySocsoWages + "', payrollstatutorySocsoEmployee = '" + pera.payrollstatutorySocsoEmployee + "', payrollstatutorySocsoEmployer = '" + pera.payrollstatutorySocsoEmployer + "', payrollstatutoryEISWages = '" + pera.payrollstatutoryEISWages + "', payrollstatutoryEISEmployee = '" + pera.payrollstatutoryEISEmployee + "', payrollstatutoryEISEmployer = '" + pera.payrollstatutoryEISEmployer + "', payrollstatutoryPcbWages = '" + pera.payrollstatutoryPcbWages + "', payrollstatutoryPcbEmployee = '" + pera.payrollstatutoryPcbEmployee + "', payrollstatutoryPcbEmployer = '" + pera.payrollstatutoryPcbEmployer + "', createdBy = '" + pera.createdBy + "' where payrollsalaryId = '" + pera.payrollsalaryId + "'";
    return strquery;
};

method.select_view_payrollstatutory = function (strwhere) {
    var strquery = "select * from view_payrollstatutory where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_payrollstatutory = function (strwhere) {
    var strquery = "select count(*) as cnt from view_payrollstatutory where 1=1 " + strwhere;
    return strquery;
};


exports.data = method;