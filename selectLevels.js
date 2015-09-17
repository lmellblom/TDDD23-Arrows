var GAME = GAME || {};

GAME.SelectLevels = function() {};


GAME.SelectLevels.prototype = {
	create: function() {

		this.pages = 2;
		this.currentPage = 1;

		this.clickSound = this.add.audio('clickSound');

		this.add.sprite(0, -(backgroundHeight - gameHeight), 'background');

		// the logo is here also
		var style = { font: "60px Carter One", fill: "#FFF", align: "center",  stroke: "#000", strokeThickness: 5 };
		var header = this.add.text(this.world.centerX, this.world.centerY-200, "ARROWS", style);
		header.anchor.set(0.5);

		header.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

		// tween the logo also
		header.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
          var headerTween = this.add.tween(header);
		headerTween.to({
			angle: -header.angle
		},5000+Math.random()*5000,Phaser.Easing.Linear.None,true,0,1000,true);

		// ------------------- 

		this.modalGroup = this.add.group();
        var numberStyle = { font: "24px Skranji", fill: "#FFF", align: "center", fontWeight: "bold",  stroke: "#000", strokeThickness: 5};
        var levelGroup = this.add.group();
        var levelClick = this.add.group();

        for (var nr = 0; nr < numberOfLevels/5 ; nr++) {
        	var xValue = this.world.centerX + nr*this.game.width;

	        var module = this.add.sprite(xValue ,this.world.centerY , 'levelModule');
	        module.scale.setTo(0.6, 0.6);
	        module.anchor.set(0.5,0.5);
	        this.modalGroup.add(module);

	        // adding the number and background to the levels
	        // får plats 5 stycken... 
	        var startX = 80 + nr*this.game.width;
	        var startY = this.world.centerY - 30;

	        for (var j=0; j<5; j++) {
	        	i = nr *5+j;
	        	var isActive = (i==0 ? true : madeLevels[i-1]); //om nivån innan är klarad, då är leveln öppnad
	        	var textureName = isActive ? "activeLevel" : "inactiveLevel";
	        	var levelNr = i+1;
	        	var xPos = startX + 70*j;
	        	var yPos = startY+40;	 // set this value to another when only have 5 levels on each module. when ten use startY else another

	        	var levelSprite = this.add.sprite(xPos,yPos,textureName);
	        	levelSprite.level = levelNr;
	        	levelSprite.anchor.set(0.5); 
	        	levelSprite.scale.setTo(0.6, 0.6);

	        	var text = this.add.text(xPos+2, yPos+2, levelNr, numberStyle);
	    		text.anchor.set(0.5);    	

	    		levelClick.add(text);    		
	    		levelGroup.add(levelSprite); 		

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

	    // add settingspanel
	    settingsPanel(this);

	    // the arrow do not work correctly att the moment!! 
	    this.rightArrow = this.add.sprite(this.world.width - 30, this.world.centerY+10, 'rightArrow');
	    this.rightArrow.scale.setTo(0.8);
	    this.rightArrow.anchor.set(0.5);
	    this.rightArrow.dir = "right";

	    // left arrow, sprite.angle
       	this.leftArrow = this.add.sprite(30, this.world.centerY+10, 'rightArrow');
       	this.leftArrow.angle = 180;
	    this.leftArrow.scale.setTo(0.8);
	    this.leftArrow.anchor.set(0.5);
	    this.leftArrow.dir = "left"; 
	    this.leftArrow.alpha = 0.4; // since first page and should not be able to go left..

	    this.arrowButtonG = this.add.group();    
	    this.arrowButtonG.add(this.leftArrow);
	    this.arrowButtonG.add(this.rightArrow);

	    this.arrowButtonG.setAll('inputEnabled', true);
	    // using the power of callAll we can add the same input event to all coins in the group:
	    this.arrowButtonG.callAll('events.onInputDown.add', 'events.onInputDown', function (button){
	    	if(button.dir==="left" && this.currentPage>1) {
	    		var slide = '+' + this.world.width; 

	    		this.rightArrow.alpha = 1;
	    		this.currentPage--;
	    		if (this.currentPage==1) {
	    			button.alpha = 0.4;

	    		}
	    		var buttonsTween = this.add.tween(this.modalGroup);
				buttonsTween.to({
					x: slide// + 450*(this.currentPage-1)
				}, 500, Phaser.Easing.Cubic.None);
				buttonsTween.start();
	    	}
	    	else if(button.dir === "right" && this.currentPage<this.pages){
	    		var slide = '-' + this.world.width;
	    		this.leftArrow.alpha = 1;
	    		this.currentPage++;
	    		if (this.currentPage==this.pages) {
	    			button.alpha = 0.4;

	    		}
	    		var buttonsTween = this.add.tween(this.modalGroup);
				buttonsTween.to({
					x: slide// + 450*(this.currentPage-1)
				}, 500, Phaser.Easing.Cubic.None);
				buttonsTween.start();
	    	}
        }, this);


			// my name
		var style = { font: "12px Carter One", fill: "#FFF", align: "center",  stroke: "#000", strokeThickness: 2 };
		var name = this.add.text(this.world.centerX, this.world.height-20, "by Linnéa Mellblom", style);
		name.anchor.set(0.5);


	},
	update: function() {

	},
	backOneStep: function() {
		this.game.state.start('MainMenu');
	},
	startLevel : function(sprite){
		var levelIndex = sprite.level - 1;

		if (levelIndex == 0 || madeLevels[levelIndex-1]){
			if (playMusic) this.clickSound.play()
			this.game.state.start('Level', true, false, sprite.level);
		}
	}

};
