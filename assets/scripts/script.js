/*
ethan (average-kirigiri-enjoyer), WesleyHAS, Stavros Panagiotopoulos (stavrospana)
SCS Boot Camp Project 1 Group 1 - Personal Information Hub
Created 2023/08/15
Last Edited 2023/08/25
*/

/* Ethan's code here */

//NEXT TO DO
//update styles

//gets references to HTML elements necessary for event tracker functionality
var eventTextInput = $("#event-input");
var eventDatePicker = $("#event-date-picker");
var addEventButton = $("#add-event-button");
var monthYear = $("#month-year");
var weeklyMonthlyCalendar = $("#weekly-monthly-calendar");
var yearlyCalendar = $("#yearly-calendar");
var traverseLeft = $("#traverse-left");
var traverseRight = $("#traverse-right");
var zoomIn = $("#zoom-in");
var zoomOut = $("#zoom-out");
var eventRows = $(".event-row");
var rowOne = $("#row-1");
var rowTwo = $("#row-2");
var rowThree = $("#row-3");
var rowFour = $("#row-4");
var rowFive = $("#row-5");
var rowSix = $("#row-6");
var eventBlocks = $(".event-block");
var events = eventBlocks.children(".events");
var monthlyRows = $(".monthly-row");
var monthBlocks = $(".month-block");

//variables for event tracker functionality
var traverseDays = 0;
var eventView = "weekly";
var forLoopCycles;
var eventUpdated = false;

//function to set up event calendar
function setUpEventCalendar(firstDay)
{
  //determine how many event blocks to display based on zoom level
  if (eventView === "weekly") //displays 14 blocks across two rows if event view is set to weekly
  {
    monthlyRows.attr("style", "display: none");
    forLoopCycles = 14;
  }
  else if (eventView === "monthly") //displays 28-42 blocks if event view is set to monthly
  {
    if (dayjs(firstDay).daysInMonth() === 28 && dayjs(firstDay).startOf("month").day() === 0)
    {
      //if there are 28 days in current month & month starts on sunday, run for 28 iterations across four rows
      rowThree.attr("style", "display: block");
      rowFour.attr("style", "display: block");
      rowFive.attr("style", "display: none");
      rowSix.attr("style", "display: none");
      forLoopCycles = 28;
    }
    else if ((dayjs(firstDay).daysInMonth() >= 30 && dayjs(firstDay).startOf("month").day() === 6)
           ||(dayjs(firstDay).daysInMonth() === 31 && dayjs(firstDay).startOf("month").day() === 5))
    {
      //if there are at least 30 days in current month & month starts on saturday
      //OR if there are 31 days in current month & month starts on friday, run for 42 iterations across six rows
      monthlyRows.attr("style", "display: block");
      forLoopCycles = 42;
    }
    else //otherwise, run for 35 iterations across five rows
    {
      rowThree.attr("style", "display: block");
      rowFour.attr("style", "display: block");
      rowFive.attr("style", "display: block");
      rowSix.attr("style", "display: none");
      forLoopCycles = 35;
    }
  }
  else //hides monthly / weekly calendar & displays yearly calendar if event view is set to yearly
  {
    //displays yearly calendar & hides weekly / monthly calendar
    weeklyMonthlyCalendar.attr("style", "display: none");
    yearlyCalendar.attr("style", "display: block");

    return; //returns early such that code below hiding yearly calendar will not run
  }

  //hides yearly calendar & displays weekly / monthly calendar
  weeklyMonthlyCalendar.attr("style", "display: block");
  yearlyCalendar.attr("style", "display: none");

  //returns each individual day block in the rows of the weekly / monthly calendar packaged in an object
  var blocks = $(".event-row").children();
  return blocks;
}

