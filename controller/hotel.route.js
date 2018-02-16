var app = require('express')
const hotel = require('../models/hotel');
var hotelroutes = app.Router()


//get all hotel
//hotelroutes.get("/", function(req,res){
//    hotel.getAllHotels(function(err,raw){
      //  if(err){
     //       res.json(err);
    //    }else{
    //        res.json(raw)
  //      }
 //   });
//});

hotelroutes.get("/", function(req,res){
    res.json(hotel.getAllHotels());
});

hotelroutes.get("/:id", function(req,res){
    if(req.param !== null){
        var resobj = {type: "GET", response: hotel.getAllHotels()}
        res.json(resobj);
    }else{
        res.json({type: "GET", error: "missing parameter"})
    }
});




module.exports = hotelroutes;