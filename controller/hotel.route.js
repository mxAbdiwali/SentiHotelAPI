var app = require('express')
const hotel = require('../models/hotel');
var hotelroutes = app.Router();



//serving all hotels data
//testing purpose
hotelroutes.get("/hotels", function(req,res){
    hotel.getAllHotels(function(error,rows){
        if(error){
            res.json(error);
        }else{
            res.json(rows);
        }
    });
});



//req.params) Checks route params, ex: /user/:id
//(req.query) Checks query string params, ex: ?id=12 Checks urlencoded body params
//with query string /hotel?

//how would to seperate the diffrent
hotelroutes.get("/hotel?", function(req,res){
    if((req.query.id != undefined || req.query.limit != null ) && req.query.limit > 0){
        console.log(req.query.id);
        console.log(req.query.limit);
        hotel.getHotelByID(req.query.id, function(error,rows){
            if(error){
                res.json(error);
            }else{
                res.json(rows);
            }
        });
    }else{
        res.json({type: "GET", error: "missing parameter"})
    }
});




module.exports = hotelroutes;