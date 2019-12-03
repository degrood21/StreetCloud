/**
 * streetcloudNavigation.js
 * 
 * Holds all of our main functionality for the website
 * -Filters- -Post Methods- -Distance Calulations- -ETC-
 * 
 * Authored by The StreetCloud Development Team
 * 
 */
   
/* Authored by Kelsi Cruz */
/* External Citation */
/* Adapted geolocation code from: https://www.w3schools.com/html/html5_geolocation.asp */
/* and: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition */
var usercoords;
/**
 * getLocation function
 * 
 * Gets the user location from the browser
 * Throws an error if one of the 4 errors listed occurred
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
    return usercoords;
  } 
  
  else {
    alert("Geolocation is not supported by this browser.");
    return null;
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}

/**
 * getPosition function
 * 
 * Callback function returning user coordinates
 * from getLocation
 * 
 * @param pos Holds the latitude and Longitude of the users location
 */
function getPosition(pos) {
  var crd = pos.coords;
  
  usercoords = [crd.latitude, crd.longitude];

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  
}


/*Helps to wait to run functions once the document fully loads*/
$(document).ready(function(){

//Onclick methods for the main screen
//When one is clicked it loads up the correct html

document.getElementById("headerButton").onclick = function() {
    location.href = "/../streetcloud.html";
};
document.getElementById("medicalButton").onclick = function() {
    location.href = "/../streetcloud_medical.html";
    

};
document.getElementById("foodButton").onclick = function() {
    location.href = "/../streetcloud_food.html";
};
document.getElementById("shelterButton").onclick = function() {
    location.href = "/../streetcloud_shelter.html";
};
document.getElementById("otherButton").onclick = function() {
    location.href = "/../streetcloud_other.html";
};
document.getElementById("aboutUs").onclick = function() {
    location.href = "/../streetcloud_about.html";
};
document.getElementById("registerForm").onclick = function() {
    location.href = "/../streetcloud_register_form.html";
};
document.getElementById("homeFooterButton").onclick = function() {
    location.href = "/../streetcloud.html";
};
document.getElementById("contactUS").onclick = function(){
    location.href = "/../streetcloud_about.html#contactheader";
};
document.getElementById("volunteerButton").onclick = function() {
    location.href = "/../streetcloud_volunteer_page.html";
};

});

var allData = "false";//used for clear all filters button

//TClick function for the searchButton on the main page
//Puts the item that was searched for and loads it into local storage
//Then changes page to the search html page to show results
$("#searchButton").click(function() {
    var searchFor = $("#searchText").val();
    sessionStorage.setItem("query", searchFor);
    //var test_dist = haversineDistance(univ_portland,shelter_test);
    //console.log("TEST DISTANCE: " + test_dist);
    //sessionStorage.setItem("DISTANCE: ", coolDistance);
    location.href = "/../streetcloud_gen_search.html";
});

/*
* Implements the enter button to work for the search bar.
* event.keyCode can be equal to a range of values that accounts for
* keyboard keys. The enter key is value 13 and if enter is pressed, it calls
* the above click method on the selector #searchButton.
*/
$("#searchText").keyup(function(event){
    if(event.keyCode == 13){
        $("#searchButton").click();
    }
});

$("#searchText").keyup(function(event){
    if(event.keyCode == 13){
        $("#searchButtonInd").click();
    }
});

