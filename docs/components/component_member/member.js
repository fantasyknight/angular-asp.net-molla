/* common */
const dbSecurity = require("../../config/dbSecurity");
/* components */
const _signup = require("../component_registration/signup");
/* class */
const _clsmember = require("../../modules/model_member/clsmember");


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

            let strquery = _clsmember.data.select("");
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
            let memberId = request.body.memberId;

            strwhere += " and memberId = " + memberId;

            let strquery = _clsmember.data.select(strwhere);
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

            let searchMemberName = request.body.searchbymember || '';
            let searchMemberPassport = request.body.searchbypassport || '';
            let searchMemberNric = request.body.searchbynric || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (searchMemberName != "")
                strwhere += " and memberName like '%" + searchMemberName + "%' ";
            if (searchMemberPassport != "")
                strwhere += " and memberPassport like '%" + searchMemberPassport + "%' ";
            if (searchMemberNric != "")
                strwhere += " and memberNric like '%" + searchMemberNric + "%' ";
            strwhere += " order by memberId desc ";

            let strquery = _clsmember.data.select(strwhere + strlimit);
            let strcount = _clsmember.data.getcount(strwhere);

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

            let strwhere = "";
            let memberId = request.body.memberId;

            strwhere += " and memberId = " + memberId;

            let strquery = _clsmember.data.deleteString(strwhere);
            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let verb = _clsmember.data.masterData(request);
            let strquery = _clsmember.data.insert(verb);

            if (verb.memberNric != '') {
                let strCount = _clsmember.data.getcount(" and memberId != 0 and memberNric = '" + verb.memberNric + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);
                if (strCountResult[0].cnt != 0)
                    return {
                        'flag': true,
                        'count': strCountResult,
                        'query': "Member NRIC number is already registerd!"
                    };
            }

            if (verb.memberPassport != '') {
                let strCount = _clsmember.data.getcount(" and memberId != 0 and memberPassport = '" + verb.memberPassport + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);
                if (strCountResult[0].cnt != 0)
                    return {
                        'flag': true,
                        'count': strCountResult,
                        'query': "Member Passport number is already registerd!"
                    };
            }

            if (verb.memberEmail != '') {
                let strCount = _clsmember.data.getcount(" and memberId != 0 and memberEmail = '" + verb.memberEmail + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);
                if (strCountResult[0].cnt != 0)
                    return {
                        'flag': true,
                        'count': strCountResult,
                        'query': "Member Email-Id is already registerd!"
                    };
            }

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let verb = _clsmember.data.masterData(request);
            let strquery = _clsmember.data.update(verb);

            if (verb.memberNric != '') {
                let strCount = _clsmember.data.getcount(" and memberId != " + verb.memberId + " and memberNric = '" + verb.memberNric + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);
                if (strCountResult[0].cnt != 0)
                    return {
                        'flag': true,
                        'count': strCountResult,
                        'query': "Member NRIC number is already registerd!"
                    };
            }

            if (verb.memberPassport != '') {
                let strCount = _clsmember.data.getcount(" and memberId != " + verb.memberId + " and memberPassport = '" + verb.memberPassport + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);
                if (strCountResult[0].cnt != 0)
                    return {
                        'flag': true,
                        'count': strCountResult,
                        'query': "Member Passport number is already registerd!"
                    };
            }

            if (verb.memberEmail != '') {
                let strCount = _clsmember.data.getcount(" and memberId != " + verb.memberId + " and memberEmail = '" + verb.memberEmail + "' ");
                let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);
                if (strCountResult[0].cnt != 0)
                    return {
                        'flag': true,
                        'count': strCountResult,
                        'query': "Member Email-Id is already registerd!"
                    };
            }

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbSelectAll_Search: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            let searchMemberName = request.body.searchbymember || '';
            let searchMemberPassport = request.body.searchbypassport || '';
            let searchMemberNric = request.body.searchbynric || '';

            if (searchMemberName != "")
                strwhere += " and memberName like '%" + searchMemberName + "%' ";
            if (searchMemberPassport != "")
                strwhere += " and memberPassport like '%" + searchMemberPassport + "%' ";
            if (searchMemberNric != "")
                strwhere += " and memberNric like '%" + searchMemberNric + "%' ";

            let strquery = _clsmember.data.select_SearchWithFlag(employerId, strwhere);

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

    dbSignInAccount: async (request, response) => {
        try {

            let memberId = request.body.memberId;

            let strResult = await _signup.dbInsert(request, response);
            let strFlag = strResult.flag;
            let strQuery = strResult.query;

            if (strFlag == false)
                return clientResponse.errorData([], response, strQuery.message);

            let strCount = strResult.count[0].cnt;
            if (strCount > 0) {
                return {
                    'flag': true,
                    'count': [{
                        cnt: 1
                    }],
                    'query': "Record already registerd!"
                };
            }

            let [strqueryResult, _strqueryResult] = await dbSecurity.asyncResult(strQuery);
            let signInInsertedId = strqueryResult.insertId;

            let updateEmployee = _clsmember.data.updateColumn(" signupId = " + signInInsertedId + " ", memberId);
            let [strupdateEmployeeResult, _strupdateEmployeeResult] = await dbSecurity.asyncResult(updateEmployee);

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': "Access provided!"
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    }
};