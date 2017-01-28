$(function() {

  function getWeather() {

    var longitude = $(".longitude").text();
    var latitude = $(".latitude").text();
    var gameDate = $(".gameDate").text();

      $.getJSON( "https://api.apixu.com/v1/forecast.json?key=c24039352d9f4dfe9a3124854172701&q="+latitude+","+longitude+"&days=10", function(data) {
        console.log(data);

        // for(var i=0;i<weatherForecast.length;i++) {
        //   var unix_timestamp = weatherForecast[i].dt
        //   var date = new Date(unix_timestamp * 1000);
        //   var formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
        //
        //     if (formattedDate == gameDate) {
        //       var temp = weatherForecast[i].temp.max
        //       var icon = weatherForecast[i].weather[0].icon
        //
        //       $("div.gameDetails").append("<img src='http://openweathermap.org/img/w/" + icon + ".png' alt='Icon depicting current weather.'>", temp);
        //     }
        //   }
       });
      }
      getWeather();
  });
