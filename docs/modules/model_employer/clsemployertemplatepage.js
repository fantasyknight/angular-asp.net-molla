var method = {};

method.masterData = (request) => {
    let employerTemplatePageId = request.body.employerTemplatePageId || 0;
    let employerTemplateId = request.body.employerTemplateId || 0;
    let employerId = request.body.employerId || 0;
    let masterPageId = request.body.masterPageId || 0;
    let isAccess = request.body.isAccess || false;
    let isAdd = request.body.isAdd || false;
    let isEdit = request.body.isEdit || false;
    let isDelete = request.body.isDelete || false;
    let isReport = request.body.isReport || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerTemplatePageId,
        employerTemplateId,
        employerId,
        masterPageId,
        isAccess,
        isAdd,
        isEdit,
        isDelete,
        isReport,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployertemplatepage where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerTemplatePageId,employerTemplateId,employerId,masterPageId,isAccess,isAdd,isEdit,isDelete,isReport,createdBy,createdDate from tblemployertemplatepage where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployertemplatepage where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployertemplatepage where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployertemplatepage where 1 = 1 and employerTemplatePageId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployertemplatepage where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployertemplatepage (employerTemplateId, employerId, masterPageId, isAccess, isAdd, isEdit, isDelete, isReport, createdBy, createdDate) values ('" + pera.employerTemplateId + "', '" + pera.employerId + "', '" + pera.masterPageId + "', " + pera.isAccess + ", " + pera.isAdd + ", " + pera.isEdit + ", " + pera.isDelete + ", " + pera.isReport + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployertemplatepage (employerTemplateId, employerId, masterPageId, isAccess, isAdd, isEdit, isDelete, isReport, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployertemplatepage set employerTemplateId = '" + pera.employerTemplateId + "', employerId = '" + pera.employerId + "', masterPageId = '" + pera.masterPageId + "', isAccess = " + pera.isAccess + ", isAdd = " + pera.isAdd + ", isEdit = " + pera.isEdit + ", isDelete = " + pera.isDelete + ", isReport = " + pera.isReport + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerTemplatePageId = '" + pera.employerTemplatePageId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployertemplatepage set " + column + " where employerTemplatePageId = " + id + " ";
    return strquery;
};

method.select_view_templatepage = function (employerId, employerTemplateId) {
    var strquery = `select a.masterPageId, a.menuName, a.pageName, a.isActive, b.employerTemplateId, b.employerId,
                    CASE WHEN ISNULL(b.isAccess) OR b.isAccess = FALSE THEN FALSE ELSE TRUE END AS isAccess,
                    CASE WHEN ISNULL(b.isAdd) OR b.isAdd = FALSE THEN FALSE ELSE TRUE END AS isAdd,
                    CASE WHEN ISNULL(b.isEdit) OR b.isEdit = FALSE THEN FALSE ELSE TRUE END AS isEdit,
                    CASE WHEN ISNULL(b.isDelete) OR b.isDelete = FALSE THEN FALSE ELSE TRUE END AS isDelete,
                    CASE WHEN ISNULL(b.isReport) OR b.isReport = FALSE THEN FALSE ELSE TRUE END AS isReport
                    FROM tblmasterpage AS a LEFT JOIN tblemployertemplatepage AS b 
                    ON a.masterPageId = b.masterPageId AND b.employerId = ` + employerId + ` AND employerTemplateId = ` + employerTemplateId;
    return strquery;
};

exports.data = method;