var GAME = GAME || {};

GAME.MainMenu = function() {};


GAME.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#969696';

		var back = this.add.sprite(-this.game.width, -(backgroundHeight - this.world.height), 'background');

		if (this.world.width > back.width) { // add more background?
			this.add.sprite(back.width, -(backgroundHeight - this.world.height), 'background');
		}

		var startGame = this.add.sprite(this.world.centerX, this.world.centerY+40, 'playButton');
		startGame.anchor.set(0.5);
		startGame.scale.setTo(0.8);
		startGame.inputEnabled = true;
		startGame.events.onInputDown.add(this.startAllLevels, this);

		var header = this.add.sprite(this.world.centerX, this.world.centerY-200, "arrowHeader");
		header.anchor.set(0.5);
		header.scale.setTo(0.6);

		// tween the logo also
		header.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
          var headerTween = this.add.tween(header);
		headerTween.to({
			angle: -header.angle
		},5000+Math.random()*5000,Phaser.Easing.Linear.None,true,0,1000,true);

		//backgroundMusicPlayer = this.add.audio('forestSound',1,true);   
		//this.sound.setDecodedCallback(backgroundMusicPlayer, this.start, this);
		clickSound = this.add.audio('clickSound');

	},
	update: function() {

	},
	startTheGame: function() {
		this.state.start('Level', true, false, '1'); // always start att the level 1? 
	},
	startAllLevels: function() {
		this.game.state.start('SelectLevels');
	}

};
