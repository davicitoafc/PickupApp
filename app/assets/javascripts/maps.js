function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 37.7749, lng: -122.4194}
  });

  var infoWindow = new google.maps.InfoWindow({map: map});


         // Try HTML5 geolocation.
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(position) {
             var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
             };

             map.setCenter(pos);

           }, function() {
             handleLocationError(true, infoWindow, map.getCenter());
           });
         } else {
           // Browser doesn't support Geolocation
           handleLocationError(false, infoWindow, map.getCenter());
         }


        $.ajax({
               type: "GET",
               dataType: "json",
               url: "/games",
               success: function(data){
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
                   time: data[i].time
                  });

                google.maps.event.addListener(marker, 'click', function() {
                      map.setCenter(this.position);
                      map.setZoom(13);
                });

                var previousWindow = false

                google.maps.event.addListener(marker, 'mouseover', function() {
                   var gameLocation = this.title
                   var gameType = this.category
                   var gamePlayers = this.players/2
                   var gameTime = this.time

                   var gameInfo = '<div class="gameInfoDiv">' +
                        '<h2>Game Location: ' + gameLocation + '</h2>' +
                        '<h2>Players: ' + gamePlayers + ' vs ' + gamePlayers + ' </h2>' +
                        '<h2>Sport: ' + gameType + ' </h2>' +
                        '<h2>Time: ' + gameTime + ' </h2>' +
                      '</div>';

                      var infowindow = new google.maps.InfoWindow({
                         content: gameInfo
                      });

                      if (previousWindow) {
                        previousWindow.close();
                      }

                      previousWindow = infowindow

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
