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

function sortByProperty(property) {
    return function (a, b) {
        if (parseFloat(a[property]) > parseFloat(b[property]))
            return 1;
        else if (parseFloat(a[property]) < parseFloat(b[property]))
            return -1;

        return 0;
    }
}


/*Helps to wait to run functions once the document fully loads*/
$(document).ready(function(){

//Onclick methods for the main screen
//When one is clicked it loads up the correct html

document.getElementById("headerButton").onclick = function() {
    location.href = "/../streetcloud.html";
};
document.getElementById("medicalButton").onclick = function() {
    sessionStorage.setItem("medicalQuery", "")
    location.href = "/../streetcloud_medical.html";
};
document.getElementById("foodButton").onclick = function() {
    sessionStorage.setItem("foodQuery", "")
    location.href = "/../streetcloud_food.html";
};
document.getElementById("shelterButton").onclick = function() {
    sessionStorage.setItem("shelterQuery", "")
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
    location.href = "/../streetcloud_about.html#opaqueboxContact";
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
    else if (pageId === "jobs"){
        sessionStorage.setItem("jobQuery", searchFor);
        jobsFunction();
    }
    else if(pageId == "daycare"){
        sessionStorage.setItem("daycareQuery", searchFor);
        daycareFunction();
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
            //var coolDistance = calculateDistance(philly, nyc);
            $("#genResults").append("<p>No Results Found</p>");
            //$("#genResults").append(coolDistance);
        }
        else {
            $.post('/searchPage',
                {
                    inquiry: searchFor
                },
                function (data) {
                    $("#genResults").empty();
                    if (data.length == 0) {
                        $("#genResults").append("<p>No Results Found</p>");
                    } else {
                        $("#genResults").append("<p>Results Are Loading</p>");
                    }

                    var currentLat = 0;
                    var currentLon = 0;
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            currentLat = position.coords.latitude;
                            currentLon = position.coords.longitude;
                            console.log("TESTING CURRENT LOCATION: " + currentLat + " " + currentLon);
                            var origin1 = new google.maps.LatLng(currentLat, currentLon);
                            var distanceArr = [];
                            if (data.length >= 25) {
                                for (i = 0; i < 25; i++) {
                                    distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                                }
                            }
                            else {
                                for (i = 0; i < data.length; i++) {
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
                                    $("#genResults").empty();
                                    data = data.slice(0, 25)
                                    console.log(data);
                                    console.log(response.rows[0].elements)
                                    console.log(response.rows[0].elements.length + "BREAK" + data.length);
                                    for (i = 0; i < response.rows[0].elements.length; i++) {
                                        var nothingtoShow = 0;
                                        var resultsDist = response.rows[0].elements;
                                        var elementDist = resultsDist[i];
                                        var distance = elementDist.distance.text;
                                        data[i].Distance = distance
                                        console.log(distance+"DISTAJFH");
                                    }
                                    data.sort(sortByProperty("Distance"));
                                    var nothingtoShow = 0;
                                    for (j = 0; j < response.rows[0].elements.length; j++) {
                                        $("#genResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                                            "<img src='" + data[j].Image + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                            "<td><table class='searchInfo'>" +
                                            "<tr><td><p style=\"font-size:140%\"><b>" + data[j].Name + "</b></p>" +
                                            "<p style=\"font-size:95%\">" + data[j].Address + "</p>" +
                                            "<p style=\"font-size:95%\">Distance: " + data[j].Distance + "</p>" +
                                            "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                            "</table></td></tr></table></td></tr>");
                                        nothingtoShow += 1;
                                    }
                                    if (nothingtoShow == 0) {
                                        $("#foodResults").append("<p>No Results Found</p>");
                                    }
                                }
                            }


                        }, function () {
                            handleLocationError(true, infoWindow, map.getCenter());
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());
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
        if(id == "clearFilterJob"){
            allData = "true";
            $('input:radio[name=education]:checked').prop('checked', false);
            $('input:radio[name=distance]:checked').prop('checked', false);
            $('input:radio[name=position]:checked').prop('checked', false);
            sessionStorage.setItem("jobQuery", "")
            jobsFunction();
        }
        if(id == "clearFilterLibrary"){
            allData = "true";
            $('input:radio[name=cost]:checked').prop('checked', false);
            $('input:radio[name=distance]:checked').prop('checked', false);
            $('input:radio[name=restroom_included]:checked').prop('checked', false);
            sessionStorage.setItem("libraryQuery", "")
            libraryFunction();
        }
        if(id == "clearFilterDaycare"){
            allData = "true";
            $('input:radio[name=price]:checked').prop('checked', false);
            $('input:radio[name=distance]:checked').prop('checked', false);
            $('input:radio[name=careTime]:checked').prop('checked', false);
            sessionStorage.setItem("daycareQuery", "")
            daycareFunction();
        }
        if(id == "clearFilterPublic"){
            allData = "true";
            $('input:radio[name=distance]:checked').prop('checked', false);
            $('input:radio[name=careTime]:checked').prop('checked', false);
            sessionStorage.setItem("restroomQuery", "")
            publicRestroomFunction();
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
    var nothingChecked = false;

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
        hours = "1=1";//default search/checked
    }
    //distance filters
    if(document.getElementById("5m").checked == true ||
        document.getElementById("5m_mobile").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if (document.getElementById("2m").checked == true ||
        document.getElementById("2m_mobile").checked == true) {
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else if (document.getElementById("15m+").checked == true ||
        document.getElementById("15m+_mobile").checked == true) {
        distance = "DISTANCE BETWEEN 0 AND 20";
    }
    else{
        distance = "1=1";
    }
    //type filters
    if(document.getElementById("dentist").checked == true ||
        document.getElementById("dentist_mobile").checked == true){
        type = 'TYPE LIKE "%Dental%"';
    }
    else if (document.getElementById("optometrist").checked == true ||
        document.getElementById("optometrist_mobile").checked == true) {
        type = 'TYPE LIKE "%Optometry%"';
    }
    else if (document.getElementById("therapist").checked == true ||
        document.getElementById("therapist_mobile").checked == true) {
        type = 'TYPE LIKE "%Therapy%"';
    }
    else if (document.getElementById("generalHealthCare").checked == true ||
        document.getElementById("generalHealthCare_mobile").checked == true){
        type = 'TYPE LIKE "%clinic%" OR TYPE LIKE "%hospital%"'; //default search/checked
    }
    else{
        type = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
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
                all: allData,
                nothing: nothingChecked
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
                }else{
                    $("#medicalResults").append("<p>Results Are Loading</p>");
                }

                // Posts this until results are loaded
                
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
                            data = data.slice(0, 25)
                            for (i = 0; i < response.rows[0].elements.length; i++) {
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            // for loop goes through each calculated distance object
                            // and gets the distance and appends it along
                            // with all database info gathered from post above
                            var nothingtoShow = 0;
                            for(j = 0; j < response.rows[0].elements.length; j++){
                                var checkedDist = 20;// for clear all filters
                                // following if statements check to see if
                                // what filter button is checked to determine
                                // what to show the user
                                if(document.getElementById("5m").checked == true ||
                                    document.getElementById("5m_mobile").checked == true){
                                        checkedDist = 5;
                                }
                                else if (document.getElementById("2m").checked == true ||
                                    document.getElementById("2m_mobile").checked == true) {
                                        checkedDist = 2;
                                }
                                else if (document.getElementById("15m+").checked == true ||
                                    document.getElementById("15m+_mobile").checked == true) {
                                        checkedDist = 15;
                                }

                                /******** MOST RECENT CSS CHANGE!! MAKE THIS CHANGE TO EVERYTHING ELSE **********/
                                console.log("CHECKED DIST: " + checkedDist);
                                // if distance is less than distance filter then append
                                // it to the page for user to see
                                if(parseFloat(data[j].DISTANCE) <= checkedDist){
                                    $("#medicalResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                                    "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                    "<td><table class='searchInfo'>" +
                                    "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                    "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                    "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + " Miles</p>" +
                                    "<p style=\"font-size:95%\">Type: " + data[j].TYPE + "</p>" +
                                    "<p style=\"font-size:95%\">Hours: " + data[j].HOURS + "</p>" +
                                    "<p style=\"font-size:95%\">Open Allday: " + data[j].ALLDAY + "</p>" +
                                    "<p style=\"font-size:95%\">Open Weekends: " + data[j].WEEKENDS + "</p>" +
                                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                    "</td></tr></table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;
                                /*********************************************************************************/
                                }
                            }
                            // if nothing was appended and we reached end of results then
                            // show user nothing was found
                            if (nothingtoShow == 0) {
                                $("#medicalResults").append("<p>No Results Found</p>");
                            }
                            // if clear all filter was pressed then after appending everything
                            // reset allData to false so filters can be clicked once again
                            if(allData == "true"){
                                allData = "false";
                            }
                            if (nothingChecked == "true") {
                                nothingChecked == "false"
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
    var nothingChecked = false;
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
    else if (document.getElementById("pantry").checked == true ||
        document.getElementById("pantry_m").checked == true){
        type = "TYPE = 'Food Pantry'";
    }
    else{
        type = "1=1";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if(document.getElementById("10m").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 10";
    }
    else if(document.getElementById("10m+").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 15";
    }
    else if (document.getElementById("2m").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else{
        distance = "1=1";
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
    else if (document.getElementById("free").checked == true ||
        document.getElementById("free_m").checked == true){
        price = "PRICE = 'Free'";
    }
    else{
        price = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
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
            all: allData,
            nothing: nothingChecked
        },
        function (data) { 
            $("#foodResults").empty();
            if (data.length == 0) {
               $("#foodResults").append("<p>No Results Found</p>");
            }else{
                $("#foodResults").append("<p>Results Are Loading</p>");
            }

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
                            data = data.slice(0,25)
                            for (i = 0; i < response.rows[0].elements.length; i++) {
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            var nothingtoShow = 0;
                            for(j = 0; j < response.rows[0].elements.length; j++){

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
                                if(parseFloat(data[j].DISTANCE) <= checkedDist){
                                    $("#foodResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg>" +
                                    "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                    "<td><table class='searchInfo'>" +
                                    "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                    "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                    "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + "</p>" +
                                    "<p style=\"font-size:95%\">Price: " + data[j].PRICE + "</p>" +
                                    "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                    "</table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;
                                
                                }
                            }
                            if(nothingtoShow == 0){
                                $("#foodResults").append("<p>No Results Found</p>");
                            }
                            if(allData == "true"){
                                allData = "false";
                            }
                            if(nothingChecked == "true"){
                                nothingChecked == "false"
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
    var gender, distance, food;
    var nothingChecked = false;
    
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
        gender = "1=1";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if(document.getElementById("10m+").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 15";
    }
    else if(document.getElementById("2m").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else{
        distance = "(1=1)";
    }

    //food filters 
    if(document.getElementById("notIncluded").checked == true ||
        document.getElementById("notIncluded_m").checked == true){
        food = "FOOD = 'No'";
    }
    else if(document.getElementById("included").checked == true ||
        document.getElementById("included_m").checked == true){
        food = "FOOD = 'Yes'";
    }
    else{
        food = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
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
            all: allData,
            nothing: nothingChecked
        }, 
        function (data) {
            $("#shelterResults").empty();
            if (data.length == 0) {
                $("#shelterResults").append("<p>No Results Found</p>");
            }else{
                $("#shelterResults").append("<p>Results Are Loading</p>");
            }
            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " +currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    if (data.length >= 25) {
                        for (i = 0; i < 25; i++) {
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else {
                        for (i = 0; i < data.length; i++) {
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
                            $("#shelterResults").empty();
                            for (i = 0; i < response.rows[0].elements.length; i++){
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            var nothingtoShow = 0;
                            for(j = 0; j < data.length; j++){
                                
                                //console.log("DISTANCE: " +distance);
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
                                if(parseFloat(data[j].DISTANCE) <= checkedDist){

                                    $("#shelterResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                                        "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                        "<td><table class='searchInfo'>" +
                                        "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                        "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                        "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + "</p>" +
                                        "<p style=\"font-size:95%\">Gender:" + data[j].GENDER + "</p>" +
                                        "<p style=\"font-size:95%\">NOTES:" + data[j].NOTES + "</p>" +
                                        "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                        "</table></td></tr></table></td></tr>");
                                        nothingtoShow += 1;
                                }
                            }
                            if(nothingtoShow == 0){
                                $("#shelterResults").append("<p>No Results Found</p>");
                            }
                            if(allData == "true"){
                                allData = "false";
                            }
                            if(nothingChecked == "true"){
                                nothingChecked == "false"
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
    var nothingChecked = false;
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
    else if (document.getElementById("hs_d").checked == true ||
        document.getElementById("hs_d_m").checked == true){
        education = "EDUCATION = 'High School'";
    }
    else{
        education = "1=1";
    }

    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if(document.getElementById("r_far").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 10";
    }
    else if (document.getElementById("close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else{
        distance = "(1=1)";
    }

    //position filters 
    if(document.getElementById("f_time").checked == true ||
        document.getElementById("f_time_m").checked == true){
        position = "FULL_TIME = 'Yes'";
    }
    else if (document.getElementById("p_time").checked == true ||
        document.getElementById("p_time_m").checked == true){
        position = "PART_TIME = 'Yes'";
    }
    else{
        position = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
    }

    $(document).ready(function () {
        var source_coord = getLocation();

        var jobQuery = sessionStorage.getItem("jobQuery");
        if (jobQuery == undefined){
            jobQuery = "";
        }
        $.post('/jobsPage',
        {
            distance: distance,
            education: education,
            position: position, 
            query: jobQuery,
            all: allData,
            nothing: nothingChecked
        }, 
        function (data) {
            $("#jobResults").empty();
            if (data.length == 0) {
                $("#jobResults").append("<p>No Results Found</p>");
            } else {
                $("#jobResults").append("<p>Results Are Loading</p>");
            }
            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " + currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    if (data.length >= 25) {
                        for (i = 0; i < 25; i++) {
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else {
                        for (i = 0; i < data.length; i++) {
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
                            $("#jobResults").empty();
                            data = data.slice(0, 25)
                            for (i = 0; i < response.rows[0].elements.length; i++) {
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            var nothingtoShow = 0;
                            for (j = 0; j < response.rows[0].elements.length; j++) {
                                console.log("DISTANCE: " + distance);
                                var checkedDist = 20;
                                if (document.getElementById("r_close").checked == true ||
                                    document.getElementById("r_close_m").checked == true) {
                                    checkedDist = 5;
                                }
                                else if (document.getElementById("r_far").checked == true ||
                                    document.getElementById("r_far_m").checked == true) {
                                    checkedDist = 20;
                                }
                                else if (document.getElementById("close").checked == true ||
                                    document.getElementById("close_m").checked == true) {
                                    checkedDist = 2;
                                }
                                console.log("CHECKED DIST: " + checkedDist);
                                if (parseFloat(distance) <= checkedDist) {

                                    $("#jobResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                                        "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                        "<td><table class='searchInfo'>" +
                                        "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                        "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                        "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + "</p>" +
                                        "<p style=\"font-size:95%\">Education Level Needed: " + data[j].EDUCATION + "</p>" +
                                        "<p style=\"font-size:95%\">Part Time: " + data[j].PART_TIME + "</p>" +
                                        "<p style=\"font-size:95%\">Full Time: " + data[j].FULL_TIME + "</p>" +
                                        "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                        "</table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;
                                }
                            }
                            if (nothingtoShow == 0) {
                                $("#jobResults").append("<p>No Results Found</p>");
                            }
                            if (allData == "true") {
                                allData = "false";
                            }
                            if(nothingChecked == "true"){
                                nothingChecked == "false"
                            }
                        }
                    }


                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });
    });
}

function libraryFunction(){
    var cost,distance, restroom; 
    var nothingChecked = false;
    
    //SQL querries 
    //cost filters 
    if(document.getElementById("notFree").checked == true ||
        document.getElementById("notFree_m").checked == true){
        cost = "FREE = 'No'";
    }
    else if(document.getElementById("free").checked == true ||
        document.getElementById("free_m").checked == true){
        cost = "FREE = 'Yes'";
    }
    else{
        cost = "1=1";
    }

    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if(document.getElementById("far").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 15";
    }
    else if (document.getElementById("close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else{
        distance = "1=1";
    }

    //restroom filters 
    if(document.getElementById("noRestroom").checked == true ||
        document.getElementById("noRestroom_m").checked == true){
        restroom = "PUBLIC_RESTROOM = 'No'";
    }
    else if(document.getElementById("restroom").checked == true ||
        document.getElementById("restroom_m").checked == true){
        restroom = "PUBLIC_RESTROOM = 'Yes'";
    }
    else{
        restroom = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
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
            query: libraryQuery,
            all: allData,
            nothing: nothingChecked
        }, 
        function (data) {
            $("#libraryResults").empty();
            if (data.length == 0) {
                $("#libraryResults").append("<p>No Results Found</p>");
            } else {
                $("#libraryResults").append("<p>Results Are Loading</p>");
            }

            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " + currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    if (data.length >= 25) {
                        for (i = 0; i < 25; i++) {
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else {
                        for (i = 0; i < data.length; i++) {
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
                            $("#libraryResults").empty();
                            data = data.slice(0, 25)
                            for (i = 0; i < response.rows[0].elements.length; i++) {
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            var nothingtoShow = 0;
                            for (j = 0; j < response.rows[0].elements.length; j++) {

                                var checkedDist = 20;
                                if (document.getElementById("r_close").checked == true ||
                                    document.getElementById("r_close_m").checked == true) {
                                    checkedDist = 5;
                                }
                                else if (document.getElementById("far").checked == true ||
                                    document.getElementById("far_m").checked == true) {
                                    checkedDist = 20;
                                }
                                else if (document.getElementById("close").checked == true ||
                                    document.getElementById("close_m").checked == true) {
                                    checkedDist = 2;
                                }
                                console.log("CHECKED DIST: " + checkedDist);
                                if (parseFloat(data[j].DISTANCE) <= checkedDist) {
                                    $("#libraryResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                                        "<img src='" + data[j].IMAGE + "' height="+100+" width="+100+"></img></td>" +
                                        "<td><table class='searchInfo'>" +
                                        "<tr><td><p  style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                        "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                        "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + "</p>" +
                                        "<p style=\"font-size:95%\">Hours: " + data[j].HOURS + "</p>" +
                                        "<p style=\"font-size:95%\">Restroom Access: " + data[j].PUBLIC_RESTROOM + "</p>" +
                                        "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                        "</table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;

                                }
                            }
                            if (nothingtoShow == 0) {
                                    $("#libraryResults").append("<p>No Results Found</p>");
                            }
                            if (allData == "true") {
                                allData = "false";
                            }
                            if (nothingChecked == "true") {
                                nothingChecked == "false"
                            }
                        }
                    }


                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });
    });
}

function daycareFunction(){
    var price,distance, times; 
    var nothingChecked = false;
    
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
    else if (document.getElementById("$").checked == true ||
        document.getElementById("$_m").checked == true){
        price = "PRICE = '$'";
    }
    else{
        price = "1=1";
    }

    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if(document.getElementById("far").checked == true ||
        document.getElementById("far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 15";
    }
    else if(document.getElementById("close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else{
        distance = "1=1";
    }

    //time filters 
    if(document.getElementById("weekends").checked == true ||
        document.getElementById("weekends_m").checked == true){
        times = "WEEKENDS = 'Yes'";
    }
    else if (document.getElementById("weekdays").checked == true ||
        document.getElementById("weekdays_m").checked == true){
        times = "WEEKDAYS = 'Yes'";
    }
    else{
        times = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
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
            query: daycareQuery,
            all: allData,
            nothing: nothingChecked
        }, 
        function (data) {
            $("#daycareResults").empty();
            if (data.length == 0) {
                $("#daycareResults").append("<p>No Results Found</p>");
            } else {
                $("#daycareResults").append("<p>Results Are Loading</p>");
            }

            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " + currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    if (data.length >= 25) {
                        for (i = 0; i < 25; i++) {
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else {
                        for (i = 0; i < data.length; i++) {
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
                            $("#daycareResults").empty();
                            data = data.slice(0, 25)
                            for (i = 0; i < response.rows[0].elements.length; i++) {
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            var nothingtoShow = 0;
                            for (j = 0; j < response.rows[0].elements.length; j++) {

                                var checkedDist = 20;
                                if (document.getElementById("r_close").checked == true ||
                                    document.getElementById("r_close_m").checked == true) {
                                    checkedDist = 5;
                                }
                                else if (document.getElementById("far").checked == true ||
                                    document.getElementById("far_m").checked == true) {
                                    checkedDist = 20;
                                }
                                else if (document.getElementById("close").checked == true ||
                                    document.getElementById("close_m").checked == true) {
                                    checkedDist = 2;
                                }
                                console.log("CHECKED DIST: " + checkedDist);
                                if (parseFloat(data[j].DISTANCE) <= checkedDist) {
                                    $("#daycareResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                                        "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                        "<td><table class='searchInfo'>" +
                                        "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                        "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                        "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + "</p>" +
                                        "<p style=\"font-size:95%\">Weekdays: " + data[j].WEEKDAYS + "</p>" +
                                        "<p style=\"font-size:95%\">Weekends: " + data[j].WEEKENDS + "</p>" +
                                        "<p style=\"font-size:95%\">Price: " + data[j].PRICE + "</p>" +
                                        "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                        "</table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;

                                }
                            }
                            if (nothingtoShow == 0) {
                                $("#daycareResults").append("<p>No Results Found</p>");
                            }
                            if (allData == "true") {
                                allData = "false";
                            }
                            if (nothingChecked == "true") {
                                nothingChecked == "false"
                            }
                        }
                    }


                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });
    });

}

function publicRestroomFunction(){
    var nothingChecked = false;
    var distance, times; 
    
    //SQL querries 
    //distance filters 
    if(document.getElementById("r_close").checked == true ||
        document.getElementById("r_close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 5";
    }
    else if(document.getElementById("r_far").checked == true ||
        document.getElementById("r_far_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 20";
    }
    else if (document.getElementById("close").checked == true ||
        document.getElementById("close_m").checked == true){
        distance = "DISTANCE BETWEEN 0 AND 2";
    }
    else{
        distance = "1=1";
    }

    //time filters 
    if(document.getElementById("setTime").checked == true ||
        document.getElementById("setTime_m").checked == true){
        times = "ALLDAY = 'No'";
    }
    else if(document.getElementById("24hr").checked == true ||
        document.getElementById("24hr_m").checked == true){
        times = "ALLDAY = 'Yes'";
    }
    else{
        times = "1=1";
    }

    if ($("input[type=radio]:checked").length == 0) {
        nothingChecked = true;
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
            query: restroomQuery,
            all: allData,
            nothing: nothingChecked
        }, 
        function (data) {
            $("#publicRestroomsResults").empty();
            if (data.length == 0) {
                $("#publicRestroomsResults").append("<p>No Results Found</p>");
            } else {
                $("#publicRestroomsResults").append("<p>Results Are Loading</p>");
            }

            var currentLat = 0;
            var currentLon = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    currentLat = position.coords.latitude;
                    currentLon = position.coords.longitude;
                    console.log("TESTING CURRENT LOCATION: " + currentLat + " " + currentLon);
                    var origin1 = new google.maps.LatLng(currentLat, currentLon);
                    var distanceArr = [];
                    if (data.length >= 25) {
                        for (i = 0; i < 25; i++) {
                            distanceArr.push(new google.maps.LatLng(data[i].LAT, data[i].LON));
                        }
                    }
                    else {
                        for (i = 0; i < data.length; i++) {
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
                            $("#publicRestroomsResults").empty();
                            data = data.slice(0, 25)
                            for (i = 0; i < response.rows[0].elements.length; i++) {
                                var nothingtoShow = 0;
                                var resultsDist = response.rows[0].elements;
                                var elementDist = resultsDist[i];
                                var distance = elementDist.distance.text;
                                data[i].DISTANCE = distance
                            }
                            data.sort(sortByProperty("DISTANCE"));
                            var nothingtoShow = 0;
                            for (j = 0; j < response.rows[0].elements.length; j++) {

                                var checkedDist = 20;
                                if (document.getElementById("r_close").checked == true ||
                                    document.getElementById("r_close_m").checked == true) {
                                    checkedDist = 5;
                                }
                                else if (document.getElementById("r_far").checked == true ||
                                    document.getElementById("r_far_m").checked == true) {
                                    checkedDist = 20;
                                }
                                else if (document.getElementById("close").checked == true ||
                                    document.getElementById("close_m").checked == true) {
                                    checkedDist = 2;
                                }
                                console.log("CHECKED DIST: " + checkedDist);
                                if (parseFloat(data[j].DISTANCE) <= checkedDist) {
                                    $("#publicRestroomsResults").append("<tr><td><table class='searchResult'><tr><td id=tableimg> " +
                                        "<img src='" + data[j].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                                        "<td><table class='searchInfo'>" +
                                        "<tr><td><p style=\"font-size:140%\"><b>" + data[j].NAME + "</b></p>" +
                                        "<p style=\"font-size:95%\">" + data[j].ADDRESS + "</p>" +
                                        "<p style=\"font-size:95%\">Distance: " + data[j].DISTANCE + "</p>" +
                                        "<p style=\"font-size:95%\">Open 24 Hours: " + data[j].ALLDAY + "</p>" +
                                        "<p style=\"font-size:95%\">Hours: " + data[j].HOURS + "</p>" +
                                        "<a href=https://www.google.com/maps/search/?api=1&query=" + data[j].LAT + "," + data[j].LON + ">Get Directions</a>" +
                                        "</table></td></tr></table></td></tr>");
                                    nothingtoShow += 1;

                                }
                            }
                            if (nothingtoShow == 0) {
                                $("#publicRestroomsResults").append("<p>No Results Found</p>");
                            }
                            if (allData == "true") {
                                allData = "false";
                            }
                            if (nothingChecked == "true") {
                                nothingChecked == "false"
                            }
                        }
                    }


                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });
    });  
}

