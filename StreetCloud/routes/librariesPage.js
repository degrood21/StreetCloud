var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

router.post('/', function (req, res) {
    distanceQuery = req.body.distance;
    costQuery = req.body.cost;
    restroomQuery = req.body.restroom;
    query = req.body.query;
    all = req.body.all;
    nothingChecked = req.body.nothing;

    if(all == "true"){
        inquiry = "SELECT * from library";
    }
    else if(nothingChecked == "false"){
        inquiry = "SELECT * FROM library WHERE " + distanceQuery + " AND (" + costQuery + ") AND (" + restroomQuery + ")";
    }
    else{
        inquiry = "SELECT * from library";
    }

    if (!(query === "") && all == "false" && nothingChecked == "false") {
        //query.replace(/'/g, "\\\'");
        inquiry = inquiry + " AND (NAME LIKE '%" + query + "%') ";
    }
    else if(!(query == "") && nothingChecked == "true"){
        inquiry = inquiry + " WHERE (NAME LIKE \"%" + query + "%\") ";
    }

    console.log(inquiry);

    dbms.dbquery(inquiry, parseData);

    function parseData(row, result) {
        if (row == false) {
            dataString = JSON.stringify(result);
            dataObj = JSON.parse(dataString);
        }
        console.log(dataObj); // used for testing 
        res.send(dataObj);
    }


});

module.exports = router; 