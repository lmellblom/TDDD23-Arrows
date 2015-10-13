var GAME = GAME || {};

// Set variables for the width and height to now the ratio
var gameWidth = 448;
var gameHeight =  640; 
var backgroundHeight = 1181;  // the background height of the grass

// This is for scaling the game. It will add extra padding to the game so it will fill up the screen.
var w = window.innerWidth;
var h = window.innerHeight;
var aspectRatioDevice = w/h; 
var aspectRatioSafeZone = gameWidth / gameHeight;
var extraWidth = 0, extraHeight = 0;
if (aspectRatioSafeZone < aspectRatioDevice) {
    // have to add game pixels vertically in order to fill the device screen
    extraWidth = aspectRatioDevice * gameHeight - gameWidth;
} else {
     // have to add game pixels horizontally
    extraHeight = gameWidth / aspectRatioDevice - gameHeight;
}

// Add the phaser game object
GAME.game = new Phaser.Game(gameWidth + extraWidth, gameHeight + extraHeight, Phaser.AUTO, '');


// ===================== GLOBAL VARIABELS AND SETTINGS =======================================
var numberOfLevels = 20;

// Will get from the local storage it you have played before, if not it will fill up the information from start
var madeLevels = [];        // a list that holds if the levels is done or not (t/f)
var madeLevelsStars = [];   // holds how many stars the player got on the level
for (var i=0; i<numberOfLevels; i++) {
    if(i%5)
        madeLevels[i]=true;
    else
        madeLevels[i]=false;
    madeLevelsStars[i] = 0;
}
if (localStorage.getItem("arrowMadeLevels")!=null) {
    var mL = JSON.parse(localStorage.getItem("arrowMadeLevels"));
    var mLS = JSON.parse(localStorage.getItem("arrowLevelStars"));
    for (var i=0; i<mL.length; i++) {
        madeLevels[i] = (i+1)%5==0 ? true : mL[i];

        madeLevelsStars[i] = mLS[i];
    }
}

// GÅ igenom dessa och se vilka jag verkligen behöver...
var menuGroup;
var qKey;
var nKey;
var cursors;
var arrowGroup;
var goal;
var arrow;
var obstacleGroup;
var availableMoves;
var allLevelData;

// variables that specifies if the background music and the clicks should be played
var playMusic = true;
var backCalmMusic = true;
var backgroundMusicPlayer;
var clickSound;

// Add all the states that the game has
GAME.game.state.add('Boot', GAME.Boot);
GAME.game.state.add('Preload', GAME.Preload);
GAME.game.state.add('MainMenu', GAME.MainMenu);
GAME.game.state.add('Finished', GAME.FinishedLevels);
GAME.game.state.add('Level', GAME.LevelCreator);
GAME.game.state.add('Credits', GAME.Credits);
GAME.game.state.add('SelectLevels', GAME.SelectLevels);

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
//  'active' means all requested fonts have finished loading
//  We set a 1 second delay before calling 'createText'.
//  For some reason if we don't the browser cannot render the text the first time it's created.
// active: function() { GAME.game.time.events.add(Phaser.Timer.SECOND, createText, this); },
//  The Google Fonts we want to load (specify as many as you like in the array)

    google: {
        families: ['Carter One', 'Skranji']
    }
};

// General font styles to get a more consistent feel
var LOGOSTYLE = { font: "60px Carter One", fill: "#FFF", align: "center",  stroke: "#000", strokeThickness: 5 };
var mediumStyle = { font: "18px Carter One", fill: "#FFF", align: "center",
    stroke: "#000", strokeThickness: 4 };
var panelTextStyle = { font: "18px Carter One", fill: "#000", align: "center",  stroke: "#000", strokeThickness: 0 };
var generalStyle = { font: "25px Carter One", fill: "#FFF", align: "center",
    stroke: "#000", strokeThickness: 5 }; // used for ex the level and score text in the top
var mediumStyle = { font: "18px Carter One", fill: "#FFF", align: "center",
    stroke: "#000", strokeThickness: 4 };
var smallStyle = { font: "14px Carter One", fill: "#FFF", align: "center",
    stroke: "#000", strokeThickness: 3 };
var modalSmallText = { font: "16px Carter One", fill: "#000", align:"center" };
modalSmallText.wordWrap = true;
// Begin with the boot state
GAME.game.state.start('Boot');