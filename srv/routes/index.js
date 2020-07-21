var express = require('express');
var router = express.Router();

const config = require('../config');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: config.app.name });
});

module.exports = router;
