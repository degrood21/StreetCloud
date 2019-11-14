var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var genderQuerry = req.body.gender;
    var distanceQuerry = req.body.distance;
    var foodQuerry = req.body.food; 
    var query = req.body.query;

    //COMMENTED OUT BECUASE OF DATABASE
    var inquiry = "SELECT * FROM shelter WHERE DISTANCE "+distanceQuerry+" AND ("+genderQuerry+") AND ("+foodQuerry+")";

    if (!(query === "")){
        query.replace(/'/g, "\\\'");
        inquiry = inquiry + " AND (NAME LIKE '%" + query + "%') "; 
    }

    dbms.dbquery(inquiry, parseData);

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