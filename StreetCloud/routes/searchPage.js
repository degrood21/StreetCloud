var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var query = req.body.inquiry;

    console.log("Searching for: " + query);
    
    var searchCategories = ["food", "shelter", "medical"];
    var statement = "";

    for (var index = 0; index < searchCategories.length; index++){
        if (index != 0){
            statement = statement + "UNION ";
        }
        statement = statement + "SELECT Name, Address, Distance FROM " + searchCategories[index] + " ";
    }

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