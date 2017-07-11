// dao/bakerySqlMapping.js
// CRUD SQL语句
var bakery = {
    insert:'INSERT INTO bakery(bakeryName, address, image) VALUES(?,?,?)',
    update:'update bakery set bakeryName=?, address=?, image=? where bakeryId=?',
    delete: 'delete from bakery where bakeryId=?',
    queryById: 'select * from bakery where bakeryId=?',
    queryAll: 'select * from bakery'
};

module.exports = bakery;