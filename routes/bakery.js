//bakery.js
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('../dao/bakerySqlMapping');
var pool = mysql.createPool($util.extend({}, $conf.mysql));
var extraRoute;

var bakeryDao = require('../dao/bakeryDao');
var express = require('express');
var router = express.Router();



var url = require('url');

// var url_parts = url.parse(request.url, true);
// var query = url_parts.query;

// pool.getConnection(function(err, connection) {
// 	connection.query($sql.queryAll, function(err, result) {   
// 		res.render('testBakery', {
// 			result: result        
// 		}); 
// 		// extraRoute = result;
// 		connection.release();
// 	});
// });

router.get('/', function(req, res, next) {
	bakeryDao.showBakery(req, res, next);
});


router.get(url, function(req, res, next) {
	bakeryDao.testBakery(req, res, next);
});

router.get('/Facsino', function(req, res, next) {
	console.log(url);
	bakeryDao.testBakery(req, res, next);
});

router.get('/Avec toi', function(req, res, next) {
	bakeryDao.testBakery(req, res, next);
});

router.get('/Hogan永新坊店', function(req, res, next) {
	bakeryDao.testBakery(req, res, next);
});

router.get('/Hogan新天地店', function(req, res, next) {
	bakeryDao.testBakery(req, res, next);
});

module.exports = router;