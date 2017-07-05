// dao/breadDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $breadSql = require('./breadSqlMapping');
var $bakerySql = require('./bakerySqlMapping');

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

    // query bread by bakeryID
    breadOfBakery: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            console.log(param);
            // connection.query($breadSql.queryByBakery, [param.bakeryID], function(err, result) {
            //     res.render('breadOfBakery', {
            //         list: result        
            //     });     
            //     console.log(result);            
            //     connection.release();
            // });
            connection.query($breadSql.queryByBakery, [param.bakeryID], function(err, result) {
                res.render('breadOfBakery', {
                    list: result        
                });     
                console.log(result);            
                connection.release();
            });
        });
    },


};
