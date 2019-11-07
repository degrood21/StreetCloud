'use strict'

const searchIndividual = jest.fn();
const $ = require('jquery');

searchIndividual.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "Hospital",
        "ADDRESS": "1111 5th St",
        "DISTANCE": "0 Miles",
        "HOURS": "2pm-6pm",
        "ALLDAY":"Yes"
        }]
    });
});

searchIndividual.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "McDonalds",
        "ADDRESS": "1111 5th St",
        "DISTANCE": "0 Miles",
        "PRICE": "$"
        }]
    });
});

searchIndividual.mockImplementationOnce(cb => {
    cb({
        "data":
        [{
        "IMAGE": ".jpg",
        "NAME": "McDonalds",
        "ADDRESS": "1111 5th St",
        "DISTANCE": "0 Miles",
        "GENDER": "Male Only",
        "NOTES" : ""
        }]
    });
});

searchIndividual.mockImplementationOnce(cb => {
    cb({
        "data":
        []
    });
});

function test_post(pageId, data) {
    $(".results").text("");
    if(data.data.length == 0){
        $(".results").append("<p id='empty'>No Results Found</p>");
    }
    for (var i = 0; i < data.data.length; i++) {
        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                    "<img src='" + data.data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p>Name: " + data.data[i].NAME + "</p></td></tr>" +
                    "<tr><td><p>Address: " + data.data[i].ADDRESS + "</p></td></tr>" +
                    "<tr><td><p>Distance: " + data.data[i].DISTANCE + "</p></td></tr>";

        if (pageId === "medical") {
            toAdd = toAdd + "<tr><td><p>Type: " + data.data[i].TYPE + "</p></td></tr>" +
                    "<tr><td><p>Hours: " + data.data[i].HOURS + "</p></td></tr>" +
                    "<tr><td><p id='allDay'>Open Allday: " + data.data[i].ALLDAY + "</p></td></tr>" +
                    "<tr><td><p>Open Weekends: " + data.data[i].WEEKENDS + "</p></td></tr>";
        }
        else if (pageId === "food") {
            toAdd = toAdd + "<tr><td><p id='price'>Price: " + data.data[i].PRICE + "</p></td></tr>";
        }
        else if (pageId === "shelter") {
            toAdd = toAdd + "<tr><td><p id='gender'>Gender:" + data.data[i].GENDER + "</p></td></tr>" +
                    "<tr><td><p>NOTES:" + data.data[i].NOTES + "</p></td></tr>";
        }

        toAdd = toAdd + "</table></td></tr></table></td></tr>";

        return toAdd;
    }
}

test('Testing medical pageId', () => {
    document.body.innerHTML =
    '<button id="searchButtonInd" />' +
    '<table id="genResults" class="results"></table>';

    var array;

    searchIndividual((da) => array = da);

    var page = "medical";

    var add = test_post(page, array);

    $(".results").append(add);

    expect($('#allDay').text()).toEqual('Open Allday: Yes');
});

test('Testing food pageId', () => {
    document.body.innerHTML =
    '<button id="searchButtonInd" />' +
    '<table id="genResults" class="results"></table>';

    var array;

    searchIndividual((da) => array = da);

    var page = "food";

    var add = test_post(page, array);

    $(".results").append(add);

    expect($('#price').text()).toEqual('Price: $');
});

test('Testing shelter pageId', () => {
    document.body.innerHTML =
    '<button id="searchButtonInd" />' +
    '<table id="genResults" class="results"></table>';

    var array;

    searchIndividual((da) => array = da);

    var page = "shelter";

    var add = test_post(page, array);

    $(".results").append(add);

    expect($('#gender').text()).toEqual('Gender:Male Only');
});

test('Testing empty search', () => {
    document.body.innerHTML =
    '<button id="searchButtonInd" />' +
    '<table id="genResults" class="results"></table>';

    var array;

    searchIndividual((da) => array = da);

    var page = "shelter";

    var add = test_post(page, array);

    $(".results").append(add);

    expect($('#empty').text()).toEqual('No Results Found');
});