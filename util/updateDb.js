var connection = require('../db');
var fetch = require("node-fetch");
const https = require('https');

var sql = 'select hotel.ID , hotel.Name, address.Postcode from address, hotel where address.HotelID = hotel.ID group by hotel.ID;';

var key = 'key= AIzaSyDw1Dr5A5NzWBaN3XaZBLSjFcDiMcAgjV4';
var type = '&type=lodging&';
var searchPlace = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';


connection.query(sql, savePhotosCallback);

/*
 ID: 1866705,
    Name: 'St. Pancras Renaissance Hotel London',
    Postcode: 'NW1 2AR'

*/
function savePhotosCallback(error, data) {
    if (error) console.log(error);
    getGeoInfo(data);
}

/*


        


*/




//api.postcodes.io/postcodes
function getGeoInfo(data) {
    data.forEach(element => {
        var postcode = element.Postcode;
        console.log(postcode)
        https.get('https://postcodes.io/postcodes/'+postcode, (res)=>{
            var id  = element.ID;
            res.on('data', function (chunk) {
                 var body = JSON.parse(chunk);
                 var status  = body.status;
                 if(status == 200){
                   var lon = body.result.longitude;
                   var lat = body.result.latitude;
                   connection.query(
                       'UPDATE address SET address.Long ='+lon+
                       ',address.Lat ='+lat
                       +'WHERE address.HotelID ='+id,
                       function(error,result){
                            if(error) console.log(error);
                            else console.log(result);
                            });
                 }
              });       
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
        }); 
    });

    console.log("finish");
}


function responseToString(res,element){
    var id  = element.ID;
    var sqlhead = "INSERT INTO address (Long, Lat) VALUES ("
    var sqltail = ") WHERE address.HotelID=";
    res.on('data', function (chunk) {
         var body = JSON.parse(chunk);
         var status  = body.status;
         if(status == 200){
           var lon = body.result.longitude;
           var lat = body.result.latitude;
           connection.query(slqhead+lon+","+lat+sqltail+id,function(error,result){
            if(error) console.log(error);
            console.log(result);
            });
         }
      });
}


function getPostcodes(data) {
    var postcodes = []
    data.forEach(element => {
        postcodes.push(element.Postcode);
    });
    return postcodes;
}

