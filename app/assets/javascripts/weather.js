$(function() {

  function getWeather() {

    var longitude = $(".longitude").text();
    var latitude = $(".latitude").text();
    var gameDate = $(".gameDate").text();

      $.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitude+"&lon="+longitude+"&cnt=10&units=imperial&APPID=e1b0f333867c7cac1ca29c6d5fb73b29", function(data) {
        weatherForecast = data.list

        for(var i=0;i<weatherForecast.length;i++) {
          var unix_timestamp = weatherForecast[i].dt
          var date = new Date(unix_timestamp * 1000);
          var formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()

            if (formattedDate == gameDate) {
              var temp = weatherForecast[i].temp.max
              var icon = weatherForecast[i].weather[0].icon
              $("div.gameDetails").append(temp, icon);
            }   
          }
       });
      }
      getWeather();
  });
