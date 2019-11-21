/* Authored by Kelsi Cruz */

/* External Citation */
/* Adapted geolocation code from: https://www.w3schools.com/html/html5_geolocation.asp */
/* and: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition */
var usercoords;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
    return usercoords;
  } 
  
  else {
    alert("Geolocation is not supported by this browser.");
    return null;
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}

function getPosition(pos) {
  var crd = pos.coords;
  
  usercoords = [crd.latitude, crd.longitude];

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}



/* External Citation */
/* Haversine formula and codebase used was obtained from: https://www.movable-type.co.uk/scripts/latlong.html */
/* Adapted code from user Nathan Lippi on StackOverflow: https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript */

function haversineDistance(source, destination) {
    //toRad converts lat and lon coords into radians
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var sourceLon = source[0];
    var sourceLat = source[1];
  
    var destLon = destination[0];
    var destLat = destination[1];
  
    var R = 6371; // earth's radius in km 
  
    var x1 = destLat - sourceLat;
    var finalLat = toRad(x1);
    var x2 = destLon - sourceLon;
    var finalLon = toRad(x2);
    var a = Math.sin(finalLat / 2) * Math.sin(finalLat / 2) +
      Math.cos(toRad(sourceLat)) * Math.cos(toRad(destLat)) *
      Math.sin(finalLon / 2) * Math.sin(finalLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
  
    distance /= 1.60934; // convert to miles
  
    return distance;
  }