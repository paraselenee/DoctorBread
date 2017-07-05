//bakery.js
var express = require('express');
var router = express.Router();
var bakeryDao = require('../dao/bakeryDao');
var breadDao = require('../dao/breadDao');

router.get('/', function(req, res, next) {
	bakeryDao.showBakery(req, res, next);
});

router.get('/bakeryName/:bakeryName/bakeryID/:bakeryID', function(req, res, next) {
	breadDao.breadOfBakery(req, res, next);
});

module.exports = router;