// dao/bakeryDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./bakerySqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                res.render('bakery', {
                    list: result        
                });    
                connection.release();
            });
        });
    },

    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 
            var param = req.body;
            if((param.bakeryName == undefined )||(param.bakeryName == '' )) {
                jsonWrite(res, '面包店叫啥勒');
                return;
            }            
            connection.query($sql.insert, [param.bakeryName, param.address, param.image], function(err, result) {
            console.log(err);
               if(result) {
                    res.render('suc');    
                }
                connection.release();
            });
        });
    },

    delete: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.delete, req.params.bakeryId, function(err, result) {
                if(result.affectedRows > 0) {
                    res.render('suc');
                } else {
                    res.render('fail',{
                        result: result
                    });
                }
                connection.release();
            });
        });
    },

    updateChart: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, req.params.bakeryId, function(err, result) {
                res.render('updateBakery',{
                    list: result
                });
                connection.release();
            });
        });
    },

    update: function (req, res, next) {
        var param = req.body;
        if(param.bakeryName == null || param.bakeryName == '') {
            jsonWrite(res, '面包叫啥勒');            
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.bakeryName, param.address, param.image, req.params.bakeryId], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc'); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }
                connection.release();
            });
        });
    },

    queryById: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, req.query.bakeryId, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

};