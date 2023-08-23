/*
ethan (average-kirigiri-enjoyer), WesleyHAS, Stavros Panagiotopoulos (stavrospana)
SCS Boot Camp Project 1 Group 1 - Personal Information Hub
Created 2023/08/15
Last Edited 2023/08/21
*/

/* Ethan's code here */

//gets references to HTML elements necessary for event tracker functionality
var traverseLeft = $("#traverse-left");
var traverseRight = $("#traverse-right");

//variable to track how far in each direction of the event calendar the user has traversed
var traverseClicks = 0;

//use dayjs to assign dates to each block in the event calendar (IDs or data attributes)

//function to assign dates to each event block
function assignDates()
{
  //HEY ETHAN, YOU WILL PROBABLY PUT AN IF STATEMENT HERE TO CHANGE HOW EVENTBLOCKS IS DEFINED IN THE YEARLY VIEW, AS YOU'LL HAVE TO GET THE CHILDREN OF EACH MONTH
  //CONSIDER HAVING ALL THE BLOCKS IN PLACE IN HTML, AND INSTEAD OF USING EVENTBLOCKS.LENGTH IN THE FOR LOOP,
  //YOU DO DAY < 14 FOR THE (BI)-WEEKLY VIEW, ETC... FOR MONTHS & YEARS
  var eventBlocks = $(".event-row").children();

  //multi-if statement when in monthly view
  //if days in month = 28 & is not leap year, for loop runs for 28 blocks (hides row 5 & 6)
  //if days in month = 31 & first day of month is friday / saturday for loop runs for 42 blocks
  //days in month = 30 & first day of month is saturday, for loop runs for 42 blocks
  //otherwise, for loop runs for 35 blocks (hides row 6)

  //dayjs(dayjs().date(1)).format("ddd") -> day of week for first day of month

  //assigns an ID to each block such that they will represent consecutive days of the week, starting at the most recent sunday
  for (day = 0; day < eventBlocks.length; day++)
  {
    var block = $(eventBlocks[day]);

    //date of block is adjusted such that blocks will go from sunday -> saturday
    //shifted forward / backward based on how many times the user has clicked the traverse buttons and in which direction
    var date = dayjs().add(day + traverseClicks - dayjs().day(), "d").format("YYYY/MM/D");
    block.attr("id", date)

    //removes the year and month from date string and sets the block's date text to that
    block.children(".date").text(date.slice(8))
  }
}

//initializes event calendar view on current week
assignDates();

//moves event calendar one week backward when left arrow is clicked
traverseLeft.on("click", function()
{
  traverseClicks -= 7;
  assignDates();
});

//moves event calendar one week forward when left arrow is clicked
traverseRight.on("click", function()
{
  traverseClicks += 7;
  assignDates();
});

//scales to months / years when zoomed out
//preserve how far the user has traversed when zooming in / out
  //convert variable based on factor of time difference between weeks / months / years (e.g. x / 12 when going months -> years)(?)
  //get dayJS of any visible day and use it as an anchor point(?)
  //check to see if you can use get + set methods in dayJS or some sort of extension for this
//use dayJS to retrieve which day of the week each day should be, and how to lay out each day in monthly / yearly view

/* Stavros's code here */


/* Wesley's code here */





//Visual Crossing API Key
var weatherApiKey = '5949XGHGML2VDMYSFYV8PCKVY';

var fetchButton = document.getElementById('search-button');
var currentDayWeather = document.getElementById('current-day-weather');
var temp = document.getElementById('current-temp');
var humidity = document.getElementById('current-humidity');
var wind = document.getElementById('current-wind');
var nextDays = document.getElementById('five-day-forecast');
var windDirection = document.getElementById('current-wind-direction');
var inputCity = document.getElementById('city-search');
var currentDay = document.getElementById('current-date');


function getApi() {
  var city = inputCity.value;
  var queryUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${weatherApiKey}&unitGroup=metric`
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
    var queryUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${weatherApiKey}&unitGroup=metric`;

    console.log(queryUrl);
    fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var forecastList = data.days;

      for (var i = 1; i < 8; i = i + 1) {
        var dailyForecastContent = document.createElement('div');
        dailyForecastContent.classList.add('forecast-sections', 'daily-forecast');
        var nextDaysTemp = document.createElement('div');
        var nextDaysHumidity = document.createElement('div');
        var nextDaysWind = document.createElement('div');
        var nextDaysWindDirection = document.createElement('div');
        var nextDaysDate = document.createElement('div');
        var rawDate = forecastList[i].datetime;
        var formattedDate = new Date(rawDate).toLocaleDateString('en-US', {weekday: 'short' , month: 'long' , day: 'numeric'});

        nextDaysDate.textContent = formattedDate;
        nextDaysTemp.textContent = 'Temp: ' + forecastList[i].temp + '°C';
        nextDaysHumidity.textContent = 'Humidity: ' + forecastList[i].humidity + '%';
        nextDaysWind.textContent = 'Wind: ' + forecastList[i].windspeed + 'kph';``
        nextDaysWindDirection.textContent = 'Wind Direction ' + forecastList[i].winddir + 'degrees';
        dailyForecastContent.appendChild(nextDaysDate);
        dailyForecastContent.appendChild(nextDaysTemp);
        dailyForecastContent.appendChild(nextDaysHumidity);
        dailyForecastContent.appendChild(nextDaysWind);
        dailyForecastContent.appendChild(nextDaysWindDirection);

        nextDays.appendChild(dailyForecastContent);
        console.log(data.length);
      }
    });
  }

  fetchButton.addEventListener('click', getApi);