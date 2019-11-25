'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const foodFilterSearchData = jest.fn();
foodFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Pantry",
        "ADDRESS": "2222 5th St",
        "DISTANCE": "2 Miles",
        "TYPE": "Pantry",
        "PRICE": "Free"
        }]
    });
});

function test_post(data){
    $("#foodResults").empty();
    if (data.data.length == 0) {
        $("#foodResults").append("<p>No Results Found</p>");
        $("#foodImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Type: " + data.data[i].TYPE + "</p></td>" +
                        "<tr><td><p>Hours: " + data.data[i].PRICE + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing food filter funtionality', () => {
    document.body.innerHTML =
    '<table id="foodResults" class "results"></table>';

    var array;

    foodFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#foodResults").append(add);

    expect($('#price').text()).toEqual('Price: Free');
});