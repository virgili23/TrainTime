// Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "AIzaSyA7gB0HYSZ2LuPRNsczmvpIbhk6rcw25_s",
    authDomain: "week-7-bf49d.firebaseapp.com",
    databaseURL: "https://week-7-bf49d.firebaseio.com",
    projectId: "week-7-bf49d",
    storageBucket: "week-7-bf49d.appspot.com",
    messagingSenderId: "457724217194"
  };
  firebase.initializeApp(config);


// Variables 

var database = firebase.database();

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///                   Real Code                 ///
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

// initial variables 
var name = "";  // Train name
var dest = "";  // Destination
var firstTime = ""; // First train time in HH:mm
var freq = 0;   // Frenquency in minutes until the next arrival
var away = 0; // Minutes away 

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// displays current time
function displayCurrentTime() {
    setInterval (function () {
        $('#current-time').html(moment().format('HH:mm:ss A'))
    }, 1000)
}
displayCurrentTime();

/////////////////////////////////////////////////////
////////////////////////////////////////////////////
// When you click submit... This happens...
$("#submit").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    /////////////////////////////////////////////

// Grabs value from these fields
    nameInput = $("#name-input").val().trim();
    destInput = $("#dest-input").val().trim();
    freqInput = $("#freq-input").val().trim();


// capture the first train time input in moment.js
var timeInput = $("#first-input").val().trim();
//////////////////////////////////////////////////////
var militaryFormat = "HH:mm";
var convertedDate = moment(timeInput, militaryFormat); 
// Converts military time that user inputs, into civilian time
// We put that calculated time into a variable called "firstTime"
var firstTime = moment(convertedDate).format('hh:mm');
// Then we log it
console.log(firstTime);
console.log("..................................................");

// var first time is the military time converted into civilian time



//first train time
var firstTimeConverted = moment(timeInput, "hh:mm").subtract(1, "years");
console.log("Test Code: " + firstTimeConverted);

// current time
var currentTime = moment();
console.log("current time:" + moment(currentTime).format("hh:mm"));

// time diff
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference in time: " + diffTime);

//time apart
var tRemainder = diffTime % freqInput;
console.log("time apart: " + tRemainder);

// Minute until train
var tMinutesUntilTrain = freqInput - tRemainder;
console.log("Minutes Until Train: " + tMinutesUntilTrain);

// Next Train
var nextTrain = moment().add(tMinutesUntilTrain, "minutes").format("hh:mm A");
console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));


    
    

// Puts info on the firebase database
    database.ref().set({
      name: nameInput,
      dest: destInput,
      firstTime: firstTime,
      timeInput: timeInput,
      freq: freqInput
    });

    
    // Grabs defined variables, and adds them to the Board
    $("#input").append(
        '<tr><td>'
        +nameInput+
        '</td><td>'
        +destInput+
        '</td><td>'
        +freqInput+
        '</td><td>'
        +nextTrain+
        '</td><td>'
        +tMinutesUntilTrain+
        '</td>'
    );

    clearInput();

  });



  // Clears the input field after hitting submit 
  var clearInput = function() {
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#first-input").val("");
    $("#freq-input").val("");
  }
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// This displays to the dom when you submit

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().nameInput);
    console.log(snapshot.val().destInput);
    console.log(snapshot.val().nextArrival);
    console.log(snapshot.val().freqInput);


    /*
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);
    */

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
//                    Test Code                 ///
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////








 // Initializing our click count at 0
 var clickCounter = 0;

 // Functions
 // ================================================================================

 // On Click
 $("#click-button").on("click", function() {

   // Add 1 to clickCounter
   clickCounter++;

   // **** Store Click Data to Firebase in a JSON property called clickCount *****
   // **** Note how we are using the Firebase .set() method ****
   // **** .ref() refers to the path you want to save your data to
   // **** Since we left .ref() blank, it will save to the root directory
   database.ref().set({
     clickCount: clickCounter
   });

   // Now! go to https://fir-click-counter-7cdb9.firebaseio.com/ to see the impact to the DB
 });



 ////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////
 // end of test


/*var start = '2018-04-30';

var result = moment(start).fromNow();

console.log(result);

/////////////////////////////////////////////////

var end = '2018-05-25';

var result2 = moment(end).diff(moment(start));

console.log(result2);

// This works, but displays it in miliseconds
///////////////////////////////////////////////
// humanize turns miliseconds into days
var humanize = moment.duration(result2).humanize();
console.log(humanize);

// You can display it as hours, days, or minutes
///////////////////////////////////////////////////
// as hours
var asHours = moment.duration(result2).as('hours');
console.log(asHours);
//as minutes
var asMinutes = moment.duration(result2).as('minutes');
console.log(asMinutes);
// as days
var asDays = moment.duration(result2).as('days');
console.log(asDays);

////////////////////////
// displays from military time to civilian time
var time = moment().format('hh:mm:ss');
console.log(time); */