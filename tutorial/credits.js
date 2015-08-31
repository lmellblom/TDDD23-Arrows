var GAME = GAME || {};

GAME.Credits = function() {};

GAME.Credits.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#9273FF';
		this.add.sprite(0, 0, 'background');
		// reset game options
		score = 0;

		var style = { font: "65px Arial", fill: "#FFF", align: "center" };
		var phrase = "by Linnéa";

		var back = "Tillbaka till menyn";
		var style2 = { font: "30px Arial", fill: "#FFF", align: "center" };

		var creditText = this.add.text(this.world.centerX, this.world.centerY-100, phrase, style);
		var backText = this.add.text(this.world.centerX, this.world.centerY+100, back, style2);

		backText.anchor.set(0.5);
		creditText.anchor.set(0.5);
		backText.inputEnabled = true;

		// text events
		backText.events.onInputDown.add(this.backToMenu, this);

	},
	update: function() {

	},

	backToMenu: function() {
		this.state.start('MainMenu');
	}

};
