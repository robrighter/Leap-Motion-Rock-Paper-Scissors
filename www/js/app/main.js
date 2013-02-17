define(function (require) {
// Load any app-specific modules
// with a relative require call,
// like:
	var $ = require('jquery');
	var Shooter = require('app/shooter');

	var shooter = new Shooter();

	var viewer = $('#console');
	var userchoice = $('#userchoice');
	var narrator = $('#narration');
	var COUNT_SPEED = 800;	

	function startGame(){
		userchoice.attr('class','nothing');
		narrate('1');
		setTimeout(function(){
			narrate('2');
			setTimeout(function(){
				narrate('3');
				setTimeout(function(){
					viewer.html('Shoot!');
					shooter.getValue(function(value){
						window.console.log('GOT BACK A ' + value);
						userchoice.attr('class', value);
						scoreGame(value);
						setTimeout(function(){
							//start waiting for a new game
							waitForAGame();
						}, 4000);
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

	function scoreGame(value){
		//score it
	}


	waitForAGame();
});