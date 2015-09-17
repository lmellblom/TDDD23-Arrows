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
		this.game.stage.backgroundColor = '#FFF';

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
	    
	    this.load.image('rightArrow', 'assets/game-ui/arrowActive.png');

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
	    this.load.image('blackHole', 'assets/blackHole.png');


	    // the level data! maybe store this in another file later!!!!!!! maybe add to the structure a intro message to the level?
	    /*
	    	possible values: 
	    	arrows, tell where to place an arrow in the grid, if it is clickable and the color of the arrow
	    	goalInfo, where the goal is placed
	    	tip: a message that can be shown after done a level
	    	best: the best number of clicks the level can have

	    */
	    allLevelData = [
	    {
		    "arrows" : [ 
		        {"x": 1, "y": 2, "dir": "down", "selected": true, "color": "blue"},
		        {"x": 1, "y": 6, "dir": "right", "selected": false, "color": "blue"}
		    ],
		    "goalInfo" : [
		        {"x":4, "y":6, "color": "blue"}
		    ],
		    "tip" : "Reach the goal in as few clicks as possible.",
		    "best": 2
		},
		{
		    "arrows" : [ 
		        {"x": 1, "y": 1, "dir": "right", "selected": true, "color": "blue"},
		        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 2, "y": 3, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 4, "y": 5, "dir": "left", "selected": false,"color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x":1, "y":5, "color": "blue"}
		    ],
		    "tip" : "You don't need to click on all arrows to reach the goal.",
		    "best": 3
		},
		{
		    "arrows" : [ 
		        {"x": 0, "y": 1, "dir": "down", "selected": true, "color": "blue"},
		        {"x": 2, "y": 1, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 3, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 5, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 7, "dir": "right", "selected": false, "color": "blue"},
		        {"x": 4, "y": 5, "dir": "up", "selected": false, "color": "blue"},
		        {"x": 2, "y": 7, "dir": "up", "selected": false,"color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x":4, "y":1, "color": "blue"}
		    ],
		    "tip" : "When a arrow is fired, it will activate all arrows in its direction.",
		    "best": 3
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
		    ],
		    "tip" : "When you have pressed on a arrow, all active arrows on the grid will be deactivated.",
		    "best": 4
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
		    ],
		    "tip" : "Sometimes it may exist several ways to reach to the goal. Try to take the shortest one.",
		    "best": 7
		},
		// black holes !!
		/* a black hole level to save for later*/
		{
		    "arrows" : [ 
		        {"x": 1, "y": 1, "dir": "down", "selected": true, "color": "blue"},
		        {"x": 1, "y": 3, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 3, "y": 3, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 3, "y": 5, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 1, "y": 5, "dir": "down", "selected": false, "color": "blue"},
		        {"x": 3, "y": 7, "dir": "up", "selected": false, "color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x":1, "y":7, "color": "blue"}
		    ],
		     "blackHole" : [
		    	{"x":1, "y":4}
		    ],
		    "tip" : "An arrow will disappear in the black hole. But every arrow before the black hole will be activated.",
		    "best": 5
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
		        {"x": 0, "y": 7, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 1, "y": 6, "dir": "right", "selected": false,"color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x": 4, "y": 7, "color": "blue"}
		    ],
		    "blackHole" : [
		    	{"x":2, "y":2},
		    	{"x":1, "y":5}
		    ],
		    "tip" : "An arrow will disappear in the black hole. But every arrow before the black hole will be activated.",
		    "best": 4
		},
		{
		    "arrows" : [ 
		        {"x": 0, "y": 0, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 2, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 4, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 0, "y": 6, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 7, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 1, "y": 0, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 1, "y": 4, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 1, "y": 5, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 1, "y": 7, "dir": "up", "selected": true,"color": "blue"},
		        {"x": 2, "y": 0, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 2, "y": 6, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 3, "y": 3, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 4, "y": 5, "dir": "up", "selected": false,"color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x": 1, "y": 1, "color": "blue"}
		    ],
		    "blackHole" : [
		    	{"x":1, "y":3},
		    	{"x":3, "y":1},
		    	{"x":3, "y":5},
		    	{"x":3, "y":6}
		    ],
		    "tip" : "Don't let all the arrows fool you.",
		    "best": 6
		},
		{
		    "arrows" : [ 
		        {"x": 0, "y": 0, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 2, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 4, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 6, "dir": "up", "selected": true,"color": "blue"},
		        {"x": 1, "y": 7, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 2, "y": 1, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 2, "y": 2, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 2, "y": 6, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 3, "y": 0, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 3, "y": 2, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 3, "y": 4, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 4, "y": 0, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 4, "y": 2, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 4, "y": 7, "dir": "left", "selected": false,"color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x": 1, "y": 6, "color": "blue"}
		    ],
		    "blackHole" : [
		    	{"x":0, "y":1},
		    	{"x":1, "y":3},
		    	{"x":1, "y":5},
		    	{"x":3, "y":3},
		    	{"x":3, "y":6}
		    ],
		    "tip" : "So many arrows and black holes! Gosh",
		    "best": 5
		},
		{
		    "arrows" : [ 
		        {"x": 0, "y": 0, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 0, "y": 2, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 0, "y": 6, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 1, "y": 0, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 1, "y": 2, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 1, "y": 5, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 2, "y": 4, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 2, "y": 7, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 3, "y": 0, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 3, "y": 1, "dir": "right", "selected": false,"color": "blue"},
		        {"x": 3, "y": 2, "dir": "left", "selected": true,"color": "blue"},
		        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 4, "y": 4, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 4, "y": 5, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 4, "y": 6, "dir": "left", "selected": false,"color": "blue"}
		     ],
		    "goalInfo" : [
		        {"x": 1, "y": 7, "color": "blue"}
		    ],
		    "blackHole" : [
		    	{"x":1, "y":1},
		    	{"x":1, "y":6},
		    	{"x":3, "y":3},
		    	{"x":3, "y":7}
		    ],
		    "tip" : "",
		    "best": 7
		}
		// stars
				/* later level with stars
		{
		    "arrows" : [ 
		        {"x": 1, "y": 1, "dir": "right", "selected": true, "color": "blue"},
		        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "blue"},
		        {"x": 2, "y": 3, "dir": "up", "selected": false,"color": "blue"},
		        {"x": 4, "y": 5, "dir": "left", "selected": false,"color": "blue"},
		        {"x": 0, "y": 5, "dir": "down", "selected": false,"color": "blue"}
		     ],
		     "stars" : [
		     	{"x": 4, "y" : 3},
		     	{"x": 1, "y" : 5},
		     ],
		    "goalInfo" : [
		        {"x":0, "y":7, "color": "blue"}
		    ]
		},*/
	];

	},


	create: function() {
		backgroundMusicPlayer = this.add.audio('forestSound',1,true);   
		this.sound.setDecodedCallback(backgroundMusicPlayer, this.start, this);

	},

	start: function() {    
		backgroundMusicPlayer.play(); // starts on the whole object now since i add it!! wow :D 
		console.log("the backgroundmusid " + backCalmMusic);
		if (!backCalmMusic) backgroundMusicPlayer.pause();
		console.log("go to the menu");
		this.state.start('MainMenu');
	}
		

		// add loading baR? 

		
};