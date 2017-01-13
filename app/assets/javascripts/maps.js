//Initiate Map
function initMap() {
  //Create map variable that grabs div by the id "map"
  var map = new google.maps.Map(document.getElementById('map'), {
    //Sets map zoom to 9
    zoom: 9,
    //Default lat lng of San Francisco
    center: {lat: 37.7749, lng: -122.4194}
  });

  var infoWindow = new google.maps.InfoWindow({map: map});


         // Condition that grabs users geolocation using HTML5
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(position) {
             var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
             };
        //If it passes, the map centers at pos
             map.setCenter(pos);

           }, function() {
             handleLocationError(true, infoWindow, map.getCenter());
           });
         } else {
           // Browser doesn't support Geolocation
           handleLocationError(false, infoWindow, map.getCenter());
         }

         //AJAX call that GET requests JSON data of games
        $.ajax({
               type: "GET",
               dataType: "json",
               url: "/games",
               success: function(data){

              //Code to get todays date
                 var today = new Date();
                 var dd = today.getDate();
                 var mm = today.getMonth()+1;
                 var yyyy = today.getFullYear();

                 if(dd<10) {
                     dd='0'+dd
                 }
                 if(mm<10) {
                     mm='0'+mm
                 }
                 today = yyyy+'-'+mm+'-'+dd
                // loop through data to retrieve games
               for( var i=0; i<data.length; i++ ){
                // Pass the latitude and longitude from data to marker
                 var marker_latlng= new google.maps.LatLng(data[i].latitude,data[i].longitude);
                // Marker with game data
                 var marker = new google.maps.Marker({
                   position: marker_latlng,
                   map: map,
                   animation: google.maps.Animation.DROP,
                   title: data[i].location,
                   id: data[i].id,
                   players: data[i].players,
                   category: data[i].category,
                   time: data[i].time,
                   date: data[i].date
                  });

                  // Conditional statement to set marker to null if todays date is greater than game date
                  if (data[i].date < today) {
                    marker.setMap(null);
                  }

              /* Mobile responsive map feature */

              google.maps.event.addDomListener(window, "resize", function() {
                  var center = map.getCenter();
                  google.maps.event.trigger(map, "resize");
                  map.setCenter(center);
                });

                //Event listener to allow user to zoom in on marker with 1 click
                google.maps.event.addListener(marker, 'click', function() {
                      map.setCenter(this.position);
                      map.setZoom(15);
                
                });
                // Variable with boolean for infowindow
                var previousWindow = false
                //Even listener for mouseoever of marker, which pops up game info in infowindow
                google.maps.event.addListener(marker, 'mouseover', function() {

                //Variables to grab values of marker properties
                   var gameLocation = this.title
                   var gameType = this.category
                   var gamePlayers = this.players/2
                   var gameDate = this.date
                //Variable with infowindow information that will load game details
                   var gameInfo = '<div class="content" style="font-size: 10px;text-align:center;">' +
                        '<h3 style="font-size: 20px;">Game Location: <p style="font-size: 13px;">' + gameLocation + '</p></h3>' +
                        '<h3 style="font-size: 20px;">Players: <br>' + gamePlayers + ' vs ' + gamePlayers + ' </h3>' +
                        '<h3 style="font-size: 20px;">Sport: ' + gameType + ' </h3>' +
                        '<h3 style="font-size: 20px;">Date: ' + gameDate + ' </h3>' +
                        '<a style="font-size: 20px;" href="/games/'+ this.id + '">View Game</a>' +
                      '</div>';
                  //InfoWindow that holds gameInfo as a property
                      var infowindow = new google.maps.InfoWindow({
                         content: gameInfo
                      });
                  //Conditional statement to check if previousWindow is true
                      if (previousWindow) {
                  //If true, .close will close the window, so multiple windows dont open after consecutive mouseovers
                        previousWindow.close();
                      }

                      previousWindow = infowindow
                    //Inforwindow that opens on map via the marker location
                   infowindow.open(map, this);
                }); // marker listener
              } // loop for objects
            } // success function
          }); //ajax
        } // map initialization



       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
         infoWindow.setPosition(pos);
         infoWindow.setContent(browserHasGeolocation ?
                               'Error: The Geolocation service failed.' :
                               'Error: Your browser doesn\'t support geolocation.');
       }
