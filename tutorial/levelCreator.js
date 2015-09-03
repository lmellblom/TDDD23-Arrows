var GAME = GAME || {};

GAME.LevelCreatorJump = function() {};

GAME.LevelCreatorJump.prototype = {

	init: function(levelSelector) { // add a custom variable to tell which level to load. 
		//var customParam1 = 'level1JSON';
		this.currentLevel = levelSelector;
		console.log("current level " + levelSelector); 
	}, 

	create: function() {
		//  We're going to be using physics, so enable the Arcade Physics system
	    this.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game -> this will add a background image instead. this.add.sprite(0, 0, 'sky'); //73FF8F
	    //this.game.stage.backgroundColor = '#73FF8F';
	    this.add.sprite(0, 0, 'background');


	    var arrows = [
	    	{"x": 40, "y": 40, "dir": "right", "selected": false},
	    	{"x": 200, "y": 40, "dir": "down", "selected": true}
	    ];

	    var goal = [
	    	{"x": 200, "y": 200}
	    ];

	    arrowGroup = this.add.group();
	    arrowGroup.enableBody = true;

	    arrows.forEach(function(elements){
	    	var spriteName = elements.dir + (elements.selected ? "Selected" : ""  );

	    	var arrow = arrowGroup.create(elements.x, elements.y, spriteName);

	    	if(elements.selected) {
	    		arrow.inputEnabled = true;
	    		arrow.events.onInputDown.add(this.clickedArrow, this);
	    	}

	    	arrow.direction = elements.dir;
	    	arrow.canMove = elements.selected;
	    	//this.physics.arcade.enable(arrow);
	    	
	    }, this);

	    goal = this.add.sprite(goal[0].x, goal[0].y, 'goal');
	    this.physics.arcade.enable(goal);

	    // debugmodes
	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    cursors = this.input.keyboard.createCursorKeys();
	},
	update: function() {

		this.physics.arcade.overlap(arrowGroup, goal, this.nextLevel, null, this);

	    // quit to the menu
	    if (qKey.isDown) {
	    	this.state.start('MainMenu');
	    }
	    if (nKey.isDown) {
	    	this.nextLevel();
	    }


	},


	checkOverlap: function(spriteA, spriteB) {
		// not the same object? 

		if (spriteA == spriteB) {
			console.log("SAME sprite");
		} 

		var spriteAx = spriteA.x;
		var spriteAy = spriteA.y;

		var spriteBx = spriteB.x;
		var spriteBy = spriteB.y;


    	console.log("A: " + spriteAx + " B : " + spriteBx);

    	return spriteAx == spriteBx && spriteAy == spriteBy;
	},

	clickedArrow : function(arrow) {
		console.log("clicked on arrow : " + arrow.direction);

		if(arrow.canMove) {
			// target x and y
			var targetX, targetY;
			if(arrow.direction == "right" || arrow.direction == "left"){
				targetY = arrow.y;
				targetX = (arrow.direction == "right" ? gameWidth + 20 : -20);
			}
			else {
				targetX = arrow.x;
				targetY = (arrow.direction == "up" ? -20 : gameHeight + 20);
			}

			// TODO, animate that the arrow is sliding over the grid
			this.game.physics.arcade.moveToXY(
			    arrow, 
			    targetX, 
			    targetY, 
			    300, // speed, 
			    500 // maxTimeToFinish(ms)
			);
		}

		//arrow.kill();

		// make the arrows in the grid that is in the same direction as the sprite be selected
	},

	nextLevel: function() {
		console.log("you have now done this level. well done!!");

		var next = true;
		if (next) {
			madeLevels[this.currentLevel-1] = true; // currentlevel is 1,2,3 etc and indexing start at 0
			this.resetForNextLevel();
			this.currentLevel++; // the current level is now 1

			// check if you reached the end level, therefore you should go back to the menu instead numberOfLevels
			if (this.currentLevel <= numberOfLevels) 
				this.state.start('Level', true, false, '2');
			else 
				this.quitGame();
		}
	},

	resetForNextLevel : function() {
	},

    quitGame: function (pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }
};
