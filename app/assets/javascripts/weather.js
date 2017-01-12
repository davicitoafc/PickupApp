function getWeather() {
    $.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily?lat=38.0049214&lon=-121.805789&cnt=10&units=imperial&units=imperial&APPID=e1b0f333867c7cac1ca29c6d5fb73b29", function(data) {
      weatherForecast = data.list
      for(var i=0;i<weatherForecast.length;i++) {
        console.log(weatherForecast[i]);
      }
   });
  }

getWeather();
