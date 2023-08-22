/*
ethan (average-kirigiri-enjoyer), WesleyHAS, Stavros Panagiotopoulos (stavrospana)
SCS Boot Camp Project 1 Group 1 - Personal Information Hub
Created 2023/08/15
Last Edited 2023/08/22
*/

/* Ethan's code here */

//gets references to HTML elements necessary for event tracker functionality
var traverseLeft = $("#traverse-left");
var traverseRight = $("#traverse-right");
var zoomIn = $("#zoom-in");
var zoomOut = $("#zoom-out");

//variables for event tracker functionality
var traverseClicks = 0;
var eventView = "weekly";

//function to set up event calendar to have data rendered to it
function setUpEventCalendar()
{
  var forLoopCycles;

  //determine how many event blocks to display based on zoom level
  if (eventView === "weekly") //displays 14 blocks if event view is set to weekly
  {
    forLoopCycles = 14;
  }
  else if (eventView === "monthly") //displays 28-42 blocks if event view is set to monthly
  {
    //multi-if statement when in monthly view
    //if days in month = 28 & first day of month is sunday, for loop runs for 28 blocks (hides row 5 & 6)
    //if days in month = 31 & first day of month is friday / saturday for loop runs for 42 blocks
    //if days in month = 30 & first day of month is saturday, for loop runs for 42 blocks
    //otherwise, for loop runs for 35 blocks (hides row 6)



  }
  else //displays 365 event blocks (366 on a leap year) if event view is set to yearly
  {
    //for yearly view, have three rows with four divs each (three rows of four months)
    //each month div has seven divs within composed of equally-sized columns (one for each day of the week)
    //12 for loops (one for each month) adds vertically-stacking dates to each day-of-the-week div sequentially
      //dayjs checks if the currently viewed year is a leap year, running for 29 days instead of 28 for february
    //each for loop has an internal counter that all share the same variable to keep track of which day of the week should be added to next
    //before any of the for loops run, use dayjs().day() to retrieve which day of the week january 1st of that year is
      //the value returned by the above will be the starting value of the internal shared counter
      //counter will run from 0 -> 6 inside each for loop, transferring progress between for loops, and reset back to 0 every time it hits 6
      //e.g. 0 -> added to sunday & variable++, 3 -> added to wednesday & variable++, 6 -> added to sunday & variable = 0
      //this way, you just have to determine which day of the week january 1st is for each year + if it's a leap year
      //e.g. 2024 is a leap year, january 1st is a monday;
        //dayjs().day() returns 1 -> first day will be added to column [1], second day to column [2], etc...
        //sixth day is added to column [6] (saturday), variable is reset to 0, and seventh day is added to column [0] (sunday)
        //repeats till end of for loop for that month (31 days -> 31 iterations)
        //for loop for february immediately follows, dayjs checks that 2024 is a leap year, so loop will run for 29 iterations
        //last day of january is a wednesday, so first day of february should be a thursday
        //for last iteration of january loop, variable === 3, day is added to wednesday column, variable++, i.e. variable is now == 4
        //variable is preserved between loops, so first day of february will be added to column [4] (thursday column)
        //internal counter picks up where january loop left off, i.e. second day added to column [5], etc...
        //repeats for the remaining ten months
    //traverse buttons uses .add() method to add / subtract a year with each click in either direction

    //https://day.js.org/docs/en/plugin/day-of-year -> DAY OF YEAR PLUGIN

    //when checking if a date in the yearly view should be highlighted, check if a local storage entry
    //exists for the date ID assigned to that date
    //use day numbers instead of dots for yearly view, changing the colour of the text for those with events


    
  }

  return forLoopCycles;
}

//function to assign dates to each event block
function renderEventPlanner()
{
  //HEY ETHAN, YOU WILL PROBABLY PUT AN IF STATEMENT HERE TO CHANGE HOW EVENTBLOCKS IS DEFINED IN THE YEARLY VIEW, AS YOU'LL HAVE TO GET THE CHILDREN OF EACH MONTH
  //CONSIDER HAVING ALL THE BLOCKS IN PLACE IN HTML, AND INSTEAD OF USING EVENTBLOCKS.LENGTH IN THE FOR LOOP,
  //YOU DO DAY < 14 FOR THE (BI)-WEEKLY VIEW, ETC... FOR MONTHS & YEARS
  var eventBlocks = $(".event-row").children();

  var forLoopCycles = setUpEventCalendar();

  

  //dayjs(dayjs().date(1)).format("ddd") -> day of week for first day of month

  //https://jqueryui.com/datepicker/ -> datepicker widget

  //assigns an ID to each block such that they will represent consecutive days of the week, starting at the most recent sunday
  for (day = 0; day < forLoopCycles; day++)
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

//function to change zoom level of event view
function switchEventZoom(zoomButton)
{
  //preserve how far the user has traversed when zooming in / out
    //convert variable based on factor of time difference between weeks / months / years (e.g. x / 12 when going months -> years)(?)
    //get dayJS of any visible day and use it as an anchor point(?)
    //check to see if you can use get + set methods in dayJS or some sort of extension for this
  
  if (zoomButton === "in") //checks if the user clicked the zoom in button
  {
    if (eventView === "weekly") //if the planner is currently in weekly view, switch to monthly view
    {
      eventView = "monthly"
    }
    else if (eventView === "monthly") //if the planner is currently in monthly view, switch to yearly view
    {
      eventView = "yearly"
    }
  }
  else //if they did not, then they clicked the zoom out button
  {
    if (eventView === "yearly") //if the planner is currently in yearly view, switch to monthly view
    {
      eventView = "monthly"
    }
    else if (eventView === "monthly") //if the planner is currently in monthly view, switch to weekly view
    {
      eventView = "weekly"
    }
  }
}

//initializes event calendar view on current week
renderEventPlanner();

//moves event calendar one week backward when left arrow is clicked
traverseLeft.on("click", function()
{
  traverseClicks -= 7;
  renderEventPlanner();
});

//moves event calendar one week forward when left arrow is clicked
traverseRight.on("click", function()
{
  traverseClicks += 7;
  renderEventPlanner();
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

console.log('HELLO HELLO HELLO HELLO HELLO!!?!??!')
/* Wesley's code here */

console.log('YAYYYYYYY!');
console.log('Next line');
console.log('Stavros');
