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
		this.preloadBack = this.add.sprite(-this.game.width, -(backgroundHeight - this.world.height),'background');
		if (this.world.width > this.preloadBack.width) { // add more
			this.add.sprite(this.preloadBack.width, -(backgroundHeight - this.world.height), 'background');
		}
		this.game.stage.backgroundColor = '#FFF';

		// add the arrow name header
		var header = this.add.sprite(this.world.centerX, this.world.centerY-200, "arrowHeader");
		header.anchor.set(0.5);
		header.scale.setTo(0.6);

		// tween the logo also
		header.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
          var headerTween = this.add.tween(header);
		headerTween.to({
			angle: -header.angle
		},5000+Math.random()*5000,Phaser.Easing.Linear.None,true,0,1000,true);

		// add a preload stuff
		var base = this.add.sprite(this.world.centerX, this.world.centerY + 50, 'progressBase');
		var basebg = this.add.sprite(this.world.centerX, this.world.centerY + 50, 'progressBack');
		this.loader = this.add.sprite(this.world.centerX, this.world.centerY + 50, 'progressGreen');
		base.scale.setTo(0.7);
		basebg.scale.setTo(0.7);
		this.loader.scale.setTo(0.7);
		base.anchor.set(0.5);
		basebg.anchor.set(0.5);
		this.loader.anchor.set(0.5);
		this.load.setPreloadSprite(this.loader);

	    
	    this.load.image('playButton', 'assets/game-ui/startBtn.png'); 		// ändra denna mellan playBtn och startBtn

	    // level selection
	    this.load.image('levelSquare', 'assets/square.png');
	    this.load.image('levelSquareInfo', 'assets/squareInfo.png');
	    this.load.image('levelSquareStar', 'assets/squareStar.png');
	    

	    // mascot
	    this.load.image('spaceHelmet', 'assets/mascot/space.png');

	    this.load.image('tipBar', 'assets/game-ui/tips.png');

	    // stars levelselct
	    this.load.image('smallStar', 'assets/star.png');
	    this.load.image('sparkle', 'assets/sparkle.png');

	    this.load.image('backHouse', 'assets/houseBack.jpg');

	    // settings panel
	    this.load.image('banMusic', 'assets/game-ui/banMusic.png');
	    this.load.image('banSound', 'assets/game-ui/banSound.png');
	    this.load.image('settingsBase', 'assets/game-ui/baseSettings.png');
	    this.load.image('infoIcon', 'assets/game-ui/infoIcon.png');
	    this.load.image('menuIcon', 'assets/game-ui/menuIcons.png');
	    this.load.image('musicIcon', 'assets/game-ui/musicIcon.png');
	    this.load.image('soundIcon', 'assets/game-ui/soundIcon.png');
	    this.load.image('backToMenuBtn', 'assets/game-ui/backToMenuBtn.png');
	    this.load.image('creditsBtn', 'assets/game-ui/creditsBtn.png');

	    

	    // stars when finished a game
	    this.load.image('1star', 'assets/game-ui/1star.png');
	    this.load.image('2star', 'assets/game-ui/2stars.png');
	    this.load.image('3star', 'assets/game-ui/3stars.png');

	    // for game ui
	    this.load.image('clearedModule', 'assets/game-ui/LevelCleared.png');
	    this.load.image('failedModule', 'assets/game-ui/LevelFailed.png');
	    this.load.image('panelModule', 'assets/game-ui/panel.png');
	    this.load.image('menuBtn', 'assets/game-ui/menu.png');
	    this.load.image('nextBtn', 'assets/game-ui/next.png');
	    this.load.image('reloadBtn', 'assets/game-ui/reload.png');
	    this.load.image('reloadIcon', 'assets/game-ui/reload.png'); 			
	    this.load.image('settingsBtn', 'assets/game-ui/settings.png');
	    this.load.image('clearProgress', 'assets/game-ui/clearBtn.png');
	    this.load.image('yesBtn', 'assets/game-ui/yesBtn.png');
	    this.load.image('noBtn', 'assets/game-ui/xBtn.png');

	    this.load.image('star', 'assets/game-ui/star.png');
	    this.load.image('starblue', 'assets/game-ui/starBlue.png');
	    this.load.image('starpink', 'assets/game-ui/starPink.png');
	    //this.load.image('starPoints', 'assets/points.png');
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
	    this.load.image('goalblue', 'assets/blue/homeRound.png'); // home elr homeRound
	    this.load.image('bucketblue', 'assets/blue/colorsplash.png');

	    this.load.image('rightpink', 'assets/pink/right.png');
	    this.load.image('leftpink', 'assets/pink/left.png');
	    this.load.image('downpink', 'assets/pink/down.png');
	    this.load.image('uppink', 'assets/pink/up.png');
	    this.load.image('emptypink', 'assets/pink/empty.png');
	    this.load.image('goalpink', 'assets/pink/homeRound.png'); // home elr homeRound
	    this.load.image('bucketpink', 'assets/pink/colorsplash.png');

	    this.load.image('rightgray', 'assets/gray/right.png');
	    this.load.image('leftgray', 'assets/gray/left.png');
	    this.load.image('downgray', 'assets/gray/down.png');
	    this.load.image('upgray', 'assets/gray/up.png');
	    this.load.image('emptygray', 'assets/gray/empty.png');

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
		    "tip" : "Reach the goal with as few clicks as possible.",
		    "best": 2,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 2
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
		    "best": 3,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 3
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
		    "tip" : "When a arrow is fired, it will activate all arrows in that direction.",
		    "best": 3,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 4
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
		    "best": 4,
		    "nrWidth" :5,
		    "nrHeight":8
		},

		{// level 5
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
		    "best": 7,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		// black holes !!
		/* a black hole level to save for later*/
		{// level 6
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
		    "best": 5,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 7
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
		    "tip" : "You got it!",
		    "best": 4,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 8
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
		    "best": 6,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 9
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
		    "best": 5,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 10
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
		    "tip" : "You rock!",
		    "best": 7,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		// stars
		// later level with stars
		{// level 11
		    "arrows" : [ 
		        {"x": 1, "y": 1, "dir": "right", "selected": true, "color": "pink"},
		        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 2, "y": 3, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 4, "y": 5, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 0, "y": 5, "dir": "down", "selected": false,"color": "pink"}
		     ],
		     "stars" : [
		     	{"x": 4, "y" : 3, "color": "pink"},
		     	{"x": 1, "y" : 5, "color": "pink"}
		     ],
		    "goalInfo" : [
		        {"x":0, "y":7, "color": "pink"}
		    ],
		    "tip": "Collect all the stars in order to be able to go home.",
		    "best": 4,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 12
		    "arrows" : [ 
		        {"x": 0, "y": 0, "dir": "down", "selected": false, "color": "pink"},
		        {"x": 0, "y": 1, "dir": "right", "selected": true,"color": "pink"},
		        {"x": 0, "y": 7, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 1, "y": 0, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 1, "y": 3, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 1, "y": 6, "dir": "right", "selected": false, "color": "pink"},
		        {"x": 2, "y": 0, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 2, "y": 2, "dir": "down", "selected": true,"color": "pink"},
		        {"x": 2, "y": 3, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 2, "y": 4, "dir": "up", "selected": false, "color": "pink"},
		        {"x": 4, "y": 1, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 4, "y": 3, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 4, "y": 6, "dir": "up", "selected": false,"color": "pink"}
		     ],
		     "stars" : [
		     	{"x": 1, "y" : 5, "color": "pink"},
		     	{"x": 2, "y" : 1, "color": "pink"},
		     	{"x": 3, "y" : 6, "color": "pink"},
		     	{"x": 4, "y" : 2, "color": "pink"}
		     ],
		    "goalInfo" : [
		        {"x":0, "y":3, "color": "pink"}
		    ],
		    "tip": "Remember to choose the 'right' way.",
		    "best": 8,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		// lägg till lite black holes on these 3 next levels!!!
		{// level 13
		    "arrows" : [ 
		        {"x": 0, "y": 1, "dir": "right", "selected": false, "color": "pink"},
		        {"x": 0, "y": 5, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 0, "y": 7, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 1, "y": 0, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 1, "y": 2, "dir": "down", "selected": true,"color": "pink"},
		        {"x": 2, "y": 0, "dir": "down", "selected": false, "color": "pink"},
		        {"x": 2, "y": 4, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 3, "y": 2, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 3, "y": 3, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 3, "y": 5, "dir": "up", "selected": false, "color": "pink"},
		        {"x": 3, "y": 6, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 4, "y": 0, "dir": "down", "selected": true,"color": "pink"},
		        {"x": 4, "y": 3, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 4, "y": 6, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 4, "y": 7, "dir": "left", "selected": false,"color": "pink"}
		     ],
		     "stars" : [
		     	{"x": 1, "y" : 5, "color": "pink"},
		     	{"x": 2, "y" : 7, "color": "pink"},
		     	{"x": 4, "y" : 1, "color": "pink"}
		     ],
		    "goalInfo" : [
		        {"x":2, "y":2, "color": "pink"}
		    ],
		    "blackHole" : [
		    	{"x":0, "y":0},
		    	{"x":2, "y":3},
		    	{"x":4, "y":5}
		    ],
		    "tip": "Oh, black holes appeard when collecting stars. Watch out!",
		    "best": 10,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 14
		    "arrows" : [ 
		        {"x": 0, "y": 0, "dir": "right", "selected": false, "color": "pink"},
		        {"x": 0, "y": 2, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 0, "y": 6, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 1, "y": 2, "dir": "down", "selected": true,"color": "pink"},
		        {"x": 1, "y": 4, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 2, "y": 5, "dir": "up", "selected": false, "color": "pink"},
		        {"x": 3, "y": 0, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 3, "y": 3, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 3, "y": 5, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 4, "y": 0, "dir": "left", "selected": true, "color": "pink"},
		        {"x": 4, "y": 3, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 4, "y": 4, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 4, "y": 5, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 4, "y": 6, "dir": "left", "selected": false,"color": "pink"}
		     ],
		     "stars" : [
		     	{"x": 0, "y" : 4, "color": "pink"},
		     	{"x": 1, "y" : 6, "color": "pink"},
		     	{"x": 2, "y" : 0, "color": "pink"},
		     	{"x": 3, "y" : 4, "color": "pink"}
		     ],
		    "goalInfo" : [
		        {"x":2, "y":3, "color": "pink"}
		    ],
		    "blackHole" : [
		    	{"x":1, "y":5},
		    	{"x":2, "y":1},
		    	{"x":4, "y":2}
		    ],
		    "tip": "Keep going!",
		    "best": 9,
		    "nrWidth" :5,
		    "nrHeight":8
		},
		{// level 15
		    "arrows" : [ 
		        {"x": 0, "y": 0, "dir": "right", "selected": false, "color": "pink"},
		        {"x": 0, "y": 5, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 0, "y": 7, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 1, "y": 2, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 1, "y": 5, "dir": "left", "selected": false,"color": "pink"},
		        {"x": 1, "y": 7, "dir": "up", "selected": false, "color": "pink"},
		        {"x": 2, "y": 0, "dir": "down", "selected": false,"color": "pink"},
		        {"x": 2, "y": 1, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 2, "y": 2, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 2, "y": 4, "dir": "right", "selected": false,"color": "pink"},
		        {"x": 3, "y": 0, "dir": "left", "selected": false, "color": "pink"},
		        {"x": 3, "y": 1, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 3, "y": 5, "dir": "left", "selected": true,"color": "pink"},
		        {"x": 3, "y": 7, "dir": "up", "selected": false,"color": "pink"},
		        {"x": 4, "y": 5, "dir": "down", "selected": true,"color": "pink"},
		        {"x": 4, "y": 7, "dir": "left", "selected": false,"color": "pink"}
		     ],
		     "stars" : [
		     	{"x": 1, "y" : 0, "color": "pink"},
		     	{"x": 2, "y" : 3, "color": "pink"},
		     	{"x": 2, "y" : 7, "color": "pink"},
		     	{"x": 4, "y" : 1, "color": "pink"}
		     ],
		    "goalInfo" : [
		        {"x":3, "y":4, "color": "pink"}
		    ],
		    "blackHole" : [
		    	{"x":1, "y":1},
		    	{"x":2, "y":6},
		    	{"x":3, "y":2},
		    	{"x":4, "y":3}
		    ],
		    "tip": "Wow, so many black holes to avoid and stars to collect!",
		    "best": 10,
		    "nrWidth" :5,
		    "nrHeight":8
		},

		/* Chapter colorful world */
		{// level 16
			"arrows" : [
				{"x":0, "y":1, "dir": "right", "selected":true, "color": "gray"},
				{"x":1, "y":3, "dir": "down", "selected":false, "color": "gray"},
				{"x":1, "y":6, "dir": "right", "selected":false, "color": "gray"},
				{"x":3, "y":1, "dir": "down", "selected":false, "color": "gray"},
				{"x":4, "y":3, "dir": "left", "selected":true, "color": "gray"}
			],
			"goalInfo" : [
				{"x":3, "y":6, "color": "pink"}
			],
			"tip": "You need to make sure the 'right' arrow hits the goal",
			"best":3,
		    "nrWidth" :5,
		    "nrHeight":8,
		    "bucket" : [
		    	{"x":2, "y":1 , "color":"blue"},
		    	{"x":1, "y":4 , "color":"pink"}
		    ]
		},
		{// level 17
			"arrows" : [
				{"x":0, "y":0, "dir": "down", "selected":false, "color": "gray"},
				{"x":0, "y":3, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":6, "dir": "up", "selected":false, "color": "gray"},
				{"x":1, "y":1, "dir": "down", "selected":false, "color": "gray"},
				{"x":1, "y":4, "dir": "right", "selected":false, "color": "gray"},
				{"x":3, "y":0, "dir": "down", "selected":true, "color": "gray"},
				{"x":3, "y":1, "dir": "left", "selected":false, "color": "gray"},
				{"x":3, "y":4, "dir": "left", "selected":false, "color": "gray"},
				{"x":3, "y":6, "dir": "left", "selected":true, "color": "gray"},
				{"x":4, "y":3, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":4, "dir": "up", "selected":false, "color": "gray"}
			],
			"goalInfo" : [
				{"x":2, "y":3, "color": "blue"}
			],
			"tip": "Oh, what a colorful place!",
			"best":4,
		    "nrWidth" :5,
		    "nrHeight":8,
		    "bucket" : [
		    	{"x":0, "y":2 , "color":"blue"},
		    	{"x":1, "y":6 , "color":"pink"},
		    	{"x":3, "y":2 , "color":"blue"}
		    ]
		   
		},
		{// level 18
			"arrows" : [
				{"x":0, "y":0, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":2, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":4, "dir": "up", "selected":false, "color": "gray"},
				{"x":1, "y":2, "dir": "right", "selected":false, "color": "gray"},
				{"x":1, "y":5, "dir": "right", "selected":false, "color": "gray"},
				{"x":1, "y":7, "dir": "up", "selected":true, "color": "gray"},
				{"x":2, "y":0, "dir": "down", "selected":false, "color": "gray"},
				{"x":3, "y":0, "dir": "down", "selected":false, "color": "gray"},
				{"x":3, "y":5, "dir": "left", "selected":false, "color": "gray"},
				{"x":3, "y":6, "dir": "up", "selected":true, "color": "gray"},
				{"x":3, "y":7, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":2, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":4, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":5, "dir": "up", "selected":false, "color": "gray"}
			],
			"goalInfo" : [
				{"x":2, "y":2, "color": "pink"}
			],
			"tip": "Paint all over the place!",
			"best":5,
		    "nrWidth" :5,
		    "nrHeight":8,
		    "bucket" : [
		    	{"x":0, "y":3 , "color":"blue"},
		    	{"x":0, "y":1 , "color":"pink"},
		    	{"x":1, "y":1 , "color":"pink"},
		    	{"x":3, "y":3 , "color":"pink"}
		    ]
		   
		},
		{// level 19
			"arrows" : [
				{"x":0, "y":0, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":1, "dir": "down", "selected":false, "color": "gray"},
				{"x":0, "y":3, "dir": "up", "selected":true, "color": "gray"},
				{"x":0, "y":5, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":7, "dir": "up", "selected":false, "color": "gray"},
				{"x":1, "y":3, "dir": "left", "selected":false, "color": "gray"},
				{"x":1, "y":4, "dir": "up", "selected":false, "color": "gray"},
				{"x":1, "y":7, "dir": "up", "selected":false, "color": "gray"},
				{"x":2, "y":1, "dir": "down", "selected":false, "color": "gray"},
				{"x":2, "y":2, "dir": "right", "selected":false, "color": "gray"},
				{"x":2, "y":6, "dir": "left", "selected":false, "color": "gray"},
				{"x":3, "y":0, "dir": "down", "selected":false, "color": "gray"},
				{"x":3, "y":4, "dir": "up", "selected":false, "color": "gray"},
				{"x":3, "y":7, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":2, "dir": "down", "selected":true, "color": "gray"},
				{"x":4, "y":4, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":7, "dir": "up", "selected":false, "color": "gray"}
			],
			"goalInfo" : [
				{"x":1, "y":5, "color": "blue"}
			],
			"tip": "Woho! Soon done.",
			"best":6,
		    "nrWidth" :5,
		    "nrHeight":8,
		    "bucket" : [
		    	{"x":0, "y":6 , "color":"blue"},
		    	{"x":2, "y":7 , "color":"pink"},
		    	{"x":3, "y":1 , "color":"blue"},
		    	{"x":4, "y":5 , "color":"pink"}
		    ],
		    "blackHole" : [
		    	{"x":0, "y":4},
		    	{"x":1, "y":2},
		    	{"x":2, "y":3}
		    ],
		   
		},
		{// level 20
			"arrows" : [
				{"x":0, "y":0, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":1, "dir": "down", "selected":false, "color": "gray"},
				{"x":0, "y":4, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":5, "dir": "right", "selected":false, "color": "gray"},
				{"x":0, "y":7, "dir": "up", "selected":false, "color": "gray"},
				{"x":1, "y":0, "dir": "down", "selected":true, "color": "gray"},
				{"x":1, "y":2, "dir": "right", "selected":false, "color": "gray"},
				{"x":1, "y":7, "dir": "up", "selected":false, "color": "gray"},
				{"x":2, "y":2, "dir": "up", "selected":false, "color": "gray"},
				{"x":2, "y":4, "dir": "right", "selected":false, "color": "gray"},
				{"x":3, "y":1, "dir": "left", "selected":true, "color": "gray"},
				{"x":3, "y":5, "dir": "left", "selected":false, "color": "gray"},
				{"x":3, "y":6, "dir": "up", "selected":false, "color": "gray"},
				{"x":4, "y":0, "dir": "down", "selected":false, "color": "gray"},
				{"x":4, "y":2, "dir": "up", "selected":false, "color": "gray"},
				{"x":4, "y":4, "dir": "down", "selected":false, "color": "gray"},
				{"x":4, "y":6, "dir": "left", "selected":false, "color": "gray"},
				{"x":4, "y":7, "dir": "left", "selected":false, "color": "gray"}
			],
			"goalInfo" : [
				{"x":1, "y":5, "color": "pink"}
			],
			"tip": "Do not get confused by all the arrows.",
			"best":6,
		    "nrWidth" :5,
		    "nrHeight":8,
		    "bucket" : [
		    	{"x":0, "y":3 , "color":"blue"},
		    	{"x":3, "y":4 , "color":"blue"},
		    	{"x":4, "y":1 , "color":"pink"}
		    ],
		    "blackHole" : [
		    	{"x":1, "y":3},
		    	{"x":2, "y":6}
		    ]  
		}
	];

	},
	create: function() {
		backgroundMusicPlayer = this.add.audio('forestSound',1,true);   
		this.sound.setDecodedCallback(backgroundMusicPlayer, this.start, this);

	},
	start: function() {    
		backgroundMusicPlayer.play(); // starts on the whole object now since i add it!! wow :D 
		if (!backCalmMusic) backgroundMusicPlayer.pause();
		this.state.start('MainMenu');
	}
};