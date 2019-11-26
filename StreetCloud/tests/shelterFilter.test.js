'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const shelterFilterSearchData = jest.fn();
shelterFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Shelter",
        "ADDRESS": "3333 5th St",
        "DISTANCE": "0 Miles",
        "GENDER": "Male Only",
        "FOOD_INCLUDED": "Yes",
        }]
    });
});

function test_post(data){
    $("#shelterResults").empty();
    if (data.data.length == 0) {
        $("#shelterResults").append("<p>No Results Found</p>");
        $("#shelterImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Gender: " + data.data[i].GENDER + "</p></td>" +
                        "<tr><td><p>Food Included: " + data.data[i].FOOD_INCLUDED + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing shelter filter funtionality', () => {
    document.body.innerHTML =
    '<table id="shelterResults" class "results"></table>';

    var array;

    shelterFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#shelterResults").append(add);

    expect($('#food_included').text()).toEqual('Food Included: Yes');
});