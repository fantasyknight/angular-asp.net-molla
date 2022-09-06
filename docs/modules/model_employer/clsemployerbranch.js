var method = {};

method.masterData = (request) => {
    let employerbranchId = request.body.employerbranchId || 0;
    let employerId = request.body.employerId || 0;
    let employerbranchName = request.body.employerbranchName || '';
    let mastercountryId = request.body.mastercountryId || 0;
    let masterstateId = request.body.masterstateId || 0;
    let employerbranchCity = request.body.employerbranchCity || '';
    let employerbranchPostcode = request.body.employerbranchPostcode || '';
    let employerbranchAddress1 = request.body.employerbranchAddress1 || '';
    let employerbranchAddress2 = request.body.employerbranchAddress2 || '';
    let employerbranchAddress3 = request.body.employerbranchAddress3 || '';
    let employerbranchContactno = request.body.employerbranchContactno || '';
    let employerbranchFax = request.body.employerbranchFax || '';
    let employerbranchEmail = request.body.employerbranchEmail || '';
    let employerbranchInchargeName = request.body.employerbranchInchargeName || '';
    let employerbranchInchargeMobile = request.body.employerbranchInchargeMobile || '';
    let employerbranchInchargeEmail = request.body.employerbranchInchargeEmail || '';
    let employerbranchIsActive = request.body.employerbranchIsActive || false;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerbranchId,
        employerId,
        employerbranchName,
        mastercountryId,
        masterstateId,
        employerbranchCity,
        employerbranchPostcode,
        employerbranchAddress1,
        employerbranchAddress2,
        employerbranchAddress3,
        employerbranchContactno,
        employerbranchFax,
        employerbranchEmail,
        employerbranchInchargeName,
        employerbranchInchargeMobile,
        employerbranchInchargeEmail,
        employerbranchIsActive,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployerbranch where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employerbranchId,employerId,employerbranchName,mastercountryId,masterstateId,employerbranchCity,employerbranchPostcode,employerbranchAddress1,employerbranchAddress2,employerbranchAddress3,employerbranchContactno,employerbranchFax,employerbranchEmail,employerbranchInchargeName,employerbranchInchargeMobile,employerbranchInchargeEmail,employerbranchIsActive,createdBy,createdDate from tblemployerbranch where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerbranch where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerbranch where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerbranch where 1 = 1 and employerbranchId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerbranch where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerbranch (employerId, employerbranchName, mastercountryId, masterstateId, employerbranchCity, employerbranchPostcode, employerbranchAddress1, employerbranchAddress2, employerbranchAddress3, employerbranchContactno, employerbranchFax, employerbranchEmail, employerbranchInchargeName, employerbranchInchargeMobile, employerbranchInchargeEmail,employerbranchIsActive,createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.employerbranchName + "', '" + pera.mastercountryId + "', '" + pera.masterstateId + "', '" + pera.employerbranchCity + "', '" + pera.employerbranchPostcode + "', '" + pera.employerbranchAddress1 + "', '" + pera.employerbranchAddress2 + "', '" + pera.employerbranchAddress3 + "', '" + pera.employerbranchContactno + "', '" + pera.employerbranchFax + "', '" + pera.employerbranchEmail + "', '" + pera.employerbranchInchargeName + "', '" + pera.employerbranchInchargeMobile + "', '" + pera.employerbranchInchargeEmail + "', " + pera.employerbranchIsActive + ", '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerbranch (employerId, employerbranchName, mastercountryId, masterstateId, employerbranchCity, employerbranchPostcode, employerbranchAddress1, employerbranchAddress2, employerbranchAddress3, employerbranchContactno, employerbranchFax, employerbranchEmail, employerbranchInchargeName, employerbranchInchargeMobile, employerbranchInchargeEmail, employerbranchIsActive, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerbranch set employerId = '" + pera.employerId + "', employerbranchName = '" + pera.employerbranchName + "', mastercountryId = '" + pera.mastercountryId + "', masterstateId = '" + pera.masterstateId + "', employerbranchCity = '" + pera.employerbranchCity + "', employerbranchPostcode = '" + pera.employerbranchPostcode + "', employerbranchAddress1 = '" + pera.employerbranchAddress1 + "', employerbranchAddress2 = '" + pera.employerbranchAddress2 + "', employerbranchAddress3 = '" + pera.employerbranchAddress3 + "', employerbranchContactno = '" + pera.employerbranchContactno + "', employerbranchFax = '" + pera.employerbranchFax + "', employerbranchEmail = '" + pera.employerbranchEmail + "', employerbranchInchargeName = '" + pera.employerbranchInchargeName + "', employerbranchInchargeMobile = '" + pera.employerbranchInchargeMobile + "', employerbranchInchargeEmail = '" + pera.employerbranchInchargeEmail + "', employerbranchIsActive = " + pera.employerbranchIsActive + ", createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerbranchId = '" + pera.employerbranchId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerbranch set " + column + " where employerbranchId = " + id + " ";
    return strquery;
};

exports.data = method;