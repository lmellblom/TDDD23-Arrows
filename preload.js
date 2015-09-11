var GAME = GAME || {};

GAME.Preload = function() {};

GAME.Preload.prototype = {
	preload: function() {

		// load sounds
		this.load.audio("forestSound", "assets/sounds/forest.wav");
		this.load.audio("clickSound", "assets/sounds/menu-click.wav");
		this.load.audio("winSound", "assets/sounds/win.wav");
		this.load.audio("starSound", "assets/sounds/coin.wav");
		this.load.audio("arrowSound", "assets/sounds/arrow-click.wav");
		this.load.audio("gameOverSound", "assets/sounds/game-over.wav");

		//  Load the Google WebFont Loader script
    	this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		// loading assets for the game
		this.preloadBack = this.add.sprite(0, -520, 'background');

		// add a preload stugg
		var style = { font: "40px Carter One", fill: "#FFF", align: "center",  stroke: "#000", strokeThickness: 5 };
		var header = this.add.text(this.world.centerX, this.world.centerY+200, "Loading", style);
		header.anchor.set(0.5);
		header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
		this.load.setPreloadSprite(header);
	    
	    this.load.image('playButton', 'assets/game-ui/playBtn.png');

	    // settings panel
	    this.load.image('banMusic', 'assets/game-ui/banMusic.png');
	    this.load.image('banSound', 'assets/game-ui/banSound.png');
	    this.load.image('settingsBase', 'assets/game-ui/baseSettings.png');
	    this.load.image('infoIcon', 'assets/game-ui/infoIcon.png');
	    this.load.image('menuIcon', 'assets/game-ui/menuIcon.png');
	    this.load.image('musicIcon', 'assets/game-ui/musicIcon.png');
	    this.load.image('soundIcon', 'assets/game-ui/soundIcon.png');

	    // for game ui
	    this.load.image('clearedModule', 'assets/game-ui/LevelCleared.png');
	    this.load.image('failedModule', 'assets/game-ui/LevelFailed.png');
	    this.load.image('panelModule', 'assets/game-ui/panel.png');
	    this.load.image('menuBtn', 'assets/game-ui/menu.png');
	    this.load.image('nextBtn', 'assets/game-ui/next.png');
	    this.load.image('reloadBtn', 'assets/game-ui/reload.png');
	    this.load.image('settingsBtn', 'assets/game-ui/settings.png');
	    this.load.image('yesBtn', 'assets/game-ui/yesBtn.png');
	    this.load.image('noBtn', 'assets/game-ui/xBtn.png');

	    this.load.image('star', 'assets/game-ui/star.png');
	    this.load.image('starPoints', 'assets/game-ui/starPoints.png');

	    // for the levels
	    this.load.image('levelModule', 'assets/game-ui/levelSelect.png');
	    this.load.image('inactiveLevel', 'assets/game-ui/levelSelectInactive.png');
	    this.load.image('activeLevel', 'assets/game-ui/levelBase.png');
	    

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
	     "stars" : [
	     	{"x": 4, "y" : 3}
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
	},
	{
	    "arrows" : [ 
	        {"x": 1, "y": 1, "dir": "right", "selected": true, "color": "blue"},
	        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "blue"}
	     ],
	    "goalInfo" : [
	        {"x":4, "y":5, "color": "blue"}
	    ]
	},
];


	},
	create: function() {
		

		// add loading baR? 

		this.state.start('MainMenu');
	}
};