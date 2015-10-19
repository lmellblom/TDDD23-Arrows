// creates the settingspanel that should appear in the levelselect and in the game
// state can be either inGame och levelSelect.
// if levelSelect go back to the start and so on. 

function settingsPanel(game, state) {
    // an info button or a reload
    // state, inGame, levelSelect
	this.game = game;
    this.showSettings = false;

    // adding the base
    var base = this.game.add.sprite(40, this.game.world.height-40, "settingsBase");
    base.anchor.set(0.5, 1.0);
    base.scale.setTo(0.7);

    if(state=="inGame")
        base.scale.y = 0.6;

    // group
    this.settingsGroup = this.game.add.group();
    this.settingsGroup.add(base);
    this.allBtns = this.game.add.group();
   
    var startY = base.y-3; // change this after screen cast
 
    // adding all the buttons
    if (state == "levelSelect") {
        this.infoBtn = this.game.add.sprite(55, startY, 'infoIcon');
        this.allBtns.add(this.infoBtn);
    }
    this.musicBtn = this.game.add.sprite(55, startY+60, playMusic? "musicIcon" : "banMusic");
    this.soundBtn = this.game.add.sprite(55, startY+120, backCalmMusic? "soundIcon" : "banSound");
    this.menuBtn = this.game.add.sprite(55, startY+180, "menuIcon");

    this.allBtns.add(this.musicBtn);
    this.allBtns.add(this.soundBtn);
    this.allBtns.add(this.menuBtn);
    this.allBtns.setAll('anchor.x', 0.5);
    this.allBtns.setAll('anchor.y', 0.5);
    this.allBtns.scale.set(0.7);
    this.allBtns.setAll('inputEnabled', true);
    this.settingsGroup.add(this.allBtns);

    // adding the settingsbutton
    this.game.settingsBtn = this.game.add.sprite(40, this.game.world.height-20, 'settingsBtn');
    this.game.settingsBtn.anchor.set(0.5, 1.0);
    this.game.settingsBtn.scale.setTo(0.7);

    this.game.settingsBtn.inputEnabled = true;
    this.game.settingsBtn.events.onInputDown.add(settingsOpen, this);
    this.settingsGroup.visible = false;     // make sure the panel always stays hidden when adding a new one

    // set events on the settingsbuttons
    if (state == "levelSelect") {
        this.infoBtn.events.onInputDown.add(function (e,pointer){
            this.game.firstSettingsBtn();
        }, this);
    }
    this.menuBtn.events.onInputDown.add(function (e,pointer){
        this.game.backOneStep();  // go back one step, defines in the game
    }, this);
    this.musicBtn.events.onInputDown.add(function (e,pointer){
    	playMusic = !playMusic;
    	var texure = playMusic? "musicIcon" : "banMusic"; 
    	this.musicBtn.loadTexture(texure,0);
    }, this);
    this.soundBtn.events.onInputDown.add(function (e,pointer){
    	backCalmMusic = !backCalmMusic;

    	if(backCalmMusic) {
    		backgroundMusicPlayer.resume();
    	}
    	else {
    		backgroundMusicPlayer.pause();
    	}

    	var texure = backCalmMusic? "soundIcon" : "banSound"; 
    	this.soundBtn.loadTexture(texure,0);
    }, this);
}

var settingsOpen = function() {
		if(playMusic) clickSound.play();

		this.showSettings = !this.showSettings;
		this.settingsGroup.visible = this.showSettings;

		this.settingsGroup.z = 1;
}