var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/',function(req,res){
    var query = body.inquiry;
    
    var searchCatergories = ["food", "shelter", "medical"];
    var searchResultsArray;

    for (var index = 0; index < searchCatergories.length; index++){
    
        dbms.dbquery("SELECT * FROM" + searchCatergories[index] +
            "WHERE NAME LIKE '%"+ query +"%'", parseData);
        

        function parseData(row,result){
         if(row == false){
            searchResultsArray[index] = new Array(res);
            for (var num = 0; num < result.length; num++)
                 dataString = JSON.stringify(result[num]);
                 dataObj = JSON.parse(dataString);
                 searchResultsArray[searchResultsArray.length] = dataObj;
            }

        }
    }

    var relatedSearchResultsArray;
    for (var index = 0; index < searchResultsArray.length; index++){
        if (searchResultsArray[index].NAME.contains(query)){
            relatedSearchResultsArray[relatedSearchResultsArray.length] = searchResultsArray[index];
        }
    }

    res.send(relatedSearchResultsArray);

});

module.exports = router; 