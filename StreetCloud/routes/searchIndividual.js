var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var query = req.body.inquiry;
    query = query.replace(/'/g,"\\\'");

    var querySource = req.body.source;

    console.log("Searching for: " + query + " in " + querySource);
    
    var statement = "";

    statement = statement + "SELECT * FROM " + querySource + " WHERE Name " +
        "LIKE '%" + query + "%' ";

    console.log("" + statement);
    
    dbms.dbquery(statement, parseData);
        

    function parseData(row,result){
         var dataString = JSON.stringify(result);
         var dataObj = JSON.parse(dataString);
         console.log(dataObj);
         res.send(dataObj);
    }
});

module.exports = router; 