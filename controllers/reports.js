const Report = require('../models/reports');
const User = require('../models/users');
var path = require('path');


//신고하기
exports.create = async function (req, id, res) {
    var userData = req.body;

    var report = new Report({
        userID: id,
        img: req.file.path,
        lat: userData.lat,
        lng: userData.lng,
        species: userData.species,
        cause : userData.cause,
        otherInfoByUser: userData.otherInfoByUser,
        status: userData.status,
        accidentTime: userData.accidentTime
    });

    await report.save(function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log("stored in DB");
        }
    });
};

// 본인이 한 신고 전체보기
exports.getReportsByUserID = function(id) {
    return Report.find({ userID: id }).sort('-createdAt').lean().exec();
};

// 신고 세부사항보기
exports.getReportByID = function(id) {
    return Report.findById(id).exec();
};

/*----관리자-------*/

//접수된 모든 reports(관리자사이드)
exports.getAllReports = function(req,res) {
    return Report.find()
        .sort({ createdAt: -1 }) // createdAt을 기준으로 내림차순 정렬
        .lean().exec();
};


// 처리중 혹은 처리완료 신고들만 모아보기(관리자)
//statusValue 0(처리중) 1(처리완료)
exports.getReportsByStatus = function(statusValue) {
    return Report.find({ status: statusValue })
        .sort({ createdAt: -1 }) // createdAt을 기준으로 내림차순 정렬
        .exec();
};


//신고 관리 및 업데이트하기(관리자)
exports.updateReports = function(req, id, res) {

    const updateFields = {
        species: req.body.species,
        cause: req.body.cause,
        otherInfoByStaff: req.body.otherInfoByStaff,
        status: req.body.status,
    };

    Report.findByIdAndUpdate(id, updateFields, function(err, updatedReport) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error updating report", details: err });
        } else {
            res.send("Report updated");
        }
    });
};