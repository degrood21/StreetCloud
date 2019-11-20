
//var distance = require('google-distance-matrix');
//import { google } from 'google-distance-matrix';
//src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"
//src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"

    //const philly = { lat: 39.9526, lng: -75.1652 }
    //const nyc = { lat: 40.7128, lng: -74.0060 }



    /*
    * The DistanceMatrixService.getDistanceMatrix() method 
    * initiates a request to the Distance Matrix service, passing it a 
    * DistanceMatrixRequest object literal containing the origins, 
    * destinations, and travel mode, as well as a callback method to 
    * execute upon receipt of the response.
    */
    function calculateDistance(origin, destination) {
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
    }
  
    function callback(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        $('#result').html(err);
      } else {
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
          $('#result').html("Better get on a plane. There are no roads between " 
                            + origin + " and " + destination);
        } else {
          var distance = response.rows[0].elements[0].distance;
          var distance_value = distance.value;
          var distance_text = distance.text;
          var miles = distance_text.substring(0, distance_text.length - 3);
          $('#result').html("It is " + miles + " miles from " + origin + " to " + destination);
        }
      }
    }
      
    $('#distance_form').submit(function(e){
        event.preventDefault();
        var origin = $('#origin').val();
        var destination = $('#destination').val();
        var distance_text = calculateDistance(origin, destination);
    });
   

    
   
   
   /* Authored by Kelsi Cruz */

/* External Citation */
/* Adapted geolocation code from: https://www.w3schools.com/html/html5_geolocation.asp */
/* and: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition */
var usercoords;
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

function getPosition(pos) {
  var crd = pos.coords;
  
  usercoords = [crd.latitude, crd.longitude];

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}



/* External Citation */
/* Haversine formula and codebase used was obtained from: https://www.movable-type.co.uk/scripts/latlong.html */
/* Adapted code from user Nathan Lippi on StackOverflow: https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript */

function haversineDistance(source, destination) { //source and destination are passed in longitutde/latitude 
    //toRad converts lat and lon coords into radians
    console.log("SOURCE: " + source)
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var sourceLon = source[0]; //set the long and lat values
    var sourceLat = source[1];
  
    var destLon = destination[0];
    var destLat = destination[1];
  
    var R = 6371; // earth's radius in km 
  
    var x1 = destLat - sourceLat;
    var finalLat = toRad(x1);
    var x2 = destLon - sourceLon;
    var finalLon = toRad(x2);
    var a = Math.sin(finalLat / 2) * Math.sin(finalLat / 2) +
      Math.cos(toRad(sourceLat)) * Math.cos(toRad(destLat)) *
      Math.sin(finalLon / 2) * Math.sin(finalLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
  
    distance /= 1.60934; // convert to miles
  
    return distance;
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
document.getElementById("volunteer").onclick = function() {
    location.href = "/../streetcloud_register_form.html";
};

});


const philly = [39.9526, -75.1652]
const nyc = [40.7128, -74.0060]
const univ_portland = [45.5732, -122.7276]
const shelter_test = [45.522917, -122.688438]

//Click function for the searchButton on the main page
//Puts the item that was searched for and loads it into local storage
//Then changes page to the search html page to show results
$("#searchButton").click(function() {
    var searchFor = $("#searchText").val();
    sessionStorage.setItem("query", searchFor);
    var test_dist = haversineDistance(univ_portland,shelter_test);
    console.log("TEST DISTANCE: " + test_dist);
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
                        var toAdd = "<tr><td><table class='searchResult'><tr><td>" +
                            "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                            "<td><table class='searchInfo'>" +
                            "<tr><td><p>Name: " + data[i].NAME + "</p></td></tr>" +
                            "<tr><td><p>Address: " + data[i].ADDRESS + "</p></td></tr>" +
                            "<tr><td><p>Distance: " + data[i].DISTANCE + "</p></td></tr>";
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
            var coolDistance = haversineDistance(philly, nyc);
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
                        $("#genResults").append("<tr><td><table class='searchResult'><tr><td>" +
                            "<img src='" + data[i].Image + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                            "<td><table class='searchInfo'>" +
                            "<tr><td><p>Name: " + data[i].Name + "</p></td></tr>" +
                            "<tr><td><p>Address: " + data[i].Address + "</p></td></tr>" +
                            "<tr><td><p>Distance: " + data[i].haversineDistance(univ_portland, shelter_test) + "</p></td></tr>" +
                            "</table></td></tr></table></td></tr>");
                    }
                });
        }
    });
}


