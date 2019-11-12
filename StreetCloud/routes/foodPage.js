var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var distanceQuerry = req.body.distance; 
    var priceQuerry = req.body.price;
    var typeQuerry = req.body.type;

    dbms.dbquery("SELECT * FROM food WHERE DISTANCE "+distanceQuerry+" AND ("+typeQuerry+") AND ("+priceQuerry+")", parseData);

    function parseData(row,result){
     if(row == false){
             dataString = JSON.stringify(result);
             dataObj = JSON.parse(dataString);
        }
        console.log(dataObj); // used for testing 
        res.send(dataObj);
    }


});

module.exports = router; 