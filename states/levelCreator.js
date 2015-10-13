var GAME = GAME || {};

GAME.LevelCreator = function() {};

GAME.LevelCreator.prototype = {

	init: function(levelId) { 
		this.currentLevel = levelId; 

		// load the leveldata for this particular level. 
		this.levelData = allLevelData[levelId-1];

	    this.gridInfo = {
	    	"sizes" : 64,
	    	"padding": 64
	    };

	    // add extra information about the grid, is located in the levelData so set it to gridIndo
	    this.gridInfo.nrWidth = this.levelData.nrWidth;
	    this.gridInfo.nrHeight = this.levelData.nrHeight;

	    // If the canvas of the game is larger in width than height, flip
	    // the grid. 
	    if (this.world.width > this.world.height) { 
	    	var change = this.gridInfo.nrWidth;
	    	this.gridInfo.nrWidth = this.gridInfo.nrHeight;
	    	this.gridInfo.nrHeight = change; 
	    }

	    // Create a new array and init with null to place sprites here later
	    var w = this.gridInfo.nrWidth, h=this.gridInfo.nrHeight;
		this.gridSystem = new Array(w);
		for (var x=0; x<w; x++){
			this.gridSystem[x] = new Array(h);
		}
		for (var x=0; x<w; x++){
			for (var y=0; y<h; y++){
				this.gridSystem[x][y] = null; 
			}
		}

		// A lot of different variables 
		this.inGoal = false;
		this.availableMoves; 
		this.arrowGroup;
		this.click = 0;
		this.scoreText;
		this.showSettings = false;
		this.gameOver = "";
	}, 

	create: function() {
		// sounds, maybe add this in the main instead as global? TODO
		this.winSound = this.add.audio('winSound');
		this.starSound = this.add.audio('starSound');
		this.arrowSound = this.add.audio('arrowSound');
		this.gameOverSound = this.add.audio('gameOverSound');

		// Handles the background and which to place
		// Also add more background if the world is bigger than the background
	    this.game.stage.backgroundColor = '#FFF';
	    if (this.currentLevel <=5) {
	    	var background = this.add.sprite(0, -(backgroundHeight - this.world.height), 'background');
	    	if (this.world.width > background.width) { // add more
				var back = this.add.sprite(background.width, -(backgroundHeight - this.world.height), 'background');
				back.alpha = 0.8;
			}
	    }
	    else if (this.currentLevel <=15){
		    var background = this.add.sprite(0, -(1000 - this.world.height), 'spaceBackground');
		    if (this.world.width > background.width) { // add more
				var back = this.add.sprite(background.width*2, -(1000 - this.world.height), 'spaceBackground');
				back.scale.x *= -1;
				if (this.currentLevel > 10)
					back.alpha = 0.7;
				else
					back.alpha = 0.8;
			}
		}
		else if(this.currentLevel <=20) {
			var background = this.add.sprite(0, -(1170 - this.world.height), 'rainbowBackground');
	    	if (this.world.width > background.width) { // add more
				var back = this.add.sprite(background.width, -(1170 - this.world.height), 'rainbowBackground');
				back.alpha = 0.8;
			}
		} 

	    background.alpha = this.currentLevel > 10 ? 0.7 : 0.8;

	    // setting a white layer over, to easier see the grid
	    var whiteBack = this.game.add.graphics(this.world.width, this.world.height);
		whiteBack.beginFill(0x000000, 0.4);
		var padding = 0;
        whiteBack.x = padding;
        whiteBack.y = padding;
       // whiteBack.z = -1;
        whiteBack.drawRect(padding, padding, this.world.width-padding*4, this.world.height-padding*4);

        // add the level and score text in the top
	    this.levelText = this.add.text(20, 20, "Level " + this.currentLevel, generalStyle);
        this.scoreText = this.add.text(this.world.width-130, 20, "Clicks: " + this.click, generalStyle);

       	// Add a settingspanel to the level, handles all buttons and functions.
       	settingsPanel(this, "inGame");
       	this.reloadBtn = self.add.sprite(80, self.world.height-60, 'reloadIcon');
       	this.reloadBtn.scale.setTo(0.7);
       	this.reloadBtn.inputEnabled = true;
       	this.reloadBtn.events.onInputDown.add(this.reloadLevelBtn, this);

	    // Build up the grid with empty positions
	    var theGrid = this.add.group();
	    for (var x=0; x<this.gridInfo.nrWidth; x++) {
	    	for (var y=0; y<this.gridInfo.nrHeight; y++) {
	    		// deside the pixel position so that the grid will be centered in the window
	    		var posX = this.gridInfo.padding + this.gridInfo.sizes/2 + x * this.gridInfo.sizes + this.world.centerX-this.gridInfo.sizes*this.gridInfo.nrWidth/2.0-this.gridInfo.padding;
	    		var posY = this.gridInfo.padding + this.gridInfo.sizes/2 + y * this.gridInfo.sizes + this.world.centerY-this.gridInfo.sizes*this.gridInfo.nrHeight/2.0-this.gridInfo.padding;
	    		
	    		// create the sprite and place the center in the position
	    		var gridSprite = theGrid.create(posX,posY,'empty');
	    		gridSprite.alpha = 0.4;
	    		gridSprite.anchor.set(0.5);

	    		// save in a 2D array the reference to the sprite, create a new element object
	    		var grid = new GridElement(gridSprite, "empty", false);
	    		this.gridSystem[x][y] = grid;

	    		// add custom attributes to the sprite, to be able to pick out the right one from the grid system later
	    		grid.sprite.indexNr = {
	    			"x": x,
	    			"y": y
	    		};
	    	}
	    }

	    // set input on every grid
	    theGrid.setAll('inputEnabled', true);
	    // using the power of callAll we can add the same input event to all grids in the group:
	    theGrid.callAll('events.onInputDown.add', 'events.onInputDown', this.clickedGrid, this);

	    // If the level has stars, add these
        if(this.levelData.stars != undefined) {
	        this.starBar = this.add.sprite(this.world.centerX, 40, 'starPoints');
	        this.starBar.scale.setTo(0.6);
	        this.starBar.anchor.set(0.5);
	        
	        this.points = 0;
	        
	        this.maxPoints = this.levelData.stars.length;
	        this.starPoints = this.add.text(this.world.centerX+13, 44, this.points + " / " + this.maxPoints, smallStyle);
	        this.starPoints.anchor.set(0.5);

        	// Go trought the leveldata and add the stars
        	this.levelData.stars.forEach(function(elements){
        		// desides if the grid is flipped or not, setting different x and y values depending on this
	    		if (this.world.width > this.world.height)
	    			var starElement = this.gridSystem[elements.y][elements.x];
	    		else
        			var starElement = this.gridSystem[elements.x][elements.y];
        		
        		starElement.setType("star");
        		starElement.setColor(elements.color);
	    		starElement.sprite.scale.setTo(0.5);
	    		starElement.changeTexture();	
        	}, this);	    	
        }

        // adding bucket if level has it
        if(this.levelData.bucket != undefined) {
        	this.levelData.bucket.forEach(function(elements){
        		if (this.world.width > this.world.height)
        			var el = this.gridSystem[elements.y][elements.x];
        		else
        			var el = this.gridSystem[elements.x][elements.y];

        		el.setType("bucket");
        		el.setColor(elements.color);
        		el.changeTexture();	
        	}, this);
        }

        // Adding blackholes if the level has it
        if(this.levelData.blackHole != undefined) {
        	this.levelData.blackHole.forEach(function(elements){
        		// desides if the grid is flipped or not, setting different x and y values depending on this
        		if (this.world.width > this.world.height)
        			var el = this.gridSystem[elements.y][elements.x];
        		else
        			var el = this.gridSystem[elements.x][elements.y];

        		el.setType("hole");
	    		el.changeTexture();	
        	}, this);
        }

	    // Add the goal
	    // Desides if the grid is flipped or not, setting different x and y values depending on this
	    if (this.world.width > this.world.height)
	    	var goalElement = this.gridSystem[this.levelData.goalInfo[0].y][this.levelData.goalInfo[0].x];
	   	else
	    	var goalElement = this.gridSystem[this.levelData.goalInfo[0].x][this.levelData.goalInfo[0].y];
	    
	    goalElement.setColor(this.levelData.goalInfo[0].color);
	    goalElement.setType("goal");
		goalElement.changeTexture();

		// Give the goal a little bit of movement
		//this.add.tween(goalElement.sprite.scale).to( { x: [1.3, 1.0], y: [1.3, 1.0]  }, 3000, "Linear", true, -1, false);
	
		// Add all the arrows to the grid
	    this.arrowGroup = this.add.group();
	    this.levelData.arrows.forEach(function(elements){
	    	var arrowDirection = elements.dir;

	    	// desides if the grid is flipped or not, setting different x and y values depending on this
	     	if (this.world.width > this.world.height) {
	     		var arrow = this.gridSystem[elements.y][elements.x];

	     		switch(arrowDirection) {
    				case "right":
        				arrowDirection="down";
        				break;
    				case "down":
        				arrowDirection="right";
       				 break;
       				case "up":
        				arrowDirection="left";
        				break;
    				case "left":
        				arrowDirection="up";
       				break;
       			}
	     	}
	     	else
	     		var arrow = this.gridSystem[elements.x][elements.y];
	     	
	     	arrow.setColor(elements.color);
	     	arrow.setType("arrow", arrowDirection);
	     	arrow.setSelected(elements.selected);
	     	arrow.changeTexture();

	     	// If it is the first level, add a little bit of movement to the arrow that can be clicked.
	     	if(this.currentLevel==1 && elements.selected) this.tween = this.add.tween(arrow.sprite.scale).to( { x: [1.5, 1.0], y: [1.5, 1.0]  }, 2000, "Linear", true, -1, false);

	     	this.arrowGroup.add(arrow.sprite);
	    }, this);

	    // Place 5 random arrows. The function only does this at level 2-5 at each chapter
	    this.placeRandomArrow(5);

		// ==========================
	    // debugmodes
	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);

	    // adding the cursor.
	    cursors = this.input.keyboard.createCursorKeys();
	},

	// Function than randomly places nrRandomArrows on the grid. 
	// Will only add extra arrows if the level is number 2-5 on each chapter.
	placeRandomArrow : function(nrRandomArrows) {
		var addExtraArrwos = this.currentLevel%5 > 2 ? true : false;
		if (addExtraArrwos) {
		    var placedArrows = 0;

		    while (placedArrows!=nrRandomArrows) {
		    	var xPos = getRandom(0, this.gridInfo.nrWidth-1); //  TODO, globala variabler senare
		    	var yPos = getRandom(0, this.gridInfo.nrHeight-1); 
		    	var element = this.gridSystem[xPos][yPos];
		    	if(element.isType("empty")) {
		    		// get a random direction
		    		var directions = ["left", "right", "down", "up"];
		    		var dirIndex = getRandom(0,3);
		    		
		    		// make a random new arrow and place it, else go again in the while loop
		    		element.setColor("blue"); // hur göra här? kanske ha en färg per nivå
		    		element.setType("arrow", directions[dirIndex]);
			     	element.setSelected(false); // always set to false instead!! 
			     	element.changeTexture();
		    		placedArrows++;
		    	} 
		    }
		}
	},
	
	// This function should open a module and ask if the user want to go back to menu
	backOneStep : function () {

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

        var text = this.add.text(this.world.centerX, this.world.centerY-20, "Do you really \n want to quit?", panelTextStyle);
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
        	if(playMusic) clickSound.play();
        	this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);
        yesBtn.events.onInputDown.add(function (e,pointer){
        	if(playMusic) clickSound.play();
        	this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

       modal.events.onInputDown.add(function (e, pointer) {
            this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);

       //this.add.tween(modalGroup).from({ y: this.world.height/2 }, 600, Phaser.Easing.Cubic.None, true);
	},

	// The user clicked on the grid 
	// This function will activate all arrows in that direction
	// Also checks if it has travelled over a star, a black hole or have reached the goal. 
	clickedGrid : function(item) {
		var x = item.indexNr.x, y = item.indexNr.y;
		var gridElement = this.gridSystem[x][y]; // get the gridElement

		if(this.currentLevel==1) {this.tween.stop(); gridElement.sprite.scale.setTo(1.0);  } // reset the tween if level 1

		// if the element the user clicked on is an arrow and can be clicked on
		if(gridElement.isArrow() && gridElement.isSelected) {
			if(playMusic) this.arrowSound.play("",0,0.4); // the attributes tell how loud the sound should be
			
			this.click++;
			this.scoreText.text = "Clicks: " + this.click;

			// get the color of the arrow that was clicked on 
			var color = gridElement.color;

			// set all other arrows to deactivated on the grid before
			// proceeding to activate other arrows
			for (var x=0; x<this.gridInfo.nrWidth; x++){
				for (var y=0; y<this.gridInfo.nrHeight; y++){
					var e = this.gridSystem[x][y];
					if(e.isSelected) { // if active arrow, set to false. 
						e.setActive(false);
					}
				}
			}

			// The direction to shoot. Need to traverse the array different
			// depending on the direction. 
			var direction = gridElement.direction; 
			var element;
			var e; 
			// break statement so that I can exit the loop if I reach the goal or a hole.
			breakme: {
				if(direction == "left") {
					for (var i=item.indexNr.x-1; i>=0; i--) {
						e = this.walkedOverElement(i, item.indexNr.y, color);
						element = e.element;

						if(e.newColor != "") {
							color = e.newColor;
						}
						
						if(e.goal || element.isType("hole"))
							 break breakme;
					}
				}
				else if(direction == "right") {
					for (var i=item.indexNr.x+1; i<this.gridInfo.nrWidth; i++) {
						e = this.walkedOverElement(i, item.indexNr.y, color);
						element = e.element;

						if(e.newColor != "") {
							color = e.newColor;
						}
						
						
						if(e.goal || element.isType("hole"))
							 break breakme;
					}
				}
				else if(direction == "up") {
					for (var i=item.indexNr.y-1; i>=0; i--) {
						e = this.walkedOverElement(item.indexNr.x, i, color);
						element = e.element;

						if(e.newColor != "") {
							color = e.newColor;
						}
						
						
						if(e.goal || element.isType("hole"))
							 break breakme;
					}
				}
				else if(direction == "down") {
					for (var i=item.indexNr.y+1; i<this.gridInfo.nrHeight; i++) {
						e = this.walkedOverElement(item.indexNr.x, i, color);
						element = e.element;

						if(e.newColor != "") {
							color = e.newColor;
						}
						

						if(e.goal || element.isType("hole"))
							 break breakme;
					}
				}
			}

			// The variable element now will hold the last element it visited or a goal or a hole
		 	if(element==undefined) {
				if(playMusic) this.gameOverSound.play();
				this.gameOver = "You walked out of the field and run out of active arrows.."; // ändra denna text sen. 
				this.showModal();
			}
			else {
				// The element reached was a goal. Check if the level has stars, if so check
				// if have collected all in order to reach the goal. If not a level with star, just win. 
				if (element.isGoal()) {
					if(e.wrongArrow){
						if(playMusic) this.gameOverSound.play();
						this.gameOver = "The color on the arrow did not match the goal! Try again."
						this.showModal();
					}
					else if(this.levelData.stars != undefined && this.points==this.maxPoints) {
						if(playMusic) this.winSound.play();
						this.madeLevel();
						this.showModalWin();
					}
					else if(this.levelData.stars != undefined && this.points!=this.maxPoints){
						if(playMusic) this.gameOverSound.play();
						this.gameOver = "You didn't collect all the stars."
						this.showModal();
					}
					else {
						if(playMusic) this.winSound.play();
						this.madeLevel();
						this.showModalWin();
					}
				}
				// If the element type was a hole, just change the text that may appear later
				else if(element.isType("hole")) {
					this.gameOver = "You got stuck in a black hole.\n Tip: try to avoid it!";
				}

				// If the element is not a goal and you don't have more active arrows.
				// Show the fail module and change the game over text depeding on if dissapeared in a hole or not
				if (!element.isGoal() && this.availableMoves()==0) {
					if(playMusic) this.gameOverSound.play();
					if (!element.isType("hole")) this.gameOver = "You run out of active arrows.."
					this.showModal();
				}
			}

			// change the gridElement to empty again. 
			gridElement.resetToEmpty();
		}
	},

	// Function that handles the element that an arrow will activate
	// Do stuff depending on which element it was. 
	// return: if the element is the goal and also the element that was clicked on.  
	walkedOverElement : function(x, y, color) {
		var element = this.gridSystem[x][y];
		var reachedGoal;
		var wrong = false;
		var newColor = ""; 

		if(element.isGoal()) { 
			if (this.levelData.bucket!=undefined && color != element.color) {
				wrong = true;
			}

			reachedGoal = true;
			element.sprite.scale.setTo(1.0);

			return {"goal" : reachedGoal, "element": element, "wrongArrow" : wrong };
		}

		if(element.isStar()){
			// only play sound if that setting is set
			if(playMusic) this.starSound.play();
			this.createSparkle(element.sprite.x, element.sprite.y, 500, 20, 10);
			this.points++;
			this.starPoints.text =  this.points + " / " + this.maxPoints;
			
			// if the element was a star, reset it to empty again
			element.resetToEmpty();
			element.sprite.scale.setTo(1.0);
		
			if(this.points == this.maxPoints) { // if reached max stars
				//this.createSparkle(element.sprite.x, element.sprite.y, 1500, 100, 30);
				//this.createSparkle(this.world.centerX, 50, 1500, 100, 30);
				//blir det för mycket? göra något annat här. typ annat ljud? durrar till när uppe? ngt liknande kanske
			}
		}
		else if(element.isType("bucket")) {
			newColor = element.color;
			color = newColor;
			// bucket
			element.resetToEmpty();
			// change color!!!! 

		}
		// activate the element it went over
		element.setActive(true, color);
		reachedGoal = false;

		return {"goal" : reachedGoal, "element": element, "newColor": newColor};
	},

	// Function that calculates number of available moves on the grid
	availableMoves : function() {
		var moves=0;

		// not the optimal solution, but since the grid is not so large, this works. 
		// if larger grid, this needs to change. 
		this.gridSystem.forEach(function(itemRow){
			itemRow.forEach(function(item){
				if(item.isArrow() && item.isSelected)
					moves++;
			}, this);
		},this);

		return moves;
	},

	createSparkle : function(x,y, time, width, numbers) { // texture name sparkle
		// create and emitter
		// emit from the starposition sort of this.world.centerX, 40
		var emitter = this.game.add.emitter(x,y,50);
		emitter.makeParticles('sparkle');
		emitter.forEach(function(particle) {
			  // tint every particle red
			  particle.tint = 0xEDFBFF;
		});
		emitter.maxParticleScale = 0.8;
		emitter.minParticleScale = 0.2;
		emitter.minRotation = 0;
		emitter.maxRotation = 40;
		emitter.gravity=0;
		emitter.setYSpeed(-70, -85);
		emitter.setXSpeed(-50, 70);
		emitter.width = width;

		emitter.start(true, time, null, numbers);
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

	// Function that will be called when the user have clearad a level
	madeLevel : function(){
		// only update in the localstorage when another value 
		if (!madeLevels[this.currentLevel-1]){
			madeLevels[this.currentLevel-1]=true;
			localStorage.setItem("arrowMadeLevels", JSON.stringify(madeLevels));
		}
		this.sp = (this.click <= this.levelData.best ? 3 : (this.click > this.levelData.best+2 ? 1 : 2));
		if (madeLevelsStars[this.currentLevel-1] < this.sp) { // bara spara det nya resultatet om det är bättre
			madeLevelsStars[this.currentLevel-1] = this.sp;
			localStorage.setItem("arrowLevelStars", JSON.stringify(madeLevelsStars));
		}
		// update the local storage with the new record and made the level!!
	},

	// Function that will take you to the next level
	nextLevel: function() {
		this.currentLevel++;

		// sum up how many levels you have made
		var total = madeLevels.reduce(function(a, b) {
		  return a + b;
		});

		// Check if you have more levels to go, or if you done the last levek
		if (this.currentLevel <= numberOfLevels) {
			this.state.start('Level', true, false, this.currentLevel);
		}
		else if(total != numberOfLevels) { // if you have reached the last level and not done all levels!!
			this.currentLevel--;
			this.quitGame();
		}
		else { 
			// you have reeached the end level! congratz
			this.state.start('Finished');
		}
	},

	// Function that will show a modal over the game.
	// This modal is for when the user have failed a level.
	// Buttons for restarting the level or go to the menu are visible. 
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

        // ------- the text inside --------
        var nStyle = modalSmallText;
        nStyle.wordWrapWidth = module.width-50;

        var tStyle = mediumStyle;
        tStyle.wordWrap = true;
        tStyle.wordWrapWidth = module.width-30;

        var text = this.add.text(this.world.centerX, this.world.centerY-20, "OH noooh!", tStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);
        
        /*var tipBar = this.add.sprite(this.world.centerX-60 ,this.world.centerY -10, 'tipBar');
        tipBar.scale.setTo(0.8);
        modalGroup.add(tipBar);*/

        var tip = this.add.text(this.world.centerX, this.world.centerY+90, this.gameOver, nStyle);
        tip.anchor.set(0.5);
        modalGroup.add(tip);

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
        	if(playMusic) clickSound.play();
        	modalGroup.visible = false;
            this.resetThisLevel();
        }, this);
        menuBtn.events.onInputDown.add(function (e,pointer){
        	if(playMusic) clickSound.play();
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

       // this.add.tween(modalGroup).from({ y: this.world.height/2 }, 600, Phaser.Easing.Cubic.None, true);

        // add buttons to click!! 
        /*modal.events.onInputDown.add(function (e, pointer) {
            modalGroup.visible = false;
            this.resetThisLevel();
        }, this);*/
	},

	// Function that show a modal when you have made the level.
	// Will show number of stars, number of clicks and also a tip text. 
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

        // ------- the text inside --------
        var nStyle = modalSmallText;
        nStyle.wordWrapWidth = module.width-50;

    	// draw the right stars according to the points. 
    	var textureStars = this.sp + "star"; // starPoints
    	var starSprite = this.add.sprite(this.world.centerX, this.world.centerY-70, textureStars);
    	starSprite.anchor.set(0.5);
    	starSprite.scale.setTo(0.7);
    	modalGroup.add(starSprite);

    	// how many clicks
    	var text = this.add.text(this.world.centerX, this.world.centerY-10, "Clicks: " + this.click, mediumStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

    	// tips
/*    	var tipBar = this.add.sprite(this.world.centerX-60 ,this.world.centerY -10, 'tipBar');
    	tipBar.scale.setTo(0.8);
        modalGroup.add(tipBar);*/
        var tip = this.add.text(this.world.centerX, this.world.centerY+90, this.levelData.tip, nStyle);
        tip.anchor.set(0.5);
        modalGroup.add(tip);

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

        //game.add.tween(sprite).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        //this.add.tween(modalGroup).from({ y: this.world.height/2 }, 600, Phaser.Easing.Cubic.None, true);

        menuBtn.events.onInputDown.add(function (e,pointer){
        	if(playMusic) clickSound.play();
        	modalGroup.visible = false;
            this.quitGame();
        }, this);

        tryAgainBtn.events.onInputDown.add(function (e,pointer){
        	if(playMusic) clickSound.play();
        	modalGroup.visible = false;
            this.resetThisLevel();
        }, this);

        nextBtn.events.onInputDown.add(function (e,pointer){
        	if(playMusic) clickSound.play();
        	modalGroup.visible = false;
            this.nextLevel();
        }, this);
	},

	// When the user have clicked on the reload button, a module will appear
	// The modal will ask if the user really wants to restart the level. 
	reloadLevelBtn : function() {

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

        var text = this.add.text(this.world.centerX, this.world.centerY-20, "Do you want to\n restart the level?", panelTextStyle);
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
        	if(playMusic) clickSound.play();
        	this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);
        yesBtn.events.onInputDown.add(function (e,pointer){
        	if(playMusic) clickSound.play();
        	this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
            this.resetThisLevel();
        }, this);

       modal.events.onInputDown.add(function (e, pointer) {
            this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);

       //this.add.tween(modalGroup).from({ y: this.world.height/2 }, 600, Phaser.Easing.Cubic.None, true);
	},

	// Function that restarts this current level. 
	resetThisLevel : function() {
		this.state.start('Level', true, false, this.currentLevel);
	},

	// Go back to the level selection from the game. 
	// Determines which page in the levelselction to go to, depending on which level
	// the user was at. 
    quitGame: function (pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        var pageStart = Math.floor((this.currentLevel-1)/5); //show the page which indicate the chapter you are on. page 2 är chapter 1 vilket är nivå 1-5 etc...
        this.state.start('SelectLevels', true, false, pageStart+2);
    }
};

// help function
function getRandom(min, max) {
	return Math.floor(Math.random() * (max-min+1) + min);
}
