var method = {};

method.masterData = (request) => {
let employerPermissionSettingId = request.body.employerPermissionSettingId || 0 ;
let employerId = request.body.employerId || 0 ;
let employerPermissionSettingKey = request.body.employerPermissionSettingKey || '' ;
let employerPermissionSettingValue = request.body.employerPermissionSettingValue || '' ;
return { employerPermissionSettingId,employerId,employerPermissionSettingKey,employerPermissionSettingValue };
};

method.select = function (strwhere) {
var strquery = "select * from tblemployerpermissionsetting where 1 = 1 " + strwhere;
return strquery;
};

method.selectall = function (strwhere) {
var strquery = "select employerPermissionSettingId,employerId,employerPermissionSettingKey,employerPermissionSettingValue from tblemployerpermissionsetting where 1 = 1 " + strwhere;
return strquery;
};

method.selectcolumn = function (strcolumn,strwhere) {
var strquery = "select "+ strcolumn +" from tblemployerpermissionsetting where 1 = 1 " + strwhere;
return strquery;
};

method.getcount = function (strwhere) {
var strquery = "select count(*) as cnt from  tblemployerpermissionsetting where 1=1 " + strwhere;
return strquery;
};

method.delete = function (strwhere) {
var strquery = "delete from tblemployerpermissionsetting where 1 = 1 and employerPermissionSettingId = " + strwhere;
return strquery;
};

method.deleteString = function (strwhere) {
var strquery = "delete from tblemployerpermissionsetting where 1 = 1 " + strwhere;
return strquery;
};

method.insert = function (pera) {
var strquery = "insert into tblemployerpermissionsetting (employerId, employerPermissionSettingKey, employerPermissionSettingValue) values ('" + pera.employerId +"', '" + pera.employerPermissionSettingKey +"', '" + pera.employerPermissionSettingValue +"')";
return strquery;
};

method.insertString = function () {
var strquery = "insert into tblemployerpermissionsetting (employerId, employerPermissionSettingKey, employerPermissionSettingValue) values ";
return strquery;
};

method.update = function (pera) {
var strquery = "update tblemployerpermissionsetting set employerId = '" + pera.employerId +"', employerPermissionSettingKey = '" + pera.employerPermissionSettingKey +"', employerPermissionSettingValue = '" + pera.employerPermissionSettingValue +"' where employerPermissionSettingId = '" +  pera.employerPermissionSettingId +"' ";
return strquery;
};

method.updateColumn = function (column,id) {
var strquery = "update tblemployerpermissionsetting set " + column + " where employerPermissionSettingId = " + id + " ";
return strquery;
};

exports.data = method;
