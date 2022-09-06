var express = require('express');
var route = express.Router();

//todo. Employer Service
var employer = require('../../routes/employer/employer');
route.use('/api/employer', employer);

//todo. Employer Company Setting Service
var companysetting = require('../../routes/employer/companysetting');
route.use('/api/companysetting', companysetting);

//todo. Employer Branch Service
var employerbranch = require('../../routes/employer/employerbranch');
route.use('/api/employerbranch', employerbranch);

//todo. Employer Department Service
var employerdepartment = require('../../routes/employer/employerdepartment');
route.use('/api/employerdepartment', employerdepartment);

//todo. Employer Setting Service
var employersetting = require('../../routes/employer/employersetting');
route.use('/api/employersetting', employersetting);

//todo. Employer Entitlement Service
var employerentitlement = require('../../routes/employer/employerentitlement');
route.use('/api/employerentitlement', employerentitlement);

//todo. Employer Facility Service
var employerfacility = require('../../routes/employer/employerfacility');
route.use('/api/employerfacility', employerfacility);

//todo. Employer Subscription Service
var employersubscription = require('../../routes/employer/employersubscription');
route.use('/api/employersubscription', employersubscription);

//todo. Employer Subscription Top-up Service
var employersubscriptiontopup = require('../../routes/employer/employersubscriptiontopup');
route.use('/api/employersubscriptiontopup', employersubscriptiontopup);

//todo. Employer Holiday Service
var employerholiday = require('../../routes/employer/employerholiday');
route.use('/api/employerholiday', employerholiday);

//todo. Employer Master Shift Service
var employermastershift = require('../../routes/employer/employermastershift');
route.use('/api/employermastershift', employermastershift);

//todo. Employer Leave Type Service
var employerleavetype = require('../../routes/employer/employerleavetype');
route.use('/api/employerleavetype', employerleavetype);

//todo. Employer Leave Type Entitlement Service
var employerleavetypeentitlement = require('../../routes/employer/employerleavetypeentitlement');
route.use('/api/employerleavetypeentitlement', employerleavetypeentitlement);

//todo. Employer Device Service
var machinelist = require('../../routes/employer/machinelist');
route.use('/api/machinelist', machinelist);

//todo. Employer Machine Connection Service
var machineConnection = require('../../routes/employer/machineConnection');
route.use('/api/machineConnection', machineConnection);

//!Employee
//todo. Employer Employee Service
var employee = require('../../routes/employee/employee');
route.use('/api/employee', employee);

//todo. Employer Employee Salary Setup Service
var employeesalarysetup = require('../../routes/employee/employeesalarysetup');
route.use('/api/employeesalarysetup', employeesalarysetup);

//todo. Employer Employee Allowancen Deduction Service
var employeeallowancendeduction = require('../../routes/employee/employeeallowancendeduction');
route.use('/api/employeeallowancendeduction', employeeallowancendeduction);

//todo. Employer Employee Loan Service
var employeeloan = require('../../routes/employee/employeeloan');
route.use('/api/employeeloan', employeeloan);

//todo. Employer Employee Shift Service
var employeeshiftsetup = require('../../routes/employee/employeeshiftsetup');
route.use('/api/employeeshiftsetup', employeeshiftsetup);

//todo. Employer Employee Over-Time Service
var employeeotsetup = require('../../routes/employee/employeeotsetup');
route.use('/api/employeeotsetup', employeeotsetup);

//todo. Employer Employee Additional-Pay Service
var employeeadditionalpaysetup = require('../../routes/employee/employeeadditionalpaysetup');
route.use('/api/employeeadditionalpaysetup', employeeadditionalpaysetup);

//todo. Employer Employee NPL Service
var employeenplsetup = require('../../routes/employee/employeenplsetup');
route.use('/api/employeenplsetup', employeenplsetup);

//todo. Employer Employee Statutory Service
var employeestatutorysetup = require('../../routes/employee/employeestatutorysetup');
route.use('/api/employeestatutorysetup', employeestatutorysetup);

//todo. Employer Employee Dependent Service
var employeedependent = require('../../routes/employee/employeedependent');
route.use('/api/employeedependent', employeedependent);

//todo. Employer Employee Leave Entitlement Service
var employeeleaveentitlement = require('../../routes/employee/employeeleaveentitlement');
route.use('/api/employeeleaveentitlement', employeeleaveentitlement);

//todo. Employer Employee Shift Service
var employeeassignshift = require('../../routes/employee/employeeassignshift');
route.use('/api/employeeassignshift', employeeassignshift);

//todo. Employer Employee Leave Application Service
var employeeleaveapplication = require('../../routes/employee/employeeleaveapplication');
route.use('/api/employeeleaveapplication', employeeleaveapplication);

//todo. Employer Employee Leave Report Service
var employeeleavereport = require('../../routes/employee/employeeleavereport');
route.use('/api/employeeleavereport', employeeleavereport);

//#region Attendance
//todo. Employee Attendance
var employeeattendance = require('../../routes/employee/employeeattendance');
route.use('/api/employeeattendance', employeeattendance);

//todo. Employee Daily-Attendance
var employeedailyattendance = require('../../routes/employee/employeedailyattendance');
route.use('/api/employeedailyattendance', employeedailyattendance);
//#endregion

//#region Payroll
//todo. Employer Additional-Pay setup 
var employeradditionalpaysetup = require('../../routes/employer/employeradditionalpaysetup');
route.use('/api/employeradditionalpaysetup', employeradditionalpaysetup);

//todo. Employer Global Payroll 
var employerglobalpayroll = require('../../routes/employer/employerglobalpayroll');
route.use('/api/employerglobalpayroll', employerglobalpayroll);

//todo. Employer OT Setup 
var employerotsetup = require('../../routes/employer/employerotsetup');
route.use('/api/employerotsetup', employerotsetup);

//todo. Employer Shift Setup 
var employershiftsetup = require('../../routes/employer/employershiftsetup');
route.use('/api/employershiftsetup', employershiftsetup);

//todo. Employer Shift Setup 
var employerallowance = require('../../routes/employer/employerallowance');
route.use('/api/employerallowance', employerallowance);
//#endregion

//#region Utility
//todo 1. Employer Setting
var employerpermissionsetting = require('../../routes/employer/employerpermissionsetting');
route.use('/api/employerpermissionsetting', employerpermissionsetting);

//todo 2. Employer Template
var employertemplate = require('../../routes/employer/employertemplate');
route.use('/api/employertemplate', employertemplate);

//todo 3. Employer Template-Page
var employertemplatepage = require('../../routes/employer/employertemplatepage');
route.use('/api/employertemplatepage', employertemplatepage);

//todo 4. Employer User Rights
var employeruserright = require('../../routes/employer/employeruserright');
route.use('/api/employeruserright', employeruserright);
//#endregion

module.exports = route;