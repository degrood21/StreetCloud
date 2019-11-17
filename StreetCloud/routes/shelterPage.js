var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var genderQuery = req.body.gender;
    var distanceQuery = req.body.distance;
    var foodQuery = req.body.food; 
    var query = req.body.query;


    var inquiry = "SELECT * FROM shelter WHERE DISTANCE "+distanceQuery+" AND ("+genderQuery+") AND ("+foodQuery+")";

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