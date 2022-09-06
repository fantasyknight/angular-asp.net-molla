var method = {};

method.masterData = (request) => {
let employerroundingopionpayId = request.body.employerroundingopionpayId || 0 ;
let employerId = request.body.employerId || 0 ;
let employerroundingopionpayGrossPay = request.body.employerroundingopionpayGrossPay || '' ;
let employerroundingopionpayNetRate = request.body.employerroundingopionpayNetRate || '' ;
let employerroundingopionpayOvertimeRate = request.body.employerroundingopionpayOvertimeRate || '' ;
let createdBy = request.body.createdBy || 0 ;
let createdDate = request.body.createdDate || null ;
return { employerroundingopionpayId,employerId,employerroundingopionpayGrossPay,employerroundingopionpayNetRate,employerroundingopionpayOvertimeRate,createdBy,createdDate };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployerroundingopionpay where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employerroundingopionpayId,employerId,employerroundingopionpayGrossPay,employerroundingopionpayNetRate,employerroundingopionpayOvertimeRate,createdBy,createdDate from tblemployerroundingopionpay where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployerroundingopionpay where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployerroundingopionpay where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployerroundingopionpay where 1 = 1 and employerroundingopionpayId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployerroundingopionpay where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "insert into tblemployerroundingopionpay (employerId, employerroundingopionpayGrossPay, employerroundingopionpayNetRate, employerroundingopionpayOvertimeRate, createdBy, createdDate) values ('" + pera.employerId +"', '" + pera.employerroundingopionpayGrossPay +"', '" + pera.employerroundingopionpayNetRate +"', '" + pera.employerroundingopionpayOvertimeRate +"', '" + pera.createdBy +"', " + pera.createdDate +")";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployerroundingopionpay (employerId, employerroundingopionpayGrossPay, employerroundingopionpayNetRate, employerroundingopionpayOvertimeRate, createdBy, createdDate) values ";
return strquery;
};

method.update = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "update tblemployerroundingopionpay set employerId = '" + pera.employerId +"', employerroundingopionpayGrossPay = '" + pera.employerroundingopionpayGrossPay +"', employerroundingopionpayNetRate = '" + pera.employerroundingopionpayNetRate +"', employerroundingopionpayOvertimeRate = '" + pera.employerroundingopionpayOvertimeRate +"', createdBy = '" + pera.createdBy +"', createdDate = " + pera.createdDate +" where employerroundingopionpayId = '" +  pera.employerroundingopionpayId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployerroundingopionpay set " + column + " where employerroundingopionpayId = " + id + " ";
return strquery;
};

exports.data = method;
