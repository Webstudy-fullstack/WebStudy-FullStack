var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`Welcom to Sejun's blog`);
  console.log("hihi")
});

module.exports = router;
