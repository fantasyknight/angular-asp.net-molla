var express = require('express');
var router = express.Router();
/* common */
const dbSecurity = require("../docs/config/dbSecurity");
const dbCommon = require("../docs/config/dbCommon");
/* class */
const _clsmachinelist = require("../docs/modules/model_employer/clsmachinelist");
const _clsemployee = require("../docs/modules/model_employee/clsemployee");
const _clsemployer = require("../docs/modules/model_employer/clsemployer");
/* component */
const _weTransferData = require("../docs/components/component_employer/_weTransferData");
const _employeeleavereport = require("../docs/components/component_employee/employeeleavereport");

/* GET home page. */
router.get('/', function (request, response, next) {
  response.send("Hello, IzemAPI is ready!");
});

router.get('/pass', function (request, response) {
  let value = dbSecurity.decrypt(request.query.val);
  response.send(value);
});

/*-- Auto download records from the machine each company.. --*/
router.get('/autoDownloadAllAttendanceData', async function (req, res) {
  try {
    let strMachine = _clsmachinelist.data.select("");
    let [strMachineResult, _strMachineResult] = await dbSecurity.asyncResult(strMachine);

    /* Machine data process. */
    if (strMachineResult.length > 0) {
      for (let i = 0; i < strMachineResult.length; i++) {

        let machineUrl = strMachineResult[i].machineUrl;
        let machineUser = strMachineResult[i].machineUser;
        let machinePassword = strMachineResult[i].machinePassword;

        req.body.mastermachineUrl = 'http://' + machineUrl;
        req.body.mastermachineUser = machineUser;
        req.body.mastermachinePassword = machinePassword;

        await _weTransferData.transferDataMachineToServer1(req);
      }
    }
  } catch (error) {
    dbCommon.log_file('Auto-Download, autoDownloadAllAttendanceData : ' + error.message);
  }

  res.send("On going process!");
});

/*-- Remove inactive employee from the machine from each company.. --*/
router.get('/autoRemoveInactiveEmployeeFromDevice', async function (req, res) {
  try {

    let strMachine = _clsmachinelist.data.select("");
    let [strMachineResult, _strMachineResult] = await dbSecurity.asyncResult(strMachine);
    const _employerIdList = [...new Set(strMachineResult.map(item => item.employerId))];
    /* Employee data */
    let strEmployee = _clsemployee.data.select(" and employerId in (" + _employerIdList.toString() + ") and employeeIsActive = false ");
    let [strEmployeeResult, _strEmployeeResult] = await dbSecurity.asyncResult(strEmployee);
    /* Employer data */
    let strEmployer = _clsemployer.data.select(" and employerId in (" + _employerIdList.toString() + ") ");
    let [strEmployerResult, _strEmployerResult] = await dbSecurity.asyncResult(strEmployer);
    if (strMachineResult.length > 0) {
      for (let i = 0; i < strMachineResult.length; i++) {

        req.body.mastermachineUrl = 'http://' + strMachineResult[i].machineUrl;
        req.body.mastermachineUser = strMachineResult[i].machineUser;
        req.body.mastermachinePassword = strMachineResult[i].machinePassword;

        let employerId = strMachineResult[i].employerId;

        let _employeeData = strEmployeeResult.filter(x => x.employerId == employerId);
        if (_employeeData.length > 0) {
          for (let j = 0; j < _employeeData.length; j++) {

            req.body.employeeNo = _employeeData[j].employeeEnroll;
            await _weTransferData.removeUserFromMachine(req);
          }
        }
      }
    }

  } catch (error) {
    dbCommon.log_file('Auto-Remove Employee, autoRemoveInactiveEmployeeFromDevice : ' + error.message);
  }

  res.send("On going process!");
});

/*-- Auto calculate next year previous BNF.. --*/
router.get('/autoLeaveCalculatePreviousYearBnf', async function (req, res) {
  try {
    await _employeeleavereport.dbAutoCalculatePreviousYearBNF(req);

  } catch (error) {
    dbCommon.log_file('Leave Calculation, autoCalculatePreviousYearBnf : ' + error.message);
  }

  res.send("On going process!");
});

module.exports = router;