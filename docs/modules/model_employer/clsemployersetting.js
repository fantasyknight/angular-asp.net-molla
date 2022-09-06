var method = {};

method.masterData = (request) => {
    let employersettingId = request.body.employersettingId || 0;
    let employerId = request.body.employerId || 0;
    let employersettingClinicSubmissionDatetime = request.body.employersettingClinicSubmissionDatetime || 0;
    let employersettingAutoApproveClaimLimit = request.body.employersettingAutoApproveClaimLimit || 0;
    let employersettingTotalClaimsLimit = request.body.employersettingTotalClaimsLimit || 0;
    let employersettingConsultationLimit = request.body.employersettingConsultationLimit || 0;
    let employersettingMedicationLimit = request.body.employersettingMedicationLimit || 0;
    let employersettingTreatementLimit = request.body.employersettingTreatementLimit || 0;
    let employersettingMedicalLeaveLimit = request.body.employersettingMedicalLeaveLimit || 0;
    let employersettingMedicationPrescribedLimit = request.body.employersettingMedicationPrescribedLimit || 0;
    let employersettingAllowClaimSubmittedAnnualLimit = request.body.employersettingAllowClaimSubmittedAnnualLimit || false;
    let employersettingAllowClaimSubmittedPerVisitLimit = request.body.employersettingAllowClaimSubmittedPerVisitLimit || false;
    let employersettingAllowClaimSubmittedToExceedAnnualVisitLimit = request.body.employersettingAllowClaimSubmittedToExceedAnnualVisitLimit || false;
    return {
        employersettingId,
        employerId,
        employersettingClinicSubmissionDatetime,
        employersettingAutoApproveClaimLimit,
        employersettingTotalClaimsLimit,
        employersettingConsultationLimit,
        employersettingMedicationLimit,
        employersettingTreatementLimit,
        employersettingMedicalLeaveLimit,
        employersettingMedicationPrescribedLimit,
        employersettingAllowClaimSubmittedAnnualLimit,
        employersettingAllowClaimSubmittedPerVisitLimit,
        employersettingAllowClaimSubmittedToExceedAnnualVisitLimit
    };
};

method.select = function (strwhere) {
    var strquery = "select * from tblemployersetting where 1 = 1 " + strwhere;
    return strquery;
};

method.selectall = function (strwhere) {
    var strquery = "select employersettingId,employerId,employersettingClinicSubmissionDatetime,employersettingAutoApproveClaimLimit,employersettingTotalClaimsLimit,employersettingConsultationLimit,employersettingMedicationLimit,employersettingTreatementLimit,employersettingMedicalLeaveLimit,employersettingMedicationPrescribedLimit,employersettingAllowClaimSubmittedAnnualLimit,employersettingAllowClaimSubmittedPerVisitLimit,employersettingAllowClaimSubmittedToExceedAnnualVisitLimit from tblemployersetting where 1 = 1 " + strwhere;
    return strquery;
};

method.selectcolumn = function (strcolumn, strwhere) {
    var strquery = "select " + strcolumn + " from tblemployersetting where 1 = 1 " + strwhere;
    return strquery;
};

method.getcount = function (strwhere) {
    var strquery = "select count(*) as cnt from  tblemployersetting where 1=1 " + strwhere;
    return strquery;
};

method.delete = function (strwhere) {
    var strquery = "delete from tblemployersetting where 1 = 1 and employersettingId = " + strwhere;
    return strquery;
};

method.deleteString = function (strwhere) {
    var strquery = "delete from tblemployersetting where 1 = 1 " + strwhere;
    return strquery;
};

method.insert = function (pera) {
    var strquery = "insert into tblemployersetting (employerId, employersettingClinicSubmissionDatetime, employersettingAutoApproveClaimLimit, employersettingTotalClaimsLimit, employersettingConsultationLimit, employersettingMedicationLimit, employersettingTreatementLimit, employersettingMedicalLeaveLimit, employersettingMedicationPrescribedLimit, employersettingAllowClaimSubmittedAnnualLimit, employersettingAllowClaimSubmittedPerVisitLimit, employersettingAllowClaimSubmittedToExceedAnnualVisitLimit) values ('" + pera.employerId + "', '" + pera.employersettingClinicSubmissionDatetime + "', '" + pera.employersettingAutoApproveClaimLimit + "', '" + pera.employersettingTotalClaimsLimit + "', '" + pera.employersettingConsultationLimit + "', '" + pera.employersettingMedicationLimit + "', '" + pera.employersettingTreatementLimit + "', '" + pera.employersettingMedicalLeaveLimit + "', '" + pera.employersettingMedicationPrescribedLimit + "', " + pera.employersettingAllowClaimSubmittedAnnualLimit + ", " + pera.employersettingAllowClaimSubmittedPerVisitLimit + ", " + pera.employersettingAllowClaimSubmittedToExceedAnnualVisitLimit + ")";
    return strquery;
};

method.insertString = function () {
    var strquery = "insert into tblemployersetting (employerId, employersettingClinicSubmissionDatetime, employersettingAutoApproveClaimLimit, employersettingTotalClaimsLimit, employersettingConsultationLimit, employersettingMedicationLimit, employersettingTreatementLimit, employersettingMedicalLeaveLimit, employersettingMedicationPrescribedLimit, employersettingAllowClaimSubmittedAnnualLimit, employersettingAllowClaimSubmittedPerVisitLimit, employersettingAllowClaimSubmittedToExceedAnnualVisitLimit) values ";
    return strquery;
};

method.update = function (pera) {
    var strquery = "update tblemployersetting set employerId = '" + pera.employerId + "', employersettingClinicSubmissionDatetime = '" + pera.employersettingClinicSubmissionDatetime + "', employersettingAutoApproveClaimLimit = '" + pera.employersettingAutoApproveClaimLimit + "', employersettingTotalClaimsLimit = '" + pera.employersettingTotalClaimsLimit + "', employersettingConsultationLimit = '" + pera.employersettingConsultationLimit + "', employersettingMedicationLimit = '" + pera.employersettingMedicationLimit + "', employersettingTreatementLimit = '" + pera.employersettingTreatementLimit + "', employersettingMedicalLeaveLimit = '" + pera.employersettingMedicalLeaveLimit + "', employersettingMedicationPrescribedLimit = '" + pera.employersettingMedicationPrescribedLimit + "', employersettingAllowClaimSubmittedAnnualLimit = " + pera.employersettingAllowClaimSubmittedAnnualLimit + ", employersettingAllowClaimSubmittedPerVisitLimit = " + pera.employersettingAllowClaimSubmittedPerVisitLimit + ", employersettingAllowClaimSubmittedToExceedAnnualVisitLimit = " + pera.employersettingAllowClaimSubmittedToExceedAnnualVisitLimit + " where employersettingId = '" + pera.employersettingId + "' ";
    return strquery;
};

method.updateColumn = function (column, id) {
    var strquery = "update tblemployersetting set " + column + " where employersettingId = " + id + " ";
    return strquery;
};

exports.data = method;