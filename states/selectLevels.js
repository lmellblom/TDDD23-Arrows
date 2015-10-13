var GAME = GAME || {};

GAME.SelectLevels = function() {};

GAME.SelectLevels.prototype = {
	init: function(pageId) { // add a custom variable to tell which page to show first
		this.currentPage = pageId || 2; 
	},
	create: function() {

		this.game.stage.backgroundColor = '#FFF';

		//TESTING swipe. Maybe use or not.. 
		// var element = document.getElementsByTagName('body')[0];
		// var hammer    = new Hammer.Manager(element);
		// var swipe     = new Hammer.Swipe();

		// hammer.add(swipe);

		// hammer.on("swiperight", ((ev) => {    	
	 //    	if (this.currentPage >=2) {
		//     	this.showSpecificChapter(this.currentPage-1, true);
		//     	console.log( ev.type +" gesture detected.");
		//     }
		// }));

		// hammer.on("swipeleft", ((ev) => {    	
	 //    	if (this.currentPage<this.pages){
		//     	this.showSpecificChapter(this.currentPage+1, true);
		//     	console.log( ev.type +" gesture detected.");
		//     }
		// }));

		this.pages = numberOfLevels/5 + 1; // +1 för inforutan först!!
		this.drawStars = [];
		this.drawLevels = [];
		this.clickSound = this.add.audio('clickSound');
		this.modalGroup = this.add.group();

		var backGreen = this.add.sprite(-this.game.width, -(backgroundHeight - this.world.height), 'background');
		var spaceBack = this.add.sprite(this.game.width, -(1000 - this.world.height), 'spaceBackground'); // different kind of graphics when different stages sort of?
		var backGreen2 = this.add.sprite(3*this.game.width, -(1170 - this.world.height), 'rainbowBackground');
		this.modalGroup.add(backGreen);
		this.modalGroup.add(spaceBack);
		this.modalGroup.add(backGreen2);

		// add information about the game here
		var info = "Game by Linnéa Mellblom. More info will come up shortly! Enjoy.";
		var infoS = panelTextStyle;//mediumStyle;
		infoS.wordWrap = true;
        infoS.wordWrapWidth = this.game.width-this.game.width/3;
        infoS.align = "left";
        var theInfo = this.add.text(-this.game.width+this.game.width/2, this.game.height/2-70, info, infoS);
        theInfo.anchor.set(0.5);
        this.modalGroup.add(theInfo);

        // button to clear your prograss. 
        var change = this.add.sprite(-this.game.width+this.world.centerX, this.game.height/2 + 50,'clearProgress');
        change.anchor.set(0.5);
        change.scale.setTo(0.6);
        change.inputEnabled =true;
        change.events.onInputDown.add(this.clearProgress, this);
        this.modalGroup.add(change);
		
		// the logo is here also
		var header = this.add.sprite(this.world.centerX, this.world.centerY-200, "arrowHeader");
		header.anchor.set(0.5);
		header.scale.setTo(0.6);

		// tween the logo also
		header.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
          var headerTween = this.add.tween(header);
		headerTween.to({
			angle: -header.angle
		},5000+Math.random()*5000,Phaser.Easing.Linear.None,true,0,1000,true);

		// draw stars and levels
	    this.drawTheLevels();

	    // add settingspanel
	    settingsPanel(this, "levelSelect");

	    // the mascot
	   /* var mascot = this.add.sprite(this.world.width - 170, this.world.height-180, 'mascotIcon');
	    mascot.scale.setTo(0.5);
	    this.helmet = this.add.sprite(this.world.width - 170, this.world.height-178, 'spaceHelmet');
	    this.helmet.scale.setTo(0.5);*/

	    // the arrow do not work correctly att the moment!! 
	    this.rightArrow = this.add.sprite(this.world.centerX + 200, this.world.centerY+10, 'rightArrow');
	    this.rightArrow.scale.setTo(0.8);
	    this.rightArrow.anchor.set(0.5);
	    this.rightArrow.dir = "right";

	    // left arrow, sprite.angle
       	this.leftArrow = this.add.sprite(this.world.centerX - 200, this.world.centerY+10, 'rightArrow');
       	this.leftArrow.angle = 180;
	    this.leftArrow.scale.setTo(0.8);
	    this.leftArrow.anchor.set(0.5);
	    this.leftArrow.dir = "left"; 
	    this.leftArrow.alpha = 1.0; // since first page and should not be able to go left..

	    this.arrowButtonG = this.add.group();    
	    this.arrowButtonG.add(this.leftArrow);
	    this.arrowButtonG.add(this.rightArrow);

	    this.arrowButtonG.setAll('inputEnabled', true);
	    // using the power of callAll we can add the same input event to all coins in the group:
	    this.arrowButtonG.callAll('events.onInputDown.add', 'events.onInputDown', this.arrowClicked, this);

		// lägga till små rektanglar länst ned för att kunna trycka på, typ gå mellan sidor snabbt.
		// levelSquare
		this.allSquares = this.add.group();
		this.pageSelector = [];

		// sum up the done levels in each chapter
		var sumOfDoneLevels = Array(numberOfLevels/5).fill(0);
		for (var i=0; i<numberOfLevels; i++){
			var index = Math.floor(i/5);
			sumOfDoneLevels[index] += madeLevels[i];
		}

		var space = 30;
		for (var i=0; i<this.pages; i++) {
			var squareName = i==0 ? "levelSquareInfo" : "levelSquare" ;
			var btnSquare = this.add.sprite(this.world.centerX-space*2 + space*i, this.world.centerY+150, squareName);
			btnSquare.page = i+1; 
			this.pageSelector[i]=btnSquare;
			btnSquare.alpha = (i+1 == this.currentPage ? 1.0 : 0.5);
			this.allSquares.add(btnSquare);

			// add a star on the square if you have done all the levels in the chapter
			if(sumOfDoneLevels[i-1]==5) {
				var addStar = this.add.sprite(this.world.centerX-space*2 + space*i+8 ,this.world.centerY+150+8, 'smallStar');
		        addStar.anchor.set(0.5);
		        addStar.scale.setTo(0.65);
		        addStar.angle = 9;
		        addStar.alpha = 1.0;
			}

		}
		this.allSquares.setAll('inputEnabled', true);
	    this.allSquares.callAll('events.onInputDown.add', 'events.onInputDown', this.showSpecificChapter, this);

	    // show the specific page on the level selection.
	    this.showSpecificChapter(this.currentPage, false);
	},
	drawTheLevels : function() {
		var levelNames = ["Find your way home", "Watch out for black holes!", "The stars are shining", "Colerful world"];
		var styleLevelName = { font: "16px Carter One", fill: "#000", align: "center",  stroke: "#000", strokeThickness: 0 };
        var numberStyle = { font: "24px Skranji", fill: "#FFF", align: "center", fontWeight: "bold",  stroke: "#000", strokeThickness: 5};
        var levelGroup = this.add.group();
        var levelClick = this.add.group();

		for (var nr = 0; nr < numberOfLevels/5 ; nr++) {
        	var xValue = this.world.centerX + nr*this.game.width;

	        var module = this.add.sprite(xValue ,this.world.centerY , 'levelModule');
	        module.scale.setTo(0.6, 0.6);
	        module.anchor.set(0.5,0.5);
	        this.modalGroup.add(module);

	        // the levelName
	        var levelN = this.add.text(xValue,this.world.centerY-40, levelNames[nr], styleLevelName);
	    	levelN.anchor.set(0.5);    	
	    	this.modalGroup.add(levelN); 

	        // adding the number and background to the levels
	        // får plats 5 stycken... 
	        var startX = this.world.centerX-140 + nr*this.game.width;
	        var startY = this.world.centerY - 30;

	        // place the level sprites with the right level number
	        for (var j=0; j<5; j++) {
	        	i = nr *5+j;
	        	var isActive = ( i%5==0 ? true : madeLevels[i-1]); //om nivån innan är klarad, då är leveln öppnad
	        	var textureName = isActive ? "activeLevel" : "inactiveLevel";
	        	var levelNr = i+1;
	        	var xPos = startX + 70*j;
	        	var yPos = startY + 40 + (isActive? 2 : 0 );	 // set this value to another when only have 5 levels on each module. when ten use startY else another

	        	var levelSprite = this.add.sprite(xPos,yPos,textureName);
	        	levelSprite.level = levelNr;
	        	levelSprite.anchor.set(0.5); 
	        	levelSprite.scale.setTo(0.6, 0.6);
	        	this.drawLevels.push(levelSprite);

	        	if(isActive) levelSprite.tint = 0xf1d4a6;

	        	var text = this.add.text(xPos +2, yPos + (isActive? -2 : +4), levelNr, numberStyle);
	        	text.anchor.set(0.5);    	
	    		levelClick.add(text);    		
	    		levelGroup.add(levelSprite);

	        	// lägg till stjärnor under beroende på om man klarat eller inte
	        	var spacing = 12;
	        	var paddY = 16;
	        	if (madeLevelsStars[i]!= 0) { 
		        	for (var indexStar=0; indexStar<3; indexStar++) {

		        		var addStar = this.add.sprite(xPos-spacing + indexStar*spacing ,yPos+paddY, 'smallStar');
		        		addStar.anchor.set(0.5);
		        		addStar.scale.setTo(0.65);
		        		addStar.angle = 9;

		        		// tint the star depending on how you many stars you got
		        		if (indexStar + 1 > madeLevelsStars[i]) {
		        			addStar.tint = 0x000000;
		        			addStar.alpha = 0.3;
		        		} 

		        		this.drawStars.push(addStar);
			        	levelGroup.add(addStar);
			    	}
		    	}

	    		 		
	        }
    	}

        // add another module with empty for now
        this.modalGroup.visible = true;

        // set input on very level
	    levelGroup.setAll('inputEnabled', true);
	    // using the power of callAll we can add the same input event to all coins in the group:
	    levelGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.startLevel, this);

	    // add the groups to the whole levels so to tween it!
	    this.modalGroup.add(levelGroup);
	    this.modalGroup.add(levelClick);

	},
	resetDrawing : function () {
		// alltsåå.. kommer bli så sämst detta... TODO : ändra till bättreeee
		this.drawLevels.forEach(function(level){
			level.kill();
		}, this);
		this.drawStars.forEach(function(stars){
			stars.kill();
		}, this);
		this.drawLevels = [];
		this.drawStars = [];
		this.drawTheLevels();
	},
	arrowClicked : function(button) {
		if (!this.tweens.isTweening(this.modalGroup)) { // to prevent the module to slide even more if it is already moving!

		if(button.dir==="left" && this.currentPage>1) {
	    		var slide = '+' + this.world.width; 
	    		this.rightArrow.alpha = 1;
	    		this.currentPage--;
	    		if (this.currentPage==1) {
	    			button.alpha = 0.0;

	    		}

	    		this.allSquares.setAll('alpha', 0.5);
				// reset all other elemets
				this.pageSelector[this.currentPage-1].alpha = 1.0;

	    		var buttonsTween = this.add.tween(this.modalGroup);
				buttonsTween.to({
					x: slide
				}, 500, Phaser.Easing.Cubic.None);
				buttonsTween.start();
	    	}
	    else if(button.dir === "right" && this.currentPage<this.pages){
	    		var slide = '-' + this.world.width;
	    		this.leftArrow.alpha = 1;
	    		this.currentPage++;
	    		if (this.currentPage==this.pages) {
	    			button.alpha = 0.0;

	    		}

	    		this.allSquares.setAll('alpha', 0.5);
				// reset all other elemets
				this.pageSelector[this.currentPage-1].alpha = 1.0;

	    		var buttonsTween = this.add.tween(this.modalGroup);
				buttonsTween.to({
					x: slide
				}, 500, Phaser.Easing.Cubic.None);
				buttonsTween.start();
	    	}
	    }

	    //this.helmet.visible = this.currentPage >=3 ? true : false;

	},
	update: function() {

	},
	showSpecificChapter : function (number, shoudlTween) {
		var tweening = shoudlTween; 
		var number = number.page || number;
		var i = number-1;

		// show helmet or not? depending on the space levels or not
		//this.helmet.visible = number >=3 ? true : false;

		this.allSquares.setAll('alpha', 0.5);
		// reset all other elemets
		this.pageSelector[i].alpha = 1.0;
		this.currentPage = number; 

		// to be able to use both. 
		if (!tweening) {
			this.modalGroup.x = this.world.width-this.world.width*i;
		}
		else {
		// tween to right position.. 
		this.add.tween(this.modalGroup)
			.to({
				x: this.world.width - this.world.width * i
			}, 500, "Linear")
			.start();
		}
		this.leftArrow.alpha = 1.0;
		this.rightArrow.alpha = 1.0;
		if (this.currentPage==1) {
	    	this.leftArrow.alpha = 0.0;

	    }
	    else if (this.currentPage==this.pages) {
	    	this.rightArrow.alpha = 0.0;
	    }

	},
	firstSettingsBtn : function() {
		// går till informationssidan som ligger längst till vänster om alla chapters
		this.rightArrow.alpha = 1.0;
		this.add.tween(this.modalGroup)
			.to({
				x: this.world.width
			}, 500, "Linear")
			.start();
		this.currentPage = 1;
		this.leftArrow.alpha = 0.0;
		this.allSquares.setAll('alpha', 0.5);
		// reset all other elemets
		this.pageSelector[0].alpha = 1.0;
	},
	backOneStep: function() {
		this.game.state.start('MainMenu');
	},
	startLevel : function(sprite){
		var levelIndex = sprite.level - 1;

		if (levelIndex%5==0  || madeLevels[levelIndex-1]){
			if (playMusic) this.clickSound.play()
			this.game.state.start('Level', true, false, sprite.level);
		}
	},
	// this function should open a module and ask if the user want to go back to menu
	clearProgress : function () {

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

        var text = this.add.text(this.world.centerX, this.world.centerY-20, "Are you sure you want \n to clear your progress?", panelTextStyle);
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
        	console.log("clear progress... ");
        	// rensa allt!! 

        	for (var i=0; i<numberOfLevels; i++) {
			  	madeLevels[i]= false;
			    madeLevelsStars[i] = 0;
			  }
            // save in the localstorage as well!
            localStorage.setItem("arrowLevelStars", JSON.stringify(madeLevelsStars));
            localStorage.setItem("arrowMadeLevels", JSON.stringify(madeLevels));

            // need to redraw all the level sort of..
            this.resetDrawing();

        }, this);

       modal.events.onInputDown.add(function (e, pointer) {
            this.settingsBtn.inputEnabled = true;
        	modalGroup.visible = false;
        }, this);
	},

};