//function to render and add dates to relevant blocks
function renderBlockDetails(blocks, firstDay)
{
  if (eventView === "yearly") //if event planner is set to yearly view, create elements representing each day as such
  {
    monthBlocks.children(".date-row").text(""); //clears any already-existing dates
    var dayOfWeek = firstDay.day(); //retrieves which day of the week firstDay is
    var daysPast = 0; //variable to track how many days of the current year have been added
    
    for (month = 0; month < 12; month++) //for loop to create days for each month of the year
    {
      //sets number of for loop cycles to number of days in current month
      forLoopCycles = dayjs(firstDay).add(month, "month").daysInMonth(); 

      //for every day of the week that must be passed to reach firstDay (from sunday), add an empty div to the current month
      for (div = 0; div < dayOfWeek; div++) 
      {
        var emptyDiv = $("<div></div>"); //creates empty div
        var firstWeekOfMonth = $(monthBlocks[month]).children()[1]; //gets reference to first week of current month (+1 to avoid month name div)
        firstWeekOfMonth.append(emptyDiv[0]) //adds empty div to first week of current month
      }

      var weekOfMonth = 0; //variable to track which week of the month new date element should be added to

      for (day = 0; day < forLoopCycles; day++) //for loop to create days of current month
      {
        var block = $("<div></div>"); //creates empty div
        var week = $(monthBlocks[month]).children()[weekOfMonth + 1]; //gets reference to current week of month (+1 to avoid month name div)
        var date = dayjs(firstDay).add(day + daysPast, "d").format("YYYY/MM/D"); //retrieves date of current day being added
        block.attr("id", date); //assigns current day's date as an ID
        block.text(date.slice(8)); //removes the year and month from date string and sets the block's date text to that
        week.append(block[0]); //adds new day to appropriate week
        dayOfWeek++; //increase dayOfWeek by 1

        //checks if there is a local storage entry for the current date, set its text colour to lavender
        if (localStorage.getItem(date))
        {
          block.attr("style", "color: #b892ff");
        }

        if (dayOfWeek > 6) //if the last day that was added was saturday, reset dayOfWeek & proceed to next week row
        {
          dayOfWeek = 0 //reset day of week to 0 (sunday)
          weekOfMonth++; //proceeds to next week in current month
        }   
      }

      daysPast += forLoopCycles; //increase daysPast variable once for each day added
    }
  }
  else //otherwise (event planner is set to weekly / monthly view), add days to already-existing day-week structure as such
  {
    //assigns an ID to & modifies text of each block such that they will represent consecutive days of the week, starting at the most recent sunday
    for (day = 0; day < forLoopCycles; day++) 
    {
      var block = $(blocks[day]); //gets reference to current day being implemented

      //date of block is adjusted such that blocks will go from sunday -> saturday
      //shifted forward / backward based on how many times the user has clicked the traverse buttons and in which direction
      var date = dayjs().add(day + traverseDays - dayjs().day(), "d").format("YYYY/MM/D");

      block.attr("id", date) //assigns current day's date as an ID
      block.children(".date").text(date.slice(8)) //removes the year and month from date string and sets the block's date text to that
      
      //clears any pre-existing events in the current block
      var eventList = block.children(".events");
      eventList.empty();

      //checks if there is a local storage entry for the current date
      if (localStorage.getItem(date))
      {
        //if yes, retrieve it
        var localEventData = localStorage.getItem(date);
        eventData = JSON.parse(localEventData);

        //for loop which runs through each event item in local storage for current date
        for (eventItem = 0; eventItem < eventData.length; eventItem++)
        {
          var eventContainer = $("<div></div>"); //creates empty div
          var eventName = $("<li></li>").text(eventData[eventItem]); //creates list item with text of current event
          var xButton = $("<button></button>").text("X"); //creates 'X' button

          eventContainer.append(eventName); //adds list item with event name to div container
          eventContainer.append(xButton); //adds 'X' button to div container
          block.children(".events").append(eventContainer); //adds div container to current day block
        }
      }
    }

    eventRows.children().removeClass("outside-month"); //removes any already-applied outside-month classes on certain days
    var bottomRow; //variable to hold a reference to the bottom row of the month currently being viewed

    if (forLoopCycles === 14) //if forLoopCycles is 14, i.e. event calendar is in weekly view, eject from function
    {
      return; 
    }
    else if (forLoopCycles === 28) //if forLoopCycles is 28, i.e. there are four rows of weeks, set the fourth row to be the bottom row
    {
      bottomRow = rowFour;
    }
    else if (forLoopCycles === 35) //if forLoopCycles is 35, i.e. there are five rows of weeks, set the fifth row to be the bottom row
    {
      bottomRow = rowFive;
    }
    else if (forLoopCycles === 42) //if forLoopCycles is 42, i.e. there are six rows of weeks, set the sixth row to be the bottom row
    {
      bottomRow = rowSix;
    }

    var dayOfWeek = firstDay.day(); //retrieves which day of the week firstDay of the month is
    var lastDayOfMonth = firstDay.endOf("month").day(); //retrieves which day of the week last day of the month is

    //for every day of the week that must be passed to reach firstDay (from sunday), change the text of an event block in the first row to gray, going from left to right
    for (day = 0; day < dayOfWeek; day++) 
    {
      $(rowOne.children()[day]).addClass("outside-month") //change text in first row block with index equal to day to gray
    }

    //for every day of the week in the bottom row that isn't part of the current month, change its text to gray
    for (day = lastDayOfMonth + 1; day < 7; day++)
    {
      $(bottomRow.children()[day]).addClass("outside-month"); //change text in bottom row block with index equal to day to gray
    }
  }
}

