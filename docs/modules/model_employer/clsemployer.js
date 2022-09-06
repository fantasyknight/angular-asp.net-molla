var method = {};

method.masterData = (request) => {
    let employerId = request.body.employerId || 0;
    let signupId = request.body.signupId || 0;
    let employerName = request.body.employerName || '';
    let employerRegistration = request.body.employerRegistration || '';
    let employerAddress1 = request.body.employerAddress1 || '';
    let employerAddress2 = request.body.employerAddress2 || '';
    let employerAddress3 = request.body.employerAddress3 || '';
    let employerPostcode = request.body.employerPostcode || '';
    let employerCity = request.body.employerCity || '';
    let mastercountryId = request.body.mastercountryId || 0;
    let masterstateId = request.body.masterstateId || 0;
    let employerContactno = request.body.employerContactno || '';
    let employerFax = request.body.employerFax || '';
    let employerEmail = request.body.employerEmail || '';
    let employerInchargeName = request.body.employerInchargeName || '';
    let employerInchargeMobile = request.body.employerInchargeMobile || '';
    let employerInchargeEmail = request.body.employerInchargeEmail || '';
    let employerGoogleTag = request.body.employerGoogleTag || '';
    let employerManagedBy = request.body.employerManagedBy || '';
    let employerIsActive = request.body.employerIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerId,
        signupId,
        employerName,
        employerRegistration,
        employerAddress1,
        employerAddress2,
        employerAddress3,
        employerPostcode,
        employerCity,
        mastercountryId,
        masterstateId,
        employerContactno,
        employerFax,
        employerEmail,
        employerInchargeName,
        employerInchargeMobile,
        employerInchargeEmail,
        employerGoogleTag,
        employerManagedBy,
        employerIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployer where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerId,signupId,employerName,employerRegistration,employerAddress1,employerAddress2,employerAddress3,employerPostcode,employerCity,mastercountryId,masterstateId,employerContactno,employerFax,employerEmail,employerInchargeName,employerInchargeMobile,employerInchargeEmail,employerGoogleTag,employerManagedBy,employerIsActive,createdBy,createdDate from tblemployer where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployer where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployer where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployer where 1 = 1 and employerId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployer where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployer (signupId, employerName, employerRegistration, employerAddress1, employerAddress2, employerAddress3, employerPostcode, employerCity, mastercountryId, masterstateId, employerContactno, employerFax, employerEmail, employerInchargeName, employerInchargeMobile, employerInchargeEmail, employerGoogleTag, employerManagedBy, employerIsActive, createdBy, createdDate) values ('" + pera.signupId + "', '" + pera.employerName + "', '" + pera.employerRegistration + "', '" + pera.employerAddress1 + "', '" + pera.employerAddress2 + "', '" + pera.employerAddress3 + "', '" + pera.employerPostcode + "', '" + pera.employerCity + "', '" + pera.mastercountryId + "', '" + pera.masterstateId + "', '" + pera.employerContactno + "', '" + pera.employerFax + "', '" + pera.employerEmail + "', '" + pera.employerInchargeName + "', '" + pera.employerInchargeMobile + "', '" + pera.employerInchargeEmail + "', '" + pera.employerGoogleTag + "', '" + pera.employerManagedBy + "', " + pera.employerIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployer (signupId, employerName, employerRegistration, employerAddress1, employerAddress2, employerAddress3, employerPostcode, employerCity, mastercountryId, masterstateId, employerContactno, employerFax, employerEmail, employerInchargeName, employerInchargeMobile, employerInchargeEmail, employerGoogleTag, employerManagedBy, employerIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployer set signupId = '" + pera.signupId + "', employerName = '" + pera.employerName + "', employerRegistration = '" + pera.employerRegistration + "', employerAddress1 = '" + pera.employerAddress1 + "', employerAddress2 = '" + pera.employerAddress2 + "', employerAddress3 = '" + pera.employerAddress3 + "', employerPostcode = '" + pera.employerPostcode + "', employerCity = '" + pera.employerCity + "', mastercountryId = '" + pera.mastercountryId + "', masterstateId = '" + pera.masterstateId + "', employerContactno = '" + pera.employerContactno + "', employerFax = '" + pera.employerFax + "', employerEmail = '" + pera.employerEmail + "', employerInchargeName = '" + pera.employerInchargeName + "', employerInchargeMobile = '" + pera.employerInchargeMobile + "', employerInchargeEmail = '" + pera.employerInchargeEmail + "', employerGoogleTag = '" + pera.employerGoogleTag + "', employerManagedBy = '" + pera.employerManagedBy + "', employerIsActive = " + pera.employerIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerId = '" + pera.employerId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployer set " + column + " where employerId = " + id + " ";
    return strquery;
};

method.select_view_employer = function (strwhere) {
    var strquery = "select * from view_employer where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount_view_employer = function (strwhere) {
    var strquery = "select count(*) as cnt from view_employer where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;