// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCiOWLR0kbtpUJ6gSeaSIaw4rMn80eksa4",
    authDomain: "train-time-693d7.firebaseapp.com",
    databaseURL: "https://train-time-693d7.firebaseio.com",
    projectId: "train-time-693d7",
    storageBucket: "train-time-693d7.appspot.com",
    messagingSenderId: "166199932246"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//When user clicks on form submit
$("#add-train").on("click", function(event) {
	event.preventDefault();

//Get user input
	var trainName = $("#name-input").val().trim();
	var trainDest = $("#destination-input").val().trim();
	var trainTime = $("#time-input").val().trim();
	var trainFreq = $("#frequency-input").val().trim();

//New train objected created to push.
	var newTrain = {
		name: trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	};

	database.ref().push(newTrain);

//logs to check
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

//Alert
	alert("Train successfully added");

//Clear form boxes
	$("#name-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#frequency-input").val("");
});

//Firebase event when train is added

database.ref().on("child_added", function(snapshot, prevChildKey) {
	console.log(snapshot.val());

	//Variables to store info
	var trainName = snapshot.val().name;
	var trainDest = snapshot.val().destination;
	var trainTime = snapshot.val().time;
	var trainFreq = snapshot.val().frequency;

	//Console checks
	console.log(trainName);
	console.log(trainFreq);
	console.log("Train Time is: "+ trainTime);

	//Convert train start
	var startTimeObject = {
			hours: trainTime[0] + trainTime[1] + "",
			minutes: trainTime[3] + trainTime[4] + ""
			};
	var momTime = moment(startTimeObject);


//Loop while time next train arrives is before current time.
	
	while (momTime.diff(moment(), "minutes") < 0) {
		momTime.add(trainFreq, 'm');
		console.log(momTime.format("HH:mm"));
	};

//Local variables to add to table.
	var nextTrain = momTime.format("HH:mm"); 
	var trainMins = momTime.diff(moment(), "minutes");
	console.log("mins" + trainMins);

	//Add train data into table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + 
		trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>"
		+ trainMins + "</td></tr>");

});