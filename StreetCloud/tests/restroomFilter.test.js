'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const restroomFilterSearchData = jest.fn();
restroomFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Restroom",
        "ADDRESS": "7777 5th St",
        "DISTANCE": "2 Miles",
        "TIMES_OPEN": "24 Hours"       
        }]
    });
});

function test_post(data){
    $("#restroomResults").empty();
    if (data.data.length == 0) {
        $("#restroomResults").append("<p>No Results Found</p>");
        $("#restroomImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Times Open: " + data.data[i].TIMES_OPEN + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing restroom filter funtionality', () => {
    document.body.innerHTML =
    '<table id="restroomResults" class "results"></table>';

    var array;

    restroomFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#restroomResults").append(add);

    expect($('#times_open').text()).toEqual('Times Open: 24 Hours');
});