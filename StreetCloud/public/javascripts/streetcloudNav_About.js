
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

$(document).ready(function(){
    $('.icon').click(function() {
        if (document.getElementById("menuLinks").style.display == "inline"){
            document.getElementById("menuLinks").style.display = "none";
            document.getElementById("hamburger").style.backgroundColor = "transparent";
            document.getElementById("hamburger").style.height = "max-content";
            document.getElementById("hamburger").style.width = "max-content";
            document.getElementById("hamburger").style.opacity = "100%";
        }
        else{
            document.getElementById("menuLinks").style.display = "inline";
            document.getElementById("hamburger").style.backgroundColor = "gray";
            document.getElementById("hamburger").style.height = "100%";
            document.getElementById("hamburger").style.width = "282px";
            document.getElementById("hamburger").style.opacity = "90%";
        } 
    });
});

document.getElementById("aboutUs").onclick = function() {
    location.href = "/../streetcloud_about.html";
};
document.getElementById("contactUS").onclick = function(){
    location.href = "/../streetcloud_about.html#opaqueboxContact";
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
document.getElementById("volunteerButton").onclick = function() {
    location.href = "/../streetcloud_volunteer_page.html";
};
