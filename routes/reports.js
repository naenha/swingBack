var express = require('express');
var reports = require('../controllers/reports');
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


router.post('/', upload.single('img'), function(req, res, next) {
    console.log(req);
    reports.create(req,res);
    res.send('reports stored');
});


module.exports = router;
