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
                 var today = new Date();
                 var dd = today.getDate();
                 var mm = today.getMonth()+1; //January is 0!
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

                  if (data[i].date < today) {
                    marker.setMap(null);
                  } else {
                    console.log(false)
                  }

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
                   var gameDate = this.date

                   var gameInfo = '<div class="content" style="font-size: 10px;text-align:center;">' +
                        '<h3 style="font-size: 20px;">Game Location: <p style="font-size: 13px;">' + gameLocation + '</p></h3>' +
                        '<h3 style="font-size: 20px;">Players: <br>' + gamePlayers + ' vs ' + gamePlayers + ' </h3>' +
                        '<h3 style="font-size: 20px;">Sport: ' + gameType + ' </h3>' +
                        '<h3 style="font-size: 20px;">Time: ' + gameTime + ' </h3>' +
                        '<h3 style="font-size: 20px;">Date: ' + gameDate + ' </h3>' +
                        '<a href="/games/'+ this.id + '">View Game</a>' +
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
