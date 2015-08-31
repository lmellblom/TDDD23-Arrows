var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
	preload: function() {
		this.load.image('sky', 'assets/sky.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.image('diamond', 'assets/diamond.png');
	    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

	    this.load.image('background', 'assets/background.jpg');
	    // loading icons? 
	   /*this.load.image('doneIcon', 'assets/icons/pink/done.png');
	    this.load.image('exitIcon', 'assets/icons/pink/exit.png');
	    this.load.image('heartIcon', 'assets/icons/pink/heart.png');*/
	    this.load.image('lineIcon', 'assets/icons/line.png');
	    this.load.image('lockedIcon', 'assets/icons/locked.png');
	    this.load.image('backIcon', 'assets/icons/backWhite.png');
	    this.load.image('madeItIcon', 'assets/icons/madeIt.png');
	    this.load.image('bubble', 'assets/bubble.png');
	},
	create: function() {
		this.state.start('MainMenu');
	}
};