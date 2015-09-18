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
		
		this.showSettings = false;

		this.gameOver = "";
	}, 

	create: function() {

		// sounds, mayb add this in the main instead as global?
		//clickSound
		this.winSound = this.add.audio('winSound');
		this.starSound = this.add.audio('starSound');
		this.arrowSound = this.add.audio('arrowSound');
		this.gameOverSound = this.add.audio('gameOverSound');

	    //  A simple background for our game -> this will add a background image instead. this.add.sprite(0, 0, 'sky'); //73FF8F
	    this.game.stage.backgroundColor = '#FFF';
	    if (this.currentLevel <=5)
	    	var background = this.add.sprite(0, -(backgroundHeight - gameHeight), 'background');
	    else
		    var background = this.add.sprite(-100, -(1000 - gameHeight), 'spaceBackground');

	    background.alpha = 0.8;

	    var whiteBack = this.game.add.graphics(this.game.width, this.game.height);
		whiteBack.beginFill("#FFF", 0.2);
		var padding = 0;
        whiteBack.x = padding;
        whiteBack.y = padding;
        whiteBack.drawRect(padding, padding, this.game.width-padding*4, this.game.height-padding*4);

	    this.levelText = this.add.text(20, 20, "Level " + this.currentLevel, generalStyle);
        this.scoreText = this.add.text(this.world.width-130, 20, "Clicks: " + this.click, generalStyle);

       	// add a settingspanel to the level, handles all buttons and functions.
       	settingsPanel(this);

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


        if(this.levelData.stars != undefined) {
        	// TODO : only add this when the level say that a star should be added
	        this.starBar = this.add.sprite(this.world.centerX-70, 20, 'starPoints');
	        this.starBar.scale.setTo(0.6);
	        this.points = 0;
	        this.maxPoints = this.levelData.stars.length;
	        this.starPoints = this.add.text(this.world.centerX-10, 30, this.points + " / " + this.maxPoints, smallStyle);
	        

        	// set out the star in the grid, a foor loop
        	this.levelData.stars.forEach(function(elements){
        		var starElement = this.gridSystem[elements.x][elements.y];
        		starElement.setType("star");
	    		starElement.sprite.scale.setTo(0.5);
	    		starElement.changeTexture();	
        	}, this);
	    	
	    	
        }

        if(this.levelData.blackHole != undefined) {
        	// set out the star in the grid, a foor loop
        	this.levelData.blackHole.forEach(function(elements){
        		var el = this.gridSystem[elements.x][elements.y];
        		el.setType("hole");
	    		//el.sprite.scale.setTo(0.5);
	    		el.changeTexture();	
        	}, this);

        }
        // -----------

	    // add the goal
	    var goalElement = this.gridSystem[this.levelData.goalInfo[0].x][this.levelData.goalInfo[0].y];
	    goalElement.setColor(this.levelData.goalInfo[0].color);
	    goalElement.setType("goal");
		goalElement.changeTexture();
	
	    this.arrowGroup = this.add.group();

	    // add all the arrows
	     this.levelData.arrows.forEach(function(elements){
	     	var arrow = this.gridSystem[elements.x][elements.y];
	     	arrow.setColor(elements.color);
	     	arrow.setType("arrow", elements.dir);
	     	arrow.setSelected(elements.selected);
	     	arrow.changeTexture();

	     	if(this.currentLevel==1 && elements.selected) this.tween = this.add.tween(arrow.sprite.scale).to( { x: [1.5, 1.0], y: [1.5, 1.0]  }, 2000, "Linear", true, -1, false);

	     	this.arrowGroup.add(arrow.sprite);
	    }, this);

	    // debugmodes
	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);
	    cursors = this.input.keyboard.createCursorKeys();
	},
	// this function should open a module and ask if the user want to go back to menu
	backOneStep : function () {

		var modalGroup = this.add.group();

		/*var moduleInfo = {
			"backgroundPanel": "panelModule",
			"backgroundScale": 0.9,
			"text": "Do you really \n want to quit?",
			"buttons" : [
			{"sprite": "noBtn", "functions": null, "x": this.world.centerX-70, "y":this.world.centerY+80},
			{"sprite": "yesBtn", "functions": this.quitGame(), "x": this.world.centerX+70, "y": this.world.centerY+80},

			]
		};*/

		var modal = this.game.add.graphics(this.game.width, this.game.height);
		modal.beginFill("0x000000", 0.7);
        modal.x = 0;
        modal.y = 0;
        modal.drawRect(0, 0, this.game.width, this.game.height);
        modal.inputEnabled = true;
        modalGroup.add(modal);
/*
        var module = this.add.sprite(this.world.centerX ,this.world.centerY , moduleInfo.backgroundPanel);
        module.scale.setTo(moduleInfo.backgroundScale);
        module.anchor.set(0.5,0.5);
        modalGroup.add(module);

        var text = this.add.text(this.world.centerX, this.world.centerY-20, moduleInfo.text, generalStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

        // add buttons
        moduleInfo.buttons.forEach(function(button){
        	var btn = this.add.sprite(button.x, button.y, button.sprite);
        	btn.anchor.set(0.5);
        	btn.scale.setTo(0.7);
        	btn.inputEnabled = true;
        	modalGroup.add(btn);

        	btn.events.onInputDown.add(function (e,pointer){
	        	if(playMusic) this.clickSound.play();
	        	this.settingsBtn.inputEnabled = true;
	        	modalGroup.visible = false;
	        	button.functions;
	        }, this);
        }, this);


        */

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
	clickedGrid : function(item) {


		var x = item.indexNr.x, y = item.indexNr.y;
		var gridElement = this.gridSystem[x][y];	// get the gridelement

		if(this.currentLevel==1) {this.tween.stop(); gridElement.sprite.scale.setTo(1.0);  } // reset the tween if level 1

		if(gridElement.isArrow() && gridElement.isSelected) {

			if(playMusic) this.arrowSound.play("",0,0.4); // maybe other sound
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
			// break statement so that I can exit the loop if I reach the goal or a hole.
			breakme: {
			if(direction == "left") {
				for (var i=item.indexNr.x-1; i>=0; i--) {
					var e = this.elementClick(i, item.indexNr.y, color);
					element = e.element;
					
					if(element.isGoal() || element.isType("hole"))
						 break breakme;
				}
			}
			else if(direction == "right") {
				for (var i=item.indexNr.x+1; i<this.gridInfo.nrWidth; i++) {
					var e = this.elementClick(i, item.indexNr.y, color);
					element = e.element;
					
					if(element.isGoal() || element.isType("hole"))
						 break breakme;
				}
			}
			else if(direction == "up") {
				for (var i=item.indexNr.y-1; i>=0; i--) {
					var e = this.elementClick(item.indexNr.x, i, color);
					element = e.element;
					
					if(element.isGoal() || element.isType("hole"))
						 break breakme;
				}
			}
			else if(direction == "down") {
				for (var i=item.indexNr.y+1; i<this.gridInfo.nrHeight; i++) {
					var e = this.elementClick(item.indexNr.x, i, color);
					element = e.element;

					if(element.isGoal() || element.isType("hole"))
						 break breakme;
				}
			}
			}

			if (element.isGoal()) {
				console.log("KLARA");

				if(playMusic) this.winSound.play();
				this.madeLevel();
				this.showModalWin();
				//console.log(this.levelData.tip);
				//console.log("You got " + starsPoints + " stars!");
			}
			else if(element.isType("hole")) {
				//console.log("woops! the arrow reached a black hole and disapeared!");
				this.gameOver = "You got stuck in a black hole.\n Tip: try to avoid it!";
			}
			
			if (!element.isGoal() && this.availableMoves()==0) {
				//console.log("inga drag kvar.. synd!");
				if(playMusic) this.gameOverSound.play();
				if (!element.isType("hole")) this.gameOver = "You run out of active arrows.."
				this.showModal();
				//console.log(this.levelData.tip);
			}

			// ändra detta gridElement till en empty igen
			gridElement.resetToEmpty();
		}
	},
	// function that handles click and looks if the element is a goal or not
	// will also return the element it goes over.
	elementClick : function(x,y, color) {
		var element = this.gridSystem[x][y];
		var reachedGoal;
		if(element.isGoal())
			reachedGoal = true;
		if(element.isStar()){
			if(playMusic) this.starSound.play(); // oterh sound
			this.points++;
			this.starPoints.text =  this.points + " / " + this.maxPoints;
			// change this element to and empty now
			element.resetToEmpty();
			element.sprite.scale.setTo(1.0);
		}
		element.setActive(true, color);
		reachedGoal = false;

		return {"goal" : reachedGoal, "element":element};
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

/*
localStorage["names"] = JSON.stringify(names);

//...
var storedNames = JSON.parse(localStorage["names"]);

*/

	madeLevel : function(){
		// only update when another value.. 
		if (!madeLevels[this.currentLevel-1]){
			madeLevels[this.currentLevel-1]=true;
			localStorage.setItem("arrowMadeLevels", JSON.stringify(madeLevels));
		}
		this.sp = (this.click == this.levelData.best ? 3 : 2); // kan bara få 3 eller 2 stjärnor än så länge ;) 
		//madeLevels[this.currentLevel-1].stars = this.sp;
		if (madeLevelsStars[this.currentLevel-1] < this.sp) { // bara spara det nya resultatet om det är bättre
			madeLevelsStars[this.currentLevel-1] = this.sp;
			localStorage.setItem("arrowLevelStars", JSON.stringify(madeLevelsStars));
		}

		// update the local storage with the new record and made the level!!
	},
 
	nextLevel: function() {
		var next = true;
		if (next) {
			this.resetForNextLevel();
			this.currentLevel++; // the current level is now 1

			// check if you reached the end level, therefore you should go back to the menu instead numberOfLevels
			if (this.currentLevel <= numberOfLevels) {
				//console.log("Starting the next level, level" + this.currentLevel);
				this.state.start('Level', true, false, this.currentLevel);
			}
			else { // you have reeached the end level! congratz...
				this.state.start('Finished');
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

      /*  var text = this.add.text(this.world.centerX, this.world.centerY-30, "OH noooh! \n No moves left..", generalStyle);
        text.text = text.text + " \n" + this.gameOver ;
        text.anchor.set(0.5);
        modalGroup.add(text);
*/

        // ------- the text inside --------
        var nStyle = { font: "18px Carter One", fill: "#000" };
        nStyle.wordWrap = true;
        nStyle.wordWrapWidth = module.width-30;
        nStyle.align = "left";

        var tStyle = mediumStyle;
        tStyle.wordWrap = true;
        tStyle.wordWrapWidth = module.width-30;

        var text = this.add.text(this.world.centerX, this.world.centerY-60, "OH noooh! \n No moves left..", tStyle);
        //text.text = text.text + " \n" + this.gameOver ;
        text.anchor.set(0.5);
        modalGroup.add(text);

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
        var nStyle = { font: "18px Carter One", fill: "#000" };
        nStyle.wordWrap = true;
        nStyle.wordWrapWidth = module.width-30;
        nStyle.align = "left";

        var text = this.add.text(this.world.centerX, this.world.centerY-60, "Clicks: " + this.click, mediumStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

        //var starsT = this.add.text(this.world.centerX, this.world.centerY, "Stars: " + this.sp, mediumStyle);
        for (var i=0; i<3; i++) {
        	var starsT = this.add.sprite(this.world.centerX-30 + i*30 ,this.world.centerY-30, 'star');
        	starsT.scale.setTo(0.4);
        	starsT.anchor.set(0.5);
        	var a = i+1 <= this.sp ? 1.0 : 0.3; 
        	starsT.alpha = a;
        	modalGroup.add(starsT);
    	}

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
