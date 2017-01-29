$(function() {

 function getWeather() {

  var longitude = $(".longitude").text();
  var latitude = $(".latitude").text();
  var gameDate = $(".gameDate").text();

   $.getJSON( "https://api.apixu.com/v1/forecast.json?key=c24039352d9f4dfe9a3124854172701&q="+latitude+","+longitude+"&days=10", function(data) {
    weatherData = data.forecast.forecastday
     for (var i=0;i<weatherData.length;i++) {
        var formattedDate = weatherData[i].date
      // var unix_timestamp = weatherForecast[i].dt
      // var date = new Date(unix_timestamp * 1000);
      // var formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
      //
       if (formattedDate == gameDate) {
          var maxTempF = weatherData[i].day.maxtemp_f
          var icon = weatherData[i].day.condition.icon
          var condition = weatherData[i].day.condition.text

          var weatherString = "Weather conditions: <br> <img src='http:" + icon + "' alt='Icon depicting current weather.'>" +
                              "It will be " + maxTempF + " F and " + condition
          $("div.gameDetails").append(weatherString);
       }
      }
     });
    }
   getWeather();
  });
