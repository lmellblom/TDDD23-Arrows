var GAME = GAME || {};

GAME.MainMenu = function() {};


GAME.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#969696';
		this.add.sprite(0, -520, 'background');

		var startGame = this.add.sprite(this.world.centerX, this.world.height-200, 'playButton');
		startGame.anchor.set(0.5);
		startGame.inputEnabled = true;
		startGame.events.onInputDown.add(this.startAllLevels, this);

		// tween the startGame to make it a little bit more good look
		startGame.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
        var playTween = this.add.tween(startGame);
		playTween.to({
			angle: -startGame.angle
		},4000+Math.random()*4000,Phaser.Easing.Linear.None,true,0,1000,true);


		var style = { font: "60px Carter One", fill: "#FFF", align: "center",  stroke: "#000", strokeThickness: 5 };
		var header = this.add.text(this.world.centerX, this.world.centerY-200, "ARROWS", style);
		header.anchor.set(0.5);

		header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

		// tween the logo also
		header.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
          var headerTween = this.add.tween(header);
		headerTween.to({
			angle: -header.angle
		},5000+Math.random()*5000,Phaser.Easing.Linear.None,true,0,1000,true);


		this.backgroundMusic = this.add.audio('forestSound',1,true);   
		this.sound.setDecodedCallback(this.backgroundMusic, this.start, this);

},

	start: function() {

    
   this.backgroundMusic.play(); // starts on the whole object now since i add it!! wow :D 
   // bass.onLoop.add(hasLooped, this);

 //   text.text = 'bass';

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
