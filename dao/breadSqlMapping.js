// dao/breadSqlMapping.js
// CRUD SQL语句
var bread = {
    insert:'INSERT INTO (bakeryId, breadName, stars, comment, buyAgain, image) VALUES(?,?,?,?,?,?)',
    update:'update bread set bakeryId=?, breadName=?, star=?, comment=?, buyAgain=?, image=? where breadId=?',
    delete: 'delete from bread where breadId=?',
    queryById: 'select * from bread where breadId=?',
    queryByBakery: 'select * from bread where bakeryId=?',
    queryAll: 'select * from bread'
};

module.exports = bread;