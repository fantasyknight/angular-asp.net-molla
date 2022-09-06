/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsemployee = require("../../modules/model_employee/clsemployee");
const _clscompanyauth = require("../../modules/model_backoffice/clscompanyauth");

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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);

            strwhere += " and employerId = " + employerId;
            strwhere += " order by memberName asc ";

            let strquery = _clsemployee.data.select_view_employee(strwhere);
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
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            let strquery = _clsemployee.data.select_view_employee(strwhere);
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

            let SearchEmployeeIsActive = request.body.SearchEmployeeIsActive || true;
            let SearchEmployerbranchId = request.body.SearchEmployerbranchId || "";
            let SearchEmployerdepartmentId = request.body.SearchEmployerdepartmentId || "";
            let SearchEmployeeId = request.body.SearchEmployeeId || "";
            let sortBy = request.body.sortBy || 'memberName';
            let pageName = request.body.pageName || 'normal';

            let strwhere = "";
            let strlimit = "";

            let employerId = self.fetchEmployerId(request);

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = " limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            strwhere += " and employerId = " + employerId;
            if (SearchEmployeeIsActive != 'all')
                strwhere += " and employeeIsActive = " + SearchEmployeeIsActive;
            if (SearchEmployerbranchId != "")
                strwhere += " and employerbranchId = " + SearchEmployerbranchId;
            if (SearchEmployerdepartmentId != "")
                strwhere += " and employerdepartmentId = " + SearchEmployerdepartmentId;
            if (SearchEmployeeId != "")
                strwhere += " and employeeId = " + SearchEmployeeId;
            if (pageName == 'normal')
                strwhere += " and employeeType NOT IN ('branch','system')";
            else
                strwhere += " and employeeType IN ('branch','system')";

            if (sortBy == 'employeeEnroll')
                strwhere += " order by employeeEnroll desc ";
            if (sortBy == 'memberName')
                strwhere += " order by memberName asc ";
            if (sortBy == 'employeeJoining')
                strwhere += " order by employeeJoining asc ";
            if (sortBy == 'employerdepartmentTitle')
                strwhere += " order by employerdepartmentTitle,memberName asc ";
            if (sortBy == 'employerbranchName')
                strwhere += " order by employerbranchName,memberName asc ";

            let strquery = _clsemployee.data.select_view_employee(strwhere + strlimit);
            let strcount = _clsemployee.data.getcount_view_employee(strwhere);

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
            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;

            strwhere += " and employerId = " + employerId;
            strwhere += " and employeeId = " + employeeId;

            let strquery = _clsemployee.data.delete(strwhere);

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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployee.data.masterData(request);
            let strquery = _clsemployee.data.insert(verb);

            strwhere += " and employeeId != 0";
            strwhere += " and memberId = " + verb.memberId;
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployee.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            //. Process to Enrollment
            if (strCountResult[0].cnt == 0) {

                let strQuery = _clsemployee.data.select(" and employerId = " + verb.employerId + " order by employeeId desc limit 1 ");
                let [strenrolldataResult, _strenrolldataResult] = await dbSecurity.asyncResult(strQuery);

                if (strenrolldataResult.length > 0) {
                    let enroll = strenrolldataResult[0].employeeEnroll;
                    let firstChar = enroll.slice(0, 5);
                    let otherChar = enroll.slice(5);
                    let checkChar = parseInt(otherChar) + 1;
                    let enrollNo = firstChar + '00000'.substr(String(checkChar).length) + checkChar;

                    request.body.employeeEnroll = enrollNo;
                } else {
                    let enrollPatt = _clscompanyauth.data.select(" and employerId =" + verb.employerId);
                    let [enrollPattResult, _enrollPattResult] = await dbSecurity.asyncResult(enrollPatt);

                    if (enrollPattResult.length > 0) {
                        request.body.employeeEnroll = enrollPattResult[0].enrollNoPattern;
                    } else {
                        request.body.employeeEnroll = 'U001E00001';
                    }
                }
            }

            verb = _clsemployee.data.masterData(request);
            strquery = _clsemployee.data.insert(verb);

            return {
                'flag': true,
                'count': strCountResult,
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

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            request.body.employerId = employerId;

            let verb = _clsemployee.data.masterData(request);
            let strquery = _clsemployee.data.update(verb);

            strwhere += " and employeeId != " + verb.employeeId;
            strwhere += " and memberId = " + verb.memberId;
            strwhere += " and employerId = " + verb.employerId;

            let strCount = _clsemployee.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdateEntitlement: (request, response) => {
        try {

            let verb = _clsemployee.data.masterData(request);
            let strColumn = " employeeLimitCategroy = " + verb.employeeLimitCategroy;
            strColumn += " ,employeeLimitEmployee = " + verb.employeeLimitEmployee;
            strColumn += " ,employeeLimitDependent = " + verb.employeeLimitDependent;
            strColumn += " ,employeeVisitLimitEmployee = " + verb.employeeVisitLimitEmployee;
            strColumn += " ,employeeVisitLimitDependent = " + verb.employeeVisitLimitDependent;
            strColumn += " ,employeeVisitAllowed = " + verb.employeeVisitAllowed;
            strColumn += " ,employeeVisitDuration = '" + verb.employeeVisitDuration + "'";
            strColumn += " ,employeeEntitlementRemarks = '" + verb.employeeEntitlementRemarks + "'";
            strColumn += " ,employeeIsCustomEntitled = " + verb.employeeIsCustomEntitled;

            let strquery = _clsemployee.data.updateColumn(strColumn, verb.employeeId);

            return {
                'flag': true,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbSelect_Count: (request, response) => {
        try {

            let strwhere = "";
            let employerId = self.fetchEmployerId(request);
            strwhere += " and employerId = " + employerId;

            let strActive = _clsemployee.data.getcount(strwhere + " and employeeIsActive = true ");
            let strInActive = _clsemployee.data.getcount(strwhere + " and employeeIsActive = false ");
            let strTotal = _clsemployee.data.getcount(strwhere);
            return {
                'flag': true,
                'query': strActive + " ; " + strInActive + " ; " + strTotal
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error.message
            };
        }
    },

    dbUpdateMultipleShift: async (request, response) => {
        try {

            let employerId = self.fetchEmployerId(request);
            let employeeId = request.body.employeeId;
            let isMultiShift = request.body.status;
            let employeeIsManualAttendance = request.body.employeeIsManualAttendance;

            let strquery = "update tblemployee set isMultiShift = " + isMultiShift + ",  employeeIsManualAttendance = " + employeeIsManualAttendance + " where 1=1 and employeeId = " + employeeId + " and employerId = " + employerId + " ";

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
    }

};