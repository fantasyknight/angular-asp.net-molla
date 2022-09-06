var method = {};

method.masterData = (request) => {
    let masterPageId = request.body.masterPageId || 0;
    let menuName = request.body.menuName || '';
    let pageName = request.body.pageName || '';
    let isActive = request.body.isActive || false;
    return {
        masterPageId,
        menuName,
        pageName,
        isActive
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmasterpage where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select masterPageId,menuName,pageName,isActive from tblmasterpage where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmasterpage where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmasterpage where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmasterpage where 1 = 1 and masterPageId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmasterpage where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    var strquery = "insert into tblmasterpage (menuName, pageName, isActive) values ('" + pera.menuName + "', '" + pera.pageName + "', " + pera.isActive + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmasterpage (menuName, pageName, isActive) values ";
    return strquery;
};

method.update = function (pera) {
    var strquery = "update tblmasterpage set menuName = '" + pera.menuName + "', pageName = '" + pera.pageName + "', isActive = " + pera.isActive + " where masterPageId = '" + pera.masterPageId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmasterpage set " + column + " where masterPageId = " + id + " ";
    return strquery;
};

exports.data = method;