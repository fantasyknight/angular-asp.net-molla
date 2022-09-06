var method = {};

method.masterData = (request) => {
let employeenplsetupId = request.body.employeenplsetupId || 0 ;
let employerId = request.body.employerId || 0 ;
let employeeId = request.body.employeeId || 0 ;
let employeenplsetupDayRate = request.body.employeenplsetupDayRate || 0.0 ;
let employeenplsetupHourRate = request.body.employeenplsetupHourRate || 0.0 ;
let createdBy = request.body.createdBy || 0 ;
let createdDate = request.body.createdDate || null ;
return { employeenplsetupId,employerId,employeeId,employeenplsetupDayRate,employeenplsetupHourRate,createdBy,createdDate };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployeenplsetup where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employeenplsetupId,employerId,employeeId,employeenplsetupDayRate,employeenplsetupHourRate,createdBy,createdDate from tblemployeenplsetup where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployeenplsetup where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployeenplsetup where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployeenplsetup where 1 = 1 and employeenplsetupId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployeenplsetup where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "insert into tblemployeenplsetup (employerId, employeeId, employeenplsetupDayRate, employeenplsetupHourRate, createdBy, createdDate) values ('" + pera.employerId +"', '" + pera.employeeId +"', '" + pera.employeenplsetupDayRate +"', '" + pera.employeenplsetupHourRate +"', '" + pera.createdBy +"', " + pera.createdDate +")";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployeenplsetup (employerId, employeeId, employeenplsetupDayRate, employeenplsetupHourRate, createdBy, createdDate) values ";
return strquery;
};

method.update = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "update tblemployeenplsetup set employerId = '" + pera.employerId +"', employeeId = '" + pera.employeeId +"', employeenplsetupDayRate = '" + pera.employeenplsetupDayRate +"', employeenplsetupHourRate = '" + pera.employeenplsetupHourRate +"', createdBy = '" + pera.createdBy +"', createdDate = " + pera.createdDate +" where employeenplsetupId = '" +  pera.employeenplsetupId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployeenplsetup set " + column + " where employeenplsetupId = " + id + " ";
return strquery;
};

exports.data = method;
