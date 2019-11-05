//Dylan DeGrood
/*Helps to wait to run functions once the document fully loads*/

$(document).ready(function(){

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

$("#searchButton").click(function() {
    var searchFor = $("#searchText").val();
    localStorage.setItem("query", searchFor);
    location.href = "/../streetcloud_gen_search.html";
});

$("#searchButtonInd").click(function() {
    var searchFor = $("#searchText").val();
    var pageId = $("#").val();
});

function querySearch(){
    $(document).ready(function(){
        searchFor = localStorage.getItem("query");
        $.post('/searchPage',
        {
            inquiry: searchFor
        },
        function(data){
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

//these fucntions prints the data from the database 
function medicalFunction(){
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
        hours = "ALLDAY = 'Yes' OR ALLDAY = 'No'";
    }
    //distance 
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
        distance = "BETWEEN 0 AND 2";
    }
    //type
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
        type = "%clinic%' OR TYPE LIKE '%hospital%";  
    } 

    $(document).ready(function(){
        $.post('/medicalPage',
        {
            hours: hours, 
            distance: distance,
            type: type, 
        },
        function(data){
            $("#medicalResults").empty();
            if(data.length == 0){
                $("#medicalResults").append("<tr><td><h1>No hospital 4 U</h1></td>");
                $("#medImage").attr("src","https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png");
            }
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

/* Searches for results from database with the same name
function search(){
    location.href = "/../streetcloud_gen_search.html";
}

var searchFor = document.getElementById("searchText").innerHTML;
console.log("Searching for" + searchFor);
location.href = "/../streetcloud_gen_search.html";

$(document).ready(function(){
    $.post('/foodPage',
    {
        inquiry: searchFor
    },
    function(data){
    });
});

$(document).ready(function(){
    $.post('/medicalPage',
    {
        inquiry: searchFor
    },
    function(data){
    });
});

$(document).ready(function(){
    $.post('/shelterPage',
    {
        inquiry: searchFor
    },
    function(data){
    });
});
*/