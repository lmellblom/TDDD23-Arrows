var GAME = GAME || {};

GAME.MainMenu = function() {};


GAME.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#969696';



		var back = this.add.sprite(0, -(backgroundHeight - this.world.height), 'background');

		if (this.world.width > back.width) { // add more
			this.add.sprite(back.width, -(backgroundHeight - this.world.height), 'background');
		}

		var startGame = this.add.sprite(this.world.centerX, this.world.centerY-10, 'playButton');
		startGame.anchor.set(0.5);
		startGame.inputEnabled = true;
		startGame.events.onInputDown.add(this.startAllLevels, this);

		//bubbleText
		
		var mascot = this.add.sprite(this.world.width - 170, this.world.height-180, 'mascotIcon');
	//	var bubbleT = this.add.sprite(this.world.width - 340, this.world.height-300, 'bubbleText');
	    mascot.scale.setTo(0.5);
	  //  bubbleT.scale.setTo(1.2);

	   // var t = "Hello! My name is XXXX \n and I am lost :( \nHelp me home!"
	   // var st = { font: "16px Carter One", fill: "#000", align: "center",  stroke: "#000", strokeThickness: 0 };
       // var text = this.add.text(this.world.width - 305, this.world.height-250, t, st);




		// tween the startGame to make it a little bit more good look
		/*startGame.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
        var playTween = this.add.tween(startGame);
		playTween.to({
			angle: -startGame.angle
		},4000+Math.random()*4000,Phaser.Easing.Linear.None,true,0,1000,true);
*/

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

		//backgroundMusicPlayer = this.add.audio('forestSound',1,true);   
		//this.sound.setDecodedCallback(backgroundMusicPlayer, this.start, this);
		clickSound = this.add.audio('clickSound');

	},

	//start: function() {    
	//	backgroundMusicPlayer.play(); // starts on the whole object now since i add it!! wow :D 
	//},
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
	}

};