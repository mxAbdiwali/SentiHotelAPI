var db = require('mysql');

//connecting to db
var connection = db.createConnection(
    {
        host:'localhost',
        user:'client',
        password:'Ali@05121985',
        database:'sentihotel'
    }
);

connection.connect(function(error){
    if(error) throw error;
     console.log("Connected to mysql");
});





module.exports = connection;