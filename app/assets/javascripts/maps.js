
function initMap() {

  var mapPlaceholder = $('#map');

  var map = new google.maps.Map(mapPlaceholder[0], {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
 });
}
