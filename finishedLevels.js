var GAME = GAME || {};

GAME.FinishedLevels = function() {};


GAME.FinishedLevels.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#969696';
		this.add.sprite(0, -(backgroundHeight - gameHeight), 'background');

		var backBtn = this.add.sprite(this.world.centerX, this.world.height-200, 'playButton');
		backBtn.anchor.set(0.5);
		backBtn.inputEnabled = true;
		backBtn.events.onInputDown.add(this.backToMenu, this);

		// tween the backBtn to make it a little bit more good look
		backBtn.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
        var playTween = this.add.tween(backBtn);
		playTween.to({
			angle: -backBtn.angle
		},4000+Math.random()*4000,Phaser.Easing.Linear.None,true,0,1000,true);

		// klarat spelet, visa text! 
		var module = this.add.sprite(this.world.centerX ,this.world.centerY-100 , 'panelModule');
        module.scale.setTo(0.9, 1.4);
        module.anchor.set(0.5,0.5);

        var text = this.add.text(this.world.centerX, this.world.centerY-120, "YOU MADE IT! \n More levels will \n show up shortly.", generalStyle);
        text.anchor.set(0.5);

        // add settingspanel
	    settingsPanel(this);
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
