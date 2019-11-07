'use strict'

jest.mock('../routes/searchIndividual');

test('displays food html after click', () => {
    document.body.innerHTML =
    '<button id="searchButtonInd" />' +
    '<table id="foodResults" class="results"></table>';

    require('../public/javascripts/streetcloudNavigation');

    const $ = require('jquery');
    const searchIndividual = require('../routes/searchIndividual');

    searchIndividual.mockImplementation(cb => {
        cb({
            "data":
            [{
            "IMAGE": "searchFor",
            "NAME": "food",
            "ADDRESS": "",
            "DISTANCE": "",
            "PRICE": ""
            }]
        });
    });

    //$('#searchButtonInd').click();
    $('#searchButtonInd').click(function(){
        var toAdd = "<tr><td><img src='"+ data[0].IMAGE + "' height="+100+" width="+100+"></img></td>" +
                    "<td><table class='searchResult'>" +
                    "<tr><td><p id='name'>Name: "+data[0].NAME+"</p></td></tr>" +
                    "<tr><td><p>Address: "+data[0].ADDRESS+"</p></td></tr>" +
                    "<tr><td><p>Distance: "+data[0].DISTANCE+"</p></td></tr>";
        
        toAdd = toAdd + "</table></td></tr>";
        $(".results").append(toAdd);
    });

    //expect(streetcloudNavigation).toBeCalled();
    expect($('#name').text()).toEqual('');
});