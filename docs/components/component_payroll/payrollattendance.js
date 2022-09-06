const moment = require("moment");
/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clspayrollattendance = require("../../modules/model_payroll/clspayrollattendance");
const _clsemployeedailyattendance = require("../../modules/model_employee/clsemployeedailyattendance");
const _clsemployeesalarysetup = require("../../modules/model_employee/clsemployeesalarysetup");

let self = module.exports = {

    fetchEmployerId: (request) => {
        try {

            let decryptionData = dbSecurity._decryption(request.body.employerId);
            if (decryptionData.encryption == false) {
                return {
                    'flag': false,
                    'query': 'No valid employerId'
                };
            }

            return decryptionData.decrypt;
        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelection: (request, response) => {
        try {

            let strquery = _clspayrollattendance.data.select("");
            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelect: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            let fromDate = request.body.fromDate;
            let toDate = request.body.toDate;

            let employeeId = request.body.employeeId || '';
            let employerdepartmentId = request.body.employerdepartmentId || '';
            let employerbranchId = request.body.employerbranchId || '';

            strwhere += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d') ";
            strwhere += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d') ";
            if (employeeId != '')
                strwhere += " and employeeId in (" + employeeId + ")";
            if (employerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + employerdepartmentId + ")";
            if (employerbranchId != '')
                strwhere += " and employerbranchId in (" + employerbranchId + ")";
            strwhere += " and employerId = " + employerId;
            strwhere += " order by payrollDate asc ";

            let strquery = _clspayrollattendance.data.select_distinct(strwhere);
            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelectAll: (request, response) => {
        try {

            let date = request.body.date;
            let employerdepartmentId = request.body.employerdepartmentId || '';
            let employerbranchId = request.body.employerbranchId || '';

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            strwhere += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') = DATE_FORMAT('" + date + "', '%Y-%m-%d') ";
            if (employerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + employerdepartmentId + ")";
            if (employerbranchId != '')
                strwhere += " and employerbranchId in (" + employerbranchId + ")";
            strwhere += " order by memberName ";

            let strquery = _clspayrollattendance.data.select_view_payrollattendance(strwhere + strlimit);
            let strcount = _clspayrollattendance.data.getcount_view_payrollattendance(strwhere);

            return {
                'flag': true,
                'query': strquery + ";" + strcount
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbDelete: async (request, response) => {
        try {

            let verb = _clspayrollattendance.data.masterData(request);
            let strquery = _clspayrollattendance.data.delete(verb.payrollAttendanceId);

            let strCount = _clspayrollattendance.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let verb = _clspayrollattendance.data.masterData(request);
            let strquery = _clspayrollattendance.data.insert(verb);

            let strCount = _clspayrollattendance.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let verb = _clspayrollattendance.data.masterData(request);
            let strquery = _clspayrollattendance.data.update(verb);

            let strCount = _clspayrollattendance.data.getcount("");
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };
            // return { 'flag': true, 'count': [{ cnt: 0 }], 'query': strquery };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdateManual: async (request, response) => {
        try {

            let payrollAttendanceId = request.body.payrollAttendanceId;
            let payrollBasicSalary = request.body.payrollBasicSalary;
            let payrollNetSalary = request.body.payrollNetSalary;

            let strquery = _clspayrollattendance.data.updateColumn(" payrollNetSalary = " + payrollNetSalary + ", payrollBasicSalary = " + payrollBasicSalary + " ", payrollAttendanceId);

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbAttendanceSalaryCalculation: async (request, response) => {

        let employerId = self.fetchEmployerId(request);

        let fromDate = request.body.fromDate;
        let toDate = request.body.toDate;

        let employeeId = request.body.employeeId || '';

        const pool = await dbSecurity.asyncDbConnection();
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {

            /* 
            ! verify attedance data in payroll
            ? if there's a records then need to remove first based on employee, department, branch selection
            */
            let strwhereRemove = '';
            strwhereRemove += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d') ";
            strwhereRemove += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d') ";
            if (employeeId != '')
                strwhereRemove += " and employeeId in (" + employeeId + ")";
            strwhereRemove += " and employerId = " + employerId;

            let removePayrollAttendace = _clspayrollattendance.data.deleteString(strwhereRemove);
            let [strRemovePayrollAttendace, _strRemovePayrollAttendace] = await connection.query(removePayrollAttendace);
            //! attedance data for process

            let strwhere = '';
            strwhere += " and DATE_FORMAT(entryDate, '%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d') ";
            strwhere += " and DATE_FORMAT(entryDate, '%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d') ";
            if (employeeId != '')
                strwhere += " and employeeId in (" + employeeId + ")";
            strwhere += " and employerId = " + employerId;
            let dailyAttendanceData = _clsemployeedailyattendance.data.select(strwhere);
            let [strDailyAttendanceData, _strDailyAttendanceData] = await connection.query(dailyAttendanceData);

            let masterData = [];
            if (strDailyAttendanceData.length > 0) {
                let employeeData = _clsemployeesalarysetup.data.select(" and employeesalarysetupPaymentRate = 'Hour' and employerId = " + employerId);
                let [strEmployeeData, _strEmployeeData] = await connection.query(employeeData);

                if (strEmployeeData.length > 0) {
                    for (let i = 0; i < strEmployeeData.length; i++) {

                        let employeeId = strEmployeeData[i].employeeId;
                        let employeesalarysetupCurrentBasic = strEmployeeData[i].employeesalarysetupCurrentBasic;

                        let filterAttendanceData = strDailyAttendanceData.filter(x => x.employeeId == employeeId);
                        if (filterAttendanceData.length > 0) {
                            for (let j = 0; j < filterAttendanceData.length; j++) {
                                let verb = {};
                                verb.employeeId = employeeId;
                                verb.employerId = employerId;
                                verb.payrollDate = moment(filterAttendanceData[j].entryDate).format("YYYY-MM-DD");
                                if (filterAttendanceData[j].actInTime != null)
                                    verb.payrollInTime = moment(filterAttendanceData[j].actInTime).format("YYYY-MM-DD HH:mm:ss");
                                else
                                    verb.payrollInTime = null;

                                if (filterAttendanceData[j].actOutTime_Full != null)
                                    verb.payrollOutTime = moment(filterAttendanceData[j].actOutTime_Full).format("YYYY-MM-DD HH:mm:ss");
                                else
                                    verb.payrollOutTime = null;
                                verb.payrollBasicSalary = employeesalarysetupCurrentBasic;

                                if (filterAttendanceData[j].actOutTime_Full != null && filterAttendanceData[j].actInTime != null) {
                                    var a = moment(verb.payrollInTime).format("YYYY-MM-DD HH:mm:ss");
                                    var b = moment(verb.payrollOutTime).format("YYYY-MM-DD HH:mm:ss");
                                    let diffMin = moment(b).diff(moment(a), 'hours');
                                    let _salaryTotal = verb.payrollBasicSalary * diffMin;
                                    verb.payrollNetSalary = _salaryTotal;
                                } else {
                                    verb.payrollNetSalary = 0;
                                }
                                masterData.push(verb);
                            }
                        }
                    }
                }
            }

            if (masterData.length > 0) {
                strInsertData = "";
                strInsertData = _clspayrollattendance.data.insertString();
                for (let i = 0; i < masterData.length; i++) {
                    let _payrollOutTime = null;
                    if (masterData[i].payrollOutTime != null)
                        _payrollOutTime = "'" + masterData[i].payrollOutTime + "'";

                    let _payrollInTime = null;
                    if (masterData[i].payrollInTime != null)
                    _payrollInTime = "'" + masterData[i].payrollInTime + "'";

                    if (i != 0)
                        strInsertData += ",";
                    strInsertData += "(" + masterData[i].employerId + "," + masterData[i].employeeId + " , '" + masterData[i].payrollDate 
                    + "'," + _payrollInTime +", " + _payrollOutTime + " ," + masterData[i].payrollBasicSalary + " , " + masterData[i].payrollNetSalary + ", now())";
                }
                let [masterInsert, _masterInsert] = await connection.query(strInsertData);
                await connection.commit();
            }

            connection.release();
            connection.destroy();

            return {
                'flag': true,
                'query': "Salary exection process is complated!"
            };
        } catch (error) {
            await connection.rollback();
            connection.release();
            connection.destroy();
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbReportAttendance: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            let fromDate = request.body.fromDate;
            let toDate = request.body.toDate;

            let employeeId = request.body.employeeId || '';
            let employerdepartmentId = request.body.employerdepartmentId || '';
            let employerbranchId = request.body.employerbranchId || '';

            let isPaymentMethod = request.body.isPaymentMethod || false;

            strwhere += " and employerId = " + employerId;
            strwhere += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') >= DATE_FORMAT('" + fromDate + "', '%Y-%m-%d') ";
            strwhere += " and DATE_FORMAT(payrollDate, '%Y-%m-%d') <= DATE_FORMAT('" + toDate + "', '%Y-%m-%d') ";

            if (employeeId != '')
                strwhere += " and employeeId in (" + employeeId + ")";
            if (employerdepartmentId != '')
                strwhere += " and employerdepartmentId in (" + employerdepartmentId + ")";
            if (employerbranchId != '')
                strwhere += " and employerbranchId in (" + employerbranchId + ")";
            if (isPaymentMethod == true)
                strwhere += " GROUP BY employeeId ";
            strwhere += " order by memberName ";

            let strquery = '';
            if (isPaymentMethod == false)
                strquery = _clspayrollattendance.data.select_view_payrollattendance_report(strwhere);
            else
                strquery = _clspayrollattendance.data.select_view_payrollattendance_payment_method_report(strwhere);

            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};