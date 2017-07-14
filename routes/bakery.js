//bakery.js
var express = require('express');
var router = express.Router();
var bakeryDao = require('../dao/bakeryDao');

router.get('/', function(req, res, next) {
	bakeryDao.showBakery(req, res, next);
});

router.get('/add', function(req, res, next) {
    res.render('addBakery');     
});

router.post('/add', function(req, res, next) {
    bakeryDao.add(req, res, next);
});

router.get('/delete', function(req, res, next) {
    bakeryDao.delete(req, res, next);
});

router.get('/update', function(req, res, next) {
    res.render('updateBakery');
});

router.post('/update', function(req, res, next) {
    bakeryDao.update(req, res, next);
});

router.get('/query', function(req, res, next) {
    bakeryDao.queryById(req, res, next);
});

module.exports = router;