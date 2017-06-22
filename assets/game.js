//Global variables

var startDisplay;
var gameHTML;
var theTime;
var counter = 15;
var questionCounter = 0;
var correctTotal = 0;
var wrongTotal = 0;
var missedTotal = 0;

var correctAnswers = [
"C. Taxi Driver", 
"B. The Silence of the Lambs", 
"A. Sixth Sense", 
"C. Scarface", 
"D. The Usual Suspects", 
"A. Sudden Impact", 
"B. 2001: A Space Odessey", 
"D. Pulp Fiction"];

var questionArray = [
'"You talking to me?"', 
'"I\'m having an old friend for dinner."', 
'"I see dead people."', 
'"Say "HELLO!" to my little friend!"', 
'"The greatest trick the devil ever pulled was convincing the world he didn\'t exist."', 
'"Go ahead, make my day."', '"Open the pod bay doors, please, HAL"', 
'"They call it a Royale with cheese."'];

var answerArray = [
["Anger Management", "Last Man Standing", "Taxi Driver", "Save The Last Dance"], 
["Murder She Wrote","The Silence of the Lambs","Maid to Kill","Dead Man Dessert"], 
["Sixth Sense", "It Comes in the Night", "Dead Rising", "Tokyo Horror Story"], 
["Terminator","Goodfellas","Scarface","Casino"], ["Let Me In", "When Evil Comes", "Oceans Eleven", "The Usual Suspects"], 
["Sudden Impact","The Good, The Bad, and The Ugly","Road to the West","Lethal Weapon"], 
["First Contact", "2001: A Space Odessey", "A.I", "Prometheus"], 
["Ride or Die","Welcome to Good Burger","Hard Knock\'s","Pulp Fiction"]];

var gifArray = [
'<iframe class="center-block img-right" src="https://media.giphy.com/media/3o6gEaWjgBft7euDPW/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right" src="https://media.giphy.com/media/CdG1VUd9dXr68/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right"  src="https://media.giphy.com/media/DvtsYOKrqPZg4/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right" src="https://media.giphy.com/media/gYkga3bZav66I/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right" src="https://media.giphy.com/media/8qwYGJVIOWhSo/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right" src="https://media.giphy.com/media/l41YmgdpcJwUngcXm/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right" src="https://media.giphy.com/media/CUF595USvDMnS/giphy.gif" width="480" height="480" frameBorder="0">', 
'<iframe class="center-block img-right" src="https://media.giphy.com/media/fKBh0mt02CypW/giphy.gif" width="480" height="480" frameBorder="0">'];

$(document).ready(function() {

function startScreen() {
	startDisplay = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' role='button'>Ready?</a></p>";
	$(".mainArea").html(startDisplay);

}

startScreen();

$("body").on("click", ".start-button", function(event){
	generateHTML();
	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){

	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		clearInterval(theTime);
		winResult();
	}
	else {
		clearInterval(theTime);
		lossResult();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){	
	gameReset();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function resultFromTimeOut() {
	missedTotal++;
	gameHTML = "<p class='text-center timer-p'>Time Left: <span class='timer'>" + 
	counter + "</span></p>" + "<p class='text-center'>You ran out of time! " + 
	'<iframe class="center-block img-right" src="https://media.giphy.com/media/RBeddeaQ5Xo0E/giphy.gif" width="480" height="400" frameBorder="0">';
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function winResult() {
	correctTotal++;
	gameHTML = "<p class='text-center timer-p'>Time Left: <span class='timer'>" 
	+ counter + "</span></p>" + "<p class='text-center'> Correct!" + gifArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function lossResult() {
	wrongTotal++;
	gameHTML = "<p class='text-center timer-p'>Time Left: <span class='timer'>" + 
	counter + "</span></p>" + "<p class='text-center'>Wrong!" +  
	'<iframe class="center-block img-right" src="https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif" width="480" height="500" frameBorder="0">';
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Left: <span class='timer'>15</span></p><p class='text-center'>" + 
	questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + 
	answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1]+
	"</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 15;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theTime = setInterval(fifteenSeconds, 1000);
	function fifteenSeconds() {
		if (counter === 0) {
			clearInterval(theTime);
			resultFromTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + 
	counter + "</span></p>" + "<p class='text-center'>All done, here's your results!" + 
	"</p>" + "<p class='summary-correct'>Correct: " + correctTotal + "</p>" + 
	"<p>Wrong: " + wrongTotal + "</p>" + "<p>Unanswered: " + missedTotal + 
	"</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' role='button'>Try Again?</a></p>";
	$(".mainArea").html(gameHTML);
}

function gameReset() {
	questionCounter = 0;
	correctTotal = 0;
	wrongTotal = 0;
	missedTotal = 0;
	counter = 15;
	generateHTML();
	timerWrapper();
}
