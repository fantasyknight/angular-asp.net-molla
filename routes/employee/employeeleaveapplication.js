/* package */
let express = require('express');
let router = express.Router();

let moment = require('moment');

/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _employeeleaveapplication = require("../../docs/components/component_employee/employeeleaveapplication");
/* class */
const _clsemployerleavetype = require("../../docs/modules/model_employer/clsemployerleavetype");
const _clsemployeeleaveapplication = require("../../docs/modules/model_employee/clsemployeeleaveapplication");
const _classEmployeeLeaveEntitlement = require("../../docs/modules/model_employee/clsemployeeleaveentitlement");
const _classemployerleavetypeentitlement = require("../../docs/modules/model_employer/clsemployerleavetypeentitlement");
const _clsemployee = require("../../docs/modules/model_employee/clsemployee");


router.post('/employeeleaveapplication_apiSelection/', function (request, response) {
    try {

        let strResult = _employeeleaveapplication.dbSelection(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave application found!");
            else {
                clientResponse.sendAll(result, response, "Leave application records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiSelection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiSelect/', function (request, response) {
    try {

        let strResult = _employeeleaveapplication.dbSelect(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave application found!");
            else {
                clientResponse.sendData(result, response, "Leave application records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiSelect : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiSelectAll/', function (request, response) {
    try {

        let strResult = _employeeleaveapplication.dbSelectAll(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData(strQuery, response);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result[0].length == 0)
                clientResponse.emptyData(result, response, "No leave application found!");
            else {
                clientResponse.sendData(result, response, "Leave application records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiSelectAll : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiDelete/', async function (request, response) {
    try {

        let strResult = await _employeeleaveapplication.dbDelete(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.emptyData([], response, "Leave Application, Record is in used!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.deleteData(result, response, "Leave Application, Record deleted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiDelete : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiInsert/', async function (request, response) {
    try {

        let strResult = await _employeeleaveapplication.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Application, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.insertData(result, response, "Leave Application, Record inserted!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiInsert : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiUpdate/', async function (request, response) {
    try {

        let strResult = await _employeeleaveapplication.dbUpdate(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "Leave Application, Record exists!");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Leave Application, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

//#region as per the requirement!

router.post('/_employeeleaveapplication_apiLeaveCalculation/', async function (request, response) {
    try {

        let employerleavetypeId = request.body.employerleavetypeId || 0;
        let employeeId = request.body.employeeId || 0;
        let selectedFromDate = request.body.selectedFromDate;

        let strSelectEmployee = _clsemployee.data.select_calculate_Joining(" and employeeId = " + employeeId, selectedFromDate);
        let [strSelectEmployeeResult, _strSelectEmployeeResult] = await dbSecurity.asyncResult(strSelectEmployee);

        let _joiningYearDate = moment(strSelectEmployeeResult[0].startYearDate).format("YYYY-MM-DD");
        let _endingYearDate = moment(strSelectEmployeeResult[0].endYearDate).format("YYYY-MM-DD");
        let earnMonth = strSelectEmployeeResult[0].earnMonth;

        //. Leave Entitlement
        let strSelectLeaveEntitlement = _classEmployeeLeaveEntitlement.data.select(" and employeeId = " + employeeId + " and employerleavetypeId = " + employerleavetypeId);
        let [strSelectLeaveEntitlementResult, _strSelectLeaveEntitlementResult] = await dbSecurity.asyncResult(strSelectLeaveEntitlement);

        let entitlement = 0;
        let previousYearBnf = 0;

        if (strSelectLeaveEntitlementResult.length > 0) {
            entitlement = strSelectLeaveEntitlementResult[0].employeeleaveentitlementEntitled;
            previousYearBnf = strSelectLeaveEntitlementResult[0].employeeleaveentitlementPreviousYearBnf;
            overrideBnf = strSelectLeaveEntitlementResult[0].employeeleaveentitlementAllowedbnfOverride;
            allowedBnf = strSelectLeaveEntitlementResult[0].employeeleaveentitlementAllowendbnf;
        }

        //. Leave type
        let strSelectLeaveType = _clsemployerleavetype.data.select(" and employerleavetypeId = " + employerleavetypeId);
        let [strSelectLeaveTypeResult, _strSelectLeaveTypeResult] = await dbSecurity.asyncResult(strSelectLeaveType);

        let value = strSelectLeaveTypeResult[0].employerleavetypeEntitlementRounding;
        let entitlementDay1 = 0;
        let entitlementDay2 = 0;

        //. Leave Count

        strwhere = "";
        strwhere += " and employeeId = " + employeeId;
        strwhere += " and employerleavetypeId = " + employerleavetypeId;
        strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') >= DATE_FORMAT('" + _joiningYearDate + "', '%Y-%m')";
        strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') <= DATE_FORMAT('" + _endingYearDate + "', '%Y-%m')";

        let strSelectLeaveCount = _clsemployeeleaveapplication.data.total_view_employeeleaveapplication(strwhere);
        let [strSelectLeaveCountResult, _strSelectLeaveCountResult] = await dbSecurity.asyncResult(strSelectLeaveCount);

        let totalLeave = strSelectLeaveCountResult[0].cnt;
        let dLeaveEntitled = 0;
        let bal1 = 0;

        if (strSelectLeaveTypeResult[0].employerleavetypeOnProrateBasis == 1) {
            entitlementDay1 = (entitlement / 12) * (earnMonth);
            if (!Number.isInteger(entitlementDay1)) {

                entitlementDay2 = Math.floor(entitlementDay1);
                if (value == 1)
                    entitlementDay2 = entitlementDay2 + 1;
                if (value == 2)
                    entitlementDay2 = entitlementDay2;

            } else
                entitlementDay2 = entitlementDay1;

            if (entitlement < entitlementDay2 || earnMonth == 11 || earnMonth == 12)
                entitlementDay2 = entitlement;

            dLeaveEntitled = entitlementDay2 + previousYearBnf;
            bal1 = dLeaveEntitled - totalLeave;
        } else {
            dLeaveEntitled = entitlement + previousYearBnf;
            bal1 = dLeaveEntitled - totalLeave;
        }

        let result = [{
            "total": dLeaveEntitled,
            "leave": totalLeave,
            "bal": bal1,
            "actualEntitle": entitlement,
            "currentYearStart": _joiningYearDate,
            "currentYearEnd": _endingYearDate
        }];

        clientResponse.sendAll(result, response, "Leave application records are listed!");

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiLeaveCalculation : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiSelectCount/', function (request, response) {
    try {

        let strResult = _employeeleaveapplication.dbSelect_Count(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else if (result.length == 0)
                clientResponse.emptyData(result, response, "No leave found!");
            else {
                clientResponse.sendAll(result, response, "Leave records are listed!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Leave Application, employeeleaveapplication_apiSelectCount : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiAutoLeaveCalculation/', function (request, response) {
    try {

        _employeeleaveapplication.dbAutoLeaveCalculation(request, response);
        clientResponse.insertData([], response, "Leave Summary, Will update your leave summary using background process!");

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiLeaveCalculation : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/employeeleaveapplication_apiLeaveCalculation/', async function (request, response) {
    try {

        let employerLeaveTypeId = request.body.employerleavetypeId || 0;
        let employeeId = request.body.employeeId || 0;
        let employerId = request.body.employerId || 0;
        let selectedFromDate = request.body.selectedFromDate;

        const startOfMonth = moment(selectedFromDate).startOf('year').format('YYYY-MM-DD 00:00:00');
        const endOfMonth = moment(selectedFromDate).endOf('year').format('YYYY-MM-DD 00:00:00');

        let strCalculateLeave = _classEmployeeLeaveEntitlement.data.select_leavecalculation(employeeId, startOfMonth, endOfMonth);
        let [strCalculateLeaveResult, _strCalculateLeaveResult] = await dbSecurity.asyncResult(strCalculateLeave);

        if (strCalculateLeaveResult.length > 0) {
            let _currentStartDate = strCalculateLeaveResult[0].currentStartDate;
            let _currentEndDate = strCalculateLeaveResult[0].currentEndDate;

            let _fromJoinDay = parseFloat(strCalculateLeaveResult[0].fromJoinDay);
            let _priorJoinDay = parseFloat(strCalculateLeaveResult[0].priorJoinDay);
            //..
            let _fromJoinDay1 = parseFloat(strCalculateLeaveResult[0].fromJoinDay1);
            let _priorJoinDay1 = parseFloat(strCalculateLeaveResult[0].priorJoinDay1);
            let _totalYear = strCalculateLeaveResult[0].totalYear;
            let _matchYear = strCalculateLeaveResult[0].matchYear;

            //. Leave type
            let strSelectLeaveType = _clsemployerleavetype.data.select(" and employerleavetypeId = " + employerLeaveTypeId);
            let [strSelectLeaveTypeResult, _strSelectLeaveTypeResult] = await dbSecurity.asyncResult(strSelectLeaveType);

            let employerleavetypeEntitlementRounding = strSelectLeaveTypeResult[0].employerleavetypeEntitlementRounding;
            let employerleavetypeOnProrateBasis = strSelectLeaveTypeResult[0].employerleavetypeOnProrateBasis;

            //. Leave Entitlement
            let strSelectLeaveEntitlement = _classEmployeeLeaveEntitlement.data.select(" and employeeId = " + employeeId + " and employerleavetypeId = " + employerLeaveTypeId);
            let strSelectEmployerLeaveTypeEntitlement = _classemployerleavetypeentitlement.data.select(" and employerleavetypeId = " + employerLeaveTypeId);
            let [strSelectLeaveEntitlementResult, _strSelectLeaveEntitlementResult] = await dbSecurity.asyncResult(strSelectLeaveEntitlement + ';' + strSelectEmployerLeaveTypeEntitlement);

            let _employeeLeaveEntitle = strSelectLeaveEntitlementResult[0];
            let _employerLeaveEntitle = strSelectLeaveEntitlementResult[1];

            let previousYearBnf = 0;
            let employerleavetypeentitlementEntitleDay1 = 0;
            let employerleavetypeentitlementEntitleDay2 = 0;
            let totalEntitleDay = 0;

            if (_employerLeaveEntitle.length > 0) {
                let _roundTotalYear = Math.ceil(_totalYear);
                let _roundPrevTotalYear = Math.ceil(_totalYear - 1);

                let filterData1 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundTotalYear);
                let filterData2 = _employerLeaveEntitle.filter(x => x.employerleavetypeentitlementStart <= _roundPrevTotalYear);
                let lastFilterData1 = filterData1[filterData1.length - 1];
                let lastFilterData2 = filterData2[filterData2.length - 1];

                employerleavetypeentitlementEntitleDay1 = lastFilterData1.employerleavetypeentitlementEntitleDay;
                if (filterData2.length > 0)
                    employerleavetypeentitlementEntitleDay2 = lastFilterData2.employerleavetypeentitlementEntitleDay;
                else
                    employerleavetypeentitlementEntitleDay2 = 0;

            }

            let _totalEntitleDay = 0;
            if (_matchYear >= 11) {
                _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
            } else {
                if (employerleavetypeOnProrateBasis == 0) {
                    _totalEntitleDay = employerleavetypeentitlementEntitleDay1;
                }
                //_totalEntitleDay = (_fromJoinDay * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay * employerleavetypeentitlementEntitleDay2);
                else
                    _totalEntitleDay = (_fromJoinDay1 * employerleavetypeentitlementEntitleDay1) + (_priorJoinDay1 * employerleavetypeentitlementEntitleDay2);
            }
            if (_employeeLeaveEntitle.length > 0)
                previousYearBnf = _employeeLeaveEntitle[0].employeeleaveentitlementPreviousYearBnf;

            totalEntitleDay = _totalEntitleDay + previousYearBnf;

            let _totalEntitleDay1 = 0;
            if (!Number.isInteger(totalEntitleDay)) {
                _totalEntitleDay1 = Math.floor(totalEntitleDay);
                if (employerleavetypeEntitlementRounding == 1)
                    _totalEntitleDay1 = _totalEntitleDay1 + 0.5;
                if (employerleavetypeEntitlementRounding == 2)
                    _totalEntitleDay1 = _totalEntitleDay1;
            } else
                _totalEntitleDay1 = totalEntitleDay;


            //. Leave Count
            strwhere = "";
            strwhere += " and employeeId = " + employeeId;
            strwhere += " and employerleavetypeId = " + employerLeaveTypeId;
            strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveFrom,'%Y-%m') >= DATE_FORMAT('" + _currentStartDate + "', '%Y-%m')";
            strwhere += " and DATE_FORMAT(employeeleaveapplicationLeaveTo,'%Y-%m') <= DATE_FORMAT('" + _currentEndDate + "', '%Y-%m')";

            let strSelectLeaveCount = _clsemployeeleaveapplication.data.total_view_employeeleaveapplication(strwhere);
            let [strSelectLeaveCountResult, _strSelectLeaveCountResult] = await dbSecurity.asyncResult(strSelectLeaveCount);

            let totalLeave = strSelectLeaveCountResult[0].cnt;
            let totalLeaveBalance = (_totalEntitleDay1 - totalLeave);

            let result = [{
                'EntitleDay': _totalEntitleDay1,
                'totalLeave': totalLeave,
                'totalLeaveBalance': totalLeaveBalance,
                'currentStartYear': moment(_currentStartDate).format('YYYY-MM-DD'),
                'currentEndYear': moment(_currentEndDate).format('YYYY-MM-DD')
            }];

            clientResponse.sendAll(result, response, "Leave application records are listed!");

        }

    } catch (error) {
        dbCommon.log_file('Employee Leave Application, employeeleaveapplication_apiLeaveCalculation : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;