//function to adjust height of all blocks in both rows of weekly view to match the tallest day in that row
function adjustRowHeight()
{
  if (eventView === "weekly") //adjust height of day blocks in weekly view to match tallest day in that row
  {
    rowOne.children().css({"height": "", "min-height": "200px"});
    rowTwo.children().css({"height": "", "min-height": "200px"});
    
    //retrieves pixel height of week one & two rows
    rowOneHeight = rowOne[0].offsetHeight;
    rowTwoHeight = rowTwo[0].offsetHeight;

    //sets height of rows one & two to that of the tallest day in that row
    rowOne.children().css("min-height", rowOneHeight);
    rowTwo.children().css("min-height", rowTwoHeight);
  }
}

//function to update month / year header above calendar
function updateMonthYearHeader(firstDay)
{
  if (eventView === "yearly") //if event planner is set to yearly view, update the text with the appropriate year
  {
    monthYear.text(dayjs(firstDay).format("YYYY")); //updates month / year header above calendar based on year of firstDay
  }
  else if (eventView === "monthly") //if event planner is set to monthly view, update the text with the appropriate month & year
  {
    monthYear.text(dayjs(firstDay).format("MMMM YYYY")); //updates month / year header above calendar based on month & year of firstDay
  }
  else //otherwise (i.e. event planner is in weekly view), update the text with the appropriate month & year
  {
    var lastDayOfFirstRow = rowOne.children()[6].id; //retrieves ID (date) of last day in first row of event planner
    monthYear.text(dayjs(lastDayOfFirstRow).format("MMMM YYYY")); //updates month / year header above calendar based on month & year of lastDayOfFirstRow
  }
}

//function render event calendar content
function renderEventPlanner(firstDay)
{
  //determines how many iterations the upcoming for loop will run for, and how many rows of event blocks will be displayed
  var blocks = setUpEventCalendar(firstDay);

  //renders & assigns dates to calendar
  renderBlockDetails(blocks, firstDay);

  adjustRowHeight(); //adjusts height of rows in each week
  updateMonthYearHeader(firstDay); //updates month / year header above calendar

  //if this calendar re-render was caused by an event being added or deleted, do not change the default date of the datepicker, and reset the eventUpdated variable
  if (eventUpdated)
  {
    eventUpdated = false;
    return;
  }

  //if firstDay has been defined, update default datepicker date to firstDay
  if (firstDay)
  {
    eventDatePicker.datepicker("setDate", firstDay.format("YYYY/MM/D")); 
  }
  else //if it has not, set firstDay to first day of month currently being viewed, and set default datepicker date to firstDay
  {
    var lastDayOfFirstRow = rowOne.children()[6].id; //retrieves ID (date) of last day in first row of event planner
    var firstDay = dayjs(lastDayOfFirstRow).startOf("month"); //sets firstDay to first day of month containing lastDayOfFirstRow
    eventDatePicker.datepicker("setDate", firstDay.format("YYYY/MM/D")); 
  }
}

