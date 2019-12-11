var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

// POST method route
router.post('/',function(req,res){
    var hoursQuerry = req.body.hours; 
    var distanceQuerry = req.body.distance;
    var type = req.body.type; 
    var query = req.body.query;
    var all = req.body.all;
    var nothingChecked = req.body.all;

    console.log("query: " + query);

    if(all == "true"){
        var inquiry = "SELECT * from medical"
    }
    else if(nothingChecked == "false"){
        var inquiry = "SELECT * FROM medical WHERE "+distanceQuerry+" AND ("+type+") AND ("+hoursQuerry+")";        
    }
    else{
        inquiry = "SELECT * from medical";
    }

    if (!(query === "") && all == "false" && nothingChecked == "false"){
        //query.replace(/'/g, "\\\'");
        inquiry = inquiry + " AND (NAME LIKE '%" + query + "%') "; 
    }
    else if (!(query === "") && nothingChecked == "true"){
        inquiry = inquiry + " WHERE (NAME LIKE \"%" + query + "%\") ";
    }

    console.log("inquiry " + inquiry);

    dbms.dbquery(inquiry, parseData);

    
    function parseData(row,result)
    {
     if(row == false)
     {
             dataString = JSON.stringify(result);
             dataObj = JSON.parse(dataString);
     }
        console.log(dataObj); // used for testing 
        res.send(dataObj);
    }

});
 

module.exports = router; 