/*

Takes a json-object of type like:
var moduleInfo = {
			"backgroundPanel": "panelModule",
			"backgroundScale": 0.9,
			"text": "Do you really \n want to quit?",
			"buttons" : [
			{"sprite": "noBtn", "functions": null, "x": this.world.centerX-70, "y":this.world.centerY+80},
			{"sprite": "yesBtn", "functions": this.quitGame, "x": this.world.centerX+70, "y": this.world.centerY+80},

			]
		};
will create a white background fore fading the background away, and then add
the modoule in the center of the game.
*/

function createModule(jsonObj, world, theGroup) {
	self = world; // tänkt istället för this

	var modalGroup =  theGroup || self.add.group();

	var modal = self.game.add.graphics(self.game.width, self.game.height);
        modal.beginFill("0x000000", 0.7);
        modal.x = 0;
        modal.y = 0;
        modal.drawRect(0, 0, self.game.width, self.game.height);
        modal.inputEnabled = true;
        modalGroup.add(modal);

        var module = self.add.sprite(self.world.centerX ,self.world.centerY , jsonObj.backgroundPanel);
        module.scale.setTo(jsonObj.backgroundScale);
        module.anchor.set(0.5,0.5);
        modalGroup.add(module);

        var text = self.add.text(self.world.centerX, self.world.centerY-20, jsonObj.text, generalStyle);
        text.anchor.set(0.5);
        modalGroup.add(text);

        // add buttons
        jsonObj.buttons.forEach(function(button){
        	var btn = self.add.sprite(button.x, button.y, button.sprite);
        	btn.anchor.set(0.5);
        	btn.scale.setTo(0.7);
        	btn.inputEnabled = true;
        	modalGroup.add(btn);

        	btn.events.onInputDown.add(function (e,pointer){
	        	if(playMusic) clickSound.play();
	        	self.settingsBtn.inputEnabled = true;
	        	modalGroup.visible = false;
	        	if (typeof button.functions === "function") button.functions(self);
	        	
	        }, self);
        }, self);
	
}