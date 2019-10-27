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
    var when,distance,type; 

    //seting the variables based on what filter is selected 
    //when filters
    if(document.getElementById("weekly").checked == true){
        when = document.getElementById("weekly").value;
    }
    else if(document.getElementById("monthly").checked == true){
        when = document.getElementById("monthly").value;
    }
    else if(document.getElementById("annually").checked == true){
        when = document.getElementById("annually").value;
    }
    else{
        when = document.getElementById("emergency").value;
    }
    //distance 
    if(document.getElementById("5m").checked == true){
        distance = document.getElementById("5m").value;
    }
    else if(document.getElementById("10m").checked == true){
        distance = document.getElementById("10m").value;
    }
    else if(document.getElementById("15m+").checked == true){
        distance = document.getElementById("15m+").value;
    }
    else{
        distance = document.getElementById("2m").value;
    }
    //type
    if(document.getElementById("dentist").checked == true){
        type = document.getElementById("dentist").value;
    }
    else if(document.getElementById("optometrist").checked == true){
        type = document.getElementById("optometrist").value;
    }
    else if(document.getElementById("therapist").checked == true){
        type = document.getElementById("therapist").value;
    }
    else{
        type = "clinic%' OR TYPE LIKE '%hospital"; //the % is used for SQL querries  
    } 


    $(document).ready(function(){
        $.post('/medicalPage',
        {
            when: when, 
            distance: distance,
            type: type, 
        },
        function(data){
            for(i=0;i<data.length;i++){
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
            $("#foodResults").append("<tr><td><p>Name: "+data[0].NAME+"</p></td>");
            $("#foodResults").append("<tr><td><p>Address: "+data[0].ADDRESS+"</p></td>");
            $("#foodResults").append("<tr><td><p>Distance: "+data[0].DISTANCE+"</p></td>");
            $("#foodResults").append("<tr><td><p>Price: "+data[0].PRICE+"</p></td>");
        });
    });
}

function shelterFunction(){
    $(document).ready(function(){
        $.post('/shelterPage',function(data){
            //this should be in a for loop if there is more data 
            $("#shelterResults").append("<tr><td><p>Name: "+data[0].NAME+"</p></td>");
            $("#shelterResults").append("<tr><td><p>Address: "+data[0].ADDRESS+"</p></td>");
            $("#shelterResults").append("<tr><td><p>Distance: "+data[0].DISTANCE+"</p></td>");
            $("#shelterResults").append("<tr><td><p>Type:"+data[0].TYPE+"</p></td>");
        });
    });
}
