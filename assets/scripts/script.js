/* Ethan's code here */



/* Stavros's code here */


/* Wesley's code here */



window.onload = function() {

  //Visual Crossing API Key
  var apiKey = '5949XGHGML2VDMYSFYV8PCKVY';

  var fetchButton = document.getElementById('add-city-button');
  var currentDayWeather = document.getElementById('current-day-weather');
  var temp = document.getElementById('current-temp');
  var humidity = document.getElementById('current-humidity');
  var wind = document.getElementById('current-wind');
  var nextDays = document.getElementById('five-day-forecast');
  var windDirection = document.getElementById('current-wind-direction');
  var inputCity = document.getElementById('city-search');
  
  
  function getApi() {
    var city = inputCity.value;
    var queryUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city + '?key=' + apiKey + '&unitGroup=metric';
    // var queryUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=metric`
    console.log(queryUrl);
  
    fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Fetch Response \n-------------');
      console.log(data);
      temp.textContent = 'Temp: ' + data.currentConditions.temp + '°C';
      humidity.textContent = 'Humidity: ' + data.currentConditions.humidity + '%';
      wind.textContent = 'Wind: ' + data.currentConditions.windspeed + 'kph';
      windDirection.textContent = 'Wind Direction: ' + data.currentConditions.winddir + 'degrees';
      sevenDayForecast(data.latitude, data.longitude);
    });
  
  }
  
    function sevenDayForecast(lat, lon){
      console.log(lat, lon);
      var queryUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${apiKey}&unitGroup=metric`;
  
      console.log(queryUrl);
      fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        var forecastList = data.days;
  
        for (var i = 0; i < 7; i = i + 1) {
          var nextDaysTemp = document.createElement('div');
          var nextDaysHumidity = document.createElement('div');
          var nextDaysWind = document.createElement('div');
          var nextDaysWindDirection = document.createElement('div');
          nextDaysTemp.textContent = 'Temp: ' + forecastList[i].temp + '°C';
          nextDaysHumidity.textContent = 'Humidity: ' + forecastList[i].humidity + '%';
          nextDaysWind.textContent = 'Wind: ' + forecastList[i].windspeed + 'kph';
          nextDaysWindDirection.textContent = 'Wind Direction ' + forecastList[i].winddir + 'degrees';
          nextDays.appendChild(nextDaysTemp);
          nextDays.appendChild(nextDaysHumidity);
          nextDays.appendChild(nextDaysWind);
          nextDays.appendChild(nextDaysWindDirection);
          console.log(data.length);
        }
      })
    }
  
    fetchButton.addEventListener('click', getApi);
  
  };
  
