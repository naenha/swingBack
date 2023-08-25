var express = require('express');
var user = require('../controllers/users');

var router = express.Router();

router.post('/register', function(req, res, next) {
  user.create(req,res);
  res.send('stored');
});

module.exports = router;
