'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const libraryFilterSearchData = jest.fn();
libraryFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Employment",
        "ADDRESS": "6666 5th St",
        "DISTANCE": "2 Miles",
        "COST": "Free",
        "PUBLIC_RESTROOMS": "Yes",
        }]
    });
});

function test_post(data){
    $("#libraryResults").empty();
    if (data.data.length == 0) {
        $("#libraryResults").append("<p>No Results Found</p>");
        $("#libraryImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Cost: " + data.data[i].COST + "</p></td>" +
                        "<tr><td><p>Public Restrooms: " + data.data[i].PUBLIC_RESTROOMS + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing library filter funtionality', () => {
    document.body.innerHTML =
    '<table id="libraryResults" class "results"></table>';

    var array;

    libraryFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#libraryResults").append(add);

    expect($('#cost').text()).toEqual('Cost: Free');
});