 $(document).ready(function(){
	// Initialize Firebase for test database. 
  var config = {
    apiKey: "AIzaSyAqs8RfgpCL55zRCp5pZaIBvHBb5ReBEm8",
    authDomain: "train-database-49c8b.firebaseapp.com",
    databaseURL: "https://train-database-49c8b.firebaseio.com",
    projectId: "train-database-49c8b",
    storageBucket: "train-database-49c8b.appspot.com",
    messagingSenderId: "383775431234"
  };
  firebase.initializeApp(config);
	
  var database = firebase.database();
var trainDB = database.ref("/trainInfo");

//add employee event
$("#addTrain").click(function(event){

  event.preventDefault();
  var name = $("#trainName").val().trim();
  var destination = $("#trainDestination").val().trim();
  var trainTime = $("#trainTime").val().trim();
  var frequency = parseInt($("#trainFrequency").val().trim());
  var minutesTillTrain = $("#away").val().trim();
  var nextTrain = $("#next").val().trim();
  
  //push to firebase
  trainDB.push({
    name,
   	destination,
    frequency,
    trainTime,
    minutesTillTrain,
    nextTrain,
  })

  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainFrequency").val("");
  $("#trainTime").val("");
  $("#away").val("");
  $("#next").val("");
  
});

//update table event
trainDB.on("child_added", function(childSnapshot){

  var data = childSnapshot.val();

  var trainName = data.name;
  var trainDestination = data.destination;
  var trainTime = data.trainTime;
  var trainFrequency = data.frequency;

        //CONVERT TIME OF TRAIN TO PROPER FORMAT
        var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        //CURRENT LOCAL TIME
        var currentTime = moment();
        //TIME DIFFERENCE BETWEEN CURRENT LOCAL TIME AND CONVERSION IN MINUTES 
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        //DIVIDES THE TIME DIFFERENCE BY THE FREQUENCY OF THE TRAIN
        var tRemainder = (diffTime % trainFrequency);
        //SUBTRACTS THE DIFFERENCE FROM THE FREQUENCY TO DETERMINE THE TIME TILL THE NEXT TRAIN
        var minutesTillTrain = (trainFrequency - tRemainder);
        //CURRENT TIME PLUS MINUTES TIL NEXT TRAIN TO CALCULATE TIME OF NEXT TRAIN ARRIVAL
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        //FORMAT TIME FOR NEXT TRAIN 
        var nextTrainFormatted = moment(nextTrain).format("hh:mm");
        
        // Test for correct times and info
        console.log(firstTimeConverted);
        console.log(currentTime);
        console.log(diffTime);
        console.log(tRemainder);
        console.log(minutesTillTrain);
        console.log(nextTrain);
        console.log(nextTrainFormatted);
        var data = childSnapshot.val();
	
	
	
 //Write to DOM
  var tRow = $("<tr>");
  tRow.append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainTime),
    $("<td>").text(minutesTillTrain),
    $("<td>").text(nextTrain),
  );

  $("#trainTable").append(tRow);
})
})