/* common */
const dbSecurity = require("../../config/dbSecurity");
/* class */
const _clsmastersocso = require("../../modules/model_backoffice/clsmastersocso");
const _clsmastersocsolist = require("../../modules/model_backoffice/clsmastersocsolist");

let self = module.exports = {

    dbSelection: (request, response) => {
        try {

            let strwhere = "";
            let mastersocsoIsActive = request.body.mastersocsoIsActive || true;

            strwhere += " and mastersocsoIsActive = " + mastersocsoIsActive;

            let strquery = _clsmastersocso.data.select(strwhere);
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

    dbSelect: (request, response) => {
        try {

            let strwhere = "";
            let mastersocsoId = request.body.mastersocsoId;

            strwhere += " and mastersocsoId = " + mastersocsoId;

            let strquery = _clsmastersocso.data.select(strwhere);
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

    dbSelectAll: (request, response) => {
        try {

            let SearchMastersocsoIsActive = request.body.SearchMastersocsoIsActive || true;
            let SearchMasterSOCSOTitle = request.body.SearchMasterSOCSOTitle || '';

            let strwhere = "";
            let strlimit = "";

            let pageIndex = request.body.pageIndex;
            let pageSize = request.body.pageSize;

            if (pageSize != "all")
                strlimit = "limit " + ((pageIndex - 1) * pageSize) + "," + pageSize;

            if (SearchMasterSOCSOTitle != '')
                strwhere += " and mastersocsoTitle like '%" + SearchMasterSOCSOTitle + "%'";
            strwhere += " and mastersocsoIsActive = " + SearchMastersocsoIsActive;

            strwhere += " order by mastersocsoId desc ";

            let strquery = _clsmastersocso.data.select(strwhere + strlimit);
            let strcount = _clsmastersocso.data.getcount(strwhere);

            return {
                'flag': true,
                'query': strquery + ";" + strcount
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbDelete: async (request, response) => {
        try {

            let mastersocsoId = request.body.mastersocsoId;

            let strquery = _clsmastersocso.data.delete(mastersocsoId);
            let strquerylist = _clsmastersocsolist.data.deleteString(" and mastersocsoId = " + mastersocsoId);

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
                'query': error
            };
        }
    },

    dbInsert: async (request, response) => {
        try {

            let strwhere = "";
            let verb = _clsmastersocso.data.masterData(request);
            let strquery = _clsmastersocso.data.insert(verb);

            strwhere += " and mastersocsoId != 0 ";
            strwhere += " and mastersocsoCode = '" + verb.mastersocsoCode + "' and mastersocsoTitle = '" + verb.mastersocsoTitle + "'";

            let strCount = _clsmastersocso.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbUpdate: async (request, response) => {
        try {

            let strwhere = "";
            let verb = _clsmastersocso.data.masterData(request);
            let strquery = _clsmastersocso.data.update(verb);

            strwhere += " and mastersocsoId != " + verb.mastersocsoId;
            strwhere += " and mastersocsoCode = '" + verb.mastersocsoCode + "' and mastersocsoTitle = '" + verb.mastersocsoTitle + "'";

            let strCount = _clsmastersocso.data.getcount(strwhere);
            let [strCountResult, _strCountResult] = await dbSecurity.asyncResult(strCount);

            return {
                'flag': true,
                'count': strCountResult,
                'query': strquery
            };

        } catch (error) {
            return {
                'flag': false,
                'query': error
            };
        }
    },

    dbUploadExcelFile: async (request, response) => {
        try {

            let strQueryString = request.body.strQueryString;
            let mastersocsoId = request.body.mastersocsoId;

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

                let strRemoveEPF = _clsmastersocsolist.data.deleteString(" and mastersocsoId = " + mastersocsoId);
                const [strRemoveEPFResult, _strRemoveEPFResult] = await connection.query(strRemoveEPF);

                let strInsert = _clsmastersocsolist.data.insertString();

                let EPFDetailData = JSON.parse(strQueryString);
                if (EPFDetailData.length > 0) {
                    for (let i = 0; i < EPFDetailData.length; i++) {
                        if (i != 0)
                            strInsert += ",";
                        strInsert += "(" + mastersocsoId +
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