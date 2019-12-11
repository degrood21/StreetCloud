//Dylan DeGrood
/*Helps to wait to run functions once the document fully loads*/

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
document.getElementById("homeFooterButton").onclick = function() {
    location.href = "/../streetcloud.html";
};
document.getElementById("jobsButton").onclick = function() {
    sessionStorage.setItem("jobQuery", "")
    location.href = "/../streetcloud_jobs.html";
};
document.getElementById("librariesButton").onclick = function() {
    sessionStorage.setItem("libraryQuery", "")
    location.href = "/../streetcloud_libraries.html";
};
document.getElementById("daycareButton").onclick = function() {
    sessionStorage.setItem("daycareQuery", "")
    location.href = "/../streetcloud_daycare.html";
};
document.getElementById("publicRestroomButton").onclick = function() {
    sessionStorage.setItem("restroomQuery", "")
    location.href = "/../streetcloud_publicRestrooms.html";
};
document.getElementById("aboutUs").onclick = function() {
    location.href = "/../streetcloud_about.html";
};
document.getElementById("registerForm").onclick = function() {
    location.href = "/../streetcloud_register_form.html";
};
document.getElementById("contactUS").onclick = function(){
    location.href = "/../streetcloud_about.html#opaqueboxContact";
};
document.getElementById("volunteerButton").onclick = function() {
    location.href = "/../streetcloud_volunteer_page.html";
};