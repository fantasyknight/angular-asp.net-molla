var express = require('express');
var route = express.Router();

//todo. Payroll Service
var payroll = require('../../routes/payroll/payroll');
route.use('/api/payroll', payroll);

//todo. Payroll Additional-Pay Service
var payrolladditionalpay = require('../../routes/payroll/payrolladditionalpay');
route.use('/api/payrolladditionalpay', payrolladditionalpay);

//todo. Payroll Allowancen Deduction Service
var payrollallowancendeduction = require('../../routes/payroll/payrollallowancendeduction');
route.use('/api/payrollallowancendeduction', payrollallowancendeduction);

//todo. Payroll Attendance Service
var payrollattendance = require('../../routes/payroll/payrollattendance');
route.use('/api/payrollattendance', payrollattendance);

//todo. Payroll Daily-Wage Service
var payrolldailywage = require('../../routes/payroll/payrolldailywage');
route.use('/api/payrolldailywage', payrolldailywage);

//todo. Payroll Loan Service
var payrollloan = require('../../routes/payroll/payrollloan');
route.use('/api/payrollloan', payrollloan);

//todo. Payroll NPL Service
var payrollnpl = require('../../routes/payroll/payrollnpl');
route.use('/api/payrollnpl', payrollnpl);

//todo. Payroll Overtime Service
var payrollovertime = require('../../routes/payroll/payrollovertime');
route.use('/api/payrollovertime', payrollovertime);

//todo. Payroll Salary Service
var payrollsalary = require('../../routes/payroll/payrollsalary');
route.use('/api/payrollsalary', payrollsalary);

//todo. Payroll Shift Service
var payrollshift = require('../../routes/payroll/payrollshift');
route.use('/api/payrollshift', payrollshift);

//todo. Payroll Statutory Service
var payrollstatutory = require('../../routes/payroll/payrollstatutory');
route.use('/api/payrollstatutory', payrollstatutory);

module.exports = route;