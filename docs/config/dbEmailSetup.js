require('dotenv').config();
var nodemailer = require('nodemailer');

const self = module.exports = {

    sendEmail: (toEmail, subject, text) => {

        let from = `Payroll/HR Admin <izemmalaysia@gmail.com>`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "izemmalaysia@gmail.com",
                pass: "xtlyrbjtibcpiigm"
            }
        });

        var mailOptions = {
            from: from,
            to: toEmail,
            subject: subject,
            html: text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return 'fail';
            } else {
                return 'success';
            }
        });
    }
};