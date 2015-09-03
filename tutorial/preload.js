var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
	preload: function() {
		// loading assets for the game
		this.load.image('sky', 'assets/sky.png');
	    this.load.image('ground', 'assets/platform.png');
	    this.load.image('star', 'assets/star.png');
	    this.load.image('diamond', 'assets/diamond.png');
	    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

	    this.load.image('background', 'assets/background.jpg');

	    // loading icons for the menu
	    this.load.image('lineIcon', 'assets/icons/line.png');
	    this.load.image('lockedIcon', 'assets/icons/locked.png');
	    this.load.image('backIcon', 'assets/icons/backWhite.png');
	    this.load.image('madeItIcon', 'assets/icons/madeIt.png');
	    this.load.image('bubble', 'assets/bubble.png');

	    // loading level data
	    this.load.text('level1JSON', 'data/level1.json');
	    this.load.text('level2JSON', 'data/level2.json');
	},
	create: function() {
		this.state.start('MainMenu');
	}
};