//listens for the search button click
//from all other htmls
$("#searchButtonInd").click(function() {
    var searchFor = $("#searchText").val();
    var pageId = $("#pageId").html();//gets what page is calling
    pageId = pageId.toLowerCase();

    if (pageId === "search results") {
        sessionStorage.setItem("query", searchFor);
        querySearch();
    }
    else if (pageId === "medical"){
        sessionStorage.setItem("medicalQuery", searchFor);
        medicalFunction();
    }
    else if (pageId === "food"){
        sessionStorage.setItem("foodQuery", searchFor);
        foodFunction();
    }
    else if (pageId === "shelter"){
        sessionStorage.setItem("shelterQuery", searchFor);
        shelterFunction();
    }
    else if (pageId === "libraries"){
        sessionStorage.setItem("libraryQuery", searchFor);
        libraryFunction();
    }
    else if (pageId === "Public Restrooms"){
        sessionStorage.setItem("restroomQuery", searchFor);
        publicRestroomFunction();
    }

    else {
        $(document).ready(function () {
            //sends the post call to retrieve the data form database
            $.post('/searchIndividualPage',
                {
                    inquiry: searchFor,
                    source: pageId
                },
                //creates together the table depending on which page it needs to append the results to
                function (data) {
                    $(".results").text("");
                    if(data.length == 0){
                        $(".results").append("<p>No Results Found</p>");
                    }
                    for (i = 0; i < data.length; i++) {
                        var toAdd = "<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                            "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                            "<td><table class='searchInfo'>" +
                            "<tr><td><p style=\"font-size:140%\"><b>" + data[i].NAME + "</b></p>" +
                            "<p style=\"font-size:95%\">" + data[i].ADDRESS + "</p>" +
                            "<p style=\"font-size:95%\">Distance: " + data[i].DISTANCE + "</p>";
                            "<a href=https://www.google.com/maps/search/?api=1&query=" + data[i].LAT + "," + data[i].LON + ">Get Directions</a>"
                        toAdd = toAdd + "</table></td></tr></table></td></tr>";

                        $(".results").append(toAdd);
                    }
                });
        });
    }

});

//Using the search value from local storage
//Will send a post request where the database
//will be searched for a word containing the search val
function querySearch() {
    const philly = { lat: 39.9526, lng: -75.1652 }
    const nyc = { lat: 40.7128, lng: -74.0060 }
    //console.log("DISTANCE: " + haversineDistance);
    function init() {
        init.searched = true;
    }
    init();
    $(document).ready(function () {
        searchFor = sessionStorage.getItem("query");

        $(".results").text("");

        if (searchFor === "") {
            var coolDistance = calculateDistance(philly, nyc);
            $("#genResults").append("<p>No Results Found</p>");
            $("#genResults").append(coolDistance);
        }
        else {
            $.post('/searchPage',
                {
                    inquiry: searchFor
                },
                function (data) {
                    if(data.length == 0){
                        $("#genResults").append("<p>No Results Found</p>");
                        $("#genResults").append(coolDistance);
                    }
                    //Loops through the result array of database entries from search results
                    //creates a new table for each entry and appends it to streetcloud_gen_search.html
                    for (i = 0; i < data.length; i++) 
                    {
                        $("#genResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                            "<img src='" + data[i].Image + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                            "<td><table class='searchInfo'>" +
                            "<tr><td><p style=\"font-size:140%\"><b>" + data[i].Name + "</b></p>" +
                            "<p style=\"font-size:95%\">" + data[i].Address + "</p>" +
                            "<p style=\"font-size:95%\">Distance: " + data[i].Distance + "</p>" +
                            "<a href=https://www.google.com/maps/search/?api=1&query=" + data[i].LAT + "," + data[i].LON + ">Get Directions</a>" +
                            "</table></td></tr></table></td></tr>");
                            
                    }
                });
        }
    });
}
/**
 * clearFilter function
 * 
 * Clears the filters on a the page calling
 * then sends a search query for all data from
 * database using var @param allData being set to true
 * 
 * @param id - This is the id that the button linked
 * to this function sends in this.id so I can see which
 * clear filter button called this function
 */
