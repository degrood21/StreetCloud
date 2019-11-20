var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

router.post('/', function (req, res) {
    distanceQuery = req.body.distance;
    priceQuery = req.body.price;
    timesQuery = req.body.times;
    query = req.body.query;
    inquiry = "SELECT * FROM daycare WHERE DISTANCE " + distanceQuery + " AND (" + priceQuery + ") AND (" + timesQuery + ")";

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