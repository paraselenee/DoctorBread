//bakery.js
var express = require('express');
var router = express.Router();

var bakeryDao = require('../dao/bakeryDao');

router.get('/', function(req, res, next) {
	bakeryDao.showBakery(req, res, next);
});

module.exports = router;