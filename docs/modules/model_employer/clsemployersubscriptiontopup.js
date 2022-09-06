var method = {};

method.masterData = (request) => {
let employersubscriptiontopupId = request.body.employersubscriptiontopupId || 0 ;
let employersubscriptionId = request.body.employersubscriptionId || 0 ;
let mastersubscriptiontypeId = request.body.mastersubscriptiontypeId || 0 ;
let employersubscriptiontopupTopUpDate = request.body.employersubscriptiontopupTopUpDate || null ;
let employersubscriptiontopupNoOfEmployee = request.body.employersubscriptiontopupNoOfEmployee || 0 ;
let employersubscriptiontopupPaymentMode = request.body.employersubscriptiontopupPaymentMode || '' ;
let employersubscriptiontopupAmount = request.body.employersubscriptiontopupAmount || 0.0 ;
let employersubscriptiontopupRemark = request.body.employersubscriptiontopupRemark || '' ;
let employersubscriptiontopupIsActive = request.body.employersubscriptiontopupIsActive || false ;
let createdBy = request.body.createdBy || 0 ;
let createdDate = request.body.createdDate || null ;
return { employersubscriptiontopupId,employersubscriptionId,mastersubscriptiontypeId,employersubscriptiontopupTopUpDate,employersubscriptiontopupNoOfEmployee,employersubscriptiontopupPaymentMode,employersubscriptiontopupAmount,employersubscriptiontopupRemark,employersubscriptiontopupIsActive,createdBy,createdDate };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployersubscriptiontopup where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employersubscriptiontopupId,employersubscriptionId,mastersubscriptiontypeId,employersubscriptiontopupTopUpDate,employersubscriptiontopupNoOfEmployee,employersubscriptiontopupPaymentMode,employersubscriptiontopupAmount,employersubscriptiontopupRemark,employersubscriptiontopupIsActive,createdBy,createdDate from tblemployersubscriptiontopup where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployersubscriptiontopup where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployersubscriptiontopup where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployersubscriptiontopup where 1 = 1 and employersubscriptiontopupId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployersubscriptiontopup where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
if (pera.employersubscriptiontopupTopUpDate == null) pera.employersubscriptiontopupTopUpDate = null;  else pera.employersubscriptiontopupTopUpDate = "'" + pera.employersubscriptiontopupTopUpDate + "'";

if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "insert into tblemployersubscriptiontopup (employersubscriptionId, mastersubscriptiontypeId, employersubscriptiontopupTopUpDate, employersubscriptiontopupNoOfEmployee, employersubscriptiontopupPaymentMode, employersubscriptiontopupAmount, employersubscriptiontopupRemark, employersubscriptiontopupIsActive, createdBy, createdDate) values ('" + pera.employersubscriptionId +"', '" + pera.mastersubscriptiontypeId +"', " + pera.employersubscriptiontopupTopUpDate +", '" + pera.employersubscriptiontopupNoOfEmployee +"', '" + pera.employersubscriptiontopupPaymentMode +"', '" + pera.employersubscriptiontopupAmount +"', '" + pera.employersubscriptiontopupRemark +"', " + pera.employersubscriptiontopupIsActive +", '" + pera.createdBy +"', " + pera.createdDate +")";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployersubscriptiontopup (employersubscriptionId, mastersubscriptiontypeId, employersubscriptiontopupTopUpDate, employersubscriptiontopupNoOfEmployee, employersubscriptiontopupPaymentMode, employersubscriptiontopupAmount, employersubscriptiontopupRemark, employersubscriptiontopupIsActive, createdBy, createdDate) values ";
return strquery;
};

method.update = function (pera) {
if (pera.employersubscriptiontopupTopUpDate == null) pera.employersubscriptiontopupTopUpDate = null;  else pera.employersubscriptiontopupTopUpDate = "'" + pera.employersubscriptiontopupTopUpDate + "'";

if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "update tblemployersubscriptiontopup set employersubscriptionId = '" + pera.employersubscriptionId +"', mastersubscriptiontypeId = '" + pera.mastersubscriptiontypeId +"', employersubscriptiontopupTopUpDate = " + pera.employersubscriptiontopupTopUpDate +", employersubscriptiontopupNoOfEmployee = '" + pera.employersubscriptiontopupNoOfEmployee +"', employersubscriptiontopupPaymentMode = '" + pera.employersubscriptiontopupPaymentMode +"', employersubscriptiontopupAmount = '" + pera.employersubscriptiontopupAmount +"', employersubscriptiontopupRemark = '" + pera.employersubscriptiontopupRemark +"', employersubscriptiontopupIsActive = " + pera.employersubscriptiontopupIsActive +", createdBy = '" + pera.createdBy +"', createdDate = " + pera.createdDate +" where employersubscriptiontopupId = '" +  pera.employersubscriptiontopupId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployersubscriptiontopup set " + column + " where employersubscriptiontopupId = " + id + " ";
return strquery;
};

exports.data = method;
