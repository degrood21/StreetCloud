var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var genderQuerry = req.body.gender;
    var distanceQuerry = req.body.distance;
    var foodQuerry = req.body.food; 


    dbms.dbquery("SELECT * FROM shelter WHERE DISTANCE "+distanceQuerry+" AND ("+genderQuerry+") AND ("+foodQuerry+")", parseData);

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