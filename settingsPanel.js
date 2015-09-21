// creates the settingspanel that should appear in the levelselect and in the game
// state can be either inGame och levelSelect.
// if levelSelect go back to the start and so on. 
// TODO : kanske ändra lite upplägg hur jag ska skriva denna..

function settingsPanel(world) {
	//self = world;
	self = world;

	self.base = self.add.sprite(61, self.world.height+70, "settingsBase");
    self.settingsGroup = self.add.group();
    self.settingsGroup.add(self.base);

    self.infoBtn = self.add.sprite(61, self.world.height-50, "infoIcon");
    self.musicBtn = self.add.sprite(61, self.world.height+20, playMusic? "musicIcon" : "banMusic");
    self.soundBtn = self.add.sprite(61, self.world.height+80, backCalmMusic? "soundIcon" : "banSound");
    self.menuBtn = self.add.sprite(61, self.world.height+140, "menuIcon");
    self.settingsGroup.add(self.infoBtn);
    self.settingsGroup.add(self.musicBtn);
    self.settingsGroup.add(self.soundBtn);
    self.settingsGroup.add(self.menuBtn);

   	self.settingsGroup.setAll('anchor.x', 0.5);
	self.settingsGroup.setAll('anchor.y', 0.5);
    self.settingsGroup.scale.set(0.7);

    // add settings button
    self.settingsBtn = self.add.sprite(20, self.world.height-60, 'settingsBtn');
    self.settingsBtn.scale.setTo(0.7);
    self.settingsBtn.inputEnabled = true;
    self.settingsBtn.events.onInputDown.add(settingsOpen, self);
    self.settingsGroup.visible = false;//self.showSettings; // make sure the panel always stays hidden when adding a new one
    self.settingsGroup.setAll('inputEnabled', true);

    // sett events on the settingsbuttons
        self.infoBtn.events.onInputDown.add(function (e,pointer){
            self.showInfo();
        }, self);
        self.menuBtn.events.onInputDown.add(function (e,pointer){
	        self.backOneStep(); // here should it be something else? 
        	// go back one step
        }, self);
        self.musicBtn.events.onInputDown.add(function (e,pointer){

        	playMusic = !playMusic;
        	var texure = playMusic? "musicIcon" : "banMusic"; // change to the other
        	self.musicBtn.loadTexture(texure,0);
            
        }, self);
        self.soundBtn.events.onInputDown.add(function (e,pointer){

        	backCalmMusic = !backCalmMusic;

        	if(backCalmMusic) {
        		backgroundMusicPlayer.resume();
        	}
        	else {
        		backgroundMusicPlayer.pause();
        	}

        	var texure = backCalmMusic? "soundIcon" : "banSound"; // change to the other
        	self.soundBtn.loadTexture(texure,0);
        }, self);

}

var settingsOpen = function() {
		if(playMusic) clickSound.play();

		self.showSettings = !self.showSettings;
		self.settingsGroup.visible = self.showSettings;

		self.settingsGroup.z = 1;
	}