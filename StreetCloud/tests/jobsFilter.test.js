'use strict'

const getCheckedElement = jest.fn();
getCheckedElement.mockReturnValueOnce(true);

const $ = require('jquery');

const jobsFilterSearchData = jest.fn();
jobsFilterSearchData.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Employment",
        "ADDRESS": "6666 5th St",
        "DISTANCE": "2 Miles",
        "EDUCATION": "High School Degree",
        "POSITION": "Part Time"
        }]
    });
});

function test_post(data){
    $("#jobsResults").empty();
    if (data.data.length == 0) {
        $("#jobsResults").append("<p>No Results Found</p>");
        $("#jobsImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data.data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data.data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Education: " + data.data[i].EDUCATION + "</p></td>" +
                        "<tr><td><p>Position: " + data.data[i].POSITION + "</p></td>" +
                        "</table></td></tr></table></td></tr>";
                        
        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('testing jobs filter funtionality', () => {
    document.body.innerHTML =
    '<table id="jobsResults" class "results"></table>';

    var array;

    jobsFilterSearchData((da) => array = da);

    var add = test_post(array);

    $("#jobsResults").append(add);

    expect($('#position').text()).toEqual('Position: Part Time');
});