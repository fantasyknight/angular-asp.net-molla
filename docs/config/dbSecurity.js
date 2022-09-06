require('dotenv').config();
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const crypto = require("crypto");

const clientResponse = require("./dbResponse");

const privateKey = process.env.privateKey;

const self = module.exports = {

    encrypt: (text) => {
        var mykey = crypto.createCipher("aes-128-cbc", privateKey);
        var mystr = mykey.update(text, "utf8", "hex");
        mystr += mykey.final("hex");
        return mystr;
    },

    decrypt: (text) => {
        var mykey = crypto.createDecipher("aes-128-cbc", privateKey);
        var mystr = mykey.update(text, "hex", "utf8");
        mystr += mykey.final("utf8");
        return mystr;
    },

    dbConnection: () => {
        return mysql.createPool({
            host: process.env.db_host,
            user: process.env.db_User,
            database: process.env.db_Database,
            password: process.env.db_Password,
            multipleStatements: true
        });
    },

    asyncDbConnection: async () => {
        return await mysqlPromise.createPool({
            host: process.env.db_host,
            user: process.env.db_User,
            database: process.env.db_Database,
            password: process.env.db_Password,
            multipleStatements: true
        });
    },

    asyncResult: async (str) => {
        const pool = await self.asyncDbConnection();
        const connection = await pool.getConnection();
        try {
            let Data = await connection.query(str);
            return Data;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
            connection.destroy();
        }
    },

    authorization: (request, response, next) => {
        try {
            let authentication = request.header('Authorization');
            if (authentication === undefined || authentication === "")
                return clientResponse.Forbidden([], response, 'You are not allow to access this without Authentication key!');

            let authenticationJson = self.decrypt(authentication);
            authenticationJson = JSON.parse(authenticationJson);

            request.role = authenticationJson.role;
            request.userLoginId = authenticationJson.signupId;
            request.memberLoginId = authenticationJson.memberId;
            request.isVerify = authenticationJson.isVerify;
            request.clinicLoginId = 0;

            let oldDate = new Date(authenticationJson.loginDate);
            let newDate = new Date();
            var res = Math.abs(oldDate - newDate) / 1000;

            /* get days between two dates */
            var days = Math.floor(res / 86400);
            /* get hours between two dates */
            var hours = Math.floor(res / 3600) % 24;

            if (hours > 1)
                return clientResponse.Forbidden([], response, 'Authentication Expired, Please do login again!');

            next();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    _decryption: (x) => {
        try {

            let _decrypt = self.decrypt(x);

            return {
                encryption: true,
                decrypt: _decrypt
            };

        } catch (error) {
            return {
                encryption: false,
                message: 'Issue with encryption process!'
            };
        }
    }

};