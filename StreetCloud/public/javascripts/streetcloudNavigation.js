//Dylan DeGrood
/*Helps to wait to run functions once the document fully loads*/

document.getElementById("headerButton").onclick = function() {
    $.post("/searchData", function(orders){
        var currentOrders = JSON.parse(orders);
        
        //Setting the corresponding html attributed to newly acquired info
        alert(""+currentOrders.ordersData[0].quantity);
     });
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
document.getElementById("homeButton").onclick = function() {
    location.href = "/../streetcloud.html";
};
document.getElementById("jobsButton").onclick = function() {
    location.href = "/../streetcloud_jobs.html";
};
document.getElementById("aboutUs").onclick = function() {
    location.href = "/../streetcloud_about.html";
};
document.getElementById("registerForm").onclick = function() {
    location.href = "/../streetcloud_register_form.html";
};

