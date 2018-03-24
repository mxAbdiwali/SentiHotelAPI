var app = require('express')
const stats = require('../models/stats');
var statsroutes = app.Router();


//get stat for all hotel sorted by heighest value
statsroutes.get('/stats', function(req,res){
        stats.getAllStats(function(error, rows){
            if(error) res.json(error);
            else res.json(rows);
        });
});

statsroutes.get('/stat', function(req,res){
    var category =  req.query.category;
    stats.getAllStats(category,function(error, rows){
        if(error) res.json(error);
        else res.json(rows);
    });
});


module.exports = statsroutes;




