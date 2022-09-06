var method = {};

method.masterData = (request) => {
    let memberId = request.body.memberId || 0;
    let signupId = request.body.signupId || 0;
    let memberName = request.body.memberName || '';
    let memberNric = request.body.memberNric || '';
    let memberPassport = request.body.memberPassport || '';
    let masterraceId = request.body.masterraceId || 0;
    let mastercitizenshipId = request.body.mastercitizenshipId || 0;
    let memberGender = request.body.memberGender || '';
    let memberMaritalStatus = request.body.memberMaritalStatus || '';
    let memberAddress1 = request.body.memberAddress1 || '';
    let memberAddress2 = request.body.memberAddress2 || '';
    let memberAddress3 = request.body.memberAddress3 || '';
    let memberPostcode = request.body.memberPostcode || '';
    let memberCity = request.body.memberCity || '';
    let mastercountryId = request.body.mastercountryId || 0;
    let masterstateId = request.body.masterstateId || 0;
    let memberMobile = request.body.memberMobile || '';
    let memberFax = request.body.memberFax || '';
    let memberEmail = request.body.memberEmail || '';
    let memberDob = request.body.memberDob || null;
    let memberEPF = request.body.memberEPF || '';
    let memberSocso = request.body.memberSocso || '';
    let memberEIS = request.body.memberEIS || '';
    let memberIncomeTax = request.body.memberIncomeTax || '';
    let memberPTPTN = request.body.memberPTPTN || '';
    let memberOther = request.body.memberOther || '';
    let memberBankName = request.body.memberBankName || '';
    let memberAccount = request.body.memberAccount || '';
    let memberGoogleTag = request.body.memberGoogleTag || '';
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        memberId,
        signupId,
        memberName,
        memberNric,
        memberPassport,
        masterraceId,
        mastercitizenshipId,
        memberGender,
        memberMaritalStatus,
        memberAddress1,
        memberAddress2,
        memberAddress3,
        memberPostcode,
        memberCity,
        mastercountryId,
        masterstateId,
        memberMobile,
        memberFax,
        memberEmail,
        memberDob,
        memberEPF,
        memberSocso,
        memberEIS,
        memberIncomeTax,
        memberPTPTN,
        memberOther,
        memberBankName,
        memberAccount,
        memberGoogleTag,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblmember where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select memberId,signupId,memberName,memberNric,memberPassport,masterraceId,mastercitizenshipId,memberGender,memberMaritalStatus,memberAddress1,memberAddress2,memberAddress3,memberPostcode,memberCity,mastercountryId,masterstateId,memberMobile,memberFax,memberEmail,memberDob,memberEPF,memberSocso,memberEIS,memberIncomeTax,memberPTPTN,memberOther,memberBankName,memberAccount,memberGoogleTag,createdBy,createdDate from tblmember where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblmember where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblmember where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblmember where 1 = 1 and memberId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblmember where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.memberDob == null) pera.memberDob = null;
    else pera.memberDob = "'" + pera.memberDob + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblmember (signupId, memberName, memberNric, memberPassport, masterraceId, mastercitizenshipId, memberGender, memberMaritalStatus, memberAddress1, memberAddress2, memberAddress3, memberPostcode, memberCity, mastercountryId, masterstateId, memberMobile, memberFax, memberEmail, memberDob, memberEPF, memberSocso, memberEIS, memberIncomeTax, memberPTPTN, memberOther, memberBankName, memberAccount, memberGoogleTag, createdBy, createdDate) values ('" + pera.signupId + "', '" + pera.memberName + "', '" + pera.memberNric + "', '" + pera.memberPassport + "', '" + pera.masterraceId + "', '" + pera.mastercitizenshipId + "', '" + pera.memberGender + "', '" + pera.memberMaritalStatus + "', '" + pera.memberAddress1 + "', '" + pera.memberAddress2 + "', '" + pera.memberAddress3 + "', '" + pera.memberPostcode + "', '" + pera.memberCity + "', '" + pera.mastercountryId + "', '" + pera.masterstateId + "', '" + pera.memberMobile + "', '" + pera.memberFax + "', '" + pera.memberEmail + "', " + pera.memberDob + ", '" + pera.memberEPF + "', '" + pera.memberSocso + "', '" + pera.memberEIS + "', '" + pera.memberIncomeTax + "', '" + pera.memberPTPTN + "', '" + pera.memberOther + "', '" + pera.memberBankName + "', '" + pera.memberAccount + "', '" + pera.memberGoogleTag + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblmember (signupId, memberName, memberNric, memberPassport, masterraceId, mastercitizenshipId, memberGender, memberMaritalStatus, memberAddress1, memberAddress2, memberAddress3, memberPostcode, memberCity, mastercountryId, masterstateId, memberMobile, memberFax, memberEmail, memberDob, memberEPF, memberSocso, memberEIS, memberIncomeTax, memberPTPTN, memberOther, memberBankName, memberAccount, memberGoogleTag, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.memberDob == null) pera.memberDob = null;
    else pera.memberDob = "'" + pera.memberDob + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblmember set signupId = '" + pera.signupId + "', memberName = '" + pera.memberName + "', memberNric = '" + pera.memberNric + "', memberPassport = '" + pera.memberPassport + "', masterraceId = '" + pera.masterraceId + "', mastercitizenshipId = '" + pera.mastercitizenshipId + "', memberGender = '" + pera.memberGender + "', memberMaritalStatus = '" + pera.memberMaritalStatus + "', memberAddress1 = '" + pera.memberAddress1 + "', memberAddress2 = '" + pera.memberAddress2 + "', memberAddress3 = '" + pera.memberAddress3 + "', memberPostcode = '" + pera.memberPostcode + "', memberCity = '" + pera.memberCity + "', mastercountryId = '" + pera.mastercountryId + "', masterstateId = '" + pera.masterstateId + "', memberMobile = '" + pera.memberMobile + "', memberFax = '" + pera.memberFax + "', memberEmail = '" + pera.memberEmail + "', memberDob = " + pera.memberDob + ", memberEPF = '" + pera.memberEPF + "', memberSocso = '" + pera.memberSocso + "', memberEIS = '" + pera.memberEIS + "', memberIncomeTax = '" + pera.memberIncomeTax + "', memberPTPTN = '" + pera.memberPTPTN + "', memberOther = '" + pera.memberOther + "', memberBankName = '" + pera.memberBankName + "', memberAccount = '" + pera.memberAccount + "', memberGoogleTag = '" + pera.memberGoogleTag + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where memberId = '" + pera.memberId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblmember set " + column + " where memberId = " + id + " ";
    return strquery;
};

method.select_SearchWithFlag = function (employerId, strwhere) {
    var strquery = ` select *, 
                    (SELECT COUNT(*) FROM tblemployee WHERE 1 = 1 AND memberId = tblmember.memberId AND employerId = ` + employerId + `) AS flag FROM
                    tblmember WHERE 1 = 1  ` + strwhere;
    return strquery;
};

exports.data = method;