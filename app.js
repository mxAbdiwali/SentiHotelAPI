var express = require('express');
var app = express();
var hotelroutes = require('./controller/hotel.route')
const port = process.PORT || 3000;



///////////

//access app object 
module.exports = app;

//models/ – represents data, implements business logic and handles storage
//controllers/ – defines your app routes and their logic
//tests/ – tests everything which is in the other folders
//node_modules/ - all npm requried for app
//app.js – initializes the app and glues everything together
//db.js - set connection to the mysql server instance
var option = {
    index: "index.html",
    redirect: true
}
app.use('/',express.static('public', option));



//add all the route to the api
//all the hotel request
app.use('/api',hotelroutes)

//all the review request

app.listen(port, function(){
    console.log("API running on port: "+port);
});