var GAME = GAME || {};

GAME.FinishedLevels = function() {};


GAME.FinishedLevels.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#969696';

		var back = this.add.sprite(0,  -(837 - this.world.height), 'background');
		
		var styles = LOGOSTYLE;
		styles.font = "40px Carter One";

		var header = this.add.text(this.world.centerX, this.world.centerY-150, "CONGRATULATIONS", styles);
		header.anchor.set(0.5);
		header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

		// tween the logo also
		header.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
          var headerTween = this.add.tween(header);
		headerTween.to({
			angle: -header.angle
		},5000+Math.random()*5000,Phaser.Easing.Linear.None,true,0,1000,true);

		var backBtn = this.add.sprite(this.world.centerX, this.world.centerY+110, 'backToMenuBtn');
		backBtn.anchor.set(0.5);
		backBtn.scale.setTo(0.8);
		backBtn.inputEnabled = true;
		backBtn.events.onInputDown.add(this.backToMenu, this);

	  	var t = "WOW! You have completed \n all levels. Congratz!"
	    var st = { font: "14px Carter One", fill: "#000", align: "center",  stroke: "#000", strokeThickness: 0 };
        var text = this.add.text(this.world.centerX, this.world.centerY+30, t, st);
        text.anchor.set(0.5);
	},	
	update: function() {

	},
	backOneStep: function() {
		this.game.state.start('SelectLevels');
	},
	backToMenu: function() {
		this.state.start('MainMenu'); // always start att the level 1? 
	}
};
