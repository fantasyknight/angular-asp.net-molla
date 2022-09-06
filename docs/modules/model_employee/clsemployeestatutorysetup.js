var method = {};

method.masterData = (request) => {
let employeestatutorysetupId = request.body.employeestatutorysetupId || 0 ;
let employerId = request.body.employerId || 0 ;
let employeeId = request.body.employeeId || 0 ;
let employeestatutorysetupEpfERate = request.body.employeestatutorysetupEpfERate || 0.0 ;
let employeestatutorysetupEpfRRate = request.body.employeestatutorysetupEpfRRate || 0.0 ;
let employeestatutorysetupSocsoERate = request.body.employeestatutorysetupSocsoERate || 0.0 ;
let employeestatutorysetupSocsoRRate = request.body.employeestatutorysetupSocsoRRate || 0.0 ;
let employeestatutorysetupEISERate = request.body.employeestatutorysetupEISERate || 0.0 ;
let employeestatutorysetupEISRRate = request.body.employeestatutorysetupEISRRate || 0.0 ;
let employeestatutorysetupPCBERate = request.body.employeestatutorysetupPCBERate || 0.0 ;
let createdBy = request.body.createdBy || 0 ;
let createdDate = request.body.createdDate || null ;
return { employeestatutorysetupId,employerId,employeeId,employeestatutorysetupEpfERate,employeestatutorysetupEpfRRate,employeestatutorysetupSocsoERate,employeestatutorysetupSocsoRRate,employeestatutorysetupEISERate,employeestatutorysetupEISRRate,employeestatutorysetupPCBERate,createdBy,createdDate };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployeestatutorysetup where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employeestatutorysetupId,employerId,employeeId,employeestatutorysetupEpfERate,employeestatutorysetupEpfRRate,employeestatutorysetupSocsoERate,employeestatutorysetupSocsoRRate,employeestatutorysetupEISERate,employeestatutorysetupEISRRate,employeestatutorysetupPCBERate,createdBy,createdDate from tblemployeestatutorysetup where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployeestatutorysetup where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployeestatutorysetup where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployeestatutorysetup where 1 = 1 and employeestatutorysetupId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployeestatutorysetup where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "insert into tblemployeestatutorysetup (employerId, employeeId, employeestatutorysetupEpfERate, employeestatutorysetupEpfRRate, employeestatutorysetupSocsoERate, employeestatutorysetupSocsoRRate, employeestatutorysetupEISERate, employeestatutorysetupEISRRate, employeestatutorysetupPCBERate, createdBy, createdDate) values ('" + pera.employerId +"', '" + pera.employeeId +"', '" + pera.employeestatutorysetupEpfERate +"', '" + pera.employeestatutorysetupEpfRRate +"', '" + pera.employeestatutorysetupSocsoERate +"', '" + pera.employeestatutorysetupSocsoRRate +"', '" + pera.employeestatutorysetupEISERate +"', '" + pera.employeestatutorysetupEISRRate +"', '" + pera.employeestatutorysetupPCBERate +"', '" + pera.createdBy +"', " + pera.createdDate +")";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployeestatutorysetup (employerId, employeeId, employeestatutorysetupEpfERate, employeestatutorysetupEpfRRate, employeestatutorysetupSocsoERate, employeestatutorysetupSocsoRRate, employeestatutorysetupEISERate, employeestatutorysetupEISRRate, employeestatutorysetupPCBERate, createdBy, createdDate) values ";
return strquery;
};

method.update = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "update tblemployeestatutorysetup set employerId = '" + pera.employerId +"', employeeId = '" + pera.employeeId +"', employeestatutorysetupEpfERate = '" + pera.employeestatutorysetupEpfERate +"', employeestatutorysetupEpfRRate = '" + pera.employeestatutorysetupEpfRRate +"', employeestatutorysetupSocsoERate = '" + pera.employeestatutorysetupSocsoERate +"', employeestatutorysetupSocsoRRate = '" + pera.employeestatutorysetupSocsoRRate +"', employeestatutorysetupEISERate = '" + pera.employeestatutorysetupEISERate +"', employeestatutorysetupEISRRate = '" + pera.employeestatutorysetupEISRRate +"', employeestatutorysetupPCBERate = '" + pera.employeestatutorysetupPCBERate +"', createdBy = '" + pera.createdBy +"', createdDate = " + pera.createdDate +" where employeestatutorysetupId = '" +  pera.employeestatutorysetupId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployeestatutorysetup set " + column + " where employeestatutorysetupId = " + id + " ";
return strquery;
};

exports.data = method;
