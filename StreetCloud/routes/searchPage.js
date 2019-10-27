var express = require('express');
var router = express.Router();
var dbms = require('./dbms');


router.post('/',function(req,res){
    console.log("Search Post!");
    var query = req.body.inquiry;
    console.log("QUERY: " + query);
    var searchCatergories = ["food", "shelter", "medical"];
    var searchResultsArray = [];

    for (var index = 0; index < searchCatergories.length; index++){
        console.log("INDEX: " + index);
        dbms.dbquery("SELECT * FROM " + searchCatergories[index] + 
            " WHERE NAME LIKE '%"+ query +"%'", parseData);
        

        function parseData(row,result){
         if(row == false){
             var dataString = JSON.stringify(result);
             var dataObj = JSON.parse(dataString);
             
             searchResultsArray.unshift(JSON.stringify(dataObj));
             res.send(searchResultsArray);
             console.log("SEARCH RESULT ARRAY1: " + searchResultsArray);
         }
        //  console.log(dataObj);
        //  var sendToPerson = JSON.stringify(dataObj);
        //  res.send(sendToPerson);
        //  break;
        //     if(row == false){
        //     searchResultsArray[index] = new Array(res);
        //     for (var num = 0; num < result.length; num++){
        //          dataString = JSON.stringify(result[num]);
        //          dataObj = JSON.parse(dataString);
        //          searchResultsArray[searchResultsArray.length] = dataObj;
        //     }
        //  }

        }
        
       //searchResultsArray += result;
    
}
console.log(dataObj);
         //var sendToPerson = JSON.stringify(dataObj);
         console.log("SEARCH RESULTS ARRAY2:" + searchResultsArray);
         console.log("REAL RESULT: " + searchResultsArray[2]);
         res.send(searchResultsArray);
    /*
    var relatedSearchResultsArray;
    for (var index = 0; index < searchResultsArray.length; index++){
        if (searchResultsArray[index].NAME.contains(query)){
            relatedSearchResultsArray[relatedSearchResultsArray.length] = searchResultsArray[index];
        }
    }
    */
    //var myJSON = JSON.stringify(searchResultsArray)
    // var sendResults = JSON.stringify(result);
    // console.log("SEND RESULTS: " + sendResults);
    // var parsed = JSON.parse(result);
    // console.log("PARSED " + parsed);
    // res.send(sendResults);

});

module.exports = router; 