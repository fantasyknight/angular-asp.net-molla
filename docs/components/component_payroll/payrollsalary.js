/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clspayrollsalary = require("../../modules/model_payroll/clspayrollsalary");
const _clspayrollstatutory = require("../../modules/model_payroll/clspayrollstatutory");
const _clspayrollnpl = require("../../modules/model_payroll/clspayrollnpl");
const _clspayrollshift = require("../../modules/model_payroll/clspayrollshift");
const _clspayrolladditionalpay = require("../../modules/model_payroll/clspayrolladditionalpay");
const _clspayrollovertime = require("../../modules/model_payroll/clspayrollovertime");
const _clspayrollallowancendeduction = require("../../modules/model_payroll/clspayrollallowancendeduction");
const _clspayrollloan = require("../../modules/model_payroll/clspayrollloan");

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

            let strquery = _clspayrollsalary.data.select("");
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

            let verb = _clspayrollsalary.data.masterData(request);
            let strquery = _clspayrollsalary.data.select(" and payrollsalaryId = " + verb.payrollsalaryId);
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

            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || "";
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || "";
            let SearchEmployeeId = request.body.SearchEmployeeId || "";
            let SortBy = request.body.SortBy || "";

            let payrollId = request.body.payrollId;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchEmployerbranchId != "")
                strwhere += " and employerbranchId = " + SearchEmployerbranchId;
            if (SearchEmployerdepartmentId != "")
                strwhere += " and employerdepartmentId = " + SearchEmployerdepartmentId;
            if (SearchEmployeeId != "")
                strwhere += " and employeeId = " + SearchEmployeeId;

            strwhere += " and payrollId = " + payrollId;

            if (SortBy == 'employeeEnroll')
                strwhere += " order by employeeEnroll desc ";
            if (SortBy == 'memberName')
                strwhere += " order by memberName asc ";
            if (SortBy == 'employeeJoining')
                strwhere += " order by employeeJoining asc ";
            if (SortBy == 'employerdepartmentTitle')
                strwhere += " order by employerdepartmentTitle,memberName asc ";
            if (SortBy == 'employerbranchName')
                strwhere += " order by employerbranchName,memberName asc ";

            let strquery = _clspayrollsalary.data.select_view_payrollsalary(strwhere + strlimit);
            let strcount = _clspayrollsalary.data.getcount_view_payrollsalary(strwhere);

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

            let verb = _clspayrollsalary.data.masterData(request);
            let strquery = _clspayrollsalary.data.delete(verb.payrollsalaryId);

            let strCount = _clspayrollsalary.data.getcount("");
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

            let verb = _clspayrollsalary.data.masterData(request);
            let strquery = _clspayrollsalary.data.insert(verb);

            let strCount = _clspayrollsalary.data.getcount("");
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

            let verb = _clspayrollsalary.data.masterData(request);
            let strquery = _clspayrollsalary.data.update(verb);

            let strCount = _clspayrollsalary.data.getcount("");
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

    dbSelectAllDetail: (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let payrollsalaryId = request.body.payrollsalaryId;
            let employeeId = request.body.employeeId;

            let strSelectPayrollSalary = _clspayrollsalary.data.select_view_payrollsalary(" and payrollsalaryId = " + payrollsalaryId + " and employeeId = " + employeeId + " and employerId = " + employerId);
            let strSelectPayrollStatutory = _clspayrollstatutory.data.select_view_payrollstatutory(" and payrollsalaryId = " + payrollsalaryId);
            let strSelectPayrollNPL = _clspayrollnpl.data.select_view_payrollnpl(" and payrollsalaryId = " + payrollsalaryId);
            let strSelectPayrollShift = _clspayrollshift.data.select_view_payrollshift(" and payrollsalaryId = " + payrollsalaryId);
            let strSelectPayrollAdditionalPay = _clspayrolladditionalpay.data.select_view_payrolladditionalpay(" and payrollsalaryId = " + payrollsalaryId);
            let strSelectPayrollOvertime = _clspayrollovertime.data.select_view_payrollovertime(" and payrollsalaryId = " + payrollsalaryId);
            let strSelectAllowancenDeduction = _clspayrollallowancendeduction.data.select_view_payrollallowancendeduction(" and payrollsalaryId = " + payrollsalaryId);
            let strSelectLoan = _clspayrollloan.data.select_view_payrollloan(" and payrollsalaryId = " + payrollsalaryId);

            return {
                'flag': true,
                'query': [{
                    "payrollsalary": strSelectPayrollSalary,
                    "payrollstatutory": strSelectPayrollStatutory,
                    "payrollnpl": strSelectPayrollNPL,
                    "payrollshift": strSelectPayrollShift,
                    "payrolladditionalpay": strSelectPayrollAdditionalPay,
                    "payrollovertime": strSelectPayrollOvertime,
                    "payrollallowancendeduction": strSelectAllowancenDeduction,
                    "payrollloan": strSelectLoan
                }]
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};