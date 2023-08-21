/*
ethan (average-kirigiri-enjoyer), WesleyHAS, Stavros Panagiotopoulos (stavrospana)
SCS Boot Camp Project 1 Group 1 - Personal Information Hub
Created 2023/08/15
Last Edited 2023/08/21
*/

/* Ethan's code here */

//variable to track how far in each direction of the event calendar the user has traversed
var traverseClicks

//use dayjs to assign dates to each block in the event calendar (IDs or data attributes)

//HEY ETHAN, YOU WILL PROBABLY PUT AN IF STATEMENT HERE TO CHANGE HOW EVENTBLOCKS IS DEFINED IN THE YEARLY VIEW, AS YOU'LL HAVE TO GET THE CHILDREN OF EACH MONTH
var eventBlocks = $(".row").children();

//assigns an ID to each block such that they will represent consecutive days of the week, starting at the most recent sunday
for (day = 0; day < eventBlocks.length; day++)
{
  var block = $(eventBlocks[day]);

  //assigns ID to each block to represent sunday -> saturday
  var date = dayjs().add(day - dayjs().day() /* subtracts integer of day of the week such that blocks start at sunday */, "d").format("YYYY/MM/DD");
  block.attr("id", date)

  //removes the year and month from date string and sets the block's date text to that
  block.children(".date").text(date.slice(8))
}

//.add method in dayJS to adds a certain number of weeks based on a variable value
//right traverse arrow increases variable by 1, left decreases by 1
//scales to months / years when zoomed out
//preserve how far the user has traversed when zooming in / out
  //convert variable based on factor of time difference between weeks / months / years (e.g. x / 12 when going months -> years)(?)
  //get dayJS of any visible day and use it as an anchor point(?)
  //check to see if you can use get + set methods in dayJS or some sort of extension for this
//use dayJS to retrieve which day of the week each day should be, and how to lay out each day in monthly / yearly view

/* Stavros's code here */

console.log('HELLO HELLO HELLO HELLO HELLO!!?!??!')
/* Wesley's code here */

console.log('YAYYYYYYY!');
console.log('Next line');
console.log('Stavros');
