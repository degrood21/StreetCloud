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
    localStorage.setItem("query", searchFor);
    location.href = "/../streetcloud_gen_search.html";
});

//listens for the search button click
//from all other htmls
$("#searchButtonInd").click(function() {
    var searchFor = $("#searchText").val();
    var pageId = $("#pageId").html();//gets what page is calling
    pageId = pageId.toLowerCase();

    $(document).ready(function(){
        //sends the post call to retrieve the data form database
        $.post('/searchIndividualPage',
        {
            inquiry: searchFor,
            source: pageId
        },
        //creates together the table depending on which page it needs to append the results to
        function(data){
                $(".results").text("");
                for (i = 0; i < data.length; i++){
                    var toAdd = "<tr><td><img src='"+ data[i].IMAGE + "' height="+100+" width="+100+"></img></td>" +
                    "<td><table class='searchResult'>" +
                    "<tr><td><p>Name: "+data[i].NAME+"</p></td></tr>" +
                    "<tr><td><p>Address: "+data[i].ADDRESS+"</p></td></tr>" +
                    "<tr><td><p>Distance: "+data[i].DISTANCE+"</p></td></tr>";

                    if (pageId === "medical"){
                        toAdd = toAdd + "<tr><td><p>Type: "+data[i].TYPE+"</p></td></tr>" +
                        "<tr><td><p>Hours: "+data[i].HOURS+"</p></td></tr>" + 
                        "<tr><td><p>Open Allday: "+data[i].ALLDAY+"</p></td></tr>" +
                        "<tr><td><p>Open Weekends: "+data[i].WEEKENDS+"</p></td></tr>";
                    }
                    else if (pageId === "food"){
                        toAdd = toAdd + "<tr><td><p>Price: "+data[i].PRICE+"</p></td></tr>";
                    }
                    else if (pageId === "shelter"){
                        toAdd = toAdd + "<tr><td><p>Type:"+data[i].TYPE+"</p></td>";
                    }

                    toAdd = toAdd + "</table></td></tr>";

                    $(".results").append(toAdd);
                }
        });
    });

});

//Using the search value from local storage
//Will send a post request where the database
//will be searched for a word containing the search val
function querySearch(){
    $(document).ready(function(){
        searchFor = localStorage.getItem("query");
        $.post('/searchPage',
        {
            inquiry: searchFor
        },
        function(data){
                //Loops through the result array of database entries from search results
                //creates a new table for each entry and appends it to streetcloud_gen_search.html
                for (i = 0; i < data.length; i++){
                    $("#genResults").append( "<tr><td><img src='"+ data[i].Image + "' height="+100+" width="+100+"></img></td>" +
                    "<td><table class='searchResult'>" +
                    "<tr><td><p>Name: "+data[i].Name+"</p></td></tr>" +
                    "<tr><td><p>Address: "+data[i].Address+"</p></td></tr>" +
                    "<tr><td><p>Distance: "+data[i].Distance+"</p></td></tr>" +
                    "</table></td></tr>");
                }
        });
    });
}

//This function will send a post asking for data 
//depending on what filters are checked and append the correct
//data entries from database to streetcloud_medical.html
function medicalFunction(){
    //these variables will hold the string formatted for mySQL
    //in order to search the database
    var hours,distance,type; 

    //seting the SQL querries based on what filter is selected 
    //special hours filters
    if(document.getElementById("weekends").checked == true || 
        document.getElementById("weekends_mobile").checked == true){
        hours = "WEEKENDS = 'Yes'";
    }
    else if(document.getElementById("24HR").checked == true || 
        document.getElementById("24HR_mobile").checked == true){
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
    else if(document.getElementById("10m").checked == true || 
        document.getElementById("10m_mobile").checked == true){
        distance = "BETWEEN 0 AND 10";
    }
    else if(document.getElementById("15m+").checked == true ||
        document.getElementById("15m+_mobile").checked == true){
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
    else if(document.getElementById("optometrist").checked == true ||
        document.getElementById("optometrist_mobile").checked == true){
        type = "%Optometry%";
    }
    else if(document.getElementById("therapist").checked == true ||
        document.getElementById("therapist_mobile").checked == true){
        type = "%Therapy%";
    }
    else{
        type = "%clinic%' OR TYPE LIKE '%hospital%"; //default search/checked
    } 

    //post function for medical page
    $(document).ready(function(){
        $.post('/medicalPage',
        {
            hours: hours, 
            distance: distance,
            type: type, 
        },
        function(data){
            $("#medicalResults").empty();//clears the table so we can append results
            //fail safe for if the result array comes back empty
            //No results match filters checked
            //displays Nothing Found with picture of red x
            if(data.length == 0){
                $("#medicalResults").append("<tr><td><h1>Nothing Found</h1></td>");
                $("#medImage").attr("src","https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
            }
            //for loop to append data to medical page
            for(i=0; i < data.length; i++){
            $("#medicalResults").append("<tr><td><p>Name: "+data[i].NAME+"</p></td>");
            $("#medicalResults").append("<tr><td><p>Address: "+data[i].ADDRESS+"</p></td>");
            $("#medicalResults").append("<tr><td><p>Distance: "+data[i].DISTANCE+" Miles</p></td>");
            $("#medicalResults").append("<tr><td><p>Type: "+data[i].TYPE+"</p></td>");
            $("#medicalResults").append("<tr><td><p>Hours: "+data[i].HOURS+"</p></td>");
            $("#medicalResults").append("<tr><td><p>Open Allday: "+data[i].ALLDAY+"</p></td>");
            $("#medicalResults").append("<tr><td><p>Open Weekends: "+data[i].WEEKENDS+"</p></td>");
            $("#medicalResults").append("<br>");
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

//still in the works
//will hold functionality like the medical page above for getting data based on filters
function foodFunction(){
    $(document).ready(function(){
        $.post('/foodPage',function(data){
            //this should be in a for loop if there is more data 
            for (i = 1; i < data.length; i++){
                $("#foodResults").append("<tr><td><p>Name: "+data[i].NAME+"</p></td>");
                $("#foodResults").append("<tr><td><p>Address: "+data[i].ADDRESS+"</p></td>");
                $("#foodResults").append("<tr><td><p>Distance: "+data[i].DISTANCE+"</p></td>");
                $("#foodResults").append("<tr><td><p>Price: "+data[i].PRICE+"</p></td> <br>");
            }
        });
    });
}

//still in the works
//will hold functionality like the medical page above for getting data based on filters
function shelterFunction(){
    $(document).ready(function(){
        $.post('/shelterPage',function(data){
            for (i = 1; i < data.length; i++){
            //this should be in a for loop if there is more data 
                $("#shelterResults").append("<tr><td><p>Name: "+data[i].NAME+"</p></td>");
                $("#shelterResults").append("<tr><td><p>Address: "+data[i].ADDRESS+"</p></td>");
                $("#shelterResults").append("<tr><td><p>Distance: "+data[i].DISTANCE+"</p></td>");
                $("#shelterResults").append("<tr><td><p>Type:"+data[i].TYPE+"</p></td>");
            }
        });
    });
}