function clearFilter(id){
    
    $(document).ready(function () {

        // Checks to see what page clear filter button
        // was pressed on
        if(id == "clearFilterMedical"){

            // Sets allData to true for query purposes
            allData = "true";

            // Deselects all filter radios on that particular page
            $('input:radio[name=urgency]:checked').prop('checked', false);
            $('input:radio[name=distance]:checked').prop('checked', false);
            $('input:radio[name=health]:checked').prop('checked', false);

            // Resets search string to a blank string to be ignored
            sessionStorage.setItem("medicalQuery", "");

            // Calls medical Function to query for data
            medicalFunction();
        }

        // Comments above are descriptive of all the rest if statements
        if(id == "clearFilterShelter"){
            allData = "true";
            $('input:radio[name=gender_pref]:checked').prop('checked', false);
            $('input:radio[name=distance]:checked').prop('checked', false);
            $('input:radio[name=food_included]:checked').prop('checked', false);
            sessionStorage.setItem("shelterQuery", "");
            shelterFunction();
        }
        if(id == "clearFilterFood"){
            allData = "true";
            $('input:radio[name=time]:checked').prop('checked', false);
            $('input:radio[name=price]:checked').prop('checked', false);
            $('input:radio[name=distance]:checked').prop('checked', false);
            sessionStorage.setItem("foodQuery", "")
            foodFunction();
        }
    });
}
/**
 * medicalFunction
 * 
 * This function will send a post asking for data 
 * depending on what filters are checked and append the correct
 * data entries from database to streetcloud_medical.html
 */
