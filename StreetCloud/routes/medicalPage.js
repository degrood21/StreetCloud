var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

// POST method route
router.post('/',function(req,res){
    var hoursQuerry = req.body.hours; 
    var distanceQuerry = req.body.distance;
    var typeQuerry = req.body.type; 
    dbms.dbquery("SELECT * FROM medical WHERE DISTANCE "+distanceQuerry+" AND (TYPE LIKE'"+typeQuerry+"') AND ("+hoursQuerry+")", parseData);

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