var connection = require('../db');



//select  hotels  
    //by max price 
    //lowest price 
    //by facility w
    //by name 
    //by star 
    //by overall rating 
    //by area/borrows  
    //by id 

    //each functions provide the above functionalities
    //callback from the controller 
    //send data to client

var Hotel ={
    //get all hotels in the db
    getAllHotels:function(callback){
        connection.query("Select *from hotel",callback);
    },

    getHotelByID:function(id,callback){
        connection.query("Select *from hotel where hotel.ID = "+id,callback);
    },
};

module.exports = Hotel;
