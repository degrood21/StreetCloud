var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

// POST method route
router.post('/',function(req,res){
    var when = req.body.when; 
    var distance = req.body.distance;
    var type = req.body.type; 
    console.log(type); //used for testing
    dbms.dbquery("SELECT * FROM medical WHERE TYPE LIKE '%"+type+"%'", parseData);

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