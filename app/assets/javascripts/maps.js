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

             infoWindow.setPosition(pos);
             infoWindow.setContent('Location found.');
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
         			for( var i=0; i<data.length; i++ ){
         				// Pass the latitude and longitude from data to maps.
         				var marker_latlng= new google.maps.LatLng(data[i].latitude,data[i].longitude);
         				var marker = new google.maps.Marker({
         					position: marker_latlng,
         					map: map,
         					title: 'Click me',
         					});
         						google.maps.event.addListener(marker, 'click', function() {
         						      infowindow.open(map,marker);
         						    });

         				}
         	}
 	});


       }

       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
         infoWindow.setPosition(pos);
         infoWindow.setContent(browserHasGeolocation ?
                               'Error: The Geolocation service failed.' :
                               'Error: Your browser doesn\'t support geolocation.');
       }
