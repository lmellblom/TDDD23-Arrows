var GAME = GAME || {};

GAME.MainMenu = function() {};


GAME.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#FF739A';
		this.add.sprite(0, 0, 'background');

		var style = { font: "65px Arial", fill: "#FFF", align: "center" };

		var phrases = ["STARTA", "NIVÅER", "CREDITS"];

		// start y value
		var startY = this.world.centerY-100;
		var text = [];

		// tried to short down the code a little bit
		for (var i=0; i<phrases.length; i++) {
			text[i]=this.add.text(10, startY + 100*i, phrases[i], style);
			//text[i].anchor.set(0.5);
    		text[i].inputEnabled = true;

    		text[i].events.onInputOver.add(this.hoverOver, this, text[i]);
			text[i].events.onInputOut.add(this.hoverOut, this, text[i]);
		}

		text[0].events.onInputDown.add(this.startTheGame, this);
		text[1].events.onInputDown.add(this.startAllLevels, this);
		text[2].events.onInputDown.add(this.startCredit, this);


	},
	update: function() {

	},
	startTheGame: function() {
		this.state.start('Level', true, false, '1'); // always start att the level 1? 
	},
	startCredit: function() {
		this.game.state.start('Credits');
	},
	startAllLevels: function() {
		this.game.state.start('SelectLevels');
	},
	hoverOver: function(text) {
		text.fill= '#FF96B4';
	},
	hoverOut: function(text) {
		text.fill= '#fff';
	}

};