function medicalFunction() {
    //these variables will hold the string formatted for mySQL
    //in order to search the database
    var hours, distance, type;

    //seting the SQL querries based on what filter is selected 
    //special hours filters
    if (document.getElementById("weekends").checked == true ||
        document.getElementById("weekends_mobile").checked == true) {
        hours = "WEEKENDS = 'Yes'";
    }
    else if (document.getElementById("24HR").checked == true ||
        document.getElementById("24HR_mobile").checked == true) {
        hours = "ALLDAY = 'Yes'";
    }
    else{
        hours = "ALLDAY = 'Yes' OR ALLDAY = 'No'";//default search/checked
    }
    //distance filters
    if(document.getElementById("5m").checked == true ||
        document.getElementById("5m_mobile").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if (document.getElementById("10m").checked == true ||
        document.getElementById("10m_mobile").checked == true) {
        distance = "BETWEEN 0 AND 10";
    }
    else if (document.getElementById("15m+").checked == true ||
        document.getElementById("15m+_mobile").checked == true) {
        distance = "BETWEEN 0 AND 20";
    }
    else{
        distance = "BETWEEN 0 AND 2"; //default search/checked
    }
    //type filters
    if(document.getElementById("dentist").checked == true ||
        document.getElementById("dentist_mobile").checked == true){
        type = "%Dental%";
    }
    else if (document.getElementById("optometrist").checked == true ||
        document.getElementById("optometrist_mobile").checked == true) {
        type = "%Optometry%";
    }
    else if (document.getElementById("therapist").checked == true ||
        document.getElementById("therapist_mobile").checked == true) {
        type = "%Therapy%";
    }
    else {
        type = "%clinic%' OR TYPE LIKE '%hospital%"; //default search/checked
    }
    
    /**
     * This is where the query gets called and data returned
     */
    $(document).ready(function () {

        // if the search button was pressed
        // this var is getting what was searched for for the query
        var medicalQuery = sessionStorage.getItem("medicalQuery");

        // if button was not pressed then set search query as empty
        if (medicalQuery == undefined){
            medicalQuery = "";
        }

        // Post method that uses the medicalPage router to
        // send a query request and we handle the data
        // given back
        $.post('/medicalPage',
            {
                hours: hours,
                distance: distance,
                type: type,
                query: medicalQuery,
                all: allData
                // allData determines if clearFilterButton
                // was pressed so the query can be sent
                // correctly
            },

            /**
             * This function is the return callback
             * for the post method so it will have everything
             * from the query request
             * 
             * @param data is returned JSON object of database rows
             */
            function (data) {
                // Clears results table so we can populate it
                $("#medicalResults").empty();

                // if the query returned with no results then
                // tell user there was nothing found
                if (data.length == 0) {
                    $("#medicalResults").append("<p>No Results Found</p>");
                }

                // Posts this until results are loaded
                $("#medicalResults").append("<p>Results Are Loading</p>");
                var currentLat = 0; 
                var currentLon = 0;
            if (navigator.geolocation) {
                /**
                 * Function gets the users current loacation
                 * Sets up google LatLng objects for it
                 * and for all locations in JSON object from the post
                 * 
                 * @param position object with users current location info
                 */
                navigator.geolocation.getCurrentPosition(function(position) {

                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " +currentLon);

                    // Creates google object for users location
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    // Creates empty array to populate with google LatLng objects
                    // created from data returned from query
                    var distanceArr = [];
                    // If data returned has 25 or more results
                    // Push only the first 25 into array of google objects
                    // Else then do it for all results returned
                    if(data.length >= 25){
                        for(i = 0; i < 25; i++){
                            // creates google LatLng Objects and push it into array 
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else{
                        for(i = 0; i < data.length; i++){
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                    {
                        origins: [origin1],
                        destinations: distanceArr,
                        travelMode: 'WALKING',
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                    }, callback);

                    /**
                     * callback function
                     * 
                     * This function is the callback for the getDistanceMatrix
                     * to calculate the distance of the array of locations
                     * that we send it
                     * 
                     * We use the calculated distance to append all locations
                     * that came back fromt the post method and append the
                     * calculated distance to it and to the page
                     * 
                     * @param response contains the data with all calculated distances
                     * @param status is OK if distances were calculated properly
                     */
                    function callback(response, status) {
                        if (status == 'OK') {
                            // clears result div of "Results Are Loading"
                            $("#medicalResults").empty();

                            // for loop goes through each calculated distance object
                            // and gets the distance and appends it along
                            // with all database info gathered from post above
                            for(j = 0; j < response.rows[0].elements.length; j++){
                                var nothingtoShow = 0;// Used to see if something can be appended
                                var resultsDist = response.rows[0].elements;// array of calculated distances
                                var elementDist = resultsDist[j];// one calculated distance
                                var distance = elementDist.distance.text;// text that says distance
                                console.log("DISTANCE: " +distance);

                                var checkedDist = 20;// for clear all filters
                                // following if statements check to see if
                                // what filter button is checked to determine
                                // what to show the user
                                if(document.getElementById("5m").checked == true ||
                                    document.getElementById("5m_mobile").checked == true ||
                                    document.getElementById("2m").checked == true ||
                                    document.getElementById("2m_mobile").checked == true){
                                        checkedDist = 5;
                                }
                                else if (document.getElementById("10m").checked == true ||
                                    document.getElementById("10m_mobile").checked == true) {
                                        checkedDist = 10;
                                }
                                else if (document.getElementById("15m+").checked == true ||
                                    document.getElementById("15m+_mobile").checked == true) {
                                        checkedDist = 15;
                                }

                                /******** MOST RECENT CSS CHANGE!! MAKE THIS CHANGE TO EVERYTHING ELSE **********/
                                console.log("CHECKED DIST: " + checkedDist);
                                // if distance is less than distance filter then append
                                // it to the page for user to see
                                if(parseFloat(distance) <= checkedDist){
                                    $("#medicalResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                                    "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                    "<td><table class='searchInfo'>" +
                                    "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                    "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                    "<p style=\"font-size:95%\">Distance: " + distance + " Miles</p>" +
                                    "<p style=\"font-size:95%\">Type: " + data[j].TYPE + "</p>" +
                                    "<p style=\"font-size:95%\">Hours: " + data[j].HOURS + "</p>" +
                                    "<p style=\"font-size:95%\">Open Allday: " + data[j].ALLDAY + "</p>" +
                                    "<p style=\"font-size:95%\">Open Weekends: " + data[j].WEEKENDS + "</p>" +
                                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                    "</td></tr></table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;
                                /*********************************************************************************/
                                }
                                // if nothing was appended and we reached end of results then
                                // show user nothing was found
                                if((j == data.length) && nothingtoShow == 0){
                                    $("#medicalResults").append("<p>No Results Found</p>");
                                }
                            }
                            // if clear all filter was pressed then after appending everything
                            // reset allData to false so filters can be clicked once again
                            if(allData == "true"){
                                allData = "false";
                            }
                        }
                    }
        

                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                    });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });

    });

}

/*
External Citation:
I didnt know how to clear a table so i used .empty() as showed 
https://stackoverflow.com/questions/4982846/jquery-clear-empty-all-contents-of-tbody-element
Date Accessed: 10/31/19
*/

function foodFunction() {

    var distance,price,type; 

    //SQL querries for each filter  
    //the type filters 
    if(document.getElementById("fastFood").checked == true ||
        document.getElementById("fastFood_m").checked == true){
        type = "TYPE = 'Fast Food'";
    }
    else if(document.getElementById("restaurant").checked == true||
        document.getElementById("restaurant_m").checked == true){
        type = "TYPE = 'Restaurant'";
    }
    else if(document.getElementById("other").checked == true ||
        document.getElementById("other_m").checked == true){
        type = "TYPE = 'Other'";
    }
    else{
        type = "TYPE = 'Food Pantry'";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("10m").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "BETWEEN 0 AND 10";
    }
    else if(document.getElementById("10m+").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //price filters 
    if(document.getElementById("cheap").checked == true ||
        document.getElementById("cheap_m").checked == true){
        price = "PRICE = '$'";
    }
    else if(document.getElementById("medium").checked == true ||
        document.getElementById("medium_m").checked == true){
        price = "PRICE = '$$'";
    }
    else if(document.getElementById("expensive").checked == true ||
        document.getElementById("expensive_m").checked == true){
        price = "PRICE = '$$$'";
    }
    else{
        price = "PRICE = 'Free'";
    }


    $(document).ready(function () {
        var foodQuery = sessionStorage.getItem("foodQuery");
        if (foodQuery == undefined){
            foodQuery = "";
        }
        $.post('/foodPage',
        {
            distance: distance,
            price: price,
            type: type,
            query: foodQuery,
            all: allData
        },
        function (data) { 
            $("#foodResults").empty();
            if (data.length == 0) {
               $("#foodResults").append("<p>No Results Found</p>");
            }
            $("#foodResults").append("<p>Results Are Loading</p>");

            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " +currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    if(data.length >= 25){
                        for(i = 0; i < 25; i++){
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else{
                        for(i = 0; i < data.length; i++){
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                    {
                        origins: [origin1],
                        destinations: distanceArr,
                        travelMode: 'WALKING',
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                    }, callback);

                    function callback(response, status) {
                        if (status == 'OK') {
                            $("#foodResults").empty();
                            for(j = 0; j < response.rows[0].elements.length; j++){
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[j];
                                var distance = elementDist.distance.text;
                                console.log("DISTANCE: " +distance);

                                var checkedDist = 20;
                                if(document.getElementById("5m").checked == true ||
                                    document.getElementById("r_close_m").checked == true){
                                        checkedDist = 5;
                                }
                                else if(document.getElementById("10m+").checked == true ||
                                    document.getElementById("r_far_m").checked == true){
                                        checkedDist = 20;
                                }
                                else if(document.getElementById("2m").checked == true ||
                                    document.getElementById("close_m").checked == true){
                                        checkedDist = 2;
                                }
                                console.log("CHECKED DIST: " + checkedDist);
                                if(parseFloat(distance) <= checkedDist){
                                    $("#foodResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                                    "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                    "<td><table class='searchInfo'>" +
                                    "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                    "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                    "<p style=\"font-size:95%\">Distance: " + distance + "</p>" +
                                    "<p style=\"font-size:95%\">Price: " + data[j].PRICE + "</p>" +
                                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                    "</table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;
                                
                                }
                                if((j == data.length) && nothingtoShow == 0){
                                    $("#foodResults").append("<p>No Results Found</p>");
                                }
                            }
                            if(allData == "true"){
                                allData = "false";
                            }
                        }
                    }
        

                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                    });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });

    });
}

function shelterFunction() {
    var  coord_flag = false;

    var gender, distance, food;
    
    //SQL querries 
    //gender filters 
    if(document.getElementById("maleOnly").checked == true ||
        document.getElementById("maleOnly_m").checked == true){
        gender = "GENDER = 'Male'";
    }
    else if(document.getElementById("femaleOnly").checked == true ||
        document.getElementById("femaleOnly_m").checked == true){
        gender = "GENDER = 'Female'";
    }
    else{
        gender = "GENDER = 'Female' OR GENDER = 'Male'";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("10m+").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //food filters 
    if(document.getElementById("notIncluded").checked == true ||
        document.getElementById("notIncluded_m").checked == true){
        food = "FOOD = 'No'";
    }
    else{
        food = "FOOD = 'Yes'";
    }

    $(document).ready(function () {
        var source_coord = getLocation();
        console.log("Source Cordinates type: " + typeof(source_coord));
        //source_coord = new google.maps.LatLng()
        var shelterQuery = sessionStorage.getItem("shelterQuery");
        if (shelterQuery == undefined){
            shelterQuery = "";
        }
        $.post('/shelterPage',
        {
            distance: distance,
            gender: gender,
            food: food, 
            query: shelterQuery,
            all: allData
        }, 
        function (data) {
            $("#shelterResults").empty();
            if (data.length == 0) {
                $("#shelterResults").append("<p>No Results Found</p>");
            }
            $("#shelterResults").append("<p>Results Are Loading</p>");

            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " +currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    for(i = 0; i < data.length; i++){
                        distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                    }
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                    {
                        origins: [origin1],
                        destinations: distanceArr,
                        travelMode: 'WALKING',
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                    }, callback);

                    function callback(response, status) {
                        if (status == 'OK') {
                            $("#shelterResults").empty();
                            for(j = 0; j < data.length; j++){
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[j];
                                var distance = elementDist.distance.text;
                                console.log("DISTANCE: " +distance);
                                var checkedDist = 20;
                                if(document.getElementById("5m").checked == true ||
                                    document.getElementById("r_close_m").checked == true){
                                        checkedDist = 5;
                                }
                                else if(document.getElementById("10m+").checked == true ||
                                    document.getElementById("r_far_m").checked == true){
                                        checkedDist = 20;
                                }
                                else if(document.getElementById("2m").checked == true ||
                                    document.getElementById("close_m").checked == true){
                                        checkedDist = 2;
                                }
                                console.log("CHECKED DIST: " + checkedDist);
                                if(parseFloat(distance) <= checkedDist){

                                    $("#shelterResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                                        "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                        "<td><table class='searchInfo'>" +
                                        "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                        "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                        "<p style=\"font-size:95%\">Distance: " + distance + "</p>" +
                                        "<p style=\"font-size:95%\">Gender:" + data[j].GENDER + "</p>" +
                                        "<p style=\"font-size:95%\">NOTES:" + data[j].NOTES + "</p>" +
                                        "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                        "</table></td></tr></table></td></tr>");
                                        nothingtoShow += 1;
                                }
                                if((j+1 == data.length) && nothingtoShow == 0){
                                    $("#shelterResults").append("<p>No Results Found</p>");
                                }
                            }
                            if(allData == "true"){
                                allData = "false";
                            }
                        }
                    }
        

                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                    });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }

        });
    });

}


function jobsFunction(){

    var education,distance, position; 
    
    //SQL querries 
    //education filters 
    if(document.getElementById("no_hs").checked == true ||
        document.getElementById("no_hs_m").checked == true){
        education = "EDUCATION = 'No High School'";
    }
    else if(document.getElementById("s_hs").checked == true ||
        document.getElementById("s_hs_m").checked == true){
        education = "EDUCATION = 'Some High School'";
    }
    else if(document.getElementById("c_d").checked == true ||
        document.getElementById("c_d_m").checked == true){
        education = "EDUCATION = 'College'";
    }

    else{
        education = "EDUCATION = 'High School'";
    }

    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("r_far").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "BETWEEN 0 AND 10";
    }
    else if(document.getElementById("far").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //position filters 
    if(document.getElementById("f_time").checked == true ||
        document.getElementById("f_time_m").checked == true){
        position = "FULL_TIME = 'Yes'";
    }
    else{
        position = "PART_TIME = 'Yes'";
    }

    $(document).ready(function () {
        var jobQuery = sessionStorage.getItem("jobQuery");
        if (jobQuery == undefined){
            jobQuery = "";
        }
        $.post('/jobsPage',
        {
            distance: distance,
            education: education,
            position: position, 
            query: jobQuery
        }, 
        function (data) {
            $("#jobResults").empty();
            if (data.length == 0) {
                $("#jobResults").append("<p>No Results Found</p>");
            }
            for (i = 0; i < data.length; i++) {
                //this should be in a for loop if there is more data 
                $("#jobResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p style=\"font-size:140%\"><b>" + data[i].NAME + "</b></p>" +
                    "<p style=\"font-size:95%\">" + data[i].ADDRESS + "</p>" +
                    "<p style=\"font-size:95%\">Distance: " + data[i].DISTANCE + "</p>" +
                    "<p style=\"font-size:95%\">Education Level Needed: " + data[i].EDUCATION+ "</p>" +
                    "<p style=\"font-size:95%\">Part Time: " + data[i].PART_TIME + "</p>" +
                    "<p style=\"font-size:95%\">Full Time: " + data[i].FULL_TIME + "</p>" +
                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[i].LAT + "," + data[i].LON + ">Get Directions</a>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });
}

function libraryFunction(){
    var cost,distance, restroom; 
    
    //SQL querries 
    //cost filters 
    if(document.getElementById("notFree").checked == true ||
        document.getElementById("notFree_m").checked == true){
        cost = "FREE = 'No'";
    }
    else{
        cost = "FREE = 'Yes'";
    }

    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("far").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //restroom filters 
    if(document.getElementById("noRestroom").checked == true ||
        document.getElementById("noRestroom_m").checked == true){
        restroom = "PUBLIC_RESTROOM = 'No'";
    }
    else{
        restroom = "PUBLIC_RESTROOM = 'Yes'";
    }

    $(document).ready(function () {
        var libraryQuery = sessionStorage.getItem("libraryQuery");
        if (libraryQuery == undefined){
            librarybQuery = "";
        }
        $.post('/librariesPage',
        {
            distance: distance,
            cost: cost,
            restroom: restroom, 
            query: libraryQuery
        }, 
        function (data) {
            $("#libraryResults").empty();
            if (data.length == 0) {
                $("#libraryResults").append("<p>No Results Found</p>");
            }
            for (i = 0; i < data.length; i++) {
                //this should be in a for loop if there is more data 
                $("#libraryResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                    "<img src='" + data[i].IMAGE + "' height=\4\0% width=\4\0%></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p  style=\"font-size:140%\"><b>" + data[i].NAME + "</b></p>" +
                    "<p style=\"font-size:95%\">" + data[i].ADDRESS + "</p>" +
                    "<p style=\"font-size:95%\">Distance: " + data[i].DISTANCE + "</p>" +
                    "<p style=\"font-size:95%\">Hours: " + data[i].HOURS+ "</p>" +
                    "<p style=\"font-size:95%\">Restroom Access: " + data[i].PUBLIC_RESTROOM + "</p>" +
                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[i].LAT + "," + data[i].LON + ">Get Directions</a>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });
}

function daycareFunction(){
    var price,distance, times; 
    
    //SQL querries 
    //number of kids filters 
    if(document.getElementById("$$").checked == true ||
        document.getElementById("$$_m").checked == true){
        price = "PRICE = '$$'";
    }
    else if(document.getElementById("$$$").checked == true ||
        document.getElementById("$$$_m").checked == true){
        price = "PRICE = '$$$'";
    }
    else{
        price = "PRICE = '$'";
    }

    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("far").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //time filters 
    if(document.getElementById("weekends").checked == true ||
        document.getElementById("weekends_m").checked == true){
        times = "WEEKENDS = 'Yes'";
    }
    else{
        times = "WEEKDAYS = 'Yes'";
    }

    $(document).ready(function () {
        var daycareQuery = sessionStorage.getItem("daycareQuery");
        if (daycareQuery == undefined){
            daycarebQuery = "";
        }
        $.post('/daycarePage',
        {
            price: price,
            distance: distance,
            times: times, 
            query: daycareQuery
        }, 
        function (data) {
            $("#daycareResults").empty();
            if (data.length == 0) {
                $("#daycareResults").append("<p>No Results Found</p>");
            }
            for (i = 0; i < data.length; i++) {
                //this should be in a for loop if there is more data 
                $("#daycareResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p style=\"font-size:140%\"><b>" + data[i].NAME + "</b></p>" +
                    "<p style=\"font-size:95%\">" + data[i].ADDRESS + "</p>" +
                    "<p style=\"font-size:95%\">Distance: " + data[i].DISTANCE + "</p>" +
                    "<p style=\"font-size:95%\">Weekdays: " + data[i].WEEKDAYS+ "</p>" +
                    "<p style=\"font-size:95%\">Weekends: " + data[i].WEEKENDS + "</p>" +
                    "<p style=\"font-size:95%\">Price: " + data[i].PRICE + "</p>" +
                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[i].LAT + "," + data[i].LON + ">Get Directions</a>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });

}

function publicRestroomFunction(){

    var distance, times; 
    
    //SQL querries 
    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("r_far").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "BETWEEN 0 AND 20";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //time filters 
    if(document.getElementById("setTime").checked == true ||
        document.getElementById("setTime_m").checked == true){
        times = "ALLDAY = 'No'";
    }
    else{
        times = "ALLDAY = 'Yes'";
    }

    $(document).ready(function () {
        var restroomQuery = sessionStorage.getItem("restroomQuery");
        if (restroomQuery == undefined){
            trestroombQuery = "";
        }
        $.post('/publicRestroomsPage',
        {
            distance: distance,
            times: times, 
            query: restroomQuery
        }, 
        function (data) {
            $("#publicRestroomsResults").empty();
            if (data.length == 0) {
                $("#publicRestroomsResults").append("<p>No Results Found</p>");
            }
            for (i = 0; i < data.length; i++) {
                $("#publicRestroomsResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p style=\"font-size:140%\"><b>" + data[i].NAME + "</b></p>" +
                    "<p style=\"font-size:95%\">" + data[i].ADDRESS + "</p>" +
                    "<p style=\"font-size:95%\">Distance: " + data[i].DISTANCE + "</p>" +
                    "<p style=\"font-size:95%\">Open 24 Hours: " + data[i].ALLDAY+ "</p>" +
                    "<p style=\"font-size:95%\">Hours: " + data[i].HOURS + "</p>" +
                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[i].LAT + "," + data[i].LON + ">Get Directions</a>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });  
}

$(document).ready(function(){
    $(".icon").click(function() {
        if (document.getElementById("menuLinks").style.display == "none"){
            document.getElementById("menuLinks").style.display = "inline";
        } 
        else{
            document.getElementById("menuLinks").style.display = "none";
        }
    });
});
