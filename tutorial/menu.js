var GAME = GAME || {};

GAME.MainMenu = function() {};


GAME.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#FF739A';
		this.add.sprite(0, 0, 'background');

		// reset game options
		score = 0;

		var style = { font: "65px Arial", fill: "#FFF", align: "center" };

		var phrases = ["STARTA", "NIVÅER", "CREDITS"];

		// start y value
		var startY = this.world.centerY-100;
		var text = [];

		// tried to short down the code a little bit
		for (var i=0; i<phrases.length; i++) {
			text[i]=this.add.text(this.world.centerX-300, startY + 100*i, phrases[i], style);
			//text[i].anchor.set(0.5);
    		text[i].inputEnabled = true;

    		text[i].events.onInputOver.add(this.hoverOver, this, text[i]);
			text[i].events.onInputOut.add(this.hoverOut, this, text[i]);
		}

		text[0].events.onInputDown.add(this.startTheGame, this);
		text[1].events.onInputDown.add(this.startAllLevels, this);
		text[2].events.onInputDown.add(this.startCredit, this);

		// making bubbles!! :)
		/*var bubblesEmitter = this.game.add.emitter(300, 500, 50);
          bubblesEmitter.makeParticles("bubble");
          bubblesEmitter.maxParticleScale = 0.6;
          bubblesEmitter.minParticleScale = 0.2;
          bubblesEmitter.setYSpeed(-30, -40);
          bubblesEmitter.setXSpeed(-3, 3);
          bubblesEmitter.gravity = 0;
          bubblesEmitter.width = 320;
          bubblesEmitter.minRotation = 0;
          bubblesEmitter.maxRotation = 40;
          bubblesEmitter.flow(15000, 2000,1,-1);*/

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
