/*
see tutorial http://codetowin.io/tutorials/nback-game-states-and-menus/
*/

var GAME = GAME || {};

var gameWidth = 448;
var gameHeight =  640;

GAME.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');


var player;

var numberOfLevels = 3;

var madeLevels = []; // a list that holds if the levels is done or not (t/f)

// init that you have not made any levels yet!!
for (var i=0; i<numberOfLevels; i++) {
	madeLevels[i]=false;
}


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

var playMusic = true;
var backCalmMusic = true;
var backgroundMusicPlayer;


	    var grids = [
	    	{"width": 5, "height": 8}
	    ];


// add all the states that the game has
GAME.game.state.add('Boot', GAME.Boot);
GAME.game.state.add('Preload', GAME.Preload);
GAME.game.state.add('MainMenu', GAME.MainMenu);
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

var generalStyle = { font: "25px Carter One", fill: "#FFF", align: "center",
 stroke: "#000", strokeThickness: 5 };
 var smallStyle = { font: "14px Carter One", fill: "#FFF", align: "center",
 stroke: "#000", strokeThickness: 5 };


// begin with the preloading
GAME.game.state.start('Boot');