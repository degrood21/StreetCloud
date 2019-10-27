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

//these fucntions prints the data from the database 
function medicalFunction(){
    $(document).ready(function(){
        $.post('/medicalPage',function(data){
            //this should be in a for loop if there is more data 
            for (i = 1; i < data.length; i++){
                $("#medicalResults").append("<tr><td><p>Name: "+data[i].NAME+"</p></td>");
                $("#medicalResults").append("<tr><td><p>Address: "+data[i].ADDRESS+"</p></td>");
                $("#medicalResults").append("<tr><td><p>Distance: "+data[i].DISTANCE+"</p></td>");
                $("#medicalResults").append("<tr><td><p>Type: "+data[i].TYPE+"</p></td>");
            }
        });
    });
}
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

// Searches for results from database with the same name
function search(){
    var searchFor = document.getElementById("searchText").innerHTML;
    console.log("Searching for" + searchFor);
    location.href = "/../streetcloud_gen_search.html";

    $(document).ready(function(){
        $.post('/searchPage',
        {
            inquiry: searchFor
        },
        function(data){
        });
    });
    
}
