var GAME = GAME || {};

GAME.SelectLevels = function() {};


GAME.SelectLevels.prototype = {
	create: function() {

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

        var module = this.add.sprite(this.world.centerX ,this.world.centerY , 'levelModule');

        var numberStyle = { font: "24px Skranji", fill: "#FFF", align: "center", fontWeight: "bold",  stroke: "#000", strokeThickness: 5};

        module.scale.setTo(0.6, 0.6);
        module.anchor.set(0.5,0.5);
        this.modalGroup.add(module);

        var modalTween = this.add.tween(this.modalGroup);


        // adding the number and background to the levels
        // får plats 10 stycken... 
        var startX = 80;
        var startY = this.world.centerY - 30;
        var levelGroup = this.add.group();
        var levelClick = this.add.group();
        for (var i=0; i<numberOfLevels; i++) {
        	var isActive = (i==0 ? true : madeLevels[i-1]); //om nivån innan är klarad, då är leveln öppnad
        	var textureName = isActive ? "activeLevel" : "inactiveLevel";
        	var levelNr = i+1;
        	var xPos = startX + 70*i;
        	var yPos = startY;


        	var levelSprite = this.add.sprite(xPos,yPos,textureName);
        	levelSprite.level = levelNr;
        	levelSprite.anchor.set(0.5); 
        	levelSprite.scale.setTo(0.6, 0.6);

        	var text = this.add.text(xPos+2, yPos+2, levelNr, numberStyle);
    		text.anchor.set(0.5);    	

    		levelClick.add(text);    		
    		levelGroup.add(levelSprite); 		

        }
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
/*
	    this.rightArrow = this.add.sprite(this.world.width - 30, this.world.centerY+10, 'rightArrow');
	    this.rightArrow.scale.setTo(0.8);
	    this.rightArrow.inputEnabled = true;
	    this.rightArrow.anchor.set(0.5);    	

	    this.rightArrow.events.onInputDown.add(function (e,pointer){

        	 modalTween.to( { x : -450 }, 350).start();
			// this.modalGroup.visible =  !this.modalGroup.visible;
        	console.log("tween this and add another!");

        }, this);

        // left arrow, sprite.angle
       	this.leftArrow = this.add.sprite(30, this.world.centerY+10, 'rightArrow');
       	this.leftArrow.angle = 180;
	    this.leftArrow.scale.setTo(0.8);
	    this.leftArrow.inputEnabled = true;
	    this.leftArrow.anchor.set(0.5); 

	    this.leftArrow.events.onInputDown.add(function (e,pointer){

        	 modalTween.to( { x : this.world.centerX }, 350).start();
			// this.modalGroup.visible =  !this.modalGroup.visible;
        	console.log("tween this and add another!");

        }, this);

*/

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
