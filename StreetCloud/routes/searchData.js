//Dylan DeGrood
//orders.js
var express = require('express');
var router = express.Router();
var database = require('./database');
//JSON object that has the orders arranged in an array style
var orders = {
    "ordersData":
    [
        {
            "topping" : "Cherry",
            "quantity" : "20"
        },
        {
            "topping" : "Plain",
            "quantity" : "33"
        },
        {
            "topping" : "Chocolate",
            "quantity" : "15"
        }
    ]
};

/* JSON Order object to be requested */
router.post('/', function (req, res) {
    //Turns the JSON into a tranferrable type and sends it
    var strJSON = JSON.stringify(orders);
    res.send(strJSON);
});

// /* JSON Order object to be requested */
// router.post('/streetcloud', function (req, res) {
//     consol.log("Hello");
//     var query_str = "SELECT COUNT(*) from medical;"
//     database.query(query_str, callback);
//     //Turns the JSON into a tranferrable type and sends it
//     database.dbquery(query_str, callback);
//         var strJSON = JSON.stringify(query_str);
//         consol.log("Hello");
//         res.send(strJSON);
    
// });

module.exports = router;
module.exports.orders = orders; //Per Dylan P this is done for testing