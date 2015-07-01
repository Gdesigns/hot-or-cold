$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	/* Start a new game */
	
	newGame();

	/* Submit button */

	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = playerChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = hotorCold(Math.abs(randomNumber - userChoice));
			};
		}
		else {
			setFeedback("You won - you need to start a new game.");
		};
  	});

  	/* Click button to create new game */

  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	/* Creates a new game, clearing all information from previous game, if already played */

	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = numberGenerator();
		setFocus();
		clearText();
	}

	/* Display the Hot or Cold level */

	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

	/* Guess count */

	function setCount(count) {
		$('#count').text(guessCount);
	}

	/* Random number generator */

	function numberGenerator() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		// console.log("Generated Random Number = "+ generatedNumber);
		return generatedNumber;
	}
	
	/* Set focus to the inputbox */

	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/* Clear input box after guess has been made */

	function clearText() {
		$('#userGuess').val('');
	}

	/* Player's Choice */

	function getChoice() {
		// console.log("User Choice = "+ userChoice);
		return userChoice;
	}

	/* Function to see if the choice is a number between 1 and 100 */

	function playerChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("That's not a number!");
			return true;
		}
		else if (userChoice < 1 || userChoice > 100) {
			setFeedback("It must be a number between 1 and 100!");
			return true;
		}
		else if ($.trim(userChoice) == '') {
			setFeedback("Guess!");
			return true;
		}
		else {
			return false;
		};
	}

	/* Hot or Cold */

	function hotorCold(guessDifference) {

		if (guessDifference == 0) {
			setFeedback("Bravo! You guessed it!");
			found = true;
			return false;
		}
		else if (guessDifference <= 5) {
			setFeedback("YOU'RE ON FIRE!");
			return true;
		}
		else if (guessDifference <= 10){
			setFeedback("Getting Hot!");
			return true;
		}
		else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("Getting warmer...");
			return true;
		}
		else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("Getting cold...");
			return true;
		}
		else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("Getting Icy!");
			return true;
		}
		else {
			setFeedback("You're freezing!");
			return true;
		}

	}

});


