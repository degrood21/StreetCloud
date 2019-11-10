//searchPage.js in routes
//Created by the StreetCloud team
//When the search button is pressed on
//main page this post method will be called
var express = require('express');
var router = express.Router();
var dbms = require('./dbms');


router.post('/',function(req,res){
    //variable holds what the user searched for
    //to be used for the dbms query
    var query = req.body.inquiry;

    //used for testing to ensure correct search
    console.log("Searching for: " + query);
    
    //currently the search categories to search through
    //the database
    var searchCategories = ["food", "shelter", "medical"];
    var statement = "";//dbms query string

    //for loop will cycle through the amount of tables
    //in database and search for the same thing in all tables
    //using the UNION mySQL operator
    for (var index = 0; index < searchCategories.length; index++){
        if (index != 0){
            statement = statement + "UNION ";
        }
        statement = statement + "SELECT Name, Address, Distance, Image FROM " + searchCategories[index] + " WHERE Name " +
            "LIKE '%" + query + "%' ";
            //LIKE %word% searches for the substring of word
    }
        //used for testing to ensure correct dbms query
        console.log("" + statement);
    
        //sends the request to retrieve data from database
        dbms.dbquery(statement, parseData);
        
        //function to handle the data when we get it back
        function parseData(row,result){
                 var dataString = JSON.stringify(result);
                 var dataObj = JSON.parse(dataString);
                 console.log(dataObj);
                 res.send(dataObj);
        }
    

});

module.exports = router; 
