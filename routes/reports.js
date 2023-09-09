var express = require('express');
var reports = require('../controllers/reports');
var misses = require('../controllers/misses');
var images = require('../controllers/images');
var multer = require('multer');
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');

    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
        // Make the file name the date + the file extension
        filename =  Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });


// 신고하기
router.post('/:id', upload.single('img'), async function(req, res) {
    //userid

    try {
        var id = req.params.id;
        var saved = await reports.create(req,id, res);
        const result = await images.imageClassification(req.file.path);
        //console.log("result(Router)" + result);

        reports.speciesUpdate(saved, result);
        res.end();

  } catch (error) {
      console.error(`에러 발생: ${error}`);
      res.status(500).send(`에러 발생: ${error}`);
  }
});

//near miss 생성하기
router.post('/nearmiss/:id', function(req, res, next) {
    //userid
    var id = req.params.id;
    misses.create(req,id, res);
    res.send('near miss reports stored');
});

//자신이 한 신고 리스트 조회
router.get('/:id', async function(req,res){
    //user id
    var id = req.params.id;
    var report =await reports.getReportsByUserID(id);

    res.send(report);
});


// 신고 게시물 조회
router.get('/post/:id', async function(req,res){
    //report id
    var id = req.params.id;
    var report = await reports.getReportByID(id);

    res.send(report);
});



/*-----관리자----*/
//관리자 신고 업데이트하기
router.post('/update/:id', function(req, res, next) {
    var id = req.params.id;
    reports.updateReports(req, id, res);
});

//모든 신고 보기 + status별 신고 모아보기
router.get('/', async function (req, res) {
    // reports?status=0
    const statusValue = req.query.status;

    try {

        if (statusValue) {
            var report = await reports.getReportsByStatus(statusValue);
            res.send(report);
        } else {
            var report = await reports.getAllReports();
            res.send(report);
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error retrieving reports");
    }

});

module.exports = router;
