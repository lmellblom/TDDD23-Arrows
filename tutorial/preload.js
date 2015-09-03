var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
	preload: function() {
		// loading assets for the game
	    this.load.image('background', 'assets/background.jpg');

	    // arrows that can be clicked
	    this.load.image('rightSelected', 'assets/selected/right.png');
	    this.load.image('leftSelected', 'assets/selected/left.png');
	    this.load.image('downSelected', 'assets/selected/down.png');
	    this.load.image('upSelected', 'assets/selected/up.png');

	    // all none seleted arrows
	    this.load.image('right', 'assets/notSelected/right.png');
	    this.load.image('left', 'assets/notSelected/left.png');
	    this.load.image('down', 'assets/notSelected/down.png');
	    this.load.image('up', 'assets/notSelected/up.png');

	    this.load.image('goal', 'assets/home.png');

	    this.load.image('obstalce1', 'assets/blackHole.png');

	    this.load.text('level1JSON', 'data/level1.json');
	    this.load.text('level2JSON', 'data/level2.json');

	},
	create: function() {
		this.state.start('MainMenu');
	}
};