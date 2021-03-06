var express = require('express');
var router = express.Router();
var dbms = require('./dbms.js');

router.post('/', function (req, res) {
    distanceQuery = req.body.distance;
    educationQuery = req.body.education;
    positionQuery = req.body.position ;
    query = req.body.query;
    all = req.body.all;


    if (all == "true") {
        var inquiry = "SELECT * from jobs"
    }
    else{
        inquiry = "SELECT * FROM jobs WHERE " + distanceQuery + " AND (" + educationQuery + ") AND (" + positionQuery + ")";
    }

    if (!(query === "") && all != "true") {
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