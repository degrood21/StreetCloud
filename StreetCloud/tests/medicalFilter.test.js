'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const medicalFilterSearchData = jest.fn();
medicalFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Hospital",
        "ADDRESS": "1111 5th St",
        "DISTANCE": "0 Miles",
        "HOURS": "24hrs",
        "ALLDAY": "Yes",
        "WEEKENDS": "Yes"
        }]
    });
});

function test_post(data){
    $("#medicalResults").empty();
    if (data.data.length == 0) {
        $("#medicalResults").append("<p>No Results Found</p>");
        $("#medImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Type: " + data.data[i].TYPE + "</p></td>" +
                        "<tr><td><p>Hours: " + data.data[i].HOURS + "</p></td>" +
                        "<tr><td><p>Open Allday: " + data.data[i].ALLDAY + "</p></td>" +
                        "<tr><td><p id='weekends'>Open Weekends: " + data.data[i].WEEKENDS + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing medical filter funtionality', () => {
    document.body.innerHTML =
    '<table id="medicalResults" class "results"></table>';

    var array;

    medicalFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#medicalResults").append(add);

    expect($('#weekends').text()).toEqual('Open Weekends: Yes');
});