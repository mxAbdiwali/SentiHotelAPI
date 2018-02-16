var db = require('mysql');

//connecting to db
var connection = db.createConnection(
    {
        host:'127.0.0.1',
        user:'root',
        password:'Ali@05121985',
        database:'sentihotel'
    }
);



module.exports = connection;