//This function will send a post asking for data 
//depending on what filters are checked and append the correct
//data entries from database to streetcloud_medical.html
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
        type = "%clinic%' OR TYPE LIKE '%hospital%";
    }
    

    $(document).ready(function () {
        var medicalQuery = sessionStorage.getItem("medicalQuery");
        if (medicalQuery == undefined){
            medicalQuery = "";
        }

        $.post('/medicalPage',
            {
                hours: hours,
                distance: distance,
                type: type,
                query: medicalQuery
            },
            function (data) {
                $("#medicalResults").empty();
                if (data.length == 0) {
                    $("#medicalResults").append("<p>No Results Found</p>");
                    $("#medImage").attr("src", "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
                }
                for (i = 0; i < data.length; i++) 
                {
                    $("#medicalResults").append("<tr><td><table class='searchResult'><tr><td>" +
                        "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                        "<td><table class='searchInfo'>" +
                        "<tr><td><p>Name: " + data[i].NAME + "</p></td>" +
                        "<tr><td><p>Address: " + data[i].ADDRESS + "</p></td>" +
                        "<tr><td><p>Distance: " + data[i].DISTANCE + " Miles</p></td>" +
                        "<tr><td><p>Type: " + data[i].TYPE + "</p></td>" +
                        "<tr><td><p>Hours: " + data[i].HOURS + "</p></td>" +
                        "<tr><td><p>Open Allday: " + data[i].ALLDAY + "</p></td>" +
                        "<tr><td><p>Open Weekends: " + data[i].WEEKENDS + "</p></td>" +
                        "</table></td></tr></table></td></tr>");
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
    if(document.getElementById("fastFood").checked == true){
        type = "TYPE = 'Fast Food'";
    }
    else if(document.getElementById("restaurant").checked == true){
        type = "TYPE = 'Restaurant'";
    }
    else if(document.getElementById("other").checked == true){
        type = "TYPE = 'Other'";
    }
    else{
        type = "TYPE = 'Food Pantry'";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("10m").checked == true){
        distance = "BETWEEN 0 AND 10";
    }
    else if(document.getElementById("10m+").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //price filters 
    if(document.getElementById("cheap").checked == true){
        price = "PRICE = '$'";
    }
    else if(document.getElementById("medium").checked == true){
        price = "PRICE = '$$'";
    }
    else if(document.getElementById("expensive").checked == true){
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
            query: foodQuery
        },
        function (data) { 
            $("#foodResults").empty();
            if (data.length == 0) {
               $("#foodResults").append("<p>No Results Found</p>");
            }
            for (i = 0; i < data.length; i++) {
                $("#foodResults").append("<tr><td><table class='searchResult'><tr><td>" +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p>Name: " + data[i].NAME + "</p></td></tr>" +
                    "<tr><td><p>Address: " + data[i].ADDRESS + "</p></td></tr>" +
                    "<tr><td><p>Distance: " + data[i].DISTANCE + "</p></td></tr>" +
                    "<tr><td><p>Price: " + data[i].PRICE + "</p></td></tr>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });
}




function initMap() {
    {
     srcLocation = new google.maps.LatLng(39.9526,-75.1652);
     dstLocation = new google.maps.LatLng(40.7128,-74.0060);
     var distance = google.maps.geometry.spherical.computeDistanceBetween(srcLocation, dstLocation)
     //center: {lat: -34.397, lng: 150.644},
     //zoom: 8
     console.log("Distance: " + distance);
 }

function shelterFunction() 
{

    var gender, distance, food;
    var test_dist = haversineDistance(univ_portland,shelter_test);
    initMap();
    console.log('im being called');
    //console.log("Origins: " + JSON.stringify(rows));
    console.log(JSON.stringify(test_dist));
    //SQL querries 
    //gender filters 
    if(document.getElementById("maleOnly").checked == true){
        gender = "GENDER = 'Male'";
    }
    else if(document.getElementById("femaleOnly").checked == true){
        gender = "GENDER = 'Female'";
    }
    else{
        gender = "GENDER = 'All'";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true){
        distance = "BETWEEN 0 AND 5";
    }
    else if(document.getElementById("10m+").checked == true){
        distance = "BETWEEN 0 AND 15";
    }
    else{
        distance = "BETWEEN 0 AND 2";
    }

    //food filters 
    if(document.getElementById("notIncluded").checked == true){
        food = "FOOD = 'No'";
    }
    else{
        food = "FOOD = 'Yes'";
    }

    $(document).ready(function () {
        var shelterQuery = sessionStorage.getItem("shelterQuery");
        if (shelterQuery == undefined){
            shelterQuery = "";
        }
        $.post('/shelterPage',
        {
            distance: distance,
            gender: gender,
            food: food, 
            query: shelterQuery
        }, 
        function (data) {
            $("#shelterResults").empty();
            if (data.length == 0) {
                $("#shelterResults").append("<p>No Results Found</p>");
            }
            for (i = 0; i < data.length; i++) {
                //this should be in a for loop if there is more data 
                $("#shelterResults").append("<tr><td><table class='searchResult'><tr><td> " +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p>Name: " + data[i].NAME + "</p></td></tr>" +
                    "<tr><td><p>Address: " + data[i].ADDRESS + "</p></td></tr>" +
                    "<tr><td><p>Distance: " + data[i].DISTANCE + "</p></td></tr>" +
                    "<tr><td><p>Gender:" + data[i].GENDER + "</p></td></tr>" +
                    "<tr><td><p>NOTES:" + data[i].NOTES + "</p></td></tr>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });

}
}
