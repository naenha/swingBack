var express = require('express');
var router = express.Router();
var images = require('../controllers/images');
var alarms = require('../controllers/alarms');
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images');

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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/add', async function(req, res) {
  console.log("called at router");
  try {
      const result = await images.add();
      res.send(`파이썬 스크립트의 결과: ${result}`);
  } catch (error) {
      console.error(`에러 발생: ${error}`);
      res.status(500).send(`에러 발생: ${error}`);
  }
});

router.post('/image', upload.single('img'), async function(req, res) {
  console.log("called at router");
  try {
        console.log(req.file.path);
        const result = await images.imageClassification(req.file.path, res);
        //res.send(`파이썬 스크립트의 결과: ${result}`);
  } catch (error) {
      console.error(`에러 발생: ${error}`);
      //res.status(500).send(`에러 발생: ${error}`);
  }
});


router.get('/alarm', async function(req, res) {
    res.send(alarms.sendAlarm());
});


module.exports = router;