//function to manage traversing event blocks using left & right buttons
function traverseBlocks(direction)
{
  var firstDay; //variable to hold first day of new month / year when traversing

  if (direction === "left") //checks if the user clicked the left button
  {
    if (eventView === "weekly") //if the event calendar is in the weekly view, shift 7 days backwards
    {
      traverseDays -= 7;
    }
    else if (eventView === "monthly") //if the event calendar is in the monthly view, shift one month backwards relative to the one currently being viewed
    {
      var sundayOfThisWeek = dayjs().startOf("week"); //retrieves this week's sunday
      var lastDayOfFirstRow = rowOne.children()[6].id; //retrieves ID (date) of last day in first row of event planner
      var firstDayOfLastMonth = dayjs(lastDayOfFirstRow).subtract(1, "month").startOf("month"); //retrieves first day of month preceding the one currently being viewed
      var sundayOfMonthStart = dayjs(firstDayOfLastMonth).startOf("week"); //retrieves sunday of week containing firstDayOfLastMonth

      //changes traverseDays such that calendar will start at the week containing first day of the month currently being viewed
      traverseDays = sundayOfMonthStart.diff(sundayOfThisWeek, "day");

      firstDay = firstDayOfLastMonth; //sets first day variable to first day of last month
    }
    else //otherwise (calendar is in yearly view), shift one year backwards
    {
      firstDayOfYear = dayjs(monthYear.text()).startOf("year"); //retrieves first day of year currently being viewed
      firstDayOfLastYear = dayjs(firstDayOfYear).subtract(1, "year").startOf("year") //retrieves first day of the year preceding the one currently being viewed
      firstDay = firstDayOfLastYear; //sets first day to first day of year previous to the one currently being viewed
    }
  }
  else //if they did not, then they clicked the right button
  {
    if (eventView === "weekly") //if the event calendar is in the weekly view, shift 7 days forwards
    {
      traverseDays += 7;
    }
    else if (eventView === "monthly") //if the event calendar is in the monthly view, shift one month forwards relative to the one currently being viewed
    {
      var sundayOfThisWeek = dayjs().startOf("week"); //retrieves this week's sunday
      var lastDayOfFirstRow = rowOne.children()[6].id; //retrieves ID (date) of last day in first row of event planner
      var firstDayOfNextMonth = dayjs(lastDayOfFirstRow).add(1, "month").startOf("month"); //retrieves first day of month following the one currently being viewed
      var sundayOfMonthStart = dayjs(firstDayOfNextMonth).startOf("week"); //retrieves sunday of week containing firstDayOfNextMonth

      //changes traverseDays such that calendar will start at the week containing first day of the month currently being viewed
      traverseDays = sundayOfMonthStart.diff(sundayOfThisWeek, "day");

      firstDay = firstDayOfNextMonth; //sets first day variable to first day of next month
    }
    else //otherwise (calendar is in yearly view), shift one year forwards
    {
      firstDayOfYear = dayjs(monthYear.text()).startOf("year"); //retrieves first day of year currently being viewed
      firstDayOfLastYear = dayjs(firstDayOfYear).add(1, "year").startOf("year") //retrieves first day of the year following the one currently being viewed
      firstDay = firstDayOfLastYear; //sets first day to first day of year following the one currently being viewed
    }
  }

  renderEventPlanner(firstDay); //updates event planner to reflect the changes above
}

