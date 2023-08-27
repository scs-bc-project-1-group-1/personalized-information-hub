# Project 1 - Personalized Information Hub

<img src = "./assets/images/favicon.png" alt = "Project Logo" width = "150px"/>

## Description

I am an avid internet user, who frequently visits & utilizes various sites and applications for various purposes. However, I am also a *very* busy man, and as such, wish that I could have the functionality of all these apps consolidated into one location for quick and efficient use. This project is meant to fulfill that wish.

Specifically, it combines the functionality of a city-based weather app, a calendar which tracks user-generated events over the short, medium, and long-term, and a menu which retrieves the lastest five uploads from a specific YouTube Channel.

## Usage

Visit the Personalized Information Hub here;

https://scs-bc-project-1-group-1.github.io/personalized-information-hub/

At the top of the page, there will be two blocks, displaying the current date on the left, and the current time (24-hour format) on the right, which will update in real-time.

Below will be an input box and two buttons, which are used to render weather data to the page. After typing a city's name into the input, click "Add City", and an attempt will be made to retrieve the weather data of that city. If successful, the input box will be cleared, and the appropriate city data will be rendered to the page. If the search was not successful, nothing will change. The last successful search will be stored locally, such that the appropriate weather data will be loaded again upon refreshing / reopening the page. A new successful search will overwrite the previous entry. Clicking the "Clear City" button will remove the weather data from the page and clear the city saved in local storage.

The weather data will be split into two sections; today's weather (above), and this week's weather (below). The current weather will be displayed in a larger box on the left, with the name of the city being tracked at the top, with an icon representing weather conditions, temperature, humidity, wind speed, and wind direction following below. To the right will be the hourly forecast for the day, headed by a time signature for the hour followed by the same weather properties as before. There will be a scrollbar to allow scrolling through the various hours of the day. The weekly forecast will appear as per the above hourly forecast, with hours swapped out for days.

The Youtube script is designed to fetch and display videos from a Youtube channel on our web page. Users can input a Youtube channel's unique ID tag which can be found in the channel's "About" section. When the "Fetch Videos" button is pressed, the script is the started. The script will check if a valid ID has been inputed in the text box, if yes, it will fetch the videos from that specified channel ID using the Youtube API. This script uses an API key to interact with Youtube's servers. It will gather video data from Youtube such as details about each video which is then saved in the browser's memory. The script then takes the video data and displays it on the webpage using a window for each video, which is called an "iframe". This "iframe" will show the video itself. The Youtube script that we developed also utilizes local storage so that when you close the page or refresh it will display the previously loaded content instead of pinging the Youtube servers to constantly fetch which would use up your daily 10,000 queries limit. If you fetch videos from one channel and then type in a new channel's ID and fetch again, the script updates the saved video data. This way, the new channel's videos will replace the old ones, but you won't lose the old videos. We also implemented error messages in the script in case something goes wrong which will hopefully help the user troubleshoot their issues. 

## Preview

![Preview of Personalized Information Hub](./assets/images/project-1-website-preview.jpg)

## Credits

### ETHAN'S LINKS

linked triangle (icon base)
https://www.veryicon.com/icons/education-technology/big-data-1/porana-data.html

sun & cloud (icon part)
https://www.flaticon.com/free-icons/sun

video player (icon part)
https://www.flaticon.com/free-icons/video

offsetHeight
https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height

readonly input
https://stackoverflow.com/questions/4164542/how-to-disable-manual-input-for-jquery-ui-datepicker-field

jquery datepicker setdate
https://stackoverflow.com/questions/6646376/jquery-date-picker-default-date

.index()
https://stackoverflow.com/questions/28952509/jquery-how-to-get-the-index-of-an-element-in-the-selection-array

onload event
https://www.w3schools.com/jsref/event_onload.asp

### WESLEY'S LINKS

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw

https://developer.mozilla.org/en-US/docs/Web/API/Response

https://www.w3schools.com/js/js_errors.asp

https://www.freecodecamp.org/news/use-svg-images-in-css-html/#:~:text=SVG%20images%20can%20be%20written,element%20in%20your%20HTML%20document.&text=body%3E-,If%20you%20did%20everything%20correctly%2C%20your%20webpage%20should,exactly%20like%20the%20demo%20below.

https://forum.freecodecamp.org/t/how-to-get-and-post-the-icons-from-open-weather-api-to-html/23180/4

### STAVROS' LINKS

https://blog.logrocket.com/localstorage-javascript-complete-guide/

https://stackoverflow.com/questions/57266921/how-to-get-youtube-video-url-from-channel-id

https://developer.mozilla.org/en-US/docs/Learn/JavaScript

https://developers.google.com/youtube/v3/docs/videos#methods

https://stackoverflow.com/questions/45141465/how-to-get-the-data-of-a-video-from-youtube-in-javascript

https://developers.google.com/youtube/iframe_api_reference

https://www.w3schools.com/jsref/event_onload.asp

https://developer.mozilla.org/en-US/docs/Web/JavaScript

## License

Operates under a standard MIT license, refer to the LICENSE file in the repository for more information.
