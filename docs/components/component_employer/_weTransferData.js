require('dotenv').config();
/* Package */
const requestCheck = require('request');
const util = require('util');
const convert = require('xml-js');
const moment = require('moment');
/* component */
const _employeeattendance = require("../component_employee/employeeattendance");
/* class */
const _clsmachinelist = require("../../modules/model_employer/clsmachinelist");

const self = module.exports = {

    deviceInfo: async (request) => {

        try {

            let mastermachineUrl = request.body.mastermachineUrl;
            let mastermachineUser = request.body.mastermachineUser;
            let mastermachinePassword = request.body.mastermachinePassword;

            var options = {
                'method': 'GET',
                'url': mastermachineUrl + '/ISAPI/System/deviceinfo',
                'headers': {},
                auth: {
                    user: mastermachineUser,
                    pass: mastermachinePassword,
                    sendImmediately: false
                },
            };

            let requestPromise = util.promisify(requestCheck);
            let response = await requestPromise(options);

            var result = convert.xml2json(response.body, {
                compact: true,
                spaces: 4
            });

            let data = JSON.parse(result);

            return data.DeviceInfo.serialNumber._text;

        } catch (error) {
            console.log(error);
            return '';
        }
    },

    transferDataMachineToServer: async (request) => {
        try {
            /* Fetch serial number from machine. */
            let serialNumber = await self.deviceInfo(request);
            if (serialNumber == '') {
                return '';
            }

            let mastermachineUrl = request.body.mastermachineUrl;
            let mastermachineUser = request.body.mastermachineUser;
            let mastermachinePassword = request.body.mastermachinePassword;

            let transferDate = request.body.transferDate || "";

            let currentDate = moment().format('YYYY-MM-DD');
            let nextDay = moment().add(1, 'days').format('YYYY-MM-DD');

            if (transferDate != "") {
                currentDate = moment(transferDate).format('YYYY-MM-DD');
                nextDay = moment(transferDate).add(1, 'days').format('YYYY-MM-DD');
            }

            let responseData = [];
            let responseDataEvent = [];

            let position = 0;
            let responseResult = 'MORE';

            const requestPromise = util.promisify(requestCheck);
            /* Fetch user data from machine. */
            while (responseResult == 'MORE') {

                var options = {
                    'method': 'POST',
                    'url': mastermachineUrl + '/ISAPI/AccessControl/UserInfo/search?format=json',
                    'headers': {},
                    body: {
                        "UserInfoSearchCond": {
                            "searchID": "0",
                            "searchResultPosition": position,
                            "maxResults": 30
                        }
                    },
                    json: true,
                    auth: {
                        user: mastermachineUser,
                        pass: mastermachinePassword,
                        sendImmediately: false
                    }
                };

                const response = await requestPromise(options);

                responseResult = response.body.UserInfoSearch.responseStatusStrg;

                if (responseResult == 'MORE')
                    position += 30;

                let dataValue = [];

                if (responseResult != 'NO MATCH')
                    dataValue = response.body.UserInfoSearch.UserInfo;

                if (dataValue.length > 0)
                    for (let i = 0; i < dataValue.length; i++)
                        responseData.push(dataValue[i].employeeNo);
            }
            /* Fetch attendance data from machine base on user data */
            if (responseData.length > 0) {
                for (let i = 0; i < responseData.length; i++) {

                    let enrollNo = responseData[i].toString();

                    let positionEvent = 0;
                    let responseResultEvent = 'MORE';

                    let startDate = moment(currentDate + ' 00:00:00').format();
                    let endDate = moment(currentDate + ' 23:59:00').format();

                    while (responseResultEvent == 'MORE') {
                        var optionsEvents = {
                            'method': 'POST',
                            'url': mastermachineUrl + '/ISAPI/AccessControl/AcsEvent?format=json',
                            'headers': {},
                            body: {
                                "AcsEventCond": {
                                    "searchId": "1",
                                    "searchResultPosition": positionEvent,
                                    "maxResults": 30,
                                    "employeeNoString": enrollNo,
                                    "startTime": startDate,
                                    "endTime": endDate,
                                    "major": 0,
                                    "minor": 0
                                }
                            },
                            json: true,
                            auth: {
                                user: mastermachineUser,
                                pass: mastermachinePassword,
                                sendImmediately: false
                            }
                        };

                        const response = await requestPromise(optionsEvents);

                        if (response.body.AcsEvent.responseStatusStrg != 'NO MATCH') {

                            responseResultEvent = response.body.AcsEvent.responseStatusStrg;

                            let EventData = response.body.AcsEvent.InfoList;

                            if (responseResultEvent == 'MORE')
                                positionEvent += 30;

                            if (EventData.length > 0)
                                for (let i = 0; i < EventData.length; i++)
                                    responseDataEvent.push({
                                        employeeNoString: EventData[i].employeeNoString,
                                        name: EventData[i].name,
                                        time: EventData[i].time
                                    });
                        } else {
                            positionEvent = 0;
                            responseResultEvent = 'OK';
                        }
                    }
                }
            }
            /* Filter attendance data */
            let masterFilterData = responseDataEvent;
            let jsonObject = masterFilterData.map(JSON.stringify);
            let uniqueSet = new Set(jsonObject);
            let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            /* Post attendance data to server */
            if (uniqueArray.length > 0) {

                request.body.currentDate = currentDate;
                request.body.serialNumber = serialNumber.toString();
                request.body.DeviceData = JSON.stringify(uniqueArray);

                let insertResult = await _employeeattendance.dbInsertToCloud(request);

                return {
                    status: true,
                    data: insertResult,
                    processDate: currentDate
                };

            } else {
                return {
                    status: false,
                    data: 'No data found!'
                };
            }

        } catch (error) {
            return {
                status: false,
                data: 'No data found!'
            };
        }
    },

    removeUserFromMachine: async (request) => {
        try {

            let mastermachineUrl = request.body.mastermachineUrl;
            let mastermachineUser = request.body.mastermachineUser;
            let mastermachinePassword = request.body.mastermachinePassword;
            let employeeNo = request.body.employeeNo;

            var options = {
                'method': 'PUT',
                'url': mastermachineUrl + '/ISAPI/AccessControl/UserInfo/Delete?format=json',
                'headers': {},
                body: {
                    "UserInfoDelCond": {
                        "EmployeeNoList": [{
                            "employeeNo": employeeNo
                        }]
                    }
                },
                json: true,
                auth: {
                    user: mastermachineUser,
                    pass: mastermachinePassword,
                    sendImmediately: false
                }
            };

            let requestPromise = util.promisify(requestCheck);
            let response = await requestPromise(options);
            if (response.body.statusString == 'OK') {
                return 'YES';
            } else {
                return 'NO';
            }

        } catch (error) {
            console.log(error);
        }
    },

    pushUserToMachine: async (request) => {
        try {

            let mastermachineUrl = 'http://' + request.body.mastermachineUrl;
            let mastermachineUser = request.body.mastermachineUser;
            let mastermachinePassword = request.body.mastermachinePassword;

            let employeeName = request.body.employeeName;
            let employeeNo = request.body.employeeNo;
            let employerId = request.body.employerId;
            let employeeGender = request.body.employeeGender.toLowerCase();

            var options = {
                'method': 'POST',
                'url': mastermachineUrl + '/ISAPI/AccessControl/UserInfo/Record?format=json',
                'headers': {},
                body: {
                    "UserInfo": {
                        "employeeNo": employeeNo,
                        "name": employeeName,
                        "userType": "normal",
                        "gender": employeeGender,
                        "closeDelayEnabled": false,
                        "doorRight": "1",
                        "password": "1234",
                        "Valid": {
                            "enable": true,
                            "beginTime": "2021-01-14T00:00:00",
                            "endTime": "2036-12-31T23:59:59",
                            "timeType": "local"
                        },
                        "RightPlan": [{
                            "doorNo": 1,
                            "planTemplateNo": "1"
                        }]
                    }
                },
                json: true,
                auth: {
                    user: mastermachineUser,
                    pass: mastermachinePassword,
                    sendImmediately: false
                }
            };

            let requestPromise = util.promisify(requestCheck);
            let response = await requestPromise(options);

            /* Upload image to terminal from live server. */

            if (response.body.statusString == 'OK') {

                var optionImage = {
                    'method': 'POST',
                    'url': mastermachineUrl + '/ISAPI/Intelligent/FDLib/FaceDataRecord?format=json',
                    'headers': {},
                    body: {
                        "faceURL": process.env.serverPath + "/image/" + employerId + "/" + employeeNo + ".jpg",
                        "faceLibType": "blackFD",
                        "FDID": process.env.pictureId,
                        "FPID": employeeNo,
                        "name": employeeName,
                        "bornTime": "2020-10-15T00:00:00+08:00"
                    },
                    json: true,
                    auth: {
                        user: mastermachineUser,
                        pass: mastermachinePassword,
                        sendImmediately: false
                    }
                };
                const responseStatusImage = await requestPromise(optionImage);
            }

            if (response.body.statusString == 'OK') {
                return 'YES';
            } else {
                return 'NO';
            }

        } catch (error) {
            console.log(error);
        }
    },

    transferDataMachineToServer1: async (request) => {
        try {
            /* Fetch serial number from machine. */
            let serialNumber = await self.deviceInfo(request);
            if (serialNumber == '') {
                return '';
            }

            let mastermachineUrl = request.body.mastermachineUrl;
            let mastermachineUser = request.body.mastermachineUser;
            let mastermachinePassword = request.body.mastermachinePassword;

            let transferDate = request.body.transferDate || "";

            let currentDate = moment().format('YYYY-MM-DD');
            let nextDay = moment().add(1, 'days').format('YYYY-MM-DD');

            if (transferDate != "") {
                currentDate = moment(transferDate).format('YYYY-MM-DD');
                nextDay = moment(transferDate).add(1, 'days').format('YYYY-MM-DD');
            }

            let responseData = [];
            let responseDataEvent = [];

            let position = 0;
            let responseResult = 'MORE';

            const requestPromise = util.promisify(requestCheck);
            /* Fetch user data from machine. */
            while (responseResult == 'MORE') {

                var options = {
                    'method': 'POST',
                    'url': mastermachineUrl + '/ISAPI/AccessControl/UserInfo/search?format=json',
                    'headers': {},
                    body: {
                        "UserInfoSearchCond": {
                            "searchID": "0",
                            "searchResultPosition": position,
                            "maxResults": 30
                        }
                    },
                    json: true,
                    auth: {
                        user: mastermachineUser,
                        pass: mastermachinePassword,
                        sendImmediately: false
                    }
                };

                const response = await requestPromise(options);

                responseResult = response.body.UserInfoSearch.responseStatusStrg;

                if (responseResult == 'MORE')
                    position += 30;

                let dataValue = [];

                if (responseResult != 'NO MATCH')
                    dataValue = response.body.UserInfoSearch.UserInfo;

                if (dataValue.length > 0)
                    for (let i = 0; i < dataValue.length; i++)
                        responseData.push(dataValue[i].employeeNo);
            }
            /* Fetch attendance data from machine base on user data */
            if (responseData.length > 0) {
                for (let i = 0; i < responseData.length; i++) {

                    let enrollNo = responseData[i].toString();

                    let positionEvent = 0;
                    let responseResultEvent = 'MORE';

                    let startDate = moment(currentDate + ' 00:00:00').format();
                    let endDate = moment(currentDate + ' 23:59:00').format();

                    while (responseResultEvent == 'MORE') {
                        var optionsEvents = {
                            'method': 'POST',
                            'url': mastermachineUrl + '/ISAPI/AccessControl/AcsEvent?format=json',
                            'headers': {},
                            body: {
                                "AcsEventCond": {
                                    "searchId": "1",
                                    "searchResultPosition": positionEvent,
                                    "maxResults": 30,
                                    "employeeNoString": enrollNo,
                                    "startTime": startDate,
                                    "endTime": endDate,
                                    "major": 0,
                                    "minor": 0
                                }
                            },
                            json: true,
                            auth: {
                                user: mastermachineUser,
                                pass: mastermachinePassword,
                                sendImmediately: false
                            }
                        };

                        const response = await requestPromise(optionsEvents);

                        if (response.body.AcsEvent.responseStatusStrg != 'NO MATCH') {

                            responseResultEvent = response.body.AcsEvent.responseStatusStrg;

                            let EventData = response.body.AcsEvent.InfoList;

                            if (responseResultEvent == 'MORE')
                                positionEvent += 30;

                            if (EventData.length > 0)
                                for (let i = 0; i < EventData.length; i++)
                                    responseDataEvent.push({
                                        employeeNoString: EventData[i].employeeNoString,
                                        name: EventData[i].name,
                                        time: EventData[i].time
                                    });
                        } else {
                            positionEvent = 0;
                            responseResultEvent = 'OK';
                        }
                    }
                }
            }
            /* Filter attendance data */
            let masterFilterData = responseDataEvent;
            let jsonObject = masterFilterData.map(JSON.stringify);
            let uniqueSet = new Set(jsonObject);
            let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
            /* Post attendance data to server */
            if (uniqueArray.length > 0) {

                request.body.currentDate = currentDate;
                request.body.serialNumber = serialNumber.toString();
                request.body.DeviceData = JSON.stringify(uniqueArray);

                let insertResult = await _employeeattendance.dbInsertToCloud(request);

                return {
                    status: true,
                    data: insertResult,
                    processDate: currentDate
                };

            } else {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }
    }
};