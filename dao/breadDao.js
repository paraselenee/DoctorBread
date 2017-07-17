// dao/breadDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./breadSqlMapping');
var $sqlBakery = require('./bakerySqlMapping');

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
    queryByBakery: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 
            // 获取前台页面传过来的参数
            var param = req.params;
            connection.query($sql.queryByBakery, [param.bakeryId], function(err, result) {
                res.render('bread', {
                    title: param.bakeryName,
                    list: result        
                });     
                connection.release();
            });
        });
    },

    addChart: function(req, res, next){
        //returns all the bakeries in chart bakery
        pool.getConnection(function(err, connection) {
            connection.query($sqlBakery.queryAll, function(err, result) {
                res.render('addBread', {
                    bakeryList : result
                });
            });
        });
    },

    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 
            var param = req.body;
            if((param.breadName == '' )||(param.breadName == undefined )) {
                jsonWrite(res, '面包叫啥勒');
                return;
            }
            param.rating = param.rating ? (param.rating - 0) : null; //''->null, 0->0
            param.buyAgain = param.buyAgain ? (param.buyAgain - 0) : null; //''->null, 0->0
            connection.query($sql.insert, [param.bakeryId, param.breadName, param.rating, 
            param.comment, param.buyAgain, param.image], function(err, result) {
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
            connection.query($sql.delete, req.params.breadId, function(err, result) {
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
        var id = req.params.breadId;
        var bakeryList = [];
        //returns all the bakeries in chart bakery
        pool.getConnection(function(err, connection) {
            connection.query($sqlBakery.queryAll, function(err, result) {
                bakeryList = result;
                connection.release();
            });
        });
        //returns information of the chosen bread
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                res.render('updateBread', {
                    title: '编辑面包',
                    list: result,
                    bakeryList : bakeryList   
                });     
                connection.release();
            });
        });
    },

    update: function (req, res, next) {
        var param = req.body;
        if(param.breadName == '' ) {
            jsonWrite(res, '面包叫啥勒');
            return;
        }
        pool.getConnection(function(err, connection) {
            param.rating = param.rating ? (param.rating - 0) : null;
            param.buyAgain = param.buyAgain ? (param.buyAgain - 0) : null;
            connection.query($sql.update, [param.bakeryId, param.breadName, param.rating, 
            param.comment, param.buyAgain, param.image, req.params.breadId], function(err, result) {
                console.log('err:'+err);
                // 使用页面进行跳转提示
                if(result && result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
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
        var id = +req.query.breadId; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

};
