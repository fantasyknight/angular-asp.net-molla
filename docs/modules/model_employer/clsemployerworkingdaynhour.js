var method = {};

method.masterData = (request) => {
let employerworkingdaynhourId = request.body.employerworkingdaynhourId || 0 ;
let employerId = request.body.employerId || 0 ;
let employerworkingdaynhourMonth = request.body.employerworkingdaynhourMonth || 0 ;
let employerworkingdaynhourMonthlyPayDays = request.body.employerworkingdaynhourMonthlyPayDays || 0 ;
let employerworkingdaynhourDailyPayDays = request.body.employerworkingdaynhourDailyPayDays || 0 ;
let employerworkingdaynhourOTDays = request.body.employerworkingdaynhourOTDays || 0 ;
let employerworkingdaynhourOTHours = request.body.employerworkingdaynhourOTHours || 0 ;
let employerworkingdaynhourAddPayDays = request.body.employerworkingdaynhourAddPayDays || 0 ;
let employerworkingdaynhourMonthlyPayHours = request.body.employerworkingdaynhourMonthlyPayHours || 0 ;
let employerworkingdaynhourDailyPayHours = request.body.employerworkingdaynhourDailyPayHours || 0 ;
let createdBy = request.body.createdBy || 0 ;
let createdDate = request.body.createdDate || null ;
return { employerworkingdaynhourId,employerId,employerworkingdaynhourMonth,employerworkingdaynhourMonthlyPayDays,employerworkingdaynhourDailyPayDays,employerworkingdaynhourOTDays,employerworkingdaynhourOTHours,employerworkingdaynhourAddPayDays,employerworkingdaynhourMonthlyPayHours,employerworkingdaynhourDailyPayHours,createdBy,createdDate };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployerworkingdaynhour where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employerworkingdaynhourId,employerId,employerworkingdaynhourMonth,employerworkingdaynhourMonthlyPayDays,employerworkingdaynhourDailyPayDays,employerworkingdaynhourOTDays,employerworkingdaynhourOTHours,employerworkingdaynhourAddPayDays,employerworkingdaynhourMonthlyPayHours,employerworkingdaynhourDailyPayHours,createdBy,createdDate from tblemployerworkingdaynhour where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployerworkingdaynhour where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployerworkingdaynhour where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployerworkingdaynhour where 1 = 1 and employerworkingdaynhourId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployerworkingdaynhour where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "insert into tblemployerworkingdaynhour (employerId, employerworkingdaynhourMonth, employerworkingdaynhourMonthlyPayDays, employerworkingdaynhourDailyPayDays, employerworkingdaynhourOTDays, employerworkingdaynhourOTHours, employerworkingdaynhourAddPayDays, employerworkingdaynhourMonthlyPayHours, employerworkingdaynhourDailyPayHours, createdBy, createdDate) values ('" + pera.employerId +"', '" + pera.employerworkingdaynhourMonth +"', '" + pera.employerworkingdaynhourMonthlyPayDays +"', '" + pera.employerworkingdaynhourDailyPayDays +"', '" + pera.employerworkingdaynhourOTDays +"', '" + pera.employerworkingdaynhourOTHours +"', '" + pera.employerworkingdaynhourAddPayDays +"', '" + pera.employerworkingdaynhourMonthlyPayHours +"', '" + pera.employerworkingdaynhourDailyPayHours +"', '" + pera.createdBy +"', " + pera.createdDate +")";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployerworkingdaynhour (employerId, employerworkingdaynhourMonth, employerworkingdaynhourMonthlyPayDays, employerworkingdaynhourDailyPayDays, employerworkingdaynhourOTDays, employerworkingdaynhourOTHours, employerworkingdaynhourAddPayDays, employerworkingdaynhourMonthlyPayHours, employerworkingdaynhourDailyPayHours, createdBy, createdDate) values ";
return strquery;
};

method.update = function (pera) {
if (pera.createdDate == null) pera.createdDate = null;  else pera.createdDate = "'" + pera.createdDate + "'";

var strquery = "update tblemployerworkingdaynhour set employerId = '" + pera.employerId +"', employerworkingdaynhourMonth = '" + pera.employerworkingdaynhourMonth +"', employerworkingdaynhourMonthlyPayDays = '" + pera.employerworkingdaynhourMonthlyPayDays +"', employerworkingdaynhourDailyPayDays = '" + pera.employerworkingdaynhourDailyPayDays +"', employerworkingdaynhourOTDays = '" + pera.employerworkingdaynhourOTDays +"', employerworkingdaynhourOTHours = '" + pera.employerworkingdaynhourOTHours +"', employerworkingdaynhourAddPayDays = '" + pera.employerworkingdaynhourAddPayDays +"', employerworkingdaynhourMonthlyPayHours = '" + pera.employerworkingdaynhourMonthlyPayHours +"', employerworkingdaynhourDailyPayHours = '" + pera.employerworkingdaynhourDailyPayHours +"', createdBy = '" + pera.createdBy +"', createdDate = " + pera.createdDate +" where employerworkingdaynhourId = '" +  pera.employerworkingdaynhourId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployerworkingdaynhour set " + column + " where employerworkingdaynhourId = " + id + " ";
return strquery;
};

exports.data = method;
