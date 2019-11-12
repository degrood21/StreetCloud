/* External Citation */
/* All Google Maps API code obtained from: https://developers.google.com/maps/documentation/javascript/geolocation */

var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
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