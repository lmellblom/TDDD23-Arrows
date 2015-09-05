var GAME = GAME || {};

GAME.SelectLevels = function() {};


GAME.SelectLevels.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#9BFF73';
		this.add.sprite(0, 0, 'background');


		var style = { font: "30px Arial", fill: "#FFF", align: "center" };
		var style2 = { font: "60px Arial", fill: "#FFF", align: "center" };


		var header = this.add.text(this.world.centerX, 100, "NIVÅER", style2);
		header.anchor.set(0.5);
		var openLevel;

		/*

		// ska rita ut alla levlar.. just nu ej så bra utformad!!!
		var startY = this.world.centerY-100;
		var startX = this.world.centerX - 200;
		for (var i=0; i<numberOfLevels+4; i++){
			var y = i > 2 ? startY+130 : startY; // om mer nivåer än 3 så ska den hoppa neeed
			var x = i > 2 ? startX + 200*(i-3) : startX + 200*i;

			if(i==0 || madeLevels[i-1]) {
				if (madeLevels[i])
					openLevel = this.add.sprite(x, y, 'madeItIcon');
				else
					openLevel = this.add.sprite(x, y, 'lineIcon');
				var textOn = this.add.text(x, y-20, i+1, style);
				textOn.anchor.set(0.5);
				openLevel.anchor.set(0.5);
				//openLevel.scale.setTo(0.3, 0.3);

				// able to click on it
				openLevel.inputEnabled = true;
				openLevel.events.onInputDown.add(this.startLevel, {game: this, number: i+1}); // kanske inte världens bästa. TODO lösa hur man skickar med argument bättre
			}
			else { // a locked level
				var lockedLevel = this.add.sprite(x, y, 'lockedIcon');
				lockedLevel.anchor.set(0.5);
				//lockedLevel.scale.setTo(0.3, 0.3);
			}
		}*/

		// backbutton
		var backText = this.add.text(180, this.world.height-100, "Meny", style);
		backText.anchor.set(0.5);
		backText.inputEnabled = true;
		backText.events.onInputDown.add(this.backToMenu, this);

	},
	update: function() {

	},
	backToMenu: function() {
		this.game.state.start('MainMenu');
	},
	startLevel : function(){
		this.game.state.start('Level', true, false, this.number);
	}

};
