function hidefilters(){
    document.getElementById("cat1Filters").style.display= "none";
    document.getElementById("cat2Filters").style.display= "none";
    document.getElementById("cat3Filters").style.display= "none";
    document.getElementById("cat1Button").style.backgroundColor = "#696969"; 
    document.getElementById("cat3Button").style.backgroundColor = "#696969"; 
    document.getElementById("cat2Button").style.backgroundColor = "#696969"; 
}

$("#searchText").keyup(function(event){
    if(event.keyCode == 13){
        $("#searchButton").click();
    }
});

function showCat1Filters(){
    if (document.getElementById("cat1Filters").style.display == "inline-block"){
        hidefilters();
    }
    else{
        hidefilters();
        document.getElementById("cat1Button").style.backgroundColor = "yellow";
        document.getElementById("cat1Filters").style.display = "inline-block";
    }
}

function showCat2Filters(){
    if (document.getElementById("cat2Filters").style.display == "inline-block"){
        hidefilters();
    }
    else{
        hidefilters();
        document.getElementById("cat2Button").style.backgroundColor = "yellow";
        document.getElementById("cat2Filters").style.display = "inline-block";
    }
}

function showCat3Filters(){
    if (document.getElementById("cat3Filters").style.display == "inline-block"){
        hidefilters();
    }
    else{
        hidefilters();
        document.getElementById("cat3Button").style.backgroundColor = "yellow";
        document.getElementById("cat3Filters").style.display = "inline-block";
    }
}

$(document).ready(function(){
    // $("#spHours").click(function(){
    //     console.log("Read");
    //     var x = "." + $(this).attr("className");
    //     $("#spHours").attr("checked", false); 
    //     $(x).attr("checked", true);
    // });

    // $("#distance").click(function(){
    //     console.log("Read");
    //     var x = "." + $(this).attr("className");
    //     $("#distance").attr("checked", false); 
    //     $(x).attr("checked", true);
    // });

    // $("#health").click(function(){
    //     console.log("Read");
    //     var x = "." + $(this).attr("className");
    //     $("#health").attr("checked", false); 
    //     $(x).attr("checked", true);
    // });

    $(".filters").click(function(){
        console.log("Read");
        var x = "." + $(this).attr("className");
        $(".filters").attr("checked", false); 
        $(x).attr("checked", true);
    });

});
