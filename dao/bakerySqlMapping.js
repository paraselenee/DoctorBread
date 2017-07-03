// dao/bakerySqlMapping.js
// CRUD SQL语句
var bakery = {
    insert:'INSERT INTO (bakeryName, address, image) VALUES(?,?,?)',
    update:'update bakery set bakeryName=?, address=?, image=?, where bakeryID=?',
    delete: 'delete from bakery where bakeryID=?',
    queryByID: 'select * from bakery where bakeryID=?',
    queryAll: 'select * from bakery'
};

module.exports = bakery;