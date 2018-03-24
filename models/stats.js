var connection = require('../db');

var Stats = {

    //sort by the heighest score (sum of all categories)
    getAllStats:function(callback){
        connection.query("SELECT address.HotelID, address.Lat, address.Long, group_concat(aspect_stats.category) as Categories,  group_concat(aspect_stats.percentage) as Results\
        FROM address\
        JOIN aspect_stats ON address.HotelID = aspect_stats.hotelID\
        group by\
            address.HotelID;",callback);
    },

    getStatsByHotelID: function(hotelID, callback){

    },

    getStatsByCategory: function(category,callback){
        console.log(category)
        connection.query('SELECT address.HotelID, address.Lat, address.Long,\
         aspect_stats.category as Catogries ,  aspect_stats.percentage as Result,\
         aspect_stats.total as Frequency FROM address\
        JOIN aspect_stats ON address.HotelID = aspect_stats.hotelID\
        and aspect_stats.category =/'+category,callback);
    },

    getStatsByMaxCount: function(){

    },

    getStatsByMinCount: function(){

    },

    getStatsByMaxValue: function(){

    },

    getStatsByMinValue: function(){

    },
}

module.exports = Stats;