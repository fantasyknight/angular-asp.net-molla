/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterepf = require("../../modules/model_backoffice/clsmasterepf");
const _clsmasterepflist = require("../../modules/model_backoffice/clsmasterepflist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterepfIsActive = request.body.masterepfIsActive || true;

            strwhere += " and masterepfIsActive = " + masterepfIsActive;

            let strquery = _clsmasterepf.data.select(strwhere);
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
            let masterepfId = request.body.masterepfId;

            strwhere += " and masterepfId = " + masterepfId;

            let strquery = _clsmasterepf.data.select(strwhere);
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

            let SearchMasterepfIsActive = request.body.SearchMasterepfIsActive || true;
            let SearchMasterEPFTitle = request.body.SearchMasterEPFTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterEPFTitle != '')
                strwhere += " and masterepfTitle like '%" + SearchMasterEPFTitle + "%'";
            strwhere += " and masterepfIsActive = " + SearchMasterepfIsActive;
            strwhere += " order by masterepfId desc ";

            let strquery = _clsmasterepf.data.select(strwhere + strlimit);
            let strcount = _clsmasterepf.data.getcount(strwhere);

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

            let masterepfId = request.body.masterepfId;

            let strquery = _clsmasterepf.data.delete(masterepfId);
            let strquerylist = _clsmasterepflist.data.deleteString(" and masterepfId = " + masterepfId);

            return {
                'flag': true,
                'count': [{
                    cnt: 0
                }],
                'query': strquery + ";" + strquerylist
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
            let verb = _clsmasterepf.data.masterData(request);
            let strquery = _clsmasterepf.data.insert(verb);

            strwhere += " and masterepfId != 0 ";
            strwhere += " and masterepfCode = '" + verb.masterepfCode + "' and masterepfTitle = '" + verb.masterepfTitle + "'";

            let strCount = _clsmasterepf.data.getcount(strwhere);
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

    dbUpdate: async (request, response) => {
        try {

            let strwhere = "";
            let verb = _clsmasterepf.data.masterData(request);
            let strquery = _clsmasterepf.data.update(verb);

            strwhere += " and masterepfId != " + verb.masterepfId;
            strwhere += " and masterepfCode = '" + verb.masterepfCode + "' and masterepfTitle = '" + verb.masterepfTitle + "'";

            let strCount = _clsmasterepf.data.getcount(strwhere);
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

    dbUploadExcelFile: async (request, response) => {
        try {

            let strQueryString = request.body.strQueryString;
            let masterepfId = request.body.masterepfId;

            if (strQueryString == '') {
                return {
                    'flag': false,
                    'query': "JSON is empty"
                };
            }

            const pool = await dbSecurity.asyncDbConnection();
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            try {

                let strRemoveEPF = _clsmasterepflist.data.deleteString(" and masterepfId = " + masterepfId);
                const [strRemoveEPFResult, _strRemoveEPFResult] = await connection.query(strRemoveEPF);

                let strInsert = _clsmasterepflist.data.insertString();

                let EPFDetailData = JSON.parse(strQueryString);
                if (EPFDetailData.length > 0) {
                    for (let i = 0; i < EPFDetailData.length; i++) {
                        if (i != 0)
                            strInsert += ",";
                        strInsert += "(" + masterepfId +
                            "," + EPFDetailData[i].RangeFrom +
                            "," + EPFDetailData[i].RangeTo +
                            "," + EPFDetailData[i].Difference +
                            "," + EPFDetailData[i].EmployeePercentage +
                            "," + EPFDetailData[i].EmployerPercentage +
                            ", true,0)";
                    }
                }

                const [strInsertResult, _strInsertResult] = await connection.query(strInsert);
                await connection.commit();
                connection.release();
                connection.destroy();

                return {
                    'flag': true,
                    'query': "Success"
                };

            } catch (error) {
                await connection.rollback();
                connection.release();
                connection.destroy();

                return {
                    'flag': false,
                    'query': error
                };
            }

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    }
};