function hidefilters(){
    document.getElementById("educationFilters").style.display= "none";
    document.getElementById("distanceFilters").style.display= "none";
    document.getElementById("positionFilters").style.display= "none";
    document.getElementById("educationButton").style.backgroundColor = "#696969"; 
    document.getElementById("positionButton").style.backgroundColor = "#696969"; 
    document.getElementById("distanceButton").style.backgroundColor = "#696969"; 

}

function showEducation(){
    if (document.getElementById("educationFilters").style.display == "inline-block"){
        hidefilters();
    }
    else{
        hidefilters();
        document.getElementById("educationButton").style.backgroundColor = "yellow";
        document.getElementById("educationFilters").style.display = "inline-block";
    }
}

function showPosition(){
    if (document.getElementById("positionFilters").style.display == "inline-block"){
        hidefilters();
    }
    else{
        hidefilters();
        document.getElementById("positionButton").style.backgroundColor = "yellow";
        document.getElementById("positionFilters").style.display = "inline-block";
    }
}

function showDistance(){
    if (document.getElementById("distanceFilters").style.display == "inline-block"){
        hidefilters();
    }
    else{
        hidefilters();
        document.getElementById("distanceButton").style.backgroundColor = "yellow";
        document.getElementById("distanceFilters").style.display = "inline-block";
    }
}
