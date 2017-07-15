// dao/breadSqlMapping.js
// CRUD SQL语句
var bread = {
    insert:'INSERT INTO bread(bakeryId, breadName, rating, comment, buyAgain, image) VALUES(?,?,?,?,?,?)',
    update:'UPDATE bread SET bakeryId=?, breadName=?, rating=?, comment=?, buyAgain=?, image=? WHERE breadId=?',
    delete: 'DELETE FROM bread WHERE breadId=?',
    queryById: 'SELECT * FROM bread WHERE breadId=?',
    queryByBakery: 'SELECT * FROM bread WHERE bakeryId=?',
    queryAll: 'SELECT * FROM bread'
};

module.exports = bread;