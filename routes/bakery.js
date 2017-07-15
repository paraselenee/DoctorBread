//bakery.js
var express = require('express');
var router = express.Router();
var bakeryDao = require('../dao/bakeryDao');

router.get('/', function(req, res, next) {
	bakeryDao.queryAll(req, res, next);
});

router.get('/add', function(req, res, next) {
    res.render('addBakery');     
});

router.post('/add', function(req, res, next) {
    bakeryDao.add(req, res, next);
});

router.post('/delete/:bakeryId', function(req, res, next) {
    bakeryDao.delete(req, res, next);
});

router.get('/update/:bakeryId', function(req, res, next) {
    bakeryDao.updateChart(req, res, next);
});

router.post('/update/:bakeryId', function(req, res, next) {
    bakeryDao.update(req, res, next);
});

router.get('/query', function(req, res, next) {
    bakeryDao.queryById(req, res, next);
});

module.exports = router;