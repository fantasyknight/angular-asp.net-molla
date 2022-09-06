require('dotenv').config();
const dbSecurity = require("../../docs/config/dbSecurity");

const self = module.exports = {

    temp_registration: (email, code) => {
        try {

            let template = `<html>
            <head></head>
            <body style="margin: 0; padding: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
            <td align="center" bgcolor="#f05b2e" style="padding: 40px 0 30px 0;">
              <h1 width="300" height="230" style="display: block; color: white;">
                Izem-Notification
              </h1>
            </td>
            </tr>
            <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Registration</h1>
                </td>
            </tr>
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                    <p style="margin: 0;">
                    Hello, ` + email + ` <br />
                    <br />
                    <br />
                    You are successfully registered as employer with the Izem system.
                    <br />
                    <br />
                    Please use this code for the verification : ` + code + `.
                    <br />
                    <br />
                    Once you're login into your i-zem account, you have to submit your profile for verification!
                    </p>
                </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body></html>`;

            return template;

        } catch (error) {
            console.log(error);
        }
    },

    temp_registration_employee: (email, code) => {
        try {

            let template = `<html>
            <head></head>
            <body style="margin: 0; padding: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
            <td align="center" bgcolor="#f05b2e" style="padding: 40px 0 30px 0;">
              <h1 width="300" height="230" style="display: block; color: white;">
                Izem-Notification
              </h1>
            </td>
            </tr>
            <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Registration</h1>
                </td>
            </tr>
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                    <p style="margin: 0;">
                    Hello, ` + email + ` <br />
                    <br />
                    <br />
                    You are successfully registered as employee with the Izem system.
                    <br />
                    <br />
                    Please use this code for the verification : ` + code + `.
                    </p>
                </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body></html>`;

            return template;

        } catch (error) {
            console.log(error);
        }
    },

    temp_verificationRequest: (email) => {
        try {

            let template = `<html>
            <head></head>
            <body style="margin: 0; padding: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
            <td align="center" bgcolor="#f05b2e" style="padding: 40px 0 30px 0;">
              <h1 width="300" height="230" style="display: block; color: white;">
                Izem-Notification
              </h1>
            </td>
            </tr>
            <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Verification Request</h1>
                </td>
            </tr>
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                    <p style="margin: 0;">
                    Hello, ` + email + ` <br />
                    <br />
                    Your verification request is successfully sent to the Izem system!
                    </p>
                </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body></html>`;

            return template;

        } catch (error) {
            console.log(error);
        }
    },

    temp_verificationResponse: (email) => {
        try {

            let template = `<html>
            <head></head>
            <body style="margin: 0; padding: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
            <td align="center" bgcolor="#f05b2e" style="padding: 40px 0 30px 0;">
              <h1 width="300" height="230" style="display: block; color: white;">
                Izem-Notification
              </h1>
            </td>
            </tr>
            <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Account Verified</h1>
                </td>
            </tr>
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                    <p style="margin: 0;">
                    Congratulations, ` + email + ` 🎉 <br />
                    <br />
                    Your profile with Izem is successfully verified. 
                    <br /><br />
                    Please login to your account using your registered Email and Password. We also update some default settings into your account.
                    <br /><br />
                    If you find any difficulty, please let us know we will guide you.
                    </p>
                </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body></html>`;

            return template;

        } catch (error) {
            console.log(error);
        }
    },

    temp_passwordRequest: (email) => {
        try {

            let encryptEmail = dbSecurity.encrypt(email.toString());
            let time = dbSecurity.encrypt(new Date().toString());
            let urlLink = process.env.serverPath + '/forgot-password?type=' + encryptEmail + '&verified=' + time;

            let template = `<html>
            <head></head>
            <body style="margin: 0; padding: 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
            <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
            <td align="center" bgcolor="#f05b2e" style="padding: 40px 0 30px 0;">
              <h1 width="300" height="230" style="display: block; color: white;">
                Izem-Notification
              </h1>
            </td>
            </tr>
            <tr>
            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif;">
                    <h1 style="font-size: 24px; margin: 0;">Password Request</h1>
                </td>
            </tr>
            <tr>
                <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                    <p style="margin: 0;">
                    Change your password, ` + email + ` <br />
                    <br />
                    We have received a password change request for your Izem account.
                    <br /><br />
                    If you did not ask to change your password, then you can ignore this email and your password will not be changed.
                    The link below will remain active for hours.
                    <br /><br />
                    <a href="` + urlLink + `" target="_blank"
                        style="background-color: #f44336; color: white; padding: 5px 15px; text-align: center; text-decoration: none; display: inline-block;">Reset
                        Password</a>
                    </p>
                </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body></html>`;

            return template;

        } catch (error) {
            console.log(error);
        }
    }
};