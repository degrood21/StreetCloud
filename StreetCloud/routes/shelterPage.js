var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var genderQuery = req.body.gender;
    var distanceQuery = req.body.distance;
    var foodQuery = req.body.food; 
    var query = req.body.query;
    var all = req.body.all;
    var nothingChecked = req.body.nothing;


    if(all == "true"){
        inquiry = "SELECT * from shelter"
    }
    else if (nothingChecked = "false"){
        inquiry = "SELECT * FROM shelter WHERE "+distanceQuery+" AND ("+genderQuery+") AND ("+foodQuery+")";
    }
    else{
        inquiry = "SELECT * from shelter";
    }

    if (!(query === "") && all == "false" && nothingChecked == "false"){
        //query.replace(/'/g, "\\\'");
        inquiry = inquiry + " AND (NAME LIKE '%" + query + "%') "; 
    }
    else if (!(query === "") && nothingChecked == "true"){
        inquiry = inquiry + " WHERE (NAME LIKE \"%" + query + "%\") ";
    }

    console.log("Query: " + inquiry);
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