var method = {};

method.masterData = (request) => {
    let machineId = request.body.machineId || 0;
    let employerId = request.body.employerId || 0;
    let machineName = request.body.machineName || '';
    let machineUrl = request.body.machineUrl || '';
    let machineUser = request.body.machineUser || '';
    let machinePassword = request.body.machinePassword || '';
    let machineExeUrl = request.body.machineExeUrl || '';
    return {
        machineId,
        employerId,
        machineName,
        machineUrl,
        machineUser,
        machinePassword,
        machineExeUrl
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmachinelist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select machineId,employerId,machineName,machineUrl,machineUser,machinePassword,machineExeUrl from tblmachinelist where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmachinelist where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmachinelist where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmachinelist where 1 = 1 and machineId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmachinelist where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    var strquery = "insert into tblmachinelist (employerId, machineName, machineUrl, machineUser, machinePassword, machineExeUrl) values ('" + pera.employerId + "', '" + pera.machineName + "', '" + pera.machineUrl + "', '" + pera.machineUser + "', '" + pera.machinePassword + "', '" + pera.machineExeUrl + "')";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmachinelist (employerId, machineName, machineUrl, machineUser, machinePassword, machineExeUrl) values ";
    return strquery;
};

method.update = function (pera) {
    var strquery = "update tblmachinelist set employerId = '" + pera.employerId + "', machineName = '" + pera.machineName + "', machineUrl = '" + pera.machineUrl + "', machineUser = '" + pera.machineUser + "', machinePassword = '" + pera.machinePassword + "', machineExeUrl = '" + pera.machineExeUrl + "' where machineId = '" + pera.machineId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmachinelist set " + column + " where machineId = " + id + " ";
    return strquery;
};

exports.data = method;