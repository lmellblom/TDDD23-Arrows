var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
	preload: function() {

		//  Load the Google WebFont Loader script
    	this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		// loading assets for the game
	    this.load.image('background', 'assets/game-ui/bgSmaller.png');
	    this.load.image('playButton', 'assets/game-ui/playBtn.png');

	    // for game ui
	    this.load.image('clearedModule', 'assets/game-ui/LevelCleared.png');
	    this.load.image('failedModule', 'assets/game-ui/LevelFailed.png');
	    this.load.image('menuBtn', 'assets/game-ui/menu.png');
	    this.load.image('nextBtn', 'assets/game-ui/next.png');
	    this.load.image('reloadBtn', 'assets/game-ui/reload.png');


	    

	    // arrows that can be clicked
	    this.load.image('rightblue', 'assets/blue/right.png');
	    this.load.image('leftblue', 'assets/blue/left.png');
	    this.load.image('downblue', 'assets/blue/down.png');
	    this.load.image('upblue', 'assets/blue/up.png');
	    this.load.image('emptyblue', 'assets/blue/empty.png');
	    this.load.image('goalblue', 'assets/blue/home.png');

	    this.load.image('rightpink', 'assets/pink/right.png');
	    this.load.image('leftpink', 'assets/pink/left.png');
	    this.load.image('downpink', 'assets/pink/down.png');
	    this.load.image('uppink', 'assets/pink/up.png');
	    this.load.image('emptypink', 'assets/pink/empty.png');
	    this.load.image('goalpink', 'assets/pink/home.png');

	    // all none seleted arrows
	    this.load.image('right', 'assets/notSelected/right.png');
	    this.load.image('left', 'assets/notSelected/left.png');
	    this.load.image('down', 'assets/notSelected/down.png');
	    this.load.image('up', 'assets/notSelected/up.png');
	    this.load.image('empty', 'assets/notSelected/empty.png');

	    this.load.image('goal', 'assets/home.png');
	    allLevelData = [
	{
	    "arrows" : [ 
	        {"x": 1, "y": 1, "dir": "right", "selected": true, "color": "blue"},
	        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 4, "y": 5, "dir": "left", "selected": false,"color": "blue"},
	        {"x": 0, "y": 5, "dir": "down", "selected": false,"color": "blue"}
	     ],
	    "goalInfo" : [
	        {"x":0, "y":7, "color": "blue"}
	    ]
	},
	{
	    "arrows" : [ 
	        {"x": 1, "y": 1, "dir": "down", "selected": true,"color": "blue"},
	        {"x": 0, "y": 2, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 3, "y": 2, "dir": "left", "selected": false,"color": "blue"},
	        {"x": 2, "y": 3, "dir": "right", "selected": false,"color": "blue"},
	        {"x": 1, "y": 4, "dir": "right", "selected": false,"color": "blue"},
	        {"x": 2, "y": 4, "dir": "down", "selected": true,"color": "blue"},
	        {"x": 3, "y": 4, "dir": "up", "selected": false,"color": "blue"},
	        {"x": 4, "y": 3, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 2, "y": 6, "dir": "up", "selected": false,"color": "blue"},
	        {"x": 0, "y": 7, "dir": "right", "selected": false,"color": "blue"}
	     ],
	    "goalInfo" : [
	        {"x": 4, "y": 7, "color": "blue"}
	    ]
	},
	{
	    "arrows" : [ 
	        {"x": 1, "y": 0, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 4, "y": 0, "dir": "left", "selected": false,"color": "blue"},
	        {"x": 0, "y": 1, "dir": "right", "selected": true,"color": "blue"},
	        {"x": 2, "y": 1, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 4, "y": 1, "dir": "up", "selected": false,"color": "blue"},
	        {"x": 3, "y": 2, "dir": "right", "selected": false,"color": "blue"},
	        {"x": 0, "y": 3, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 1, "y": 3, "dir": "left", "selected": false,"color": "blue"},
	        {"x": 2, "y": 4, "dir": "right", "selected": false,"color": "blue"},
	        {"x": 0, "y": 5, "dir": "down", "selected": false,"color": "blue"},
	        {"x": 2, "y": 5, "dir": "left", "selected": false,"color": "blue"},
	        {"x": 0, "y": 6, "dir": "right", "selected": false,"color": "blue"},
	        {"x": 3, "y": 6, "dir": "up", "selected": false,"color": "blue"}
	     ],
	    "goalInfo" : [
	        {"x": 4, "y": 2, "color": "blue"}
	    ]
	}
];


	},
	create: function() {
		this.state.start('MainMenu');
	}
};