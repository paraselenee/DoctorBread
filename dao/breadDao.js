// dao/breadDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./breadSqlMapping');

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
            console.log(param);
            connection.query($sql.queryByBakery, [param.bakeryId], function(err, result) {
                res.render('breadOfBakery', {
                    title: param.bakeryName,
                    list: result        
                });     
                console.log(result);            
                connection.release();
            });
        });
    },

    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; 
            var param = req.query || req.params;
            connection.query($sql.insert, [param.bakeryId, param.breadName, param.star, param.comment, param.buyAgain, param.image, param.breadId], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };    
                }
                connection.release();
            });
        });
    },

    delete: function (req, res, next) {
        //delete by id
        pool.getConnection(function(err, connection) {
            var param = req.query || req.params;
            connection.query($sql.delete, [param.breadId], function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                connection.release();
            });
        });
    },

    update: function (req, res, next) {
        // update by id
        var param = req.body;
        // if(param.breadName == null || param.star == null || param.comment == null || param.buyAgain == null || param.image == null) {
        //     jsonWrite(res, undefined);
        //     return;
        // }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.bakeryId, param.breadName, param.star, param.comment, param.buyAgain, param.image, param.breadId], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
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
        console.log(req.query.id);
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },

};