//function to change zoom level of event view
function switchEventZoom(zoomButton)
{
  var lastDayOfFirstRow = rowOne.children()[6].id; //retrieves ID (date) of last day in first row of event planner
  var sundayOfThisWeek = dayjs().startOf("week"); //retrieves this week's sunday
  var firstDay; //variable to hold first day of new month / year when traversing

  if (zoomButton === "out") //checks if the user clicked the zoom out button
  {
    if (eventView === "weekly") //if the planner is currently in weekly view, switch to monthly view
    {
      var monthOfLastDay = dayjs(lastDayOfFirstRow).startOf("month"); //retrieves first day of month containing lastDayOfFirstRow
      var sundayOfMonthStart = dayjs(monthOfLastDay).startOf("week"); //retrieves sunday of week containing monthOfLastDay
      
      //changes traverseDays such that calendar will start at the week containing first day of the month currently being viewed
      traverseDays = sundayOfMonthStart.diff(sundayOfThisWeek, "day");

      firstDay = monthOfLastDay; //sets firstDay to first day of month which to be zoomed out to
      eventBlocks.css({"min-height": "", "height": "100px"}); //removes min-height & sets a fixed height of 100px to all event day blocks
      events.addClass("monthly"); //adds monthly class to event lists

      eventView = "monthly"
    }
    else if (eventView === "monthly") //if the planner is currently in monthly view, switch to yearly view
    {
      var yearOfLastDay = dayjs(lastDayOfFirstRow).startOf("year"); //retrieves first day of year containing lastDayOfFirstRow
      firstDay = yearOfLastDay; //sets firstDay to first day of year
      
      eventView = "yearly"
    }
    else //otherwise (i.e. event planner is in yearly view), return early to prevent event planner from trying to re-render
    {
      return;
    }
  }
  else //if they did not, then they clicked the zoom in button
  {
    if (eventView === "yearly") //if the planner is currently in yearly view, switch to monthly view
    {
      firstDayOfYear = dayjs(monthYear.text()).startOf("year"); //retrieves first day of year currently being viewed
      var sundayOfYearStart = dayjs(firstDayOfYear).startOf("week"); //retrieves sunday of week containing firstDayOfYear

      //changes traverseDays such that calendar will start at the week containing first day of the year currently being viewed
      traverseDays = sundayOfYearStart.diff(sundayOfThisWeek, "day");

      firstDay = firstDayOfYear //sets firstDay to first day of the year currently being viewed

      eventView = "monthly"
    }
    else if (eventView === "monthly") //if the planner is currently in monthly view, switch to weekly view
    {
      events.removeClass("monthly"); //removes monthly class from event lists
      eventView = "weekly"
    }
  }

  renderEventPlanner(firstDay); //updates event calendar
}

//function to take input event data
function createEvent()
{
  //retrieves event name & date
  var eventName = eventTextInput.val();
  var eventDate = eventDatePicker.val();

  //if the user did not input both a name and date for the event, eject from function
  if (!(eventName && eventDate))
  {
    return;
  }

  //attempts to retrieve entry for input date from local storage
  var localEventList = localStorage.getItem(eventDate);

  if (localEventList) //if the above entry exists, append the new event to it, and update the local storage entry
  {
    var eventList = JSON.parse(localEventList);
    eventList.push(eventName);
    localStorage.setItem(eventDate, JSON.stringify(eventList));
  }
  else //if it does not exist, create an empty array, append the new event to it, and save the entry to local storage
  {
    var eventList = [];
    eventList.push(eventName);
    localStorage.setItem(eventDate, JSON.stringify(eventList));
  }

  //clears event name inputs
  eventTextInput.val("");

  //gets a sample firstDay value
  var firstDay = retrieveFirstDay();

  eventUpdated = true; //marks that the following calendar re-render was triggered by a change to events
  renderEventPlanner(firstDay); //updates event calendar
}

