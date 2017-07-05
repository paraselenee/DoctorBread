//bakery.js
var express = require('express');
var router = express.Router();
var bakeryDao = require('../dao/bakeryDao');
var breadDao = require('../dao/breadDao');

router.get('/', function(req, res, next) {
	bakeryDao.showBakery(req, res, next);
});

router.get('/breadOfBakery', function(req, res, next) {
	console.log(req);
    console.log(res);
    console.log(next);
	
	breadDao.breadOfBakery(req, res, next);

});


module.exports = router;