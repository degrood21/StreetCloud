//streetcloudNavigation.js
//This is the code for the main functionality
//for navigating through the website and displaying information
//Created by the StreetCloud software team

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
document.getElementById("homeButton").onclick = function() {
    location.href = "/../streetcloud.html";
};

});

//Click function for the searchButton on the main page
//Puts the item that was searched for and loads it into local storage
//Then changes page to the search html page to show results
$("#searchButton").click(function() {
    var searchFor = $("#searchText").val();
    sessionStorage.setItem("query", searchFor);
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
    function init() {
        init.searched = true;
    }
    init();
    $(document).ready(function () {
        searchFor = sessionStorage.getItem("query");

        $(".results").text("");

        if (searchFor === "") {
            $("#genResults").append("<p>No Results Found</p>");
        }
        else {
            $.post('/searchPage',
                {
                    inquiry: searchFor
                },
                function (data) {
                    if(data.length == 0){
                        $("#genResults").append("<p>No Results Found</p>");
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
                            "<tr><td><p>Distance: " + data[i].Distance + "</p></td></tr>" +
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

function shelterFunction() {

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
        gender = "GENDER = 'All'";
    }

    //distance filters 
    if(document.getElementById("5m").checked == true ||
        document.getElementById("close_m").checked == true){
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
                $("#jobResults").append("<tr><td><table class='searchResult'><tr><td> " +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p>Name: " + data[i].NAME + "</p></td></tr>" +
                    "<tr><td><p>Address: " + data[i].ADDRESS + "</p></td></tr>" +
                    "<tr><td><p>Distance: " + data[i].DISTANCE + "</p></td></tr>" +
                    "<tr><td><p>Education Level Needed: " + data[i].EDUCATION+ "</p></td></tr>" +
                    "<tr><td><p>Part Time: " + data[i].PART_TIME + "</p></td></tr>" +
                    "<tr><td><p>Full Time: " + data[i].FULL_TIME + "</p></td></tr>" +
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
                $("#libraryResults").append("<tr><td><table class='searchResult'><tr><td> " +
                    "<img src='" + data[i].IMAGE + "' height=" + 100 + " width=" + 100 + "></img></td>" +
                    "<td><table class='searchInfo'>" +
                    "<tr><td><p>Name: " + data[i].NAME + "</p></td></tr>" +
                    "<tr><td><p>Address: " + data[i].ADDRESS + "</p></td></tr>" +
                    "<tr><td><p>Distance: " + data[i].DISTANCE + "</p></td></tr>" +
                    "<tr><td><p>Hours: " + data[i].HOURS+ "</p></td></tr>" +
                    "<tr><td><p>Restroom Access: " + data[i].PUBLIC_RESTROOM + "</p></td></tr>" +
                    "</table></td></tr></table></td></tr>");
            }
        });
    });
}

function daycareFunction(){

}

function publicRestroomFunction(){
    
}