function deleteEvent()
{
  elementClicked = event.target //retrieves element that was clicked

  //if a button was not clicked, eject from function
  if (!elementClicked.matches("button"))
  {
    return;
  }
  
  var buttonClicked = $(elementClicked); //gets a jQuery reference to the specific button that was clicked
  var eventName = buttonClicked.siblings("li").text(); //gets event name from sibling list item
  var eventContainer = buttonClicked.parent(); //gets parent div of buttonClicked
  var eventList = eventContainer.parent(); //gets grandparent event list of buttonClicked
  var eventDate = eventList.parent().attr("id"); //gets event date from id of parent event block
  
  var localStorageData = JSON.parse(localStorage.getItem(eventDate)); //retrieves event data of date associated with event block containing buttonClicked
  
  localStorageData.splice(eventContainer.index(), 1); //removes entry matching index of eventContainer among its siblings from local storage

  if (localStorageData.length === 0)
  {
    localStorage.removeItem(eventDate); 
  }
  else
  {
    localStorage.setItem(eventDate, JSON.stringify(localStorageData)); //updates local storage after removing appropriate entry
  }

  //gets a sample firstDay value
  var firstDay = retrieveFirstDay();

  eventUpdated = true; //marks that the following calendar re-render was triggered by a change to events
  renderEventPlanner(firstDay); //updates event calendar
}

//function to get a reference to a sample firstDay variable, used in other functions where firstDay is not referenced, but is followed up by functions that need it
function retrieveFirstDay()
{
  if (eventView === "yearly") //if eventView is set to yearly, set firstDay to first day of year being viewed
  {
    firstDay = dayjs(monthYear.text()).startOf("year");
  }
  else //otherwise, set it to the first day of the month currently being viewed
  {
    var lastDayOfFirstRow = rowOne.children()[6].id; //retrieves ID (date) of last day in first row of event planner
    var firstDay = dayjs(lastDayOfFirstRow).startOf("month"); //sets firstDay to first day of month containing lastDayOfFirstRow
  }

  return firstDay;
}

//adds datepicker widget to event date selection input
$(function()
{
  eventDatePicker.datepicker(
  {
    dateFormat: "yy/mm/d",
  });
});

//initializes event calendar view on current week
renderEventPlanner();

//resets date of datepicker to start of current month when page is finished loading
window.addEventListener("load", function()
{
  eventDatePicker.datepicker("setDate", dayjs().startOf("month").format("YYYY/MM/D"));
});

//attempts to add an event when the add event button is clicked
addEventButton.on("click", createEvent);

//attempts to delete an event when one is clicked
events.on("click", deleteEvent);

//moves event calendar one week backward when left arrow is clicked
traverseLeft.on("click", function()
{
  traverseBlocks("left");
});

//moves event calendar one week forward when left arrow is clicked
traverseRight.on("click", function()
{
  traverseBlocks("right");
});

//moves event calendar one week forward when left arrow is clicked
zoomIn.on("click", function()
{
  switchEventZoom("in");
});

//moves event calendar one week forward when left arrow is clicked
zoomOut.on("click", function()
{
  switchEventZoom("out");
});

/* Stavros's code here */



// adding the variable for the Youtube API 
//the youtube api is very straight forward when fetching videos

var ytapiKey = 'AIzaSyCY2Pd1yOE43whBV0mjNYPwqtgBd9n1Pds';

//adding a function to save data to local storage
//function to save data to local storage
function saveToLocalStorage(key, data) {
  
  localStorage.setItem(key, JSON.stringify(data));
}
// this function will load the data from the local storage
function loadFromLocalStorage(key) {

  var data = localStorage.getItem(key);
  if (data) {
    
  return  JSON, parse(data);
}
return null;
}
//function to fetch the videos from any youtube channel that the user has provided the channel ID for 
//(can be found in the About tab of any specified youtube channel => clicking on the share button => clicking on Share Channel ID => paste in to button function)

