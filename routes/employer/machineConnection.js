require('dotenv').config();

var express = require('express');
var router = express.Router();
/* Package */
const request = require('request');
const util = require('util');
const convert = require('xml-js');
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
/* component */
const _weTransferData = require("../../docs/components/component_employer/_weTransferData");
/* class */
const _clsemployee = require("../../docs/modules/model_employee/clsemployee");
const _clsmachinelist = require("../../docs/modules/model_employer/clsmachinelist");

router.post('/checkConnection', async function (req, res, next) {
    try {

        let mastermachineUrl = req.body.mastermachineUrl;
        let mastermachineUser = req.body.mastermachineUser;
        let mastermachinePassword = req.body.mastermachinePassword;

        var options = {
            'method': 'GET',
            'url': mastermachineUrl + '/ISAPI/Security/userCheck',
            'headers': {},
            auth: {
                user: mastermachineUser,
                pass: mastermachinePassword,
                sendImmediately: false
            },
        };

        let requestPromise = util.promisify(request);
        let response = await requestPromise(options);

        var result = convert.xml2json(response.body, {
            compact: true,
            spaces: 4
        });

        let data = JSON.parse(result);

        if (data.userCheck.statusString._text == 'OK')
            res.send({
                status: '200',
                data: 'OK'
            });
        else
            res.send({
                status: '201',
                data: ''
            });

    } catch (error) {
        dbCommon.log_file('Machine Connection, checkConnection : ' + error.message);
        clientResponse.emptyData([], response, error.message);
        res.send({
            status: '201',
            data: ''
        });
    }
});

router.post('/checkPictureLibrary', async function (req, res, next) {

    try {

        let mastermachineUrl = req.body.mastermachineUrl;
        let mastermachineUser = req.body.mastermachineUser;
        let mastermachinePassword = req.body.mastermachinePassword;

        var options = {
            'method': 'GET',
            'url': mastermachineUrl + '/ISAPI/Intelligent/FDLib?format=json',
            'headers': {},
            auth: {
                user: mastermachineUser,
                pass: mastermachinePassword,
                sendImmediately: false
            },
        };

        let requestPromise = util.promisify(request);
        let response = await requestPromise(options);

        let resultCase = JSON.parse(response.body);

        if (resultCase.statusString == 'OK') {
            res.status(200).json({
                status: 200,
                message: "Picture library is already created!",
                data: resultCase
            });
        }

        if (resultCase.statusString == 'Invalid Content') {
            res.status(200).json({
                status: 500,
                message: "Need to create picture library!",
                data: resultCase
            });
        }

    } catch (error) {
        dbCommon.log_file('Machine Connection, checkPictureLibrary : ' + error.message);
        clientResponse.emptyData([], response, error.message);
        res.status(200).json({
            status: 400,
            message: "Error!",
            data: error
        });
    }

});

router.post('/createPictureLibrary', async function (req, res, next) {
    try {

        let mastermachineUrl = req.body.mastermachineUrl;
        let mastermachineUser = req.body.mastermachineUser;
        let mastermachinePassword = req.body.mastermachinePassword;

        var options = {
            'method': 'POST',
            'url': mastermachineUrl + '/ISAPI/Intelligent/FDLib?format=json',
            'headers': {},
            body: {
                "faceLibType": "blackFD",
                "name": "Default"
            },
            json: true,
            auth: {
                user: mastermachineUser,
                pass: mastermachinePassword,
                sendImmediately: false
            },
        };

        let requestPromise = util.promisify(request);
        let response = await requestPromise(options);

        res.send(response.body);
    } catch (error) {
        dbCommon.log_file('Machine Connection, createPictureLibrary : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/pushUserToMachine', async function (req, res, next) {
    try {

        let resultTransfer = await _weTransferData.pushUserToMachine(req);

        if (resultTransfer == 'YES') {
            let enrollNo = req.body.employeeNo;
            let strQuery = _clsemployee.data.updateColumnFromEnroll(" employeeIsMachine = true ", enrollNo);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strQuery);
        }
        res.send({
            status: '200',
            data: 'OK'
        });

    } catch (error) {
        dbCommon.log_file('Machine Connection, pushUserToMachine : ' + error.message);
        clientResponse.emptyData([], response, error.message);
        res.send({
            status: '404',
            data: 'error occurred during processing!'
        });
    }
});

router.post('/deleteUserFromMachine', async function (req, res, next) {
    try {

        let resultTransfer = await _weTransferData.removeUserFromMachine(req);

        if (resultTransfer == 'YES') {
            let enrollNo = req.body.employeeNo;
            let strQuery = _clsemployee.data.updateColumnFromEnroll(" employeeIsMachine = false ", enrollNo);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strQuery);

            res.send({
                status: '200',
                data: 'Remove from machine.'
            });

        } else {
            res.send({
                status: '201',
                data: 'Error while process.'
            });
        }

    } catch (error) {
        dbCommon.log_file('Machine Connection, deleteUserFromMachine : ' + error.message);
        clientResponse.emptyData([], response, error.message);
        res.send({
            status: '404',
            data: 'error occurred during processing!'
        });
    }
});

router.post('/transferUserDataFromMachineToServer', async function (req, res, next) {
    try {

        let resultTransfer = await _weTransferData.transferDataMachineToServer(req);

        if (resultTransfer.status == true) {
            dbCommon.log_file('Push Suucess Manual: ' + new Date().toLocaleString());
            res.send({
                status: '201',
                data: resultTransfer.data
            });
        } else {
            dbCommon.log_file('Push Issue Manual: ' + new Date().toLocaleString());
            res.send({
                status: '201',
                data: 'No data found!'
            });
        }

    } catch (error) {
        dbCommon.log_file('Machine Connection, transferUserDataFromMachineToServer : ' + error.message);
        clientResponse.emptyData([], response, error.message);
        res.send({
            status: '404',
            data: 'error occurred during processing!'
        });
    }
});

router.post('/pushUserToAllMachine', async function (req, res, next) {
    try {

        let strMachine = _clsmachinelist.data.select(" and employerId = " + req.body.employerId);
        let [strMachineResult] = await dbSecurity.asyncResult(strMachine);

        if (strMachineResult.length > 0) {
            for (let i = 0; i < strMachineResult.length; i++) {

                req.body.mastermachineUrl = strMachineResult[i].machineUrl;
                req.body.mastermachineUser = strMachineResult[i].machineUser;
                req.body.mastermachinePassword = strMachineResult[i].machinePassword;

                let resultTransfer = await _weTransferData.pushUserToMachine(req);

                if (resultTransfer == 'YES') {
                    let enrollNo = req.body.employeeNo;
                    let strQuery = _clsemployee.data.updateColumnFromEnroll(" employeeIsMachine = true ", enrollNo);
                    let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strQuery);
                }
            }
            res.send({
                status: '200',
                data: 'OK'
            });
        } else {
            res.send({
                status: '201',
                data: 'Error while processing.'
            });
        }

    } catch (error) {
        dbCommon.log_file('Machine Connection, pushUserToMachine : ' + error.message);
        clientResponse.emptyData([], response, error.message);
        res.send({
            status: '404',
            data: 'error occurred during processing!'
        });
    }
});

module.exports = router;