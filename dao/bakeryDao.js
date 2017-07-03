// dao/bakeryDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./bakerySqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

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
    showBakery: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                res.render('bakery', {
                    list: result         
                });
        
                connection.release();
            });
        });
    },

    // login: function (req, res, next) {
    //     // login by id and password
    //     // 输入id和password两个参数
    //     var param = req.body;
    //     if(param.password == null || param.id == null) {
    //         jsonWrite(res, undefined);
    //         return;
    //     }
    //     pool.getConnection(function(err, connection) {
    //         connection.query($sql.queryById, [+param.id], function(err, result) {
    //             // 使用页面进行跳转提示
    //             console.log(result);
    //             if (result.length < 1) {
    //                 res.render('fail',  {
    //                     result: result
    //                 });
    //             } else {
    //                 if (param.password == result[0].password){
    //                     res.render('suc', {
    //                         result: result
    //                     }); 
    //                 }
    //                 else {

    //                     res.render('wrongPassword',  {
    //                         result: result
    //                     });
    //                 }
    //             }
    //             // if(result.affectedRows > 0) {
    //             //     res.render('suc', {
    //             //         result: result
    //             //     }); // 第二个参数可以直接在jade中使用
    //             // } else {
    //             //     res.render('fail',  {
    //             //         result: result
    //             //     });
    //             // }
    //             // console.log(result);

    //             connection.release();
    //         });
    //     });

    //},




};