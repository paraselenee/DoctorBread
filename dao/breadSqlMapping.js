// dao/breadSqlMapping.js
// CRUD SQL语句
var bread = {
    insert:'INSERT INTO bread(bakeryId, breadName, rating, comment, buyAgain, image) VALUES(?,?,?,?,?,?)',
    update:'UPDATE bread SET bakeryId=?, breadName=?, rating=?, comment=?, buyAgain=?, image=? WHERE breadId=?',
    delete: 'delete from bread where breadId=?',
    queryById: 'select * from bread where breadId=?',
    queryByBakery: 'select * from bread where bakeryId=?',
    queryAll: 'select * from bread'
};

module.exports = bread;