function fetchVideos(channelId) {
    var videosDiv = document.getElementById('videos');
    var request = new XMLHttpRequest();
  //Youtube API GET which will acquire the videos
 request.open('GET', "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" + channelId + "&order=date&maxResults=5&key=" + ytapiKey, true);
 
 request.onload = function(){

  //successful response event handler
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    saveToLocalStorage('youtubeData', data);
    renderVideos(data);
  } else {
    console.error('Request failed with status:', request.status);
  }
 };
 // error response event handler
    request.onerror = function(){
      console.error('Request failed.');
    };
//sends the request
    request.send();
  }

  //renders the video in the UI
function renderVideos(data){
  var videosDiv = document.getElementById('videos');
  videosDiv.innerHTML = ''; //clears the existing content

//  Loops through the video items and creates video iframes
for (var i = 0; i < data.items.length; i++){
  var video = data.items[i];
  var videoId = video.id.videoId;

  var iframe = document.createElement('iframe');
  iframe.src = "https://www.youtube.com/embed/" + videoId;
  iframe.width = '560';
  iframe.height = '315';

  var videoDiv = document.createElement('div');
  videoDiv.className = 'video-box';
  videoDiv.appendChild(iframe);

  videosDiv.appendChild(videoDiv);
}  
}
// added a function to fetch and render the videos when the button is clicked
function fetchAndRender() {
var channelIdInput = document.getElementById('channelIdInput');
var channelId = channelIdInput.value;

if (channelId) {
  fetchVideos(channelId);
} else {
  console.error('Please provide a valid Youtube Channel ID.');
}

}

// attatched an event listener to the button
document.getElementById('fetchButton').addEventListener('click', fetchAndRender);



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
var clearCityInput = document.getElementById('clear-city');

// var weatherIcon = document.getElementById('weather-icon');


function clearCity() {
  localStorage.clear();

  currentDayWeather.innerHTML = "";

}

clearCityInput.addEventListener('click', clearCity);

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

    // Get the current weather icon element if it exists
    var existingWeatherIcon = document.getElementById('weather-icon');

    // If the existing icon element exists, remove it
    if (existingWeatherIcon) {
        existingWeatherIcon.parentNode.removeChild(existingWeatherIcon);
    }

    var savedCity = document.querySelector("#city-search").value;
    localStorage.setItem('savedCity', savedCity);

    var weatherConditions = data.currentConditions.icon;
    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('id', 'weather-icon');
    var weatherImage = document.getElementById('weather-icon');
    weatherIcon.src = `./assets/images/WeatherIcons-main/SVG/2nd Set - Color/${weatherConditions}` + ".svg";
    currentDayWeather.appendChild(weatherIcon);
    weatherIcon.style.width = '30px'; // Set the width in pixels or any other unit
    weatherIcon.style.height = '30px'; // Set the height in pixels or any other unit
    temp.textContent = 'Temp: ' + data.currentConditions.temp + '°C';
    humidity.textContent = 'Humidity: ' + data.currentConditions.humidity + '%';
    wind.textContent = 'Wind: ' + data.currentConditions.windspeed + 'kph';
    windDirection.textContent = 'Wind Direction: ' + data.currentConditions.winddir + 'degrees';
    inputCity.value='';
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


        var weatherConditions = data.days[i].icon;
        var weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('id', 'weather-icon');
        var weatherImage = document.getElementById('weather-icon');
        weatherIcon.src = `./assets/images/WeatherIcons-main/SVG/2nd Set - Color/${weatherConditions}` + ".svg";
        weatherIcon.style.width = '30px'; // Set the width in pixels or any other unit
        weatherIcon.style.height = '30px'; // Set the height in pixels or any other unit


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
        dailyForecastContent.appendChild(weatherIcon);

        nextDays.appendChild(dailyForecastContent);
        console.log(data.length);
      }
    });
  }

  fetchButton.addEventListener('click', getApi);