var method = {};

method.masterData = (request) => {
let employerprintingoptionId = request.body.employerprintingoptionId || 0 ;
let employerId = request.body.employerId || 0 ;
let employerprintingoptionPreparedBy = request.body.employerprintingoptionPreparedBy || false ;
let employerprintingoptionPrepareByName = request.body.employerprintingoptionPrepareByName || '' ;
let employerprintingoptionCheckedBy = request.body.employerprintingoptionCheckedBy || false ;
let employerprintingoptionCheckedByName = request.body.employerprintingoptionCheckedByName || '' ;
let employerprintingoptionVerifiedBy = request.body.employerprintingoptionVerifiedBy || false ;
let employerprintingoptionVerifiedByName = request.body.employerprintingoptionVerifiedByName || '' ;
let employerprintingoptionApprovedBy = request.body.employerprintingoptionApprovedBy || false ;
let employerprintingoptionApprovedByName = request.body.employerprintingoptionApprovedByName || '' ;
let employerprintingoptionReceivedBy = request.body.employerprintingoptionReceivedBy || false ;
let employerprintingoptionReceivedByName = request.body.employerprintingoptionReceivedByName || '' ;
let employerprintingoptionAuthorizedBy = request.body.employerprintingoptionAuthorizedBy || false ;
let employerprintingoptionAuthorizedByName = request.body.employerprintingoptionAuthorizedByName || '' ;
let createdBy = request.body.createdBy || 0 ;
let createdDate = request.body.createdDate || null ;
return { employerprintingoptionId,employerId,employerprintingoptionPreparedBy,employerprintingoptionPrepareByName,employerprintingoptionCheckedBy,employerprintingoptionCheckedByName,employerprintingoptionVerifiedBy,employerprintingoptionVerifiedByName,employerprintingoptionApprovedBy,employerprintingoptionApprovedByName,employerprintingoptionReceivedBy,employerprintingoptionReceivedByName,employerprintingoptionAuthorizedBy,employerprintingoptionAuthorizedByName,createdBy,createdDate };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployerprintingoption where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employerprintingoptionId,employerId,employerprintingoptionPreparedBy,employerprintingoptionPrepareByName,employerprintingoptionCheckedBy,employerprintingoptionCheckedByName,employerprintingoptionVerifiedBy,employerprintingoptionVerifiedByName,employerprintingoptionApprovedBy,employerprintingoptionApprovedByName,employerprintingoptionReceivedBy,employerprintingoptionReceivedByName,employerprintingoptionAuthorizedBy,employerprintingoptionAuthorizedByName,createdBy,createdDate from tblemployerprintingoption where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployerprintingoption where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployerprintingoption where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployerprintingoption where 1 = 1 and employerprintingoptionId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployerprintingoption where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "insert into tblemployerprintingoption (employerId, employerprintingoptionPreparedBy, employerprintingoptionPrepareByName, employerprintingoptionCheckedBy, employerprintingoptionCheckedByName, employerprintingoptionVerifiedBy, employerprintingoptionVerifiedByName, employerprintingoptionApprovedBy, employerprintingoptionApprovedByName, employerprintingoptionReceivedBy, employerprintingoptionReceivedByName, employerprintingoptionAuthorizedBy, employerprintingoptionAuthorizedByName, createdBy, createdDate) values ('" + pera.employerId +"', " + pera.employerprintingoptionPreparedBy +", '" + pera.employerprintingoptionPrepareByName +"', " + pera.employerprintingoptionCheckedBy +", '" + pera.employerprintingoptionCheckedByName +"', " + pera.employerprintingoptionVerifiedBy +", '" + pera.employerprintingoptionVerifiedByName +"', " + pera.employerprintingoptionApprovedBy +", '" + pera.employerprintingoptionApprovedByName +"', " + pera.employerprintingoptionReceivedBy +", '" + pera.employerprintingoptionReceivedByName +"', " + pera.employerprintingoptionAuthorizedBy +", '" + pera.employerprintingoptionAuthorizedByName +"', '" + pera.createdBy +"', " + pera.createdDate +")";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployerprintingoption (employerId, employerprintingoptionPreparedBy, employerprintingoptionPrepareByName, employerprintingoptionCheckedBy, employerprintingoptionCheckedByName, employerprintingoptionVerifiedBy, employerprintingoptionVerifiedByName, employerprintingoptionApprovedBy, employerprintingoptionApprovedByName, employerprintingoptionReceivedBy, employerprintingoptionReceivedByName, employerprintingoptionAuthorizedBy, employerprintingoptionAuthorizedByName, createdBy, createdDate) values ";
return strquery;
};

method.update = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "update tblemployerprintingoption set employerId = '" + pera.employerId +"', employerprintingoptionPreparedBy = " + pera.employerprintingoptionPreparedBy +", employerprintingoptionPrepareByName = '" + pera.employerprintingoptionPrepareByName +"', employerprintingoptionCheckedBy = " + pera.employerprintingoptionCheckedBy +", employerprintingoptionCheckedByName = '" + pera.employerprintingoptionCheckedByName +"', employerprintingoptionVerifiedBy = " + pera.employerprintingoptionVerifiedBy +", employerprintingoptionVerifiedByName = '" + pera.employerprintingoptionVerifiedByName +"', employerprintingoptionApprovedBy = " + pera.employerprintingoptionApprovedBy +", employerprintingoptionApprovedByName = '" + pera.employerprintingoptionApprovedByName +"', employerprintingoptionReceivedBy = " + pera.employerprintingoptionReceivedBy +", employerprintingoptionReceivedByName = '" + pera.employerprintingoptionReceivedByName +"', employerprintingoptionAuthorizedBy = " + pera.employerprintingoptionAuthorizedBy +", employerprintingoptionAuthorizedByName = '" + pera.employerprintingoptionAuthorizedByName +"', createdBy = '" + pera.createdBy +"', createdDate = " + pera.createdDate +" where employerprintingoptionId = '" +  pera.employerprintingoptionId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployerprintingoption set " + column + " where employerprintingoptionId = " + id + " ";
return strquery;
};

exports.data = method;
