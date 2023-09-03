var express = require('express');
var router = express.Router();
var images = require('../controllers/images');

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
      res.status(500).send(`에러 발생: ${error}`);
  }
});
module.exports = router;
