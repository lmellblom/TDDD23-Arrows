var GAME = GAME || {};

GAME.LevelCreator = function() {};

GAME.LevelCreator.prototype = {

	init: function(levelId) { // add a custom variable to tell which level to load. 
		this.currentLevel = levelId; 

		// load the leveldata for this particular level. 
		this.levelData = allLevelData[levelId-1];
		availableMoves = 0;
	}, 

	create: function() {
		//  We're going to be using physics, so enable the Arcade Physics system
	    this.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game -> this will add a background image instead. this.add.sprite(0, 0, 'sky'); //73FF8F
	    this.game.stage.backgroundColor = '#969696';
	    //this.add.sprite(0, 0, 'background');

	    var gridSize = 64;
	    var padding = 64;

	    var goalX = padding + gridSize/2 + this.levelData.goalInfo[0].x * gridSize;
	    var goalY = padding + gridSize/2 + this.levelData.goalInfo[0].y * gridSize;

	    goal = this.add.sprite(goalX, goalY, 'goal');
	    this.physics.arcade.enable(goal);
	    goal.anchor.set(0.5);

	    obstacleGroup = this.add.group();
	    obstacleGroup.enableBody = true;
	    if (this.levelData.obstacleInfo != undefined) {
	    	this.levelData.obstacleInfo.forEach(function(elements){
	    		var posX = padding + gridSize/2 + elements.x * gridSize;
	    		var posY = padding + gridSize/2 + elements.y * gridSize;
	    		var ob = obstacleGroup.create(posX, posY, 'obstalce1');
	    		ob.anchor.set(0.5);
	    	}, this);
		}

	   // arrowGroup = this.add.group();
	    arrowGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
	    arrowGroup.enableBody = true;

	    // x and y specifiec witch index in x and y starting from 

	    this.levelData.arrows.forEach(function(elements){
	    	var spriteName = elements.dir + (elements.selected ? "Selected" : ""  );
	    	var posX = padding + gridSize/2 + elements.x * gridSize;
	    	var posY = padding + gridSize/2 + elements.y * gridSize;
	    	var arrow = arrowGroup.create(posX, posY, spriteName);
	    	arrow.inputEnabled = true;
	    	arrow.events.onInputDown.add(this.clickedArrow, this);
	    	arrow.direction = elements.dir;
	    	arrow.canMove = elements.selected;
	    	arrow.anchor.set(0.5);

	    	availableMoves += elements.selected;

	    	//this.physics.arcade.enable(arrow);
	    }, this);

	    // debugmodes
	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    cursors = this.input.keyboard.createCursorKeys();
	},
	update: function() {

		// own collision detection
		var lenArrows = arrowGroup.children.length;
		for (var i = 0; i < lenArrows; i++) {
			for (var j=i+1; j<lenArrows; j++){
				this.physics.arcade.overlap(arrowGroup.children[i], arrowGroup.children[j], this.overLap, null, this);
			}
		}

		this.physics.arcade.overlap(goal, arrowGroup, this.reachedGoal, null, this);

		this.physics.arcade.overlap(obstacleGroup, arrowGroup, this.blackHole, null, this);

	    // quit to the menu
	    if (qKey.isDown) {
	    	this.state.start('MainMenu');
	    }
	    if (nKey.isDown) {
	    	this.nextLevel();
	    }

	    /*if(availableMoves==0) { // TODO this better, does not work correctly..
	    	console.log("NO moves avalible");
	    }*/


	    // must check if there are no avalible moves to do..

	},
	blackHole: function(obstacle, arrow) {
		arrow.kill();
		console.log("NOO, you reached a black hole..");

	},
	resetArrows: function() {
		arrowGroup.forEach(function(elements){
			this.resetOneArrow(elements, false); // set all the arrow elements to false again.. 
		}, this);

	},

	resetOneArrow: function(arrow, moving) {
		arrow.canMove = moving;
		var spriteName = arrow.direction + (moving ? "Selected" : ""  );
		arrow.loadTexture(spriteName , 0); // change the texture in the current sprite!!
	},

	overLap: function(arrow1, arrow2) {
		console.log("overlaped!");

		// check if one arrow is standing still, this will be true
		if ( Phaser.Point.equals(arrow1.body.velocity,new Phaser.Point(0,0) )) {
			this.resetOneArrow(arrow1, true);
		}
		else {
			this.resetOneArrow(arrow2, true);
		}


		// change to true to both
		//this.resetOneArrow(arrow1, true);
		//this.resetOneArrow(arrow2, true);
	},

	reachedGoal: function(goal, arrows) {
		console.log("REACHED the goal");
		arrows.kill();
		this.nextLevel();
	},

	clickedArrow : function(arrow) {
		console.log("clicked on arrow : " + arrow.direction);
		if(arrow.canMove) {
			this.resetArrows(); 
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
			if (this.currentLevel <= numberOfLevels) {
				console.log("start next level" + this.currentLevel);
				this.state.start('Level', true, false, this.currentLevel);
			}
			else {
				this.quitGame();
			}
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
