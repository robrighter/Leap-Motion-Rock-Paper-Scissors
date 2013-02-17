define([],function(){

	function Shooter(){

		var counters = {
			rock: 0,
			paper: 0,
			scissors: 0
		};

		var callbacks = {};

		var threshold = 5;

		window.Leap.loop(function(frame) {
			var hands = frame.hands.length;
			var fingers = frame.fingers.length;
			if(hands === 1){
				if(fingers < 2){
					counters.rock++;
				}
				else if(fingers === 2){
					counters.scissors++;
				}
				else if(fingers > 2){
					counters.paper++;
				}
				notifyIfValid();	
			}
		});


		var cbcounter = 0;
		this.getValue = function(callback){
			resetCounter();
			callbacks[(cbcounter++)+'cb'] = callback;
		};

		function notifyIfValid(){
			//window.console.log(counters.rock);
			var notifyValue = null;
			if(counters.rock > threshold){
				notifyValue = 'rock';
			}
			if(counters.scissors > threshold){
				notifyValue = 'scissors';
			}
			if(counters.paper > threshold){
				notifyValue = 'paper';
			}
			if(notifyValue){
				notifyAllCallbacks(notifyValue);
			}
		}

		function notifyAllCallbacks(value){
			var key;
			for(key in callbacks){
				callbacks[key](value);
				delete callbacks[key];
			}
		}

		function resetCounter(){
			counters.rock = 0;
			counters.scissors = 0;
			counters.paper = 0;
		}
	}

	return Shooter;

});