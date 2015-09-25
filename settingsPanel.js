// creates the settingspanel that should appear in the levelselect and in the game
// state can be either inGame och levelSelect.
// if levelSelect go back to the start and so on. 
// TODO : kanske ändra lite upplägg hur jag ska skriva denna..

function settingsPanel(world, state) {
    // an info button or a reload
    // state, inGame, levelSelect
    var infoIcon = (state == "inGame" ? 'reloadIcon' : 'infoIcon'); // kanske ta bort infoknappen om man är i spelet? 

	//self = world;
	self = world;

    self.base = self.add.sprite(61, self.world.height, "settingsBase");

    console.log("world heigth : " + self.world.height);
    console.log("base coord : " + self.base.y);
    if (state == "inGame") { 
        self.base.scale.set(1.0, 0.85);
        self.base.y += 30;
    }

    var baseCoord = self.world.height-60 - 20; // -20 för den sista biten som ska gömas bakom knappen
    self.base.y = baseCoord + self.base.height/2;

    self.settingsGroup = self.add.group();
    self.settingsGroup.add(self.base);




    if (state == "levelSelect") {
        self.infoBtn = self.add.sprite(61, self.base.y-120, infoIcon);
        self.settingsGroup.add(self.infoBtn);
    }

    self.musicBtn = self.add.sprite(61, self.base.y -60, playMusic? "musicIcon" : "banMusic");
    self.soundBtn = self.add.sprite(61, self.base.y, backCalmMusic? "soundIcon" : "banSound");
    self.menuBtn = self.add.sprite(61, self.base.y+60, "menuIcon");
    
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
    if (state == "levelSelect") {
        self.infoBtn.events.onInputDown.add(function (e,pointer){
            self.firstSettingsBtn();
        }, self);
    }
    // the rest
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