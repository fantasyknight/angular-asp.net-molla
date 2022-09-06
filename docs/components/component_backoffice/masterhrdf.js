/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasterhrdf = require("../../modules/model_backoffice/clsmasterhrdf");
const _clsmasterhrdflist = require("../../modules/model_backoffice/clsmasterhrdflist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masterhrdfIsActive = request.body.masterhrdfIsActive || true;

            strwhere += " and masterhrdfIsActive = " + masterhrdfIsActive;

            let strquery = _clsmasterhrdf.data.select(strwhere);
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
            let masterhrdfId = request.body.masterhrdfId;

            strwhere += " and masterhrdfId = " + masterhrdfId;

            let strquery = _clsmasterhrdf.data.select(strwhere);
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

            let SearchMasterhrdfIsActive = request.body.SearchMasterhrdfIsActive || true;
            let SearchMasterhrdfTitle = request.body.SearchMasterhrdfTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterhrdfTitle != '')
                strwhere += " and masterhrdfTitle like '%" + SearchMasterhrdfTitle + "%'";
            strwhere += " and masterhrdfIsActive = " + SearchMasterhrdfIsActive;
            strwhere += " order by masterhrdfId desc ";

            let strquery = _clsmasterhrdf.data.select(strwhere + strlimit);
            let strcount = _clsmasterhrdf.data.getcount(strwhere);

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

            let masterhrdfId = request.body.masterhrdfId;

            let strquery = _clsmasterhrdf.data.delete(masterhrdfId);
            let strquerylist = _clsmasterhrdflist.data.deleteString(" and masterhrdfId = " + masterhrdfId);

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
            let verb = _clsmasterhrdf.data.masterData(request);
            let strquery = _clsmasterhrdf.data.insert(verb);

            strwhere += " and masterhrdfId != 0 ";
            strwhere += " and masterhrdfCode = '" + verb.masterhrdfCode + "' and masterhrdfTitle = '" + verb.masterhrdfTitle + "'";

            let strCount = _clsmasterhrdf.data.getcount(strwhere);
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
            let verb = _clsmasterhrdf.data.masterData(request);
            let strquery = _clsmasterhrdf.data.update(verb);

            strwhere += " and masterhrdfId != " + verb.masterhrdfId;
            strwhere += " and masterhrdfCode = '" + verb.masterhrdfCode + "' and masterhrdfTitle = '" + verb.masterhrdfTitle + "'";

            let strCount = _clsmasterhrdf.data.getcount(strwhere);
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
            let masterhrdfId = request.body.masterhrdfId;

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

                let strRemovehrdf = _clsmasterhrdflist.data.deleteString(" and masterhrdfId = " + masterhrdfId);
                const [strRemovehrdfResult, _strRemovehrdfResult] = await connection.query(strRemovehrdf);

                let strInsert = _clsmasterhrdflist.data.insertString();

                let hrdfDetailData = JSON.parse(strQueryString);
                if (hrdfDetailData.length > 0) {
                    for (let i = 0; i < hrdfDetailData.length; i++) {
                        if (i != 0)
                            strInsert += ",";
                        strInsert += "(" + masterhrdfId +
                            "," + hrdfDetailData[i].RangeFrom +
                            "," + hrdfDetailData[i].RangeTo +
                            "," + hrdfDetailData[i].Difference +
                            "," + hrdfDetailData[i].EmployeePercentage +
                            "," + hrdfDetailData[i].EmployerPercentage +
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