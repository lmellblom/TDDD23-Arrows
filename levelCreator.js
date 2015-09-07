var GAME = GAME || {};

GAME.LevelCreator = function() {};

GAME.LevelCreator.prototype = {

	init: function(levelId) { // add a custom variable to tell which level to load. 
		this.currentLevel = levelId; 

		// load the leveldata for this particular level. 
		this.levelData = allLevelData[levelId-1];

	    this.gridInfo = {
	    	"sizes" : 64,
	    	"nrWidth": 5,
	    	"nrHeight": 8,
	    	"padding": 64
	    };

		var w = this.gridInfo.nrWidth, h=this.gridInfo.nrHeight;

		this.gridSystem = new Array(w);
		for (var x=0; x<w; x++){
			this.gridSystem[x] = new Array(h);
		}
		//init with null, place the sprites here later
		for (var x=0; x<w; x++){
			for (var y=0; y<h; y++){
				this.gridSystem[x][y] = null; 
			}
		}

		this.inGoal = false;
		this.availableMoves; 
		this.arrowGroup;
		this.click = 0;
	}, 

	create: function() {
	    //  A simple background for our game -> this will add a background image instead. this.add.sprite(0, 0, 'sky'); //73FF8F
	    this.game.stage.backgroundColor = '#969696';
	    //this.add.sprite(0, 0, 'background');

	    // built up the grid with empty positions
	    var theGrid = this.add.group();

	    for (var x=0; x<this.gridInfo.nrWidth; x++) {
	    	for (var y=0; y<this.gridInfo.nrHeight; y++) {
	    		// deside the pixel position
	    		var posX = this.gridInfo.padding + this.gridInfo.sizes/2 + x * this.gridInfo.sizes;
	    		var posY = this.gridInfo.padding + this.gridInfo.sizes/2 + y * this.gridInfo.sizes;
	    		// create the sprite and place the center in the position
	    		var grid = theGrid.create(posX,posY,'empty');
	    		grid.alpha = 0.4;
	    		grid.anchor.set(0.5);

	    		// save in a 2D array the reference to the sprite
	    		this.gridSystem[x][y] = grid;
	    		
	    		// add custom attributes to the sprite
	    		grid.indexNr = {
	    			"x": x,
	    			"y": y
	    		};
	    		grid.isArrow = false;
	    	}
	    }
	    // set input on very grid
	    theGrid.setAll('inputEnabled', true);
	    // using the power of callAll we can add the same input event to all coins in the group:
	    theGrid.callAll('events.onInputDown.add', 'events.onInputDown', this.clickedGrid, this);


	    // change the image on the sprite depending on if a arrow or not.. 

	    // add the goal
	    var goalSprite = this.gridSystem[this.levelData.goalInfo[0].x][this.levelData.goalInfo[0].y];
	    goalSprite.alpha=1.0;
		goalSprite.loadTexture('goal',0);



	    this.arrowGroup = this.add.group();
	    // add all the arrows
	     this.levelData.arrows.forEach(function(elements){
	    	var spriteName = elements.dir + (elements.selected ? "Selected" : ""  );
	    	this.changeSprite(elements.x,elements.y, spriteName);
	    	this.addArrow(elements.x,elements.y,elements.dir, elements.selected);

	    }, this);

	    // debugmodes
	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    cursors = this.input.keyboard.createCursorKeys();
	},
	unselectAllGrids : function (){
		for (var x=0; x<this.gridInfo.nrWidth; x++){
			for (var y=0; y<this.gridInfo.nrHeight; y++){
				var sprite = this.gridSystem[x][y];
				if(sprite.key.indexOf("Selected") != -1) {
					sprite.alpha = 0.4;
					var name = sprite.key.slice(0,sprite.key.length-8);
					sprite.loadTexture(name,0);
					if(sprite.isArrow) {
						sprite.arrow.canMove=false;
						sprite.alpha = 1.0;
					}
				}
			}
		}
	},
	addArrow: function(indexX, indexY, dir, selected) {
		var sprite = this.gridSystem[indexX][indexY];
		sprite.arrow = {
			"direction" : dir,
			"canMove" : selected
		};
		sprite.isArrow = true;
		this.arrowGroup.add(sprite); // add the arrow to the group
		sprite.alpha = 1.0;
	},
	clickedGrid : function(item) {
		if (item.isArrow && item.arrow.canMove) {
			this.click++;

			// sätt alla i rätt riktning. 
			this.unselectAllGrids();

			var sprite; 
			if(item.arrow.direction == "left") {
				for (var i=item.indexNr.x-1; i>=0; i--) {
					sprite = this.gridSystem[i][item.indexNr.y];
					this.activateSprite(sprite);
				}
			}
			else if(item.arrow.direction == "right") {
				for (var i=item.indexNr.x+1; i<this.gridInfo.nrWidth; i++) {
					sprite = this.gridSystem[i][item.indexNr.y];
					this.activateSprite(sprite);
				}
			}
			else if(item.arrow.direction == "up") {
				for (var i=item.indexNr.y-1; i>=0; i--) {
					sprite = this.gridSystem[item.indexNr.x][i];
					this.activateSprite(sprite);
				}
			}
			else if(item.arrow.direction == "down") {
				for (var i=item.indexNr.y+1; i<this.gridInfo.nrHeight; i++) {
					sprite = this.gridSystem[item.indexNr.x][i];
					this.activateSprite(sprite);
				}
			}

			// reset this arrow to a empty grid
			var theSprite = this.gridSystem[item.indexNr.x][item.indexNr.y];
			this.changeSprite(item.indexNr.x, item.indexNr.y, 'empty');
			theSprite.isArrow=false;
			theSprite.arrow=null;
			theSprite.alpha = 0.4;

			if(this.availableMoves()==0 && !this.inGoal) {
				console.log("DU kan inte göra några drag.. du måste börja om nivån.. ");
				this.showModal();
			//	this.resetThisLevel(); 
			}

		}
	},
	activateSprite : function(item) {
		var textureName;

		if (item.key == "goal") {
			this.reachedGoal();
		} else {
			if (item.key != "empty" && item.isArrow) {
				item.arrow = {
					"direction" : item.key,
					"canMove" : true
				};
				item.isArrow=true;
			}

			// desiding which texture to load
			if (item.key.indexOf("Selected") == -1) {
				textureName = item.key + "Selected";
			}
			else {
				textureName = item.key;
			}

			item.loadTexture(textureName,0);
			item.alpha=1.0;
		}
	},
	availableMoves : function() {
		var moves=0;

		// räkna ut beroende på alla sprites!!
		this.arrowGroup.forEach(function(item){
			if(item.arrow)
				moves+=item.arrow.canMove;
		}, this);

		return moves;
	},

	changeSprite : function(indexX, indexY, spriteName) {
		//this.gridSystem
		//var sprite = this.add.sprite(posX, posY, spriteName);
		// get the right sprite! arrow.loadTexture(spriteName , 0);
		var sprite = this.gridSystem[indexX][indexY];
		sprite.loadTexture(spriteName,0);

	},
	update: function() {
	    // quit to the menu
	    if (qKey.isDown) {
	    	this.state.start('MainMenu');
	    }
	    if (nKey.isDown) {
	    	this.nextLevel();
	    }
	},
	reachedGoal: function() {
		this.inGoal= true;
		console.log("REACHED the goal");
		this.nextLevel();
	},
	nextLevel: function() {
		console.log("You made the level in " + this.click +  " clicks.");

		var next = true;
		if (next) {
			madeLevels[this.currentLevel-1] = true; // currentlevel is 1,2,3 etc and indexing start at 0
			this.resetForNextLevel();
			this.currentLevel++; // the current level is now 1

			// check if you reached the end level, therefore you should go back to the menu instead numberOfLevels
			if (this.currentLevel <= numberOfLevels) {
				console.log("Starting the next level, level" + this.currentLevel);
				this.state.start('Level', true, false, this.currentLevel);
			}
			else {
				this.quitGame();
			}
		}
	},
	showModal : function() {
		var modalGroup = this.add.group();

		var modal = this.game.add.graphics(this.game.width, this.game.height);
		modal.beginFill("0x000000", 0.7);
        modal.x = 0;
        modal.y = 0;
        modal.drawRect(0, 0, this.game.width, this.game.height);
        modalGroup.add(modal);
        var text = this.add.text(this.world.centerX, 300, "GAME OVER", generalStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);
        //modal.inputEnabled = true;

        // add try again and also menu
        var tryAgain = this.add.text(20, 400, "TRY AGAIN", generalStyle);
        var backToMenu = this.add.text(this.game.width-150, 400, "MENYN", generalStyle);
        modalGroup.add(tryAgain);
        modalGroup.add(backToMenu);
        tryAgain.inputEnabled = true;
        backToMenu.inputEnabled = true;

        tryAgain.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.resetThisLevel();
        }, this);
        backToMenu.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

        // add buttons to click!! 
        /*modal.events.onInputDown.add(function (e, pointer) {
            modalGroup.visible = false;
            this.resetThisLevel();
        }, this);*/
	},
	resetThisLevel : function() {
		this.state.start('Level', true, false, this.currentLevel); // go to the same level!!
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
