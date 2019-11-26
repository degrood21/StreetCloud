'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const daycareFilterSearchData = jest.fn();
daycareFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Daycare",
        "ADDRESS": "4444 5th St",
        "WEEKDAYS": "Yes",
        "WEEKENDS": "No",
        "PRICE": "$$"
        }]
    });
});

function test_post(data){
    $("#daycareResults").empty();
    if (data.data.length == 0) {
        $("#daycareResults").append("<p>No Results Found</p>");
        $("#daycareImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Weekdays: " + data.data[i].WEEKDAYS + "</p></td>" +
                        "<tr><td><p>Weekends: " + data.data[i].WEEKENDS + "</p></td>" +
                        "<tr><td><p>Price: " + data.data[i].PRICE + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing daycare filter funtionality', () => {
    document.body.innerHTML =
    '<table id="daycareResults" class "results"></table>';

    var array;

    daycareFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#daycareResults").append(add);

    expect($('#weekdays').text()).toEqual('Weekdays: Yes');
});