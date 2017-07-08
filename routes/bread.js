//bread.js
var express = require('express');
var router = express.Router();
var breadDao = require('../dao/breadDao');

router.get('/list/:bakeryName-:bakeryId', function(req, res, next) {
	breadDao.queryByBakery(req, res, next);
});

router.get('/add', function(req, res, next) {
    breadDao.add(req, res, next);
});

router.get('/delete', function(req, res, next) {
    breadDao.delete(req, res, next);
});

router.get('/update', function(req, res, next) {
    res.render('updateBread');
});

router.post('/update', function(req, res, next) {
    breadDao.update(req, res, next);
});

router.get('/query', function(req, res, next) {
    breadDao.queryById(req, res, next);
});

module.exports = router;