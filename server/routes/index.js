var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    status: 200,
    message: 'OK'
  })
});

module.exports = router;
