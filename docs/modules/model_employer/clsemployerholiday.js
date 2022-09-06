var method = {};

method.masterData = (request) => {
    let employerHolidayId = request.body.employerHolidayId || 0;
    let employerId = request.body.employerId || 0;
    let holidayTitle = request.body.holidayTitle || '';
    let holidayDate = request.body.holidayDate || null;
    let holidayDescription = request.body.holidayDescription || '';
    let holidayOTTag = request.body.holidayOTTag || 0;
    let holidayAddPayTag = request.body.holidayAddPayTag || 0;
    let holidayShiftTag = request.body.holidayShiftTag || 0;
    let createdBy = request.body.createdBy || 0;
    let createdDate = request.body.createdDate || null;
    return {
        employerHolidayId,
        employerId,
        holidayTitle,
        holidayDate,
        holidayDescription,
        holidayOTTag,
        holidayAddPayTag,
        holidayShiftTag,
        createdBy,
        createdDate
    };
};

method.select = function (strwhere) {
    var strquery = `select *, 
                    DATE_FORMAT(holidayDate,'%d-%m-%Y') AS holidayDateDDMMYYYY, 
                    DATE_FORMAT(holidayDate,'%Y-%m-%d') AS holidayDateYYYYMMDD
                    from tblemployerholiday where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = `select employerHolidayId, employerId, holidayTitle, holidayDate, holidayDescription, holidayOTTag, holidayAddPayTag, holidayShiftTag, 
                    DATE_FORMAT(holidayDate,'%d-%m-%Y') AS holidayDateDDMMYYYY, 
                    DATE_FORMAT(holidayDate,'%Y-%m-%d') AS holidayDateYYYYMMDD,
                    createdBy,createdDate 
                    from tblemployerholiday where 1 = 1 ` + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployerholiday where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployerholiday where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployerholiday where 1 = 1 and employerHolidayId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployerholiday where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    if (pera.holidayDate == null) pera.holidayDate = null;
    else pera.holidayDate = "'" + pera.holidayDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "insert into tblemployerholiday (employerId, holidayTitle, holidayDate, holidayDescription, holidayOTTag, holidayAddPayTag, holidayShiftTag, createdBy, createdDate) values ('" + pera.employerId + "', '" + pera.holidayTitle + "', " + pera.holidayDate + ", '" + pera.holidayDescription + "', '" + pera.holidayOTTag + "', '" + pera.holidayAddPayTag + "', '" + pera.holidayShiftTag + "', '" + pera.createdBy + "', " + pera.createdDate + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployerholiday (employerId, holidayTitle, holidayDate, holidayDescription, holidayOTTag, holidayAddPayTag, holidayShiftTag, createdBy, createdDate) values ";
    return strquery;
};

method.update = function (pera) {
    if (pera.holidayDate == null) pera.holidayDate = null;
    else pera.holidayDate = "'" + pera.holidayDate + "'";

    if (pera.createdDate == null) pera.createdDate = null;
    else pera.createdDate = "'" + pera.createdDate + "'";

    var strquery = "update tblemployerholiday set employerId = '" + pera.employerId + "', holidayTitle = '" + pera.holidayTitle + "', holidayDate = " + pera.holidayDate + ", holidayDescription = '" + pera.holidayDescription + "', holidayOTTag = '" + pera.holidayOTTag + "', holidayAddPayTag = '" + pera.holidayAddPayTag + "', holidayShiftTag = '" + pera.holidayShiftTag + "', createdBy = '" + pera.createdBy + "', createdDate = " + pera.createdDate + " where employerHolidayId = '" + pera.employerHolidayId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployerholiday set " + column + " where employerHolidayId = " + id + " ";
    return strquery;
};

method.select_view_holiday = function (strwhere) {
    var strquery = `select * from view_holiday where 1 = 1 ` + strwhere;
    return strquery;
};

method.getcount_view_holiday = function (strwhere) {
    var strquery = "select count(*) as cnt from view_holiday where 1=1 " + strwhere;
    return strquery;
};

exports.data = method;