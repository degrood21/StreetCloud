var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');


router.post('/', function (req, res) {
    var distanceQuery = req.body.distance;
    var priceQuery = req.body.price;
    var typeQuery = req.body.type;
    var query = req.body.query;


    inquiry = "SELECT * FROM food WHERE DISTANCE " + distanceQuery + " AND (" + typeQuery + ") AND (" + priceQuery + ")";

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