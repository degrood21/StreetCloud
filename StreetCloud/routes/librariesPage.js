var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

router.post('/', function (req, res) {
    distanceQuery = req.body.distance;
    costQuery = req.body.cost;
    restroomQuery = req.body.restroom;
    query = req.body.query;
    inquiry = "SELECT * FROM library WHERE DISTANCE " + distanceQuery + " AND (" + costQuery + ") AND (" + restroomQuery + ")";

    if (!(query === "")) {
        query.replace(/'/g, "\\\'");
        inquiry = inquiry + " AND (NAME LIKE '%" + query + "%') ";
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