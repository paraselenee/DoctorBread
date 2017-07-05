// dao/breadSqlMapping.js
// CRUD SQL语句
var bread = {
    insert:'INSERT INTO (breadName, stars, comment, image, bakeryID) VALUES(?,?,?,?,?)',
    update:'update bread set breadName=?, star=?, comment=?, image=?, bakeryID=?, where breadID=?',
    delete: 'delete from bread where breadID=?',
    queryByID: 'select * from bread where breadID=?',
    queryByBakery: 'select * from bread where bakeryID=?',
    queryAll: 'select * from bread'
};

module.exports = bread;