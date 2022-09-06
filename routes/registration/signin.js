/* package */
let express = require('express');
let router = express.Router();
/* common */
const dbSecurity = require("../../docs/config/dbSecurity");
const dbCommon = require("../../docs/config/dbCommon");
const clientResponse = require("../../docs/config/dbResponse");
const dbEmailTemp = require("../../docs/config/dbEmailTemp");
const dbEmailSetup = require("../../docs/config/dbEmailSetup");
/* class */
const _clssignup = require("../../docs/modules/model_registration/clssignup");
const _clsemployer = require("../../docs/modules/model_employer/clsemployer");
const _clsmember = require("../../docs/modules/model_member/clsmember");
const _clsemployee = require("../../docs/modules/model_employee/clsemployee");
const _clsemployeruserright = require("../../docs/modules/model_employer/clsemployeruserright");
const _clscompanysetting = require("../../docs/modules/model_employer/clscompanysetting");
/* component */
const _signup = require("../../docs/components/component_registration/signup");

router.post('/apiSignRegistration/', async function (request, response) {
    try {

        let strResult = await _signup.dbInsert(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false) return clientResponse.errorData([], response, strQuery.message);

        let strCount = strResult.count[0].cnt;
        if (strCount > 0)
            return clientResponse.existData([], response, "");

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {

                let str_registrationTemp = dbEmailTemp.temp_registration(request.body.email, request.body.accessCode);
                dbEmailSetup.sendEmail(request.body.email, 'Izem System - Registration', str_registrationTemp);

                clientResponse.insertData(result, response, "");
            }
        });

    } catch (error) {
        dbCommon.log_file('SignIn, apiSignRegistration : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSignAccessCode/', async function (request, response) {
    try {

        let email = request.body.email;
        let accessCode = request.body.accessCode;

        let strData = _clssignup.data.select(" and email = '" + email + "' AND accessCode = '" + accessCode + "' ");
        let [strDataResult, _strDataResult] = await dbSecurity.asyncResult(strData);

        if (strDataResult.length > 0) {
            let strUpdate = `update tblsignup set isAccessCode = true where 1=1 and email = '` + email + `'`;
            let [strUpdateResult, _strUpdateResult] = await dbSecurity.asyncResult(strUpdate);

            clientResponse.sendAll([], response, 'Email Verified!');
        } else {
            return clientResponse.emptyData([], response, "Verification failed!");
        }

    } catch (error) {
        dbCommon.log_file('SignIn, apiSignAccessCode : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiVerificationService/', dbSecurity.authorization, function (request, response) {
    try {

        if (request.isVerify == true)
            return clientResponse.Verification([{
                status: true
            }], response, 'You are Verified!');
        else
            return clientResponse.Verification([{
                status: false
            }], response, 'You are not Verified!');

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSignInBackoffice/', function (request, response) {
    try {
        let strwhere = '';
        let userName = request.body.userName || '';
        let password = request.body.password || '';

        if (userName === "")
            return clientResponse.emptyData([], response, "UserName is required!");

        if (password === "")
            return clientResponse.emptyData([], response, "Password is required!");

        strwhere += " and email = '" + userName + "'";
        strwhere += " and role = 'SuperAdmin'";

        let strquery = _clssignup.data.signIn(strwhere);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strquery, async (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else {
                if (result.length === 0)
                    return clientResponse.emptyData(result, response, "No records found!");

                if (password != dbSecurity.decrypt(result[0].password))
                    return clientResponse.emptyData([], response, "Password is incorrect!");

                delete result[0].password;

                //! making token for verification
                let makeToken = JSON.stringify({
                    loginDate: new Date()
                });

                makeToken = dbSecurity.encrypt(makeToken);
                result[0].token = makeToken;

                clientResponse.sendData(result, response, "");
            }
        });
    } catch (error) {
        dbCommon.log_file('SignIn, apiSignInBackoffice : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSignInEmployer/', function (request, response) {
    try {
        let strwhere = '';
        let userName = request.body.userName || '';
        let password = request.body.password || '';

        if (userName === "")
            return clientResponse.emptyData([], response, "UserName is required!");

        if (password === "")
            return clientResponse.emptyData([], response, "Password is required!");

        strwhere += " and email = '" + userName + "'";
        strwhere += " and role = 'employer'";

        let strquery = _clssignup.data.signIn(strwhere);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strquery, async (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else {
                if (result.length === 0)
                    return clientResponse.emptyData(result, response, "No records found!");

                if (password != dbSecurity.decrypt(result[0].password))
                    return clientResponse.emptyData([], response, "Password is incorrect!");

                delete result[0].password;

                let strSelectEmployer = _clsemployer.data.select(" and signupId = " + result[0].signupId);
                let strSelectEmployerResult = await dbSecurity.asyncResult(strSelectEmployer);

                if (strSelectEmployerResult[0].length > 0) {
                    let _employerId = strSelectEmployerResult[0][0].employerId;
                    let _employerEmail = strSelectEmployerResult[0][0].employerEmail;
                    result[0].employerId = dbSecurity.encrypt(_employerId.toString());
                    result[0].employerEmail = _employerEmail;

                    let strSelectCompanySetting = _clscompanysetting.data.select(" and employerId  = " + _employerId);
                    let strSelectCompanySettingResult = await dbSecurity.asyncResult(strSelectCompanySetting);

                    if (strSelectCompanySettingResult[0].length > 0) {
                        result[0].companyName = strSelectCompanySettingResult[0][0].companyName;
                        result[0].address = strSelectCompanySettingResult[0][0].companyAddress;
                        result[0].companyContact = strSelectCompanySettingResult[0][0].companyContactEmail;
                    }
                } else {
                    result[0].employerId = 0;
                    result[0].companyName = 'In-Active';
                    result[0].address = '';
                    result[0].companyContact = '';
                }

                //! making token for verification
                let makeToken = JSON.stringify({
                    loginDate: new Date()
                });

                makeToken = dbSecurity.encrypt(makeToken);
                result[0].token = makeToken;

                clientResponse.sendData(result, response, "");
            }
        });
    } catch (error) {
        dbCommon.log_file('SignIn, apiSignInEmployer : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSignInEmployee/', function (request, response) {
    try {
        let strwhere = '';
        let userName = request.body.userName || '';
        let password = request.body.password || '';

        if (userName === "")
            return clientResponse.emptyData([], response, "UserName is required!");

        if (password === "")
            return clientResponse.emptyData([], response, "Password is required!");

        strwhere += " and email = '" + userName + "'";
        strwhere += " and role = 'member'";

        let strquery = _clssignup.data.signIn(strwhere);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strquery, async (err, result, fields) => {
            dbConnect.end();
            if (err) clientResponse.errorData(err, response);
            else {
                if (result.length === 0)
                    return clientResponse.emptyData(result, response, "No records found!");

                if (password != dbSecurity.decrypt(result[0].password))
                    return clientResponse.emptyData([], response, "Password is incorrect!");

                if (result[0].isAccessCode == false)
                    return clientResponse.existData1({
                        email: userName
                    }, response, "Verify your email!");

                delete result[0].password;

                let strSelectMember = _clsmember.data.select(" and signupId = " + result[0].signupId);
                let strSelectMemberResult = await dbSecurity.asyncResult(strSelectMember);

                if (strSelectMemberResult[0].length > 0) {
                    let _memberId = strSelectMemberResult[0][0].memberId;

                    let strSelectEmployee = _clsemployee.data.select_view_employee(" and memberId = " + _memberId);
                    let strSelectEmployeeResult = await dbSecurity.asyncResult(strSelectEmployee);
                    if (strSelectEmployeeResult.length > 0) {

                        let _employerId = strSelectEmployeeResult[0][0].employerId;
                        let _employeeId = strSelectEmployeeResult[0][0].employeeId;
                        let _employerEmail = strSelectEmployeeResult[0][0].employerEmail;
                        let _employerManagerId = strSelectEmployeeResult[0][0].employeeManagerId;
                        let _employeeType = strSelectEmployeeResult[0][0].employeeType;
                        let _employerbranchId = strSelectEmployeeResult[0][0].employerbranchId;

                        result[0].employerId = dbSecurity.encrypt(_employerId.toString());
                        result[0].employeeId = _employeeId;
                        result[0].memberId = _memberId;
                        result[0].employerEmail = _employerEmail;
                        result[0].employerManagerEmail = _employerManagerId;
                        result[0].employeeType = _employeeType;
                        result[0].employerbranchId = _employerbranchId;

                        let strSelectCompanySetting = _clscompanysetting.data.select(" and employerId  = " + _employerId);
                        let strSelectCompanySettingResult = await dbSecurity.asyncResult(strSelectCompanySetting);

                        if (strSelectCompanySettingResult[0].length > 0) {
                            result[0].companyName = strSelectCompanySettingResult[0][0].companyName;
                            result[0].address = strSelectCompanySettingResult[0][0].companyAddress;
                            result[0].companyContact = strSelectCompanySettingResult[0][0].companyContactEmail;
                        }

                        let strSelectEmployeeRights = _clsemployeruserright.data.select_employee_rights(" and employerId = " + _employerId + " and employeeId  = " + _employeeId);
                        let strSelectEmployeeRightsResult = await dbSecurity.asyncResult(strSelectEmployeeRights);

                        if (strSelectEmployeeRightsResult[0].length > 0) {
                            result[0].isEmployer = true;
                            result[0].userRights = strSelectEmployeeRightsResult[0];
                        } else {
                            result[0].isEmployer = false;
                            result[0].userRights = [];
                        }
                    }
                } else {
                    result[0].employerId = 0;
                    result[0].companyName = 'In-Active';
                    result[0].address = '';
                    result[0].companyContact = '';
                }

                //! making token for verification
                let makeToken = JSON.stringify({
                    loginDate: new Date()
                });

                makeToken = dbSecurity.encrypt(makeToken);
                result[0].token = makeToken;

                clientResponse.sendData(result, response, "");
            }
        });
    } catch (error) {
        dbCommon.log_file('SignIn, apiSignInEmployer : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiChangePassword/', async function (request, response) {
    try {

        let strResult = await _signup.dbChangePassword(request, response);
        let strFlag = strResult.flag;
        let strQuery = strResult.query;

        if (strFlag == false)
            return clientResponse.errorData([], response, strQuery.message);

        let dbConnect = dbSecurity.dbConnection();
        dbConnect.query(strQuery, (err, result, fields) => {
            dbConnect.end();
            if (err) {
                clientResponse.errorData(err, response);
            } else {
                clientResponse.updateData(result, response, "Signup, Record updated!");
            }
        });

    } catch (error) {
        dbCommon.log_file('Sign-Up, signup_apiUpdate : ' + error.message);
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiSendPasswordUrl/', async function (request, response) {
    try {

        let email = request.body.email;

        let strCount = _clssignup.data.getcount(" and email = '" + email + "'");
        let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

        if (strCountResult[0].cnt == 0)
            return clientResponse.emptyData([], response, '');

        let str_passwordResetTemp = dbEmailTemp.temp_passwordRequest(email);
        dbEmailSetup.sendEmail(email, "Izem System - Password Reset", str_passwordResetTemp);

        clientResponse.sendAll([], response, 'Email has been sent successfully, Please check your Email-Id!');

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

router.post('/apiResetPassword/', async function (request, response) {
    try {

        let email = request.body.email;
        let password = request.body.password;
        let encryptPassword = dbSecurity.encrypt(password);
        let decryptemail = dbSecurity.decrypt(email);

        let strCount = _clssignup.data.getcount(" and email = '" + decryptemail + "'");
        let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

        if (strCountResult[0].cnt == 0)
            return clientResponse.emptyData([], response, '');

        let strUpdate = `update tblsignup set password = '` + encryptPassword + `' where 1=1 and email = '` + decryptemail + `'`;
        let [strUpdateResult, _strUpdateResult] = await dbSecurity.asyncResult(strUpdate);

        clientResponse.sendAll([], response, 'Confirm Password, Password Updated!');

    } catch (error) {
        clientResponse.emptyData([], response, error.message);
    }
});

module.exports = router;