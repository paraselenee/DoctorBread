//bakery.js
var express = require('express');
var router = express.Router();

var bakeryDao = require('../dao/bakeryDao');

router.get('/', function(req, res, next) {
	//bakeryDao.showBakery(req, res, next);

	res.render('bakery', {  
		title: '数据列表',  
		list:  [123, 123, 123]
	});  
});



module.exports = router;