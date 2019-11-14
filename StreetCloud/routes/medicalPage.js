var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

// POST method route
router.post('/',function(req,res){
    var hoursQuerry = req.body.hours; 
    var distanceQuerry = req.body.distance;
    var typeQuerry = req.body.type; 
    var query = req.body.query;

    console.log("query: " + query);

    var inquiry = "SELECT * FROM medical WHERE DISTANCE "+distanceQuerry+" AND (TYPE LIKE'"+typeQuerry+"') AND ("+hoursQuerry+")";

    if (!(query === "")){
        query.replace(/'/g, "\\\'");
        inquiry = inquiry + " AND (NAME LIKE '%" + query + "%') "; 
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