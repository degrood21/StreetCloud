//Dylan DeGrood
/*Helps to wait to run functions once the document fully loads*/

$(document).ready(function(){

document.getElementById("headerButton").onclick = function() {
    location.href = "/../streetcloud.html";
};
document.getElementById("medicalButton").onclick = function() {
    location.href = "/../streetcloud_medical.html";
    // $(document).ready(function(){
    // $.post('/medicalPage',function(data){
    //     var x = JSON.parse(data);
    //     document.getElementById("headerButton").innerHTML = "HELP";  //these dont work for some reason :(
    // });
    // });
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

});

function medicalFunction(){
    $(document).ready(function(){
        $.post('/medicalPage',function(data){
            //this should be in a for loop if there is more data 
            $("#medicalResults").append("<tr><td><p>Name:</p></td>");
            $("#medicalResults").append("<td><p>"+data[0].NAME+"</p></td></tr>");

            $("#medicalResults").append("<tr><td><p>Address:</p></td>");
            $("#medicalResults").append("<td><p>"+data[0].ADDRESS+"</p></td></tr>");

            $("#medicalResults").append("<tr><td><p>Distance:</p></td>");
            $("#medicalResults").append("<td><p>"+data[0].DISTANCE+"</p></td></tr>");

            $("#medicalResults").append("<tr><td><p>Type:</p></td>");
            $("#medicalResults").append("<td><p>"+data[0].TYPE+"</p></td></tr>");

        });
    });
}
