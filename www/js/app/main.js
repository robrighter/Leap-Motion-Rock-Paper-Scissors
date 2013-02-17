define(function (require) {
// Load any app-specific modules
// with a relative require call,
// like:
	var $ = require('jquery');
	var Shooter = require('app/shooter');

	var shooter = new Shooter();

	var viewer = $('#console');
	var userchoice = $('#userchoice');
	var opponentchoice = $('#opponentchoice');
	var narrator = $('#narration');
	var COUNT_SPEED = 800;	

	function startGame(){
		userchoice.attr('class','nothing');
		opponentchoice.attr('class','nothing');
		narrate('1');
		setTimeout(function(){
			narrate('2');
			setTimeout(function(){
				narrate('3');
				setTimeout(function(){
					narrator.html('Go!');
					shooter.getValue(function(value){
						window.console.log('GOT BACK A ' + value);
						userchoice.attr('class', value);
						var opponent = generateComputerTurn();
						opponentchoice.attr('class', opponent);
						scoreGame(value, opponent);
						setTimeout(function(){
							//start waiting for a new game
							waitForAGame();
						}, 3000);
					});
				},COUNT_SPEED);
			},COUNT_SPEED);
		},COUNT_SPEED);
	}


	function waitForAGame(){
		shooter.getValue(startGame);	
	}


	function narrate(value){
		narrator.fadeOut('fast',function(){
			narrator.html(value);
			narrator.fadeIn('fast');
		});
	}

	function scoreGame(value, opponent){
		if(value === opponent){
			draw();
		}
		else if ( ( value === 'scissors') && ( opponent === 'paper') ){
			win();
		}
		else if ( ( value === 'paper') && ( opponent === 'rock') ){
			win();
		}
		else if ( ( value === 'rock') && ( opponent === 'scissors') ){
			win();
		}
		else{
			lose();
		}
		//score it
	}

	function draw(){
		narrate('Draw');
	}

	function win(){
		narrate('You Win');
	}

	function lose(){
		narrate('You Lose');
	}

	function generateComputerTurn(){
		var results = ['rock', 'paper', 'scissors'];
		return results[Math.floor(Math.random()*3)];
	}


	waitForAGame();
});
