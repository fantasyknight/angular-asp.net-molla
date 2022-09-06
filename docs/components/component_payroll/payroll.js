let moment = require("moment");
/* common */
const dbSecurity = require("../../config/dbSecurity");
const dbCommon = require("../../config/dbCommon");
/* class */
const _clspayroll = require("../../modules/model_payroll/clspayroll");
const _clspayrollsalary = require("../../modules/model_payroll/clspayrollsalary");
const _clspayrollstatutory = require("../../modules/model_payroll/clspayrollstatutory");
const _clspayrollnpl = require("../../modules/model_payroll/clspayrollnpl");
const _clspayrollshift = require("../../modules/model_payroll/clspayrollshift");
const _clspayrollovertime = require("../../modules/model_payroll/clspayrollovertime");
const _clspayrolladditionalpay = require("../../modules/model_payroll/clspayrolladditionalpay");
const _clspayrollallowancendeduction = require("../../modules/model_payroll/clspayrollallowancendeduction");
const _clspayrollloan = require("../../modules/model_payroll/clspayrollloan");
//.
const _clsmasterepflist = require("../../modules/model_backoffice/clsmasterepflist");
const _clsmastersocsolist = require("../../modules/model_backoffice/clsmastersocsolist");
const _clsmasteresilist = require("../../modules/model_backoffice/clsmasteresilist");
const _clsmasterhrdflist = require("../../modules/model_backoffice/clsmasterhrdflist");
//.
const _clsemployeradditionalpaysetup = require("../../modules/model_employer/clsemployeradditionalpaysetup");
const _clsemployerotsetup = require("../../modules/model_employer/clsemployerotsetup");
const _clsemployershiftsetup = require("../../modules/model_employer/clsemployershiftsetup");
const _clsemployerallowance = require("../../modules/model_employer/clsemployerallowance");
const _clsemployerpermissionsetting = require("../../modules/model_employer/clsemployerpermissionsetting");
const _clsemployerglobalpayroll = require("../../modules/model_employer/clsemployerglobalpayroll");
//.
const _clsemployee = require("../../modules/model_employee/clsemployee");
const _clsemployeedailyattendance = require("../../modules/model_employee/clsemployeedailyattendance");
const _clsemployeeadditionalpaysetup = require("../../modules/model_employee/clsemployeeadditionalpaysetup");
const _clsemployeeotsetup = require("../../modules/model_employee/clsemployeeotsetup");
const _clsemployeeshiftsetup = require("../../modules/model_employee/clsemployeeshiftsetup");
const _clsemployeeloan = require("../../modules/model_employee/clsemployeeloan");
const _clsemployeeallowancendeduction = require("../../modules/model_employee/clsemployeeallowancendeduction");
const _clsemployeesalarysetup = require("../../modules/model_employee/clsemployeesalarysetup");
const _clsemployeeleavereport = require("../../modules/model_employee/clsemployeeleavereport");
//.
const _clsemployer = require("../../modules/model_employer/clsemployer");

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

            let strquery = _clspayroll.data.select("");
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
            let payrollYear = request.body.payrollYear || "";
            let payrollMonth = request.body.payrollMonth || "";

            strwhere += " and employerId = " + employerId;

            if (payrollYear != "")
                strwhere += " and payrollYear = " + payrollYear;

            if (payrollMonth != "")
                strwhere += " and payrollMonth = " + payrollMonth;

            let strquery = _clspayroll.data.select(strwhere);
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

            let payrollDate = request.body.payrollDate;

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            let employerId = self.fetchEmployerId(request);

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and YEAR(payrollDate) = YEAR('" + payrollDate + "')";
            strwhere += " and employerId = " + employerId;
            strwhere += " order by payrollDate ASC ";

            let strquery = _clspayroll.data.select_view_payroll(strwhere + strlimit);
            let strcount = _clspayroll.data.getcount_view_payroll(strwhere);

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

            let verb = _clspayroll.data.masterData(request);
            let strquery = _clspayroll.data.delete(verb.payrollId);

            let strCount = _clspayroll.data.getcount("");
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

            let verb = _clspayroll.data.masterData(request);
            let strquery = _clspayroll.data.insert(verb);

            let strCount = _clspayroll.data.getcount("");
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

            let verb = _clspayroll.data.masterData(request);
            let strquery = _clspayroll.data.update(verb);

            let strCount = _clspayroll.data.getcount("");
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

    dbDeleteAll: async (request, response) => {
        try {

            let payrollId = request.body.payrollId;

            let strSelectPayrollSalary = _clspayrollsalary.data.select(" and payrollId = " + payrollId);
            let [strSelectPayrollSalaryResult, _strSelectPayrollSalaryResult] = await dbSecurity.asyncResult(strSelectPayrollSalary);

            if (strSelectPayrollSalaryResult.length > 0) {

                let payrollsalaryId = strSelectPayrollSalaryResult.map(x => x.payrollsalaryId);
                let payrollsalaryIdList = payrollsalaryId.toString();

                let strRemovePayroll = _clspayroll.data.deleteString(" and payrollId = " + payrollId);
                let strRemovePayrollSalary = _clspayrollsalary.data.deleteString(" and payrollId = " + payrollId);

                let strRemovePayrollStatutory = _clspayrollstatutory.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                let strRemovePayrollNPL = _clspayrollnpl.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                let strRemovePayrollShift = _clspayrollshift.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                let strRemovePayrollOvertime = _clspayrollovertime.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                let strRemovePayrollAdditionalPay = _clspayrolladditionalpay.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                let strRemovePayrollAllowancenDeduction = _clspayrollallowancendeduction.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                let strRemovePayrollLoan = _clspayrollloan.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");

                let [strRemovePayrollResult, _strRemovePayrollResult] = await dbSecurity.asyncResult(strRemovePayroll + ';' + strRemovePayrollSalary);
                let [strRemoveResult, _strRemoveResult] =
                await dbSecurity.asyncResult(strRemovePayrollStatutory +
                    ';' + strRemovePayrollNPL +
                    ';' + strRemovePayrollShift +
                    ';' + strRemovePayrollOvertime +
                    ';' + strRemovePayrollAdditionalPay +
                    ';' + strRemovePayrollAllowancenDeduction +
                    ';' + strRemovePayrollLoan);

            } else {
                let strRemovePayroll = _clspayroll.data.deleteString(" and payrollId = " + payrollId);
                let strRemovePayrollSalary = _clspayrollsalary.data.deleteString(" and payrollId = " + payrollId);

                let [strRemovePayrollResult, _strRemovePayrollResult] = await dbSecurity.asyncResult(strRemovePayroll + ';' + strRemovePayrollSalary);
            }

            return {
                'flag': true,
                'query': ""
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSalaryProcessExection: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let employeeWise = request.body.employeeWise;
            let payrollDate = request.body.payrollDate;
            let payrollYear = request.body.payrollYear;
            let payrollMonth = request.body.payrollMonth;

            let startOfMonthPayrollDate = moment(payrollDate).startOf('month').format('YYYY-MM-DD');
            let endOfMonthPayrollDate = moment(payrollDate).endOf('month').format('YYYY-MM-DD');
            let totalDaysPayrollDate = moment(payrollDate).daysInMonth();
            let yearOfPayrollDate = moment(payrollDate).format('YYYY');
            let monthOfPayrollDate = moment(payrollDate).format('MM');

            const pool = await dbSecurity.asyncDbConnection();
            const connection = await pool.getConnection();
            await connection.beginTransaction();

            try {

                let strwherePayroll = "";
                strwherePayroll += " and payrollYear = " + payrollYear;
                strwherePayroll += " and payrollMonth = " + payrollMonth;
                strwherePayroll += " and employerId = " + employerId;
                let strSelectPayroll = _clspayroll.data.select(strwherePayroll);
                let [strSelectPayrollResult, _strSelectPayrollResult] = await connection.query(strSelectPayroll);
                //#region - Fetch payrollId and remove records base on payrollId before inserting new records

                let processPayrollId = 0;
                if (strSelectPayrollResult.length > 0) {

                    let _value = strSelectPayrollResult[0].isLocked[0];

                    if (strSelectPayrollResult[0].isLocked[0] == 1) {
                        return {
                            'flag': true,
                            'query': "Salary exection stoped, Month is locked!"
                        };
                    }

                    processPayrollId = strSelectPayrollResult[0].payrollId;
                    let strwherePayrollSalary = "";
                    strwherePayrollSalary += " and payrollId = " + processPayrollId;
                    strwherePayrollSalary += " and employerId = " + employerId;
                    if (employeeWise != '')
                        strwherePayrollSalary += " and employeeId in ( " + employeeWise + ")";

                    let strPayrollSalary = _clspayrollsalary.data.selectall(strwherePayrollSalary);
                    let [strPayrollSalaryResult, _strPayrollSalaryResult] = await connection.query(strPayrollSalary);

                    if (strPayrollSalaryResult.length > 0) {
                        let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                        let payrollsalaryIdList = payrollsalaryId.toString();

                        let strPayrollSalaryRemove = _clspayrollsalary.data.deleteString(strwherePayrollSalary);
                        let strPayrollStatutoryRemove = _clspayrollstatutory.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                        let strPayrollNPLRemove = _clspayrollnpl.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                        let strPayrollAllowancenDeductionRemove = _clspayrollallowancendeduction.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                        let strPayrollLoanRemove = _clspayrollloan.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");

                        let [strPayrollRemove, _strPayrollRemove] = await connection.query(strPayrollSalaryRemove +
                            ";" + strPayrollStatutoryRemove +
                            ";" + strPayrollNPLRemove +
                            ";" + strPayrollAllowancenDeductionRemove +
                            ";" + strPayrollLoanRemove);
                    }

                } else {

                    let verbPayroll = _clspayroll.data.masterData(request);
                    let strInsertPayroll = _clspayroll.data.insert(verbPayroll);

                    let [strInsertPayrollProcessQueryResult, _strInsertPayrollProcessQueryResult] = await connection.query(strInsertPayroll);
                    processPayrollId = strInsertPayrollProcessQueryResult.insertId;
                }
                //#endregion

                //#region - Fetch Master EPF | SOCSO | ESI | Attendance

                let strSelectMasterEpfList = _clsmasterepflist.data.select_view_masterepflist("");
                let strSelectMasterSocsoList = _clsmastersocsolist.data.select("");
                let strSelectMasterEsiList = _clsmasteresilist.data.select("");
                let strSelectMasterhrdfList = _clsmasterhrdflist.data.select("");
                let strSelectAttendanceList = _clsemployeedailyattendance.data.select_UnitCalculation(employerId, yearOfPayrollDate, monthOfPayrollDate);

                let [strSelectMasterListResult, _strSelectMasterListResult] = await connection.query(
                    strSelectMasterEpfList +
                    ";" + strSelectMasterSocsoList +
                    ";" + strSelectMasterEsiList +
                    ";" + strSelectAttendanceList +
                    ";" + strSelectMasterhrdfList);

                let selectMasterEpfList = strSelectMasterListResult[0];
                let selectMasterSocsoList = strSelectMasterListResult[1];
                let selectMasterEsiList = strSelectMasterListResult[2];
                let selectAttendanceList = strSelectMasterListResult[3];
                let selectMasterhrdfList = strSelectMasterListResult[4];
                //#endregion

                //#region - Fetch Employer and Employee Additional-Pay | Overtime | Shift

                let strSelectEmployerAdditionalPaySetup = _clsemployeradditionalpaysetup.data.select(" and employerId = " + employerId);
                let strSelectEmployerOtSetup = _clsemployerotsetup.data.select(" and employerId = " + employerId);
                let strSelectEmployerShiftSetup = _clsemployershiftsetup.data.select(" and employerId = " + employerId);

                let strSelectEmployeeAdditionalPaySetup = _clsemployeeadditionalpaysetup.data.select_view_employeeadditionalpaysetup_salary(" and employerId = " + employerId);
                let strSelectEmployeeOtSetup = _clsemployeeotsetup.data.select_view_employeeotsetup_salary(" and employerId = " + employerId);
                let strSelectEmployeeShiftSetup = _clsemployeeshiftsetup.data.select_view_employeeshiftsetup_salary(" and employerId = " + employerId);

                let [strSelectEmployerListResult, _strSelectEmployerListResult] =
                await connection.query(strSelectEmployerAdditionalPaySetup +
                    ";" + strSelectEmployerOtSetup +
                    ";" + strSelectEmployerShiftSetup +
                    ";" + strSelectEmployeeAdditionalPaySetup +
                    ";" + strSelectEmployeeOtSetup +
                    ";" + strSelectEmployeeShiftSetup);

                let selectEmployerAdditionalPaySetup = strSelectEmployerListResult[0];
                let selectEmployerOtSetup = strSelectEmployerListResult[1];
                let selectEmployerShiftSetup = strSelectEmployerListResult[2];

                let selectEmployeeAdditionalPaySetup = strSelectEmployerListResult[3];
                let selectEmployeeOtSetup = strSelectEmployerListResult[4];
                let selectEmployeeShiftSetup = strSelectEmployerListResult[5];
                //#endregion

                //#region - Calculate salay process

                let strSelectSalary = '';
                if (employeeWise == '')
                    strSelectSalary = _clspayroll.data.sp_ExecuteSalaryProcessAll(employerId, startOfMonthPayrollDate, endOfMonthPayrollDate, totalDaysPayrollDate);
                else
                    strSelectSalary = _clspayroll.data.sp_ExecuteSalaryProcessEmployee(employeeWise, employerId, startOfMonthPayrollDate, endOfMonthPayrollDate, totalDaysPayrollDate);
                let [strSelectSalaryResult, _strSelectSalaryResult] = await connection.query(strSelectSalary);
                let responseResult = strSelectSalaryResult[0];
                //#endregion

                if (responseResult.length > 0) {

                    //#region - Fetch Employee Loan and Allowance and Master Permission

                    let strWhereEmployeeLoan = ` and date_format('` + startOfMonthPayrollDate + `', '%Y%m') between date_format(employeeloanFromDate, '%Y%m') and date_format(employeeloanToDate, '%Y%m') 
                    and employerId = ` + employerId;
                    let strSelectEmployeeLoan = _clsemployeeloan.data.select(strWhereEmployeeLoan);

                    let strWhereAllowancenDeduction = ` and (date('` + startOfMonthPayrollDate + `') between date(employeeallowancendeductionFromDate) and date(employeeallowancendeductionToDate))
                     and employerId = ` + employerId;
                    let strSelectAllowancenDeduction = _clsemployeeallowancendeduction.data.select_view_employeeallowancendeduction(strWhereAllowancenDeduction);

                    let strSelectPermissionSetting = _clsemployerpermissionsetting.data.select(" and employerId = " + employerId);

                    let strSelectPreviousMonth = _clspayroll.data.select(" and employerId = " + employerId + " AND YEAR(payrollDate) = " + payrollYear + " AND MONTH(payrollDate) < " + payrollMonth);

                    let [strSelectEmployeeLoanAllowancenPermissionResult] = await connection.query(strSelectEmployeeLoan +
                        ";" + strSelectAllowancenDeduction +
                        ";" + strSelectPermissionSetting +
                        ";" + strSelectPreviousMonth);

                    let selectEmployeeLoan = strSelectEmployeeLoanAllowancenPermissionResult[0];
                    let selectAllowancenDeduction = strSelectEmployeeLoanAllowancenPermissionResult[1];
                    let selectPermissionSetting = strSelectEmployeeLoanAllowancenPermissionResult[2];
                    let selectPreviousMonth = strSelectEmployeeLoanAllowancenPermissionResult[3];

                    let isAutoPushAttendance = false;
                    let isAutoSendEmail = false;

                    if (selectPermissionSetting.length > 0) {
                        for (let i = 0; i < selectPermissionSetting.length; i++) {
                            if (selectPermissionSetting[i].employerPermissionSettingKey == 'AutoPushAttendance')
                                isAutoPushAttendance = selectPermissionSetting[i].employerPermissionSettingValue == 'true' ? true : false;
                            if (selectPermissionSetting[i].employerPermissionSettingKey == 'AutoSendEmail')
                                isAutoSendEmail = selectPermissionSetting[i].employerPermissionSettingValue == 'true' ? true : false;
                        }
                    }

                    //#endregion

                    //#region - Insert and calculation process

                    let strInsertPayrollNPL = '';
                    let strInsertPayrollStatutory = '';
                    let strInsertPayrollAdditionalpay = '';
                    let strInsertPayrollOvertime = '';
                    let strInsertPayrollShift = '';
                    let strInsertAllowancenDeduction = '';
                    let strInsertPayrollLoan = '';

                    for (let a = 0; a < responseResult.length; a++) {

                        request.body.payrollId = processPayrollId;
                        request.body.employeeId = responseResult[a].employeeId;
                        request.body.payrollsalaryBasic = responseResult[a].employeesalarysetupCurrentBasic;
                        request.body.payrollsalaryGenerated = responseResult[a].employeeSalary;
                        request.body.payrollsalaryEarning = responseResult[a].earningSalary;
                        request.body.payrollsalaryDeduction = responseResult[a].DeductionSalary;
                        request.body.payrollsalaryGross = responseResult[a].grossSalary;
                        request.body.payrollsalaryNet = responseResult[a].netSalary;
                        request.body.payrollsalaryWorkingDay = responseResult[a].workingDays;
                        request.body.payrollIsStatutory = false;
                        request.body.payrollIsPaidLeave = false;

                        let employeesalarysetupPCBGroup = responseResult[a].employeesalarysetupPCBGroup;
                        let employeesalarysetupResidentialStatus = responseResult[a].employeesalarysetupResidentialStatus[0];
                        let employeesalarysetupRemunerationType = responseResult[a].employeesalarysetupRemunerationType;

                        let employeesalarysetupDisabledIndividual = responseResult[a].employeesalarysetupDisabledIndividual;
                        let employeesalarysetupDisabledSpouse = responseResult[a].employeesalarysetupDisabledSpouse;

                        let verbPayrollSalary = _clspayrollsalary.data.masterData(request);
                        let strInsertPayrollSalary = _clspayrollsalary.data.insert(verbPayrollSalary);

                        let [strInsertPayrollSalaryResult, _strInsertPayrollSalaryResult] = await connection.query(strInsertPayrollSalary);
                        let payrollSalaryId = strInsertPayrollSalaryResult.insertId;

                        request.body.payrollsalaryId = payrollSalaryId;

                        //! Loan

                        let _dataSelectPayrollLoan = [];
                        if (selectEmployeeLoan.length > 0) {
                            let filterSelectEmployeeLoan = selectEmployeeLoan.filter(x => x.employeeId == responseResult[a].employeeId);
                            if (filterSelectEmployeeLoan.length > 0) {
                                for (let i = 0; i < filterSelectEmployeeLoan.length; i++) {
                                    _dataSelectPayrollLoan.push({
                                        employeeloanId: filterSelectEmployeeLoan[i].employeeloanId,
                                        payrollloanAmount: filterSelectEmployeeLoan[i].employeeloanDeductionAmount
                                    });
                                }
                            }
                        }

                        //! AllowancenDeduction

                        let _dataSelectPayrollAllowancenDeduction = [];
                        if (selectAllowancenDeduction.length > 0) {
                            let filterSelectAllowancenDeduction = selectAllowancenDeduction.filter(x => x.employeeId == responseResult[a].employeeId);
                            if (filterSelectAllowancenDeduction.length > 0) {
                                for (let i = 0; i < filterSelectAllowancenDeduction.length; i++) {

                                    let _dataTotal = 0;
                                    if (filterSelectAllowancenDeduction[i].employerallowanceProrate[0] == 1)
                                        _dataTotal = parseFloat((filterSelectAllowancenDeduction[i].employeeallowancendeductionAmount / totalDaysPayrollDate) * responseResult[a].workingDays).toFixed(2);
                                    else
                                        _dataTotal = filterSelectAllowancenDeduction[i].employeeallowancendeductionAmount;

                                    _dataSelectPayrollAllowancenDeduction.push({
                                        employeeallowancendeductionId: filterSelectAllowancenDeduction[i].employeeallowancendeductionId,
                                        employerallowanceId: filterSelectAllowancenDeduction[i].employerallowanceId,
                                        employerallowanceCode: filterSelectAllowancenDeduction[i].employerallowanceCode,
                                        employeeallowancendeductionAmount: filterSelectAllowancenDeduction[i].employeeallowancendeductionAmount.toFixed(4),
                                        employerallowanceEpf: filterSelectAllowancenDeduction[i].employerallowanceEpf[0],
                                        employerallowanceEIS: filterSelectAllowancenDeduction[i].employerallowanceEIS[0],
                                        employerallowanceSocso: filterSelectAllowancenDeduction[i].employerallowanceSocso[0],
                                        employerallowancePCB: filterSelectAllowancenDeduction[i].employerallowancePCB[0],
                                        employerallowanceOT: filterSelectAllowancenDeduction[i].employerallowanceOT[0],
                                        employerallowanceAddPay: filterSelectAllowancenDeduction[i].employerallowanceAddPay[0],
                                        employerallowanceHRDF: filterSelectAllowancenDeduction[i].employerallowanceHRDF[0],
                                        employerallowanceBenefitInKind: filterSelectAllowancenDeduction[i].employerallowanceBenefitInKind[0],
                                        employeeallowancendeductionFromDate: filterSelectAllowancenDeduction[i].employeeallowancendeductionFromDate,
                                        employeeallowancendeductionToDate: filterSelectAllowancenDeduction[i].employeeallowancendeductionToDate,
                                        employeeallowancendeductionAmountTotal: _dataTotal
                                    });
                                }
                            }
                        }

                        //! NPL
                        request.body.payrollNplDaysRate = responseResult[a].NPLDay;
                        request.body.payrollNplDayUnit = responseResult[a].UnPaidleave || 0;
                        request.body.payrollNplHourRate = responseResult[a].NPLHour;
                        request.body.payrollNplHourUnit = 0.0;
                        let nplTotal = parseFloat(responseResult[a].NPLDay) * parseFloat(responseResult[a].UnPaidleave || 0);

                        let verbPayrollNPL = _clspayrollnpl.data.masterData(request);
                        let _strInsertPayrollNPL = _clspayrollnpl.data.insert(verbPayrollNPL);
                        strInsertPayrollNPL += _strInsertPayrollNPL + ";";

                        let filterSelectAttendanceList = [];
                        if (isAutoPushAttendance == true) {
                            filterSelectAttendanceList = selectAttendanceList.filter(x => x.employeeId == responseResult[a].employeeId);
                        }

                        let addpayAllowance = 0;
                        if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                            for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceBenefitInKind == 0) {
                                    let _total = parseFloat(_dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal);
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceAddPay == 1) {
                                        addpayAllowance += _total;
                                    }
                                }
                            }
                        }

                        let _dataSelectEmployeeAdditionalPaySetup = [];
                        let filterSelectEmployeeAdditionalPaySetup = selectEmployeeAdditionalPaySetup.filter(x => x.employeeId == responseResult[a].employeeId);
                        if (filterSelectEmployeeAdditionalPaySetup.length > 0) {
                            for (let i = 0; i < filterSelectEmployeeAdditionalPaySetup.length; i++) {
                                let extraCount = 0;
                                if (isAutoPushAttendance == true) {
                                    let filterAdditionalPayAttendance = filterSelectAttendanceList.filter(x => x.holidayAddPayTag == filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupId);
                                    if (filterAdditionalPayAttendance.length > 0) {
                                        for (let j = 0; j < filterAdditionalPayAttendance.length; j++)
                                            extraCount += parseFloat(filterAdditionalPayAttendance[j].employeradditionalpaysetupCode_unit);
                                    }
                                }
                                _dataSelectEmployeeAdditionalPaySetup.push({
                                    employeradditionalpaysetupId: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupId,
                                    employeradditionalpaysetupDescription: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupDescription,
                                    employeradditionalpaysetupRate: filterSelectEmployeeAdditionalPaySetup[i].employeeadditionalpaysetupRate,
                                    payrolladditionalpayUnit: extraCount,
                                    employeradditionalpaysetupEPF: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupEPF[0],
                                    employeradditionalpaysetupEIS: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupEIS[0],
                                    employeradditionalpaysetupSocso: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupSocso[0],
                                    employeradditionalpaysetupPCB: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupPCB[0],
                                    employeradditionalpaysetupHRDF: filterSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupHRDF[0],
                                    employeradditionalpaysetupRateTotal: filterSelectEmployeeAdditionalPaySetup[i].employeeadditionalpaysetupRate.toFixed(4)
                                });
                            }
                        } else {
                            if (selectEmployerAdditionalPaySetup.length > 0) {
                                for (let i = 0; i < selectEmployerAdditionalPaySetup.length; i++) {
                                    let extraCount = 0;
                                    if (isAutoPushAttendance == true) {
                                        let filterAdditionalPayAttendance = filterSelectAttendanceList.filter(x => x.holidayAddPayTag == selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupId);
                                        if (filterAdditionalPayAttendance.length > 0) {
                                            for (let j = 0; j < filterAdditionalPayAttendance.length; j++)
                                                extraCount += parseFloat(filterAdditionalPayAttendance[j].employeradditionalpaysetupCode_unit);
                                        }
                                    }
                                    _dataSelectEmployeeAdditionalPaySetup.push({
                                        employeradditionalpaysetupId: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupId,
                                        employeradditionalpaysetupDescription: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupDescription,
                                        employeradditionalpaysetupRate: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupRate,
                                        payrolladditionalpayUnit: extraCount,
                                        employeradditionalpaysetupEPF: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupEPF[0],
                                        employeradditionalpaysetupEIS: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupEIS[0],
                                        employeradditionalpaysetupSocso: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupSocso[0],
                                        employeradditionalpaysetupPCB: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupPCB[0],
                                        employeradditionalpaysetupHRDF: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupHRDF[0],
                                        employeradditionalpaysetupRateTotal: (((request.body.payrollsalaryBasic + addpayAllowance) / 26) * selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupRate).toFixed(4)
                                    });
                                }
                            }
                        }

                        let otAllowance = 0;
                        if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                            for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceBenefitInKind == 0) {
                                    let _total = parseFloat(_dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal);
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceOT == 1) {
                                        otAllowance += _total;
                                    }
                                }
                            }
                        }
                        let _dataSelectEmployeeOtSetup = [];
                        let filterSelectEmployeeOtSetup = selectEmployeeOtSetup.filter(x => x.employeeId == responseResult[a].employeeId);
                        if (filterSelectEmployeeOtSetup.length > 0) {
                            for (let i = 0; i < filterSelectEmployeeOtSetup.length; i++) {
                                let extraCount = 0;
                                if (isAutoPushAttendance == true) {
                                    let filterOtAttendance = filterSelectAttendanceList.filter(x => x.holidayOTTag == filterSelectEmployeeOtSetup[i].employerotsetupId);
                                    if (filterOtAttendance.length > 0) {
                                        for (let j = 0; j < filterOtAttendance.length; j++)
                                            extraCount += parseFloat(filterOtAttendance[j].finalOverTime_Full_unit) + parseFloat(filterOtAttendance[j].finalOverTime_unit);
                                    }
                                }
                                let filterOtAttendanceAll = filterSelectAttendanceList.filter(x => x.holidayOTTag == 0 && x.holidayAddPayTag == 0 && x.holidayShiftTag == 0);
                                if (filterOtAttendanceAll.length > 0) {
                                    for (let j = 0; j < filterOtAttendanceAll.length; j++)
                                        extraCount += parseFloat(filterOtAttendanceAll[j].finalOverTime_Full_unit) + parseFloat(filterOtAttendanceAll[j].finalOverTime_unit);
                                }
                                _dataSelectEmployeeOtSetup.push({
                                    employerotsetupId: filterSelectEmployeeOtSetup[i].employerotsetupId,
                                    employerotsetupDescription: filterSelectEmployeeOtSetup[i].employerotsetupDescription,
                                    employerotsetupRate: filterSelectEmployeeOtSetup[i].employeeotsetupRate,
                                    payrollovertimeUnit: extraCount,
                                    employerotsetupEPF: filterSelectEmployeeOtSetup[i].employerotsetupEPF[0],
                                    employerotsetupEIS: filterSelectEmployeeOtSetup[i].employerotsetupEIS[0],
                                    employerotsetupSocso: filterSelectEmployeeOtSetup[i].employerotsetupSocso[0],
                                    employerotsetupPCB: filterSelectEmployeeOtSetup[i].employerotsetupPCB[0],
                                    employerotsetupHRDF: filterSelectEmployeeOtSetup[i].employerotsetupHRDF[0],
                                    employerotsetupRateTotal: filterSelectEmployeeOtSetup[i].employeeotsetupRate.toFixed(4)
                                });
                            }
                        } else {
                            if (selectEmployerOtSetup.length > 0) {
                                for (let i = 0; i < selectEmployerOtSetup.length; i++) {
                                    let extraCount = 0;
                                    if (isAutoPushAttendance == true) {
                                        let filterOtAttendance = filterSelectAttendanceList.filter(x => x.holidayOTTag == selectEmployerOtSetup[i].employerotsetupId);
                                        if (filterOtAttendance.length > 0) {
                                            for (let j = 0; j < filterOtAttendance.length; j++)
                                                extraCount += parseFloat(filterOtAttendance[j].finalOverTime_Full_unit) + parseFloat(filterOtAttendance[j].finalOverTime_unit);
                                        }
                                    }
                                    if (selectEmployerOtSetup[i].employerotsetupDescription == 'Normal OT') {
                                        let filterOtAttendanceAll = filterSelectAttendanceList.filter(x => x.holidayOTTag == 0 && x.holidayAddPayTag == 0 && x.holidayShiftTag == 0);
                                        if (filterOtAttendanceAll.length > 0) {
                                            for (let j = 0; j < filterOtAttendanceAll.length; j++)
                                                extraCount += parseFloat(filterOtAttendanceAll[j].finalOverTime_Full_unit) + parseFloat(filterOtAttendanceAll[j].finalOverTime_unit);
                                        }
                                    }
                                    _dataSelectEmployeeOtSetup.push({
                                        employerotsetupId: selectEmployerOtSetup[i].employerotsetupId,
                                        employerotsetupDescription: selectEmployerOtSetup[i].employerotsetupDescription,
                                        employerotsetupRate: selectEmployerOtSetup[i].employerotsetupRate,
                                        payrollovertimeUnit: extraCount,
                                        employerotsetupEPF: selectEmployerOtSetup[i].employerotsetupEPF[0],
                                        employerotsetupEIS: selectEmployerOtSetup[i].employerotsetupEIS[0],
                                        employerotsetupSocso: selectEmployerOtSetup[i].employerotsetupSocso[0],
                                        employerotsetupPCB: selectEmployerOtSetup[i].employerotsetupPCB[0],
                                        employerotsetupHRDF: selectEmployerOtSetup[i].employerotsetupHRDF[0],
                                        employerotsetupRateTotal: ((((request.body.payrollsalaryBasic + otAllowance) / 26) / 8) * selectEmployerOtSetup[i].employerotsetupRate).toFixed(4)
                                    });
                                }
                            }
                        }

                        let _dataSelectEmployeeShiftSetup = [];
                        let filterSelectEmployeeShiftSetup = selectEmployeeShiftSetup.filter(x => x.employeeId == responseResult[a].employeeId);
                        if (filterSelectEmployeeShiftSetup.length > 0) {
                            for (let i = 0; i < filterSelectEmployeeShiftSetup.length; i++) {
                                let extraCount = 0;
                                if (isAutoPushAttendance == true) {
                                    let filterShiftAttendance = filterSelectAttendanceList.filter(x => x.holidayShiftTag == filterSelectEmployeeShiftSetup[i].employershiftsetupId);
                                    if (filterShiftAttendance.length > 0) {
                                        for (let j = 0; j < filterShiftAttendance.length; j++)
                                            extraCount += parseFloat(filterShiftAttendance[j].employershiftsetupCode_unit);
                                    }
                                }
                                _dataSelectEmployeeShiftSetup.push({
                                    employershiftsetupId: filterSelectEmployeeShiftSetup[i].employershiftsetupId,
                                    employershiftsetupDescription: filterSelectEmployeeShiftSetup[i].employershiftsetupDescription,
                                    employershiftsetupAmount: filterSelectEmployeeShiftSetup[i].employeeshiftsetupRate.toFixed(4),
                                    payrollShiftUnit: extraCount,
                                    employershiftsetupEPF: filterSelectEmployeeShiftSetup[i].employershiftsetupEPF[0],
                                    employershiftsetupEIS: filterSelectEmployeeShiftSetup[i].employershiftsetupEIS[0],
                                    employershiftsetupSocso: filterSelectEmployeeShiftSetup[i].employershiftsetupSocso[0],
                                    employershiftsetupPCB: filterSelectEmployeeShiftSetup[i].employershiftsetupPCB[0],
                                    employershiftsetupHRDF: filterSelectEmployeeShiftSetup[i].employershiftsetupHRDF[0],
                                    employershiftsetupAmountTotal: parseFloat(filterSelectEmployeeShiftSetup[i].employeeshiftsetupRate.toString()).toFixed(4)
                                });
                            }
                        } else {
                            if (selectEmployerShiftSetup.length > 0) {
                                for (let i = 0; i < selectEmployerShiftSetup.length; i++) {
                                    let extraCount = 0;
                                    if (isAutoPushAttendance == true) {
                                        let filterShiftAttendance = filterSelectAttendanceList.filter(x => x.holidayShiftTag == selectEmployerShiftSetup[i].employershiftsetupId);
                                        if (filterShiftAttendance.length > 0) {
                                            for (let j = 0; j < filterShiftAttendance.length; j++)
                                                extraCount += parseFloat(filterShiftAttendance[j].employershiftsetupCode_unit);
                                        }
                                    }
                                    _dataSelectEmployeeShiftSetup.push({
                                        employershiftsetupId: selectEmployerShiftSetup[i].employershiftsetupId,
                                        employershiftsetupDescription: selectEmployerShiftSetup[i].employershiftsetupDescription,
                                        employershiftsetupAmount: selectEmployerShiftSetup[i].employershiftsetupAmount.toFixed(4),
                                        payrollShiftUnit: extraCount,
                                        employershiftsetupEPF: selectEmployerShiftSetup[i].employershiftsetupEPF[0],
                                        employershiftsetupEIS: selectEmployerShiftSetup[i].employershiftsetupEIS[0],
                                        employershiftsetupSocso: selectEmployerShiftSetup[i].employershiftsetupSocso[0],
                                        employershiftsetupPCB: selectEmployerShiftSetup[i].employershiftsetupPCB[0],
                                        employershiftsetupHRDF: selectEmployerShiftSetup[i].employershiftsetupHRDF[0],
                                        employershiftsetupAmountTotal: parseFloat(selectEmployerShiftSetup[i].employershiftsetupAmount.toString()).toFixed(4)
                                    });
                                }
                            }
                        }

                        let masterEPFWages = parseFloat(responseResult[a].employeeSalary) - nplTotal;
                        let masterSOCSOWages = parseFloat(responseResult[a].employeeSalary) - nplTotal;
                        let masterESIWages = parseFloat(responseResult[a].employeeSalary) - nplTotal;
                        let masterHRDFWages = parseFloat(responseResult[a].employeeSalary) - nplTotal;

                        let additionalpayCalculateTotal = 0.0000;
                        if (_dataSelectEmployeeAdditionalPaySetup.length > 0) {
                            for (let i = 0; i < _dataSelectEmployeeAdditionalPaySetup.length; i++) {
                                let _total = _dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupRateTotal * _dataSelectEmployeeAdditionalPaySetup[i].payrolladditionalpayUnit;
                                if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupEPF == 1) {
                                    masterEPFWages += _total;
                                }
                                if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupEIS == 1) {
                                    masterESIWages += _total;
                                }
                                if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupSocso == 1) {
                                    masterSOCSOWages += _total;
                                }
                                if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupPCB == 1) {}
                                if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupHRDF == 1) {
                                    masterHRDFWages += _total;
                                }
                                additionalpayCalculateTotal += _total;
                            }
                            additionalpayCalculateTotal = additionalpayCalculateTotal.toFixed(4);
                        }

                        let overtimeCalculateTotal = 0.0000;
                        if (_dataSelectEmployeeOtSetup.length > 0) {
                            for (let i = 0; i < _dataSelectEmployeeOtSetup.length; i++) {
                                let _total = _dataSelectEmployeeOtSetup[i].employerotsetupRateTotal * _dataSelectEmployeeOtSetup[i].payrollovertimeUnit;
                                if (_dataSelectEmployeeOtSetup[i].employerotsetupEPF == 1) {
                                    masterEPFWages += _total;
                                }
                                if (_dataSelectEmployeeOtSetup[i].employerotsetupEIS == 1) {
                                    masterESIWages += _total;
                                }
                                if (_dataSelectEmployeeOtSetup[i].employerotsetupSocso == 1) {
                                    masterSOCSOWages += _total;
                                }
                                if (_dataSelectEmployeeOtSetup[i].employerotsetupPCB == 1) {}
                                if (_dataSelectEmployeeOtSetup[i].employerotsetupHRDF == 1) {
                                    masterHRDFWages += _total;
                                }
                                overtimeCalculateTotal += _total;
                            }
                            overtimeCalculateTotal = overtimeCalculateTotal.toFixed(4);
                        }

                        let shiftCalculateTotal = 0.0000;
                        if (_dataSelectEmployeeShiftSetup.length > 0) {
                            for (let i = 0; i < _dataSelectEmployeeShiftSetup.length; i++) {
                                let _total = _dataSelectEmployeeShiftSetup[i].employershiftsetupAmountTotal * _dataSelectEmployeeShiftSetup[i].payrollShiftUnit;
                                if (_dataSelectEmployeeShiftSetup[i].employershiftsetupEPF == 1) {
                                    masterEPFWages += _total;
                                }
                                if (_dataSelectEmployeeShiftSetup[i].employershiftsetupEIS == 1) {
                                    masterESIWages += _total;
                                }
                                if (_dataSelectEmployeeShiftSetup[i].employershiftsetupSocso == 1) {
                                    masterSOCSOWages += _total;
                                }
                                if (_dataSelectEmployeeShiftSetup[i].employershiftsetupPCB == 1) {}
                                if (_dataSelectEmployeeShiftSetup[i].employershiftsetupHRDF == 1) {
                                    masterHRDFWages += _total;
                                }
                                shiftCalculateTotal += _total;
                            }
                            shiftCalculateTotal = shiftCalculateTotal.toFixed(4);
                        }

                        let allowanceCalculateTotal = 0.0000;
                        if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                            for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceBenefitInKind == 0) {
                                    let _total = parseFloat(_dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal);
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceEpf == 1) {
                                        masterEPFWages += _total;
                                    }
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceEIS == 1) {
                                        masterESIWages += _total;
                                    }
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceSocso == 1) {
                                        masterSOCSOWages += _total;
                                    }
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowancePCB == 1) {}
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceHRDF == 1) {
                                        masterHRDFWages += _total;
                                    }
                                    allowanceCalculateTotal += _total;
                                }
                            }
                            allowanceCalculateTotal = allowanceCalculateTotal.toFixed(4);
                        }

                        let LoanCalculateTotal = 0;
                        if (_dataSelectPayrollLoan.length > 0) {
                            for (let i = 0; i < _dataSelectPayrollLoan.length; i++) {
                                LoanCalculateTotal += _dataSelectPayrollLoan[i].payrollloanAmount;
                            }
                        }

                        //#region 
                        //! EPF
                        responseResult[a].epfWageTotal = masterEPFWages;
                        let filterMasterEpfList = selectMasterEpfList.filter(x =>
                            x.masterepfId == responseResult[a].employeesalarysetupEPFGroup &&
                            x.masterepflistFrom <= responseResult[a].epfWageTotal &&
                            x.masterepflistTo >= responseResult[a].epfWageTotal
                        );

                        if (responseResult[a].epfWageTotal > 20000) {
                            let _epfFilterList = selectMasterEpfList.filter(x => x.masterepfId == responseResult[a].employeesalarysetupEPFGroup);
                            if (_epfFilterList.length > 0) {
                                let employeePer = _epfFilterList[0].masterepfEmployeePer || 0;
                                let employerPer = _epfFilterList[0].masterepfEmployerPer || 0;

                                responseResult[a].masterepflistDifference = 0;
                                responseResult[a].masterepflistEmploeePercentage = (responseResult[a].epfWageTotal * employeePer / 100);
                                responseResult[a].masterepflistEmployerPercentage = (responseResult[a].epfWageTotal * employerPer / 100);
                            } else {
                                responseResult[a].epfreminder = 0;
                                responseResult[a].masterepflistDifference = 0;
                                responseResult[a].masterepflistEmploeePercentage = 0;
                                responseResult[a].masterepflistEmployerPercentage = 0;
                            }
                        } else {
                            if (filterMasterEpfList.length == 0 || responseResult[a].employeesalarysetupEPFGroup == 0) {
                                responseResult[a].epfreminder = 0;
                                responseResult[a].masterepflistDifference = 0;
                                responseResult[a].masterepflistEmploeePercentage = 0;
                                responseResult[a].masterepflistEmployerPercentage = 0;
                            } else {
                                responseResult[a].masterepflistDifference = filterMasterEpfList[0].masterepflistDifference;
                                responseResult[a].masterepflistEmploeePercentage = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                responseResult[a].masterepflistEmployerPercentage = filterMasterEpfList[0].masterepflistEmployerPercentage;
                            }
                        }

                        //! Socso
                        responseResult[a].socsoWageTotal = masterSOCSOWages;
                        let filterMasterSocsoList = selectMasterSocsoList.filter(x =>
                            x.mastersocsoId == responseResult[a].employeesalarysetupSocsoGroup &&
                            x.mastersocsolistFrom <= responseResult[a].socsoWageTotal &&
                            x.mastersocsolistTo >= responseResult[a].socsoWageTotal
                        );
                        if (responseResult[a].employeesalarysetupSocsoGroup != 0) {
                            if (filterMasterSocsoList.length == 0) {
                                filterMasterSocsoList = selectMasterSocsoList[selectMasterSocsoList.length - 1];
                                responseResult[a].mastersocsolistEmployerContribution = filterMasterSocsoList.mastersocsolistEmployerContribution;
                                responseResult[a].mastersocsolistEmployeeContribution = filterMasterSocsoList.mastersocsolistEmployeeContribution;
                                responseResult[a].mastersocsolistEmployerContribution1 = filterMasterSocsoList.mastersocsolistEmployerContribution1;
                            } else {
                                responseResult[a].mastersocsolistEmployerContribution = filterMasterSocsoList[0].mastersocsolistEmployerContribution;
                                responseResult[a].mastersocsolistEmployeeContribution = filterMasterSocsoList[0].mastersocsolistEmployeeContribution;
                                responseResult[a].mastersocsolistEmployerContribution1 = filterMasterSocsoList[0].mastersocsolistEmployerContribution1;
                            }
                        } else {
                            responseResult[a].mastersocsolistEmployerContribution = 0;
                            responseResult[a].mastersocsolistEmployeeContribution = 0;
                            responseResult[a].mastersocsolistEmployerContribution1 = 0;
                        }

                        //! Esi
                        responseResult[a].esiWageTotal = masterESIWages;
                        let filterMasterEsiList = selectMasterEsiList.filter(x =>
                            x.masteresiId == responseResult[a].employeesalarysetupEISGroup &&
                            x.masteresilistFrom <= responseResult[a].esiWageTotal &&
                            x.masteresilistTo >= responseResult[a].esiWageTotal
                        );
                        if (responseResult[a].employeesalarysetupEISGroup != 0) {
                            if (filterMasterEsiList.length == 0) {
                                filterMasterEsiList = selectMasterEsiList[selectMasterEsiList.length - 1];
                                responseResult[a].masteresilistEmployerContribution = filterMasterEsiList.masteresilistEmployerContribution;
                                responseResult[a].masteresilistEmployeeContribution = filterMasterEsiList.masteresilistEmployeeContribution;
                                responseResult[a].masteresilistEmployerContribution1 = filterMasterEsiList.masteresilistEmployerContribution1;
                            } else {
                                responseResult[a].masteresilistEmployerContribution = filterMasterEsiList[0].masteresilistEmployerContribution;
                                responseResult[a].masteresilistEmployeeContribution = filterMasterEsiList[0].masteresilistEmployeeContribution;
                                responseResult[a].masteresilistEmployerContribution1 = filterMasterEsiList[0].masteresilistEmployerContribution1;
                            }
                        } else {
                            responseResult[a].masteresilistEmployerContribution = 0;
                            responseResult[a].masteresilistEmployeeContribution = 0;
                            responseResult[a].masteresilistEmployerContribution1 = 0;
                        }

                        //! HRDF
                        responseResult[a].hrdfWageTotal = masterHRDFWages;
                        let filterMasterhrdfList = selectMasterhrdfList.filter(x =>
                            x.masterhrdfId == responseResult[a].employeesalarysetupHRDFGroup &&
                            x.masterhrdflistFrom <= responseResult[a].hrdfWageTotal &&
                            x.masterhrdflistTo >= responseResult[a].hrdfWageTotal
                        );
                        if (filterMasterhrdfList.length > 0) {
                            if (responseResult[a].employeesalarysetupHRDFGroup != 0) {
                                responseResult[a].masterhrdflistEmployerContribution = filterMasterhrdfList[0].masterhrdflistEmployerPercentage;
                                responseResult[a].masterhrdflistEmployeeContribution = filterMasterhrdfList[0].masterhrdflistEmploeePercentage;
                            }
                        } else {
                            responseResult[a].masterhrdflistEmployerContribution = 0;
                            responseResult[a].masterhrdflistEmployeeContribution = 0;
                        }

                        responseResult[a].EpfERate = responseResult[a].employeestatutorysetupEpfERate != 0 ? responseResult[a].employeestatutorysetupEpfERate : responseResult[a].masterepflistEmploeePercentage;
                        responseResult[a].EpfRRate = responseResult[a].employeestatutorysetupEpfRRate != 0 ? responseResult[a].employeestatutorysetupEpfRRate : responseResult[a].masterepflistEmployerPercentage;

                        responseResult[a].SocsoERate = responseResult[a].employeestatutorysetupSocsoERate != 0 ? responseResult[a].employeestatutorysetupSocsoERate : responseResult[a].employeesalarysetupSocsoCategory == 1 ? responseResult[a].mastersocsolistEmployeeContribution : 0.0;
                        responseResult[a].SocsoRRate = responseResult[a].employeestatutorysetupSocsoRRate != 0 ? responseResult[a].employeestatutorysetupSocsoRRate : responseResult[a].employeesalarysetupSocsoCategory == 1 ? responseResult[a].mastersocsolistEmployerContribution : responseResult[a].mastersocsolistEmployerContribution1;

                        responseResult[a].EISERate = responseResult[a].employeestatutorysetupEISERate != 0 ? responseResult[a].employeestatutorysetupEISERate : responseResult[a].employeesalarysetupEISCategory == 1 ? responseResult[a].masteresilistEmployeeContribution : 0.0;
                        responseResult[a].EISRRate = responseResult[a].employeestatutorysetupEISRRate != 0 ? responseResult[a].employeestatutorysetupEISRRate : responseResult[a].employeesalarysetupEISCategory == 1 ? responseResult[a].masteresilistEmployerContribution : responseResult[a].masteresilistEmployerContribution1;

                        if (employeesalarysetupPCBGroup == 1)
                            responseResult[a].PCBERate = responseResult[a].employeestatutorysetupPCBERate != 0 ? responseResult[a].employeestatutorysetupPCBERate : 0.0;
                        else
                            responseResult[a].PCBERate = 0;

                        if (responseResult[a].masterhrdflistEmployeeContribution != 0)
                            responseResult[a].HRDFERate = (masterHRDFWages / 100) * responseResult[a].masterhrdflistEmployeeContribution;
                        else
                            responseResult[a].HRDFERate = 0;
                        if (responseResult[a].masterhrdflistEmployerContribution != 0)
                            responseResult[a].HRDFRRate = (masterHRDFWages / 100) * responseResult[a].masterhrdflistEmployerContribution;
                        else
                            responseResult[a].HRDFRRate = 0;

                        //#region - PCB calculation!

                        if (employeesalarysetupResidentialStatus == 0 && employeesalarysetupPCBGroup == 1) {

                            responseResult[a].PCBERate = request.body.payrollsalaryBasic * 0.30;

                        } else {
                            if (employeesalarysetupPCBGroup == 1) {
                                if (responseResult[a].PCBERate == 0) {

                                    let Y = 0;
                                    let K = 0;
                                    let Y1 = 0;
                                    let K1 = 0;
                                    let Yt = 0;
                                    let Kt = 0;
                                    let D = 0;
                                    let S = 0;
                                    let DU = 0;
                                    let SU = 0;
                                    let QC = 0;
                                    let LP = 0;
                                    let LP1 = 0;
                                    let N = 12 - parseInt(payrollMonth);
                                    let n = N + 1;
                                    let M = 0;
                                    let R = 0;
                                    let B = 0;
                                    let Z = 0;
                                    let X1 = 0;

                                    let _pcbAllowance = 0;
                                    let _pcbAllowanceBIK = 0;

                                    let _pcbSalaryBasic0 = 0;
                                    let _EISERate0 = 0;
                                    let _EpfERate0 = 0;
                                    let _SocsoERate0 = 0;
                                    let _PcbERate0 = 0;
                                    let _pcbAllowance0 = 0;
                                    let _pcbAllowanceBIK0 = 0;

                                    let _overtimeCal0 = 0;
                                    let _shiftCal0 = 0;
                                    let _addPayCal0 = 0;

                                    let category = responseResult[a].employeesalarysetupCategory;
                                    let children = responseResult[a].employeesalarysetupChildren || 0;

                                    let _pcbSalaryBasic = request.body.payrollsalaryBasic;
                                    let _pcbAccumulatedPTAE = responseResult[a].employeesalarysetupAccumulatedPTAE || 0;
                                    let _pcbAccumulatedPTABIK = responseResult[a].employeesalarysetupAccumulatedPTABIK || 0;
                                    let _employeesalarysetupAccumulatedMTD = responseResult[a].employeesalarysetupAccumulatedMTD || 0;

                                    let _employeesalarysetupAccumulatedEPF = responseResult[a].employeesalarysetupAccumulatedEPF || 0;
                                    let _employeesalarysetupAccumulatedSocso = responseResult[a].employeesalarysetupAccumulatedSocso || 0;
                                    let _employeesalarysetupAccumulatedZakat = responseResult[a].employeesalarysetupAccumulatedZakat || 0;

                                    //! reliefsCodeData
                                    const reliefsCodeData = require('../../reliefs.json');
                                    if (reliefsCodeData.length > 0) {
                                        let filterYearData = reliefsCodeData.filter(x => x.year == payrollYear);

                                        if (filterYearData.length > 0) {
                                            let filterTypes = filterYearData[0].types;

                                            if (employeesalarysetupDisabledIndividual[0] == true) {
                                                let _DisabledIndividual = filterTypes.filter(x => x.title == 'Disabled-Individual');
                                                DU = _DisabledIndividual[0].Code;
                                            }

                                            if (employeesalarysetupDisabledSpouse[0] == true) {
                                                let _DisabledHusbandWife = filterTypes.filter(x => x.title == 'Disabled-Husband-Wife');
                                                SU = _DisabledHusbandWife[0].Code;
                                            }

                                            let _individual = filterTypes.filter(x => x.title == 'Individual');
                                            D = _individual[0].Code;

                                            let _spouseNotWorking = filterTypes.filter(x => x.title == 'Husband-Wife');
                                            if (category == 3 || category == 1) {
                                                S = 0;
                                            } else {
                                                S = parseFloat(_spouseNotWorking[0].Code);
                                            }

                                            let _child = filterTypes.filter(x => x.title == 'Child');
                                            QC = parseFloat(_child[0].Code) * parseFloat(children);
                                        }
                                    }

                                    //! Allowancen-Deduction
                                    let _pcbFilterSelectAllowancenDeduction = selectAllowancenDeduction.filter(x => x.employeeId == responseResult[a].employeeId);
                                    if (_pcbFilterSelectAllowancenDeduction.length > 0) {
                                        for (let p = 0; p < _pcbFilterSelectAllowancenDeduction.length; p++) {
                                            if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceAdditionalRemuneration[0] == false) {
                                                let _dataTotal = 0;
                                                if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceProrate[0] == 1)
                                                    _dataTotal = parseFloat((_pcbFilterSelectAllowancenDeduction[p].employeeallowancendeductionAmount / totalDaysPayrollDate) * responseResult[a].workingDays).toFixed(2);
                                                else
                                                    _dataTotal = _pcbFilterSelectAllowancenDeduction[p].employeeallowancendeductionAmount;

                                                if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceBenefitInKind[0] == false) {
                                                    _pcbAllowance += _dataTotal;
                                                } else {
                                                    if (_dataTotal > 0)
                                                        _pcbAllowanceBIK += _dataTotal;

                                                    if (_dataTotal < 0)
                                                        LP1 += Math.abs(_dataTotal);
                                                }

                                                //! Rdo minus cureent month if zakat true
                                                if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceZakat[0] == true)
                                                    Z += _dataTotal;

                                                //! need in object to indicate the current month
                                            }
                                        }

                                    }

                                    if (payrollMonth != 1) {
                                        if (selectPreviousMonth.length > 0) {
                                            let uniquePayrollId = selectPreviousMonth.map(x => x.payrollId);
                                            let payrollIds = uniquePayrollId.toString();
                                            let strSelectPayrollSalary = _clspayrollsalary.data.select(" and payrollId in (" + payrollIds + ") and employeeId = " + responseResult[a].employeeId);
                                            let [strSelectPayrollSalaryResult] = await connection.query(strSelectPayrollSalary);

                                            if (strSelectPayrollSalaryResult.length > 0) {
                                                let uniquePayrollsalaryId = strSelectPayrollSalaryResult.map(x => x.payrollsalaryId);
                                                let payrollsalaryIds = uniquePayrollsalaryId.toString();

                                                for (let aa = 0; aa < strSelectPayrollSalaryResult.length; aa++) {
                                                    _pcbSalaryBasic0 += parseFloat(strSelectPayrollSalaryResult[aa].payrollsalaryBasic);
                                                }

                                                let strSelectPayrollStatutory = _clspayrollstatutory.data.select(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                                let strSelectPayrollAllowancendeduction = _clspayrollallowancendeduction.data.select_view_payrollallowancendeduction(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                                let [strSelectPayrollStatutoryAllowancendeductionResult] = await connection.query(strSelectPayrollStatutory + ";" + strSelectPayrollAllowancendeduction);

                                                let strSelectPayrollStatutory1 = strSelectPayrollStatutoryAllowancendeductionResult[0];
                                                let strSelectPayrollAllowancendeduction1 = strSelectPayrollStatutoryAllowancendeductionResult[1];

                                                if (strSelectPayrollStatutoryAllowancendeductionResult.length > 0) {
                                                    for (let sp = 0; sp < strSelectPayrollStatutory1.length; sp++) {
                                                        _EISERate0 += strSelectPayrollStatutory1[sp].payrollstatutoryEISEmployee;
                                                        _EpfERate0 += strSelectPayrollStatutory1[sp].payrollstatutoryEpfEmployee;
                                                        _SocsoERate0 += strSelectPayrollStatutory1[sp].payrollstatutorySocsoEmployee;
                                                        _PcbERate0 += strSelectPayrollStatutory1[sp].payrollstatutoryPcbEmployee;
                                                    }
                                                    for (let sp = 0; sp < strSelectPayrollAllowancendeduction1.length; sp++) {
                                                        if (strSelectPayrollAllowancendeduction1[sp].employerallowanceBenefitInKind[0] == false)
                                                            _pcbAllowance0 += strSelectPayrollAllowancendeduction1[sp].payrollallowancendeductionAmount;
                                                        else
                                                            _pcbAllowanceBIK0 += strSelectPayrollAllowancendeduction1[sp].payrollallowancendeductionAmount;
                                                    }
                                                }


                                                //! Shift - Overtime - Additionalpay
                                                let strPrevPayrollShift = _clspayrollshift.data.select_view_payrollshift(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                                let strPrevPayrollAdditionalPay = _clspayrolladditionalpay.data.select_view_payrolladditionalpay(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                                let strPrevPayrollOvertime = _clspayrollovertime.data.select_view_payrollovertime(" and payrollsalaryId in (" + payrollsalaryIds + ") ");

                                                let [strPrevPayrollShift_AdditionalPay_OvertimeResult] = await dbSecurity.asyncResult(strPrevPayrollShift + ";" + strPrevPayrollAdditionalPay + ";" + strPrevPayrollOvertime);

                                                let strPrevPayrollShiftResult = strPrevPayrollShift_AdditionalPay_OvertimeResult[0];
                                                let strPrevPayrollAdditionalPayResult = strPrevPayrollShift_AdditionalPay_OvertimeResult[1];
                                                let strPrevPayrollOvertimeResult = strPrevPayrollShift_AdditionalPay_OvertimeResult[2];

                                                if (strPrevPayrollOvertimeResult.length > 0) {
                                                    for (let om = 0; om < strPrevPayrollOvertimeResult.length; om++) {
                                                        if (strPrevPayrollOvertimeResult[om].employerotsetupPCB[0] == 1) {
                                                            _overtimeCal0 += strPrevPayrollOvertimeResult[om].payrollovertimeRate * strPrevPayrollOvertimeResult[om].payrollovertimeUnit;
                                                        }
                                                    }
                                                }
                                                if (strPrevPayrollShiftResult.length > 0) {
                                                    for (let sm = 0; sm < strPrevPayrollShiftResult.length; sm++) {
                                                        if (strPrevPayrollShiftResult[sm].employershiftsetupPCB[0] == 1) {
                                                            _shiftCal0 += strPrevPayrollShiftResult[sm].payrollShiftRate * strPrevPayrollShiftResult[sm].payrollShiftUnit;
                                                        }
                                                    }
                                                }
                                                if (strPrevPayrollAdditionalPayResult.length > 0) {
                                                    for (let am = 0; am < strPrevPayrollAdditionalPayResult.length; am++) {
                                                        if (strPrevPayrollAdditionalPayResult[am].employeradditionalpaysetupPCB[0] == 1) {
                                                            _addPayCal0 += strPrevPayrollAdditionalPayResult[am].payrolladditionalpayRate * strPrevPayrollAdditionalPayResult[am].payrolladditionalpayUnit;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        X1 = _PcbERate0 + _employeesalarysetupAccumulatedMTD;
                                    }

                                    //! 1
                                    let val1 = parseFloat(_pcbAllowanceBIK0) < 0 ? 0 : parseFloat(_pcbAllowanceBIK0);
                                    Y = [(parseFloat(_pcbSalaryBasic0) + parseFloat(_pcbAllowance0) + val1) + (parseFloat(_pcbAccumulatedPTAE) + parseFloat(_pcbAccumulatedPTABIK)) + _overtimeCal0 + _shiftCal0 + _addPayCal0];
                                    K = parseFloat(_EpfERate0) + parseFloat(_employeesalarysetupAccumulatedEPF);
                                    if (K > 4000) {
                                        K = 4000;
                                    }
                                    let _A = Y - K;

                                    //! 2

                                    let _overtimeCal = 0;
                                    let _shiftCal = 0;
                                    let _addPayCal = 0;

                                    if (_dataSelectEmployeeAdditionalPaySetup.length > 0) {
                                        for (let am = 0; am < _dataSelectEmployeeAdditionalPaySetup.length; am++) {
                                            if (_dataSelectEmployeeAdditionalPaySetup[am].employeradditionalpaysetupPCB == 1) {
                                                _addPayCal += parseFloat(_dataSelectEmployeeAdditionalPaySetup[am].employeradditionalpaysetupRateTotal) * _dataSelectEmployeeAdditionalPaySetup[am].payrolladditionalpayUnit;
                                            }
                                        }
                                    }

                                    if (_dataSelectEmployeeOtSetup.length > 0) {
                                        for (let om = 0; om < _dataSelectEmployeeOtSetup.length; om++) {
                                            if (_dataSelectEmployeeOtSetup[om].employerotsetupPCB == 1) {
                                                _overtimeCal += parseFloat(_dataSelectEmployeeOtSetup[om].employerotsetupRateTotal) * _dataSelectEmployeeOtSetup[om].payrollovertimeUnit;
                                            }
                                        }
                                    }

                                    if (_dataSelectEmployeeShiftSetup.length > 0) {
                                        for (let sm = 0; sm < _dataSelectEmployeeShiftSetup.length; sm++) {
                                            if (_dataSelectEmployeeShiftSetup[sm].employershiftsetupPCB == 1) {
                                                _shiftCal += parseFloat(_dataSelectEmployeeShiftSetup[sm].employershiftsetupAmountTotal) * _dataSelectEmployeeShiftSetup[sm].payrollShiftUnit;
                                            }
                                        }
                                    }

                                    let val = parseFloat(_pcbAllowanceBIK) < 0 ? 0 : parseFloat(_pcbAllowanceBIK);
                                    Y1 = [(parseFloat(_pcbSalaryBasic) + parseFloat(_pcbAllowance) + val) + _overtimeCal + _shiftCal + _addPayCal - nplTotal];
                                    K1 = parseFloat(responseResult[a].EpfERate);
                                    if ((parseFloat(_EpfERate0) + parseFloat(_employeesalarysetupAccumulatedEPF)) > 4000) {
                                        K1 = 0;
                                    }
                                    let _B = Y1 - K1;

                                    //! 3
                                    let _C = 0;
                                    if (payrollMonth != 12) {
                                        let value = 4000 - (parseFloat(K) + parseFloat(K1));
                                        let _pp = (value / N).toString();

                                        if (parseFloat(_pp) > parseFloat(K1)) {
                                            _pp = parseFloat(K1);
                                        }

                                        _C = parseFloat(_pp).toFixed(3).slice(0, -1);
                                    }

                                    let P = ((_A + _B + (parseFloat(Y1) - parseFloat(_C)) * N + (Yt - Kt)) - (D + S + DU + SU + QC + (LP + LP1))).toFixed(2);

                                    const table1 = require('../../table1.json');
                                    if (table1.length > 0) {
                                        for (let q = 0; q < table1.length; q++) {

                                            let _range0 = table1[q].range0;
                                            let _range1 = table1[q].range1;
                                            let _M = table1[q].M;
                                            let _R = table1[q].R;
                                            let _B13 = table1[q].B13;
                                            let _B2 = table1[q].B2;

                                            if (_range0 < P && _range1 > P) {
                                                M = _M;
                                                R = _R;
                                                if (category == 2)
                                                    B = _B2;
                                                if (category == 1 || category == 3)
                                                    B = _B13;

                                                break;
                                            }
                                        }
                                    }


                                    let _val1 = (parseFloat(P) - M) * (R / 100) + B - (Z + X1);
                                    let _val = (_val1 / n).toFixed(2);

                                    //#region Additional Remuneration 

                                    let _TotalYearMTD = X1 + parseFloat(_val) * (N + 1);
                                    let totalAdditionalRemuneration = 0;
                                    let totalAdditionalRemunerationEpfERate = 0;
                                    let flagAdditionalRemuneration = false;
                                    if (_pcbFilterSelectAllowancenDeduction.length > 0) {
                                        for (let p = 0; p < _pcbFilterSelectAllowancenDeduction.length; p++) {
                                            if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceAdditionalRemuneration[0] == true) {

                                                let _dataTotal = 0;
                                                flagAdditionalRemuneration = true;
                                                if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceProrate[0] == 1)
                                                    _dataTotal = parseFloat((_pcbFilterSelectAllowancenDeduction[p].employeeallowancendeductionAmount / totalDaysPayrollDate) * responseResult[a].workingDays).toFixed(2);
                                                else
                                                    _dataTotal = parseFloat(_pcbFilterSelectAllowancenDeduction[p].employeeallowancendeductionAmount);

                                                let filterMasterEpfList = selectMasterEpfList.filter(x =>
                                                    x.masterepfId == responseResult[a].employeesalarysetupEPFGroup &&
                                                    x.masterepflistFrom <= _dataTotal &&
                                                    x.masterepflistTo >= _dataTotal
                                                );

                                                if (_dataTotal > 20000) {
                                                    let _epfFilterList = selectMasterEpfList.filter(x => x.masterepfId == responseResult[a].employeesalarysetupEPFGroup);
                                                    if (_epfFilterList.length > 0) {
                                                        let employeePer = _epfFilterList[0].masterepfEmployeePer || 0;
                                                        let employerPer = _epfFilterList[0].masterepfEmployerPer || 0;

                                                        masterepflistDifference = 0;
                                                        masterepflistEmploeePercentage = (_dataTotal * employeePer / 100);
                                                        masterepflistEmployerPercentage = (_dataTotal * employerPer / 100);
                                                    } else {
                                                        masterepflistDifference = 0;
                                                        masterepflistEmploeePercentage = 0;
                                                        masterepflistEmployerPercentage = 0;
                                                    }
                                                } else {
                                                    if (filterMasterEpfList.length == 0 || responseResult[a].employeesalarysetupEPFGroup == 0) {
                                                        masterepflistDifference = 0;
                                                        masterepflistEmploeePercentage = 0;
                                                        masterepflistEmployerPercentage = 0;
                                                    } else {
                                                        masterepflistDifference = filterMasterEpfList[0].masterepflistDifference;
                                                        masterepflistEmploeePercentage = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                                        masterepflistEmployerPercentage = filterMasterEpfList[0].masterepflistEmployerPercentage;
                                                    }
                                                }

                                                let EpfERate = responseResult[a].employeestatutorysetupEpfERate != 0 ? responseResult[a].employeestatutorysetupEpfERate : masterepflistEmploeePercentage;

                                                totalAdditionalRemuneration += _dataTotal;
                                                totalAdditionalRemunerationEpfERate += EpfERate;
                                            }
                                        }
                                    }

                                    if (flagAdditionalRemuneration == true) {

                                        let _C = 0;
                                        if (payrollMonth != 12) {
                                            let value = 4000 - (parseFloat(K) + parseFloat(K1)) - totalAdditionalRemunerationEpfERate;
                                            let _pp = (value / N).toString();

                                            if (parseFloat(_pp) > parseFloat(K1)) {
                                                _pp = parseFloat(K1);
                                            }

                                            _C = parseFloat(_pp).toFixed(3).slice(0, -1);
                                        }

                                        let P = ((_A + _B + (parseFloat(Y1) - parseFloat(_C)) * N + (totalAdditionalRemuneration - totalAdditionalRemunerationEpfERate)) - (D + S + DU + SU + QC + (LP + LP1))).toFixed(2);

                                        const table1 = require('../../table1.json');
                                        if (table1.length > 0) {
                                            for (let q = 0; q < table1.length; q++) {

                                                let _range0 = table1[q].range0;
                                                let _range1 = table1[q].range1;
                                                let _M = table1[q].M;
                                                let _R = table1[q].R;
                                                let _B13 = table1[q].B13;
                                                let _B2 = table1[q].B2;

                                                if (_range0 < P && _range1 > P) {
                                                    M = _M;
                                                    R = _R;
                                                    if (category == 2)
                                                        B = _B2;
                                                    if (category == 1 || category == 3)
                                                        B = _B13;

                                                    break;
                                                }
                                            }
                                        }

                                        //! Step 3
                                        let _valAdditionalRemuneration0 = (parseFloat(P) - M) * (R / 100) + B;

                                        //! Stpe 4
                                        let MTDS = parseFloat(_valAdditionalRemuneration0) - (_TotalYearMTD + parseFloat(_employeesalarysetupAccumulatedZakat));

                                        _val = (parseFloat(_val) + MTDS).toFixed(2).toString();

                                    }

                                    //#endregion Additional Remuneration 
                                    if (employeesalarysetupRemunerationType == 'Normal Remuneration') {

                                    }

                                    if (employeesalarysetupRemunerationType == 'Returning Expert Program') {

                                        let R = 0;
                                        let T = 0;
                                        const tableComputerisedProgram = require('../../computerisedProgram.json');
                                        if (parseFloat(P) <= 35000) {
                                            R = tableComputerisedProgram[0].R;
                                            if (category == 2)
                                                T = tableComputerisedProgram[0]["T-2"];
                                            if (category == 1 || category == 3)
                                                T = tableComputerisedProgram[0]["T-13"];
                                        }
                                        if (parseFloat(P) >= 35000) {
                                            R = tableComputerisedProgram[1].R;
                                            if (category == 2)
                                                T = tableComputerisedProgram[1]["T-2"];
                                            if (category == 1 || category == 3)
                                                T = tableComputerisedProgram[1]["T-13"];
                                        }

                                        let expertProgram = 0;
                                        expertProgram = ((parseFloat(P) * R - T) - (Z + X1)) / n;
                                        _val = (expertProgram - Z).toFixed(2).toString();
                                    }

                                    if (employeesalarysetupRemunerationType == 'Knowledge worker') {
                                        let R = 0;
                                        let T = 0;
                                        const tableComputerisedProgram = require('../../computerisedProgram.json');
                                        if (parseFloat(P) <= 35000) {
                                            R = tableComputerisedProgram[0].R;
                                            if (category == 2)
                                                T = tableComputerisedProgram[0]["T-2"];
                                            if (category == 1 || category == 3)
                                                T = tableComputerisedProgram[0]["T-13"];
                                        }
                                        if (parseFloat(P) >= 35000) {
                                            R = tableComputerisedProgram[1].R;
                                            if (category == 2)
                                                T = tableComputerisedProgram[1]["T-2"];
                                            if (category == 1 || category == 3)
                                                T = tableComputerisedProgram[1]["T-13"];
                                        }

                                        let expertProgram = 0;
                                        expertProgram = ((parseFloat(P) * R - T) - (Z + X1)) / n;
                                        _val = (expertProgram - Z).toFixed(2).toString();
                                    }

                                    if (parseFloat(_val) < 0) {
                                        _val = 0;
                                    }

                                    let pcbValue = parseFloat(_val).toFixed(3).slice(0, -1);
                                    if (pcbValue < 10)
                                        pcbValue = '0.00';

                                    var _a = pcbValue.split('.')[0];
                                    var _b = pcbValue.split('.')[1];

                                    let _c = dbCommon.diff_values(parseFloat(_b));
                                    let c = (parseFloat(_a) + _c).toFixed(2);

                                    responseResult[a].PCBERate = c;
                                }
                            }
                        }
                        //#endregion - PCB calculation.

                        //#endregion

                        request.body.payrollstatutoryEpfWages = responseResult[a].epfWageTotal;
                        request.body.payrollstatutoryEpfEmployee = responseResult[a].EpfERate;
                        request.body.payrollstatutoryEpfEmployer = responseResult[a].EpfRRate;
                        request.body.payrollstatutorySocsoWages = responseResult[a].socsoWageTotal;
                        request.body.payrollstatutorySocsoEmployee = responseResult[a].SocsoERate;
                        request.body.payrollstatutorySocsoEmployer = responseResult[a].SocsoRRate;
                        request.body.payrollstatutoryEISWages = responseResult[a].esiWageTotal;
                        request.body.payrollstatutoryEISEmployee = responseResult[a].EISERate;
                        request.body.payrollstatutoryEISEmployer = responseResult[a].EISRRate;
                        request.body.payrollstatutoryPcbWages = 0;
                        request.body.payrollstatutoryPcbEmployee = responseResult[a].PCBERate;
                        request.body.payrollstatutoryPcbEmployer = 0;
                        request.body.payrollstatutoryHrdfWages = responseResult[a].hrdfWageTotal;
                        request.body.payrollstatutoryHrdfEmployee = responseResult[a].HRDFERate;
                        request.body.payrollstatutoryHrdfEmployer = responseResult[a].HRDFRRate;

                        let verbPayrollStatutory = _clspayrollstatutory.data.masterData(request);
                        let _strInsertPayrollStatutory = _clspayrollstatutory.data.insert(verbPayrollStatutory);
                        strInsertPayrollStatutory += _strInsertPayrollStatutory + ";";

                        if (_dataSelectEmployeeAdditionalPaySetup.length > 0) {
                            strInsertPayrollAdditionalpay += _clspayrolladditionalpay.data.insertString();

                            for (let i = 0; i < _dataSelectEmployeeAdditionalPaySetup.length; i++) {
                                if (i != 0)
                                    strInsertPayrollAdditionalpay += ",";
                                strInsertPayrollAdditionalpay += "(" + payrollSalaryId + ", " + _dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupId +
                                    ", " + _dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupRateTotal + ", " + _dataSelectEmployeeAdditionalPaySetup[i].payrolladditionalpayUnit + ", 0, now())";
                            }
                            strInsertPayrollAdditionalpay += ";";
                        }

                        if (_dataSelectEmployeeOtSetup.length > 0) {
                            strInsertPayrollOvertime += _clspayrollovertime.data.insertString();
                            for (let i = 0; i < _dataSelectEmployeeOtSetup.length; i++) {
                                if (i != 0)
                                    strInsertPayrollOvertime += ",";
                                strInsertPayrollOvertime += "(" + payrollSalaryId + ", " + _dataSelectEmployeeOtSetup[i].employerotsetupId +
                                    ", " + _dataSelectEmployeeOtSetup[i].employerotsetupRateTotal + ", " + _dataSelectEmployeeOtSetup[i].payrollovertimeUnit + ", 0, now())";
                            }
                            strInsertPayrollOvertime += ";";
                        }

                        if (_dataSelectEmployeeShiftSetup.length > 0) {
                            strInsertPayrollShift += _clspayrollshift.data.insertString();
                            for (let i = 0; i < _dataSelectEmployeeShiftSetup.length; i++) {
                                if (i != 0)
                                    strInsertPayrollShift += ",";
                                strInsertPayrollShift += "(" + payrollSalaryId + ", " + _dataSelectEmployeeShiftSetup[i].employershiftsetupId +
                                    ", " + _dataSelectEmployeeShiftSetup[i].employershiftsetupAmountTotal + ", " + _dataSelectEmployeeShiftSetup[i].payrollShiftUnit + ", 0, now())";
                            }
                            strInsertPayrollShift += ";";
                        }

                        if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                            strInsertAllowancenDeduction += _clspayrollallowancendeduction.data.insertString();
                            for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                if (i != 0)
                                    strInsertAllowancenDeduction += ",";
                                strInsertAllowancenDeduction += "(" + payrollSalaryId + "," + _dataSelectPayrollAllowancenDeduction[i].employerallowanceId +
                                    " ," + _dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal + " , 0, now())";
                            }
                            strInsertAllowancenDeduction += ";";
                        }

                        if (_dataSelectPayrollLoan.length > 0) {
                            strInsertPayrollLoan += _clspayrollloan.data.insertString();
                            for (let i = 0; i < _dataSelectPayrollLoan.length; i++) {
                                if (i != 0)
                                    strInsertPayrollLoan += ",";
                                strInsertPayrollLoan += "(" + payrollSalaryId + "," + _dataSelectPayrollLoan[i].employeeloanId +
                                    " ," + _dataSelectPayrollLoan[i].payrollloanAmount + " , 0, now())";
                            }
                            strInsertPayrollLoan += ";";
                        }

                        let masterGrossPay = (parseFloat(responseResult[a].employeeSalary) + parseFloat(additionalpayCalculateTotal) +
                            parseFloat(overtimeCalculateTotal) + parseFloat(shiftCalculateTotal) + parseFloat(allowanceCalculateTotal)) - parseFloat(nplTotal);
                        let masterNetPay = parseFloat(masterGrossPay) - (parseFloat(responseResult[a].EpfERate) + parseFloat(responseResult[a].SocsoERate) +
                            parseFloat(responseResult[a].EISERate) + parseFloat(responseResult[a].PCBERate) + parseFloat(responseResult[a].HRDFERate) + parseFloat(LoanCalculateTotal));

                        request.body.payrollsalaryGross = masterGrossPay;
                        request.body.payrollsalaryNet = masterNetPay;

                        let _verbPayrollSalary = _clspayrollsalary.data.masterData(request);
                        let strUpdatePayrollSalary = _clspayrollsalary.data.update(_verbPayrollSalary);

                        let [strUpdatePayrollSalaryQueryResult, _strUpdatePayrollSalaryQueryResult] = await connection.query(strUpdatePayrollSalary);
                    }
                    let [strProcessFinalResult, _strProcessFinalResult] = await connection.query(strInsertPayrollStatutory +
                        strInsertPayrollNPL +
                        strInsertPayrollAdditionalpay +
                        strInsertPayrollOvertime +
                        strInsertPayrollShift +
                        strInsertAllowancenDeduction +
                        strInsertPayrollLoan);

                    //#endregion
                }

                await connection.commit();
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
                    'query': error.message
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSalaryProcessRecalculation: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let employeeId = request.body.employeeId;
            let _epfWageTotal = request.body._epfWageTotal;
            let _esiWageTotal = request.body._esiWageTotal;
            let _socsoWageTotal = request.body._socsoWageTotal;
            let _hrdfWageTotal = request.body._hrdfWageTotal;
            let _month = request.body._month;
            let _year = request.body._year;
            let _workingDays = request.body._workingDays;
            let AllowanceMaster = JSON.parse(request.body.AllowanceMaster);
            let overtimeMaster = JSON.parse(request.body.overtimeMaster);
            let shiftMaster = JSON.parse(request.body.shiftMaster);
            let addPayMaster = JSON.parse(request.body.addPayMaster);
            let _totalDaysPayrollDate = request.body._totalDaysPayrollDate;
            let masterTotalNPL = request.body.masterTotalNPL;

            let strSelectEmployeeSalary = _clsemployeesalarysetup.data.select_view_employeesalarysetup(" and employeeId = " + employeeId + " and employerId = " + employerId);
            let strSelectMasterEpfList = _clsmasterepflist.data.select_view_masterepflist("");
            let strSelectMasterSocsoList = _clsmastersocsolist.data.select("");
            let strSelectMasterEsiList = _clsmasteresilist.data.select("");
            let strSelectMasterhrdfList = _clsmasterhrdflist.data.select("");
            let strSelectPreviousMonth = _clspayroll.data.select(" and employerId = " + employerId + " AND YEAR(payrollDate) = " + _year + " AND MONTH(payrollDate) < " + _month);

            let [strSelectEmployeeSalaryResult, _strSelectEmployeeSalaryResult] = await dbSecurity.asyncResult(strSelectEmployeeSalary);
            let [strSelectMasterListResult, _strSelectMasterListResult] = await dbSecurity.asyncResult(strSelectMasterEpfList + ";" + strSelectMasterSocsoList + ";" + strSelectMasterEsiList + ";" + strSelectMasterhrdfList + ";" + strSelectPreviousMonth);

            let selectMasterEpfList = strSelectMasterListResult[0];
            let selectMasterSocsoList = strSelectMasterListResult[1];
            let selectMasterEsiList = strSelectMasterListResult[2];
            let selectMasterhrdfList = strSelectMasterListResult[3];
            let selectPreviousMonth = strSelectMasterListResult[4];

            let masterepflistDifference = 0;
            let masterepflistEmploeePercentage = 0;
            let masterepflistEmployerPercentage = 0;

            let mastersocsolistEmployerContribution = 0;
            let mastersocsolistEmployeeContribution = 0;
            let mastersocsolistEmployerContribution1 = 0;

            let masteresilistEmployerContribution = 0;
            let masteresilistEmployeeContribution = 0;
            let masteresilistEmployerContribution1 = 0;

            let masterhrdflistEmployerContribution = 0;
            let masterhrdflistEmployeeContribution = 0;

            let employeesalarysetupPCBGroup = strSelectEmployeeSalaryResult[0].employeesalarysetupPCBGroup;
            let employeesalarysetupResidentialStatus = strSelectEmployeeSalaryResult[0].employeesalarysetupResidentialStatus[0];
            let employeesalarysetupRemunerationType = strSelectEmployeeSalaryResult[0].employeesalarysetupRemunerationType;

            let employeesalarysetupDisabledIndividual = strSelectEmployeeSalaryResult[0].employeesalarysetupDisabledIndividual;
            let employeesalarysetupDisabledSpouse = strSelectEmployeeSalaryResult[0].employeesalarysetupDisabledSpouse;

            //#region 

            //! EPF
            let filterMasterEpfList = selectMasterEpfList.filter(x =>
                x.masterepfId == strSelectEmployeeSalaryResult[0].employeesalarysetupEPFGroup &&
                x.masterepflistFrom <= _epfWageTotal &&
                x.masterepflistTo >= _epfWageTotal
            );
            if (_epfWageTotal > 20000) {
                let _epfFilterList = selectMasterEpfList.filter(x => x.masterepfId == strSelectEmployeeSalaryResult[0].employeesalarysetupEPFGroup);
                if (_epfFilterList.length > 0) {
                    let employeePer = _epfFilterList[0].masterepfEmployeePer || 0;
                    let employerPer = _epfFilterList[0].masterepfEmployerPer || 0;

                    masterepflistDifference = 0;
                    masterepflistEmploeePercentage = (_epfWageTotal * employeePer / 100);
                    masterepflistEmployerPercentage = (_epfWageTotal * employerPer / 100);
                } else {
                    masterepflistDifference = 0;
                    masterepflistEmploeePercentage = 0;
                    masterepflistEmployerPercentage = 0;
                }
            } else {
                if (filterMasterEpfList.length == 0 || strSelectEmployeeSalaryResult[0].employeesalarysetupEPFGroup == 0) {
                    masterepflistDifference = 0;
                    masterepflistEmploeePercentage = 0;
                    masterepflistEmployerPercentage = 0;
                } else {
                    masterepflistDifference = filterMasterEpfList[0].masterepflistDifference;
                    masterepflistEmploeePercentage = filterMasterEpfList[0].masterepflistEmploeePercentage;
                    masterepflistEmployerPercentage = filterMasterEpfList[0].masterepflistEmployerPercentage;
                }
            }

            //! SOCSO
            let filterMasterSocsoList = selectMasterSocsoList.filter(x =>
                x.mastersocsoId == strSelectEmployeeSalaryResult[0].employeesalarysetupSocsoGroup &&
                x.mastersocsolistFrom <= _socsoWageTotal &&
                x.mastersocsolistTo >= _socsoWageTotal
            );
            if (strSelectEmployeeSalaryResult[0].employeesalarysetupSocsoGroup != 0) {
                if (filterMasterSocsoList.length == 0) {
                    filterMasterSocsoList = selectMasterSocsoList[selectMasterSocsoList.length - 1];
                    mastersocsolistEmployerContribution = filterMasterSocsoList.mastersocsolistEmployerContribution;
                    mastersocsolistEmployeeContribution = filterMasterSocsoList.mastersocsolistEmployeeContribution;
                    mastersocsolistEmployerContribution1 = filterMasterSocsoList.mastersocsolistEmployerContribution1;
                } else {
                    mastersocsolistEmployerContribution = filterMasterSocsoList[0].mastersocsolistEmployerContribution;
                    mastersocsolistEmployeeContribution = filterMasterSocsoList[0].mastersocsolistEmployeeContribution;
                    mastersocsolistEmployerContribution1 = filterMasterSocsoList[0].mastersocsolistEmployerContribution1;
                }
            } else {
                mastersocsolistEmployerContribution = 0;
                mastersocsolistEmployeeContribution = 0;
                mastersocsolistEmployerContribution1 = 0;
            }

            //! ESI
            let filterMasterEsiList = selectMasterEsiList.filter(x =>
                x.masteresiId == strSelectEmployeeSalaryResult[0].employeesalarysetupEISGroup &&
                x.masteresilistFrom <= _esiWageTotal &&
                x.masteresilistTo >= _esiWageTotal
            );
            if (strSelectEmployeeSalaryResult[0].employeesalarysetupEISGroup != 0) {
                if (filterMasterEsiList.length == 0) {
                    filterMasterEsiList = selectMasterEsiList[selectMasterEsiList.length - 1];
                    masteresilistEmployerContribution = filterMasterEsiList.masteresilistEmployerContribution;
                    masteresilistEmployeeContribution = filterMasterEsiList.masteresilistEmployeeContribution;
                    masteresilistEmployerContribution1 = filterMasterEsiList.masteresilistEmployerContribution1;
                } else {
                    masteresilistEmployerContribution = filterMasterEsiList[0].masteresilistEmployerContribution;
                    masteresilistEmployeeContribution = filterMasterEsiList[0].masteresilistEmployeeContribution;
                    masteresilistEmployerContribution1 = filterMasterEsiList[0].masteresilistEmployerContribution1;
                }
            } else {
                masteresilistEmployerContribution = 0;
                masteresilistEmployeeContribution = 0;
                masteresilistEmployerContribution1 = 0;
            }

            //! HRDF
            let filterMasterhrdfList = selectMasterhrdfList.filter(x =>
                x.masterhrdfId == strSelectEmployeeSalaryResult[0].employeesalarysetupHRDFGroup &&
                x.masterhrdflistFrom <= _hrdfWageTotal &&
                x.masterhrdflistTo >= _hrdfWageTotal
            );
            if (strSelectEmployeeSalaryResult[0].employeesalarysetupHRDFGroup != 0) {
                masterhrdflistEmployerContribution = filterMasterhrdfList[0].masterhrdflistEmployerPercentage;
                masterhrdflistEmployeeContribution = filterMasterhrdfList[0].masterhrdflistEmploeePercentage;
            }

            //#endregion

            let EpfERate = strSelectEmployeeSalaryResult[0].employeestatutorysetupEpfERate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupEpfERate : masterepflistEmploeePercentage;
            let EpfRRate = strSelectEmployeeSalaryResult[0].employeestatutorysetupEpfRRate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupEpfRRate : masterepflistEmployerPercentage;

            let SocsoERate = strSelectEmployeeSalaryResult[0].employeestatutorysetupSocsoERate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupSocsoERate : strSelectEmployeeSalaryResult[0].employeesalarysetupSocsoCategory == 1 ? mastersocsolistEmployeeContribution : 0.0;
            let SocsoRRate = strSelectEmployeeSalaryResult[0].employeestatutorysetupSocsoRRate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupSocsoRRate : strSelectEmployeeSalaryResult[0].employeesalarysetupSocsoCategory == 1 ? mastersocsolistEmployerContribution : mastersocsolistEmployerContribution1;

            let EISERate = strSelectEmployeeSalaryResult[0].employeestatutorysetupEISERate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupEISERate : strSelectEmployeeSalaryResult[0].employeesalarysetupEISCategory == 1 ? masteresilistEmployeeContribution : 0.0;
            let EISRRate = strSelectEmployeeSalaryResult[0].employeestatutorysetupEISRRate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupEISRRate : strSelectEmployeeSalaryResult[0].employeesalarysetupEISCategory == 1 ? masteresilistEmployerContribution : masteresilistEmployerContribution1;

            let PCBERate = 0;
            let PCBRRate = 0;
            if (employeesalarysetupPCBGroup == 1) {
                PCBERate = strSelectEmployeeSalaryResult[0].employeestatutorysetupPCBERate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupPCBERate : 0.0;
                PCBRRate = 0;
            }

            let HRDFERate = (_hrdfWageTotal / 100) * masterhrdflistEmployeeContribution;
            let HRDFRRate = (_hrdfWageTotal / 100) * masterhrdflistEmployerContribution;


            if (employeesalarysetupResidentialStatus == 0 && employeesalarysetupPCBGroup == 1) {

                PCBERate = (strSelectEmployeeSalaryResult[0].employeesalarysetupCurrentBasic * 0.30).toFixed(2);

            } else {
                if (employeesalarysetupPCBGroup == 1) {
                    if (PCBERate == 0) {

                        let Y = 0;
                        let K = 0;
                        let Y1 = 0;
                        let K1 = 0;
                        let Yt = 0;
                        let Kt = 0;
                        let D = 0;
                        let S = 0;
                        let DU = 0;
                        let SU = 0;
                        let QC = 0;
                        let LP = 0;
                        let LP1 = 0;
                        let N = 12 - parseInt(_month);
                        let n = N + 1;
                        let M = 0;
                        let R = 0;
                        let B = 0;
                        let Z = 0;
                        let X1 = 0;

                        let _pcbAllowance = 0;
                        let _pcbAllowanceBIK = 0;

                        let _pcbSalaryBasic0 = 0;
                        let _EISERate0 = 0;
                        let _EpfERate0 = 0;
                        let _SocsoERate0 = 0;
                        let _PcbERate0 = 0;
                        let _pcbAllowance0 = 0;
                        let _pcbAllowanceBIK0 = 0;

                        let _overtimeCal0 = 0;
                        let _shiftCal0 = 0;
                        let _addPayCal0 = 0;

                        let category = strSelectEmployeeSalaryResult[0].employeesalarysetupCategory;
                        let children = strSelectEmployeeSalaryResult[0].employeesalarysetupChildren || 0;

                        let _pcbSalaryBasic = strSelectEmployeeSalaryResult[0].employeesalarysetupCurrentBasic;
                        let _pcbAccumulatedPTAE = strSelectEmployeeSalaryResult[0].employeesalarysetupAccumulatedPTAE || 0;
                        let _pcbAccumulatedPTABIK = strSelectEmployeeSalaryResult[0].employeesalarysetupAccumulatedPTABIK || 0;
                        let _employeesalarysetupAccumulatedMTD = strSelectEmployeeSalaryResult[0].employeesalarysetupAccumulatedMTD || 0;

                        let _employeesalarysetupAccumulatedEPF = strSelectEmployeeSalaryResult[0].employeesalarysetupAccumulatedEPF || 0;
                        let _employeesalarysetupAccumulatedSocso = strSelectEmployeeSalaryResult[0].employeesalarysetupAccumulatedSocso || 0;
                        let _employeesalarysetupAccumulatedZakat = strSelectEmployeeSalaryResult[0].employeesalarysetupAccumulatedZakat || 0;

                        const reliefsCodeData = require('../../reliefs.json');
                        if (reliefsCodeData.length > 0) {
                            let filterYearData = reliefsCodeData.filter(x => x.year == _year);

                            if (filterYearData.length > 0) {
                                let filterTypes = filterYearData[0].types;

                                if (employeesalarysetupDisabledIndividual[0] == true) {
                                    let _DisabledIndividual = filterTypes.filter(x => x.title == 'Disabled-Individual');
                                    DU = _DisabledIndividual[0].Code;
                                }

                                if (employeesalarysetupDisabledSpouse[0] == true) {
                                    let _DisabledHusbandWife = filterTypes.filter(x => x.title == 'Disabled-Husband-Wife');
                                    SU = _DisabledHusbandWife[0].Code;
                                }

                                let _individual = filterTypes.filter(x => x.title == 'Individual');
                                D = _individual[0].Code;

                                let _spouseNotWorking = filterTypes.filter(x => x.title == 'Husband-Wife');
                                if (category == 3 || category == 1) {
                                    S = 0;
                                } else {
                                    S = parseFloat(_spouseNotWorking[0].Code);
                                }

                                let _child = filterTypes.filter(x => x.title == 'Child');
                                QC = parseFloat(_child[0].Code) * parseFloat(children);
                            }
                        }

                        let _pcbFilterSelectAllowancenDeduction = AllowanceMaster;
                        if (_pcbFilterSelectAllowancenDeduction.length > 0) {
                            for (let p = 0; p < _pcbFilterSelectAllowancenDeduction.length; p++) {

                                if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceAdditionalRemuneration.data[0] == false) {
                                    let _dataTotal = 0;
                                    if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceProrate.data[0] == 1)
                                        _dataTotal = parseFloat((_pcbFilterSelectAllowancenDeduction[p].Amount / _totalDaysPayrollDate) * _workingDays).toFixed(2);
                                    else
                                        _dataTotal = parseFloat(_pcbFilterSelectAllowancenDeduction[p].Amount);

                                    if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceBenefitInKind.data[0] == false) {
                                        _pcbAllowance += _dataTotal;
                                    } else {
                                        if (_dataTotal > 0)
                                            _pcbAllowanceBIK += _dataTotal;

                                        if (_dataTotal < 0)
                                            LP1 += Math.abs(_dataTotal);
                                    }

                                    if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceZakat.data[0] == true)
                                        Z += _dataTotal;
                                }
                            }
                        }

                        if (_month != 1) {
                            if (selectPreviousMonth.length > 0) {
                                let uniquePayrollId = selectPreviousMonth.map(x => x.payrollId);
                                let payrollIds = uniquePayrollId.toString();
                                let strSelectPayrollSalary = _clspayrollsalary.data.select(" and payrollId in (" + payrollIds + ") and employeeId = " + employeeId);
                                let [strSelectPayrollSalaryResult] = await dbSecurity.asyncResult(strSelectPayrollSalary);

                                if (strSelectPayrollSalaryResult.length > 0) {
                                    let uniquePayrollsalaryId = strSelectPayrollSalaryResult.map(x => x.payrollsalaryId);
                                    let payrollsalaryIds = uniquePayrollsalaryId.toString();

                                    for (let aa = 0; aa < strSelectPayrollSalaryResult.length; aa++) {
                                        _pcbSalaryBasic0 += parseFloat(strSelectPayrollSalaryResult[aa].payrollsalaryBasic);
                                    }

                                    let strSelectPayrollStatutory = _clspayrollstatutory.data.select(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                    let strSelectPayrollAllowancendeduction = _clspayrollallowancendeduction.data.select_view_payrollallowancendeduction(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                    let strSelectPayrollShift = _clspayrollshift.data.select_view_payrollshift(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                    let strSelectPayrollAdditionalPay = _clspayrolladditionalpay.data.select_view_payrolladditionalpay(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                                    let strSelectPayrollOvertime = _clspayrollovertime.data.select_view_payrollovertime(" and payrollsalaryId in (" + payrollsalaryIds + ") ");

                                    let [strSelectPayrollStatutoryAllowancendeductionResult] = await dbSecurity.asyncResult(strSelectPayrollStatutory + ";" + strSelectPayrollAllowancendeduction + ";" +
                                        strSelectPayrollShift + ";" + strSelectPayrollAdditionalPay + ";" + strSelectPayrollOvertime);


                                    let strSelectPayrollStatutory1 = strSelectPayrollStatutoryAllowancendeductionResult[0];
                                    let strSelectPayrollAllowancendeduction1 = strSelectPayrollStatutoryAllowancendeductionResult[1];
                                    let strSelectPayrollShift1 = strSelectPayrollStatutoryAllowancendeductionResult[2];
                                    let strSelectPayrollAdditionalPay1 = strSelectPayrollStatutoryAllowancendeductionResult[3];
                                    let strSelectPayrollOvertime1 = strSelectPayrollStatutoryAllowancendeductionResult[4];

                                    if (strSelectPayrollOvertime1.length > 0) {
                                        for (let om = 0; om < strSelectPayrollOvertime1.length; om++) {
                                            if (strSelectPayrollOvertime1[om].employerotsetupPCB[0] == 1) {
                                                _overtimeCal0 += strSelectPayrollOvertime1[om].payrollovertimeRate * strSelectPayrollOvertime1[om].payrollovertimeUnit;
                                            }
                                        }
                                    }
                                    if (strSelectPayrollShift1.length > 0) {
                                        for (let sm = 0; sm < strSelectPayrollShift1.length; sm++) {
                                            if (strSelectPayrollShift1[sm].employershiftsetupPCB[0] == 1) {
                                                _shiftCal0 += strSelectPayrollShift1[sm].payrollShiftRate * strSelectPayrollShift1[sm].payrollShiftUnit;
                                            }
                                        }
                                    }
                                    if (strSelectPayrollAdditionalPay1.length > 0) {
                                        for (let am = 0; am < strSelectPayrollAdditionalPay1.length; am++) {
                                            if (strSelectPayrollAdditionalPay1[am].employeradditionalpaysetupPCB[0] == 1) {
                                                _addPayCal0 += strSelectPayrollAdditionalPay1[am].payrolladditionalpayRate * strSelectPayrollAdditionalPay1[am].payrolladditionalpayUnit;
                                            }
                                        }
                                    }

                                    if (strSelectPayrollStatutoryAllowancendeductionResult.length > 0) {
                                        for (let sp = 0; sp < strSelectPayrollStatutory1.length; sp++) {
                                            _EISERate0 += strSelectPayrollStatutory1[sp].payrollstatutoryEISEmployee;
                                            _EpfERate0 += strSelectPayrollStatutory1[sp].payrollstatutoryEpfEmployee;
                                            _SocsoERate0 += strSelectPayrollStatutory1[sp].payrollstatutorySocsoEmployee;
                                            _PcbERate0 += strSelectPayrollStatutory1[sp].payrollstatutoryPcbEmployee;
                                        }
                                        for (let sp = 0; sp < strSelectPayrollAllowancendeduction1.length; sp++) {
                                            if (strSelectPayrollAllowancendeduction1[sp].employerallowanceBenefitInKind[0] == false)
                                                _pcbAllowance0 += strSelectPayrollAllowancendeduction1[sp].payrollallowancendeductionAmount;
                                            else {
                                                if (strSelectPayrollAllowancendeduction1[sp].payrollallowancendeductionAmount > 0)
                                                    _pcbAllowanceBIK0 += strSelectPayrollAllowancendeduction1[sp].payrollallowancendeductionAmount;
                                                else {
                                                    LP += Math.abs(strSelectPayrollAllowancendeduction1[sp].payrollallowancendeductionAmount);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            X1 = _PcbERate0 + _employeesalarysetupAccumulatedMTD;
                        }

                        let val1 = parseFloat(_pcbAllowanceBIK0) < 0 ? 0 : parseFloat(_pcbAllowanceBIK0);
                        Y = ((parseFloat(_pcbSalaryBasic0) + parseFloat(_pcbAllowance0) + val1) + (parseFloat(_pcbAccumulatedPTAE) + parseFloat(_pcbAccumulatedPTABIK)) + _overtimeCal0 + _shiftCal0 + _addPayCal0).toFixed(2);
                        K = parseFloat(_EpfERate0) + parseFloat(_employeesalarysetupAccumulatedEPF);
                        if (K > 4000) {
                            K = 4000;
                        }
                        let _A = parseFloat(Y) - K;
                        //. current month

                        let _overtimeCal = 0;
                        let _shiftCal = 0;
                        let _addPayCal = 0;

                        if (overtimeMaster.length > 0) {
                            for (let om = 0; om < overtimeMaster.length; om++) {
                                if (overtimeMaster[om].employerotsetupPCB.data[0] == 1) {
                                    _overtimeCal += overtimeMaster[om].payrollovertimeRate * overtimeMaster[om].payrollovertimeUnit;
                                }
                            }
                        }
                        if (shiftMaster.length > 0) {
                            for (let sm = 0; sm < shiftMaster.length; sm++) {
                                if (shiftMaster[sm].employershiftsetupPCB.data[0] == 1) {
                                    _shiftCal += shiftMaster[sm].payrollShiftRate * shiftMaster[sm].payrollShiftUnit;
                                }
                            }
                        }
                        if (addPayMaster.length > 0) {
                            for (let am = 0; am < addPayMaster.length; am++) {
                                if (addPayMaster[am].employeradditionalpaysetupPCB.data[0] == 1) {
                                    _addPayCal += addPayMaster[am].payrolladditionalpayRate * addPayMaster[am].payrolladditionalpayUnit;
                                }
                            }
                        }

                        let val = parseFloat(_pcbAllowanceBIK) < 0 ? 0 : parseFloat(_pcbAllowanceBIK);
                        Y1 = ((parseFloat(_pcbSalaryBasic) + parseFloat(_pcbAllowance) + val) + _overtimeCal + _shiftCal + _addPayCal - masterTotalNPL).toFixed(2);
                        K1 = parseFloat(EpfERate);
                        if ((parseFloat(_EpfERate0) + parseFloat(_employeesalarysetupAccumulatedEPF)) > 4000) {
                            K1 = 0;
                        }
                        let _B = parseFloat(Y1) - parseFloat(K1);

                        //. next month
                        let _C = 0;
                        if (_month != 12) {
                            //4000 set in file like reliefs

                            let value = 4000 - (parseFloat(K) + parseFloat(K1));
                            let _pp = (value / N).toString();

                            if (parseFloat(_pp) > parseFloat(K1)) {
                                _pp = parseFloat(K1);
                            }

                            _C = parseFloat(_pp).toFixed(3).slice(0, -1);

                        }

                        let P = ((_A + _B + (parseFloat(Y1) - parseFloat(_C)) * N + (Yt - Kt)) - (D + S + DU + SU + QC + (LP + LP1))).toFixed(2);

                        const table1 = require('../../table1.json');
                        if (table1.length > 0) {
                            for (let q = 0; q < table1.length; q++) {

                                let _range0 = table1[q].range0;
                                let _range1 = table1[q].range1;
                                let _M = table1[q].M;
                                let _R = table1[q].R;
                                let _B13 = table1[q].B13;
                                let _B2 = table1[q].B2;

                                if (_range0 < P && _range1 > P) {
                                    M = _M;
                                    R = _R;
                                    if (category == 2)
                                        B = _B2;
                                    if (category == 1 || category == 3)
                                        B = _B13;

                                    break;
                                }
                            }
                        }

                        let _val1 = (parseFloat(P) - M) * (R / 100) + B - (Z + X1);
                        let _val = (_val1 / n).toFixed(2);

                        //#region Additional Remuneration 

                        let _TotalYearMTD = X1 + parseFloat(_val) * (N + 1);

                        let totalAdditionalRemuneration = 0;
                        let totalAdditionalRemunerationEpfERate = 0;
                        let flagAdditionalRemuneration = false;
                        if (_pcbFilterSelectAllowancenDeduction.length > 0) {
                            for (let p = 0; p < _pcbFilterSelectAllowancenDeduction.length; p++) {

                                if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceAdditionalRemuneration.data[0] == true) {
                                    let _dataTotal = 0;
                                    flagAdditionalRemuneration = true;
                                    if (_pcbFilterSelectAllowancenDeduction[p].employerallowanceProrate.data[0] == 1)
                                        _dataTotal = parseFloat((_pcbFilterSelectAllowancenDeduction[p].Amount / totalDaysPayrollDate) * _workingDays).toFixed(2);
                                    else
                                        _dataTotal = parseFloat(_pcbFilterSelectAllowancenDeduction[p].Amount);

                                    let filterMasterEpfList = selectMasterEpfList.filter(x =>
                                        x.masterepfId == strSelectEmployeeSalaryResult[0].employeesalarysetupEPFGroup &&
                                        x.masterepflistFrom <= _dataTotal &&
                                        x.masterepflistTo >= _dataTotal
                                    );
                                    if (_dataTotal > 20000) {
                                        let _epfFilterList = selectMasterEpfList.filter(x => x.masterepfId == strSelectEmployeeSalaryResult[0].employeesalarysetupEPFGroup);
                                        if (_epfFilterList.length > 0) {
                                            let employeePer = _epfFilterList[0].masterepfEmployeePer || 0;
                                            let employerPer = _epfFilterList[0].masterepfEmployerPer || 0;

                                            masterepflistDifference = 0;
                                            masterepflistEmploeePercentage = (_dataTotal * employeePer / 100);
                                            masterepflistEmployerPercentage = (_dataTotal * employerPer / 100);
                                        } else {
                                            masterepflistDifference = 0;
                                            masterepflistEmploeePercentage = 0;
                                            masterepflistEmployerPercentage = 0;
                                        }
                                    } else {
                                        if (filterMasterEpfList.length == 0 || strSelectEmployeeSalaryResult[0].employeesalarysetupEPFGroup == 0) {
                                            masterepflistDifference = 0;
                                            masterepflistEmploeePercentage = 0;
                                            masterepflistEmployerPercentage = 0;
                                        } else {
                                            masterepflistDifference = filterMasterEpfList[0].masterepflistDifference;
                                            masterepflistEmploeePercentage = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                            masterepflistEmployerPercentage = filterMasterEpfList[0].masterepflistEmployerPercentage;
                                        }
                                    }

                                    let EpfERate = strSelectEmployeeSalaryResult[0].employeestatutorysetupEpfERate != 0 ? strSelectEmployeeSalaryResult[0].employeestatutorysetupEpfERate : masterepflistEmploeePercentage;

                                    totalAdditionalRemuneration += _dataTotal;
                                    totalAdditionalRemunerationEpfERate += EpfERate;
                                }
                            }
                        }

                        if (flagAdditionalRemuneration == true) {

                            let _C = 0;
                            if (_month != 12) {
                                //4000 set in file like reliefs

                                let value = 4000 - (parseFloat(K) + parseFloat(K1)) - totalAdditionalRemunerationEpfERate;
                                let _pp = (value / N).toString();

                                if (parseFloat(_pp) > parseFloat(K1)) {
                                    _pp = parseFloat(K1);
                                }

                                _C = parseFloat(_pp).toFixed(3).slice(0, -1);

                            }

                            let P = ((_A + _B + (parseFloat(Y1) - parseFloat(_C)) * N + (totalAdditionalRemuneration - totalAdditionalRemunerationEpfERate)) - (D + S + DU + SU + QC + (LP + LP1))).toFixed(2);

                            const table1 = require('../../table1.json');
                            if (table1.length > 0) {
                                for (let q = 0; q < table1.length; q++) {

                                    let _range0 = table1[q].range0;
                                    let _range1 = table1[q].range1;
                                    let _M = table1[q].M;
                                    let _R = table1[q].R;
                                    let _B13 = table1[q].B13;
                                    let _B2 = table1[q].B2;

                                    if (_range0 < P && _range1 > P) {
                                        M = _M;
                                        R = _R;
                                        if (category == 2)
                                            B = _B2;
                                        if (category == 1 || category == 3)
                                            B = _B13;

                                        break;
                                    }
                                }
                            }

                            //! Step 3
                            let _valAdditionalRemuneration0 = (parseFloat(P) - M) * (R / 100) + B;


                            //! Stpe 4
                            let MTDS = parseFloat(_valAdditionalRemuneration0) - (_TotalYearMTD + parseFloat(_employeesalarysetupAccumulatedZakat));

                            _val = (parseFloat(_val) + MTDS).toFixed(2).toString();

                        }

                        //#endregion Additional Remuneration 
                        if (employeesalarysetupRemunerationType == 'Normal Remuneration') {

                        }

                        if (employeesalarysetupRemunerationType == 'Returning Expert Program') {

                            let R = 0;
                            let T = 0;
                            const tableComputerisedProgram = require('../../computerisedProgram.json');
                            if (parseFloat(P) <= 35000) {
                                R = tableComputerisedProgram[0].R;
                                if (category == 2)
                                    T = tableComputerisedProgram[0]["T-2"];
                                if (category == 1 || category == 3)
                                    T = tableComputerisedProgram[0]["T-13"];
                            }
                            if (parseFloat(P) >= 35000) {
                                R = tableComputerisedProgram[1].R;
                                if (category == 2)
                                    T = tableComputerisedProgram[1]["T-2"];
                                if (category == 1 || category == 3)
                                    T = tableComputerisedProgram[1]["T-13"];
                            }

                            let expertProgram = 0;
                            expertProgram = ((parseFloat(P) * R - T) - (Z + X1)) / n;
                            _val = (expertProgram - Z).toFixed(2).toString();
                        }

                        if (employeesalarysetupRemunerationType == 'Knowledge worker') {
                            let R = 0;
                            let T = 0;
                            const tableComputerisedProgram = require('../../computerisedProgram.json');
                            if (parseFloat(P) <= 35000) {
                                R = tableComputerisedProgram[0].R;
                                if (category == 2)
                                    T = tableComputerisedProgram[0]["T-2"];
                                if (category == 1 || category == 3)
                                    T = tableComputerisedProgram[0]["T-13"];
                            }
                            if (parseFloat(P) >= 35000) {
                                R = tableComputerisedProgram[1].R;
                                if (category == 2)
                                    T = tableComputerisedProgram[1]["T-2"];
                                if (category == 1 || category == 3)
                                    T = tableComputerisedProgram[1]["T-13"];
                            }

                            let expertProgram = 0;
                            expertProgram = ((parseFloat(P) * R - T) - (Z + X1)) / n;
                            _val = (expertProgram - Z).toFixed(2).toString();
                        }

                        if (parseFloat(_val) < 0) {
                            _val = 0;
                        }

                        if (_val < 10)
                            _val = '0.00';

                        var _a = _val.split('.')[0];
                        var _b = _val.split('.')[1];

                        let _c = dbCommon.diff_values(parseFloat(_b));
                        let c = (parseFloat(_a) + _c).toFixed(2);

                        PCBERate = parseFloat(c).toFixed(2);

                    }
                }
            }
            return {
                epfWageTotal: _epfWageTotal.toFixed(4),
                EpfERate: EpfERate.toFixed(4),
                EpfRRate: EpfRRate.toFixed(4),
                socsoWageTotal: _socsoWageTotal.toFixed(4),
                SocsoERate: SocsoERate.toFixed(4),
                SocsoRRate: SocsoRRate.toFixed(4),
                esiWageTotal: _esiWageTotal.toFixed(4),
                EISERate: EISERate.toFixed(4),
                EISRRate: EISRRate.toFixed(4),
                PCBERate: PCBERate,
                PCBRRate: PCBRRate.toFixed(4),
                hrdfWageTotal: _hrdfWageTotal.toFixed(4),
                HRDFERate: HRDFERate.toFixed(4),
                HRDFRRate: HRDFRRate.toFixed(4)
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSalaryInsertProcessExection: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            const pool = await dbSecurity.asyncDbConnection();
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            try {

                let payrollsalaryId = request.body.payrollsalaryId;
                let employeeId = request.body.employeeId;

                let payrollId = request.body.payrollId;
                request.body.payrollId = payrollId;

                let basicpay = request.body.basicpay;
                let generated = request.body.generated;
                let grosspay = request.body.grosspay;
                let netpay = request.body.netpay;
                let payrollsalaryWorkingDay = request.body.payrollsalaryWorkingDay;
                let isStatutory = request.body.isStatutory;
                let isPaidLeave = request.body.isPaidLeave;

                let epfWages = request.body.epfWages;
                let epfEmployee = request.body.epfEmployee;
                let epfEmployer = request.body.epfEmployer;

                let socsoWages = request.body.socsoWages;
                let socsoEmployee = request.body.socsoEmployee;
                let socsoEmployer = request.body.socsoEmployer;

                let esiWages = request.body.esiWages;
                let esiEmployee = request.body.esiEmployee;
                let esiEmployer = request.body.esiEmployer;

                let pcbWages = 0.0;
                let pcbEmployee = request.body.pcbEmployee;
                let pcbEmployer = 0.0;

                let hrdfWages = request.body.hrdfWages;
                let hrdfEmployee = request.body.hrdfEmployee;
                let hrdfEmployer = request.body.hrdfEmployer;

                let nplDays = request.body.nplDays;
                let nplHours = request.body.nplHours;
                let nplDaysUnit = request.body.nplDaysUnit;
                let nplHoursUnit = request.body.nplHoursUnit;

                let AdditionalPay = JSON.parse(request.body.AdditionalPay);
                let Overtime = JSON.parse(request.body.Overtime);
                let Shift = JSON.parse(request.body.Shift);
                let Allowance = JSON.parse(request.body.Allowance);

                //! Salary
                request.body.payrollsalaryId = payrollsalaryId;
                request.body.employeeId = employeeId;
                request.body.payrollsalaryBasic = basicpay;
                request.body.payrollsalaryGenerated = generated;
                request.body.payrollsalaryGross = grosspay;
                request.body.payrollsalaryNet = netpay;
                request.body.payrollIsStatutory = isStatutory;
                request.body.payrollIsPaidLeave = isPaidLeave;

                let verbPayrollSalary = _clspayrollsalary.data.masterData(request);
                let strUpdatePayrollSalary = _clspayrollsalary.data.updateStringColumn(verbPayrollSalary);

                //! Statutory
                request.body.payrollstatutoryEpfWages = epfWages;
                request.body.payrollstatutoryEpfEmployee = epfEmployee;
                request.body.payrollstatutoryEpfEmployer = epfEmployer;
                request.body.payrollstatutorySocsoWages = socsoWages;
                request.body.payrollstatutorySocsoEmployee = socsoEmployee;
                request.body.payrollstatutorySocsoEmployer = socsoEmployer;
                request.body.payrollstatutoryEISWages = esiWages;
                request.body.payrollstatutoryEISEmployee = esiEmployee;
                request.body.payrollstatutoryEISEmployer = esiEmployer;
                request.body.payrollstatutoryPcbWages = pcbWages;
                request.body.payrollstatutoryPcbEmployee = pcbEmployee;
                request.body.payrollstatutoryPcbEmployer = pcbEmployer;
                request.body.payrollstatutoryHrdfWages = hrdfWages;
                request.body.payrollstatutoryHrdfEmployee = hrdfEmployee;
                request.body.payrollstatutoryHrdfEmployer = hrdfEmployer;

                let verbPayrollStatutory = _clspayrollstatutory.data.masterData(request);
                let strUpdatePayrollStatutory = _clspayrollstatutory.data.updateStringColumn(verbPayrollStatutory);

                //!NPL
                request.body.payrollNplDaysRate = nplDays;
                request.body.payrollNplDayUnit = nplDaysUnit;
                request.body.payrollNplHourRate = nplHours;
                request.body.payrollNplHourUnit = nplHoursUnit;

                let verbPayrollNPL = _clspayrollnpl.data.masterData(request);
                let strUpdatePayrollNPL = _clspayrollnpl.data.updateStringColumn(verbPayrollNPL);

                //!Additional-Pay
                let strRemovePayrollAdditionalPay = _clspayrolladditionalpay.data.deleteString(" and payrollsalaryId = " + payrollsalaryId);
                let strInsertPayrollAdditionalPay = '';
                if (AdditionalPay.length > 0) {
                    strInsertPayrollAdditionalPay = _clspayrolladditionalpay.data.insertString();
                    for (let i = 0; i < AdditionalPay.length; i++) {
                        if (i != 0)
                            strInsertPayrollAdditionalPay += ",";
                        strInsertPayrollAdditionalPay += "(" + payrollsalaryId + ", " + AdditionalPay[i].employeradditionalpaysetupId + "," + AdditionalPay[i].payrolladditionalpayRate +
                            " , " + AdditionalPay[i].payrolladditionalpayUnit + ", '0', now())";
                    }
                }

                //!Overtime
                let strRemovePayrollOvertime = _clspayrollovertime.data.deleteString(" and payrollsalaryId = " + payrollsalaryId);
                let strInsertPayrollOvertime = '';
                if (Overtime.length > 0) {
                    strInsertPayrollOvertime = _clspayrollovertime.data.insertString();
                    for (let i = 0; i < Overtime.length; i++) {
                        if (i != 0)
                            strInsertPayrollOvertime += ",";
                        strInsertPayrollOvertime += "(" + payrollsalaryId + ", " + Overtime[i].employeeotsetupId + ", " + Overtime[i].payrollovertimeRate +
                            ", " + Overtime[i].payrollovertimeUnit + ", '0', now())";
                    }
                }

                //!Shift
                let strRemovePayrollShift = _clspayrollshift.data.deleteString(" and payrollsalaryId = " + payrollsalaryId);
                let strInsertPayrollShift = '';
                if (Shift.length > 0) {
                    strInsertPayrollShift = _clspayrollshift.data.insertString();
                    for (let i = 0; i < Shift.length; i++) {
                        if (i != 0)
                            strInsertPayrollShift += ",";
                        strInsertPayrollShift += "(" + payrollsalaryId + ", " + Shift[i].employeeshiftsetupId + ", " + Shift[i].payrollShiftRate +
                            ", " + Shift[i].payrollShiftUnit + ", '0', now())";
                    }
                }

                //! Allowance-Deduction
                let strRemoveAllowancenDeduction = _clspayrollallowancendeduction.data.deleteString(" and payrollsalaryId = " + payrollsalaryId);
                let strInsertAllowancenDeduction = '';
                if (Allowance.length > 0) {
                    strInsertAllowancenDeduction = _clspayrollallowancendeduction.data.insertString();
                    for (let i = 0; i < Allowance.length; i++) {
                        if (i != 0)
                            strInsertAllowancenDeduction += ",";
                        strInsertAllowancenDeduction += "(" + payrollsalaryId + ", " + Allowance[i].employerallowanceId + ", " + Allowance[i].Amount +
                            ", '0', now())";
                    }
                }

                //?
                let [strUpdatePayroll, _strUpdatePayroll] = await connection.query(strUpdatePayrollSalary + ";" + strUpdatePayrollStatutory + ";" + strUpdatePayrollNPL);
                let [strRemovePayroll, _strRemovePayroll] = await connection.query(strRemovePayrollAdditionalPay + ";" + strRemovePayrollOvertime + ";" + strRemovePayrollShift + ";" + strRemoveAllowancenDeduction);
                let [strInsertPayroll, _strInsertPayroll] = await connection.query(strInsertPayrollAdditionalPay + ";" + strInsertPayrollOvertime + ";" + strInsertPayrollShift + ";" + strInsertAllowancenDeduction);

                await connection.commit();
                connection.release();
                connection.destroy();

                return {
                    'flag': true,
                    'query': "Record Inserted!"
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

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbPayrollPayslipReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportMonth = request.body.reportMonth;
            let reportYear = request.body.reportYear;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = _clspayroll.data.selectall(' and employerId = ' + employerId + ' and payrollYear = ' + reportYear + ' and payrollMonth = ' + reportMonth);
            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

            let strwhere = "";
            if (strPayrollResult.length > 0) {
                let payrollId = strPayrollResult[0].payrollId;

                strwhere += " and payrollId = " + payrollId;
                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                if (sortBy == "memberName")
                    strwhere += " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strwhere += " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strwhere += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strwhere += " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strwhere += " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(strwhere);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);
                if (strPayrollSalaryResult.length > 0) {

                    let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                    let payrollsalaryIds = payrollsalaryId.toString();
                    //.
                    let strPayrollNPL = _clspayrollnpl.data.select_payrollNplForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollShift = _clspayrollshift.data.select_payrollShiftForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollOvertime = _clspayrollovertime.data.select_payrollOvertimeForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollAdditionalPay = _clspayrolladditionalpay.data.select_payrollAdditionalPayForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollAllowancenDeduction = _clspayrollallowancendeduction.data.select_payrollAllowancenDeductionForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollLoan = _clspayrollloan.data.select_payrollLoanForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");

                    let strwhereleave = "";
                    if (employeeIds != '')
                        strwhereleave += " and employeeId in (" + employeeIds + ")";
                    let strCurrentLeave = _clsemployeeleavereport.data.select_CurrentYearSummaryReport(" and employerId = " + employerId + strwhereleave);

                    let [strMasterResult, _strMasterResult] = await dbSecurity.asyncResult(
                        strPayrollNPL + ";" +
                        strPayrollShift + ";" +
                        strPayrollOvertime + ";" +
                        strPayrollAdditionalPay + ";" +
                        strPayrollAllowancenDeduction + ";" +
                        strPayrollLoan + ";" +
                        strCurrentLeave);

                    return {
                        'flag': true,
                        'result': [{
                            "salary": strPayrollSalaryResult,
                            "npl": strMasterResult[0],
                            "shift": strMasterResult[1],
                            "overtime": strMasterResult[2],
                            "additionalpay": strMasterResult[3],
                            "allowancendeduction": strMasterResult[4],
                            "loan": strMasterResult[5],
                            "leavereport": strMasterResult[6]
                        }],
                        'query': ''
                    };
                } else {
                    return {
                        'flag': true,
                        'result': [],
                        'query': "No record found"
                    };
                }
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollDetailReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportStartMonth = request.body.reportStartMonth;
            let reportToMonth = request.body.reportToMonth;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + " and DATE_FORMAT(payrollDate, '%Y-%m') >= DATE_FORMAT('" + reportStartMonth + "', '%Y-%m') and DATE_FORMAT(payrollDate, '%Y-%m') <= DATE_FORMAT('" + reportToMonth + "', '%Y-%m') ");
            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);
            if (strPayrollResult.length > 0) {
                let strwhere = "";
                let payrollId = strPayrollResult.map(x => x.payrollId);
                let payrollIds = payrollId.toString();

                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                let strSortBy = "";
                if (sortBy == "memberName")
                    strSortBy = " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strSortBy = " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strSortBy += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strSortBy = " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strSortBy = " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryGroupForReport(" and payrollId in (" + payrollIds + ") " + strwhere + " GROUP BY employeeId " + strSortBy);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);

                if (strPayrollSalaryResult.length > 0) {

                    let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId_sum);
                    let payrollsalaryIds = payrollsalaryId.toString();

                    let strPayrollNPL = _clspayrollnpl.data.select_payrollNplGroupForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollShift = _clspayrollshift.data.select_payrollShiftGroupForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollOvertime = _clspayrollovertime.data.select_payrollOvertimeGroupForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollAdditionalPay = _clspayrolladditionalpay.data.select_payrollAdditionalPayGroupForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollAllowancenDeduction = _clspayrollallowancendeduction.data.select_payrollAllowancenDeductionGroupForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                    let strPayrollLoan = _clspayrollloan.data.select_payrollLoanGroupForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");

                    let [strMasterResult, _strMasterResult] = await dbSecurity.asyncResult(
                        strPayrollNPL + ";" +
                        strPayrollShift + ";" +
                        strPayrollOvertime + ";" +
                        strPayrollAdditionalPay + ";" +
                        strPayrollAllowancenDeduction + ";" +
                        strPayrollLoan);

                    return {
                        'flag': true,
                        'result': [{
                            "salary": strPayrollSalaryResult,
                            "npl": strMasterResult[0],
                            "shift": strMasterResult[1],
                            "overtime": strMasterResult[2],
                            "additionalpay": strMasterResult[3],
                            "allowancendeduction": strMasterResult[4],
                            "loan": strMasterResult[5]
                        }],
                        'query': ''
                    };
                }
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }
            return {
                'flag': true,
                'result': [],
                'query': "No record found"
            };
        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollOvertimeReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportMonth = request.body.reportMonth;
            let reportYear = request.body.reportYear;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + ' and payrollYear =  ' + reportYear + ' and payrollMonth = ' + reportMonth);
            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

            if (strPayrollResult.length > 0) {
                let strwhere = "";
                let payrollId = strPayrollResult[0].payrollId;

                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                if (sortBy == "memberName")
                    strwhere += " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strwhere += " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strwhere += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strwhere += " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strwhere += " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(" and payrollId = " + payrollId + strwhere);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);
                if (strPayrollSalaryResult.length > 0) {

                    let strSelectMasterEpfList = _clsmasterepflist.data.select_view_masterepflist("");
                    let strSelectMasterSocsoList = _clsmastersocsolist.data.select("");
                    let strSelectMasterEsiList = _clsmasteresilist.data.select("");

                    let [strSelectMasterListResult, _strSelectMasterListResult] = await dbSecurity.asyncResult(
                        strSelectMasterEpfList + ";" +
                        strSelectMasterSocsoList + ";" +
                        strSelectMasterEsiList);

                    let selectMasterEpfList = strSelectMasterListResult[0];
                    let selectMasterSocsoList = strSelectMasterListResult[1];
                    let selectMasterEsiList = strSelectMasterListResult[2];

                    let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                    let payrollsalaryIdList = payrollsalaryId.toString();

                    let strPayrollOvertime = _clspayrollovertime.data.select_payrollOvertimeForPrint(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                    let [strPayrollOvertimeResult, _strPayrollOvertimeResult] = await dbSecurity.asyncResult(strPayrollOvertime);
                    if (strPayrollOvertimeResult.length > 0) {

                        let masterOvertimeData = [];
                        for (let i = 0; i < strPayrollSalaryResult.length; i++) {

                            let memberName = strPayrollSalaryResult[i].memberName;
                            let memberNric = strPayrollSalaryResult[i].memberNric;

                            let employeesalarysetupEPFGroup = strPayrollSalaryResult[i].employeesalarysetupEPFGroup;
                            let employeesalarysetupSocsoGroup = strPayrollSalaryResult[i].employeesalarysetupSocsoGroup;
                            let employeesalarysetupSocsoCategory = strPayrollSalaryResult[i].employeesalarysetupSocsoCategory;
                            let employeesalarysetupEISGroup = strPayrollSalaryResult[i].employeesalarysetupEISGroup;
                            let employeesalarysetupEISCategory = strPayrollSalaryResult[i].employeesalarysetupEISCategory;

                            let payrollsalaryId = strPayrollSalaryResult[i].payrollsalaryId;

                            let filterOvertime = strPayrollOvertimeResult.filter(x => x.payrollsalaryId == payrollsalaryId);
                            if (filterOvertime.length > 0) {

                                let verb = {};
                                let payrollOvertimeRateTotal = 0;
                                let payrollOvertimeUnitTotal = 0;

                                verb.OT1Rate = "0.00";
                                verb.OT1Unit = 0;
                                if (filterOvertime.length >= 1) {
                                    verb.OT1Unit = filterOvertime[0].payrollovertimeUnit;
                                    verb.OT1Rate = filterOvertime[0].totalOverTimeRound2;

                                    payrollOvertimeRateTotal += parseFloat(verb.OT1Rate);
                                    payrollOvertimeUnitTotal += parseFloat(verb.OT1Unit);
                                }

                                verb.OT2Rate = "0.00";
                                verb.OT2Unit = 0;
                                if (filterOvertime.length >= 2) {
                                    verb.OT2Unit = filterOvertime[1].payrollovertimeUnit;
                                    verb.OT2Rate = filterOvertime[1].totalOverTimeRound2;

                                    payrollOvertimeRateTotal += parseFloat(verb.OT2Rate);
                                    payrollOvertimeUnitTotal += parseFloat(verb.OT2Unit);
                                }

                                verb.OT3Rate = "0.00";
                                verb.OT3Unit = 0;
                                if (filterOvertime.length >= 3) {
                                    verb.OT3Unit = filterOvertime[2].payrollovertimeUnit;
                                    verb.OT3Rate = filterOvertime[2].totalOverTimeRound2;

                                    payrollOvertimeRateTotal += parseFloat(verb.OT3Rate);
                                    payrollOvertimeUnitTotal += parseFloat(verb.OT3Unit);
                                }

                                verb.OT4Rate = "0.00";
                                verb.OT4Unit = 0;
                                if (filterOvertime.length >= 4) {
                                    verb.OT4Unit = filterOvertime[3].payrollovertimeUnit;
                                    verb.OT4Rate = filterOvertime[3].totalOverTimeRound2;

                                    payrollOvertimeRateTotal += parseFloat(verb.OT4Rate);
                                    payrollOvertimeUnitTotal += parseFloat(verb.OT4Unit);
                                }

                                verb.OT5Rate = "0.00";
                                verb.OT5Unit = 0;
                                if (filterOvertime.length >= 5) {
                                    verb.OT5Unit = filterOvertime[4].payrollovertimeUnit;
                                    verb.OT5Rate = filterOvertime[4].totalOverTimeRound2;

                                    payrollOvertimeRateTotal += parseFloat(verb.OT5Rate);
                                    payrollOvertimeUnitTotal += parseFloat(verb.OT5Unit);
                                }

                                verb.memberName = memberName;
                                verb.memberNric = memberNric;
                                verb.payrollsalaryId = payrollsalaryId;
                                verb.OTUnitTotal = payrollOvertimeUnitTotal;
                                verb.OTRateTotal = payrollOvertimeRateTotal;

                                /* EPF */
                                let filterMasterEpfList = selectMasterEpfList.filter(x =>
                                    x.masterepfId == employeesalarysetupEPFGroup &&
                                    x.masterepflistFrom <= payrollOvertimeRateTotal &&
                                    x.masterepflistTo >= payrollOvertimeRateTotal);

                                if (filterMasterEpfList.length == 0) {
                                    verb.employeeEPF = 0;
                                    verb.employerEPF = 0;
                                } else {
                                    if (employeesalarysetupEPFGroup != 0) {
                                        verb.employeeEPF = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                        verb.employerEPF = filterMasterEpfList[0].masterepflistEmployerPercentage;
                                    } else {
                                        verb.employeeEPF = 0;
                                        verb.employerEPF = 0;
                                    }
                                }
                                /* socso */
                                let filterMasterSocsoList = selectMasterSocsoList.filter(x =>
                                    x.mastersocsoId == employeesalarysetupSocsoGroup &&
                                    x.mastersocsolistFrom <= payrollOvertimeRateTotal &&
                                    x.mastersocsolistTo >= payrollOvertimeRateTotal
                                );

                                if (filterMasterSocsoList.length == 0) {
                                    verb.employeeSOCSO = 0;
                                    verb.employerSOCSO = 0;
                                } else {
                                    if (employeesalarysetupSocsoGroup != 0) {
                                        verb.employeeSOCSO = employeesalarysetupSocsoCategory == 1 ? filterMasterSocsoList[0].mastersocsolistEmployeeContribution : 0.00;
                                        verb.employerSOCSO = employeesalarysetupSocsoCategory == 1 ? filterMasterSocsoList[0].mastersocsolistEmployerContribution : filterMasterSocsoList[0].mastersocsolistEmployerContribution1;
                                    } else {
                                        verb.employeeSOCSO = 0;
                                        verb.employerSOCSO = 0;
                                    }
                                }
                                /* esi */
                                let filterMasterEsiList = selectMasterEsiList.filter(x =>
                                    x.masteresiId == employeesalarysetupEISGroup &&
                                    x.masteresilistFrom <= payrollOvertimeRateTotal &&
                                    x.masteresilistTo >= payrollOvertimeRateTotal
                                );
                                if (filterMasterEsiList.length == 0) {
                                    verb.employeeEIS = 0;
                                    verb.employerEIS = 0;
                                } else {
                                    if (employeesalarysetupEISGroup != 0) {
                                        verb.employeeEIS = employeesalarysetupEISCategory == 1 ? filterMasterEsiList[0].masteresilistEmployeeContribution : 0.00;
                                        verb.employerEIS = employeesalarysetupEISCategory == 1 ? filterMasterEsiList[0].masteresilistEmployerContribution : filterMasterEsiList[0].masteresilistEmployerContribution1;
                                    } else {
                                        verb.employeeEIS = 0;
                                        verb.employerEIS = 0;
                                    }
                                }
                                masterOvertimeData.push(verb);
                            }
                        }

                        let _masterOvertimeData = [];
                        if (masterOvertimeData.length > 0) {
                            for (let i = 0; i < masterOvertimeData.length; i++) {
                                if (masterOvertimeData[i].OT1Unit == 0 &&
                                    masterOvertimeData[i].OT2Unit == 0 &&
                                    masterOvertimeData[i].OT3Unit == 0 &&
                                    masterOvertimeData[i].OT4Unit == 0 &&
                                    masterOvertimeData[i].OT5Unit == 0) {

                                } else {
                                    _masterOvertimeData.push(masterOvertimeData[i]);
                                }

                                masterOvertimeData[i].OT1Unit = masterOvertimeData[i].OT1Unit.toString();
                                masterOvertimeData[i].OT2Unit = masterOvertimeData[i].OT2Unit.toString();
                                masterOvertimeData[i].OT3Unit = masterOvertimeData[i].OT3Unit.toString();
                                masterOvertimeData[i].OT4Unit = masterOvertimeData[i].OT4Unit.toString();
                                masterOvertimeData[i].OT5Unit = masterOvertimeData[i].OT5Unit.toString();
                            }
                        }
                        if (_masterOvertimeData.length > 0) {
                            return {
                                'flag': true,
                                'result': _masterOvertimeData,
                                'query': ''
                            };
                        } else {
                            return {
                                'flag': true,
                                'result': [],
                                'query': "No record found"
                            };
                        }
                    } else {
                        return {
                            'flag': true,
                            'result': [],
                            'query': "No record found"
                        };
                    }
                } else {
                    return {
                        'flag': true,
                        'result': [],
                        'query': "No record found"
                    };
                }
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }
        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollAdditionalPayReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportMonth = request.body.reportMonth;
            let reportYear = request.body.reportYear;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + ' and payrollYear =  ' + reportYear + ' and payrollMonth = ' + reportMonth);
            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

            if (strPayrollResult.length > 0) {
                let strwhere = "";
                let payrollId = strPayrollResult[0].payrollId;

                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                if (sortBy == "memberName")
                    strwhere += " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strwhere += " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strwhere += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strwhere += " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strwhere += " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(" and payrollId = " + payrollId + strwhere);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);
                if (strPayrollSalaryResult.length > 0) {

                    let strSelectMasterEpfList = _clsmasterepflist.data.select_view_masterepflist("");
                    let strSelectMasterSocsoList = _clsmastersocsolist.data.select("");
                    let strSelectMasterEsiList = _clsmasteresilist.data.select("");

                    let [strSelectMasterListResult, _strSelectMasterListResult] = await dbSecurity.asyncResult(
                        strSelectMasterEpfList + ";" +
                        strSelectMasterSocsoList + ";" +
                        strSelectMasterEsiList);

                    let selectMasterEpfList = strSelectMasterListResult[0];
                    let selectMasterSocsoList = strSelectMasterListResult[1];
                    let selectMasterEsiList = strSelectMasterListResult[2];

                    let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                    let payrollsalaryIdList = payrollsalaryId.toString();

                    let strPayrollAdditionalpay = _clspayrolladditionalpay.data.select_payrollAdditionalPayForPrint(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                    let [strPayrollAdditionalpayResult, _strPayrollAdditionalpayResult] = await dbSecurity.asyncResult(strPayrollAdditionalpay);
                    if (strPayrollAdditionalpayResult.length > 0) {
                        let masterAdditionalpayData = [];
                        for (let i = 0; i < strPayrollSalaryResult.length; i++) {
                            let employeeName = strPayrollSalaryResult[i].memberName;
                            let memberNric = strPayrollSalaryResult[i].memberNric;

                            let employeesalarysetupEPFGroup = strPayrollSalaryResult[i].employeesalarysetupEPFGroup;
                            let employeesalarysetupSocsoGroup = strPayrollSalaryResult[i].employeesalarysetupSocsoGroup;
                            let employeesalarysetupSocsoCategory = strPayrollSalaryResult[i].employeesalarysetupSocsoCategory;
                            let employeesalarysetupEISGroup = strPayrollSalaryResult[i].employeesalarysetupEISGroup;
                            let employeesalarysetupEISCategory = strPayrollSalaryResult[i].employeesalarysetupEISCategory;

                            let payrollsalaryId = strPayrollSalaryResult[i].payrollsalaryId;

                            let filterAdditionalpay = strPayrollAdditionalpayResult.filter(x => x.payrollsalaryId == payrollsalaryId);
                            if (filterAdditionalpay.length > 0) {
                                let verb = {};
                                let payrollAdditionalpayRateTotal = 0;
                                let payrollAdditionalpayUnitTotal = 0;

                                verb.AP1Rate = "0";
                                verb.AP1Unit = 0;
                                if (filterAdditionalpay.length >= 1) {
                                    verb.AP1Unit = filterAdditionalpay[0].payrolladditionalpayUnit;
                                    verb.AP1Rate = filterAdditionalpay[0].totalAdditionalPayRound2;

                                    payrollAdditionalpayRateTotal += parseFloat(verb.AP1Rate);
                                    payrollAdditionalpayUnitTotal += parseFloat(verb.AP1Unit);
                                }

                                verb.AP2Rate = "0";
                                verb.AP2Unit = 0;
                                if (filterAdditionalpay.length >= 2) {
                                    verb.AP2Unit = filterAdditionalpay[1].payrolladditionalpayUnit;
                                    verb.AP2Rate = filterAdditionalpay[1].totalAdditionalPayRound2;

                                    payrollAdditionalpayRateTotal += parseFloat(verb.AP2Rate);
                                    payrollAdditionalpayUnitTotal += parseFloat(verb.AP2Unit);
                                }

                                verb.AP3Rate = "0";
                                verb.AP3Unit = 0;
                                if (filterAdditionalpay.length >= 3) {
                                    verb.AP3Unit = filterAdditionalpay[2].payrolladditionalpayUnit;
                                    verb.AP3Rate = filterAdditionalpay[2].totalAdditionalPayRound2;

                                    payrollAdditionalpayRateTotal += parseFloat(verb.AP3Rate);
                                    payrollAdditionalpayUnitTotal += parseFloat(verb.AP3Unit);
                                }

                                verb.AP4Rate = "0";
                                verb.AP4Unit = 0;
                                if (filterAdditionalpay.length >= 4) {
                                    verb.AP4Unit = filterAdditionalpay[3].payrolladditionalpayUnit;
                                    verb.AP4Rate = filterAdditionalpay[3].totalAdditionalPayRound2;

                                    payrollAdditionalpayRateTotal += parseFloat(verb.AP4Rate);
                                    payrollAdditionalpayUnitTotal += parseFloat(verb.AP4Unit);
                                }

                                verb.AP5Rate = "0";
                                verb.AP5Unit = 0;
                                if (filterAdditionalpay.length >= 5) {
                                    verb.AP5Unit = filterAdditionalpay[4].payrolladditionalpayUnit;
                                    verb.AP5Rate = filterAdditionalpay[4].totalAdditionalPayRound2;

                                    payrollAdditionalpayRateTotal += parseFloat(verb.AP5Rate);
                                    payrollAdditionalpayUnitTotal += parseFloat(verb.AP5Unit);
                                }

                                verb.memberName = employeeName;
                                verb.memberNric = memberNric;
                                verb.payrollsalaryId = payrollsalaryId;
                                verb.APRateTotal = payrollAdditionalpayRateTotal;
                                verb.APUnitTotal = payrollAdditionalpayUnitTotal;

                                /* epf */
                                let filterMasterEpfList = selectMasterEpfList.filter(x =>
                                    x.masterepfId == employeesalarysetupEPFGroup &&
                                    x.masterepflistFrom <= payrollAdditionalpayRateTotal &&
                                    x.masterepflistTo >= payrollAdditionalpayRateTotal);

                                if (filterMasterEpfList.length == 0) {
                                    verb.employeeEPF = 0;
                                    verb.employerEPF = 0;
                                } else {
                                    if (employeesalarysetupEPFGroup != 0) {
                                        verb.employeeEPF = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                        verb.employerEPF = filterMasterEpfList[0].masterepflistEmployerPercentage;
                                    } else {
                                        verb.employeeEPF = 0;
                                        verb.employerEPF = 0;
                                    }
                                }
                                /* socso */
                                let filterMasterSocsoList = selectMasterSocsoList.filter(x =>
                                    x.mastersocsoId == employeesalarysetupSocsoGroup &&
                                    x.mastersocsolistFrom <= payrollAdditionalpayRateTotal &&
                                    x.mastersocsolistTo >= payrollAdditionalpayRateTotal
                                );

                                if (filterMasterSocsoList.length == 0) {
                                    verb.employeeSOCSO = 0;
                                    verb.employerSOCSO = 0;
                                } else {
                                    if (employeesalarysetupSocsoGroup != 0) {
                                        verb.employeeSOCSO = employeesalarysetupSocsoCategory == 1 ? filterMasterSocsoList[0].mastersocsolistEmployeeContribution : 0.00;
                                        verb.employerSOCSO = employeesalarysetupSocsoCategory == 1 ? filterMasterSocsoList[0].mastersocsolistEmployerContribution : filterMasterSocsoList[0].mastersocsolistEmployerContribution1;
                                    } else {
                                        verb.employeeSOCSO = 0;
                                        verb.employerSOCSO = 0;
                                    }
                                }
                                /* esi */
                                let filterMasterEsiList = selectMasterEsiList.filter(x =>
                                    x.masteresiId == employeesalarysetupEISGroup &&
                                    x.masteresilistFrom <= payrollAdditionalpayRateTotal &&
                                    x.masteresilistTo >= payrollAdditionalpayRateTotal
                                );
                                if (filterMasterEsiList.length == 0) {
                                    verb.employeeEIS = 0;
                                    verb.employerEIS = 0;
                                } else {
                                    if (employeesalarysetupEISGroup != 0) {
                                        verb.employeeEIS = employeesalarysetupEISCategory == 1 ? filterMasterEsiList[0].masteresilistEmployeeContribution : 0.00;
                                        verb.employerEIS = employeesalarysetupEISCategory == 1 ? filterMasterEsiList[0].masteresilistEmployerContribution : filterMasterEsiList[0].masteresilistEmployerContribution1;
                                    } else {
                                        verb.employeeEIS = 0;
                                        verb.employerEIS = 0;
                                    }
                                }
                                masterAdditionalpayData.push(verb);
                            }
                        }

                        let _masterAdditionalpayData = [];
                        if (masterAdditionalpayData.length > 0) {
                            for (let i = 0; i < masterAdditionalpayData.length; i++) {
                                if (masterAdditionalpayData[i].AP1Unit == 0 &&
                                    masterAdditionalpayData[i].AP2Unit == 0 &&
                                    masterAdditionalpayData[i].AP3Unit == 0 &&
                                    masterAdditionalpayData[i].AP4Unit == 0 &&
                                    masterAdditionalpayData[i].AP5Unit == 0) {

                                } else {
                                    _masterAdditionalpayData.push(masterAdditionalpayData[i]);
                                }

                                masterAdditionalpayData[i].AP1Unit = masterAdditionalpayData[i].AP1Unit.toString();
                                masterAdditionalpayData[i].AP2Unit = masterAdditionalpayData[i].AP2Unit.toString();
                                masterAdditionalpayData[i].AP3Unit = masterAdditionalpayData[i].AP3Unit.toString();
                                masterAdditionalpayData[i].AP4Unit = masterAdditionalpayData[i].AP4Unit.toString();
                                masterAdditionalpayData[i].AP5Unit = masterAdditionalpayData[i].AP5Unit.toString();
                            }
                        }
                        if (_masterAdditionalpayData.length > 0) {
                            return {
                                'flag': true,
                                'result': _masterAdditionalpayData,
                                'query': ''
                            };
                        } else {
                            return {
                                'flag': true,
                                'result': [],
                                'query': "No record found"
                            };
                        }
                    } else {
                        return {
                            'flag': true,
                            'result': [],
                            'query': "No record found"
                        };
                    }
                } else {
                    return {
                        'flag': true,
                        'result': [],
                        'query': "No record found"
                    };
                }
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }
        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollShiftReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportMonth = request.body.reportMonth;
            let reportYear = request.body.reportYear;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + ' and payrollYear =  ' + reportYear + ' and payrollMonth = ' + reportMonth);
            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

            if (strPayrollResult.length > 0) {
                let strwhere = "";
                let payrollId = strPayrollResult[0].payrollId;

                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                if (sortBy == "memberName")
                    strwhere += " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strwhere += " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strwhere += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strwhere += " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strwhere += " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(" and payrollId = " + payrollId + strwhere);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);
                if (strPayrollSalaryResult.length > 0) {

                    let strSelectMasterEpfList = _clsmasterepflist.data.select_view_masterepflist("");
                    let strSelectMasterSocsoList = _clsmastersocsolist.data.select("");
                    let strSelectMasterEsiList = _clsmasteresilist.data.select("");

                    let [strSelectMasterListResult, _strSelectMasterListResult] = await dbSecurity.asyncResult(
                        strSelectMasterEpfList + ";" +
                        strSelectMasterSocsoList + ";" +
                        strSelectMasterEsiList);

                    let selectMasterEpfList = strSelectMasterListResult[0];
                    let selectMasterSocsoList = strSelectMasterListResult[1];
                    let selectMasterEsiList = strSelectMasterListResult[2];

                    let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                    let payrollsalaryIdList = payrollsalaryId.toString();

                    let strPayrollShift = _clspayrollshift.data.select_payrollShiftForPrint(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                    let [strPayrollShiftResult, _strPayrollShiftResult] = await dbSecurity.asyncResult(strPayrollShift);
                    if (strPayrollShiftResult.length > 0) {

                        let masterShiftData = [];
                        for (let i = 0; i < strPayrollSalaryResult.length; i++) {
                            let employeeName = strPayrollSalaryResult[i].memberName;
                            let memberNric = strPayrollSalaryResult[i].memberNric;

                            let employeesalarysetupEPFGroup = strPayrollSalaryResult[i].employeesalarysetupEPFGroup;
                            let employeesalarysetupSocsoGroup = strPayrollSalaryResult[i].employeesalarysetupSocsoGroup;
                            let employeesalarysetupSocsoCategory = strPayrollSalaryResult[i].employeesalarysetupSocsoCategory;
                            let employeesalarysetupEISGroup = strPayrollSalaryResult[i].employeesalarysetupEISGroup;
                            let employeesalarysetupEISCategory = strPayrollSalaryResult[i].employeesalarysetupEISCategory;

                            let payrollsalaryId = strPayrollSalaryResult[i].payrollsalaryId;

                            let filterShift = strPayrollShiftResult.filter(x => x.payrollsalaryId == payrollsalaryId);
                            if (filterShift.length > 0) {
                                let verb = {};
                                let payrollShiftRateTotal = 0;
                                let payrollShiftUnitTotal = 0;

                                verb.ST1Rate = "0";
                                verb.ST1Unit = 0;
                                if (filterShift.length >= 1) {
                                    verb.ST1Unit = filterShift[0].payrollShiftUnit;
                                    verb.ST1Rate = filterShift[0].totalShiftRound2;

                                    payrollShiftRateTotal += parseFloat(verb.ST1Rate);
                                    payrollShiftUnitTotal += parseFloat(verb.ST1Unit);
                                }

                                verb.ST2Rate = "0";
                                verb.ST2Unit = 0;
                                if (filterShift.length >= 2) {
                                    verb.ST2Unit = filterShift[1].payrollShiftUnit;
                                    verb.ST2Rate = filterShift[1].totalShiftRound2;

                                    payrollShiftRateTotal += parseFloat(verb.ST2Rate);
                                    payrollShiftUnitTotal += parseFloat(verb.ST2Unit);
                                }

                                verb.ST3Rate = "0";
                                verb.ST3Unit = 0;
                                if (filterShift.length >= 3) {
                                    verb.ST3Unit = filterShift[2].payrollShiftUnit;
                                    verb.ST3Rate = filterShift[2].totalShiftRound2;

                                    payrollShiftRateTotal += parseFloat(verb.ST3Rate);
                                    payrollShiftUnitTotal += parseFloat(verb.ST3Unit);
                                }

                                verb.ST4Rate = "0";
                                verb.ST4Unit = 0;
                                if (filterShift.length >= 4) {
                                    verb.ST4Unit = filterShift[3].payrollShiftUnit;
                                    verb.ST4Rate = filterShift[3].totalShiftRound2;

                                    payrollShiftRateTotal += parseFloat(verb.ST4Rate);
                                    payrollShiftUnitTotal += parseFloat(verb.ST4Unit);
                                }

                                verb.ST5Rate = "0";
                                verb.ST5Unit = 0;
                                if (filterShift.length >= 5) {
                                    verb.ST5Unit = filterShift[4].payrollShiftUnit;
                                    verb.ST5Rate = filterShift[4].totalShiftRound2;

                                    payrollShiftRateTotal += parseFloat(verb.ST5Rate);
                                    payrollShiftUnitTotal += parseFloat(verb.ST5Unit);
                                }

                                verb.memberName = employeeName;
                                verb.memberNric = memberNric;
                                verb.payrollsalaryId = payrollsalaryId;
                                verb.STRateTotal = payrollShiftRateTotal;
                                verb.STUnitTotal = payrollShiftUnitTotal;

                                /* epf */
                                let filterMasterEpfList = selectMasterEpfList.filter(x =>
                                    x.masterepfId == employeesalarysetupEPFGroup &&
                                    x.masterepflistFrom <= payrollShiftRateTotal &&
                                    x.masterepflistTo >= payrollShiftRateTotal);

                                if (filterMasterEpfList.length == 0) {
                                    verb.employeeEPF = 0;
                                    verb.employerEPF = 0;
                                } else {
                                    if (employeesalarysetupEPFGroup != 0) {
                                        verb.employeeEPF = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                        verb.employerEPF = filterMasterEpfList[0].masterepflistEmployerPercentage;
                                    } else {
                                        verb.employeeEPF = 0;
                                        verb.employerEPF = 0;
                                    }
                                }
                                /* socso */
                                let filterMasterSocsoList = selectMasterSocsoList.filter(x =>
                                    x.mastersocsoId == employeesalarysetupSocsoGroup &&
                                    x.mastersocsolistFrom <= payrollShiftRateTotal &&
                                    x.mastersocsolistTo >= payrollShiftRateTotal
                                );

                                if (filterMasterSocsoList.length == 0) {
                                    verb.employeeSOCSO = 0;
                                    verb.employerSOCSO = 0;
                                } else {
                                    if (employeesalarysetupSocsoGroup != 0) {
                                        verb.employeeSOCSO = employeesalarysetupSocsoCategory == 1 ? filterMasterSocsoList[0].mastersocsolistEmployeeContribution : 0.00;
                                        verb.employerSOCSO = employeesalarysetupSocsoCategory == 1 ? filterMasterSocsoList[0].mastersocsolistEmployerContribution : filterMasterSocsoList[0].mastersocsolistEmployerContribution1;
                                    } else {
                                        verb.employeeSOCSO = 0;
                                        verb.employerSOCSO = 0;
                                    }
                                }
                                /* esi */
                                let filterMasterEsiList = selectMasterEsiList.filter(x =>
                                    x.masteresiId == employeesalarysetupEISGroup &&
                                    x.masteresilistFrom <= payrollShiftRateTotal &&
                                    x.masteresilistTo >= payrollShiftRateTotal
                                );
                                if (filterMasterEsiList.length == 0) {
                                    verb.employeeEIS = 0;
                                    verb.employerEIS = 0;
                                } else {
                                    if (employeesalarysetupEISGroup != 0) {
                                        verb.employeeEIS = employeesalarysetupEISCategory == 1 ? filterMasterEsiList[0].masteresilistEmployeeContribution : 0.00;
                                        verb.employerEIS = employeesalarysetupEISCategory == 1 ? filterMasterEsiList[0].masteresilistEmployerContribution : filterMasterEsiList[0].masteresilistEmployerContribution1;
                                    } else {
                                        verb.employeeEIS = 0;
                                        verb.employerEIS = 0;
                                    }
                                }
                                masterShiftData.push(verb);
                            }
                        }

                        let _masterShiftData = [];
                        if (masterShiftData.length > 0) {
                            for (let i = 0; i < masterShiftData.length; i++) {
                                if (masterShiftData[i].ST1Unit == 0 &&
                                    masterShiftData[i].ST2Unit == 0 &&
                                    masterShiftData[i].ST3Unit == 0 &&
                                    masterShiftData[i].ST4Unit == 0 &&
                                    masterShiftData[i].ST5Unit == 0) {

                                } else {
                                    _masterShiftData.push(masterShiftData[i]);
                                }

                                masterShiftData[i].ST1Unit = masterShiftData[i].ST1Unit.toString();
                                masterShiftData[i].ST2Unit = masterShiftData[i].ST2Unit.toString();
                                masterShiftData[i].ST3Unit = masterShiftData[i].ST3Unit.toString();
                                masterShiftData[i].ST4Unit = masterShiftData[i].ST4Unit.toString();
                                masterShiftData[i].ST5Unit = masterShiftData[i].ST5Unit.toString();
                            }
                        }
                        if (_masterShiftData.length > 0) {
                            return {
                                'flag': true,
                                'result': _masterShiftData,
                                'query': ''
                            };
                        } else {
                            return {
                                'flag': true,
                                'result': [],
                                'query': "No record found"
                            };
                        }
                    } else {
                        return {
                            'flag': true,
                            'result': [],
                            'query': "No record found"
                        };
                    }
                } else {
                    return {
                        'flag': true,
                        'result': [],
                        'query': "No record found"
                    };
                }
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }
        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollGovReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportStartMonth = request.body.reportStartMonth;
            let reportToMonth = request.body.reportToMonth;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = "";
            if (reportToMonth == "") {
                strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + " and DATE_FORMAT(payrollDate, '%Y-%m') = DATE_FORMAT('" + reportStartMonth + "', '%Y-%m')");
            } else {
                strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + " and DATE_FORMAT(payrollDate, '%Y-%m') >= DATE_FORMAT('" + reportStartMonth + "', '%Y-%m') and DATE_FORMAT(payrollDate, '%Y-%m') <= DATE_FORMAT('" + reportToMonth + "', '%Y-%m') ");
            }

            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

            let strGlobalPayroll = _clsemployerglobalpayroll.data.select(' and employerId = ' + employerId);
            let [strGlobalPayrollResult, _strGlobalPayrollResult] = await dbSecurity.asyncResult(strGlobalPayroll);

            if (strPayrollResult.length > 0) {
                let strwhere = "";
                let payrollId = strPayrollResult.map(x => x.payrollId);
                let payrollIds = payrollId.toString();

                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                let strSortBy = "";
                if (sortBy == "memberName")
                    strSortBy = " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strSortBy = " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strSortBy += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strSortBy = " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strSortBy = " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryGroupForReport(" and payrollId in (" + payrollIds + ") " + strwhere + " GROUP BY employeeId " + strSortBy);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);

                if (strPayrollSalaryResult.length > 0) {

                    return {
                        'flag': true,
                        'result': [{
                            "salary": strPayrollSalaryResult,
                            "salarySetting": strGlobalPayrollResult
                        }],
                        'query': "No record found"
                    };
                } else {
                    return {
                        'flag': true,
                        'result': [],
                        'query': "No record found"
                    };
                }
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollGovCP38Report: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeIds = request.body.employeeIds;
            let employerbranchIds = request.body.employerbranchIds;
            let employerdepartmentIds = request.body.employerdepartmentIds;

            let reportStartMonth = request.body.reportStartMonth;
            let reportToMonth = request.body.reportToMonth;

            let sortBy = request.body.sortBy;
            let activeBy = request.body.activeBy;

            let strPayroll = "";
            if (reportToMonth == "") {
                strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + " and DATE_FORMAT(payrollDate, '%Y-%m') >= DATE_FORMAT('" + reportStartMonth + "', '%Y-%m')");
            } else {
                strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + " and DATE_FORMAT(payrollDate, '%Y-%m') >= DATE_FORMAT('" + reportStartMonth + "', '%Y-%m') and DATE_FORMAT(payrollDate, '%Y-%m') <= DATE_FORMAT('" + reportToMonth + "', '%Y-%m') ");
            }

            let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

            let strGlobalPayroll = _clsemployerglobalpayroll.data.select(' and employerId = ' + employerId);
            let [strGlobalPayrollResult, _strGlobalPayrollResult] = await dbSecurity.asyncResult(strGlobalPayroll);

            if (strPayrollResult.length > 0) {
                let strwhere = "";
                let payrollId = strPayrollResult.map(x => x.payrollId);
                let payrollIds = payrollId.toString();

                if (employeeIds != '')
                    strwhere += " and employeeId in (" + employeeIds + ")";
                if (employerbranchIds != '')
                    strwhere += " and employerbranchId in (" + employerbranchIds + ")";
                if (employerdepartmentIds != '')
                    strwhere += " and employerdepartmentId in (" + employerdepartmentIds + ")";
                strwhere += " and payrollstatutoryPcbEmployee != 0 ";

                if (activeBy == 'true')
                    strwhere += " and employeeIsActive = true";
                if (activeBy == 'false')
                    strwhere += " and employeeIsActive = false";

                let strSortBy = "";
                if (sortBy == "memberName")
                    strSortBy += " order by memberName asc ";
                if (sortBy == "employeeAlternativeEnroll")
                    strSortBy += " order by employeeAlternativeEnroll asc ";
                if (sortBy == "employeeJoiningDDMMYYYY")
                    strSortBy += " order by employeeJoiningDDMMYYYY asc ";
                if (sortBy == "employerDepartmentTitle")
                    strSortBy += " order by employerDepartmentTitle, memberName asc";
                if (sortBy == "employerBranchName")
                    strSortBy += " order by employerBranchName, memberName asc";

                let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryGroupForCP38Report(" and payrollId in (" + payrollIds + ") " + strwhere + " GROUP BY employeeId " + strSortBy);
                let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);

                if (strPayrollSalaryResult.length > 0) {

                    return {
                        'flag': true,
                        'result': [{
                            "salary": strPayrollSalaryResult,
                            "salarySetting": strGlobalPayrollResult
                        }],
                        'query': "No record found"
                    };
                } else {
                    return {
                        'flag': true,
                        'result': [],
                        'query': "No record found"
                    };
                }
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbExportSalary: async (request, response) => {
        try {

            let strwhere = "";

            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || "";
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || "";
            let SearchEmployeeId = request.body.SearchEmployeeId || "";

            let employerId = self.fetchEmployerId(request);
            let payrollId = request.body.payrollId;

            let sortBy = request.body.sortBy;

            if (SearchEmployerbranchId != "")
                strwhere += " and employerbranchId = " + SearchEmployerbranchId;
            if (SearchEmployerdepartmentId != "")
                strwhere += " and employerdepartmentId = " + SearchEmployerdepartmentId;
            if (SearchEmployeeId != "")
                strwhere += " and employeeId = " + SearchEmployeeId;

            let strSortBy = "";
            if (sortBy == "memberName")
                strSortBy += " order by memberName asc ";
            if (sortBy == "employeeAlternativeEnroll")
                strSortBy += " order by employeeAlternativeEnroll asc ";
            if (sortBy == "employeeJoiningDDMMYYYY")
                strSortBy += " order by employeeJoiningDDMMYYYY asc ";
            if (sortBy == "employerDepartmentTitle")
                strSortBy += " order by employerDepartmentTitle, memberName asc";
            if (sortBy == "employerBranchName")
                strSortBy += " order by employerBranchName, memberName asc";

            strwhere += " and payrollId = " + payrollId;
            strwhere += " and employerId = " + employerId;

            let strPayrollSalary = _clspayroll.data.selectForExport(strwhere + ' ' + strSortBy);
            let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);

            if (strPayrollSalaryResult.length > 0) {

                let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                let payrollsalaryIds = payrollsalaryId.toString();

                let strPayrollNPL = _clspayrollnpl.data.select(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                let strPayrollShift = _clspayrollshift.data.select_payrollShiftForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                let strPayrollOvertime = _clspayrollovertime.data.select_payrollOvertimeForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                let strPayrollAdditionalPay = _clspayrolladditionalpay.data.select_payrollAdditionalPayForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                let strPayrollAllowancenDeduction = _clspayrollallowancendeduction.data.select_payrollAllowancenDeductionForPrint(" and payrollsalaryId in (" + payrollsalaryIds + ") ");
                let strEmployerAllowancenDeduction = _clsemployerallowance.data.select(" and employerId = " + employerId);

                let [strMasterResult, _strMasterResult] = await dbSecurity.asyncResult(
                    strPayrollNPL + ";" +
                    strPayrollShift + ";" +
                    strPayrollOvertime + ";" +
                    strPayrollAdditionalPay + ";" +
                    strPayrollAllowancenDeduction + ";" +
                    strEmployerAllowancenDeduction
                );

                return {
                    'flag': true,
                    'result': [{
                        "salary": strPayrollSalaryResult,
                        "npl": strMasterResult[0],
                        "shift": strMasterResult[1],
                        "overtime": strMasterResult[2],
                        "additionalpay": strMasterResult[3],
                        "allowancendeduction": strMasterResult[4],
                        "employerallowancededuction": strMasterResult[5]
                    }],
                    'query': ''
                };
            } else {
                return {
                    'flag': true,
                    'result': [],
                    'query': "No record found"
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbUploadSalary: async (request, response) => {

        try {

            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let rowData = JSON.parse(request.body.rowData);

            if (rowData.length > 0) {
                let payrollId = rowData[0].PayrollId;
                let employeeWise = [];
                for (let p = 0; p < rowData.length; p++) {
                    if (rowData[p].EmployeeId != '')
                        employeeWise.push(rowData[p].EmployeeId);
                }

                employeeWise = employeeWise.toString();
                let payrollDate = rowData[0].processDate;

                let startOfMonthPayrollDate = moment(payrollDate).startOf('month').format('YYYY-MM-DD');
                let endOfMonthPayrollDate = moment(payrollDate).endOf('month').format('YYYY-MM-DD');
                let totalDaysPayrollDate = moment(payrollDate).daysInMonth();
                let yearOfPayrollDate = moment(payrollDate).format('YYYY');
                let monthOfPayrollDate = moment(payrollDate).format('MM');

                const pool = await dbSecurity.asyncDbConnection();
                const connection = await pool.getConnection();
                await connection.beginTransaction();

                try {
                    //#region - Remove Records before inserting new

                    let processPayrollId = payrollId;
                    let strwherePayrollSalary = "";
                    strwherePayrollSalary += " and payrollId = " + processPayrollId;
                    strwherePayrollSalary += " and employerId = " + employerId;
                    if (employeeWise != '')
                        strwherePayrollSalary += " and employeeId in ( " + employeeWise + ")";

                    let strPayrollSalary = _clspayrollsalary.data.selectall(strwherePayrollSalary);
                    let [strPayrollSalaryResult, _strPayrollSalaryResult] = await connection.query(strPayrollSalary);

                    if (strPayrollSalaryResult.length > 0) {
                        let payrollsalaryId = strPayrollSalaryResult.map(x => x.payrollsalaryId);
                        let payrollsalaryIdList = payrollsalaryId.toString();

                        let strPayrollSalaryRemove = _clspayrollsalary.data.deleteString(strwherePayrollSalary);
                        let strPayrollStatutoryRemove = _clspayrollstatutory.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                        let strPayrollNPLRemove = _clspayrollnpl.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                        let strPayrollAllowancenDeductionRemove = _clspayrollallowancendeduction.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");
                        let strPayrollLoanRemove = _clspayrollloan.data.deleteString(" and payrollsalaryId in (" + payrollsalaryIdList + ") ");

                        let [strPayrollRemove, _strPayrollRemove] = await connection.query(strPayrollSalaryRemove +
                            ";" + strPayrollStatutoryRemove +
                            ";" + strPayrollNPLRemove +
                            ";" + strPayrollAllowancenDeductionRemove +
                            ";" + strPayrollLoanRemove);
                    }
                    //#endregion

                    //#region - Fetch Master EPF | SOCSO | ESI | Attendance

                    let strSelectMasterEpfList = _clsmasterepflist.data.select_view_masterepflist("");
                    let strSelectMasterSocsoList = _clsmastersocsolist.data.select("");
                    let strSelectMasterEsiList = _clsmasteresilist.data.select("");
                    let strSelectMasterhrdfList = _clsmasterhrdflist.data.select("");
                    let strSelectAttendanceList = _clsemployeedailyattendance.data.select_UnitCalculation(employerId, yearOfPayrollDate, monthOfPayrollDate);

                    let [strSelectMasterListResult, _strSelectMasterListResult] = await connection.query(
                        strSelectMasterEpfList +
                        ";" + strSelectMasterSocsoList +
                        ";" + strSelectMasterEsiList +
                        ";" + strSelectAttendanceList +
                        ";" + strSelectMasterhrdfList);

                    let selectMasterEpfList = strSelectMasterListResult[0];
                    let selectMasterSocsoList = strSelectMasterListResult[1];
                    let selectMasterEsiList = strSelectMasterListResult[2];
                    let selectAttendanceList = strSelectMasterListResult[3];
                    let selectMasterhrdfList = strSelectMasterListResult[4];
                    //#endregion

                    //#region - Fetch Employer and Employee Additional-Pay | Overtime | Shift

                    let strSelectEmployerAdditionalPaySetup = _clsemployeradditionalpaysetup.data.select(" and employerId = " + employerId);
                    let strSelectEmployerOtSetup = _clsemployerotsetup.data.select(" and employerId = " + employerId);
                    let strSelectEmployerShiftSetup = _clsemployershiftsetup.data.select(" and employerId = " + employerId);

                    let [strSelectEmployerListResult, _strSelectEmployerListResult] =
                    await connection.query(strSelectEmployerAdditionalPaySetup +
                        ";" + strSelectEmployerOtSetup +
                        ";" + strSelectEmployerShiftSetup);

                    let selectEmployerAdditionalPaySetup = strSelectEmployerListResult[0];
                    let selectEmployerOtSetup = strSelectEmployerListResult[1];
                    let selectEmployerShiftSetup = strSelectEmployerListResult[2];
                    //#endregion

                    let strSelectSalary = _clspayroll.data.sp_ExecuteSalaryProcessEmployee(employeeWise, employerId, startOfMonthPayrollDate, endOfMonthPayrollDate, totalDaysPayrollDate);
                    let [strSelectSalaryResult, _strSelectSalaryResult] = await connection.query(strSelectSalary);
                    let responseResult = strSelectSalaryResult[0];

                    if (responseResult.length > 0) {

                        //#region - Fetch Employee Loan and Allowance and Master Permission

                        let strWhereEmployeeLoan = ` and date_format('` + startOfMonthPayrollDate + `', '%Y%m') between date_format(employeeloanFromDate, '%Y%m') and date_format(employeeloanToDate, '%Y%m') 
                      and employerId = ` + employerId;
                        let strSelectEmployeeLoan = _clsemployeeloan.data.select(strWhereEmployeeLoan);

                        let strWhereAllowancenDeduction = ` and employerId = ` + employerId;
                        let strSelectAllowancenDeduction = _clsemployerallowance.data.select(strWhereAllowancenDeduction);

                        let strSelectPermissionSetting = _clsemployerpermissionsetting.data.select(" and employerId = " + employerId);

                        let [strSelectEmployeeLoanAllowancenPermissionResult] = await connection.query(strSelectEmployeeLoan +
                            ";" + strSelectAllowancenDeduction +
                            ";" + strSelectPermissionSetting);

                        let selectEmployeeLoan = strSelectEmployeeLoanAllowancenPermissionResult[0];
                        let selectAllowancenDeduction = strSelectEmployeeLoanAllowancenPermissionResult[1];
                        let selectPermissionSetting = strSelectEmployeeLoanAllowancenPermissionResult[2];

                        let isAutoPushAttendance = false;
                        let isAutoSendEmail = false;

                        if (selectPermissionSetting.length > 0) {
                            for (let i = 0; i < selectPermissionSetting.length; i++) {
                                if (selectPermissionSetting[i].employerPermissionSettingKey == 'AutoPushAttendance')
                                    isAutoPushAttendance = selectPermissionSetting[i].employerPermissionSettingValue == 'true' ? true : false;
                                if (selectPermissionSetting[i].employerPermissionSettingKey == 'AutoSendEmail')
                                    isAutoSendEmail = selectPermissionSetting[i].employerPermissionSettingValue == 'true' ? true : false;
                            }
                        }

                        //#endregion

                        //#region - Insert and calculation process

                        let strInsertPayrollNPL = '';
                        let strInsertPayrollStatutory = '';
                        let strInsertPayrollAdditionalpay = '';
                        let strInsertPayrollOvertime = '';
                        let strInsertPayrollShift = '';
                        let strInsertAllowancenDeduction = '';
                        let strInsertPayrollLoan = '';

                        for (let a = 0; a < responseResult.length; a++) {

                            let _filterExcelEmployee = rowData.filter(x => x.EmployeeId == responseResult[a].employeeId);
                            let _workingDays = _filterExcelEmployee[0].DailyPayDay;

                            if (responseResult[a].employeeId == 445) {
                                console.log('Yes');
                            }

                            request.body.payrollId = processPayrollId;
                            request.body.employeeId = responseResult[a].employeeId;
                            request.body.payrollsalaryBasic = responseResult[a].employeesalarysetupCurrentBasic;

                            if (responseResult[a].employeesalarysetupPaymentRate == 'Daily')
                                request.body.payrollsalaryGenerated = parseFloat(_workingDays * responseResult[a].employeesalarysetupCurrentBasic).toFixed(4);
                            else
                                request.body.payrollsalaryGenerated = parseFloat(_workingDays * (responseResult[a].employeesalarysetupCurrentBasic / totalDaysPayrollDate)).toFixed(4);

                            request.body.payrollsalaryEarning = responseResult[a].earningSalary;
                            request.body.payrollsalaryDeduction = responseResult[a].DeductionSalary;
                            request.body.payrollsalaryGross = responseResult[a].grossSalary;
                            request.body.payrollsalaryNet = responseResult[a].netSalary;
                            request.body.payrollsalaryWorkingDay = _workingDays;
                            request.body.payrollIsStatutory = false;
                            request.body.payrollIsPaidLeave = false;

                            let verbPayrollSalary = _clspayrollsalary.data.masterData(request);
                            let strInsertPayrollSalary = _clspayrollsalary.data.insert(verbPayrollSalary);

                            let [strInsertPayrollSalaryResult, _strInsertPayrollSalaryResult] = await connection.query(strInsertPayrollSalary);
                            let payrollSalaryId = strInsertPayrollSalaryResult.insertId;

                            request.body.payrollsalaryId = payrollSalaryId;

                            //! Loan

                            let _dataSelectPayrollLoan = [];
                            if (selectEmployeeLoan.length > 0) {
                                let filterSelectEmployeeLoan = selectEmployeeLoan.filter(x => x.employeeId == responseResult[a].employeeId);
                                if (filterSelectEmployeeLoan.length > 0) {
                                    for (let i = 0; i < filterSelectEmployeeLoan.length; i++) {
                                        _dataSelectPayrollLoan.push({
                                            employeeloanId: filterSelectEmployeeLoan[i].employeeloanId,
                                            payrollloanAmount: filterSelectEmployeeLoan[i].employeeloanDeductionAmount
                                        });
                                    }
                                }
                            }

                            //! AllowancenDeduction

                            let _dataSelectPayrollAllowancenDeduction = [];
                            if (selectAllowancenDeduction.length > 0) {
                                for (let i = 0; i < selectAllowancenDeduction.length; i++) {

                                    let _employerallowanceCode = selectAllowancenDeduction[i].employerallowanceCode;
                                    let _filterAmount = _filterExcelEmployee[0]["D_" + _employerallowanceCode + ""];
                                    // if (_filterAmount == undefined)
                                    //     _filterAmount = 0;
                                    if (_filterAmount != 0) {
                                        let _dataTotal = 0;
                                        // if (selectAllowancenDeduction[i].employerallowanceProrate[0] == 1)
                                        //     _dataTotal = parseFloat((_filterAmount / totalDaysPayrollDate) * responseResult[a].workingDays);
                                        // else
                                        _dataTotal = _filterAmount;

                                        _dataSelectPayrollAllowancenDeduction.push({
                                            employeeallowancendeductionId: selectAllowancenDeduction[i].employeeallowancendeductionId,
                                            employerallowanceId: selectAllowancenDeduction[i].employerallowanceId,
                                            employerallowanceCode: selectAllowancenDeduction[i].employerallowanceCode,
                                            employeeallowancendeductionAmount: parseFloat(_filterAmount),
                                            employerallowanceEpf: selectAllowancenDeduction[i].employerallowanceEpf[0],
                                            employerallowanceEIS: selectAllowancenDeduction[i].employerallowanceEIS[0],
                                            employerallowanceSocso: selectAllowancenDeduction[i].employerallowanceSocso[0],
                                            employerallowancePCB: selectAllowancenDeduction[i].employerallowancePCB[0],
                                            employerallowanceOT: selectAllowancenDeduction[i].employerallowanceOT[0],
                                            employerallowanceAddPay: selectAllowancenDeduction[i].employerallowanceAddPay[0],
                                            employeeallowancendeductionFromDate: selectAllowancenDeduction[i].employeeallowancendeductionFromDate,
                                            employeeallowancendeductionToDate: selectAllowancenDeduction[i].employeeallowancendeductionToDate,
                                            employeeallowancendeductionAmountTotal: _dataTotal
                                        });
                                    }
                                }
                            }

                            //! NPL

                            let _NplDay = _filterExcelEmployee[0].NplDay;
                            let _NplHour = _filterExcelEmployee[0].NplHour;

                            request.body.payrollNplDaysRate = responseResult[a].NPLDay;
                            request.body.payrollNplDayUnit = _NplDay;
                            request.body.payrollNplHourRate = responseResult[a].NPLHour;
                            request.body.payrollNplHourUnit = _NplHour;

                            let _a = parseFloat(responseResult[a].NPLDay) * parseFloat(_NplDay);
                            let _b = parseFloat(responseResult[a].NPLHour) * parseFloat(_NplHour);
                            let nplTotal = _a + _b;

                            let verbPayrollNPL = _clspayrollnpl.data.masterData(request);
                            let _strInsertPayrollNPL = _clspayrollnpl.data.insert(verbPayrollNPL);
                            strInsertPayrollNPL += _strInsertPayrollNPL + ";";

                            //!
                            let filterSelectAttendanceList = [];
                            if (isAutoPushAttendance == true) {
                                filterSelectAttendanceList = selectAttendanceList.filter(x => x.employeeId == responseResult[a].employeeId);
                            }

                            //#region - Add-Pay Allowance

                            let addpayAllowance = 0;
                            if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                                for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                    let _total = parseFloat(_dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal);
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceAddPay == 1) {
                                        addpayAllowance += _total;
                                    }
                                }
                            }

                            let _dataSelectEmployeeAdditionalPaySetup = [];
                            if (selectEmployerAdditionalPaySetup.length > 0) {
                                for (let i = 0; i < selectEmployerAdditionalPaySetup.length; i++) {
                                    let extraCount = 0;
                                    if (isAutoPushAttendance == true) {
                                        let filterAdditionalPayAttendance = filterSelectAttendanceList.filter(x => x.holidayAddPayTag == selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupId);
                                        if (filterAdditionalPayAttendance.length > 0) {
                                            for (let j = 0; j < filterAdditionalPayAttendance.length; j++)
                                                extraCount += parseFloat(filterAdditionalPayAttendance[j].employeradditionalpaysetupCode_unit);
                                        }
                                    }

                                    extraCount += parseFloat(_filterExcelEmployee[0]["B_" + selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupCode + ""]);
                                    if (selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupDescription != '') {
                                        _dataSelectEmployeeAdditionalPaySetup.push({
                                            employeradditionalpaysetupId: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupId,
                                            employeradditionalpaysetupDescription: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupDescription,
                                            employeradditionalpaysetupRate: selectEmployerAdditionalPaySetup[i].employeeadditionalpaysetupRate,
                                            payrolladditionalpayUnit: extraCount,
                                            employeradditionalpaysetupEPF: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupEPF[0],
                                            employeradditionalpaysetupEIS: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupEIS[0],
                                            employeradditionalpaysetupSocso: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupSocso[0],
                                            employeradditionalpaysetupPCB: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupPCB[0],
                                            employeradditionalpaysetupHRDF: selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupHRDF[0],
                                            employeradditionalpaysetupRateTotal: (((request.body.payrollsalaryBasic + addpayAllowance) / 26) * selectEmployerAdditionalPaySetup[i].employeradditionalpaysetupRate).toFixed(4)
                                        });
                                    }
                                }
                            }

                            //#endregion

                            //#region - OT Allowance

                            let otAllowance = 0;
                            if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                                for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                    let _total = parseFloat(_dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal);
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceOT == 1) {
                                        otAllowance += _total;
                                    }
                                }
                            }
                            let _dataSelectEmployeeOtSetup = [];
                            for (let i = 0; i < selectEmployerOtSetup.length; i++) {
                                let extraCount = 0;
                                if (isAutoPushAttendance == true) {
                                    let filterOtAttendance = filterSelectAttendanceList.filter(x => x.holidayOTTag == selectEmployerOtSetup[i].employerotsetupId);
                                    if (filterOtAttendance.length > 0) {
                                        for (let j = 0; j < filterOtAttendance.length; j++)
                                            extraCount += parseFloat(filterOtAttendance[j].finalOverTime_Full_unit) + parseFloat(filterOtAttendance[j].finalOverTime_unit);
                                    }
                                }

                                extraCount += parseFloat(_filterExcelEmployee[0]["A_" + selectEmployerOtSetup[i].employerotsetupOTCode + ""]);

                                if (selectEmployerOtSetup[i].employerotsetupDescription != '') {
                                    _dataSelectEmployeeOtSetup.push({
                                        employerotsetupId: selectEmployerOtSetup[i].employerotsetupId,
                                        employerotsetupDescription: selectEmployerOtSetup[i].employerotsetupDescription,
                                        employerotsetupRate: selectEmployerOtSetup[i].employeeotsetupRate,
                                        payrollovertimeUnit: extraCount,
                                        employerotsetupEPF: selectEmployerOtSetup[i].employerotsetupEPF[0],
                                        employerotsetupEIS: selectEmployerOtSetup[i].employerotsetupEIS[0],
                                        employerotsetupSocso: selectEmployerOtSetup[i].employerotsetupSocso[0],
                                        employerotsetupPCB: selectEmployerOtSetup[i].employerotsetupPCB[0],
                                        employerotsetupHRDF: selectEmployerOtSetup[i].employerotsetupHRDF[0],
                                        employerotsetupRateTotal: ((((request.body.payrollsalaryBasic + otAllowance) / 26) / 8) * selectEmployerOtSetup[i].employerotsetupRate).toFixed(4)
                                    });
                                }
                            }
                            //#endregion

                            //#region - Shift Allowance
                            let _dataSelectEmployeeShiftSetup = [];
                            for (let i = 0; i < selectEmployerShiftSetup.length; i++) {
                                let extraCount = 0;
                                if (isAutoPushAttendance == true) {
                                    let filterShiftAttendance = filterSelectAttendanceList.filter(x => x.holidayShiftTag == selectEmployerShiftSetup[i].employershiftsetupId);
                                    if (filterShiftAttendance.length > 0) {
                                        for (let j = 0; j < filterShiftAttendance.length; j++)
                                            extraCount += parseFloat(filterShiftAttendance[j].employershiftsetupCode_unit);
                                    }
                                }

                                extraCount += parseFloat(_filterExcelEmployee[0]["C_" + selectEmployerShiftSetup[i].employershiftsetupCode + ""]);
                                if (selectEmployerShiftSetup[i].employershiftsetupDescription != '') {
                                    _dataSelectEmployeeShiftSetup.push({
                                        employershiftsetupId: selectEmployerShiftSetup[i].employershiftsetupId,
                                        employershiftsetupDescription: selectEmployerShiftSetup[i].employershiftsetupDescription,
                                        employershiftsetupAmount: selectEmployerShiftSetup[i].employeeshiftsetupRate,
                                        payrollShiftUnit: extraCount,
                                        employershiftsetupEPF: selectEmployerShiftSetup[i].employershiftsetupEPF[0],
                                        employershiftsetupEIS: selectEmployerShiftSetup[i].employershiftsetupEIS[0],
                                        employershiftsetupSocso: selectEmployerShiftSetup[i].employershiftsetupSocso[0],
                                        employershiftsetupPCB: selectEmployerShiftSetup[i].employershiftsetupPCB[0],
                                        employershiftsetupHRDF: selectEmployerShiftSetup[i].employershiftsetupHRDF[0],
                                        employershiftsetupAmountTotal: parseFloat(selectEmployerShiftSetup[i].employershiftsetupAmount.toString()).toFixed(4)
                                    });
                                }
                            }
                            //#endregion

                            let masterEPFWages = parseFloat(request.body.payrollsalaryGenerated) - nplTotal;
                            let masterSOCSOWages = parseFloat(request.body.payrollsalaryGenerated) - nplTotal;
                            let masterESIWages = parseFloat(request.body.payrollsalaryGenerated) - nplTotal;
                            let masterHRDFWages = parseFloat(request.body.payrollsalaryGenerated) - nplTotal;

                            //!
                            let additionalpayCalculateTotal = 0.0000;
                            if (_dataSelectEmployeeAdditionalPaySetup.length > 0) {
                                for (let i = 0; i < _dataSelectEmployeeAdditionalPaySetup.length; i++) {
                                    let _total = _dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupRateTotal * _dataSelectEmployeeAdditionalPaySetup[i].payrolladditionalpayUnit;
                                    if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupEPF == 1) {
                                        masterEPFWages += _total;
                                    }
                                    if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupEIS == 1) {
                                        masterESIWages += _total;
                                    }
                                    if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupSocso == 1) {
                                        masterSOCSOWages += _total;
                                    }
                                    if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupPCB == 1) {}
                                    if (_dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupHRDF == 1) {
                                        masterHRDFWages += _total;
                                    }
                                    additionalpayCalculateTotal += _total;
                                }
                                additionalpayCalculateTotal = additionalpayCalculateTotal.toFixed(4);
                            }

                            //!
                            let overtimeCalculateTotal = 0.0000;
                            if (_dataSelectEmployeeOtSetup.length > 0) {
                                for (let i = 0; i < _dataSelectEmployeeOtSetup.length; i++) {
                                    let _total = _dataSelectEmployeeOtSetup[i].employerotsetupRateTotal * _dataSelectEmployeeOtSetup[i].payrollovertimeUnit;
                                    if (_dataSelectEmployeeOtSetup[i].employerotsetupEPF == 1) {
                                        masterEPFWages += _total;
                                    }
                                    if (_dataSelectEmployeeOtSetup[i].employerotsetupEIS == 1) {
                                        masterESIWages += _total;
                                    }
                                    if (_dataSelectEmployeeOtSetup[i].employerotsetupSocso == 1) {
                                        masterSOCSOWages += _total;
                                    }
                                    if (_dataSelectEmployeeOtSetup[i].employerotsetupPCB == 1) {}
                                    if (_dataSelectEmployeeOtSetup[i].employerotsetupHRDF == 1) {
                                        masterHRDFWages += _total;
                                    }
                                    overtimeCalculateTotal += _total;
                                }
                                overtimeCalculateTotal = overtimeCalculateTotal.toFixed(4);
                            }

                            //!
                            let shiftCalculateTotal = 0.0000;
                            if (_dataSelectEmployeeShiftSetup.length > 0) {
                                for (let i = 0; i < _dataSelectEmployeeShiftSetup.length; i++) {
                                    let _total = _dataSelectEmployeeShiftSetup[i].employershiftsetupAmountTotal * _dataSelectEmployeeShiftSetup[i].payrollShiftUnit;
                                    if (_dataSelectEmployeeShiftSetup[i].employershiftsetupEPF == 1) {
                                        masterEPFWages += _total;
                                    }
                                    if (_dataSelectEmployeeShiftSetup[i].employershiftsetupEIS == 1) {
                                        masterESIWages += _total;
                                    }
                                    if (_dataSelectEmployeeShiftSetup[i].employershiftsetupSocso == 1) {
                                        masterSOCSOWages += _total;
                                    }
                                    if (_dataSelectEmployeeShiftSetup[i].employershiftsetupPCB == 1) {}
                                    if (_dataSelectEmployeeShiftSetup[i].employershiftsetupHRDF == 1) {
                                        masterHRDFWages += _total;
                                    }
                                    shiftCalculateTotal += _total;
                                }
                                shiftCalculateTotal = shiftCalculateTotal.toFixed(4);
                            }

                            //!
                            let allowanceCalculateTotal = 0.0000;
                            if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                                for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                    let _total = parseFloat(_dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal);
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceEpf == 1) {
                                        masterEPFWages += _total;
                                    }
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceEIS == 1) {
                                        masterESIWages += _total;
                                    }
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceSocso == 1) {
                                        masterSOCSOWages += _total;
                                    }
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowancePCB == 1) {}
                                    if (_dataSelectPayrollAllowancenDeduction[i].employerallowanceHRDF == 1) {
                                        masterHRDFWages += _total;
                                    }
                                    allowanceCalculateTotal += _total;
                                }
                                allowanceCalculateTotal = allowanceCalculateTotal.toFixed(4);
                            }

                            let LoanCalculateTotal = 0;
                            if (_dataSelectPayrollLoan.length > 0) {
                                for (let i = 0; i < _dataSelectPayrollLoan.length; i++) {
                                    LoanCalculateTotal += _dataSelectPayrollLoan[i].payrollloanAmount;
                                }
                            }

                            //#region - EPF Data
                            responseResult[a].epfWageTotal = masterEPFWages;
                            let filterMasterEpfList = selectMasterEpfList.filter(x =>
                                x.masterepfId == responseResult[a].employeesalarysetupEPFGroup &&
                                x.masterepflistFrom <= responseResult[a].epfWageTotal &&
                                x.masterepflistTo >= responseResult[a].epfWageTotal
                            );

                            if (responseResult[a].epfWageTotal > 20000) {
                                let _epfFilterList = selectMasterEpfList.filter(x => x.masterepfId == responseResult[a].employeesalarysetupEPFGroup);
                                if (_epfFilterList.length > 0) {
                                    let employeePer = _epfFilterList[0].masterepfEmployeePer || 0;
                                    let employerPer = _epfFilterList[0].masterepfEmployerPer || 0;

                                    responseResult[a].masterepflistDifference = 0;
                                    responseResult[a].masterepflistEmploeePercentage = (responseResult[a].epfWageTotal * employeePer / 100);
                                    responseResult[a].masterepflistEmployerPercentage = (responseResult[a].epfWageTotal * employerPer / 100);
                                } else {
                                    responseResult[a].epfreminder = 0;
                                    responseResult[a].masterepflistDifference = 0;
                                    responseResult[a].masterepflistEmploeePercentage = 0;
                                    responseResult[a].masterepflistEmployerPercentage = 0;
                                }
                            } else {
                                if (filterMasterEpfList.length == 0 || responseResult[a].employeesalarysetupEPFGroup == 0) {
                                    responseResult[a].epfreminder = 0;
                                    responseResult[a].masterepflistDifference = 0;
                                    responseResult[a].masterepflistEmploeePercentage = 0;
                                    responseResult[a].masterepflistEmployerPercentage = 0;
                                } else {
                                    responseResult[a].masterepflistDifference = filterMasterEpfList[0].masterepflistDifference;
                                    responseResult[a].masterepflistEmploeePercentage = filterMasterEpfList[0].masterepflistEmploeePercentage;
                                    responseResult[a].masterepflistEmployerPercentage = filterMasterEpfList[0].masterepflistEmployerPercentage;
                                }
                            }
                            //#endregion

                            //#region - Socso Data

                            responseResult[a].socsoWageTotal = masterSOCSOWages;
                            let filterMasterSocsoList = selectMasterSocsoList.filter(x =>
                                x.mastersocsoId == responseResult[a].employeesalarysetupSocsoGroup &&
                                x.mastersocsolistFrom <= responseResult[a].socsoWageTotal &&
                                x.mastersocsolistTo >= responseResult[a].socsoWageTotal
                            );
                            if (responseResult[a].employeesalarysetupSocsoGroup != 0) {
                                if (filterMasterSocsoList.length == 0) {
                                    filterMasterSocsoList = selectMasterSocsoList[selectMasterSocsoList.length - 1];
                                    responseResult[a].mastersocsolistEmployerContribution = filterMasterSocsoList.mastersocsolistEmployerContribution;
                                    responseResult[a].mastersocsolistEmployeeContribution = filterMasterSocsoList.mastersocsolistEmployeeContribution;
                                    responseResult[a].mastersocsolistEmployerContribution1 = filterMasterSocsoList.mastersocsolistEmployerContribution1;
                                } else {
                                    responseResult[a].mastersocsolistEmployerContribution = filterMasterSocsoList[0].mastersocsolistEmployerContribution;
                                    responseResult[a].mastersocsolistEmployeeContribution = filterMasterSocsoList[0].mastersocsolistEmployeeContribution;
                                    responseResult[a].mastersocsolistEmployerContribution1 = filterMasterSocsoList[0].mastersocsolistEmployerContribution1;
                                }
                            } else {
                                responseResult[a].mastersocsolistEmployerContribution = 0;
                                responseResult[a].mastersocsolistEmployeeContribution = 0;
                                responseResult[a].mastersocsolistEmployerContribution1 = 0;
                            }
                            //#endregion

                            //#region - ESI Data

                            responseResult[a].esiWageTotal = masterESIWages;
                            let filterMasterEsiList = selectMasterEsiList.filter(x =>
                                x.masteresiId == responseResult[a].employeesalarysetupEISGroup &&
                                x.masteresilistFrom <= responseResult[a].esiWageTotal &&
                                x.masteresilistTo >= responseResult[a].esiWageTotal
                            );
                            if (responseResult[a].employeesalarysetupEISGroup != 0) {
                                if (filterMasterEsiList.length == 0) {
                                    filterMasterEsiList = selectMasterEsiList[selectMasterEsiList.length - 1];
                                    responseResult[a].masteresilistEmployerContribution = filterMasterEsiList.masteresilistEmployerContribution;
                                    responseResult[a].masteresilistEmployeeContribution = filterMasterEsiList.masteresilistEmployeeContribution;
                                    responseResult[a].masteresilistEmployerContribution1 = filterMasterEsiList.masteresilistEmployerContribution1;
                                } else {
                                    responseResult[a].masteresilistEmployerContribution = filterMasterEsiList[0].masteresilistEmployerContribution;
                                    responseResult[a].masteresilistEmployeeContribution = filterMasterEsiList[0].masteresilistEmployeeContribution;
                                    responseResult[a].masteresilistEmployerContribution1 = filterMasterEsiList[0].masteresilistEmployerContribution1;
                                }
                            } else {
                                responseResult[a].masteresilistEmployerContribution = 0;
                                responseResult[a].masteresilistEmployeeContribution = 0;
                                responseResult[a].masteresilistEmployerContribution1 = 0;
                            }
                            //#endregion

                            //! HRDF
                            responseResult[a].hrdfWageTotal = masterHRDFWages;
                            let filterMasterhrdfList = selectMasterhrdfList.filter(x =>
                                x.masterhrdfId == responseResult[a].employeesalarysetupHRDFGroup &&
                                x.masterhrdflistFrom <= responseResult[a].hrdfWageTotal &&
                                x.masterhrdflistTo >= responseResult[a].hrdfWageTotal
                            );
                            if (filterMasterhrdfList.length > 0) {
                                if (responseResult[a].employeesalarysetupHRDFGroup != 0) {
                                    responseResult[a].masterhrdflistEmployerContribution = filterMasterhrdfList[0].masterhrdflistEmployerPercentage;
                                    responseResult[a].masterhrdflistEmployeeContribution = filterMasterhrdfList[0].masterhrdflistEmploeePercentage;
                                }
                            } else {
                                responseResult[a].masterhrdflistEmployerContribution = 0;
                                responseResult[a].masterhrdflistEmployeeContribution = 0;
                            }

                            responseResult[a].EpfERate = responseResult[a].employeestatutorysetupEpfERate != 0 ? responseResult[a].employeestatutorysetupEpfERate : responseResult[a].masterepflistEmploeePercentage;
                            responseResult[a].EpfRRate = responseResult[a].employeestatutorysetupEpfRRate != 0 ? responseResult[a].employeestatutorysetupEpfRRate : responseResult[a].masterepflistEmployerPercentage;

                            responseResult[a].SocsoERate = responseResult[a].employeestatutorysetupSocsoERate != 0 ? responseResult[a].employeestatutorysetupSocsoERate : responseResult[a].employeesalarysetupSocsoCategory == 1 ? responseResult[a].mastersocsolistEmployeeContribution : 0.0;
                            responseResult[a].SocsoRRate = responseResult[a].employeestatutorysetupSocsoRRate != 0 ? responseResult[a].employeestatutorysetupSocsoRRate : responseResult[a].employeesalarysetupSocsoCategory == 1 ? responseResult[a].mastersocsolistEmployerContribution : responseResult[a].mastersocsolistEmployerContribution1;

                            responseResult[a].EISERate = responseResult[a].employeestatutorysetupEISERate != 0 ? responseResult[a].employeestatutorysetupEISERate : responseResult[a].employeesalarysetupEISCategory == 1 ? responseResult[a].masteresilistEmployeeContribution : 0.0;
                            responseResult[a].EISRRate = responseResult[a].employeestatutorysetupEISRRate != 0 ? responseResult[a].employeestatutorysetupEISRRate : responseResult[a].employeesalarysetupEISCategory == 1 ? responseResult[a].masteresilistEmployerContribution : responseResult[a].masteresilistEmployerContribution1;

                            responseResult[a].PCBERate = responseResult[a].employeestatutorysetupPCBERate != 0 ? responseResult[a].employeestatutorysetupPCBERate : 0.0;

                            if (responseResult[a].masterhrdflistEmployeeContribution != 0)
                                responseResult[a].HRDFERate = (masterHRDFWages / 100) * responseResult[a].masterhrdflistEmployeeContribution;
                            else
                                responseResult[a].HRDFERate = 0;
                            if (responseResult[a].masterhrdflistEmployerContribution != 0)
                                responseResult[a].HRDFRRate = (masterHRDFWages / 100) * responseResult[a].masterhrdflistEmployerContribution;
                            else
                                responseResult[a].HRDFRRate = 0;

                            request.body.payrollstatutoryEpfWages = responseResult[a].epfWageTotal;
                            request.body.payrollstatutoryEpfEmployee = responseResult[a].EpfERate;
                            request.body.payrollstatutoryEpfEmployer = responseResult[a].EpfRRate;
                            request.body.payrollstatutorySocsoWages = responseResult[a].socsoWageTotal;
                            request.body.payrollstatutorySocsoEmployee = responseResult[a].SocsoERate;
                            request.body.payrollstatutorySocsoEmployer = responseResult[a].SocsoRRate;
                            request.body.payrollstatutoryEISWages = responseResult[a].esiWageTotal;
                            request.body.payrollstatutoryEISEmployee = responseResult[a].EISERate;
                            request.body.payrollstatutoryEISEmployer = responseResult[a].EISRRate;
                            request.body.payrollstatutoryPcbWages = 0;
                            request.body.payrollstatutoryPcbEmployee = responseResult[a].PCBERate;
                            request.body.payrollstatutoryPcbEmployer = 0;
                            request.body.payrollstatutoryHrdfWages = responseResult[a].hrdfWageTotal;
                            request.body.payrollstatutoryHrdfEmployee = responseResult[a].HRDFERate;
                            request.body.payrollstatutoryHrdfEmployer = responseResult[a].HRDFRRate;

                            let verbPayrollStatutory = _clspayrollstatutory.data.masterData(request);
                            let _strInsertPayrollStatutory = _clspayrollstatutory.data.insert(verbPayrollStatutory);
                            strInsertPayrollStatutory += _strInsertPayrollStatutory + ";";

                            if (_dataSelectEmployeeAdditionalPaySetup.length > 0) {
                                strInsertPayrollAdditionalpay += _clspayrolladditionalpay.data.insertString();

                                for (let i = 0; i < _dataSelectEmployeeAdditionalPaySetup.length; i++) {
                                    if (i != 0)
                                        strInsertPayrollAdditionalpay += ",";
                                    strInsertPayrollAdditionalpay += "(" + payrollSalaryId + ", " + _dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupId +
                                        ", " + _dataSelectEmployeeAdditionalPaySetup[i].employeradditionalpaysetupRateTotal + ", " + _dataSelectEmployeeAdditionalPaySetup[i].payrolladditionalpayUnit + ", 0, now())";
                                }
                                strInsertPayrollAdditionalpay += ";";
                            }

                            if (_dataSelectEmployeeOtSetup.length > 0) {
                                strInsertPayrollOvertime += _clspayrollovertime.data.insertString();
                                for (let i = 0; i < _dataSelectEmployeeOtSetup.length; i++) {
                                    if (i != 0)
                                        strInsertPayrollOvertime += ",";
                                    strInsertPayrollOvertime += "(" + payrollSalaryId + ", " + _dataSelectEmployeeOtSetup[i].employerotsetupId +
                                        ", " + _dataSelectEmployeeOtSetup[i].employerotsetupRateTotal + ", " + _dataSelectEmployeeOtSetup[i].payrollovertimeUnit + ", 0, now())";
                                }
                                strInsertPayrollOvertime += ";";
                            }

                            if (_dataSelectEmployeeShiftSetup.length > 0) {
                                strInsertPayrollShift += _clspayrollshift.data.insertString();
                                for (let i = 0; i < _dataSelectEmployeeShiftSetup.length; i++) {
                                    if (i != 0)
                                        strInsertPayrollShift += ",";
                                    strInsertPayrollShift += "(" + payrollSalaryId + ", " + _dataSelectEmployeeShiftSetup[i].employershiftsetupId +
                                        ", " + _dataSelectEmployeeShiftSetup[i].employershiftsetupAmountTotal + ", " + _dataSelectEmployeeShiftSetup[i].payrollShiftUnit + ", 0, now())";
                                }
                                strInsertPayrollShift += ";";
                            }

                            if (_dataSelectPayrollAllowancenDeduction.length > 0) {
                                strInsertAllowancenDeduction += _clspayrollallowancendeduction.data.insertString();
                                for (let i = 0; i < _dataSelectPayrollAllowancenDeduction.length; i++) {
                                    if (i != 0)
                                        strInsertAllowancenDeduction += ",";
                                    strInsertAllowancenDeduction += "(" + payrollSalaryId + "," + _dataSelectPayrollAllowancenDeduction[i].employerallowanceId +
                                        " ," + _dataSelectPayrollAllowancenDeduction[i].employeeallowancendeductionAmountTotal + " , 0, now())";
                                }
                                strInsertAllowancenDeduction += ";";
                            }

                            if (_dataSelectPayrollLoan.length > 0) {
                                strInsertPayrollLoan += _clspayrollloan.data.insertString();
                                for (let i = 0; i < _dataSelectPayrollLoan.length; i++) {
                                    if (i != 0)
                                        strInsertPayrollLoan += ",";
                                    strInsertPayrollLoan += "(" + payrollSalaryId + "," + _dataSelectPayrollLoan[i].employeeloanId +
                                        " ," + _dataSelectPayrollLoan[i].payrollloanAmount + " , 0, now())";
                                }
                                strInsertPayrollLoan += ";";
                            }

                            let masterGrossPay = (parseFloat(request.body.payrollsalaryGenerated) + parseFloat(additionalpayCalculateTotal) +
                                parseFloat(overtimeCalculateTotal) + parseFloat(shiftCalculateTotal) + parseFloat(allowanceCalculateTotal)) - parseFloat(nplTotal);

                            let masterNetPay = parseFloat(masterGrossPay) - (parseFloat(responseResult[a].EpfERate) + parseFloat(responseResult[a].SocsoERate) +
                                parseFloat(responseResult[a].EISERate) + parseFloat(responseResult[a].PCBERate) + parseFloat(responseResult[a].HRDFERate) + parseFloat(LoanCalculateTotal));

                            let _aa = masterGrossPay.toFixed(4);
                            let _aa_a = parseFloat(_aa).toFixed(2);
                            request.body.payrollsalaryGross = parseFloat(_aa_a).toFixed(4);

                            let _ab = masterNetPay.toFixed(4);
                            let _ab_a = parseFloat(_ab).toFixed(2);
                            request.body.payrollsalaryNet = parseFloat(_ab_a).toFixed(4);

                            let _verbPayrollSalary = _clspayrollsalary.data.masterData(request);
                            let strUpdatePayrollSalary = _clspayrollsalary.data.update(_verbPayrollSalary);

                            let [strUpdatePayrollSalaryQueryResult, _strUpdatePayrollSalaryQueryResult] = await connection.query(strUpdatePayrollSalary);

                        }

                        let [strProcessFinalResult, _strProcessFinalResult] = await connection.query(strInsertPayrollStatutory +
                            strInsertPayrollNPL +
                            strInsertPayrollAdditionalpay +
                            strInsertPayrollOvertime +
                            strInsertPayrollShift +
                            strInsertAllowancenDeduction +
                            strInsertPayrollLoan);

                    }
                    await connection.commit();
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
                        'query': error.message
                    };
                }
            }
        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbLockedSalary: async (request, response) => {

        try {

            let employerId = self.fetchEmployerId(request);

            let flag = request.body.flag;
            let payrollId = request.body.payrollId;
            let payrollPassword = request.body.payrollPassword;

            if (flag == "true") {
                let strUpdateLocked = _clspayroll.data.updateLocked(flag, payrollId);
                let [strUpdateLockedResult, _strUpdateLockedResult] = await dbSecurity.asyncResult(strUpdateLocked);

                return {
                    'flag': true,
                    'query': "Data is locked now!"
                };
            } else {

                let strEmployerPermissionSetting = _clsemployerpermissionsetting.data.select(" and employerPermissionSettingKey = 'lockPassword' and employerId = " + employerId);
                let [strEmployerPermissionSettingResult, _strEmployerPermissionSettingResult] = await dbSecurity.asyncResult(strEmployerPermissionSetting);
                if (strEmployerPermissionSettingResult.length > 0) {
                    let Pass = strEmployerPermissionSettingResult[0].employerPermissionSettingValue;
                    if (payrollPassword == Pass) {

                        let strUpdateLocked = _clspayroll.data.updateLocked(flag, payrollId);
                        let [strUpdateLockedResult, _strUpdateLockedResult] = await dbSecurity.asyncResult(strUpdateLocked);

                        return {
                            'flag': true,
                            'query': "Data is unlocked now!"
                        };
                    } else {
                        return {
                            'flag': true,
                            'query': "Password is not matched!"
                        };
                    }
                } else {
                    return {
                        'flag': true,
                        'query': "No password found!"
                    };
                }
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSalaryBankReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let reportStartMonth = request.body.reportStartMonth;
            let reportToMonth = request.body.reportToMonth;

            let employerBankName = "";
            let strSelectPermissionSetting = _clsemployerpermissionsetting.data.select(" and employerId = " + employerId);
            let [strSelectPermissionSettingResult, _strSelectPermissionSettingResult] = await dbSecurity.asyncResult(strSelectPermissionSetting);
            if (strSelectPermissionSettingResult.length > 0) {
                for (let i = 0; i < strSelectPermissionSettingResult.length; i++) {
                    if (strSelectPermissionSettingResult[i].employerPermissionSettingKey == 'employerBankName') {

                        employerBankName = strSelectPermissionSettingResult[i].employerPermissionSettingValue;

                        const bankCodeData = require('../../banks.json');

                        let strPayroll = _clspayroll.data.select(' and employerId = ' + employerId + " and DATE_FORMAT(payrollDate, '%Y-%m') >= DATE_FORMAT('" + reportStartMonth + "', '%Y-%m') and DATE_FORMAT(payrollDate, '%Y-%m') <= DATE_FORMAT('" + reportToMonth + "', '%Y-%m') ");
                        let [strPayrollResult, _strPayrollResult] = await dbSecurity.asyncResult(strPayroll);

                        if (strPayrollResult.length > 0) {
                            let payrollId = strPayrollResult[0].payrollId;

                            let strPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(" and payrollId = " + payrollId + " and employerId = " + employerId);
                            let [strPayrollSalaryResult, _strPayrollSalaryResult] = await dbSecurity.asyncResult(strPayrollSalary);

                            if (bankCodeData.length > 0) {
                                for (let i = 0; i < bankCodeData.length; i++) {

                                    if (bankCodeData[i].Bank == employerBankName) {

                                        let filterBank = bankCodeData[i].Employee;
                                        if (strPayrollSalaryResult.length > 0) {
                                            for (let j = 0; j < strPayrollSalaryResult.length; j++) {

                                                let _memberBank = strPayrollSalaryResult[j].memberBankName;

                                                let _memberBankCode = filterBank.filter(x => x.Bank == _memberBank);

                                                if (_memberBankCode.length > 0)
                                                    strPayrollSalaryResult[j].memberBankCode = _memberBankCode[0].Code;
                                                else
                                                    strPayrollSalaryResult[j].memberBankCode = '';
                                            }
                                        }
                                    }
                                }
                            }
                            return {
                                'flag': true,
                                'result': strPayrollSalaryResult
                            };
                        }
                    }
                }
            } else {
                return {
                    'flag': true,
                    'result': []
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'result': error.message
            };
        }
    },

    /* EA Form Report */

    dbPayrollEAFormReport: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let reportStartMonth = request.body.reportStartMonth;
            let year = moment(reportStartMonth).format('YYYY');
            let childrenValue = 0;

            const reliefsCodeData = require('../../reliefs.json');
            if (reliefsCodeData.length > 0) {
                let filterYearData = reliefsCodeData.filter(x => x.year == year);

                if (filterYearData.length > 0) {
                    let filterTypes = filterYearData[0].types;

                    let _child = filterTypes.filter(x => x.title == 'Child');
                    childrenValue = parseFloat(_child[0].Code);
                }
            }

            let stremployerglobalpayroll = _clsemployerglobalpayroll.data.select(" and employerId = " + employerId);
            let stremployer = _clsemployer.data.select_view_employer(" and employerId = " + employerId);
            let [stremployerglobalpayrollResult, _stremployerglobalpayrollResult] = await dbSecurity.asyncResult(stremployerglobalpayroll + ";" + stremployer);
            /* previous months statutory */
            let strPreviousPayroll = _clspayroll.data.select_view_payroll(" and employerId = " + employerId + " and DATE_FORMAT(payrollDate, '%Y') = DATE_FORMAT('" + reportStartMonth + "', '%Y')  and DATE_FORMAT(payrollDate, '%m') <= DATE_FORMAT('" + reportStartMonth + "', '%m') ");
            let [strPreviousPayrollResult, _strPreviousPayrollResult] = await dbSecurity.asyncResult(strPreviousPayroll);
            if (strPreviousPayrollResult.length > 0) {
                let prevSalaryId = strPreviousPayrollResult.map(x => x.payrollId);
                let prevSalaryIdList = prevSalaryId.toString();

                let strPreviousPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(" and payrollId in ( " + prevSalaryIdList + " ) and employerId = " + employerId);
                let [strPreviousPayrollSalaryResult, _strPreviousPayrollSalaryResult] = await dbSecurity.asyncResult(strPreviousPayrollSalary);

                if (strPreviousPayrollSalaryResult.length > 0) {
                    let prevPayrollsalaryId = strPreviousPayrollSalaryResult.map(x => x.payrollsalaryId);
                    let prevPayrollsalaryIdList = prevPayrollsalaryId.toString();

                    let strPreviousAllowancenDeduction = _clspayrollallowancendeduction.data.select_view_payrollallowancendeduction(" and payrollsalaryId in (" + prevPayrollsalaryIdList + ") ");
                    let [strPreviousStatutoryAllowancenDeductionResult, _strPreviousStatutoryAllowancenDeductionResult] = await dbSecurity.asyncResult(strPreviousAllowancenDeduction);

                    let strPreviousAllowancenDeductionResult = strPreviousStatutoryAllowancenDeductionResult;

                    return {
                        'flag': true,
                        'result': [{
                            "childrenValue": childrenValue,
                            "globalPayroll": stremployerglobalpayrollResult[0],
                            "employerData": stremployerglobalpayrollResult[1],
                            "previousPayrollSalary": strPreviousPayrollSalaryResult,
                            "previousAllowancenDeduction": strPreviousAllowancenDeductionResult
                        }]
                    };
                }
            }
        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },

    dbPayrollPCB2Report: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let reportStartMonth = request.body.reportStartMonth;

            let stremployers = _clsemployer.data.select(" and employerId = " + employerId);
            let stremployerglobalpayroll = _clsemployerglobalpayroll.data.select(" and employerId = " + employerId);
            let [stremployerglobalpayrollResult, _stremployerglobalpayrollResult] = await dbSecurity.asyncResult(stremployerglobalpayroll + ";" + stremployers);
            /* previous months statutory */
            let strPreviousPayroll = _clspayroll.data.select_view_payroll(" and employerId = " + employerId + " and DATE_FORMAT(payrollDate, '%Y') <= DATE_FORMAT('" + reportStartMonth + "', '%Y') ");
            let [strPreviousPayrollResult, _strPreviousPayrollResult] = await dbSecurity.asyncResult(strPreviousPayroll);
            if (strPreviousPayrollResult.length > 0) {
                let prevSalaryId = strPreviousPayrollResult.map(x => x.payrollId);
                let prevSalaryIdList = prevSalaryId.toString();

                let strPreviousPayrollSalary = _clspayrollsalary.data.select_PayrollSalaryForReport(" and payrollId in ( " + prevSalaryIdList + " ) and employerId = " + employerId);
                let [strPreviousPayrollSalaryResult, _strPreviousPayrollSalaryResult] = await dbSecurity.asyncResult(strPreviousPayrollSalary);

                if (strPreviousPayrollSalaryResult.length > 0) {
                    let prevPayrollsalaryId = strPreviousPayrollSalaryResult.map(x => x.payrollsalaryId);
                    let prevPayrollsalaryIdList = prevPayrollsalaryId.toString();

                    let strPreviousAllowancenDeduction = _clspayrollallowancendeduction.data.select_view_payrollallowancendeduction(" and payrollsalaryId in (" + prevPayrollsalaryIdList + ") ");
                    let [strPreviousStatutoryAllowancenDeductionResult, _strPreviousStatutoryAllowancenDeductionResult] = await dbSecurity.asyncResult(strPreviousAllowancenDeduction);

                    let strPreviousAllowancenDeductionResult = strPreviousStatutoryAllowancenDeductionResult;

                    return {
                        'flag': true,
                        'result': [{
                            "globalPayroll": stremployerglobalpayrollResult[0],
                            "employers": stremployerglobalpayrollResult[01],
                            "previousPayrollSalary": strPreviousPayrollSalaryResult,
                            "previousAllowancenDeduction": strPreviousAllowancenDeductionResult
                        }]
                    };
                }
            }
        } catch (error) {
            return {
                'flag': false,
                'result': [],
                'query': error.message
            };
        }
    },
};