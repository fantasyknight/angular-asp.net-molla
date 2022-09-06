/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmasteresi = require("../../modules/model_backoffice/clsmasteresi");
const _clsmasteresilist = require("../../modules/model_backoffice/clsmasteresilist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let masteresiIsActive = request.body.masteresiIsActive || true;

            strwhere += " and masteresiIsActive = " + masteresiIsActive;

            let strquery = _clsmasteresi.data.select(strwhere);
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
            let masteresiId = request.body.masteresiId;

            strwhere += " and masteresiId = " + masteresiId;

            let strquery = _clsmasteresi.data.select(strwhere);
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

            let SearchMasteresiIsActive = request.body.SearchMasteresiIsActive || true;
            let SearchMasterESITitle = request.body.SearchMasterESITitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterESITitle != '')
                strwhere += " and masteresiTitle like '%" + SearchMasterESITitle + "%'";
            strwhere += " and masteresiIsActive = " + SearchMasteresiIsActive;

            strwhere += " order by masteresiId desc ";

            let strquery = _clsmasteresi.data.select(strwhere + strlimit);
            let strcount = _clsmasteresi.data.getcount(strwhere);

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

            let masteresiId = request.body.masteresiId;

            let strquery = _clsmasteresi.data.delete(masteresiId);
            let strquerylist = _clsmasteresilist.data.deleteString(" and masteresiId = " + masteresiId);

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
            let verb = _clsmasteresi.data.masterData(request);
            let strquery = _clsmasteresi.data.insert(verb);

            strwhere += " and masteresiId != 0 ";
            strwhere += " and masteresiCode = '" + verb.masteresiCode + "' and masteresiTitle = '" + verb.masteresiTitle + "'";

            let strCount = _clsmasteresi.data.getcount(strwhere);
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
            let verb = _clsmasteresi.data.masterData(request);
            let strquery = _clsmasteresi.data.update(verb);

            strwhere += " and masteresiId != " + verb.masteresiId;
            strwhere += " and masteresiCode = '" + verb.masteresiCode + "' and masteresiTitle = '" + verb.masteresiTitle + "'";

            let strCount = _clsmasteresi.data.getcount(strwhere);
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
            let masteresiId = request.body.masteresiId;

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

                let strRemoveEPF = _clsmasteresilist.data.deleteString(" and masteresiId = " + masteresiId);
                const [strRemoveEPFResult, _strRemoveEPFResult] = await connection.query(strRemoveEPF);

                let strInsert = _clsmasteresilist.data.insertString();

                let EPFDetailData = JSON.parse(strQueryString);
                if (EPFDetailData.length > 0) {
                    for (let i = 0; i < EPFDetailData.length; i++) {
                        if (i != 0)
                            strInsert += ",";
                        strInsert += "(" + masteresiId +
                            "," + EPFDetailData[i].RangeFrom +
                            "," + EPFDetailData[i].RangeTo +
                            "," + EPFDetailData[i].EmployerContribution +
                            "," + EPFDetailData[i].EmployeeContribution +
                            "," + EPFDetailData[i].TotalContribution +
                            "," + EPFDetailData[i].EmployerContribution1 +
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