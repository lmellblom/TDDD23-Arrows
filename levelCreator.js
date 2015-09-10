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
		this.scoreText;
	}, 

	create: function() {
	    //  A simple background for our game -> this will add a background image instead. this.add.sprite(0, 0, 'sky'); //73FF8F
	    this.game.stage.backgroundColor = '#FFF';
	    var background = this.add.sprite(0, -520, 'background');
	    background.alpha = 0.8;

	    var whiteBack = this.game.add.graphics(this.game.width, this.game.height);
		whiteBack.beginFill("#FFF", 0.2);
		var padding = 0;
        whiteBack.x = padding;
        whiteBack.y = padding;
        whiteBack.drawRect(padding, padding, this.game.width-padding*4, this.game.height-padding*4);

	    this.levelText = this.add.text(20, 20, "Level " + this.currentLevel, generalStyle);
        this.scoreText = this.add.text(this.world.width-130, 20, "Clicks: " + this.click, generalStyle);

        // add settings button
        this.settingsBtn = this.add.sprite(20, this.world.height-60, 'settingsBtn');
        //settingsBtn.anchor.set(0.5);
        this.settingsBtn.scale.setTo(0.7);
        this.settingsBtn.inputEnabled = true;
        this.settingsBtn.events.onInputDown.add(this.settingsOpen, this);


	    // built up the grid with empty positions
	    var theGrid = this.add.group();

	    for (var x=0; x<this.gridInfo.nrWidth; x++) {
	    	for (var y=0; y<this.gridInfo.nrHeight; y++) {
	    		// deside the pixel position
	    		var posX = this.gridInfo.padding + this.gridInfo.sizes/2 + x * this.gridInfo.sizes;
	    		var posY = this.gridInfo.padding + this.gridInfo.sizes/2 + y * this.gridInfo.sizes;
	    		// create the sprite and place the center in the position

	    		var gridSprite = theGrid.create(posX,posY,'empty');
	    		gridSprite.alpha = 0.4;
	    		gridSprite.anchor.set(0.5);

	    		// save in a 2D array the reference to the sprite
	    		// create a new element object
	    		var grid = new GridElement(gridSprite, "empty", false);
	    		this.gridSystem[x][y] = grid;

	    		// add custom attributes to the sprite, to be able to pick out the right one from the grid system later
	    		grid.sprite.indexNr = {
	    			"x": x,
	    			"y": y
	    		};
	    	}
	    }
	    // set input on very grid
	    theGrid.setAll('inputEnabled', true);
	    // using the power of callAll we can add the same input event to all coins in the group:
	    theGrid.callAll('events.onInputDown.add', 'events.onInputDown', this.clickedGrid, this);

	    // add the goal
	    var goalElement = this.gridSystem[this.levelData.goalInfo[0].x][this.levelData.goalInfo[0].y];
	    goalElement.setColor(this.levelData.goalInfo[0].color);
	    goalElement.setType("goal");
	    goalElement.setSpriteAlpha(1.0);
		goalElement.changeTexture();
	
	    this.arrowGroup = this.add.group();

	    // add all the arrows
	     this.levelData.arrows.forEach(function(elements){
	     	var arrow = this.gridSystem[elements.x][elements.y];
	     	arrow.setColor(elements.color);
	     	arrow.setType("arrow", elements.dir);
	     	arrow.setSelected(elements.selected);
	     	arrow.changeTexture();

	     	this.arrowGroup.add(arrow.sprite);
	    }, this);

	    // debugmodes
	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    cursors = this.input.keyboard.createCursorKeys();
	},
	settingsOpen : function() {
		this.settingsBtn.inputEnabled = false;
		var modalGroup = this.add.group();

		var modal = this.game.add.graphics(this.game.width, this.game.height);
		modal.beginFill("0x000000", 0.7);
        modal.x = 0;
        modal.y = 0;
        modal.drawRect(0, 0, this.game.width, this.game.height);
        modal.inputEnabled = true;
        modalGroup.add(modal);

        var module = this.add.sprite(this.world.centerX ,this.world.centerY , 'panelModule');
        module.scale.setTo(0.9, 0.9);
        module.anchor.set(0.5,0.5);
        modalGroup.add(module);

        var text = this.add.text(this.world.centerX, this.world.centerY-20, "Do you really \n want to quit?", generalStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

        // add menu button, next level and try level again
        var noBtn = this.add.sprite(this.world.centerX-70, this.world.centerY+80, 'noBtn');
        var yesBtn = this.add.sprite(this.world.centerX+70, this.world.centerY+80, 'yesBtn');
        noBtn.anchor.set(0.5);
        yesBtn.anchor.set(0.5);
        yesBtn.scale.setTo(0.7);
        noBtn.scale.setTo(0.7);
        noBtn.inputEnabled = true;
        yesBtn.inputEnabled = true;
        modalGroup.add(noBtn);
        modalGroup.add(yesBtn);

        noBtn.events.onInputDown.add(function (e,pointer){
        	this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);
        yesBtn.events.onInputDown.add(function (e,pointer){
        	this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

        modal.events.onInputDown.add(function (e, pointer) {
            this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);

	}
	,
	clickedGrid : function(item) {
		var x = item.indexNr.x, y = item.indexNr.y;
		var gridElement = this.gridSystem[x][y];	// get the gridelement

		if(gridElement.isArrow() && gridElement.isSelected) {
			this.click++;
			this.scoreText.text = "Clicks: " + this.click;

			// hämta färgen på denna pil, ska aktivera alla andra med den färgen
			var color = gridElement.color;

			// se till att sätta selected till false på alla andra piler
			for (var x=0; x<this.gridInfo.nrWidth; x++){
				for (var y=0; y<this.gridInfo.nrHeight; y++){
					var e = this.gridSystem[x][y];
					if(e.isSelected) { // om man hittade en aktiv grid, set till not active
						e.setActive(false);
					}
				}
			}

			// sätt selected till true på den raden som pilen skjuter åt
			var direction = gridElement.direction; // the direction to shoot

			var element; 
			if(direction == "left") {
				for (var i=item.indexNr.x-1; i>=0; i--) {
					element = this.gridSystem[i][item.indexNr.y];
					if(element.isGoal())
						continue;
					element.setActive(true, color);
				}
			}
			else if(direction == "right") {
				for (var i=item.indexNr.x+1; i<this.gridInfo.nrWidth; i++) {
					element = this.gridSystem[i][item.indexNr.y];
					if(element.isGoal())
						continue;
					element.setActive(true, color);
				}
			}
			else if(direction == "up") {
				for (var i=item.indexNr.y-1; i>=0; i--) {
					element = this.gridSystem[item.indexNr.x][i];
					if(element.isGoal())
						continue;
					element.setActive(true, color);
				}
			}
			else if(direction == "down") {
				for (var i=item.indexNr.y+1; i<this.gridInfo.nrHeight; i++) {
					element = this.gridSystem[item.indexNr.x][i];
					if(element.isGoal())
						continue;
					element.setActive(true, color);
				}
			}

			if (element.isGoal()) {
				console.log("KLARA");
				this.madeLevel();
				this.showModalWin();
			}
			else if (this.availableMoves()==0) {
				console.log("inga drag kvar.. synd!");
				this.showModal();
			}

			// ändra detta gridElement till en empty igen
			gridElement.resetToEmpty();
		}
	},

	// ingen bra funktion överhuvudtaget, utan borde kunna ha + och - helt enkelt
	availableMoves : function() {
		var moves=0;

		this.gridSystem.forEach(function(itemRow){
			itemRow.forEach(function(item){
				if(item.isArrow() && item.isSelected)
					moves++;
			}, this);
		},this);

		return moves;
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

	madeLevel : function(){
		madeLevels[this.currentLevel-1]=true;

	},
 
	nextLevel: function() {
		console.log("You made the level in " + this.click +  " clicks.");

		var next = true;
		if (next) {
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
        modal.inputEnabled=true;
        modalGroup.add(modal);

        var module = this.add.sprite(this.world.centerX ,this.world.centerY , 'failedModule');
        module.scale.setTo(0.7, 0.7);
        module.anchor.set(0.5,0.5);
        modalGroup.add(module);

        var text = this.add.text(this.world.centerX, this.world.centerY-30, "OH noooh! \n No moves left..", generalStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

        // add menu button, next level and try level again
        var menuBtn = this.add.sprite(this.world.centerX-70, this.world.centerY+180, 'menuBtn');
        var tryAgainBtn = this.add.sprite(this.world.centerX+70, this.world.centerY+180, 'reloadBtn');
        menuBtn.anchor.set(0.5);
        tryAgainBtn.anchor.set(0.5);
        menuBtn.inputEnabled = true;
        tryAgainBtn.inputEnabled = true;
        menuBtn.scale.setTo(0.7);
        tryAgainBtn.scale.setTo(0.7);
        modalGroup.add(tryAgainBtn);
        modalGroup.add(menuBtn);

        tryAgainBtn.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.resetThisLevel();
        }, this);
        menuBtn.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

        // add buttons to click!! 
        /*modal.events.onInputDown.add(function (e, pointer) {
            modalGroup.visible = false;
            this.resetThisLevel();
        }, this);*/
	},
	showModalWin : function() {

		var modalGroup = this.add.group();

		var modal = this.game.add.graphics(this.game.width, this.game.height);
		modal.beginFill("0x000000", 0.7);
        modal.x = 0;
        modal.y = 0;
        modal.drawRect(0, 0, this.game.width, this.game.height);
        modal.inputEnabled=true;
        modalGroup.add(modal);

        var module = this.add.sprite(this.world.centerX ,this.world.centerY , 'clearedModule');
        module.scale.setTo(0.7, 0.7);
        module.anchor.set(0.5,0.5);
        modalGroup.add(module);

        // the text inside
        var stringText = "Congratulations!\n Clicks: " + this.click;
        var text = this.add.text(this.world.centerX, this.world.centerY-30, stringText, generalStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

        // add menu button, next level and try level again
        var menuBtn = this.add.sprite(this.world.centerX-80, this.world.centerY+180, 'menuBtn');
        var nextBtn = this.add.sprite(this.world.centerX+80, this.world.centerY+180, 'nextBtn');
        var tryAgainBtn = this.add.sprite(this.world.centerX, this.world.centerY+180, 'reloadBtn');
        menuBtn.anchor.set(0.5);
        nextBtn.anchor.set(0.5);
        tryAgainBtn.anchor.set(0.5);
        menuBtn.scale.setTo(0.7);
        nextBtn.scale.setTo(0.7);
        tryAgainBtn.scale.setTo(0.7, 0.7);
        menuBtn.inputEnabled = true;
        nextBtn.inputEnabled = true;
        tryAgainBtn.inputEnabled = true;
        modalGroup.add(menuBtn);
        modalGroup.add(nextBtn);
        modalGroup.add(tryAgainBtn);

        menuBtn.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

        tryAgainBtn.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.resetThisLevel();
        }, this);

        nextBtn.events.onInputDown.add(function (e,pointer){
        	modalGroup.visible = false;
            this.nextLevel();
        }, this);
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
        this.state.start('SelectLevels');

    }
};
