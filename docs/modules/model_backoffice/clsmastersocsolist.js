var method = {};

method.masterData = (request) => {
    let mastersocsolistId = request.body.mastersocsolistId || 0;
    let mastersocsoId = request.body.mastersocsoId || 0;
    let mastersocsolistFrom = request.body.mastersocsolistFrom || 0.0;
    let mastersocsolistTo = request.body.mastersocsolistTo || 0.0;
    let mastersocsolistEmployerContribution = request.body.mastersocsolistEmployerContribution || 0.0;
    let mastersocsolistEmployeeContribution = request.body.mastersocsolistEmployeeContribution || 0.0;
    let mastersocsolistTotalContribution = request.body.mastersocsolistTotalContribution || 0.0;
    let mastersocsolistEmployerContribution1 = request.body.mastersocsolistEmployerContribution1 || 0.0;
    let mastersocsolistIsActive = request.body.mastersocsolistIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        mastersocsolistId,
        mastersocsoId,
        mastersocsolistFrom,
        mastersocsolistTo,
        mastersocsolistEmployerContribution,
        mastersocsolistEmployeeContribution,
        mastersocsolistTotalContribution,
        mastersocsolistEmployerContribution1,
        mastersocsolistIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmastersocsolist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select mastersocsolistId,mastersocsoId,mastersocsolistFrom,mastersocsolistTo,mastersocsolistEmployerContribution,mastersocsolistEmployeeContribution,mastersocsolistTotalContribution,mastersocsolistEmployerContribution1,mastersocsolistIsActive,createdBy,createdDate from tblmastersocsolist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmastersocsolist where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmastersocsolist where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmastersocsolist where 1 = 1 and mastersocsolistId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmastersocsolist where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmastersocsolist (mastersocsoId, mastersocsolistFrom, mastersocsolistTo, mastersocsolistEmployerContribution, mastersocsolistEmployeeContribution, mastersocsolistTotalContribution, mastersocsolistEmployerContribution1, mastersocsolistIsActive, createdBy, createdDate) values ('" + pera.mastersocsoId + "', '" + pera.mastersocsolistFrom + "', '" + pera.mastersocsolistTo + "', '" + pera.mastersocsolistEmployerContribution + "', '" + pera.mastersocsolistEmployeeContribution + "', '" + pera.mastersocsolistTotalContribution + "', '" + pera.mastersocsolistEmployerContribution1 + "', " + pera.mastersocsolistIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmastersocsolist (mastersocsoId, mastersocsolistFrom, mastersocsolistTo, mastersocsolistEmployerContribution, mastersocsolistEmployeeContribution, mastersocsolistTotalContribution, mastersocsolistEmployerContribution1, mastersocsolistIsActive, createdBy) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmastersocsolist set mastersocsoId = '" + pera.mastersocsoId + "', mastersocsolistFrom = '" + pera.mastersocsolistFrom + "', mastersocsolistTo = '" + pera.mastersocsolistTo + "', mastersocsolistEmployerContribution = '" + pera.mastersocsolistEmployerContribution + "', mastersocsolistEmployeeContribution = '" + pera.mastersocsolistEmployeeContribution + "', mastersocsolistTotalContribution = '" + pera.mastersocsolistTotalContribution + "', mastersocsolistEmployerContribution1 = '" + pera.mastersocsolistEmployerContribution1 + "', mastersocsolistIsActive = " + pera.mastersocsolistIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where mastersocsolistId = '" + pera.mastersocsolistId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmastersocsolist set " + column + " where mastersocsolistId = " + id + " ";
    return strquery;
};

exports.data = method;